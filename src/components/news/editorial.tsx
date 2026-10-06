import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/data/news';

export function NewsBreadcrumb({ article = false }: { article?: boolean }) {
  return <nav className="news-breadcrumb" aria-label="Đường dẫn"><ol><li><Link href="/">Trang chủ</Link></li><li>{article ? <Link href="/tin-tuc">Tin tức</Link> : <span aria-current="page">Tin tức</span>}</li>{article && <li aria-current="page">Chi tiết bài viết</li>}</ol></nav>;
}


export function NewsCard({ article, variant = 'row' }: { article: NewsArticle; variant?: 'featured' | 'row' | 'related' }) {
  const Heading = variant === 'related' ? 'h3' : 'h2';
  return <article className={`news-card news-card--${variant}`}>
    <Link className="news-thumbnail" href={`/tin-tuc/${article.slug}`} tabIndex={-1} aria-hidden="true"><Image src={article.image.src} alt="" width={1000} height={600} unoptimized preload={variant === 'featured'} /></Link>
    <div className="news-card-copy"><Heading className="news-title"><Link href={`/tin-tuc/${article.slug}`}>{article.title}</Link></Heading><p className="news-lead"><Link href={`/tin-tuc/${article.slug}`}>{article.lead}</Link></p></div>
  </article>;
}

export function AdSlot({ inline = false }: { inline?: boolean }) {
  if (!inline) return <div className="news-ad news-ad--image"><Image src="/assets/key-visual/ADS%20300x600.jpg" alt="Quảng cáo demo Travel Awards" width={300} height={600} unoptimized /></div>;
  return <div className={`news-ad${inline ? ' news-ad--inline' : ''}`} role="img" aria-label={`Vị trí quảng cáo ${inline ? 'ngang trong bài viết' : '300 × 600'}`}><span>QUẢNG CÁO</span><div><span>Travel Awards 2026</span><strong>{inline ? 'Không gian đồng hành' : '300 × 600'}</strong><small>Vị trí banner</small></div></div>;
}

export function NewsSidebar() {
  return <aside className="news-sidebar" aria-label="Quảng cáo"><AdSlot /></aside>;
}

