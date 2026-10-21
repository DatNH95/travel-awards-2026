'use client';
import { UiIcon } from './ui-icon';

import { useEffect, useId, useRef, useState } from 'react';
import { awardGroups, awardCategoryId } from '@/data/awards';
import { votingProfiles } from '@/data/voting';
import { CTAArrow, Container, Section } from './phase-2/primitives';
import { VotingCard } from './voting-card';
import Link from 'next/link';

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim();

export function VotingBrowser({ id = 'voting', headingLevel = 2, initialCategoryId }: { id?: string; headingLevel?: 1 | 2; initialCategoryId?: string }) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const searchBox = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const [scrollable, setScrollable] = useState({left: false, right: false});
  const categoryList = useRef<HTMLDivElement>(null);
  const toolbar = useRef<HTMLDivElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  const categoryId = awardCategoryId(groupIndex, categoryIndex);
  const profiles = votingProfiles.filter(profile => profile.categoryId === categoryId && normalize(`${profile.name} ${profile.organization}`).includes(normalize(query)));
  useEffect(() => {
    if (!initialCategoryId) return;
    for (const [groupIndex,group] of awardGroups.entries()) {
      const categoryIndex=group.categories.findIndex((_,index)=>awardCategoryId(groupIndex,index)===initialCategoryId);
      if (categoryIndex>=0) { setGroupIndex(groupIndex); setCategoryIndex(categoryIndex); break; }
    }
  },[initialCategoryId]);
  useEffect(() => {
    const section=document.getElementById(id);
    if (!section) return;
    let frame=0;
    const update=()=>{
      frame=0;
      const rect=section.getBoundingClientRect();
      const title=section.querySelector('.voting-intro > h1, .voting-intro > h2')?.getBoundingClientRect();
      if (!title) return;
      section.style.setProperty('--voting-glow-y',`${title.top-rect.top+title.height/2}px`);
    };
    const schedule=()=>{if(!frame) frame=requestAnimationFrame(update);};
    window.addEventListener('resize',schedule);
    schedule();
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',schedule);};
  },[id]);
  const suggestions = [...new Set(votingProfiles.filter(profile => profile.categoryId === categoryId).flatMap(profile => [profile.name, profile.organization]))]
    .filter(value => normalize(query) && normalize(value).includes(normalize(query)))
    .sort((a,b) => Number(normalize(b).startsWith(normalize(query))) - Number(normalize(a).startsWith(normalize(query))))
    .slice(0,6);
  const showSuggestions = searchOpen && normalize(query).length > 0;
  function chooseSuggestion(value: string) { setQuery(value); setSearchOpen(false); setSuggestionIndex(-1); searchInput.current?.focus(); }
  useEffect(() => {
    if (!searchOpen) return;
    const close = (event: PointerEvent) => { if (!searchBox.current?.contains(event.target as Node)) setSearchOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [searchOpen]);
  function selectCategory(group: number, category: number) {
    setGroupIndex(group); setCategoryIndex(category); setOpenGroup(null); triggers.current[group]?.focus();
  }
  function scrollCategories(direction: number) {
    const list = categoryList.current;
    if (list) list.scrollBy({left: direction * list.clientWidth * .7, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  }
  useEffect(() => {
    const list = categoryList.current;
    if (!list) return;
    const update = () => setScrollable({left: list.scrollLeft > 1, right: list.scrollWidth - list.clientWidth - list.scrollLeft > 1});
    const observer = new ResizeObserver(update);
    observer.observe(list);
    for (const child of list.children) observer.observe(child);
    list.addEventListener('scroll', update, {passive: true});
    update();
    return () => { observer.disconnect(); list.removeEventListener('scroll', update); };
  }, [groupIndex]);
  useEffect(() => {
    const list = categoryList.current;
    const selected = list?.children[categoryIndex] as HTMLElement | undefined;
    if (!list || !selected) return;
    const left = selected.offsetLeft;
    const right = left + selected.offsetWidth;
    if (left < list.scrollLeft) list.scrollLeft = left;
    else if (right > list.scrollLeft + list.clientWidth) list.scrollLeft = right - list.clientWidth;
  }, [groupIndex, categoryIndex]);
  useEffect(() => {
    if (openGroup === null) return;
    const closeOutside = (event: PointerEvent) => { if (!toolbar.current?.contains(event.target as Node)) setOpenGroup(null); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpenGroup(null); triggers.current[openGroup]?.focus(); } };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', closeOutside); document.removeEventListener('keydown', escape); };
  }, [openGroup]);

  return <Section id={id} className="home-voting"><Container>
    <header className="voting-intro"><Heading className="type-display-l">Bình chọn</Heading><p className="type-body">Cho các hạng mục và hồ sơ đề cử tương ứng. Mỗi bình chọn tương đương 1 phiếu khảo sát.</p></header>
    <div className="voting-filter-toolbar" ref={toolbar} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpenGroup(null); }}>
      <div className="voting-search" ref={searchBox} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setSearchOpen(false); }}>
        <UiIcon name="search" />
        <input ref={searchInput} type="search" role="combobox" autoComplete="off" aria-autocomplete="list" aria-expanded={showSuggestions} aria-controls={`${uid}-suggestions`} aria-activedescendant={showSuggestions && suggestionIndex >= 0 && suggestionIndex < suggestions.length ? `${uid}-suggestion-${suggestionIndex}` : undefined} aria-label="Tìm tên bài thi, đơn vị hoặc cá nhân" placeholder="Tìm tên bài thi, đơn vị hoặc cá nhân…" value={query} onFocus={() => { setSearchOpen(true); setOpenGroup(null); }} onChange={event => { setQuery(event.target.value); setSearchOpen(true); setSuggestionIndex(-1); }} onKeyDown={event => {
          if (event.nativeEvent.isComposing) return;
          if (event.key === 'Escape') { event.preventDefault(); setSearchOpen(false); setSuggestionIndex(-1); }
          else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault(); setSearchOpen(true);
            if (suggestions.length) setSuggestionIndex(index => event.key === 'ArrowDown' ? (index + 1) % suggestions.length : (index <= 0 ? suggestions.length - 1 : index - 1));
          } else if (event.key === 'Enter') {
            event.preventDefault();
            if (showSuggestions && suggestions[suggestionIndex]) chooseSuggestion(suggestions[suggestionIndex]);
            else setSearchOpen(false);
          }
        }} />
        {query && <button type="button" aria-label="Xóa tìm kiếm" onClick={() => { setQuery(''); setSearchOpen(false); setSuggestionIndex(-1); searchInput.current?.focus(); }}>×</button>}
        {showSuggestions && <div className="voting-suggestions"><p className="voting-suggestions-label">Gợi ý trong hạng mục đang chọn</p><div role="listbox" id={`${uid}-suggestions`} aria-label="Gợi ý tìm kiếm">{suggestions.map((value,index) => <button type="button" role="option" tabIndex={-1} aria-selected={suggestionIndex === index} id={`${uid}-suggestion-${index}`} key={value} onMouseDown={event => event.preventDefault()} onClick={() => chooseSuggestion(value)}>{value}</button>)}</div>{!suggestions.length && <p className="voting-suggestions-empty" role="status">Không có từ khóa phù hợp.</p>}</div>}
      </div>
      <div className="voting-filter-groups">{awardGroups.map((group, index) => <div className="voting-group-dropdown" key={group.name}>
        <button type="button" className="voting-group-trigger" ref={node => { triggers.current[index] = node; }} data-active={groupIndex === index} aria-expanded={openGroup === index} aria-controls={`${uid}-group-${index}`} onClick={() => setOpenGroup(openGroup === index ? null : index)}>{group.name}<UiIcon name="angle-small-down" size={16} /></button>
        {openGroup === index && <div className="voting-group-menu" id={`${uid}-group-${index}`} role="group" aria-label={`Hạng mục ${group.name}`}>{group.categories.map((category, categoryId) => <button type="button" key={category} aria-pressed={groupIndex === index && categoryIndex === categoryId} onClick={() => selectCategory(index, categoryId)}>{category}</button>)}</div>}
      </div>)}</div>
    </div>
    <div>
      <div className="voting-category-navigation">
        <button type="button" className="voting-category-arrow" aria-label="Cuộn hạng mục sang trái" aria-controls={`${uid}-categories`} disabled={!scrollable.left} onClick={() => scrollCategories(-1)}><span className="voting-slider-arrow-icon voting-slider-arrow-icon--prev" aria-hidden="true" /></button>
        <div key={groupIndex} ref={categoryList} id={`${uid}-categories`} className="voting-category-filters" role="group" aria-label="Hạng mục bình chọn">{awardGroups[groupIndex].categories.map((category, index) => <button key={category} aria-pressed={categoryIndex === index} onClick={() => setCategoryIndex(index)}>{category}</button>)}</div>
        <button type="button" className="voting-category-arrow" aria-label="Cuộn hạng mục sang phải" aria-controls={`${uid}-categories`} disabled={!scrollable.right} onClick={() => scrollCategories(1)}><span className="voting-slider-arrow-icon voting-slider-arrow-icon--next" aria-hidden="true" /></button>
      </div>
      <div className="voting-results-heading"><h3 className="type-heading-3">{awardGroups[groupIndex].categories[categoryIndex]}</h3><Link className="text-link voting-view-all" href={`/binh-chon?category=${categoryId}`}>Xem tất cả<span aria-hidden="true"><CTAArrow /></span></Link></div>
      {profiles.length ? <div className="voting-grid">{profiles.map(profile => <VotingCard key={profile.slug} profile={profile} />)}</div> : <div className="voting-empty" role="status"><p>Không tìm thấy bài thi phù hợp trong hạng mục này.</p><button type="button" className="button button--secondary" onClick={() => setQuery('')}>Xóa tìm kiếm</button></div>}
    </div>
  </Container></Section>;
}
