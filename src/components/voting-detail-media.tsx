'use client';
import { UiIcon } from './ui-icon';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import type { VotingProfile } from '@/data/voting';

export function VotingDetailGallery({ images }: { images: VotingProfile['gallery'] }) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const zoomDialog = useRef<HTMLDialogElement>(null);
  const zoomTitle = useId();
  const image = images[active];
  useEffect(() => {
    if (!zoomOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [zoomOpen]);
  function move(direction: number) { setActive(index => (index + direction + images.length) % images.length); }

  return <div id="profile-gallery" className="voting-detail-gallery" role="region" aria-roledescription="trình chiếu ảnh" aria-label="Hình ảnh hồ sơ"
    onKeyDown={event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        move(event.key === 'ArrowLeft' ? -1 : 1);
      }
    }}>
    <figure>
      <div className="voting-detail-image">
        {images.map((item, index) => <Image key={item.src} className="voting-gallery-slide" data-active={index === active} src={item.src} alt={index === active ? item.alt : ''} aria-hidden={index !== active} width={1200} height={720} unoptimized loading="eager" />)}
        <button type="button" className="voting-gallery-zoom" aria-label="Phóng to ảnh" aria-haspopup="dialog" onClick={() => { zoomDialog.current?.showModal(); setZoomOpen(true); }}><span aria-hidden="true" /></button>
        {images.length > 1 && <>
          <button type="button" className="voting-gallery-arrow voting-gallery-prev" aria-label="Ảnh trước" onClick={() => move(-1)}><span className="voting-slider-arrow-icon voting-slider-arrow-icon--prev" aria-hidden="true" /></button>
          <button type="button" className="voting-gallery-arrow voting-gallery-next" aria-label="Ảnh tiếp theo" onClick={() => move(1)}><span className="voting-slider-arrow-icon voting-slider-arrow-icon--next" aria-hidden="true" /></button>
          <span className="voting-gallery-count" aria-hidden="true">{active + 1} / {images.length}</span>
        </>}
      </div>
      <span className="sr-only" aria-live="polite">Ảnh {active + 1} / {images.length}: {image.alt}</span>
    </figure>
    {images.length > 1 && <div className="voting-gallery-thumbnails" role="group" aria-label="Chọn ảnh">
      {images.map((item, index) => <button type="button" key={item.src} aria-label={`Xem ảnh ${index + 1}: ${item.alt}`} aria-pressed={active === index} onClick={() => setActive(index)}>
        <Image src={item.src} alt="" width={120} height={72} unoptimized />
      </button>)}
    </div>}
    <dialog ref={zoomDialog} className="voting-gallery-lightbox" aria-labelledby={zoomTitle} onClose={() => setZoomOpen(false)} onClick={event => { if (event.target === zoomDialog.current) zoomDialog.current.close(); }}>
      <h2 id={zoomTitle} className="sr-only">Xem ảnh phóng to: {image.alt}</h2>
      <button type="button" className="voting-lightbox-close" aria-label="Đóng ảnh phóng to" onClick={() => zoomDialog.current?.close()}><UiIcon name="cross" /></button>
      {zoomOpen && <Image src={image.src} alt={image.alt} width={1920} height={1280} unoptimized />}
    </dialog>
  </div>;
}

export function VotingDetailShare({ slug }: { slug: string }) {
  const [status, setStatus] = useState('');
  function profileUrl() { return new URL(`/binh-chon/${slug}`, window.location.origin).href; }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(profileUrl());
      setStatus('Đã sao chép liên kết');
    } catch { setStatus('Chưa thể sao chép. Vui lòng sao chép đường dẫn trên thanh địa chỉ.'); }
  }
  return <div className="voting-detail-share">
    <span className="type-body-small">Chia sẻ</span>
    <div className="voting-card-share" role="group" aria-label="Chia sẻ hồ sơ">
      <button type="button" aria-label="Chia sẻ lên Facebook" title="Chia sẻ lên Facebook" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl())}`, '_blank', 'noopener,noreferrer,width=640,height=600')}><span className="voting-facebook-icon" aria-hidden="true" /></button>
      <button type="button" aria-label="Sao chép liên kết" title="Sao chép liên kết" onClick={copyLink}><UiIcon name="link" size={18} /></button>
    </div>
    <p className="voting-detail-share-status type-body-small" role="status">{status}</p>
  </div>;
}
