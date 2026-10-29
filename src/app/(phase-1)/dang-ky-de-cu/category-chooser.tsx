'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { UiIcon } from '@/components/ui-icon';
import { CTAArrow } from '@/components/primitives';
import { awardGroups, awardCategoryId, isOrganizerNominated } from '@/data/awards';
import { professionalFields } from './registration-data';
import { normalizeCategorySearch as normalize } from './registration-ux';

const profiles = [
  { label: 'Tất cả', ids: [] as string[] },
  { label: 'Điểm đến / địa phương', ids: ['tru-cot-1', 'tien-phong-3', 'tien-phong-6'] },
  { label: 'Khách sạn / resort', ids: ['tru-cot-3', 'tru-cot-4'] },
  { label: 'Lữ hành / hàng không', ids: ['tru-cot-2', 'tru-cot-5'] },
  { label: 'Trải nghiệm / ẩm thực', ids: ['tru-cot-6', 'tien-phong-4', 'tien-phong-7'] },
  { label: 'Sáng kiến / công nghệ', ids: ['tien-phong-2', 'tien-phong-3', 'tien-phong-4', 'tien-phong-5'] },
  { label: 'Cộng đồng / quảng bá', ids: ['tien-phong-6', 'tien-phong-9'] },
];
const hints: Record<string, string> = {
  'tru-cot-1': 'Tỉnh, thành phố · hồ sơ do cơ quan quản lý chính thức nộp',
  'tru-cot-2': 'Doanh nghiệp lữ hành inbound, outbound hoặc nội địa',
  'tru-cot-3': 'Khách sạn 4–5 sao hoặc thương hiệu quốc tế đủ điều kiện',
  'tru-cot-4': 'Cơ sở nghỉ dưỡng 4–5 sao hoặc chứng nhận tương đương',
  'tru-cot-5': 'Hãng hàng không có hoạt động phục vụ du lịch Việt Nam',
  'tru-cot-6': 'Trải nghiệm, sự kiện, lễ hội phục vụ khách du lịch',
  'tien-phong-2': 'Sáng kiến tạo tác động bền vững có kết quả đo lường',
  'tien-phong-3': 'Điểm đến triển khai phát triển du lịch xanh',
  'tien-phong-4': 'Sản phẩm du lịch mới, khác biệt và có hiệu quả thực tế',
  'tien-phong-5': 'Giải pháp công nghệ số đang vận hành trong du lịch',
  'tien-phong-6': 'Làng, mô hình du lịch có sự tham gia của cộng đồng',
  'tien-phong-7': 'Nhà hàng, thương hiệu hoặc điểm đến ẩm thực du lịch',
  'tien-phong-9': 'Chiến dịch quảng bá du lịch có mục tiêu và kết quả cụ thể',
};

