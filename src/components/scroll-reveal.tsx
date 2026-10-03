'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;

    // Animate on entry, without hiding server-rendered content or changing layout.
    // Reset after leaving the viewport so both scroll directions replay the reveal.
    const targets = document.querySelectorAll<HTMLElement>('.home main > .section > .layout-container, .home main h1, .home main h2, .home main h3, .home-timeline li');
    let frame = 0;
    const update = () => {
      frame = 0;
      if (preference.matches) return;
      for (const target of targets) {
        if (!target.isConnected) continue;
        // Layout offsets ignore our animated transforms and clip-paths.
        // Reading the animated intersection/rectangle creates a feedback loop.
        let documentTop = 0;
        for (let node: HTMLElement | null = target; node; node = node.offsetParent as HTMLElement | null) {
          documentTop += node.offsetTop;
        }
        const top = documentTop - window.scrollY;
        const bottom = top + target.offsetHeight;
        const revealClass = target.matches('.home-timeline li') ? 'home-timeline-step-enter' : target.matches('h1, h2, h3') ? 'home-heading-enter' : 'home-scroll-enter';
        if (bottom > 32 && top < window.innerHeight - 32) {
          target.classList.add(revealClass);
        } else if (bottom < -64 || top > window.innerHeight + 64) {
          // Separate entry/reset boundaries prevent jitter at the viewport edge.
          target.classList.remove(revealClass);
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    schedule();

    const reduceMotion = () => {
      if (!preference.matches) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
      targets.forEach(target => target.classList.remove('home-scroll-enter', 'home-heading-enter', 'home-timeline-step-enter'));
    };
    preference.addEventListener('change', reduceMotion);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', schedule);
      preference.removeEventListener('change', reduceMotion);
      targets.forEach(target => target.classList.remove('home-scroll-enter', 'home-heading-enter', 'home-timeline-step-enter'));
    };
  }, []);
  return null;
}
