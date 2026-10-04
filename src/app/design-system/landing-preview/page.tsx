import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Container } from '@/components/primitives';
import '../../home.css';

export default function LandingPreview() {
  return <div className="home">
    <SiteHeader homePrefix="/" />
    <main id="main"><Container><div style={{ paddingBlock: '4rem', minHeight: '240px' }}>
      <p className="type-heading-3">Travel Awards 2026</p>
      <p className="type-body-small">Cuộn trong khung để xem header sticky và footer thực tế.</p>
    </div></Container></main>
    <SiteFooter homePrefix="/" />
  </div>;
}