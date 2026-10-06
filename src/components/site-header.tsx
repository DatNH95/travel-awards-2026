import Link from 'next/link';
import { BrandGraphic } from './brand-graphics';
import { Container, NominationCTA } from './primitives';
import { HeaderNavigation } from './header-navigation';

export function SiteHeader({ homePrefix = '' }: { homePrefix?: '' | '/' }) {
  return <header className="home-header">
      <Container className="home-header-inner">
        <div className="home-header-brand-row"><Link href="/#main" aria-label="Travel Awards — Trang chủ"><BrandGraphic variant="logo" /></Link><NominationCTA className="home-header-cta" /></div>
        <HeaderNavigation homePrefix={homePrefix} />
      </Container>
    </header>;
}
