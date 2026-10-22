import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const baselineFile=path.resolve('.local-runtime/handoff-css-baseline.json');
const samples={
  'handoff-html':['index.html','the-le.html','tin-tuc.html','tin-travel-awards-dau-an-tien-phong.html','dang-ky-de-cu.html','dang-ky-tru-cot-1.html','dang-ky-tien-phong-2.html','xac-nhan.html','thanh-cong.html','chinh-sua-ho-so.html'],
  'hand-off-phase 2':['index.html','binh-chon.html','ho-so-tru-cot-1-ho-so-1.html','ho-so-tru-cot-1-ho-so-2.html'],
};
const before=process.argv.includes('--baseline'),previous=before?{}:JSON.parse(await fs.readFile(baselineFile,'utf8'));
const browser=await chromium.launch({channel:'msedge',headless:true}),snapshots={},failures=[],errors=[];
try {
  const page=await browser.newPage({reducedMotion:'reduce'});
  await page.route(/^https?:/,route=>route.abort());
  await page.addInitScript(()=>{Date.now=()=>Date.parse('2026-10-22T12:00:00+07:00');try{localStorage.setItem('travel-awards-mobile-registration-notice-seen','1');}catch{}});
  page.on('pageerror',error=>errors.push(error.message));
  for(const [directory,files] of Object.entries(samples))for(const width of [1440,390])for(const file of files) {
    const key=`${directory}/${file}:${width}`;
    await page.setViewportSize({width,height:1000});await page.goto(pathToFileURL(path.resolve(directory,file)).href,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);
    const snapshot=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,height:document.body.scrollHeight,nodes:[...document.body.querySelectorAll('*')].filter(node=>node.getClientRects().length&&!node.closest('dialog')).map(node=>{
      const r=node.getBoundingClientRect(),s=getComputedStyle(node);return {tag:node.tagName,class:node.getAttribute('class')||'',box:[r.x,r.y+scrollY,r.width,r.height].map(value=>Math.round(value*10)/10),font:s.fontSize,line:s.lineHeight,weight:s.fontWeight,color:s.color,background:s.backgroundColor,position:s.position};
    })}));
    snapshots[key]=snapshot;
    if(!before) {
      const old=previous[key];if(JSON.stringify(old)!==JSON.stringify(snapshot)) {
        const changed=snapshot.nodes.flatMap((node,index)=>JSON.stringify(node)!==JSON.stringify(old.nodes[index])?[{index,before:old.nodes[index],after:node}]:[]);
        failures.push({key,heightBefore:old.height,heightAfter:snapshot.height,changes:changed.slice(0,8)});
      }
    }
  }
  if(before){await fs.mkdir(path.dirname(baselineFile),{recursive:true});await fs.writeFile(baselineFile,JSON.stringify(snapshots));}
  else {
    for(const directory of Object.keys(samples)) {
      const htmlFiles=(await fs.readdir(directory)).filter(file=>file.endsWith('.html'));
      for(const file of htmlFiles){const html=await fs.readFile(path.join(directory,file),'utf8');assert.equal((html.match(/href="css\/font.css"/g)||[]).length,1,file);assert.equal((html.match(/href="css\/icons.css"/g)||[]).length,1,file);assert(!/href="assets\/icons\/flaticon\/[^\"]+\.css"/.test(html),file);}
      for(const file of (await fs.readdir(path.join(directory,'css'))).filter(file=>file.endsWith('.css'))){const css=await fs.readFile(path.join(directory,'css',file),'utf8');assert(!/@layer\b/.test(css),file);assert(file==='font.css'||!/@font-face\b/.test(css),file);}
    }
    await fs.writeFile('docs/handoff-css-qa.json',JSON.stringify({date:new Date().toISOString(),comparisons:Object.keys(snapshots).length,failures,errors},null,2)+'\n');
    assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
  }
  console.log(JSON.stringify({baseline:before,comparisons:Object.keys(snapshots).length,failures:failures.length,errors}));
} finally {await browser.close();}
