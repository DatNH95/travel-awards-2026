const base=process.env.QA_BASE_URL||'http://localhost:8080';
const path=require('node:path'),{pathToFileURL}=require('node:url');const handoff=process.env.QA_HANDOFF==='1';
const route=value=>handoff?pathToFileURL(path.resolve('hand-off-phase 2',value==='/'?'../handoff-html/index.html':value==='/phase-2'?'index.html':value==='/binh-chon'?'binh-chon.html':'ho-so-'+value.split('/').pop()+'.html')).href:base+value;
const {chromium}=require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');const assert=require('assert');
(async()=>{
 const profiles=require('../src/data/voting-profiles.json');const dossiers=require('../src/data/voting-public-dossiers.json');
 const browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const results=[];
 for(const p of profiles){const r=await page.goto(route('/binh-chon/'+p.slug),{waitUntil:'domcontentloaded'});assert.equal(r.status(),200);await page.locator('.voting-detail-intro h1').waitFor();assert.equal(await page.locator('h1').innerText(),p.name);const text=await page.locator('.voting-detail-copy').innerText();assert(text.includes(dossiers[p.code].intro.slice(0,70)));assert(!text.includes('travel-experience.example.com'));assert(!(await page.locator('.voting-detail-survey').innerText()).includes('245'));results.push({code:p.code,status:r.status()});}
 const hotel=profiles.find(p=>p.code==='579');await page.goto(route('/binh-chon/'+hotel.slug));await page.locator('.voting-gallery-slide').first().waitFor();
 const gallery=await page.locator('.voting-gallery-slide').evaluateAll(imgs=>imgs.map(i=>({loaded:i.complete&&i.naturalWidth>0,src:i.getAttribute('src')})));
 await page.screenshot({path:'.local-runtime/real-detail-desktop.png'});
 await page.locator('.voting-detail-survey .voting-survey-trigger').click();const dialog=page.locator('dialog[open]');assert.equal(await dialog.locator('input[name="experienced-profile"]:checked').count(),1);await dialog.getByRole('button',{name:'Tiếp tục',exact:true}).click();await dialog.locator('input[type="radio"][value="5"]').first().check();await dialog.getByRole('button',{name:'Hoàn tất',exact:true}).click();await dialog.getByRole('heading',{name:'Lịch sử khảo sát',exact:true}).waitFor();await dialog.getByRole('button',{name:'Hạng mục tiếp theo',exact:true}).click();assert.equal(await dialog.locator('input[name="survey-category"]:disabled').count(),6);
 await dialog.getByRole('button',{name:'Để sau',exact:true}).click();
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'.local-runtime/real-detail-mobile.png'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.goto(route('/phase-2'));assert.equal(await page.locator('#about .voting-card').count(),profiles.filter(item=>item.categoryId.startsWith('tru-cot-')).length);
 await page.goto(route('/'));assert.equal(await page.locator('.voting-card').count(),0);
 assert.deepEqual(errors,[]);fs.writeFileSync(handoff?'hand-off-phase 2/qa/real-profiles.json':'docs/voting-real-profiles-qa.json',JSON.stringify({profiles:results,gallery,desktop:1440,mobile:390,overflow:false,popup:true,phase1Unchanged:true,errors},null,2));console.log(JSON.stringify({detailRoutes:results.length,galleryLoaded:gallery.filter(i=>i.loaded).length,galleryTotal:gallery.length,errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
