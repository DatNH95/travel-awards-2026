// Development-only handoff update and checks for linked news leads and CTA icons.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve('handoff-html');
const browser = await chromium.launch({channel:'msedge',headless:true});
const page = await browser.newPage({reducedMotion:'reduce'});
await page.route(/^https?:/, route => route.abort());
const arrow = '<svg class="cta-arrow" aria-hidden="true" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 13 13 3M3 3h10v10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
const failures = [];
let leads = 0;
try {
  for (const file of (await fs.readdir(root)).filter(name => name.endsWith('.html'))) {
    const html = await fs.readFile(path.join(root,file),'utf8');
    const result = await page.evaluate(({html,arrow}) => {
      const doc = new DOMParser().parseFromString(html,'text/html');
      let count = 0;
      const errors = [];
      doc.querySelectorAll('.home-news-lead, .news-lead, .news-suggestions article p').forEach(lead => {
        const card = lead.closest('article');
        const title = card?.querySelector('h2 a, h3 a');
        const image = card?.querySelector('a:has(img)');
        if (!title || !image) { errors.push('Missing title or thumbnail'); return; }
        if (!lead.querySelector('a')) {
          const link = doc.createElement('a');
          for (const attr of title.attributes) if (['href','target','rel'].includes(attr.name)) link.setAttribute(attr.name,attr.value);
          link.append(...lead.childNodes);
          lead.append(link);
        }
        if (lead.querySelector('a').getAttribute('href') !== title.getAttribute('href') || image.getAttribute('href') !== title.getAttribute('href')) errors.push('News URLs differ');
        count++;
      });
      const walker = doc.createTreeWalker(doc.body,NodeFilter.SHOW_TEXT);
      const texts=[];
      while(walker.nextNode()) if(walker.currentNode.textContent.includes('↗')) texts.push(walker.currentNode);
      texts.forEach(text => {
        const pieces = text.textContent.split('↗');
        const fragment=doc.createDocumentFragment();
        pieces.forEach((piece,index)=> { fragment.append(doc.createTextNode(piece)); if(index<pieces.length-1) { const holder=doc.createElement('span'); holder.innerHTML=arrow; fragment.append(holder.firstChild); } });
        text.replaceWith(fragment);
      });
      doc.querySelectorAll('.button--nomination svg').forEach(icon => icon.classList.add('cta-arrow'));
      return {html:doc.documentElement.outerHTML,count,errors};
    },{html,arrow});
    leads += result.count;
    failures.push(...result.errors.map(error=>`${file}: ${error}`));
    await fs.writeFile(path.join(root,file),'<!doctype html>\n'+result.html.replace(/><(?=\/?(?:html|head|body|header|footer|nav|section|article|aside|div|form|fieldset|ul|ol|li|h[1-6]|p|dialog|details|summary|link|meta|script)\b)/g,'>\n<'));
  }
  const baseFile=path.join(root,'css/base.css');
  const base=await fs.readFile(baseFile,'utf8');
  if(!base.includes('.cta-arrow')) await fs.writeFile(baseFile,base+'\n.cta-arrow { display: inline-block; vertical-align: middle; flex-shrink: 0; }\n');
  for(const file of ['index.html','tin-tuc.html','tin-tuc-2.html','tin-travel-awards-dau-an-tien-phong.html']) for(const width of [1440,390]) {
    await page.setViewportSize({width,height:1000});
    await page.goto(pathToFileURL(path.join(root,file)).href,{waitUntil:'domcontentloaded'});
    await page.evaluate(()=>document.fonts.ready);
    if(await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+1)) failures.push(`${file}@${width}: overflow`);
    if(file==='index.html') {
      const destination=await page.locator('.home-news-lead a').getAttribute('href');
      await page.locator('.home-news-lead a').click();
      if(!page.url().includes(destination)) failures.push('Homepage lead does not open detail');
    }
  }
  await fs.mkdir(path.join(root,'qa'),{recursive:true});
  await fs.writeFile(path.join(root,'qa/news-links-report.json'),JSON.stringify({leads,responsiveChecks:8,failures},null,2));
  console.log(JSON.stringify({leads,responsiveChecks:8,failures}));
  if(failures.length) process.exitCode=1;
} finally { await browser.close(); }
