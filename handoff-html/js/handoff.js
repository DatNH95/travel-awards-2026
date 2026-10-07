/* Optional UI helpers. No framework, network calls or uploads; only a notice preference is stored. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const categoryIds = ['tru-cot-1','tru-cot-2','tru-cot-3','tru-cot-4','tru-cot-5','tru-cot-6',
    'tien-phong-1','tien-phong-2','tien-phong-3','tien-phong-4','tien-phong-5','tien-phong-6','tien-phong-7','tien-phong-8','tien-phong-9'];
  const category = new URLSearchParams(location.search).get('category');
  const radios = $$('.nomination-choices input[type=radio]');
  let selectedCategory = categoryIds.includes(category) ? category : null;
  for (const list of $$('[role=tablist]')) {
    const tabs = $$('[role=tab]', list);
    function activate(index, focus = false) {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) panel.hidden = i !== index;
      });
      if (focus) tabs[index].focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index));
      tab.addEventListener('keydown', event => {
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
          event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : null;
        if (next !== null) { event.preventDefault(); activate(next, true); }
      });
    });
    if (selectedCategory?.startsWith('tien-phong') && list.classList.contains('nomination-group-tabs')) activate(1);
  }
  function selectCategory(index) {
    selectedCategory = categoryIds[index];
    radios.forEach((radio, i) => { radio.checked = i === index; radio.closest('label').dataset.selected = String(i === index); });
    const next = $('.nomination-choices')?.closest('form').querySelector('button[type=submit]');
    if (next) next.disabled = false;
  }
  if (selectedCategory && radios.length) selectCategory(categoryIds.indexOf(selectedCategory));
  radios.forEach((radio, index) => radio.addEventListener('change', () => selectCategory(index)));
  const choiceForm = $('.nomination-choices')?.closest('form');
  choiceForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (selectedCategory) location.href = `dang-ky-${selectedCategory}.html`;
  });
  const dialogByLabel = {
    'Lưu lại hồ sơ': 'nomination-save-title', 'Kiểm tra email': 'nomination-email-title'
  };
  $$('button').forEach(button => {
    const label = button.textContent.trim();
    const title = dialogByLabel[label];
    if (title) button.addEventListener('click', () => document.getElementById(title)?.closest('dialog').showModal());
    if (label === 'Đóng') button.addEventListener('click', () => button.closest('dialog')?.close());
    if (label === 'Đã hiểu') button.addEventListener('click', () => button.closest('dialog')?.close());
    if (label.includes('Quay lại')) button.addEventListener('click', () => { location.href = 'dang-ky-de-cu.html'; });
    if (label.includes('Xem lại hồ sơ')) button.addEventListener('click', () => { location.href = 'xac-nhan.html'; });
    if (label.includes('Chỉnh sửa hồ sơ')) button.addEventListener('click', () => { location.href = 'chinh-sua-ho-so.html'; });
  });
  const mobileNotice = $('.nomination-mobile-notice');
  if (mobileNotice && matchMedia('(max-width: 39.99rem)').matches) {
    try {
      const key = 'travel-awards-mobile-registration-notice-seen';
      if (!localStorage.getItem(key)) { localStorage.setItem(key, '1'); mobileNotice.showModal(); }
    } catch { /* Match the source when browser storage is unavailable. */ }
  }
  // Handoff views only: prevent accidental GET submission of personal data.
  $$('.nomination-registration-form,.nomination-confirmation-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (location.pathname.endsWith('/chinh-sua-ho-so.html')) { location.href = 'xac-nhan-cap-nhat.html'; return; }
      if (location.pathname.endsWith('/xac-nhan-cap-nhat.html')) { location.href = 'cap-nhat-thanh-cong.html'; return; }
      const dialog = document.getElementById('nomination-submit-title')?.closest('dialog');
      if (dialog) dialog.showModal();
    });
  });
  const saveCopy = $('#nomination-save-title')?.nextElementSibling;
  if (saveCopy) saveCopy.textContent = 'Bản HTML bàn giao chỉ mô phỏng giao diện. Hồ sơ chưa được lưu lên hệ thống.';
  const consent = $('.nomination-confirmation-form input[type=checkbox][required]');
  consent?.addEventListener('change', () => { $('.nomination-confirmation-form button[type=submit]').disabled = !consent.checked; });
  $$('.nomination-progress button').forEach((button, index) => button.addEventListener('click', () => {
    const target = ['dang-ky-de-cu.html','dang-ky-tru-cot-1.html','xac-nhan.html','thanh-cong.html'][index];
    if (target) location.href = target;
  }));
  // Native input validation; Tech supplies international phone and dossier rules.
  $$('input,textarea,select').forEach(input => {
    input.addEventListener('invalid', () => input.setAttribute('aria-invalid', 'true'));
    input.addEventListener('input', () => input.setAttribute('aria-invalid', String(!input.validity.valid)));
  });
  $$('input[type=file]').forEach(input => {
    input.addEventListener('change', () => {
      let list = input.parentElement.querySelector('.nomination-file-list');
      if (!list) { list = document.createElement('ul'); list.className = 'nomination-file-list'; input.after(list); }
      list.replaceChildren();
      for (const file of input.files) {
        const li = document.createElement('li');
        li.textContent = `${file.name} (${(file.size / 1048576).toLocaleString('vi', {maximumFractionDigits:2})} MB)`;
        list.append(li);
      }
    });
  });
  const nav = $('.home-header nav');
  const scroll = () => { if (nav) nav.toggleAttribute('data-scrolled', window.scrollY > 48); if (nav && window.scrollY > 48) nav.dataset.scrolled = 'true'; };
  window.addEventListener('scroll', scroll, {passive:true}); scroll();
  const countdowns = $$('.home-countdown');
  if (countdowns.length) {
    const tick = () => {
      const now = Date.now();
      const opening = Date.parse('2026-10-16T00:00:00+07:00');
      const beforeOpening = now < opening;
      const seconds = Math.max(0, Math.floor(((beforeOpening ? opening : Date.parse('2026-11-16T23:59:00+07:00')) - now) / 1000));
      const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
      countdowns.forEach(block => {
        $$('.home-countdown-value', block).forEach((el, i) => { el.textContent = String(values[i]).padStart(2,'0'); });
        $('.home-countdown-deadline', block).textContent = !seconds ? 'Đã hết hạn gửi đề cử' : beforeOpening ? 'Thời gian mở nhận đề cử còn lại:' : document.body.classList.contains('nomination') ? 'Thời gian nhận đề cử còn lại:' : 'Hãy tham gia ngay';
        $('.home-countdown-units', block).setAttribute('aria-label', beforeOpening ? 'Thời gian còn lại đến khi mở nhận đề cử' : 'Thời gian còn lại để gửi đề cử');
      });
      if (seconds) window.setTimeout(tick,1000);
    }; tick();
  }
})();

