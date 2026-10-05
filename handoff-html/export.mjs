// Development-only exporter. Not loaded by the delivered pages.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = process.cwd();
const out = path.join(root, 'handoff-html');
await fs.mkdir(path.join(out, 'css'), {recursive:true});
await fs.mkdir(path.join(out, 'js'), {recursive:true});
const reset = `/* Minimal native reset, replacing Tailwind preflight. */
@layer reset {
*,::before,::after { box-sizing:border-box; border:0 solid; }
html { line-height:1.5; -webkit-text-size-adjust:100%; tab-size:4; }
body { margin:0; } h1,h2,h3,h4,h5,h6 { margin:0; font-size:inherit; font-weight:inherit; }
button,input,select,textarea { font:inherit; color:inherit; letter-spacing:inherit; margin:0; padding:0; background:transparent; border-radius:0; }
button,[type=button],[type=submit] { appearance:button; } button:not(:disabled),summary { cursor:pointer; }
a { color:inherit; text-decoration:inherit; } ol,ul { list-style:none; margin:0; padding:0; }
p,blockquote,figure,fieldset,dl,dd { margin:0; } fieldset,legend { padding:0; }
img,svg,video { display:block; vertical-align:middle; } img,video { max-width:100%; height:auto; }
[hidden] { display:none!important; } textarea { resize:vertical; }
.sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
}
@font-face { font-family:HandoffNews; src:url('../fonts/merriweather/merriweather-bold.ttf') format('truetype'); font-weight:700; font-style:normal; font-display:swap; }
.news-site { --font-news-title:HandoffNews; }
`;
let tokens = await fs.readFile(path.join(root,'src/styles/tokens.css'),'utf8');
tokens = tokens.replace('@theme static', ':root').replace(/\s*--[\w-]+-\*:\s*initial;/g,'');
await fs.writeFile(path.join(out,'css/tokens.css'),tokens);
let global = await fs.readFile(path.join(root,'src/app/globals.css'),'utf8');
global = global.replace(/^@import[^\n]*\n/gm,'');
const postcssFolder = (await fs.readdir(path.join(root,'node_modules/.pnpm'))).find(name=>name.startsWith('postcss@'));
const postcss = require(path.join(root,'node_modules/.pnpm',postcssFolder,'node_modules/postcss'));
const baseStyles = postcss.parse(reset+'\n'+global);
baseStyles.walkRules(rule=>{if(/\.(preview-|landing-demo-)/.test(rule.selector))rule.remove();});
baseStyles.walkAtRules(rule=>{if(rule.nodes&&!rule.nodes.length)rule.remove();});
await fs.writeFile(path.join(out,'css/base.css'),baseStyles.toString());
for (const [source,name] of [['src/app/home.css','home'],['src/app/the-le/rules.css','rules'],['src/app/tin-tuc/news.css','news'],['src/app/dang-ky-de-cu/nomination.css','nomination']]) {
  const css = (await fs.readFile(path.join(root,source),'utf8')).replaceAll('/assets/','../assets/');
  await fs.writeFile(path.join(out,`css/${name}.css`),css);
}
await fs.cp(path.join(root,'public/assets'),path.join(out,'assets'),{recursive:true});
await fs.cp(path.join(root,'public/fonts'),path.join(out,'fonts'),{recursive:true});
const categories = [...Array.from({length:6},(_,i)=>`tru-cot-${i+1}`),...Array.from({length:9},(_,i)=>`tien-phong-${i+1}`)];
const newsSource = await fs.readFile(path.join(root,'src/data/news.ts'),'utf8');
const slugs = [...newsSource.matchAll(/(?:slug:|'slug':|"slug":)\s*['"]([^'"]+)['"]/g)].map(m=>m[1]).filter(s=>!s.includes('`'));
slugs.push(...Array.from({length:71},(_,i)=>`cau-chuyen-du-lich-${i+1}`));
const routes = [['/','index.html','home'],['/the-le','the-le.html','rules'],['/tin-tuc','tin-tuc.html','news'],['/dang-ky-de-cu','dang-ky-de-cu.html','nomination'],['/dang-ky-de-cu?preview=3','xac-nhan.html','nomination'],['/dang-ky-de-cu?preview=4','thanh-cong.html','nomination']];
for(const id of categories) routes.push([`/dang-ky-de-cu?category=${id}&step=2`,`dang-ky-${id}.html`,'nomination']);
for(let i=2;i<=7;i++) routes.push([`/tin-tuc?page=${i}`,`tin-tuc-${i}.html`,'news']);
for(const slug of new Set(slugs)) routes.push([`/tin-tuc/${slug}`,`tin-${slug}.html`,'news']);
const browser = await chromium.launch({channel:'msedge',headless:true});
const page = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
let count = 0;
for(const [route,file,kind] of routes.filter(([,file]) => process.argv.length < 3 || process.argv.slice(2).includes(file))) {
  await page.goto('http://127.0.0.1:3001'+route,{waitUntil:'networkidle'});
  if(kind==='nomination') await page.waitForSelector('.nomination-layout');
  // Capture both tab panels; keep the initial tab visible.
  const tablist = page.locator('[role=tablist]').first();
  let secondPanel = null;
  if(await tablist.count()) {
    await tablist.locator('[role=tab]').nth(1).click();
    await page.waitForFunction(() => document.querySelector('[role=tablist] [role=tab]:nth-child(2)')?.getAttribute('aria-selected') === 'true');
    secondPanel = await page.locator('[role=tabpanel]').filter({visible:true}).first().evaluate(el=>el.outerHTML);
    await tablist.locator('[role=tab]').nth(0).click();
    await page.waitForFunction(() => document.querySelector('[role=tablist] [role=tab]:first-child')?.getAttribute('aria-selected') === 'true');
  }
  const html = await page.evaluate(({kind,secondPanel})=> {
    const doc = document.cloneNode(true);
    doc.querySelectorAll('script,link,style,meta[name=next-size-adjust],nextjs-portal').forEach(el=>el.remove());
    const walker = doc.createTreeWalker(doc,NodeFilter.SHOW_COMMENT); const comments=[];
    while(walker.nextNode()) comments.push(walker.currentNode); comments.forEach(el=>el.remove());
    doc.querySelectorAll('[hidden]').forEach(el=>{if(el.id?.startsWith('S:')) el.remove();});
    doc.querySelectorAll('*').forEach(el=>{
      for(const attr of [...el.attributes]) if(attr.name.startsWith('data-next') || attr.name.startsWith('data-nimg') || attr.name.startsWith('on')) el.removeAttribute(attr.name);
      const cls=[...el.classList].filter(c=>!c.startsWith('__')&&!c.startsWith('merriweather_')); if(el.hasAttribute('class')) el.setAttribute('class',cls.join(' '));
      if(el.tagName==='IMG') {const src=el.getAttribute('src')||''; if(src.startsWith('/_next/image')) el.setAttribute('src',new URL(src,location.origin).searchParams.get('url')); el.removeAttribute('srcset'); el.removeAttribute('sizes');}
    });
    if(secondPanel) {const panel=doc.querySelector('[role=tabpanel]');const holder=doc.createElement('div');holder.innerHTML=secondPanel;if(!doc.getElementById(holder.firstChild.id)){holder.firstChild.hidden=true;panel.after(holder.firstChild);}}
    doc.querySelectorAll('.home-award-count').forEach(el=>{if(el.textContent.trim()==='0')el.textContent='15';});
    const head=doc.querySelector('head');
    for(const name of ['tokens','base','home',...(kind==='home'?[]:[kind])]) {const link=doc.createElement('link');link.rel='stylesheet';link.href=`css/${name}.css`;head.append(link);}
    const script=doc.createElement('script');script.src='js/handoff.js';script.defer=true;head.append(script);
    doc.documentElement.setAttribute('lang','vi');
    return '<!doctype html>\n'+doc.documentElement.outerHTML;
  },{kind,secondPanel});
  // Flat portable paths, including pagination and category deep links.
  let clean=html.replace(/(href|src|poster)="([^"#]+)"/g,(whole,attr,value)=> {
    if(value.startsWith('/assets/')||value.startsWith('/fonts/')) return `${attr}="${value.slice(1)}"`;
    if(!value.startsWith('/')) return whole;
    const u=new URL(value.replaceAll('&amp;','&'),'http://local');let dest;
    if(u.pathname==='/') dest='index.html';
    else if(u.pathname==='/the-le')dest='the-le.html';
    else if(u.pathname==='/tin-tuc')dest=u.searchParams.get('page')&&u.searchParams.get('page')!=='1'?`tin-tuc-${u.searchParams.get('page')}.html`:'tin-tuc.html';
    else if(u.pathname.startsWith('/tin-tuc/'))dest=`tin-${u.pathname.split('/').pop()}.html`;
    else if(u.pathname==='/dang-ky-de-cu')dest='dang-ky-de-cu.html'+(u.search?'?'+u.searchParams.toString():'');
    return dest?`${attr}="${dest}${u.hash}"`:whole;
  });
  // Readable block boundaries without adding whitespace inside inline text.
  clean=clean.replace(/><(?=\/?(?:html|head|body|main|header|footer|nav|section|article|aside|div|form|fieldset|ul|ol|li|h[1-6]|p|dialog|details|summary|link|meta|script)\b)/g,'>\n<');
  await fs.writeFile(path.join(out,file),clean);
  if(++count%15===0) console.log(`Exported ${count}/${routes.length}`);
}
await browser.close();
await fs.writeFile(path.join(out,'manifest.json'),JSON.stringify({pages:routes.map(([source,file])=>({source,file})),categories},null,2));
console.log(`Done: ${count} HTML pages`);
