import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/primitives';
import { ArticleTimestamp } from '@/components/news/article-timestamp';
import { ArticleSidebar, ArticleSuggestions } from '@/components/news/article-extras';
import { getNewsArticles, getNewsArticle } from '@/data/news';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getNewsArticles().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getNewsArticle((await params).slug);
  return article ? { title: `${article.title} — Travel Awards 2026`, description: article.lead } : { title: 'Không tìm thấy bài viết — Travel Awards 2026' };
}

export default async function NewsDetailPage({ params }: Props) {
  const article = getNewsArticle((await params).slug);
  if (!article) notFound();
  return <main id="main" className="news-main news-detail"><Container>
    <div className="news-detail-columns">
      <div className="news-detail-content">
        <div className="news-detail-topline">
          <nav className="news-detail-breadcrumb" aria-label="Đường dẫn"><ol>
            <li><a href="https://vnexpress.net/du-lich">Du lịch</a></li>
            <li><Link href="/tin-tuc">Travel Awards 2026</Link></li>
          </ol></nav>
          <ArticleTimestamp />
        </div>
        <article className="news-article">
          <h1 className="news-title news-headline">{article.title}</h1>
          <p className="news-sapo">{article.lead}</p>
          <div className="news-body">{article.content.map((block, index) =>
            block.type === 'image' ? <figure key={index}><Image src={block.src} alt={block.alt} width={1000} height={600} unoptimized /><figcaption>{block.caption}</figcaption></figure>
            : block.type === 'heading' ? <h2 key={index} className="news-title">{block.text}</h2>
            : <p key={index}>{block.text}</p>
          )}</div>
          <p className="news-author">{article.author}</p>
        </article>
        <ArticleSuggestions />
        <Link className="text-link news-back" href="/tin-tuc">← Tất cả tin tức</Link>
      </div>
      <ArticleSidebar />
    </div>
  </Container></main>;
}
