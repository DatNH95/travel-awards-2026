import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve('hand-off-phase 2'),base=process.env.QA_BASE_URL||'http://127.0.0.1:3001';
const manifest=JSON.parse(await fs.readFile(path.join(root,'manifest.json'),'utf8'));
const errors=[],checks=[],measurements=[];
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
  const context=await browser.newContext({reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
  for(const relative of ['css/tokens.css','css/base.css','css/home.css','css/voting.css','assets/icons/flaticon/uicons-regular-rounded.css','assets/icons/flaticon/uicons-brands.css']) {
    const file=path.join(root,relative),css=await fs.readFile(file,'utf8');
    for(const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
      const value=match[1];if(/^(https?:|data:|#)/.test(value))continue;
      assert(!value.startsWith('/'),relative+': portable asset '+value);await fs.access(path.resolve(path.dirname(file),decodeURIComponent(value)));
    }
  }
  for(const {file} of manifest.pages){
    const html=await fs.readFile(path.join(root,file),'utf8');
    assert(!/<main\b|<div class="home(?: |")|_next\/|self\.__next|data-nimg|next-route-announcer/.test(html),file+': clean framework-free shell');
    assert(!/Thông tin người đại diện|Cam kết pháp lý|Hồ sơ giới thiệu đề cử/.test(html),file+': no private dossier sections');
    const shell=await page.evaluate(html=>{const doc=new DOMParser().parseFromString(html,'text/html');const ids=[...doc.querySelectorAll('[id]')].map(node=>node.id);return {header:!!doc.querySelector('body > header.home-header'),footer:!!doc.querySelector('body > footer.home-footer'),main:!!doc.querySelector('section#main'),unique:ids.length===new Set(ids).size,links:[...doc.querySelectorAll('[href],[src],[poster]')].flatMap(node=>['href','src','poster'].map(attr=>node.getAttribute(attr)).filter(Boolean))};},html);
    assert(shell.header&&shell.footer&&shell.main&&shell.unique,file+': semantic shell and unique IDs');
    for(const value of shell.links){if(/^(https?:|mailto:|tel:|data:|#)/.test(value))continue;assert(!value.startsWith('/'),file+': relative path '+value);await fs.access(path.resolve(root,decodeURIComponent(value.split(/[?#]/)[0])));}
  }
  checks.push({staticPages:manifest.pages.length,shell:'passed',links:'passed',runtimeResidue:false});
  const samples=[['index.html','/phase-2'],['binh-chon.html','/binh-chon'],['ho-so-tru-cot-1-ho-so-1.html','/binh-chon/tru-cot-1-ho-so-1'],['ho-so-tru-cot-1-ho-so-2.html','/binh-chon/tru-cot-1-ho-so-2']];
  const selectors=['.home-header','.home-hero','.home-voting','.voting-intro','.voting-filter-toolbar','.voting-category-navigation','.voting-grid','.voting-card','.home-voting-community','#participate','#journey','#awards','#news','#nominate','#organizer','.voting-detail-layout','.voting-detail-gallery','.voting-detail-intro','.voting-detail-actions','.voting-related','.home-footer'];
  const measure=()=>{
    const selectors=['.home-header','.home-hero','.home-voting','.voting-intro','.voting-filter-toolbar','.voting-category-navigation','.voting-grid','.voting-card','.home-voting-community','#participate','#journey','#awards','#news','#nominate','#organizer','.voting-detail-layout','.voting-detail-gallery','.voting-detail-intro','.voting-detail-actions','.voting-related','.home-footer'];
    return {overflow:document.documentElement.scrollWidth>innerWidth+1,height:document.body.scrollHeight,rects:Object.fromEntries(selectors.flatMap(selector=>{const node=document.querySelector(selector);if(!node)return [];const r=node.getBoundingClientRect(),s=getComputedStyle(node);return [[selector,{x:r.x,y:r.y+scrollY,width:r.width,height:r.height,font:s.fontSize,line:s.lineHeight}]];}))};
  };
  for(const width of [1440,768,390,320]){
    await page.setViewportSize({width,height:1000});
    for(const [file,route] of samples){
      await page.goto(base+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);const source=await page.evaluate(measure);
      await page.goto(pathToFileURL(path.join(root,file)).href,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);const handoff=await page.evaluate(measure);
      assert(await page.evaluate(()=>document.fonts.check('20px "uicons-regular-rounded"')),file+': local icon font loaded');
      assert(!handoff.overflow,`${file} ${width}: no overflow`);
      const differences=[];
      for(const selector of selectors){const a=source.rects[selector],b=handoff.rects[selector];if(!a&&!b)continue;assert(a&&b,selector+' exists');for(const key of ['x','y','width','height'])if(Math.abs(a[key]-b[key])>2)differences.push(`${selector}.${key}: ${a[key]} -> ${b[key]}`);if(a.font!==b.font||a.line!==b.line)differences.push(selector+': typography');}
      measurements.push({file,width,heightDelta:handoff.height-source.height,differences});
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'networkidle'});
  assert.equal(await page.locator('.voting-card:visible').count(),10);
  await page.locator('.home-award-tabs [role=tab]').nth(1).click();assert.equal(await page.locator('[role=tabpanel]:visible .home-award-category-link').count(),9);
  const search=page.getByRole('combobox');await search.fill('khong-co-ho-so-nay');assert.equal(await page.locator('.voting-empty').count(),1);await search.fill('Phú Quốc');assert(await page.locator('.voting-card:visible').count()>0);assert.equal(await search.getAttribute('aria-expanded'),'true');await search.press('ArrowDown');assert(await search.getAttribute('aria-activedescendant'));await search.press('Enter');await page.getByRole('button',{name:'Xóa tìm kiếm',exact:true}).click();
  const recentBefore=await page.locator('.voting-recent-slide').count();
  await page.locator('.voting-card:visible .voting-survey-trigger').first().click();
  const dialog=page.locator('dialog[open]');assert(await dialog.locator('[type=submit]').isDisabled());await dialog.getByLabel('Đã trải nghiệm',{exact:true}).check();await dialog.locator('[type=submit]').click();assert.equal(await page.locator('.voting-recent-slide').count(),recentBefore);assert.equal(await page.locator('.voting-card .voting-survey-trigger:disabled').count(),0);
  await dialog.getByLabel('Rất hài lòng',{exact:true}).check();await dialog.locator('[type=submit]').click();await dialog.getByRole('button',{name:'Đóng',exact:true}).click();
  assert.equal(await page.locator('.voting-card .voting-survey-trigger:disabled').count(),10);assert.equal(await page.locator('.voting-card-confirmation').count(),1);assert.equal(await page.locator('.voting-participant-item[data-current=true]').count(),1);assert((await page.locator('.voting-card-count strong').allTextContents()).every(value=>value==='245'));
  for(const category of manifest.categories.slice(1)){
    const pioneering=category.startsWith('tien-phong'),index=Number(category.split('-').pop())-1;
    await page.locator('.voting-group-trigger').nth(pioneering?1:0).click();await page.locator('.voting-group-menu button').nth(index).click();assert.equal(await page.locator('.voting-card .voting-survey-trigger:disabled').count(),0);
    await page.locator('.voting-card .voting-survey-trigger').first().click();await dialog.getByLabel('Chưa trải nghiệm',{exact:true}).check();await dialog.getByLabel('Rất muốn',{exact:true}).check();await dialog.locator('[type=submit]').click();await dialog.getByRole('button',{name:'Đóng',exact:true}).click();assert.equal(await page.locator('.voting-card .voting-survey-trigger:disabled').count(),10);
  }
  assert((await page.locator('.voting-participant-item[data-current=true] .voting-participant-progress').innerText()).includes('15'));
  await page.reload({waitUntil:'networkidle'});assert.equal(await page.locator('.voting-survey-trigger:disabled').count(),0);assert.equal(await page.locator('.voting-participant-item[data-current=true]').count(),0);
  checks.push({search:'passed',tabs:'passed',categories:15,incompleteSurvey:'not recorded',completedSurvey:'locks whole category',community:'completed events only',fixture245:'unchanged',reload:'resets'});
  for(const count of [1,2]){
    await page.goto(pathToFileURL(path.join(root,`ho-so-tru-cot-1-ho-so-${count}.html`)).href,{waitUntil:'networkidle'});
    if(count===2){await page.getByRole('button',{name:'Ảnh tiếp theo',exact:true}).click();assert.equal(await page.locator('.voting-gallery-slide[data-active=true]').count(),1);assert.equal(await page.locator('.voting-gallery-count').innerText(),'2 / 6');}
    await page.getByRole('button',{name:'Phóng to ảnh',exact:true}).click();assert.equal(await page.locator('.voting-gallery-lightbox[open] img').count(),1);await page.keyboard.press('Escape');assert.equal(await page.locator('dialog[open]').count(),0);
    assert.equal(await page.locator('.voting-related-track .voting-card').count(),9);
  }
  checks.push({gallery:'one and six images; zoom/Escape passed',relatedProfiles:9});
  await page.goto(pathToFileURL(path.join(root,'index.html')).href,{waitUntil:'networkidle'});await page.screenshot({path:path.join(root,'qa-desktop.png'),fullPage:true});await page.setViewportSize({width:390,height:844});await page.reload({waitUntil:'networkidle'});await page.screenshot({path:path.join(root,'qa-mobile.png'),fullPage:true});
  assert.deepEqual(errors,[]);
  const differences=measurements.filter(item=>item.differences.length);
  await fs.writeFile('docs/phase2-handoff-qa.json',JSON.stringify({date:new Date().toISOString(),checks,measurements,errors,limitations:['Demo state resets on full HTML navigation; Tech integrates cross-route state.'],passed:!differences.length},null,2)+'\n');
  assert.equal(differences.length,0,JSON.stringify(differences,null,2));
  console.log(JSON.stringify({pages:manifest.pages.length,responsiveComparisons:measurements.length,checks,errors}));
} finally {await browser.close();}
