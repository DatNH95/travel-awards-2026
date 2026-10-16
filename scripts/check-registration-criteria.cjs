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
const { categoryCriteria } = load('src/app/dang-ky-de-cu/category-criteria.ts');
const { awardGroups, isOrganizerNominated } = load('src/data/awards.ts');
const { dossierError } = load('src/app/dang-ky-de-cu/dossier-validation.ts');
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
for (const [category, minimum] of [['Khách sạn của năm', 12], ['Khu nghỉ dưỡng của năm (Resort)', 15], ['Trải nghiệm du lịch của năm', 8]]) {
  const policy = categoryCriteria[category].images;
  assert.ok(dossierError('dossier-3', images(minimum - 1), '', policy));
  assert.equal(dossierError('dossier-3', images(minimum), '', policy), '');
}
assert.equal(dossierError('dossier-3', [], '', categoryCriteria['Điểm đến du lịch của năm'].images), '');
assert.ok(dossierError('criterion-test-0', images(4)));
assert.equal(dossierError('criterion-test-0', images(3)), '');
assert.ok(dossierError('menu', [{ name: 'menu.docx', size: 2000 }]));
assert.equal(dossierError('menu', [{ name: 'menu.pdf', size: 2000 }]), '');
assert.equal(dossierError('dossier-0', [{ name: 'intro.pdf', size: 50_000_000 }]), '');
assert.ok(dossierError('dossier-0', [{ name: 'intro.pdf', size: 50_000_001 }]));
for (const key of ['dossier-1', 'dossier-2', 'dossier-4', 'menu', 'criterion-test-0']) {
  assert.equal(dossierError(key, [{ name: 'evidence.pdf', size: 20_000_000 }]), '');
  assert.ok(dossierError(key, [{ name: 'evidence.pdf', size: 20_000_001 }]));
}
assert.equal(dossierError('dossier-3', [{ name: 'image.jpg', size: 10_000_000 }], '', { min: 0, max: 10 }), '');
assert.ok(dossierError('dossier-3', [{ name: 'image.jpg', size: 10_000_001 }], '', { min: 0, max: 10 }));
console.log('PASS: 13 category configurations, 2 organizer nominations, image thresholds, criterion files and menu format.');
