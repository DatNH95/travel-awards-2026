// Development-only migration and visual checks for the flat HTML handoff.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { flattenDocument, flattenStyles } from './structure.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/haidat/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve('handoff-html');
const files = (await fs.readdir(root)).filter(file => file.endsWith('.html'));
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ reducedMotion: 'reduce' });
await page.route(/^https?:/, route => route.abort());
const format = html => '<!doctype html>\n' + html.replace(/><(?=\/?(?:html|head|body|header|footer|nav|section|article|aside|div|form|fieldset|ul|ol|li|h[1-6]|p|dialog|details|summary|link|meta|script)\b)/g, '>\n<');
const failures = [];
const samples = ['index.html', 'the-le.html', 'tin-tuc.html', 'tin-travel-awards-dau-an-tien-phong.html', 'dang-ky-de-cu.html', 'dang-ky-tru-cot-1.html', 'xac-nhan.html', 'thanh-cong.html'];
const measurements = [];
await fs.mkdir(path.join(root, 'qa'), { recursive: true });
try {
  // Bring the shared header and width up to the currently approved implementation.
  for (const file of files) {
    const html = await fs.readFile(path.join(root, file), 'utf8');
    const updated = await page.evaluate(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      doc.querySelector('.home-publisher-bar')?.remove();
      return doc.documentElement.outerHTML;
    }, html);
    await fs.writeFile(path.join(root, file), format(updated));
  }
  for (const name of ['tokens', 'home', 'news']) {
    const file = path.join(root, 'css', name + '.css');
    let css = await fs.readFile(file, 'utf8');
    css = css.replace('--container-page: 1130px', '--container-page: 1100px')
      .replace('top: -3rem;', 'top: 0;')
      .replace(/\.news-main > \.layout-container \{ --container-page: 1100px; \}\r?\n?/, '');
    await fs.writeFile(file, css);
  }
  async function measure(file, width) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(pathToFileURL(path.join(root, file)).href, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.allSettled([...document.images].filter(img => img.src.startsWith('file:')).map(img => { img.loading = 'eager'; return img.decode(); }));
    });
    return page.evaluate(() => ({
      height: document.body.scrollHeight,
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      containers: [...document.querySelectorAll('.layout-container')].map(el => {
        const rect = el.getBoundingClientRect();
        return { x: rect.x, width: rect.width, height: rect.height };
      }),
    }));
  }
  for (const file of samples) for (const width of [1440, 390]) {
    measurements.push({ file, width, before: await measure(file, width) });
    console.log(`Baseline ${file}@${width}`);
  }
  // Parse and unwrap DOM nodes without changing nested content or inline text.
  for (const file of files) {
    const html = await fs.readFile(path.join(root, file), 'utf8');
    const updated = await page.evaluate(({ html, transform }) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const flatten = new Function('return (' + transform + ')')();
      flatten(doc);
      return {
        html: doc.documentElement.outerHTML,
        wrappers: doc.querySelectorAll('body > div, body > main, section.section').length,
        main: doc.querySelectorAll('#main').length,
      };
    }, { html, transform: flattenDocument.toString() });
    if (updated.wrappers || updated.main !== 1) failures.push(`${file}: invalid flat structure`);
    await fs.writeFile(path.join(root, file), format(updated.html));
  }
  for (const name of (await fs.readdir(path.join(root, 'css'))).filter(name => name.endsWith('.css'))) {
    const file = path.join(root, 'css', name);
    let css = flattenStyles(await fs.readFile(file, 'utf8'));
    if (name === 'base.css' && !css.includes('.section-layout')) css += '\n.section-layout { padding-block: 0; }\n';
    await fs.writeFile(file, css);
  }
  for (const row of measurements) {
    row.after = await measure(row.file, row.width);
    if (row.after.overflow) failures.push(`${row.file}@${row.width}: overflow`);
    if (Math.abs(row.after.height - row.before.height) > 1 || JSON.stringify(row.after.containers) !== JSON.stringify(row.before.containers)) {
      failures.push(`${row.file}@${row.width}: layout changed after unwrapping`);
    }
    if (['index.html', 'tin-tuc.html'].includes(row.file)) await page.screenshot({ path: path.join(root, 'qa', `flat-${row.file}-${row.width}.png`), fullPage: true });
  }
  await fs.writeFile(path.join(root, 'qa', 'structure-report.json'), JSON.stringify({ pages: files.length, checks: measurements.length, measurements, failures }, null, 2));
  console.log(JSON.stringify({ pages: files.length, checks: measurements.length, failures }));
  if (failures.length) process.exitCode = 1;
} finally { await browser.close(); }
