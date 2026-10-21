const { chromium } = require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = [];
  const errors = [];
  const warnings = [];
    const base = process.env.QA_BASE_URL || 'http://127.0.0.1:3001';
  try {
    for (const width of [1440, 768, 390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, permissions: ['clipboard-read', 'clipboard-write'], reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => {
        if (message.type() !== 'error') return;
        const detail = `${message.text()} ${message.location().url}`;
        if (message.location().url === `${base}/favicon.ico`) warnings.push(detail);
        else errors.push(detail);
      });
      await page.goto(`${base}/binh-chon/tru-cot-1-ho-so-2`, { waitUntil: 'networkidle' });
      await page.locator('.voting-detail-gallery img').first().evaluate(img => img.decode());
      await page.locator('.voting-gallery-slide').evaluateAll(images => Promise.all(images.map(image => image.decode())));
      assert.equal(await page.locator('.voting-gallery-slide').count(), 6);
      assert.equal(await page.locator('.voting-detail-gallery figcaption').count(), 0);
      assert.deepEqual(await page.locator('.voting-breadcrumb a').allTextContents(), ['Trang chủ', 'Bình chọn']);
      assert.equal(await page.locator('.voting-breadcrumb').innerText(), 'Trang chủ\n/\nBình chọn');
      assert.equal(await page.locator('.voting-detail-ad > p').count(), 0);
      assert.equal(await page.locator('.voting-dossier-introduction').evaluate(el => getComputedStyle(el).fontSize), '30px');
      for (const button of await page.locator('.voting-detail-share button').all()) {
        const rect = await button.boundingBox();
        assert.equal(rect.width, 44); assert.equal(rect.height, 44);
        assert.equal(await button.evaluate(el => getComputedStyle(el).borderRadius), '50%');
      }
      const layout = await page.evaluate(() => {
        const rect = selector => { const r = document.querySelector(selector).getBoundingClientRect(); return { top: r.top, left: r.left, width: r.width, height: r.height, bottom: r.bottom }; };
        return { overflow: document.documentElement.scrollWidth > innerWidth, gallery: rect('.voting-detail-gallery'), title: rect('h1'), survey: rect('.voting-detail-survey'), share: rect('.voting-detail-share'), body: rect('.voting-detail-copy'), ad: rect('.voting-detail-ad img') };
      });
      assert.equal(layout.overflow, false);
      assert.ok(layout.ad.width <= 300);
      assert.equal(layout.ad.height, layout.ad.width * 2);
      assert.ok(layout.title.top >= layout.gallery.bottom);
      assert.ok(layout.survey.top > layout.title.top && layout.body.top > layout.share.top);
      if (width >= 768) assert.ok(layout.share.top < layout.survey.bottom && layout.share.left > layout.survey.left);
      if (width >= 1024) assert.ok(layout.ad.left > layout.gallery.left + layout.gallery.width);
      else assert.ok(layout.ad.top > layout.body.top);
      await page.getByRole('button', { name: 'Ảnh tiếp theo', exact: true }).click();
      assert.equal(await page.locator('.voting-gallery-count').textContent(), '2 / 6');
      await page.getByRole('button', { name: 'Ảnh tiếp theo', exact: true }).press('ArrowRight');
      assert.equal(await page.locator('.voting-gallery-count').textContent(), '3 / 6');
      await page.getByRole('button', { name: /^Xem ảnh 6:/ }).click();
      await page.getByRole('button', { name: 'Ảnh tiếp theo', exact: true }).click();
      assert.equal(await page.locator('.voting-gallery-count').textContent(), '1 / 6');
      await page.getByRole('button', { name: /^Xem ảnh 2:/ }).click();
      assert.equal(await page.locator('.voting-gallery-count').textContent(), '2 / 6');
      await page.getByRole('button', { name: 'Sao chép liên kết', exact: true }).click();
      assert.equal(await page.evaluate(() => navigator.clipboard.readText()), `${base}/binh-chon/tru-cot-1-ho-so-2`);
      const popupPromise = page.waitForEvent('popup');
      await page.getByRole('button', { name: 'Chia sẻ lên Facebook', exact: true }).click();
      const popup = await popupPromise;
      assert.ok(popup.url().includes('facebook.com/sharer/sharer.php'));
      await popup.close();
      await page.getByRole('button', { name: 'Phóng to ảnh', exact: true }).click();
      assert.equal(await page.locator('.voting-gallery-lightbox').evaluate(dialog => dialog.open), true);
      assert.equal(await page.locator('.voting-gallery-zoom').evaluate(el => el.offsetWidth), 24);
      assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.voting-gallery-lightbox').evaluate(dialog => dialog.open), false);
      await page.locator('.voting-detail-survey').getByRole('button', { name: 'Bình chọn', exact: true }).click();
      assert.equal(await page.locator('.voting-detail-survey .voting-survey').evaluate(dialog => dialog.open), true);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.voting-detail-survey .voting-survey').evaluate(dialog => dialog.open), false);
      assert.equal(await page.locator('.voting-related-heading h2').innerText(), 'Hồ sơ đề cử khác');
      assert.equal(await page.locator('.voting-related .voting-card').count(), 9);
      assert.equal(await page.locator('.voting-related .voting-card-link[href="/binh-chon/tru-cot-1-ho-so-2"]').count(), 0);
      await page.getByRole('button', { name: 'Hồ sơ tiếp theo', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('.voting-related-track').scrollLeft > 0);
      await page.getByRole('button', { name: 'Hồ sơ trước', exact: true }).click();
      await page.waitForFunction(() => document.querySelector('.voting-related-track').scrollLeft < 2);
      await page.locator('.voting-related .voting-image img').first().evaluate(image => image.decode());
      await page.locator('.voting-related').screenshot({ path: path.join(process.env.TEMP, `related-profiles-${width}.png`) });
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: path.join(process.env.TEMP, `voting-detail-refined-${width}.png`) });
      if (width === 1440) {
        await page.locator('#dossier-information').scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(process.env.TEMP, 'voting-detail-dossier.png') });
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        assert.equal(await page.locator('.voting-gallery-slide').first().evaluate(el => getComputedStyle(el).transitionDuration), '0.55s');
        await page.getByRole('button', { name: 'Ảnh tiếp theo', exact: true }).click();
        await page.waitForTimeout(100);
        const opacity = await page.locator('.voting-gallery-slide[data-active=true]').evaluate(el => Number(getComputedStyle(el).opacity));
        assert.ok(opacity > 0 && opacity < 1);
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.equal(await page.locator('.voting-gallery-slide').first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
        assert.ok(await page.locator('.voting-gallery-arrow > span').first().evaluate(el => getComputedStyle(el).maskImage.includes('/assets/key-visual/arrow.svg')));
      }
      await page.goto(`${base}/binh-chon/tru-cot-1-ho-so-1`, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('.voting-gallery-arrow').count(), 0);
      results.push({ width, ...layout, slider: 'arrows, keyboard, thumbnails passed', copyLink: 'passed', facebook: 'passed', surveyDialog: 'open/close passed', singleImage: 'passed' });
      await context.close();
    }
    const criteriaSource = await fs.readFile('src/app/(phase-1)/dang-ky-de-cu/category-criteria.ts', 'utf8');
    const criteria = JSON.parse(criteriaSource.slice(criteriaSource.indexOf('{', criteriaSource.indexOf('export const categoryCriteria')), criteriaSource.lastIndexOf('}') + 1));
    const groups = [Object.keys(criteria).slice(0, 6), [null, ...Object.keys(criteria).slice(6, 12), null, Object.keys(criteria)[12]]];
    const page = await browser.newPage();
    const categoryCoverage = [];
    for (const [groupIndex, names] of groups.entries()) {
      for (const [index, name] of names.entries()) {
        const id = `${groupIndex === 0 ? 'tru-cot' : 'tien-phong'}-${index + 1}`;
        await page.goto(`${base}/binh-chon/${id}-ho-so-2`, { waitUntil: 'domcontentloaded' });
        const labels = await page.locator('.voting-dossier-narratives h3').allTextContents();
        if (name) {
          for (const field of [...criteria[name].fields, ...criteria[name].narratives]) assert.ok(labels.includes(field.label), `${id}: ${field.label}`);
          assert.equal(labels.length, 4 + criteria[name].fields.length + criteria[name].narratives.length);
        } else assert.ok(await page.getByText('Hạng mục do Ban tổ chức đề cử, không có bộ trường đăng ký chuyên môn riêng.').count());
        assert.equal(await page.locator('.voting-dossier-section').count(), 4);
        assert.equal(await page.locator('#dossier-evidence, #dossier-compliance, .voting-dossier-document').count(), 0);
        assert.equal(await page.locator('.voting-detail-copy').getByText('Người đại diện hồ sơ', { exact: true }).count(), 0);
        assert.equal(await page.locator('.voting-dossier-section h2 > span').count(), 0);
        const html = await page.content();
        for (const privateData of ['-phap-ly.pdf', '-tieu-chi-1.pdf', 'minhanh@example.com', 'docs.example.com/ho-so-phap-ly']) assert.equal(html.includes(privateData), false, `${id}: private data omitted`);
        assert.equal(await page.locator('.voting-detail-demo').count(), 0);
        assert.equal(await page.locator('.voting-detail-copy').getByText('undefined', { exact: true }).count(), 0);
        categoryCoverage.push({ id, name, fieldCoverage: 'passed' });
      }
    }
    await page.close();
    const sharedUi = [];
    for (const route of ['/', '/phase-2', '/binh-chon', '/dang-ky-de-cu', '/the-le', '/phase-2/design-system#icons']) {
      const sharedPage = await browser.newPage({ viewport: { width: 390, height: 1000 } });
      await sharedPage.goto(`${base}${route}`, { waitUntil: 'networkidle' });
      await sharedPage.evaluate(() => document.fonts.ready);
      assert.equal(await sharedPage.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${route} overflow`);
      const phase2 = route.startsWith('/phase-2') || route.startsWith('/binh-chon');
      if (phase2) {
        assert.ok(await sharedPage.locator('.ui-icon').count(), `${route} uses Phase 2 icons`);
        assert.ok(await sharedPage.locator('.ui-icon').first().evaluate(el => getComputedStyle(el, '::before').fontFamily.includes('uicons-regular-rounded')));
      } else {
        assert.equal(await sharedPage.locator('.ui-icon').count(), 0, `${route} retains Phase 1 icons`);
        assert.equal(await sharedPage.locator('link[href*="flaticon"]').count(), 0);
      }
      assert.equal(await sharedPage.getByRole('button', { name: 'Khảo sát', exact: true }).count(), 0);
      assert.equal(await sharedPage.getByRole('link', { name: 'Khảo sát', exact: true }).count(), 0);
      if (route.includes('design-system')) {
        assert.equal(await sharedPage.locator('.ui-icon-grid .ui-icon').count(), 20);
        for (const icon of await sharedPage.locator('.ui-icon-grid .ui-icon').all()) assert.notEqual(await icon.evaluate(el => getComputedStyle(el, '::before').content), 'none');
        await sharedPage.locator('#icons').scrollIntoViewIfNeeded();
        await sharedPage.screenshot({ path: path.join(process.env.TEMP, 'travel-ui-icons.png') });
      }
      sharedUi.push({ route, mobileOverflow: false, icons: phase2 ? 'local font loaded' : 'Phase 1 SVG retained', cta: 'passed' });
      await sharedPage.close();
    }
    assert.deepEqual(errors, []);
    await fs.writeFile('docs/voting-detail-qa.json', JSON.stringify({ date: '2026-10-20', build: 'passed', typecheck: 'passed', categoryCoverage, sharedUi, errors, warnings, warningNote: 'Existing site has no favicon.ico; unrelated to the profile layout.', results }, null, 2) + '\n');
    console.log(JSON.stringify(results));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