// Rules table of contents: track the visible section and open linked criteria.
(() => {
  const nav = document.querySelector('.rules-nav');
  if (!nav) return;
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  const update = () => {
    frame = 0;
    const mobile = matchMedia('(max-width:640px)').matches;
    const scrollPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    let active = links[0];
    for (const link of links) if (document.getElementById(link.hash.slice(1))?.getBoundingClientRect().top <= (mobile ? 100 : 160) + scrollPadding) active = link;
    links.forEach(link => { if (link === active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    if (mobile && active) {
      const bounds = nav.getBoundingClientRect(), item = active.getBoundingClientRect();
      if (item.left < bounds.left || item.right > bounds.right) nav.scrollTo({left:nav.scrollLeft + item.left - bounds.left - (bounds.width - item.width) / 2, behavior:reduced.matches ? 'instant' : 'smooth'});
    }
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  const openTarget = () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target instanceof HTMLDetailsElement) { target.open = true; target.scrollIntoView({block:'start'}); }
  };
  addEventListener('scroll', schedule, {passive:true}); addEventListener('resize', schedule); addEventListener('hashchange', openTarget);
  update(); openTarget();
})();

// Reveal only Homepage section titles, once per page visit.
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches) return;
  const titles = document.querySelectorAll('.wrap-homepage > section h2');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('home-heading-enter');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -32px 0px', threshold: .05 });
  titles.forEach(title => observer.observe(title));
  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    observer.disconnect();
    titles.forEach(title => title.classList.remove('home-heading-enter'));
  });
})();
