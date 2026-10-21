const {chromium} = require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({channel:'msedge',headless:true});
  const rows=[];
  try {
    for (const width of [1440,768,390]) {
      const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
      await page.goto('http://127.0.0.1:3000/phase-2',{waitUntil:'networkidle'});
      for (const variant of ['actual','short','long']) {
        if(variant!=='actual') await page.locator('.voting-card-link').first().evaluate((el,value)=>el.textContent=value,variant==='short'?'Đà Nẵng':'VinWonders Phú Quốc – Khám phá thế giới văn hóa và giải trí qua những hành trình trải nghiệm dành cho mọi thế hệ');
        const metrics=await page.locator('.voting-card').first().evaluate(card=>{
          const body=card.querySelector('.voting-card-body'), heading=card.querySelector('h3'), title=card.querySelector('.voting-card-link'), org=card.querySelector('.voting-card-organization'), button=card.querySelector('.voting-card-actions > .button');
          const b=body.getBoundingClientRect(),h=heading.getBoundingClientRect(),t=title.getBoundingClientRect(),o=org.getBoundingClientRect(),c=button.getBoundingClientRect();
          const s=getComputedStyle(body),hs=getComputedStyle(heading),os=getComputedStyle(org);
          return {padding:[s.paddingTop,s.paddingRight,s.paddingBottom,s.paddingLeft],titleLineHeight:hs.lineHeight,orgLineHeight:os.lineHeight,titleHeight:t.height,headingHeight:h.height,titleToOrg:o.top-t.bottom,headingToOrg:o.top-h.bottom,orgToButton:c.top-o.bottom,titleInset:t.left-b.left,orgInset:o.left-b.left,buttonHeight:c.height,overflow:document.documentElement.scrollWidth>innerWidth};
        });
        if(metrics.overflow && variant==='actual') console.log('Overflow elements: '+JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width && (r.right>innerWidth+1||r.left< -1)&&!el.closest('dialog');}).slice(0,12).map(el=>({tag:el.tagName,class:el.className,right:el.getBoundingClientRect().right})))));
        rows.push({width,variant,...metrics});
        if(variant==='actual') await page.locator('.voting-card').first().screenshot({path:path.join(process.env.TEMP,`voting-card-spacing-${width}.png`)});
      }
      await page.close();
    }
  }finally{await browser.close();}
  await fs.writeFile('docs/voting-card-spacing-qa.json',JSON.stringify({date:'2026-10-20',measurements:rows},null,2)+'\n');
  console.log(JSON.stringify(rows));
})().catch(error=>{console.error(error);process.exitCode=1;});
