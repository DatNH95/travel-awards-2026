'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function HeaderNavigation() {
  const [active, setActive] = useState('#main');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setActive(window.location.hash || '#main');
    const updateScroll = () => setScrolled(window.scrollY > 48);
    update();
    updateScroll();
    window.addEventListener('hashchange', update);
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', update);
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  return <nav aria-label="Điều hướng chính" data-scrolled={scrolled ? 'true' : undefined}>
    <a href="/#main" className="home-nav-home" aria-label="Trang chủ" aria-current={active === '#main' ? 'location' : undefined}><Image src="/assets/key-visual/home.svg" alt="" aria-hidden="true" width={20} height={20} unoptimized /></a>
    <a href="#participate" aria-current={active === '#participate' ? 'location' : undefined}>Thể lệ</a>
    <a href="#news" aria-current={active === '#news' ? 'location' : undefined}>Tin tức</a>
  </nav>;
}
