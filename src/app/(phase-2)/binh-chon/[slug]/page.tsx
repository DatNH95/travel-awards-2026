import { UiIcon } from '@/components/ui-icon';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { votingProfiles } from '@/data/voting';
import { Container } from '@/components/phase-2/primitives';
import { SiteHeader } from '@/components/phase-2/site-header';
import { SiteFooter } from '@/components/phase-2/site-footer';
import { VotingSurvey } from '@/components/voting-survey';
import { ScrollReveal } from '@/components/scroll-reveal';
import { VotingDetailGallery, VotingDetailShare } from '@/components/voting-detail-media';
import { VotingDossier } from '@/components/voting-dossier';
import { VotingRelatedProfiles } from '@/components/voting-related-profiles';
import '@/app/home.css';
import '../voting.css';

export function generateStaticParams() { return votingProfiles.map(({slug}) => ({slug})); }
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params;
  const profile = votingProfiles.find(item => item.slug === slug);
  return {title: profile ? `${profile.name} — Bình chọn Travel Awards 2026` : 'Không tìm thấy hồ sơ'};
}

export default async function VotingDetail({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const profile = votingProfiles.find(item => item.slug === slug);
  if (!profile) notFound();
  return <div className="home voting-site surface surface--primary"><SiteHeader homePrefix="/" phase="voting" /><ScrollReveal /><main id="main"><section className="voting-detail"><Container>
    <nav className="voting-breadcrumb type-body-small" aria-label="Breadcrumb"><Link href="/phase-2">Trang chủ</Link><span aria-hidden="true">/</span><Link href="/binh-chon">Bình chọn</Link></nav>
    <div className="voting-detail-layout">
      <article className="voting-detail-main">
        <VotingDetailGallery images={profile.gallery} />
        <header className="voting-detail-intro">
          <h1>{profile.name}</h1>
          <dl className="voting-detail-meta type-body-small">
            <div><dt>Đơn vị / Cá nhân:</dt><dd>{profile.organization}</dd></div>
            <div className="voting-detail-category"><dt className="sr-only">Hạng mục dự thi:</dt><dd><UiIcon name="trophy" /><span>{profile.category}</span></dd></div>
          </dl>
        </header>
        <div className="voting-detail-actions">
          <div className="voting-detail-survey">
            <VotingSurvey profile={profile} />
            <p className="type-body-small"><strong>{profile.surveyCount.toLocaleString('vi-VN')}</strong> người đã tham gia khảo sát</p>
          </div>
          <VotingDetailShare slug={profile.slug} />
        </div>
        <VotingDossier profile={profile} />
      </article>
      <aside className="voting-detail-ad" aria-label="Quảng cáo">
        <Image src="/assets/key-visual/ADS%20300x600.jpg" alt="Banner quảng cáo" width={300} height={600} />
      </aside>
    </div>
    <VotingRelatedProfiles profiles={votingProfiles.filter(item => item.categoryId === profile.categoryId && item.slug !== profile.slug)} />
  </Container></section></main><SiteFooter homePrefix="/" /></div>;
}
