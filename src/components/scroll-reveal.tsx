'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;

    // Animate on entry, without hiding server-rendered content or changing layout.
    // Hero title has a CSS entrance animation; avoid applying a second reveal to it.
    const targets = document.querySelectorAll<HTMLElement>('.home main > .section > .layout-container, .home main h1:not(#hero-title), .home main h2, .home main h3, .home-timeline li');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(entry.target.matches('.home-timeline li') ? 'home-timeline-step-enter' : entry.target.matches('h1, h2, h3') ? 'home-heading-enter' : 'home-scroll-enter');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.05, rootMargin: '0px 0px -32px 0px' });
    targets.forEach(target => observer.observe(target));

    const reduceMotion = () => {
      if (!preference.matches) return;
      observer.disconnect();
      targets.forEach(target => target.classList.remove('home-scroll-enter', 'home-heading-enter', 'home-timeline-step-enter'));
    };
    preference.addEventListener('change', reduceMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', reduceMotion);
      targets.forEach(target => target.classList.remove('home-scroll-enter', 'home-heading-enter', 'home-timeline-step-enter'));
    };
  }, []);
  return null;
}
