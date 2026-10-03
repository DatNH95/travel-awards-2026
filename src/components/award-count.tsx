'use client';

import { useEffect, useRef, useState } from 'react';

export function AwardCount() {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(15);

  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || preference.matches || !('IntersectionObserver' in window)) return;
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const started = performance.now();
      setCount(0);
      const tick = (now: number) => {
        const progress = Math.min((now - started) / 1800, 1);
        setCount(Math.floor(progress * 15));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(element);
    const reduce = () => {
      if (!preference.matches) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      setCount(15);
    };
    preference.addEventListener('change', reduce);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener('change', reduce);
    };
  }, []);

  return <span ref={ref} aria-label="15"><span aria-hidden="true">{count}</span></span>;
}
