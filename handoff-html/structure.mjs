// Development-only helpers shared by the exporter and handoff migration.
export function flattenDocument(doc) {
  const body = doc.body;
  const wrapper = body.querySelector(':scope > div.home');
  if (wrapper) {
    body.classList.add(...wrapper.classList);
    wrapper.replaceWith(...wrapper.childNodes);
  }
  body.querySelectorAll(':scope > div[hidden]').forEach(node => {
    if (!node.textContent.trim() && !node.children.length) node.remove();
  });
  const main = body.querySelector(':scope > main');
  if (main) {
    if (body.classList.contains('nomination') || !body.matches('.news-site, .rules-site')) {
      const firstSection = main.querySelector(':scope > section');
      if (firstSection && main.id) firstSection.id = main.id;
      main.replaceWith(...main.childNodes);
    } else {
      const section = doc.createElement('section');
      for (const attr of main.attributes) section.setAttribute(attr.name, attr.value);
      section.classList.add('section-travel-awards-2026', 'section-layout');
      section.append(...main.childNodes);
      main.replaceWith(section);
    }
  }
  doc.querySelectorAll('section.section').forEach(section => {
    section.classList.replace('section', 'section-travel-awards-2026');
  });
}

export function flattenStyles(css) {
  return css.replace(/\.section(?![\w-])/g, '.section-travel-awards-2026')
    .replace(/\.home main > \[id\]/g, '.home > section[id]')
    .replace(/\.nomination main > /g, '.nomination > ')
    .replace(/\.nomination main /g, '.nomination > section ');
}
