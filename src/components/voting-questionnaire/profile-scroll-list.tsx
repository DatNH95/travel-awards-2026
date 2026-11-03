'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export function ProfileScrollList({ count, children }: { count: number; children: ReactNode }) {
  const list = useRef<HTMLDivElement>(null);
  const [moreBelow, setMoreBelow] = useState(count > 5);
  function update() {
    const element = list.current;
    if (element) setMoreBelow(element.scrollHeight - element.scrollTop - element.clientHeight > 2);
  }
  useEffect(() => {
    const element = list.current;
    if (!element) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [count]);
  return <div className="survey-profile-scroll" data-scrollable={count > 5} data-more-below={count > 5 && moreBelow}>
    <div ref={list} className="survey-profile-list" onScroll={update} tabIndex={count > 5 ? 0 : undefined} role="region" aria-label="Danh sách hồ sơ trải nghiệm">{children}</div>
  </div>;
}
