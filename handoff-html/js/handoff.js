/* Optional UI helpers. No framework, network calls or uploads; only a notice preference is stored. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const categoryIds = ['tru-cot-1','tru-cot-2','tru-cot-3','tru-cot-4','tru-cot-5','tru-cot-6',
    'tien-phong-1','tien-phong-2','tien-phong-3','tien-phong-4','tien-phong-5','tien-phong-6','tien-phong-7','tien-phong-8','tien-phong-9'];
  const radioCategoryIds = categoryIds.filter(id => !['tien-phong-1','tien-phong-8'].includes(id));
  const category = new URLSearchParams(location.search).get('category') || location.pathname.match(/dang-ky-((?:tru-cot|tien-phong)-\d+)\.html$/)?.[1];
  const radios = $$('input[name="award-category"]');
  let selectedCategory = categoryIds.includes(category) && !['tien-phong-1','tien-phong-8'].includes(category) ? category : null;
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
    if (category?.startsWith('tien-phong') && list.classList.contains('nomination-group-tabs')) activate(1);
  }
  function selectCategory(index) {
    if (!radios[index] || radios[index].disabled) return;
    selectedCategory = radioCategoryIds[index];
    radios.forEach((radio, i) => { radio.checked = i === index; radio.closest('label').dataset.selected = String(i === index); });
    $$('.nomination-choice-mobile-status,.nomination-choice-desktop-status').forEach(status => {
      const name = document.createElement('strong'); name.textContent = radios[index].value;
      status.replaceChildren('Đã chọn: ', name);
    });
    const next = radios[0]?.closest('form').querySelector('button[type=submit]');
    if (next) next.disabled = false;
  }
  if (selectedCategory && radios.length) selectCategory(radioCategoryIds.indexOf(selectedCategory));
  radios.forEach((radio, index) => radio.addEventListener('change', () => selectCategory(index)));
  const choiceForm = radios[0]?.closest('form');
  choiceForm?.addEventListener('submit', event => {
    event.preventDefault();
    if (selectedCategory) location.href = `dang-ky-${selectedCategory}.html`;
  });
  const dialogByLabel = {
    'Lưu lại hồ sơ': 'nomination-save-title', 'Lưu hồ sơ': 'nomination-save-title', 'Kiểm tra email': 'nomination-email-title'
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
  $$('.nomination-counted-field').forEach(field => {
    const input = $('textarea', field), counter = $('.nomination-word-count', field);
    if (!input || !counter) return;
    const limit = Number(counter.textContent.split('/')[1]);
    if (!limit) return;
    input.addEventListener('input', () => {
      const words = [...input.value.matchAll(/\S+/gu)];
      if (words.length > limit) input.value = input.value.slice(0, words[limit].index).trimEnd();
      counter.textContent = `${Math.min(words.length, limit)}/${limit}`;
    });
  });
  $$('.nomination-form-section').forEach(section => {
    const boxes = $$('input[type=checkbox]', section);
    const all = boxes.find(box => box.closest('label')?.textContent.trim() === 'Xác nhận tất cả');
    if (!all) return;
    const items = boxes.filter(box => box !== all);
    all.addEventListener('change', () => items.forEach(box => { box.checked = all.checked; }));
    items.forEach(box => box.addEventListener('change', () => { all.checked = items.every(item => item.checked); }));
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


      const seconds = Math.max(0, Math.floor((Date.parse('2026-11-20T23:59:00+07:00') - now) / 1000));
      const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
      countdowns.forEach(block => {
        $$('.home-countdown-value', block).forEach((el, i) => { el.textContent = String(values[i]).padStart(2,'0'); });
        $('.home-countdown-deadline', block).textContent = !seconds ? 'Đã hết hạn gửi đề cử' : 'Thời gian nhận đề cử còn lại:';
        $('.home-countdown-units', block).setAttribute('aria-label', 'Thời gian còn lại để gửi đề cử');
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

// Mobile nomination steps: native swipe and accessible previous/next controls.
(() => {
  document.querySelectorAll('.nomination-guide-slider').forEach(root => {
    const track = root.querySelector('ol');
    const nav = root.querySelector('.nomination-guide-navigation');
    if (!track || !nav) return;
    const buttons = nav.querySelectorAll('button');
    let active = 0;
    function update() {
      const start = track.getBoundingClientRect().left;
      let distance = Infinity;
      [...track.children].forEach((item, index) => {
        const delta = Math.abs(item.getBoundingClientRect().left - start);
        if (delta < distance) { active = index; distance = delta; }
      });
      nav.querySelector('span').textContent = `Bước ${active + 1} / 4`;
      buttons[0].disabled = active === 0;
      buttons[1].disabled = active === 3;
    }
    buttons.forEach((button, index) => button.addEventListener('click', () => {
      const item = track.children[active + (index ? 1 : -1)];
      if (item) track.scrollBy({left:item.getBoundingClientRect().left-track.getBoundingClientRect().left, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }));
    track.addEventListener('scroll', update, {passive:true});
    new ResizeObserver(update).observe(track);
    update();
  });
})();
// In-memory form panels: preserve entered values and File objects while switching parts.
(() => {
 const templates=[...document.querySelectorAll('template[data-registration-part]')];
 if(!templates.length)return;
 const cache=new Map(); let active=Number(document.querySelector('#nomination-jump-part')?.value||0);
 let form=document.querySelector('.nomination-registration-form'); cache.set(active,form);
 function show(index){
  if(index<0){location.href='dang-ky-de-cu.html';return;}
  if(!cache.has(index))cache.set(index,templates[index].content.firstElementChild.cloneNode(true));
  const next=cache.get(index);form.replaceWith(next);form=next;active=index;
  document.querySelectorAll('.nomination-desktop-parts button').forEach((b,i)=>{if(i===active)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
  document.querySelector('#nomination-part-title')?.focus();
 }
 document.addEventListener('change',event=>{if(event.target.id==='nomination-jump-part'){event.stopImmediatePropagation();show(Number(event.target.value));}},true);
 document.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  const parts=[...document.querySelectorAll('.nomination-desktop-parts button')];
  if(parts.includes(button)){event.preventDefault();event.stopImmediatePropagation();show(parts.indexOf(button));}
  else if(button.matches('.nomination-part-actions button[type=button]')){event.preventDefault();event.stopImmediatePropagation();show(active-1);}
  else if(button.textContent.trim()==='Lưu hồ sơ'){event.preventDefault();event.stopImmediatePropagation();document.querySelector('#nomination-save-title')?.closest('dialog').showModal();}
 },true);
 document.addEventListener('submit',event=>{
  if(!event.target.matches('.nomination-registration-form'))return;
  event.preventDefault();event.stopImmediatePropagation();
  if(!form.reportValidity())return;
  if(active<5)show(active+1);
  else {for(let i=0;i<6;i++){if(!cache.has(i)){show(i);return;}if(!cache.get(i).checkValidity()){show(i);form.reportValidity();return;}}location.href='xac-nhan.html';}
 },true);
})();
