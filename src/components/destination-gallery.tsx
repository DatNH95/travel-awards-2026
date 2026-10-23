import Image from 'next/image';
import destinations from '@/data/destination-gallery.json';
import { CTAArrow } from './primitives';
import './destination-gallery.css';

export function DestinationGallery() {
  return <section id="destinations" className="destination-gallery" aria-labelledby="destination-gallery-title">
    <div className="destination-gallery-grid">
      {destinations.map((destination, index) => <a
        key={`${destination.href}-${index}`}
        className={`destination-gallery-frame${destination.wide ? ' destination-gallery-frame--wide' : ''}${destination.feature ? ' destination-gallery-frame--feature' : ''}`}
        href={destination.feature ? 'https://vnexpress.net/du-lich/diem-den' : destination.href}
        target="_blank" rel="noopener noreferrer"
        aria-label={destination.feature ? 'Khám phá điểm đến trên VnExpress Du lịch (mở tab mới)' : `${destination.title}, ${destination.location} (mở bài trên VnExpress)`}
      >
        <Image src={destination.image} alt={destination.alt} fill unoptimized sizes="(max-width: 767px) 100vw, 40vw" />
        {destination.feature ? <div className="destination-gallery-feature-copy">
          <h2 id="destination-gallery-title">Việt Nam,<br />những điểm đến</h2>
          <span className="destination-gallery-explore">Khám phá điểm đến <CTAArrow /></span>
        </div> : <div className="destination-gallery-caption">
          <span className="destination-gallery-location">{destination.location}</span>
          <span className="destination-gallery-name">{destination.title}</span>
        </div>}
      </a>)}
    </div>
  </section>;
}
