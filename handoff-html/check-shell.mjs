// Development-only checks for the plain HTML document shell.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {flattenDocument} from './structure.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve('handoff-html');
const files=(await fs.readdir(root)).filter(file=>file.endsWith('.html'));
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({reducedMotion:'reduce'});
await page.addInitScript(()=>{try{localStorage.setItem('travel-awards-mobile-registration-notice-seen','1');}catch{}});
const failures=[],uiErrors=[],checks=[];
page.on('pageerror',error=>uiErrors.push(error.message));
// Remote editorial images are outside the document-shell check.
await page.route(/^https?:/,route=>route.abort());
try {
  for(const file of files) {
    let html=await fs.readFile(path.join(root,file),'utf8');
    if(process.argv.includes('--fix')) {
      html=await page.evaluate(({html,transform})=>{
        const doc=new DOMParser().parseFromString(html,'text/html');new Function('return ('+transform+')')()(doc);
        for(const anchor of doc.querySelectorAll('a[href^="/"]:not([href^="//"])')) {
          const url=new URL(anchor.getAttribute('href'),'http://local');
          if(url.pathname==='/')anchor.setAttribute('href','index.html'+url.hash);
          else if(url.pathname==='/the-le')anchor.setAttribute('href','the-le.html'+url.hash);
          else if(url.pathname==='/dang-ky-de-cu')anchor.setAttribute('href','dang-ky-de-cu.html'+url.search+url.hash);
          else if(url.pathname==='/tin-tuc')anchor.setAttribute('href',(url.searchParams.get('page')&&url.searchParams.get('page')!=='1'?`tin-tuc-${url.searchParams.get('page')}.html`:'tin-tuc.html')+url.hash);
          else if(url.pathname.startsWith('/tin-tuc/'))anchor.setAttribute('href',`tin-${url.pathname.split('/').pop()}.html`+url.hash);
        }
        return '<!doctype html>\n'+doc.documentElement.outerHTML.replace(/><(?=\/?(?:html|head|body|header|footer|nav|section|article|aside|div|form|fieldset|ul|ol|li|h[1-6]|p|dialog|details|summary|link|meta|script)\b)/g,'>\n<');
      },{html,transform:flattenDocument.toString()});
      for(let attempt=0;;attempt++){try{await fs.writeFile(path.join(root,file),html);break;}catch(error){if(error.code!=='UNKNOWN'||attempt>=7)throw error;await new Promise(resolve=>setTimeout(resolve,250));}}
    }
    const result=await page.evaluate(html=>{
      const doc=new DOMParser().parseFromString(html,'text/html');
      const errors=[];
      if(doc.querySelectorAll('body > header.home-header').length!==1)errors.push('Header must be a direct body child');
      if(doc.querySelectorAll('body > footer.home-footer').length!==1)errors.push('Footer must be a direct body child');
      if(doc.querySelector('div.home, main'))errors.push('Legacy home/main wrapper');
      if(doc.querySelector('body > div[hidden], next-route-announcer, nextjs-portal'))errors.push('Framework-only node');
      if(doc.querySelectorAll('#main').length!==1)errors.push('Missing or duplicate main anchor');
      const ids=[...doc.querySelectorAll('[id]')].map(el=>el.id);
      if(new Set(ids).size!==ids.length)errors.push('Duplicate IDs');
      if([...doc.scripts].some(script=>script.src&&!script.getAttribute('src').startsWith('js/')||!script.src))errors.push('Unexpected script');
      for(const link of doc.querySelectorAll('a[href^="#"]'))if(link.hash.length>1&&!doc.getElementById(decodeURIComponent(link.hash.slice(1))))errors.push('Broken anchor '+link.hash);
      return {errors,links:[...doc.querySelectorAll('[href],[src]')].map(el=>el.getAttribute('href')||el.getAttribute('src')).filter(Boolean)};
    },html);
    failures.push(...result.errors.map(error=>`${file}: ${error}`));
    if(/_next\/|self\.__next|data-nimg|next-route-announcer/.test(html))failures.push(`${file}: Next runtime residue`);
    for(const link of result.links) {
      if(/^(?:https?:|mailto:|tel:|data:|#)/.test(link))continue;
      if(link.startsWith('/'))failures.push(`${file}: nonportable absolute link ${link}`);
      const target=decodeURIComponent(link.split(/[?#]/)[0]);
      try{await fs.access(path.join(root,target));}catch{failures.push(`${file}: missing ${target}`);}
    }
  }
  for(const file of ['index.html','the-le.html','tin-tuc.html','tin-travel-awards-dau-an-tien-phong.html','dang-ky-de-cu.html','dang-ky-tru-cot-1.html','xac-nhan.html','thanh-cong.html'])for(const width of [1440,390]) {
    await page.setViewportSize({width,height:1000});await page.goto(pathToFileURL(path.join(root,file)).href);await page.evaluate(()=>document.fonts.ready);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    checks.push({file,width,overflow});if(overflow)failures.push(`${file}@${width}: overflow`);
  }
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.locator('#award-tab-1').click();
  if(!await page.locator('#award-panel-1').isVisible())failures.push('Homepage tab failed');
  await page.goto(pathToFileURL(path.join(root,'dang-ky-de-cu.html')).href+'?category=tien-phong-1');
  await page.locator('button[type=submit]').click();await page.waitForURL('**/dang-ky-tien-phong-1.html');
  await page.getByRole('button',{name:'Lưu lại hồ sơ',exact:true}).filter({visible:true}).first().click();
  if(!await page.locator('dialog[open]').count())failures.push('Dialog failed');
  await page.goto(pathToFileURL(path.join(root,'tin-tuc.html')).href);
  await page.getByRole('link',{name:'Trang 2',exact:true}).click();await page.waitForURL('**/tin-tuc-2.html#news-latest');
  const mobilePage=await browser.newPage({viewport:{width:390,height:844}});
  await mobilePage.route(/^https?:/,route=>route.abort());
  await mobilePage.goto(pathToFileURL(path.join(root,'dang-ky-de-cu.html')).href);
  await mobilePage.evaluate(()=>localStorage.removeItem('travel-awards-mobile-registration-notice-seen'));
  await mobilePage.reload();
  if(!await mobilePage.locator('.nomination-mobile-notice[open]').count())failures.push('Mobile notice did not open');
  await mobilePage.getByRole('button',{name:'Đã hiểu',exact:true}).click();
  await mobilePage.reload();if(await mobilePage.locator('.nomination-mobile-notice[open]').count())failures.push('Mobile notice repeated');
  await mobilePage.close();
  await page.goto(pathToFileURL(path.join(root,'the-le.html')).href+'#criteria-0-1');
  if(!await page.locator('#criteria-0-1').evaluate(el=>el.open))failures.push('Linked criteria did not open');
  await page.getByRole('link',{name:/Điều lệ & quy định/}).click();
  await page.waitForFunction(()=>document.querySelector('.rules-nav a[href="#quy-dinh"]')?.getAttribute('aria-current')==='location');
  for(const [now,label,seconds] of [
    ['2026-10-15T23:59:59+07:00','Thời gian mở nhận đề cử còn lại:','01'],
    ['2026-10-16T00:00:00+07:00','Hãy tham gia ngay','00'],
    ['2026-11-16T23:59:00+07:00','Đã hết hạn gửi đề cử','00']
  ]) {
    const phasePage=await browser.newPage();
    await phasePage.route(/^https?:/,route=>route.abort());
    await phasePage.addInitScript(value=>{Date.now=()=>value;},Date.parse(now));
    await phasePage.goto(pathToFileURL(path.join(root,'index.html')).href);
    if(await phasePage.locator('.home-countdown-deadline').textContent()!==label||await phasePage.locator('.home-countdown-value').last().textContent()!==seconds)failures.push(`Countdown phase failed: ${now}`);
    await phasePage.close();
  }
  failures.push(...uiErrors);
  await fs.writeFile(path.join(root,'qa/shell-report.json'),JSON.stringify({pages:files.length,responsiveChecks:checks.length,countdownChecks:3,checks,failures},null,2));
  console.log(JSON.stringify({pages:files.length,responsiveChecks:checks.length,failures},null,2));
  if(failures.length)process.exitCode=1;
}finally{await browser.close();}
