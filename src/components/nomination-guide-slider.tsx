'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export function NominationGuideSlider({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const track = root.current?.querySelector('ol');
    if (!track) return;
    const update = () => {
      const start = track.getBoundingClientRect().left;
      let closest = 0;
      let distance = Infinity;
      Array.from(track.children).forEach((item, index) => {
        const delta = Math.abs(item.getBoundingClientRect().left - start);
        if (delta < distance) { distance = delta; closest = index; }
      });
      setActive(closest);
    };
    track.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => { track.removeEventListener('scroll', update); observer.disconnect(); };
  }, []);
  function go(index: number) {
    const track = root.current?.querySelector('ol');
    const item = track?.children[index];
    if (!track || !item) return;
    track.scrollBy({ left: item.getBoundingClientRect().left - track.getBoundingClientRect().left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <div className="nomination-guide-slider" ref={root}>
    {children}
    <div className="nomination-guide-navigation" aria-label="Chuyển bước hướng dẫn">
      <button type="button" aria-label="Bước trước" aria-controls="nomination-guide" disabled={active === 0} onClick={() => go(active - 1)}>←</button>
      <span aria-live="polite" aria-atomic="true">Bước {active + 1} / 4</span>
      <button type="button" aria-label="Bước tiếp theo" aria-controls="nomination-guide" disabled={active === 3} onClick={() => go(active + 1)}>→</button>
    </div>
  </div>;
}
