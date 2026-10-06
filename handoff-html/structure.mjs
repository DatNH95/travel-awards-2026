// Development-only helpers shared by the exporter and handoff migration.
export function flattenDocument(doc) {
  doc.querySelectorAll('next-route-announcer, nextjs-portal').forEach(node=>node.remove());
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
  // Homepage handoff follows the Tech wrapper and section naming convention.
  if (body.classList.contains('home') && !body.matches('.news-site, .rules-site, .nomination')) {
    let content = body.querySelector(':scope > .wrap-homepage');
    if (!content) {
      content = doc.createElement('div');
      content.className = 'wrap-homepage width_common';
      const sections = [...body.querySelectorAll(':scope > section')];
      if (sections.length) sections[0].before(content);
      content.append(...sections);
    }
    for (const section of content.querySelectorAll(':scope > section')) {
      section.classList.remove('section-travel-awards-2026');
      if (section.classList.contains('home-journey')) section.classList.replace('home-journey', 'home-agenda');
      if (section.classList.contains('home-news')) section.classList.replace('home-news', 'home-tin-tuc');
      const name = [...section.classList].find(value => value.startsWith('home-'));
      const extra = [...section.classList].filter(value => value !== 'section' && value !== name && !value.includes('-module__'));
      section.className = ['section', name, ...extra].filter(Boolean).join(' ');
    }
  }
}

export function flattenStyles(css) {
  return css.replaceAll('.section-travel-awards-2026, .section', '__HANDOFF_SECTION_SELECTORS__')
    .replace(/\.section(?![\w-])/g, '.section-travel-awards-2026')
    .replace(/(^|\n)([ \t]*)\.section-travel-awards-2026 \{/g, '$1$2.section-travel-awards-2026, .section {')
    .replaceAll('__HANDOFF_SECTION_SELECTORS__', '.section-travel-awards-2026, .section')
    .replace(/\.home main > \[id\]|\.home > section\[id\](?!, \.home > \.wrap-homepage)/g, '.home > section[id], .home > .wrap-homepage > section[id]')
    .replace(/\.nomination main > /g, '.nomination > ')
    .replace(/\.nomination main /g, '.nomination > section ')
    .replace(/\.home-journey(?![\w-])/g, '.home-agenda')
    .replace(/\.home-news(?![\w-])/g, '.home-tin-tuc')
    .replace(/\.wrap-homepage > section \{ padding-block: var\(--spacing-section\); \}\r?\n?/g, '')
    + (!css.includes('.home-header {') || css.includes('.wrap-homepage.width_common') ? '' : '\n.wrap-homepage.width_common { width: 100%; }\n.wrap-homepage > .home-hero { padding-block: 0; }\n');
}
