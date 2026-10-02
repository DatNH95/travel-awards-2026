// Parse this Illustrator export into balanced element spans, without rewriting
// geometry. This is deliberately not a general-purpose XML sanitizer.
const fs = require('node:fs');
const path = require('node:path');

module.exports = function extractLayers({ source, target }) {
  const xml = fs.readFileSync(path.join(source, 'key visual.svg'), 'utf8');
  const stack = [], nodes = [];
  let root;
  for (const match of xml.matchAll(/<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<\/?[\w:.-]+\b[^>]*>/g)) {
    const tag = match[0];
    if (tag.startsWith('<?') || tag.startsWith('<!--')) continue;
    if (tag.startsWith('</')) {
      const node = stack.pop();
      if (!node || tag.slice(2, -1).trim() !== node.tag) throw Error('Unbalanced source SVG.');
      node.end = match.index + tag.length;
    } else {
      const node = { tag: tag.match(/^<([\w:.-]+)/)[1], start: match.index, end: match.index + tag.length, opening: tag, children: [] };
      if (stack.length) stack.at(-1).children.push(node); else root = node;
      nodes.push(node);
      if (!tag.endsWith('/>')) stack.push(node);
    }
  }
  if (stack.length || root.tag !== 'svg' || root.children.length !== 25 || root.children[24].children.length !== 23) throw Error('KV structure changed; review layer selectors.');
  const raw = node => xml.slice(node.start, node.end);
  const byId = new Map(nodes.flatMap(node => {
    const id = node.opening.match(/\bid="([^"]+)"/);
    return id ? [[id[1], node]] : [];
  }));
  const style = raw(root.children[0]);
  const cssRules = [...style.matchAll(/\.([\w-]+)\s*\{([^}]+)\}/g)];
  const specs = [
    { id: 'drum', label: 'Trống đồng', node: root.children[11], bounds: [305, 0, 1310, 740], selector: 'svg > g (root child 11)', kind: 'vector' },
    { id: 'mountain', label: 'Mountain', node: root.children[24].children[13], bounds: [65, 663, 604, 199], selector: 'root child 24 > child 13', kind: 'vector' },
    { id: 'cloud', label: 'Cloud bank', node: root.children[15], bounds: [-150, 175, 800, 175], selector: 'root child 15 + gradient SVGID_402_', kind: 'vector' },
    { id: 'river', label: 'River', node: root.children[24].children[3], bounds: [140, 730, 1730, 360], selector: 'root child 24 > child 3', kind: 'vector' },
    { id: 'skyline', label: 'Skyline', node: root.children[24].children[0], bounds: [0, 350, 1920, 560], selector: 'root child 24 > child 0', kind: 'vector' },
    { id: 'architecture', label: 'Architecture / Huế', node: root.children[24].children[12], bounds: [350, 560, 495, 245], selector: 'root child 24 > child 12 (hue2)', kind: 'embedded-raster' },
    { id: 'foreground', label: 'Foreground mountains', node: [root.children[24].children[11], root.children[24].children[21]], bounds: [0, 830, 1920, 260], selector: 'root child 24 > children 11 + 21 (original order)', kind: 'vector' },
    { id: 'mist', label: 'Decorative mist line', node: root.children[20], bounds: [150, 300, 610, 230], selector: 'root child 20 + gradient SVGID_405_', kind: 'vector' },
  ];
  const layers = specs.map(({ node, ...spec }) => {
    const shape = Array.isArray(node) ? `<g>${node.map(raw).join('\n')}</g>` : raw(node);
    const classNames = new Set([...shape.matchAll(/\bclass="([^"]+)"/g)].flatMap(m => m[1].split(/\s+/)));
    const rules = cssRules.filter(m => classNames.has(m[1])).map(m => m[0]).join('\n');
    const extra = new Map();
    const refs = value => [...value.matchAll(/url\(#([^\)]+)\)|(?:xlink:)?href="#([^"]+)"/g)].map(m => m[1] || m[2]);
    const queue = refs(shape + rules);
    while (queue.length) {
      const id = queue.shift();
      if (extra.has(id) || shape.includes(`id="${id}"`)) continue;
      const dependency = byId.get(id);
      if (!dependency) throw Error(`Unresolved SVG reference ${id}`);
      const value = raw(dependency);
      extra.set(id, value);
      queue.push(...refs(value));
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${spec.bounds.join(' ')}"><style>${rules}</style><defs>${[...extra.values()].join('\n')}</defs>${shape}</svg>`;
    const file = `layer-${spec.id}.svg`;
    fs.writeFileSync(path.join(target, file), svg);
    return { ...spec, file, bytes: Buffer.byteLength(svg) };
  });
  fs.writeFileSync(path.join(target, 'layers.json'), JSON.stringify({ canvas: [1920, 1080], layers }, null, 2));
  const manifest = path.join(target, 'provenance.json');
  const provenance = JSON.parse(fs.readFileSync(manifest, 'utf8'));
  layers.forEach(layer => { provenance.derivatives[layer.file] = `${source}/key visual.svg: ${layer.selector}; original colors, geometry, clip/filter/gradient dependencies retained; ${layer.kind}`; });
  fs.writeFileSync(manifest, JSON.stringify(provenance, null, 2));
};
