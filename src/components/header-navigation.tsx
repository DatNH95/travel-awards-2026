'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';

export function HeaderNavigation({ homePrefix = '' }: { homePrefix?: '' | '/' }) {
  const pathname = usePathname();
  const [active, setActive] = useState(homePrefix ? '' : '#main');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setActive(homePrefix ? '' : window.location.hash || '#main');
    const updateScroll = () => setScrolled(window.scrollY > 48);
    update();
    updateScroll();
    window.addEventListener('hashchange', update);
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', update);
      window.removeEventListener('scroll', updateScroll);
    };
  }, [homePrefix]);

  return <nav aria-label="Điều hướng chính" data-scrolled={scrolled ? 'true' : undefined}>
    <div className="home-header-links">
    <a href="/#main" className="home-nav-home" aria-label="Trang chủ" aria-current={active === '#main' ? 'location' : undefined}><Image src="/assets/key-visual/home.svg" alt="" aria-hidden="true" width={20} height={20} unoptimized /></a>
    <Link href="/the-le" aria-current={pathname === '/the-le' ? 'page' : undefined}>Thể lệ</Link>
    <Link href="/tin-tuc" aria-current={pathname === '/tin-tuc' || pathname.startsWith('/tin-tuc/') ? 'page' : undefined}>Tin tức</Link>
    </div>

  </nav>;
}


