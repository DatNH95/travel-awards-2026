'use client';

import { useRef, useState } from 'react';
import { TextLink } from './primitives';

// Official category names have not been supplied. Do not invent award criteria.
const groups = [
  { name: 'Trụ cột', count: 6, title: 'Những giá trị tạo nên nền tảng.', description: 'Ghi nhận những dấu ấn góp phần xây dựng và phát triển du lịch Việt Nam.' },
  { name: 'Tiên phong', count: 9, title: 'Những hướng đi mở ra tương lai.', description: 'Tôn vinh tinh thần đổi mới và những góc nhìn mới cho hành trình phía trước.' },
];

export function AwardTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = groups[active];
  return <div className="home-award-browser">
    <div role="tablist" aria-label="Nhóm giải thưởng" className="home-award-tabs">
      {groups.map((item, index) => <button key={item.name} ref={node => { tabs.current[index] = node; }} role="tab" id={`award-tab-${index}`} aria-controls={`award-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        let next: number;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = 1 - active;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = 1;
        else return;
        event.preventDefault(); setActive(next); tabs.current[next]?.focus();
      }}><span>{item.name}</span><sup>{String(item.count).padStart(2, '0')}</sup></button>)}
    </div>
    <div role="tabpanel" id={`award-panel-${active}`} aria-labelledby={`award-tab-${active}`} tabIndex={0} className="home-award-panel">
      <div className="home-award-group-copy"><p className="type-label">Nhóm giải thưởng / {group.name}</p><h3 className="type-heading-1">{group.title}</h3><p>{group.description}</p><TextLink href="/nomination">Gửi đề cử</TextLink></div>
      <div><p className="home-category-note">Tên và tiêu chí hạng mục đang chờ công bố.</p><ol className="home-award-list">{Array.from({length: group.count}, (_, index) => <li key={`${active}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><span>Hạng mục {group.name.toLowerCase()} {String(index + 1).padStart(2, '0')}</span><span className="home-award-pending">Chờ công bố</span></li>)}</ol></div>
    </div>
  </div>;
}
