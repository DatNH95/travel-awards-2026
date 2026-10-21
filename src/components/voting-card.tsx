'use client';
import { UiIcon } from './ui-icon';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { VotingProfile } from '@/data/voting';
import { VotingSurvey } from './voting-survey';
import { useVotingSession } from './voting-session';

export function VotingCard({ profile }: { profile: VotingProfile }) {
  const {completed} = useVotingSession();
  const voted = completed[profile.categoryId] === profile.slug;
  const [copyStatus, setCopyStatus] = useState('');
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);
  function showCopyTip(message: string) {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    setCopyStatus(message);
    copyTimer.current = setTimeout(() => setCopyStatus(''), 2500);
  }
  const href = `/binh-chon/${profile.slug}`;
  function shareFacebook() {
    const url = new URL(href, window.location.origin).href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer,width=640,height=600');
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(new URL(href, window.location.origin).href);
      showCopyTip('Đã sao chép liên kết');
    } catch {
      showCopyTip('Chưa thể sao chép. Vui lòng thử lại.');
    }
  }

  return <article className="voting-card">
    <Link className="voting-image" href={href} tabIndex={-1} aria-hidden="true"><Image src={profile.image.src} alt="" width={720} height={432} unoptimized /></Link>
    <div className="voting-card-body">
      <div className="voting-card-copy"><h3><Link className="voting-card-link" href={href} title={profile.name}>{profile.name}</Link></h3>
      <p className="voting-card-organization">{profile.organization}</p></div>
      <div className="voting-card-actions"><VotingSurvey profile={profile} />
      <div className="voting-card-share" role="group" aria-label={`Chia sẻ ${profile.name}`}>
        <button type="button" aria-label="Share Facebook" title="Chia sẻ lên Facebook" onClick={shareFacebook}><span className="voting-facebook-icon" aria-hidden="true" /></button>
        <button type="button" aria-label="Copy link" title={copyStatus ? undefined : 'Sao chép liên kết'} data-copied={copyStatus === 'Đã sao chép liên kết'} onClick={copyLink}>
          <UiIcon name="link" size={18} />
        </button>
        <p className="voting-copy-status" role="status">{copyStatus}</p>
      </div>
      </div>
      <p className="voting-card-count">Đã có <strong>{profile.surveyCount.toLocaleString('vi-VN')}</strong> người tham gia bình chọn</p>
      {voted && <p className="voting-card-confirmation" role="status">Bạn đã bình chọn cho hồ sơ này.</p>}
    </div>
  </article>;
}
