'use client';

import { useEffect, useRef, useState } from 'react';

export function AnimatedStatistic({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const parts = value.match(/^([+−-]?)(\d[\d.]*)(,\d+)?(.*)$/);
    if (!element || preference.matches || !parts || !('IntersectionObserver' in window)) return;
    const [, sign, integer, fraction = '', suffix] = parts;
    const decimals = fraction ? fraction.length - 1 : 0;
    const target = Number(`${integer.replaceAll('.', '')}${fraction.replace(',', '.')}`);
    if (!Number.isFinite(target)) return;
    const factor = 10 ** decimals;
    const formatter = new Intl.NumberFormat('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const started = performance.now();
      setDisplay(`${sign}${formatter.format(0)}${suffix}`);
      const tick = (now: number) => {
        const progress = Math.min((now - started) / 1800, 1);
        setDisplay(progress === 1 ? value : `${sign}${formatter.format(Math.floor(progress * target * factor) / factor)}${suffix}`);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(element);
    const reduce = () => {
      if (!preference.matches) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      setDisplay(value);
    };
    preference.addEventListener('change', reduce);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener('change', reduce);
    };
  }, [value]);

  return <span ref={ref} className="voting-statistic-count" aria-label={value}><span className="voting-statistic-sizer" aria-hidden="true">{value}</span><span className="voting-statistic-value" aria-hidden="true">{display}</span></span>;
}
