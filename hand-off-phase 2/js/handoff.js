/* Plain browser interactions. Demo state lives only in this document's memory. */
(() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const data=window.phase2Handoff, completed=new Map(), events=[];
  const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().trim();
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior=()=>reduced()?'instant':'smooth';
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const profileHref=slug=>`ho-so-${slug}.html`;
  const slugOf=card=>$('.voting-card-link',card)?.getAttribute('href').match(/ho-so-(.+)\.html/)?.[1];
  const categoryOf=slug=>slug?.split('-ho-so-')[0];
  const profileInfo=new Map();
  for(const [category,html] of Object.entries(data.cards)) {
    const holder=document.createElement('div');holder.innerHTML=html;
    $$('.voting-card',holder).forEach(card=>profileInfo.set(slugOf(card),{name:$('.voting-card-link',card).textContent,organization:$('.voting-card-organization',card).textContent,image:$('img',card).getAttribute('src'),category:data.groups.flat().find(item=>item.id===category).name}));
  }
  function applyCompleted() {
    $$('.voting-survey-trigger').forEach(button=>{
      const slug=slugOf(button.closest('.voting-card')||document.createElement('div'))||document.body.dataset.profile;
      if(!slug)return;
      button.dataset.profile=slug;
      if(!completed.has(categoryOf(slug)))return;
      button.disabled=true;button.textContent='Đã bình chọn';
      button.title=completed.get(categoryOf(slug))===slug?'Bạn đã bình chọn cho hồ sơ này':'Bạn đã bình chọn hồ sơ khác trong hạng mục này';
      const card=button.closest('.voting-card');
      if(card&&completed.get(categoryOf(slug))===slug&&!$('.voting-card-confirmation',card)) {
        const p=document.createElement('p');p.className='voting-card-confirmation';p.setAttribute('role','status');p.textContent='Bạn đã bình chọn cho hồ sơ này.';$('.voting-card-body',card).append(p);
      }
    });
  }
  // Tabs preserve keyboard navigation and both semantic tab panels.
  $$('[role=tablist]').forEach(list=>{
    const tabs=$$('[role=tab]',list);
    function activate(index,focus=false){tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(index===i));tab.tabIndex=index===i?0:-1;const panel=document.getElementById(tab.getAttribute('aria-controls'));if(panel)panel.hidden=index!==i;});if(focus)tabs[index].focus();}
    tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>activate(index));tab.addEventListener('keydown',event=>{const next=event.key==='ArrowRight'?(index+1)%tabs.length:event.key==='ArrowLeft'?(index+tabs.length-1)%tabs.length:event.key==='Home'?0:event.key==='End'?tabs.length-1:null;if(next!==null){event.preventDefault();activate(next,true);}});});
  });
  const voting=$('.home-voting');
  if(voting) {
    let category=data.groups[0][0].id,query='',suggestionIndex=-1;
    const search=$('.voting-search input',voting),grid=$('.voting-grid',voting),filters=$('.voting-category-filters',voting),triggers=$$('.voting-group-trigger',voting);
    function closeMenus(){ $$('.voting-group-menu',voting).forEach(menu=>menu.remove());triggers.forEach(trigger=>trigger.setAttribute('aria-expanded','false')); }
    function updateEdges(){const arrows=$$('.voting-category-navigation > button',voting);arrows[0].disabled=filters.scrollLeft<=1;arrows[1].disabled=filters.scrollWidth-filters.clientWidth-filters.scrollLeft<=1;}
    function renderCards(){
      grid.innerHTML=data.cards[category];
      $$('.voting-survey',grid).forEach(dialog=>dialog.remove());
      $$('.voting-card',grid).forEach(card=>card.hidden=!normalize($('.voting-card-link',card).textContent+' '+$('.voting-card-organization',card).textContent).includes(normalize(query)));
      const count=$$('.voting-card:not([hidden])',grid).length;
      $('.voting-empty',voting)?.remove();grid.hidden=!count;
      if(!count){const empty=document.createElement('div');empty.className='voting-empty';empty.setAttribute('role','status');empty.innerHTML='<p>Không tìm thấy bài thi phù hợp trong hạng mục này.</p><button type="button" class="button button--secondary">Xóa tìm kiếm</button>';empty.lastChild.addEventListener('click',()=>{query='';search.value='';renderCards();closeSuggestions();});grid.after(empty);}
      applyCompleted();
    }
    function choose(id){
      const group=data.groups.findIndex(items=>items.some(item=>item.id===id));if(group<0)return;
      category=id;closeMenus();closeSuggestions();
      triggers.forEach((trigger,index)=>trigger.dataset.active=String(index===group));
      filters.replaceChildren(...data.groups[group].map(item=>{const b=document.createElement('button');b.type='button';b.textContent=item.name;b.setAttribute('aria-pressed',String(item.id===id));b.addEventListener('click',()=>choose(item.id));return b;}));
      $('.voting-results-heading h3',voting).textContent=data.groups[group].find(item=>item.id===id).name;
      $('.voting-view-all',voting).href=`binh-chon.html?category=${id}`;
      renderCards();requestAnimationFrame(()=>{const selected=$('[aria-pressed=true]',filters);filters.scrollLeft=Math.max(0,selected.offsetLeft-filters.offsetLeft);updateEdges();});
    }
    triggers.forEach((trigger,index)=>trigger.addEventListener('click',()=>{
      const wasOpen=trigger.getAttribute('aria-expanded')==='true';closeMenus();closeSuggestions();if(wasOpen)return;
      const menu=document.createElement('div');menu.className='voting-group-menu';menu.id=trigger.getAttribute('aria-controls');menu.setAttribute('role','group');menu.setAttribute('aria-label',`Hạng mục ${trigger.textContent.trim()}`);
      data.groups[index].forEach(item=>{const button=document.createElement('button');button.type='button';button.textContent=item.name;button.setAttribute('aria-pressed',String(item.id===category));button.addEventListener('click',()=>{choose(item.id);trigger.focus();});menu.append(button);});trigger.after(menu);trigger.setAttribute('aria-expanded','true');
    }));
    const closeSuggestions=()=>{$('.voting-suggestions',voting)?.remove();search.setAttribute('aria-expanded','false');search.removeAttribute('aria-activedescendant');suggestionIndex=-1;};
    function suggest(){
      closeSuggestions();if(!normalize(query))return;
      const names=[...new Set([...profileInfo].filter(([slug])=>categoryOf(slug)===category).flatMap(([,item])=>[item.name,item.organization]))].filter(name=>normalize(name).includes(normalize(query))).sort((a,b)=>Number(normalize(b).startsWith(normalize(query)))-Number(normalize(a).startsWith(normalize(query)))).slice(0,6);
      const box=document.createElement('div');box.className='voting-suggestions';box.innerHTML='<p class="voting-suggestions-label">Gợi ý trong hạng mục đang chọn</p>';
      const list=document.createElement('div');list.setAttribute('role','listbox');list.id=search.getAttribute('aria-controls');list.setAttribute('aria-label','Gợi ý tìm kiếm');
      names.forEach((name,index)=>{const button=document.createElement('button');button.type='button';button.textContent=name;button.setAttribute('role','option');button.setAttribute('aria-selected','false');button.tabIndex=-1;button.id=`search-option-${index}`;button.addEventListener('mousedown',event=>event.preventDefault());button.addEventListener('click',()=>{query=name;search.value=name;renderCards();closeSuggestions();search.focus();});list.append(button);});box.append(list);
      if(!names.length)box.insertAdjacentHTML('beforeend','<p class="voting-suggestions-empty" role="status">Không có từ khóa phù hợp.</p>');$('.voting-search',voting).append(box);search.setAttribute('aria-expanded','true');
    }
    const clear=document.createElement('button');clear.type='button';clear.textContent='×';clear.setAttribute('aria-label','Xóa tìm kiếm');clear.hidden=true;search.after(clear);
    clear.addEventListener('click',()=>{query='';search.value='';clear.hidden=true;closeSuggestions();renderCards();search.focus();});
    search.addEventListener('input',()=>{query=search.value;clear.hidden=!query;suggestionIndex=-1;renderCards();suggest();});
    search.addEventListener('focus',()=>{closeMenus();suggest();});
    search.addEventListener('keydown',event=>{if(event.isComposing)return;if(event.key==='Escape'){closeSuggestions();return;}if(!['ArrowDown','ArrowUp','Enter'].includes(event.key))return;event.preventDefault();const options=$$('.voting-suggestions [role=option]',voting);if(event.key==='Enter'){if(options[suggestionIndex])options[suggestionIndex].click();else closeSuggestions();return;}if(!options.length)return;suggestionIndex=(suggestionIndex+(event.key==='ArrowDown'?1:options.length-1)+options.length)%options.length;options.forEach((option,i)=>option.setAttribute('aria-selected',String(i===suggestionIndex)));search.setAttribute('aria-activedescendant',options[suggestionIndex].id);});
    document.addEventListener('pointerdown',event=>{if(!event.target.closest('.voting-group-dropdown'))closeMenus();if(!event.target.closest('.voting-search'))closeSuggestions();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenus();closeSuggestions();}});
    $$('.voting-category-navigation > button',voting).forEach((button,index)=>button.addEventListener('click',()=>filters.scrollBy({left:(index?1:-1)*filters.clientWidth*.7,behavior:behavior()})));
    filters.addEventListener('scroll',updateEdges,{passive:true});new ResizeObserver(updateEdges).observe(filters);
    const requestedCategory=new URLSearchParams(location.search).get('category');
    choose(data.cards[requestedCategory]?requestedCategory:category);
    function glow(){const heading=$('.voting-intro > h1,.voting-intro > h2',voting),a=voting.getBoundingClientRect(),b=heading.getBoundingClientRect();voting.style.setProperty('--voting-glow-y',`${b.top-a.top+b.height/2}px`);}
    addEventListener('resize',glow);document.fonts.ready.then(glow);
  }
  function showDialog(dialog){const previous=document.body.style.overflow;dialog.showModal();document.body.style.overflow='hidden';dialog.addEventListener('close',()=>{document.body.style.overflow=previous;},{once:true});}
  // One shared survey dialog avoids duplicating React's per-card state and IDs.
  $$('.voting-survey').forEach(dialog=>dialog.remove());
  const survey=document.createElement('dialog');survey.className='voting-survey surface surface--primary';survey.setAttribute('aria-labelledby','survey-title');document.body.append(survey);
  function openSurvey(slug){
    if(completed.has(categoryOf(slug)))return;
    const name=profileInfo.get(slug)?.name||$('.voting-detail-intro h1')?.textContent;
    survey.innerHTML=`<button type="button" class="voting-dialog-close" aria-label="Đóng khảo sát"><i class="ui-icon fi fi-rr-cross" aria-hidden="true"></i></button><p class="eyebrow">Góc nhìn từ hành trình của bạn</p><h2 class="type-heading-3" id="survey-title">Bạn đã trải nghiệm ${escape(name)}?</h2><form><p class="type-body-small">Khảo sát mẫu · Chọn một câu trả lời cho mỗi câu hỏi. Không thu thập thông tin cá nhân.</p><fieldset><legend>01. Bạn đã đến hoặc sử dụng dịch vụ, trải nghiệm này chưa?</legend>${['Đã trải nghiệm','Chưa trải nghiệm'].map(value=>`<label class="voting-survey-option"><input type="radio" name="experience" value="${value}" required>${value}</label>`).join('')}</fieldset><div class="survey-followup"></div><div class="voting-survey-actions"><button type="button" class="button button--secondary">Để sau</button><button type="submit" class="button button--primary" disabled>Hoàn tất bình chọn mẫu</button></div></form>`;
    $('.voting-dialog-close',survey).onclick=()=>survey.close();$('.button--secondary',survey).onclick=()=>survey.close();
    $$('[name=experience]',survey).forEach(input=>input.addEventListener('change',()=>{
      const experienced=input.value==='Đã trải nghiệm',choices=experienced?['Rất hài lòng','Hài lòng','Bình thường','Chưa hài lòng']:['Rất muốn','Có thể cân nhắc','Chưa có kế hoạch'];
      $('.survey-followup',survey).innerHTML=`<fieldset><legend>${experienced?'02. Bạn đánh giá trải nghiệm của mình như thế nào?':'02. Bạn có muốn trải nghiệm trong tương lai?'}</legend>${choices.map(value=>`<label class="voting-survey-option"><input type="radio" name="impression" value="${value}" required>${value}</label>`).join('')}</fieldset>`;$('[type=submit]',survey).disabled=false;
    }));
    $('form',survey).addEventListener('submit',event=>{
      event.preventDefault();if(!event.target.reportValidity()||completed.has(categoryOf(slug)))return;
      completed.set(categoryOf(slug),slug);events.unshift({slug,time:new Date()});applyCompleted();updateCommunity();
      $('.eyebrow',survey).remove();$('#survey-title',survey).textContent='Cảm ơn bạn đã chia sẻ';$('form',survey).outerHTML='<div class="voting-survey-success" role="status"><p>Bạn đã bình chọn cho hồ sơ này.</p><p class="type-body-small">Trạng thái được mô phỏng trong phiên trải nghiệm; chưa gửi dữ liệu thật.</p><button type="button" class="button button--primary">Đóng</button></div>';$('.voting-survey-success button',survey).onclick=()=>survey.close();
    });showDialog(survey);
  }
  survey.addEventListener('click',event=>{if(event.target===survey){const r=survey.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)survey.close();}});
  document.addEventListener('click',async event=>{
    const trigger=event.target.closest('.voting-survey-trigger');if(trigger&&!trigger.disabled)openSurvey(trigger.dataset.profile);
    const share=event.target.closest('.voting-card-share button');if(!share)return;
    const slug=slugOf(share.closest('.voting-card')||document.createElement('div'))||document.body.dataset.profile;
    const url=new URL(profileHref(slug),location.href).href;
    if(share.getAttribute('aria-label').toLowerCase().includes('facebook')){window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,'_blank','noopener,noreferrer,width=640,height=600');return;}
    const status=$('.voting-copy-status',share.parentElement)||$('.voting-detail-share-status',share.closest('.voting-detail-share'));
    try{await navigator.clipboard.writeText(url);status.textContent='Đã sao chép liên kết';share.dataset.copied='true';}catch{status.textContent='Chưa thể sao chép. Vui lòng sao chép đường dẫn trên thanh địa chỉ.';}setTimeout(()=>{status.textContent='';share.dataset.copied='false';},2500);
  });
  const gallery=$('.voting-detail-gallery');
  if(gallery){
    let active=0;const slides=$$('.voting-gallery-slide',gallery),thumbs=$$('.voting-gallery-thumbnails button',gallery),dialog=$('.voting-gallery-lightbox',gallery);
    slides.forEach((slide,index)=>{if(!slide.alt)slide.alt=thumbs[index]?.getAttribute('aria-label').replace(/^Xem ảnh \d+: /,'')||'Hình ảnh hồ sơ';});
    function choose(index){active=(index+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.dataset.active=String(active===i);slide.setAttribute('aria-hidden',String(active!==i));});thumbs.forEach((thumb,i)=>thumb.setAttribute('aria-pressed',String(active===i)));const count=$('.voting-gallery-count',gallery);if(count)count.textContent=`${active+1} / ${slides.length}`;const live=$('figure > .sr-only',gallery);if(live)live.textContent=`Ảnh ${active+1} / ${slides.length}: ${slides[active].alt}`;}
    $('.voting-gallery-prev',gallery)?.addEventListener('click',()=>choose(active-1));$('.voting-gallery-next',gallery)?.addEventListener('click',()=>choose(active+1));thumbs.forEach((thumb,index)=>thumb.addEventListener('click',()=>choose(index)));
    gallery.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();choose(active+(event.key==='ArrowLeft'?-1:1));}});
    $('.voting-gallery-zoom',gallery).addEventListener('click',()=>{ $('img',dialog)?.remove();$('.voting-gallery-credit',dialog)?.remove();const image=slides[active].cloneNode();image.removeAttribute('class');image.removeAttribute('aria-hidden');image.removeAttribute('data-active');image.removeAttribute('data-credit');dialog.append(image);if(slides[active].dataset.credit){const credit=document.createElement('p');credit.className='voting-gallery-credit';credit.innerHTML=slides[active].dataset.credit;dialog.append(credit);}$('h2',dialog).textContent=`Xem ảnh phóng to: ${image.alt}`;showDialog(dialog);});
    $('.voting-lightbox-close',gallery).addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  }
  // Native horizontal tracks retain touch swiping, buttons and responsive widths.
  function bindTrack(track,buttons,position,thumbs=[]){
    if(!track)return;
    function update(){const index=Math.round(track.scrollLeft/track.clientWidth),total=track.children.length;buttons[0].disabled=track.scrollLeft<=1;buttons[1].disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-1;if(position)position.innerHTML=`${String(index+1).padStart(2,'0')} <span>/ ${String(total).padStart(2,'0')}</span>`;thumbs.forEach((thumb,i)=>thumb.setAttribute('aria-pressed',String(index===i)));if(position)[...track.children].forEach((slide,i)=>slide.inert=index!==i);}
    buttons.forEach((button,index)=>button.onclick=()=>track.scrollBy({left:(index?1:-1)*track.clientWidth,behavior:behavior()}));thumbs.forEach((thumb,index)=>thumb.onclick=()=>track.scrollTo({left:index*track.clientWidth,behavior:behavior()}));track.onscroll=update;new ResizeObserver(update).observe(track);update();
  }
  const recent=$('.voting-recent-track'),fixtures=recent?[...recent.children].map(node=>node.cloneNode(true)):[],rankItems=$$('.voting-participant-item').map(node=>node.cloneNode(true));
  function updateCommunity(){
    if(!recent)return;
    const fresh=events.map(({slug,time})=>{const info=profileInfo.get(slug),node=fixtures[0].cloneNode(true);$$('a',node).forEach(a=>a.href=profileHref(slug));$('.voting-recent-image',node).setAttribute('aria-label',info.name);const img=$('img',node);img.src=info.image;img.alt=info.name;$('.voting-community-meta',node).textContent=info.category;$('h3 a',node).textContent=info.name;$('.voting-recent-organization',node).textContent=info.organization;$('time',node).dateTime=time.toISOString();$('time',node).textContent=new Intl.DateTimeFormat('vi-VN',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Ho_Chi_Minh'}).format(time);return node;});
    const seen=new Set(),nodes=[...fresh,...fixtures.map(node=>node.cloneNode(true))].filter(node=>{const href=$('a',node).getAttribute('href');if(seen.has(href))return false;seen.add(href);return true;}).slice(0,10);
    recent.replaceChildren(...nodes);recent.scrollLeft=0;nodes.forEach((node,index)=>node.setAttribute('aria-label',`${index+1} / ${nodes.length}`));
    const thumbnails=$('.voting-recent-thumbnails');thumbnails.replaceChildren(...nodes.map(node=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',`Xem ${$('h3',node).textContent}`);const image=$('img',node).cloneNode();image.alt='';image.width=100;image.height=60;button.append(image);return button;}));
    bindTrack(recent,$$('.voting-recent-controls button'),$('.voting-recent-position'),[...thumbnails.children]);
    const ranks=rankItems.map(node=>node.cloneNode(true));
    if(events.length){const current=rankItems[9].cloneNode(true);current.dataset.current='true';$('.voting-community-copy h3',current).textContent='Bạn';$('.voting-community-meta',current).textContent=`Hoàn tất lúc ${new Intl.DateTimeFormat('vi-VN',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Ho_Chi_Minh'}).format(events[0].time)}`;$('.voting-participant-progress > span',current).innerHTML=`${completed.size}<span class="voting-progress-total">/15</span>`;$('.voting-participant-progress',current).classList.toggle('is-complete',completed.size===15);ranks.push(current);}
    ranks.sort((a,b)=>parseInt($('.voting-participant-progress',b).textContent)-parseInt($('.voting-participant-progress',a).textContent)||Number(b.dataset.current==='true')-Number(a.dataset.current==='true'));
    $('.voting-leaderboard').replaceChildren(...ranks.slice(0,10));$$('.voting-participant-rank').forEach((rank,index)=>{rank.dataset.rank=index+1;rank.setAttribute('aria-label',`Hạng ${index+1}`);rank.innerHTML=index<3?`<i class="ui-icon fi fi-rr-${index===0?'trophy':'medal'}" style="--ui-icon-size:24px" aria-hidden="true"></i><span>${index+1}</span>`:String(index+1).padStart(2,'0');});
  }
  bindTrack(recent,$$('.voting-recent-controls button'),$('.voting-recent-position'),$$('.voting-recent-thumbnails button'));
  bindTrack($('.voting-related-track'),$$('.voting-related-controls button'));
  applyCompleted();
  // Match the source's one-time 1800 ms count-up; screen readers read final values.
  $$('.voting-statistic-count').forEach(element=>{
    const value=element.getAttribute('aria-label'),display=$('.voting-statistic-value',element),parts=value?.match(/^([+−-]?)(\d[\d.]*)(,\d+)?(.*)$/);
    if(!display||!parts||reduced()||!('IntersectionObserver' in window))return;
    const [,sign,integer,fraction='',suffix]=parts,decimals=fraction?fraction.length-1:0,target=Number(integer.replaceAll('.','')+fraction.replace(',','.')),factor=10**decimals;
    if(!Number.isFinite(target))return;
    const formatter=new Intl.NumberFormat('vi-VN',{minimumFractionDigits:decimals,maximumFractionDigits:decimals});let frame=0;
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    const observer=new IntersectionObserver(entries=>{if(!entries.some(entry=>entry.isIntersecting))return;observer.disconnect();const started=performance.now();display.textContent=sign+formatter.format(0)+suffix;function tick(now){const progress=Math.min((now-started)/1800,1);display.textContent=progress===1?value:sign+formatter.format(Math.floor(progress*target*factor)/factor)+suffix;if(progress<1)frame=requestAnimationFrame(tick);}frame=requestAnimationFrame(tick);},{threshold:.4});observer.observe(element);
    preference.addEventListener('change',()=>{if(preference.matches){observer.disconnect();cancelAnimationFrame(frame);display.textContent=value;}});
  });
  const countdowns=$$('.home-countdown');
  function tick(){const seconds=Math.max(0,Math.floor((Date.parse('2026-11-20T23:59:00+07:00')-Date.now())/1000)),values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];countdowns.forEach(block=>{$$('.home-countdown-value',block).forEach((node,i)=>node.textContent=String(values[i]).padStart(2,'0'));if(!seconds)$('.home-countdown-deadline',block).textContent='Đã hết thời gian khảo sát';});if(seconds&&countdowns.length)setTimeout(tick,1000);}tick();
})();
