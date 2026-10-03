import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Container, Section } from '@/components/primitives';
import { NominationCountdown } from '@/components/hero-stage';
import { NominationFlow } from './nomination-flow';
import '../home.css';
import './nomination.css';

export const metadata: Metadata = {
  title: 'Đăng ký / Đề cử — Travel Awards 2026',
  description: 'Chọn hạng mục giải thưởng để bắt đầu đăng ký đề cử Travel Awards 2026.',
};

export default function NominationPage() {
  return <div className="home nomination surface surface--primary">
    <SiteHeader homePrefix="/" />
    <main id="main"><Section><Container>
      <header className="nomination-intro">
        <nav className="nomination-breadcrumb type-body-small" aria-label="Breadcrumb"><ol><li><Link href="/">Trang chủ</Link></li><li aria-hidden="true">/</li><li aria-current="page">Đăng ký</li></ol></nav>
        <div className="nomination-title-row">
          <div className="nomination-title-copy">
            <h1 className="type-display-l">Đăng ký / Đề cử</h1>
            <p className="type-body-large">Bắt đầu hành trình đề cử bằng việc chọn hạng mục giải thưởng phù hợp.</p>
          </div>
          <NominationCountdown label="Thời gian nhận đề cử còn lại:" />
        </div>
      </header>
      <NominationFlow />
    </Container></Section></main>
    <SiteFooter homePrefix="/" />
  </div>;
}

