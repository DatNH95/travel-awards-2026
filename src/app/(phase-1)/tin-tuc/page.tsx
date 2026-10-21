import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/primitives';
import { NewsBreadcrumb, NewsCard, NewsSidebar } from '@/components/news/editorial';
import { getNewsArticles } from '@/data/news';

export const metadata: Metadata = { title: 'Tin tức — Travel Awards 2026', description: 'Tin tức, câu chuyện và hành trình Travel Awards 2026.' };

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const articles = getNewsArticles();
  const list = articles.slice(4);
  const totalPages = Math.ceil(list.length / 12);
  const requested = Number((await searchParams).page);
  const page = Number.isInteger(requested) && requested >= 1 ? Math.min(requested, totalPages) : 1;
  const pages = [...new Set([1, 2, 3, 4, page, totalPages])].filter(value => value <= totalPages).sort((a, b) => a - b);
  const pageLink = (value: number) => `/tin-tuc?page=${value}#news-latest`;
  return <main id="main" className="news-main"><Container><NewsBreadcrumb />
    <div className="news-columns"><div className="news-list">
      <section className="news-top-grid" aria-label="Tin nổi bật">{articles.slice(0, 4).map((article, index) => <NewsCard key={article.slug} article={article} variant={index === 0 ? 'featured' : 'related'} />)}</section>
      <section id="news-latest" className="news-latest" aria-label={`Danh sách tin tức, trang ${page}`}>{list.slice((page - 1) * 12, page * 12).map(article => <NewsCard key={article.slug} article={article} />)}</section>
      <nav className="news-pagination" aria-label="Phân trang tin tức">
        {page > 1 && <Link href={pageLink(page - 1)} aria-label="Trang trước">&lt;</Link>}
        {pages.map((value, index) => <span className="news-page-item" key={value}>
          {index > 0 && value - pages[index - 1] > 1 && <span className="news-page-ellipsis" aria-hidden="true">…</span>}
          <Link href={pageLink(value)} aria-label={`Trang ${value}`} aria-current={value === page ? 'page' : undefined}>{value}</Link>
        </span>)}
        {page < totalPages && <Link href={pageLink(page + 1)} aria-label="Trang tiếp theo">&gt;</Link>}
      </nav>
    </div><NewsSidebar /></div>
  </Container></main>;
}
