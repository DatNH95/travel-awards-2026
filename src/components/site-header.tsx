import Image from 'next/image';
import Link from 'next/link';
import { BrandGraphic } from './brand-graphics';
import { Container, NominationCTA } from './primitives';
import { HeaderNavigation } from './header-navigation';

export function SiteHeader({ homePrefix = '' }: { homePrefix?: '' | '/' }) {
  return <header className="home-header">
      <div className="home-publisher-bar">
        <Container className="home-publisher-inner">
          <div className="home-publisher-links"><a className="home-publisher-name" href="https://vnexpress.net/">VnExpress</a><span className="home-publisher-separator" aria-hidden="true" /><a href="https://vnexpress.net/du-lich">Du lịch</a></div>
          <div className="home-account-actions"><a className="home-account-link" href="https://my.vnexpress.net/" target="_blank" rel="noopener noreferrer"><Image src="/assets/key-visual/login.svg" alt="" aria-hidden="true" width={20} height={20} unoptimized /><span>Đăng nhập</span></a><Image className="home-header-notification" src="/assets/key-visual/notification.svg" alt="Thông báo" width={20} height={20} unoptimized /></div>
        </Container>
      </div>
      <Container className="home-header-inner">
        <div className="home-header-brand-row"><Link href="/#main" aria-label="Travel Awards — Trang chủ"><BrandGraphic variant="logo" /></Link><NominationCTA className="home-header-cta" /></div>
        <HeaderNavigation homePrefix={homePrefix} />
      </Container>
    </header>;
}
