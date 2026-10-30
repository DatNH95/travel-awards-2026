const assert = require('node:assert/strict');
const fs = require('node:fs');
const { stripTypeScriptTypes } = require('node:module');
const vm = require('node:vm');
function load(path) {
  const exports = {};
  const stripped = stripTypeScriptTypes(fs.readFileSync(path, 'utf8'));
  const names = Array.from(stripped.matchAll(/^export (?:const|function) (\w+)/gm), match => match[1]);
  const code = stripped.replace(/^export (const|function) /gm, '$1 ') + `\nObject.assign(exports, {${names.join(',')}});`;
  vm.runInNewContext(code, { exports });
  return exports;
}
const { categoryCriteria } = load('src/app/(phase-1)/dang-ky-de-cu/category-criteria.ts');
const { awardGroups, isOrganizerNominated } = load('src/data/awards.ts');
const { dossierError } = load('src/app/(phase-1)/dang-ky-de-cu/dossier-validation.ts');
const all = awardGroups.flatMap(group => group.categories);
assert.equal(all.filter(isOrganizerNominated).length, 2);
assert.equal(Object.keys(categoryCriteria).length, 13);
for (const category of all) {
  assert.equal(Boolean(categoryCriteria[category]), !isOrganizerNominated(category), category);
  if (!categoryCriteria[category]) continue;
  const { fields, narratives, conditions, evidence } = categoryCriteria[category];
  assert.ok(fields.length && narratives.length && conditions.length && evidence.length, category);
  assert.ok(narratives.every(field => field.maxWords === 300));
}
const images = count => Array.from({ length: count }, (_, i) => ({ name: `${i}.jpg`, size: 2_000_000 }));
for (const { images: policy } of Object.values(categoryCriteria)) {
  assert.equal(policy.min, 3);
  assert.equal(policy.max, 10);
  for (const count of [0, 2, 11]) assert.ok(dossierError('dossier-3', images(count), '', policy));
  for (const count of [3, 10]) assert.equal(dossierError('dossier-3', images(count), '', policy), '');
}
assert.ok(dossierError('menu', [{ name: 'menu.docx', size: 2000 }]));
assert.equal(dossierError('menu', [{ name: 'menu.pdf', size: 2000 }]), '');
assert.equal(dossierError('dossier-0', [{ name: 'intro.pdf', size: 50_000_000 }]), '');
assert.ok(dossierError('dossier-0', [{ name: 'intro.pdf', size: 50_000_001 }]));
assert.equal(dossierError('dossier-1', [{ name: 'legal.pdf', size: 10_000_000 }]), '');
assert.ok(dossierError('dossier-1', [{ name: 'legal.pdf', size: 10_000_001 }]));
for (const key of ['menu']) {
  assert.equal(dossierError(key, [{ name: 'evidence.pdf', size: 20_000_000 }]), '');
  assert.ok(dossierError(key, [{ name: 'evidence.pdf', size: 20_000_001 }]));
}
for (const extension of ['jpg', 'JPEG', 'png']) {
  for (const size of [1, 999_999, 1_000_000, 10_000_000]) assert.equal(dossierError('dossier-3', Array.from({ length: 3 }, () => ({ name: `image.${extension}`, size }))), '');
}
for (const [name, size] of [['image.jpg', 10_000_001], ['image.webp', 2_000_000]]) {
  assert.ok(dossierError('dossier-3', Array.from({ length: 3 }, () => ({ name, size }))));
}
console.log('PASS: 13 categories require 3–10 JPG/JPEG/PNG images up to 10 MB each; legal 10 MB, introduction 50 MB, menu 20 MB.');
