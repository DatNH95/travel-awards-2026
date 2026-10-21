'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { VotingProfile } from '@/data/voting';
import { VotingCard } from './voting-card';

export function VotingRelatedProfiles({ profiles }: { profiles: VotingProfile[] }) {
  const track = useRef<HTMLDivElement>(null);
  const id = useId();
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => setEdges({ start: element.scrollLeft <= 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    update();
    element.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener('scroll', update); observer.disconnect(); };
  }, []);
  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  if (!profiles.length) return null;
  return <section className="voting-related" aria-labelledby={`${id}-title`}>
    <header className="voting-related-heading"><h2 id={`${id}-title`} className="type-display-l">Hồ sơ đề cử khác</h2>
      <div className="voting-related-controls" role="group" aria-label="Chuyển hồ sơ đề cử">
        <button type="button" className="voting-category-arrow" aria-label="Hồ sơ trước" aria-controls={`${id}-track`} disabled={edges.start} onClick={() => move(-1)}><span className="voting-slider-arrow-icon voting-slider-arrow-icon--prev" aria-hidden="true" /></button>
        <button type="button" className="voting-category-arrow" aria-label="Hồ sơ tiếp theo" aria-controls={`${id}-track`} disabled={edges.end} onClick={() => move(1)}><span className="voting-slider-arrow-icon voting-slider-arrow-icon--next" aria-hidden="true" /></button>
      </div>
    </header>
    <div id={`${id}-track`} className="voting-related-track" ref={track}>{profiles.map(profile => <VotingCard profile={profile} key={profile.slug} />)}</div>
  </section>;
}
