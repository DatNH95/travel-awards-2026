// Development-only exporter; the delivered HTML runs without a framework.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {flattenDocument, flattenStyles, embedSvgAssets} from '../handoff-html/structure.mjs';
import {packageHandoffStyles,updateHandoffStyleLinks} from '../handoff-html/styles.mjs';
const require = createRequire(import.meta.url);
const {chromium} = require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const out = path.resolve('hand-off-phase 2');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:3001';
await fs.mkdir(path.join(out,'js'),{recursive:true});
await fs.mkdir(path.join(out,'css'),{recursive:true});
for (const name of ['tokens','base','home']) await fs.copyFile(`handoff-html/css/${name}.css`,path.join(out,`css/${name}.css`));
for (const name of ['assets','fonts']) await fs.cp(`public/${name}`,path.join(out,name),{recursive:true});
const fontLicense=path.join(out,'fonts/merriweather/OFL.txt');
await fs.writeFile(fontLicense,(await fs.readFile(fontLicense,'utf8')).replace(/[ \t]+$/gm,''));
for(const name of ['regular-rounded','brands']) {
  const file=path.join(out,`assets/icons/flaticon/uicons-${name}.css`);
  await fs.writeFile(file,(await fs.readFile(file,'utf8')).replaceAll('/assets/icons/flaticon/','./'));
}
let css = await fs.readFile('src/app/(phase-2)/binh-chon/voting.css','utf8');
css += '\n'+await fs.readFile('src/app/(phase-2)/phase-2.css','utf8');
await fs.writeFile(path.join(out,'css/voting.css'),await embedSvgAssets(flattenStyles(css.replaceAll('/assets/','../assets/')),path.join(out,'css')));
await packageHandoffStyles(out,{phase:2});
// Match production cascade: homepage spacing refinements follow voting styles.
if(process.argv.includes('--styles-only')) {
  for(const file of (await fs.readdir(out)).filter(file=>file.endsWith('.html'))) {
    const target=path.join(out,file),html=await fs.readFile(target,'utf8');
    const ordered=html.replace(/<link rel="stylesheet" href="css\/home.css">\s*<link rel="stylesheet" href="css\/voting.css">/,'<link rel="stylesheet" href="css/voting.css">\n<link rel="stylesheet" href="css/home.css">');
    if(ordered!==html)await fs.writeFile(target,ordered);
  }
  await updateHandoffStyleLinks(out);console.log('Phase 2 styles refreshed.');process.exit(0);
}
const categories = [...Array.from({length:6},(_,i)=>`tru-cot-${i+1}`),...Array.from({length:9},(_,i)=>`tien-phong-${i+1}`)];
const profiles = categories.flatMap(category=>Array.from({length:10},(_,i)=>`${category}-ho-so-${i+1}`));
function portable(html) {
  return html.replace(/(href|src|poster)="([^"]+)"/g,(match,attr,value)=>{
    if(value.startsWith('/assets/')||value.startsWith('/fonts/'))return `${attr}="${value.slice(1)}"`;
    if(!value.startsWith('/'))return match;
    const url = new URL(value.replaceAll('&amp;','&'),'http://local');
    let target;
    if(url.pathname==='/phase-2')target='index.html';
    else if(url.pathname==='/binh-chon')target='binh-chon.html'+(url.search?'?'+url.searchParams.toString():'');
    else if(url.pathname.startsWith('/binh-chon/'))target=`ho-so-${url.pathname.split('/').pop()}.html`;
    else if(url.pathname==='/')target='../handoff-html/index.html';
    else if(url.pathname==='/the-le')target='../handoff-html/the-le.html';
    else if(url.pathname==='/tin-tuc')target='../handoff-html/tin-tuc.html'+(url.search?'?'+url.searchParams.toString():'');
    else if(url.pathname.startsWith('/tin-tuc/'))target=`../handoff-html/tin-${url.pathname.split('/').pop()}.html`;
    else throw new Error(`Unmapped internal path: ${value}`);
    return `${attr}="${target}${url.hash}"`;
  });
}
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await page.addInitScript(`window.flattenHandoffDocument=${flattenDocument.toString()}`);
  // Capture public card markup and category names, never private dossier data.
  const groups=[[],[]],cards={};
  for(const [index,category] of categories.entries()) {
    await page.goto(`${base}/binh-chon?category=${category}`,{waitUntil:'networkidle'});
    await page.waitForFunction(id=>document.querySelector('.voting-view-all')?.getAttribute('href')?.includes(`category=${id}`),category);
    groups[index<6?0:1].push({id:category,name:await page.locator('.voting-results-heading h3').innerText()});
    cards[category]=await page.locator('.voting-grid').innerHTML();
  }
  const galleryCredits=new Map();
  const routes=[['/phase-2','index.html'],['/binh-chon','binh-chon.html'],...profiles.map(slug=>[`/binh-chon/${slug}`,`ho-so-${slug}.html`])];
  const requestedFiles=process.argv.slice(2).filter(value=>!value.startsWith('--'));
  const selectedRoutes=requestedFiles.length?routes.filter(([,file])=>requestedFiles.includes(file)):routes;
  for(const file of requestedFiles)if(!routes.some(([,target])=>target===file))throw new Error(`Unknown handoff page: ${file}`);
  for(const [index,[route,file]] of selectedRoutes.entries()) {
    await page.goto(base+route,{waitUntil:'networkidle'});
    let extraPanel=null;
    if(file==='index.html') {
      const tabs=page.locator('.home-award-tabs [role=tab]');
      if(await tabs.count()) {
        await tabs.nth(1).click();
        extraPanel=await page.locator('[role=tabpanel]:visible').first().evaluate(node=>node.outerHTML);
        await tabs.nth(0).click();
      }
    }
    // Enrich survey triggers with semantic public identifiers for vanilla handlers.
    const detail=route.startsWith('/binh-chon/')?route.split('/').pop():null;
    if(detail) {
      const images=await page.locator('.voting-gallery-slide').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('src')));
      for(const [imageIndex,src] of images.entries()) {
        if(galleryCredits.has(src))continue;
        const thumbnails=page.locator('.voting-gallery-thumbnails button');
        if(await thumbnails.count())await thumbnails.nth(imageIndex).click();
        await page.getByRole('button',{name:'Phóng to ảnh',exact:true}).click();
        galleryCredits.set(src,await page.locator('.voting-gallery-credit').innerHTML());
        await page.getByRole('button',{name:'Đóng ảnh phóng to',exact:true}).click();
      }
      const firstThumbnail=page.locator('.voting-gallery-thumbnails button').first();
      if(await firstThumbnail.count())await firstThumbnail.click();
    }
    await page.evaluate(()=>new Promise(resolve=>{scrollTo(0,0);requestAnimationFrame(()=>requestAnimationFrame(resolve));}));
    let html=await page.evaluate(({extraPanel,detail,credits})=>{
      const doc=document.cloneNode(true);
      doc.querySelectorAll('.voting-gallery-slide').forEach(node=>{node.dataset.credit=credits[node.getAttribute('src')]||'';});
      if(extraPanel) {const holder=doc.createElement('div');holder.innerHTML=extraPanel;holder.firstChild.hidden=true;doc.querySelector('[role=tabpanel]').after(holder.firstChild);}
      doc.querySelectorAll('script,link,style,meta[name=next-size-adjust],next-route-announcer,nextjs-portal').forEach(node=>node.remove());
      const walker=doc.createTreeWalker(doc,NodeFilter.SHOW_COMMENT),comments=[];
      while(walker.nextNode())comments.push(walker.currentNode);comments.forEach(node=>node.remove());
      doc.querySelectorAll('[hidden]').forEach(node=>{if(node.id.startsWith('S:')||(!node.textContent.trim()&&!node.children.length))node.remove();});
      doc.querySelectorAll('*').forEach(node=>{
        for(const attr of [...node.attributes])if(/^on|^data-next|^data-nimg/.test(attr.name))node.removeAttribute(attr.name);
        for(const cls of [...node.classList])if(cls.includes('-module__')||cls.startsWith('__'))node.classList.remove(cls);
        if(node.tagName==='IMG') {const src=node.getAttribute('src')||'';if(src.startsWith('/_next/image'))node.setAttribute('src',new URL(src,location.origin).searchParams.get('url'));node.removeAttribute('srcset');node.removeAttribute('sizes');}
      });
      doc.querySelectorAll('.home-award-count').forEach(node=>node.textContent='15');
      window.flattenHandoffDocument(doc);
      for(const name of ['tokens','font','base','voting','home','icons']){const link=doc.createElement('link');link.rel='stylesheet';link.href=`css/${name}.css`;doc.head.append(link);}
      for(const name of ['data','handoff']){const script=doc.createElement('script');script.src=`js/${name}.js`;script.defer=true;doc.head.append(script);}
      if(detail)doc.body.dataset.profile=detail;
      // React useId values become stable, readable HTML identifiers with matching references.
      const ids=new Map();let n=0;
      doc.querySelectorAll('[id]').forEach(node=>{if(/^_R_|^:R/.test(node.id))ids.set(node.id,`phase2-control-${++n}`);});
      doc.querySelectorAll('*').forEach(node=>{for(const attr of ['id','for','aria-controls','aria-labelledby','aria-describedby'])if(node.hasAttribute(attr))node.setAttribute(attr,node.getAttribute(attr).split(' ').map(value=>ids.get(value)||value).join(' '));});
      return '<!doctype html>\n'+doc.documentElement.outerHTML;
    },{extraPanel,detail,credits:Object.fromEntries(galleryCredits)});
    html=portable(html).replace(/><(?=\/?(?:html|head|body|header|footer|nav|section|article|aside|div|form|fieldset|ul|ol|li|h[1-6]|p|dialog|link|meta|script)\b)/g,'>\n<');
    for(let attempt=0;;attempt++) {
      try {await fs.writeFile(path.join(out,file),html);break;}
      catch(error){if(!['UNKNOWN','EBUSY','EPERM'].includes(error.code)||attempt>=7)throw error;await new Promise(resolve=>setTimeout(resolve,200));}
    }
    if(index%25===0)console.log(`Phase 2: ${index+1}/${selectedRoutes.length}`);
  }
  // Clean exported card fragments with the same DOM rules, independently of hydration.
  for(const category of categories)cards[category]=portable(await page.evaluate(html=>{
    const holder=document.createElement('div');holder.innerHTML=html;
    holder.querySelectorAll('*').forEach(node=>{for(const attr of [...node.attributes])if(/^on|^data-next|^data-nimg/.test(attr.name))node.removeAttribute(attr.name);});
    holder.querySelectorAll('.voting-survey').forEach(node=>node.remove());
    holder.querySelectorAll('img').forEach(node=>{node.removeAttribute('srcset');node.removeAttribute('sizes');});
    return holder.innerHTML;
  },cards[category]));
  await fs.writeFile(path.join(out,'js/data.js'),'/* Public demo card templates; no private dossier fields. */\nwindow.phase2Handoff='+JSON.stringify({groups,cards})+';\n');
  await fs.writeFile(path.join(out,'manifest.json'),JSON.stringify({phase:2,pages:routes.map(([source,file])=>({source,file})),categories},null,2));
} finally {await browser.close();}
console.log('Phase 2 handoff exported.');
