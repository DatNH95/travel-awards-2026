const {chromium}=require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const {execFileSync}=require('node:child_process');

const base=process.env.QA_BASE_URL||'http://127.0.0.1:3001';
const baseline=process.env.QA_BASELINE_URL;
const phase1Routes=['/','/dang-ky-de-cu','/dang-ky-de-cu?category=tru-cot-3&step=2','/dang-ky-de-cu?preview=3','/dang-ky-de-cu?preview=4','/the-le','/tin-tuc','/tin-tuc/travel-awards-dau-an-tien-phong'];
const phase2Routes=['/phase-2','/binh-chon','/binh-chon/tru-cot-1-ho-so-1'];

(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const checks=[],errors=[];
 try {
  for(const file of ['src/app/globals.css','src/components/site-header.tsx','src/components/site-footer.tsx','src/components/header-navigation.tsx','src/components/primitives.tsx','src/components/award-tabs.tsx','src/components/hero-stage.tsx','public/assets/key-visual/facebook.svg']){
   assert.equal(await fs.readFile(file,'utf8'),execFileSync('git',['show','phase-1-final:'+file],{encoding:'utf8'}),file+' matches Phase 1 tag');
  }
  const phase1Layout=await fs.readFile('src/app/(phase-1)/layout.tsx','utf8');
  assert(!/VotingSessionProvider|flaticon|phase-2-scope/.test(phase1Layout));
  const phase2Layout=await fs.readFile('src/app/(phase-2)/layout.tsx','utf8');
  assert(phase2Layout.includes('VotingSessionProvider')&&phase2Layout.includes('phase-2-scope'));
  for(const width of [1440,390]){
   for(const route of phase1Routes){
    const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
    const iconRequests=[];
    page.on('pageerror',error=>errors.push({route,width,message:error.message}));
    page.on('request',request=>{if(request.url().includes('/assets/icons/flaticon/'))iconRequests.push(request.url());});
    await page.addInitScript(()=>{Date.now=()=>Date.parse('2026-10-20T12:00:00+07:00');localStorage.setItem('travel-awards-mobile-registration-notice-seen','1');});
    const response=await page.goto(base+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
    assert.equal(response.status(),200,route);
    assert.equal(await page.locator('.ui-icon,.phase-2-scope,.home-voting').count(),0,route+' excludes Phase 2 UI');
    assert.equal(await page.locator('link[href*="flaticon"]').count(),0);
    assert.equal(iconRequests.length,0,route+' does not load Phase 2 icon assets');
    assert(await page.locator('.home-nav-home img[src$="home.svg"]').count());
    assert(!((await page.locator('.home-footer').innerText()).includes('Uicons by')));
    const metrics=await page.evaluate(()=>({mainText:document.querySelector('main').innerText,mainHeight:document.querySelector('main').getBoundingClientRect().height,footerHeight:document.querySelector('.home-footer').getBoundingClientRect().height,overflow:document.documentElement.scrollWidth>innerWidth}));
    assert.equal(metrics.overflow,false,route+' overflow');
    let baselineMatches=null;
    if(baseline){
     const original=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
     await original.addInitScript(()=>{Date.now=()=>Date.parse('2026-10-20T12:00:00+07:00');localStorage.setItem('travel-awards-mobile-registration-notice-seen','1');});
     await original.goto(baseline+route,{waitUntil:'networkidle'});await original.evaluate(()=>document.fonts.ready);
     const before=await original.evaluate(()=>({mainText:document.querySelector('main').innerText,mainHeight:document.querySelector('main').getBoundingClientRect().height,footerHeight:document.querySelector('.home-footer').getBoundingClientRect().height}));
     assert.equal(metrics.mainText,before.mainText,route+' main content');
     assert(Math.abs(metrics.mainHeight-before.mainHeight)<1,route+' main geometry');
     assert(Math.abs(metrics.footerHeight-before.footerHeight)<1,route+' footer geometry');
     baselineMatches=true;await original.close();
    }
    checks.push({width,route,phase:1,iconRequests:0,baselineMatches,...metrics,mainText:undefined});await page.close();
   }
   for(const route of phase2Routes){
    const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
    page.on('pageerror',error=>errors.push({route,width,message:error.message}));
    const response=await page.goto(base+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
    assert.equal(response.status(),200);
    assert.equal(await page.locator('body.phase-2-scope').count(),1);
    assert.equal(await page.locator('link[rel="stylesheet"][href*="flaticon"]').count(),2);
    assert(await page.locator('.ui-icon').count());
    assert((await page.locator('.home-footer').innerText()).includes('Uicons by'));
    assert.equal(await page.locator('a[href*="dang-ky-de-cu"]').count(),0);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.evaluate(()=>{window.__phaseIsolationProbe=true;});
    await page.locator('.home-footer a[aria-label="Travel Awards — Trang chủ"]').click();
    await page.waitForURL(base+'/#main');await page.waitForLoadState('networkidle');
    assert.equal(await page.evaluate(()=>window.__phaseIsolationProbe),undefined,'cross-phase root layout reload');
    assert.equal(await page.locator('body.phase-2-scope,.ui-icon,link[href*="flaticon"]').count(),0);
    assert.equal(await page.locator('.home-header-cta').innerText(),'Đăng ký đề cử');
    checks.push({width,route,phase:2,icons:true,credit:true,crossPhaseReload:true,phase1StylesRestored:true});await page.close();
   }
  }
  assert.deepEqual(errors,[]);
 }finally{await browser.close();}
 await fs.writeFile('docs/phase-isolation-qa.json',JSON.stringify({date:'2026-10-20',baselineTag:'phase-1-final',checks,errors},null,2)+'\n');
 console.log(JSON.stringify({checks:checks.length,errors}));
})().catch(error=>{console.error(error);process.exitCode=1});
