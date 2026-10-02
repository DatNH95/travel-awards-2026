'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// End of the supplied closing date in Vietnam. Confirm the official closing hour before launch.
const nominationDeadline = Date.parse('2026-11-16T23:59:59+07:00');
const units = ['Ngày', 'Giờ', 'Phút', 'Giây'];

export function NominationCountdown() {
  const [seconds, setSeconds] = useState<number | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const remaining = Math.max(0, Math.floor((nominationDeadline - Date.now()) / 1000));
      setSeconds(remaining);
      if (remaining > 0) timer = setTimeout(tick, 1000);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  const values = seconds === null ? null : [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
  return <div className="home-countdown">
    <p className="home-countdown-deadline">{seconds === 0 ? 'Đã hết hạn gửi đề cử' : 'Hãy tham gia ngay'}</p>
    <time className="home-sr-only" dateTime="2026-11-16T23:59:59+07:00">Hạn gửi đề cử: 16.11.2026</time>
    <div className="home-countdown-units" role="timer" aria-live="off" aria-label="Thời gian còn lại để gửi đề cử">{units.map((unit, index) => <div className="home-countdown-circle" key={unit}><span className="home-countdown-value">{values ? String(values[index]).padStart(2, '0') : '—'}</span><span className="home-countdown-label">{unit}</span></div>)}</div>
    <noscript>Hạn gửi đề cử: 23:59:59 ngày 16.11.2026 (giờ Việt Nam).</noscript>
  </div>;
}

export function HeroStage({ children }: { children: ReactNode }) {
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = hero.current;
    if (!element) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const paint = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      element.style.setProperty('--hero-depth-x', `${pointerX * 4}px`);
      element.style.setProperty('--hero-depth-y', `${progress * 20 + pointerY * 4}px`);
    };
    const queue = () => {
      if (!preference.matches && !frame) frame = requestAnimationFrame(paint);
    };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = element.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - .5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - .5) * 2;
      queue();
    };
    const leave = () => { pointerX = 0; pointerY = 0; queue(); };
    const preferenceChanged = () => {
      if (preference.matches) {
        cancelAnimationFrame(frame); frame = 0;
        element.style.removeProperty('--hero-depth-x');
        element.style.removeProperty('--hero-depth-y');
      } else queue();
    };
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    element.addEventListener('pointermove', pointer);
    element.addEventListener('pointerleave', leave);
    preference.addEventListener('change', preferenceChanged);
    queue();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      element.removeEventListener('pointermove', pointer);
      element.removeEventListener('pointerleave', leave);
      preference.removeEventListener('change', preferenceChanged);
    };
  }, []);
  return <section ref={hero} className="home-hero" aria-labelledby="hero-title">{children}</section>;
}
