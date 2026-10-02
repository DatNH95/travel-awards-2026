// Source SVGs remain untouched in publish/. Derived files only crop whitespace
// or extract original paths: no redraw, recoloring, or coordinate changes.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const source = ['publish/assets/key-visual', 'publish old/assets/key-visual'].find(dir => fs.existsSync(path.join(dir, 'travel-awards-kv-v2.png')));
if (!source) throw Error('Official KV V2 PNG not found in publish/ or publish old/.');
const target = 'public/assets/key-visual';
fs.mkdirSync(target, { recursive: true });
const read = name => fs.readFileSync(path.join(source, name), 'utf8');
const crop = (svg, viewBox) => svg.replace(/viewBox="[^"]+"/, `viewBox="${viewBox}"`);
fs.copyFileSync(path.join(source, 'travel-awards-kv-v2.png'), path.join(target, 'travel-awards-kv-v2.png'));
fs.writeFileSync(path.join(target, 'logo.svg'), crop(read('logo.svg'), '65 190 1000 350'));
const typo = read('typo.svg');
fs.writeFileSync(path.join(target, 'campaign-lockup.svg'), crop(typo, '235 190 690 420'));
const paths = [...typo.matchAll(/<path\b[\s\S]*?\/>/g)].map(match => match[0]);
if (paths.length !== 41 || !paths[16].includes('M378.14') || !paths[26].includes('M470.92')) throw Error('Source typography changed: review extraction indices.');
const extract = (name, viewBox, indices) => fs.writeFileSync(path.join(target, name), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><style>.st0{fill:#019047}</style>${indices.map(i => paths[i]).join('')}</svg>`);
extract('signature-ornament.svg', '420 486 305 72', [26, 27, 28, 29, 30]);
extract('signature-marker.svg', '360 560 38 38', [16]);
const files = ['travel-awards-kv-v2.png', 'logo.svg', 'typo.svg'];
fs.writeFileSync(path.join(target, 'provenance.json'), JSON.stringify({
  visualReference: 'travel-awards-kv-v2.png',
  sources: files.map(name => ({ path: `${source}/${name}`, sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(source, name))).digest('hex') })),
  derivatives: { 'travel-awards-kv-v2.png': 'Byte-for-byte official KV V2; color, effect and appearance authority', 'logo.svg': 'Whitespace crop only', 'campaign-lockup.svg': 'Whitespace crop only', 'signature-ornament.svg': 'typo.svg path indices 26–30', 'signature-marker.svg': 'typo.svg path index 16' }
}, null, 2));
