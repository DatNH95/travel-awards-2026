'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;

    // Animate on entry, without hiding server-rendered content or changing layout.
    const blocks = document.querySelectorAll<HTMLElement>('.home main > .section > .layout-container');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('home-scroll-enter');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.05, rootMargin: '0px 0px -32px 0px' });
    blocks.forEach(block => observer.observe(block));

    const reduceMotion = () => {
      if (!preference.matches) return;
      observer.disconnect();
      blocks.forEach(block => block.classList.remove('home-scroll-enter'));
    };
    preference.addEventListener('change', reduceMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', reduceMotion);
      blocks.forEach(block => block.classList.remove('home-scroll-enter'));
    };
  }, []);
  return null;
}
