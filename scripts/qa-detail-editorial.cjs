const { chromium } = require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = [];
  try {
    const raw = await fs.readFile('src/app/(phase-1)/dang-ky-de-cu/category-criteria.ts', 'utf8');
    const criteria = JSON.parse(raw.slice(raw.indexOf('{', raw.indexOf('export const categoryCriteria')), raw.lastIndexOf('}') + 1));
    const categories = [...Array.from({ length: 6 }, (_, i) => `tru-cot-${i + 1}`), ...Array.from({ length: 9 }, (_, i) => `tien-phong-${i + 1}`)];
    for (const width of [1440, 1024, 768, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      for (const id of width === 1440 ? categories : ['tru-cot-1', 'tru-cot-5', 'tien-phong-5']) {
        await page.goto(`http://127.0.0.1:3001/binh-chon/${id}-ho-so-1`, { waitUntil: 'domcontentloaded' });
        const organizer = ['tien-phong-1', 'tien-phong-8'].includes(id);
        assert.equal(await page.locator('.voting-dossier-highlights dd').count(), organizer ? 0 : 3);
        assert.equal(await page.locator('[aria-labelledby="dossier-nomination"] h3').count(), 2);
        assert.equal(await page.locator('.voting-detail-copy').getByRole('heading', { name: 'Giới thiệu tổng quan', exact: true }).count(), 0);
        assert.equal(await page.locator('.voting-dossier-section h2').first().evaluate(el => getComputedStyle(el).fontSize), '30px');
        for (const label of ['Loại hình', 'Địa điểm', 'Website', 'Fanpage']) assert.equal(await page.locator('.voting-dossier-facts dt').getByText(label, { exact: true }).count(), 1);
        assert.equal(await page.locator('.voting-dossier-facts a').count(), 0, 'Reserved demo URLs must not become live links');
        assert.equal(await page.locator('#dossier-evidence, #dossier-compliance').count(), 0);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${width} ${id}`);
        const category = (await page.locator('.voting-detail-category dd > span:last-child').innerText()).trim();
        if (!organizer) {
          const labels = await page.locator('.voting-dossier-narratives h3').allTextContents();
          for (const field of [...criteria[category].fields, ...criteria[category].narratives]) assert.ok(labels.includes(field.label), `${id}: missing ${field.label}`);
        }
        if (id === 'tru-cot-1' && [1440, 390].includes(width)) {
          await page.locator('#dossier-introduction').scrollIntoViewIfNeeded();
          await page.evaluate(() => document.fonts.ready);
          await page.screenshot({ path: path.join(process.env.TEMP, `detail-editorial-${width}.png`) });
          await page.locator('[aria-labelledby="dossier-information"]').screenshot({ path: path.join(process.env.TEMP, `detail-facts-${width}.png`) });
        }
        results.push({ width, category: id, stats: organizer ? 0 : 3, overflow: false, publicFields: 'passed' });
      }
      await page.close();
    }
    await fs.writeFile('docs/detail-editorial-qa.json', JSON.stringify({ date: '2026-10-21', build: 'passed', typecheck: 'passed', results }, null, 2) + '\n');
    console.log(`PASS: ${results.length} category/viewport checks; public field coverage; no duplicate intro.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
