import Link from 'next/link';
import { BrandGraphic } from '../brand-graphics';
import { Container, VotingCTA, NominationCTA } from './primitives';
import { HeaderNavigation } from './header-navigation';

export function SiteHeader({ homePrefix = '', phase = 'voting' }: { homePrefix?: '' | '/'; phase?: 'nomination' | 'voting' }) {
  return <header className="home-header">
      <Container className="home-header-inner">
        <div className="home-header-brand-row"><Link href={phase === 'voting' ? '/phase-2#main' : '/#main'} aria-label="Travel Awards — Trang chủ"><BrandGraphic variant="logo" /></Link>{phase === 'voting' ? <VotingCTA className="home-header-cta" /> : <NominationCTA className="home-header-cta" />}</div>
        <HeaderNavigation homePrefix={homePrefix} phase={phase} />
      </Container>
    </header>;
}
