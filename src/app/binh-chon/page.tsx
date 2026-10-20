import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import '../home.css';

export const metadata: Metadata = {
  title: 'Bình chọn — Travel Awards 2026',
};

export default function VotingPage() {
  return (
    <div className="home voting-site surface surface--primary">
      <SiteHeader homePrefix="/" />
      {/* Phase 2 content awaits the approved voting design. */}
      <main id="main" />
      <SiteFooter homePrefix="/" />
    </div>
  );
}
