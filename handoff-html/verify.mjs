// Development-only verification; not part of the delivered runtime.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve('handoff-html');
const manifest=JSON.parse(await fs.readFile(path.join(root,'manifest.json'),'utf8'));
const failures=[];
for(const {file} of manifest.pages) {
  const html=await fs.readFile(path.join(root,file),'utf8');
  if (/<main\b|<div class="home"/.test(html)) failures.push(`${file}: legacy page wrapper`);
  if(file==='index.html'&&!/<div class="wrap-homepage width_common"/.test(html))failures.push('Homepage: missing Tech wrapper');
  if(/_next\/|self\.__next|data-nimg|next-route-announcer|@theme|tailwindcss/.test(html)) failures.push(`${file}: runtime residue`);
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value=match[1]; if(/^(https?:|mailto:|tel:|data:|#)/.test(value))continue;
    if(value.startsWith('/'))failures.push(`${file}: nonportable link ${value}`);
    const target=decodeURIComponent(value.split(/[?#]/)[0]);
    try{await fs.access(path.join(root,target));}catch{failures.push(`${file}: missing ${target}`);}
  }
}
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
await page.addInitScript(()=>{try{localStorage.setItem('travel-awards-mobile-registration-notice-seen','1');}catch{}});
const qaDirectory=path.join(root,'qa',String(Date.now()));
await fs.mkdir(qaDirectory,{recursive:true});
const errors=[];page.on('pageerror',error=>errors.push(error.message));
const allSamples=['index.html','the-le.html','tin-tuc.html','dang-ky-de-cu.html',...manifest.categories.map(id=>`dang-ky-${id}.html`),'xac-nhan.html','thanh-cong.html','chinh-sua-ho-so.html','xac-nhan-cap-nhat.html','cap-nhat-thanh-cong.html',manifest.pages.find(p=>p.file.startsWith('tin-travel')).file];
const samples=process.argv.includes('--affected-only')?allSamples.filter(file=>{const source=manifest.pages.find(p=>p.file===file).source;return source==='/'||source.startsWith('/dang-ky-de-cu');}):allSamples;
const measurements=[];
for(const width of [1440,390]) {
 await page.setViewportSize({width,height:1000});
 for(const file of samples) {
  await page.goto(pathToFileURL(path.join(root,file)).href);await page.evaluate(()=>document.fonts.ready);
  const actual=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,height:document.body.scrollHeight,h1:document.querySelector('h1')?.getBoundingClientRect().width,duplicateIds:[...document.querySelectorAll('[id]')].map(el=>el.id).filter((id,i,all)=>all.indexOf(id)!==i)}));
  if(actual.duplicateIds.length)failures.push(`${file}: duplicate IDs ${actual.duplicateIds}`);
  if(actual.scroll>width+1) failures.push(`${file}@${width}: overflow ${actual.scroll}`);
  const source=manifest.pages.find(p=>p.file===file).source;
  const sourcePage=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  await sourcePage.addInitScript(()=>{try{localStorage.setItem('travel-awards-mobile-registration-notice-seen','1');}catch{}});
  await sourcePage.goto('http://127.0.0.1:3001'+source,{waitUntil:'networkidle'});await sourcePage.evaluate(()=>document.fonts.ready);
  const editStage=manifest.pages.find(p=>p.file===file).editStage;
  if(editStage) {
    await sourcePage.getByRole('button',{name:'Chỉnh sửa hồ sơ',exact:true}).click();
    await sourcePage.getByRole('heading',{name:'Chỉnh sửa hồ sơ',exact:true}).waitFor();
    if(editStage>1){await sourcePage.locator('.nomination-registration-form button[type=submit]').click();await sourcePage.getByRole('heading',{name:'Xác nhận cập nhật',exact:true}).waitFor();}
    if(editStage>2){await sourcePage.locator('.nomination-confirmation-form input[type=checkbox][required]').check();await sourcePage.getByRole('button',{name:'Lưu thay đổi'}).click();await sourcePage.getByRole('heading',{name:'Cập nhật hồ sơ thành công',exact:true}).waitFor();}
  }
  const reference=await sourcePage.evaluate(()=>({height:document.body.scrollHeight,h1:document.querySelector('h1')?.getBoundingClientRect().width}));
  measurements.push({file,width,actual,reference,heightDifference:actual.height-reference.height});
  if(Math.abs(actual.height-reference.height)>2 && !(process.argv.includes('--skip-article-height')&&source.startsWith('/tin-tuc/')))failures.push(`${file}@${width}: layout height differs by ${actual.height-reference.height}`);
  if(['index.html','dang-ky-tru-cot-1.html','tin-tuc.html','the-le.html'].includes(file)) {
   await page.screenshot({path:path.join(qaDirectory,`${file}-${width}.png`),fullPage:true});
   await sourcePage.screenshot({path:path.join(qaDirectory,`source-${file}-${width}.png`),fullPage:true});
  }
  await sourcePage.close();
 }
}
await page.goto(pathToFileURL(path.join(root,'index.html')).href);
await page.locator('#award-tab-1').click();
if(!(await page.locator('#award-panel-1').isVisible()))failures.push('Pioneering tab not visible');
if(await page.locator('#award-panel-1 li').count()!==9)failures.push('Pioneering categories incomplete');
await page.goto(pathToFileURL(path.join(root,'dang-ky-de-cu.html')).href+'?category=tien-phong-1');
if(await page.locator('input[type=radio]:checked').count()!==1)failures.push('Category deep link not selected');
if(!((await page.locator('input[type=radio]:checked').getAttribute('value'))||'').startsWith('Nhân vật'))failures.push('Incorrect deep-link category');
await page.locator('button[type=submit]').click();await page.waitForURL('**/dang-ky-tien-phong-1.html');
await page.getByRole('button',{name:'Lưu lại hồ sơ',exact:true}).filter({visible:true}).first().click();
if(!await page.locator('dialog[open]').count())failures.push('Save dialog failed');
await page.goto(pathToFileURL(path.join(root,'thanh-cong.html')).href);
await page.getByRole('button',{name:'Chỉnh sửa hồ sơ',exact:true}).click();await page.waitForURL('**/chinh-sua-ho-so.html');
await page.locator('.nomination-registration-form button[type=submit]').click();await page.waitForURL('**/xac-nhan-cap-nhat.html');
await page.locator('.nomination-confirmation-form input[type=checkbox][required]').check();
await page.getByRole('button',{name:'Lưu thay đổi'}).click();await page.waitForURL('**/cap-nhat-thanh-cong.html');
if(!await page.getByRole('heading',{name:'Cập nhật hồ sơ thành công',exact:true}).count())failures.push('Edit/update handoff flow failed');
failures.push(...errors);
await browser.close();
await fs.writeFile(path.join(root,'qa/report.json'),JSON.stringify({pages:manifest.pages.length,skipArticleHeight:process.argv.includes('--skip-article-height'),measurements,failures},null,2));
console.log(JSON.stringify({pages:manifest.pages.length,checks:measurements.length,failures},null,2));
if(failures.length)process.exitCode=1;