export function CategoryChooser({ selection, onSelect, initialGroup }: { selection: string; onSelect: (category: string) => void; initialGroup?: number }) {
  const id = useId();
  const [profile, setProfile] = useState(0), [group, setGroup] = useState(initialGroup ?? -1), [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const searchToggle = useRef<HTMLButtonElement>(null);
  const profileList = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState({ left: false, right: false });
  useEffect(() => {
    const toolbar = profileList.current?.closest<HTMLElement>('.nomination-filter-toolbar');
    const page = toolbar?.closest<HTMLElement>('.nomination');
    if (!toolbar || !page) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      page.dataset.filterAtTop = String(window.matchMedia('(max-width: 39.99rem)').matches && toolbar.getBoundingClientRect().top <= 65);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      delete page.dataset.filterAtTop;
    };
  }, []);
  useEffect(() => {
    const list = profileList.current;
    if (!list) return;
    const update = () => {
      const left = list.scrollLeft > 1;
      const right = list.scrollWidth - list.clientWidth - list.scrollLeft > 1;
      setScrollable(previous => previous.left === left && previous.right === right ? previous : { left, right });
    };
    const observer = new ResizeObserver(update);
    observer.observe(list);
    for (const child of list.children) observer.observe(child);
    list.addEventListener('scroll', update, { passive: true });
    update();
    return () => { observer.disconnect(); list.removeEventListener('scroll', update); };
  }, []);
  function scrollProfiles(direction: number) {
    const list = profileList.current;
    if (list) list.scrollTo({
      left: Math.max(0, Math.min(list.scrollWidth - list.clientWidth, list.scrollLeft + direction * Math.max(120, list.clientWidth * .7))),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }
  function closeSearch() { setSearchOpen(false); setSearch(''); searchToggle.current?.focus(); }
  const categories = awardGroups.flatMap((awardGroup, groupIndex) => awardGroup.categories.map((name, categoryIndex) => ({ name, id: awardCategoryId(groupIndex, categoryIndex), groupIndex, groupName: awardGroup.name }))).filter(item => !isOrganizerNominated(item.name));
  const visible = categories.filter(item => (group < 0 || group === item.groupIndex) && (!profile || profiles[profile].ids.includes(item.id)) && normalize(`${item.name} ${hints[item.id]}`).includes(normalize(search)));
  return <div className="nomination-category-finder" data-profile-filtered={profile > 0}>
    <div className="nomination-finder-intro"><h3>Loại hình bạn muốn đề cử</h3><p className="nomination-muted">Chọn loại hình, rồi xem đối tượng và tiêu chí để tìm hạng mục phù hợp.</p></div>
    <div className="nomination-filter-toolbar"><button type="button" className="nomination-profile-arrow" aria-label="Cuộn loại hình sang trái" aria-controls={`${id}-profiles`} disabled={!scrollable.left} onClick={() => scrollProfiles(-1)}><span className="nomination-profile-arrow-icon nomination-profile-arrow-icon--prev" aria-hidden="true" /></button><div ref={profileList} id={`${id}-profiles`} className="nomination-chip-list nomination-profile-chips" role="group" aria-label="Lọc theo loại hình">{profiles.map((item, index) => <button type="button" className="nomination-chip" key={item.label} aria-pressed={profile === index} onClick={() => { setProfile(index); if (index === 0) setGroup(-1); }}>{item.label}{index === 0 && <span className="nomination-arrow nomination-arrow--next"><CTAArrow /></span>}</button>)}</div><button type="button" className="nomination-profile-arrow" aria-label="Cuộn loại hình sang phải" aria-controls={`${id}-profiles`} disabled={!scrollable.right} onClick={() => scrollProfiles(1)}><span className="nomination-profile-arrow-icon nomination-profile-arrow-icon--next" aria-hidden="true" /></button><button ref={searchToggle} type="button" className="nomination-search-toggle" aria-label={searchOpen ? 'Đóng tìm kiếm' : 'Tìm kiếm hạng mục'} aria-expanded={searchOpen} aria-controls={`${id}-search-panel`} onClick={() => { if (searchOpen) closeSearch(); else { setSearchOpen(true); requestAnimationFrame(() => searchInput.current?.focus()); } }}><UiIcon name="search" /></button></div>
    {searchOpen && <div id={`${id}-search-panel`} className="nomination-field nomination-category-search"><label htmlFor={`${id}-search`}>Tìm theo tên hạng mục hoặc loại hình</label><div className="nomination-url-control"><UiIcon name="search" /><input ref={searchInput} id={`${id}-search`} type="search" placeholder="Ví dụ: khách sạn, ẩm thực, cộng đồng…" value={search} onChange={event => setSearch(event.target.value)} onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); closeSearch(); } }} /></div></div>}
    <div className="nomination-finder-groups" aria-label="Lọc nhóm giải thưởng">{['Trụ cột', 'Tiên phong'].map((name, index) => <button type="button" key={name} aria-pressed={group === index} onClick={() => setGroup(index)}>{name}</button>)}</div>
    <details className="nomination-group-help"><summary>Trụ cột và Tiên phong khác nhau thế nào?</summary><p>Trụ cột tôn vinh hoạt động tiêu biểu của các lĩnh vực du lịch. Tiên phong tập trung vào sáng kiến và những hướng phát triển mới. Xem đối tượng và tiêu chí cụ thể trên từng hạng mục trước khi chọn.</p></details>
    <fieldset className="nomination-award-cards"><legend className="sr-only">Chọn một hạng mục giải thưởng</legend>{visible.map(item => <article className="nomination-award-card" key={item.id} data-selected={selection === item.name}>
      <label><input type="radio" name="award-category" value={item.name} checked={selection === item.name} onChange={() => onSelect(item.name)} /><span>{group < 0 && <small>{item.groupName}</small>}<strong>{item.name}</strong><span className="nomination-muted">{hints[item.id]}</span></span></label>
      <details><summary>Đối tượng & tiêu chí <UiIcon name="angle-small-down" size={16} /></summary><div><p>{professionalFields[item.name]?.audience}</p><ul>{professionalFields[item.name]?.narratives.map(field => <li key={field.label}>{field.label}</li>)}</ul>{['tru-cot-3', 'tru-cot-4'].includes(item.id) && <p className="nomination-muted">Mỗi cơ sở chỉ chọn một trong hai hạng mục Khách sạn hoặc Resort.</p>}</div></details>
    </article>)}</fieldset>
    {!visible.length && <div className="nomination-empty-state"><UiIcon name="search" size={28} /><p>Chưa có hạng mục khớp với bộ lọc.</p><button type="button" className="nomination-text-action" onClick={() => { setProfile(0); setGroup(Math.max(0, awardGroups.findIndex(item => item.categories.includes(selection)))); setSearch(''); }}>Xóa bộ lọc</button></div>}
    <p className="nomination-muted type-body-small">Mỗi hồ sơ chỉ đăng ký cho một hạng mục. Trường hợp muốn tham gia nhiều hạng mục, vui lòng thực hiện bằng tài khoản MyVNE ID mới.</p>
  </div>;
}
