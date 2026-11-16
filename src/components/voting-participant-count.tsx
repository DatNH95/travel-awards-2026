'use client';

import { useVotingSession } from './voting-session';
import type { VotingProfile } from '@/data/voting';

export function VotingParticipantCount({profile,className='voting-card-count'}: {
  profile: Pick<VotingProfile,'slug'|'categoryId'|'surveyCount'>;
  className?: string;
}) {
  const {completedProfiles}=useVotingSession();
  const completed=completedProfiles[profile.categoryId]?.includes(profile.slug)??false;
  // The source has no totals yet. Only the current demo participant can add one.
  if(profile.surveyCount===null&&!completed)return null;
  const count=(profile.surveyCount??0)+(completed?1:0);
  return <p className={className} role="status">Đã có <strong>{count.toLocaleString('vi-VN')}</strong> người tham gia khảo sát</p>;
}
