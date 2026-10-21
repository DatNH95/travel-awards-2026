import type { Metadata } from 'next';
import '@/app/globals.css';
import './phase-2.css';
import { VotingSessionProvider } from '@/components/voting-session';

export const metadata: Metadata = {
  title: 'Travel Awards 2026 · Design Foundation',
  description: 'Visual foundation derived from the official Travel Awards key visual.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><head><link rel="stylesheet" href="/assets/icons/flaticon/uicons-regular-rounded.css" /><link rel="stylesheet" href="/assets/icons/flaticon/uicons-brands.css" /></head><body className="phase-2-scope"><a className="skip-link" href="#main">Đến nội dung chính</a><VotingSessionProvider>{children}</VotingSessionProvider></body></html>;
}
