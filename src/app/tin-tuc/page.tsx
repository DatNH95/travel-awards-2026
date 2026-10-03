import type { Metadata } from 'next';
import { Container } from '@/components/primitives';
import { NewsBreadcrumb, NewsCard, NewsSidebar } from '@/components/news/editorial';
import { getNewsArticles } from '@/data/news';
import { ScrollReveal } from '@/components/scroll-reveal';

export const metadata: Metadata = { title: 'Tin tức — Travel Awards 2026', description: 'Tin tức, câu chuyện và hành trình Travel Awards 2026.' };

export default function NewsPage() {
  const [featured, ...articles] = getNewsArticles();
  return <><ScrollReveal /><main id="main" className="news-main"><Container><NewsBreadcrumb /><div className="news-columns"><div className="news-list"><NewsCard article={featured} variant="featured" /><section className="news-latest" aria-label="Danh sách tin tức">{articles.map(article => <NewsCard key={article.slug} article={article} />)}</section></div><NewsSidebar /></div></Container></main></>;
}
