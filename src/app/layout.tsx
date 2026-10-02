import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Travel Awards 2026 · Design Foundation',
  description: 'Visual foundation derived from the official Travel Awards key visual.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body><a className="skip-link" href="#main">Đến nội dung chính</a>{children}</body></html>;
}
