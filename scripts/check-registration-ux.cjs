const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { stripTypeScriptTypes } = require('node:module');
const root = path.resolve(__dirname, '..');
const base = path.join(root, 'src/app/(phase-1)/dang-ky-de-cu');
const cache = new Map();
function load(filename) {
  filename = path.resolve(filename);
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} }; cache.set(filename, module);
  const stripped = stripTypeScriptTypes(fs.readFileSync(filename, 'utf8'));
  const exported = Array.from(stripped.matchAll(/^export (?:const|function) (\w+)/gm), match => match[1]);
  const compiled = stripped.replace(/import \{([^}]+)\} from '([^']+)';/g, (_, names, id) => 'const {' + names.replace(/\s+as\s+/g, ':') + '} = require(' + JSON.stringify(id) + ');').replace(/export \{([^}]+)\} from '([^']+)';/g, (_, names, id) => { const fields = names.split(',').map(name => { const [source, alias] = name.trim().split(/\s+as\s+/); return (alias || source) + ': require(' + JSON.stringify(id) + ').' + source; }); return 'Object.assign(exports, {' + fields.join(',') + '});'; }).replace(/^export (const|function) /gm, '$1 ') + '\nObject.assign(exports, {' + exported.join(',') + '});';
  function resolve(id) {
    if (!id.startsWith('.') && !id.startsWith('@/')) return require(id);
    let target = id.startsWith('@/') ? path.join(root, 'src', id.slice(2)) : path.resolve(path.dirname(filename), id);
    if (!path.extname(target)) target += fs.existsSync(target + '.ts') ? '.ts' : '.tsx';
    return load(target);
  }
  vm.runInThisContext('(function(module, exports, require) {' + compiled + '\n})', { filename })(module, module.exports, resolve);
  return module.exports;
}
const ux = load(path.join(base, 'registration-ux.ts'));
const { categoryCriteria } = load(path.join(base, 'category-criteria.ts'));
const { nominationFields, complianceStatements } = load(path.join(base, 'registration-data.ts'));
assert.equal(ux.normalizeCategorySearch('Điểm ĐẾN du lịch'), 'diem den du lich');
assert.equal(ux.sanitizePhone('abc+84 (912) 34x56y78'), '+84 (912) 345678');
for (const value of ['javascript:alert(1)', 'https://', 'https://bad host.com', 'https://user:pass@example.com']) assert.ok(ux.urlError(value), value);
for (const value of ['', 'vnexpress.net', 'drive.google.com/drive/folders/test', 'https://example.com', 'http://example.com/path', 'https://drive.google.com/drive/folders/test']) assert.equal(ux.urlError(value), '', value);
assert.ok(ux.urlError('', true));
assert.equal(ux.normalizeWebsite(' vnexpress.net '), 'https://vnexpress.net');
assert.equal(ux.normalizeWebsite('www.vnexpress.net/du-lich'), 'https://www.vnexpress.net/du-lich');
assert.equal(ux.normalizeWebsite('http://vnexpress.net'), 'http://vnexpress.net');
assert.ok(ux.urlError(ux.normalizeWebsite('javascript:alert(1)')));
assert.ok(ux.urlError(ux.normalizeWebsite('not a domain')));
for (const count of [299, 300, 500, 501]) {
  const value = Array(count).fill('từ').join(' ');
  assert.equal(ux.countWords(value), count);
  assert.equal(!!ux.wordError(value, nominationFields[1]), count < 300 || count > 500);
}
for (const [selection, config] of Object.entries(categoryCriteria)) {
  const draft = { values: { 'registration-0': 'Đơn vị kiểm thử', 'registration-1': 'Doanh nghiệp', 'registration-2': 'Địa chỉ kiểm thử', 'representative-0': 'Người kiểm thử', 'representative-2': '0912345678', 'representative-3': 'qa@example.com', 'destination-0': 'Cơ quan kiểm thử', 'nominee-0': 'Đề cử kiểm thử', 'nominee-1': Array(300).fill('từ').join(' '), 'nominee-2': Array(500).fill('từ').join(' '), 'nominee-3': 'Điểm khác biệt', 'full-dossier-link': 'https://example.com/dossier' }, files: {}, checks: {} };
  for (const key of ['folder-introduction', 'folder-legal', 'folder-images', 'folder-evidence', 'folder-access', 'folder-menu']) draft.checks[key] = true;
  [...config.conditions, ...complianceStatements].forEach((_, i) => { draft.checks[`compliance-${selection}-${i}`] = true; });
  for (let part = 0; part < 6; part++) {
    assert.equal(ux.partIssues(part, selection, draft).length, 0, `${selection}, part ${part}`);

  }
  draft.values['evidence-mode'] = 'files';
  assert.ok(ux.partIssues(4, selection, draft).length >= 3);
  draft.files['dossier-0'] = [{ name: 'intro.pdf', size: 1_000_000 }];
  draft.files['dossier-3'] = Array.from({ length: 3 }, (_, i) => ({ name: `${i}.png`, size: 1_000_000 }));
  draft.values['legal-scan-link'] = 'https://example.com/legal';
  if (config.menuRequired) draft.files.menu = [{ name: 'menu.pdf', size: 1_000_000 }];
  assert.equal(ux.partIssues(4, selection, draft).length, 0);
  const channelIndex = config.fields.findIndex(field => field.label === 'Kênh truyền thông chính thức');
  if (channelIndex >= 0) {
    const key = `channel-professional-${selection}-${channelIndex}-1`;
    draft.checks[key] = true;
    assert.equal(ux.partIssues(2, selection, draft).length, 2);
    draft.values[`${key}-url`] = 'https://facebook.com/example'; draft.values[`${key}-followers`] = '0';
    assert.equal(ux.partIssues(2, selection, draft).length, 0);
  }
}
console.log('PASS: phone/URL/word boundaries, 13 category journeys × 6 validated parts, both evidence modes, social channels and food menu.');
