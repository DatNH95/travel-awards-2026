import type { Metadata } from 'next';
import { SiteHeader } from '@/components/phase-2/site-header';
import { SiteFooter } from '@/components/phase-2/site-footer';
import { VotingBrowser } from '@/components/voting-browser';
import { ScrollReveal } from '@/components/scroll-reveal';
import '@/app/home.css';
import './voting.css';

export const metadata: Metadata = {
  title: 'Bình chọn — Travel Awards 2026',
};

export default async function VotingPage({searchParams}: {searchParams: Promise<{category?: string | string[]}>}) {
  const {category} = await searchParams;
  return (
    <div className="home voting-site surface surface--primary">
      <SiteHeader homePrefix="/" phase="voting" />
      <ScrollReveal />
      <main id="main"><VotingBrowser headingLevel={1} initialCategoryId={typeof category === 'string' ? category : undefined} /></main>
      <SiteFooter homePrefix="/" />
    </div>
  );
}
