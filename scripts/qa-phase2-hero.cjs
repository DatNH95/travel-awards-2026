const {chromium}=require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
(async()=>{
  const browser=await chromium.launch({channel:'msedge',headless:true});
  const results=[];
  try{
    for(const width of [1440,768,390]){
      const page=await browser.newPage({viewport:{width,height:1100},reducedMotion:'reduce'});
      const measure=()=>page.evaluate(()=>{
        const hero=document.querySelector('.home-hero').getBoundingClientRect();
        const cta=(document.querySelector('.home-hero-actions .home-cta') || document.querySelector('.home-hero-actions .home-countdown')).getBoundingClientRect();
        const cue=document.querySelector('.home-hero-foot')?.getBoundingClientRect();
        const heading=document.querySelector('#about h2').getBoundingClientRect();
        return {heroHeight:hero.height,headingTop:heading.top,gapAfterHero:heading.top-hero.bottom,ctaToCue:cue ? cue.top-cta.bottom : null,heroContainsCue:cue ? cue.bottom<=hero.bottom : null,ctaBottomPadding:hero.bottom-cta.bottom,overflow:document.documentElement.scrollWidth>innerWidth};
      });
      await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});
      const phase1=await measure();
      await page.goto('http://127.0.0.1:3000/phase-2',{waitUntil:'networkidle'});
      const phase2=await measure();
      console.log(JSON.stringify({width,phase1,phase2}));
      assert(phase2.heroHeight<phase1.heroHeight);
      assert(phase2.headingTop<phase1.headingTop);
      assert(phase2.gapAfterHero<=48);
      assert.equal(phase2.ctaToCue,null);
      assert(phase2.ctaBottomPadding>=32 && phase2.ctaBottomPadding<=48);
      assert(!phase2.overflow);
      await page.screenshot({path:path.join(process.env.TEMP,`phase2-hero-${width}.png`)});
      results.push({width,phase1,phase2});
      await page.close();
    }
  }finally{await browser.close();}
  await fs.writeFile('docs/phase2-hero-qa.json',JSON.stringify({date:'2026-10-20',results},null,2)+'\n');
  console.log(JSON.stringify(results));
})().catch(error=>{console.error(error);process.exitCode=1;});
