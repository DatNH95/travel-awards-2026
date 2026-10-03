import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Container } from '@/components/primitives';
import { NewsBreadcrumb, NewsCard, NewsSidebar, AdSlot } from '@/components/news/editorial';
import { getNewsArticles, getNewsArticle, getRelatedNews } from '@/data/news';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getNewsArticles().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getNewsArticle((await params).slug);
  return article ? { title: `${article.title} — Travel Awards 2026`, description: article.lead } : { title: 'Không tìm thấy bài viết — Travel Awards 2026' };
}

export default async function NewsDetailPage({ params }: Props) {
  const article = getNewsArticle((await params).slug);
  if (!article) notFound();
  return <main id="main" className="news-main"><ScrollReveal /><Container><NewsBreadcrumb article /><div className="news-columns"><div><article className="news-article"><h1 className="news-title news-headline">{article.title}</h1><p className="news-sapo">{article.lead}</p><div className="news-body">{article.content.map((block, index) => block.type === 'image' ? <figure key={index}><Image src={block.src} alt={block.alt} width={1000} height={600} unoptimized /><figcaption>{block.caption}</figcaption></figure> : block.type === 'heading' ? <h2 key={index} className="news-title">{block.text}</h2> : <p key={index}>{block.text}</p>)}</div><p className="news-author">{article.author}</p><AdSlot inline /><Link className="text-link news-back" href="/tin-tuc">← Tất cả tin tức</Link></article><section className="news-related" aria-labelledby="related-title"><h2 id="related-title" className="type-heading-3">Tin liên quan</h2><div className="news-related-grid">{getRelatedNews(article.slug).map(item => <NewsCard key={item.slug} article={item} variant="related" />)}</div></section></div><NewsSidebar /></div></Container></main>;
}
