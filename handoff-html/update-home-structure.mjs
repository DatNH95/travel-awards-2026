// Development-only Homepage structure migration and responsive comparison.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {flattenDocument,flattenStyles} from './structure.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve('handoff-html');
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
await page.route(/^https?:/,route=>route.abort());
const failures=[],measurements=[];
const baseline=process.argv.includes('--reuse-baseline')?JSON.parse(await fs.readFile(path.join(root,'qa/home-structure-report.json'),'utf8')):null;
const samples=['index.html','the-le.html','tin-tuc.html','dang-ky-tru-cot-1.html'];
async function measure(file,width) {
  await page.setViewportSize({width,height:1000});
  await page.goto(pathToFileURL(path.join(root,file)).href);
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.allSettled([...document.images].filter(img=>img.src.startsWith('file:')).map(img=>{img.loading='eager';return img.decode();}));});
  return page.evaluate(()=>({height:document.body.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth+1,boxes:[...document.querySelectorAll('.layout-container')].map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};})}));
}
try {
  for(const file of samples)for(const width of [1440,390])measurements.push({file,width,before:baseline?.measurements.find(row=>row.file===file&&row.width===width)?.before??await measure(file,width)});
  const file=path.join(root,'index.html');
  const html=await fs.readFile(file,'utf8');
  const updated=await page.evaluate(({html,transform})=>{const doc=new DOMParser().parseFromString(html,'text/html');new Function('return ('+transform+')')()(doc);return doc.documentElement.outerHTML;},{html,transform:flattenDocument.toString()});
  await fs.writeFile(file,'<!doctype html>\n'+updated.replace(/><(?=\/?(?:html|head|body|header|footer|nav|section|article|aside|div|form|ul|ol|li|h[1-6]|p|link|meta|script)\b)/g,'>\n<'));
  for(const name of await fs.readdir(path.join(root,'css')))if(name.endsWith('.css')){const file=path.join(root,'css',name);const css=await fs.readFile(file,'utf8');const next=flattenStyles(css);if(next!==css)await fs.writeFile(file,next);}
  for(const row of measurements){row.after=await measure(row.file,row.width);if(JSON.stringify(row.before)!==JSON.stringify(row.after))failures.push(`${row.file}@${row.width}: changed layout`);if(row.after.overflow)failures.push(`${row.file}@${row.width}: overflow`);}
  await page.goto(pathToFileURL(file).href);
  const structure=await page.evaluate(()=>({wrapper:document.querySelectorAll('body > .wrap-homepage.width_common').length,sections:[...document.querySelectorAll('.wrap-homepage > section')].map(el=>({id:el.id,classes:el.className})),headerOutside:!!document.querySelector('body > header'),footerOutside:!!document.querySelector('body > footer'),main:document.querySelectorAll('#main').length}));
  const names=['home-hero','home-about','home-agenda','home-awards','home-participate','home-minitalk','home-tin-tuc','home-final-cta','home-organizer'];
  if(structure.wrapper!==1||!structure.headerOutside||!structure.footerOutside||structure.main!==1||structure.sections.length!==names.length)failures.push('Invalid Homepage wrapper');
  structure.sections.forEach((section,i)=>{if(!section.classes.startsWith('section '+names[i]))failures.push(`Section ${i}: wrong classes`);});
  await page.locator('#award-tab-1').click();if(await page.locator('#award-panel-1 li').count()!==9)failures.push('Award tab failed');
  await fs.mkdir(path.join(root,'qa'),{recursive:true});
  await fs.writeFile(path.join(root,'qa/home-structure-report.json'),JSON.stringify({checks:measurements.length,structure,measurements,failures},null,2));
  console.log(JSON.stringify({checks:measurements.length,structure,failures},null,2));
  if(failures.length)process.exitCode=1;
}finally{await browser.close();}
