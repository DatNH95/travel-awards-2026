import localFont from 'next/font/local';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import '../home.css';
import './news.css';

const merriweather = localFont({ src: '../../../public/fonts/merriweather/merriweather-bold.ttf', weight: '700', style: 'normal', display: 'swap', variable: '--font-news-title' });

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <div className={`home news-site surface surface--primary ${merriweather.variable}`}><SiteHeader homePrefix="/" />{children}<SiteFooter homePrefix="/" /></div>;
}
