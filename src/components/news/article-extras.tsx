import Image from 'next/image';
import { AdSlot } from './editorial';
import { travelRecommendations } from '@/data/travel-recommendations';

export function ArticleSidebar() {
  return <aside className="news-detail-sidebar" aria-label="Quảng cáo và tin xem nhiều">
    <AdSlot />
    <section className="news-most-read" aria-labelledby="most-read-title">
      <h2 id="most-read-title">Xem nhiều</h2>
      <ul>{travelRecommendations.map(item => <li key={item.href}><a href={item.href} target="_blank" rel="noopener noreferrer">{item.title}</a></li>)}</ul>
    </section>
  </aside>;
}

export function ArticleSuggestions() {
  return <section className="news-suggestions" aria-label="Tin bài gợi ý từ VnExpress Du lịch">
    {travelRecommendations.map(item => <article key={item.href}>
      <a className="news-suggestion-image" href={item.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true"><Image src={item.image} alt="" width={240} height={144} unoptimized /></a>
      <div><h2><a href={item.href} target="_blank" rel="noopener noreferrer">{item.title}</a></h2><p><a href={item.href} target="_blank" rel="noopener noreferrer">{item.lead}</a></p></div>
    </article>)}
  </section>;
}
