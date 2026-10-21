'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { votingProfiles } from '@/data/voting';
import { CTAArrow, Container, Section } from './phase-2/primitives';
import { UiIcon } from './ui-icon';
import { useVotingSession } from './voting-session';

// Fictional names and completed-survey fixtures for front-end review only.
// These represent completion events, never profile views or unfinished surveys.
const participants = [
  {id:'minh-anh',name:'Minh Anh',completed:15,profile:0,time:'10:42',avatar:1},
  {id:'hoang-nam',name:'Hoàng Nam',completed:14,profile:11,time:'10:38',avatar:2},
  {id:'thao-vy',name:'Thảo Vy',completed:12,profile:22,time:'10:35',avatar:3},
  {id:'gia-huy',name:'Gia Huy',completed:10,profile:32,time:'10:31',avatar:4},
  {id:'ngoc-ha',name:'Ngọc Hà',completed:8,profile:41,time:'10:27',avatar:5},
  {id:'tuan-kiet',name:'Tuấn Kiệt',completed:6,profile:52,time:'10:24',avatar:6},
  {id:'phuong-linh',name:'Phương Linh',completed:4,profile:63,time:'10:21',avatar:7},
  {id:'duc-anh',name:'Đức Anh',completed:3,profile:74,time:'10:18',avatar:8},
  {id:'khanh-chi',name:'Khánh Chi',completed:2,profile:85,time:'10:15',avatar:9},
  {id:'bao-long',name:'Bảo Long',completed:1,profile:96,time:'10:12',avatar:10},
];
const completedFixtures = participants.slice(0,5).map(person => ({
  slug:votingProfiles[person.profile].slug,
  completedAt:`2026-10-21T${person.time}:00+07:00`,
}));
const displayTime = (value: string) => new Intl.DateTimeFormat('vi-VN',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Ho_Chi_Minh'}).format(new Date(value));

export function VotingCommunity() {
  const {completed,recentCompletions} = useVotingSession();
  const track = useRef<HTMLDivElement>(null);
  const [active,setActive] = useState(0);
  const recent = [...recentCompletions,...completedFixtures]
    .filter((event,index,events) => events.findIndex(other=>other.slug===event.slug)===index)
    .slice(0,10);
  const count = Object.keys(completed).length;
  const leaderboard = [
    ...participants.map(person=>({...person,isCurrent:false})),
    ...(count ? [{id:'current-demo',name:'Bạn',completed:count,profile:0,time:displayTime(recentCompletions[0].completedAt),avatar:10,isCurrent:true}] : []),
  ].sort((a,b)=>b.completed-a.completed || Number(b.isCurrent)-Number(a.isCurrent)).slice(0,10);

  useEffect(() => {
    const element=track.current;
    if (!element) return;
    const update=()=>setActive(Math.round(element.scrollLeft/element.clientWidth));
    element.scrollTo({left:0,behavior:'instant'});
    update();
    element.addEventListener('scroll',update,{passive:true});
    const observer=new ResizeObserver(update);
    observer.observe(element);
    return ()=>{element.removeEventListener('scroll',update);observer.disconnect();};
  },[recent[0]?.slug]);
  function selectSlide(index: number) {
    const element=track.current;
    if (!element) return;
    element.scrollTo({left:index*element.clientWidth,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }

  return <Section id="voting-community" className="home-voting-community"><Container>
    <div className="voting-community-grid">
      <section className="voting-community-panel" aria-labelledby="recent-votes-title">
        <header className="voting-community-heading"><div><h2 id="recent-votes-title">Bình chọn mới nhất</h2><p>Hồ sơ vừa được hoàn tất khảo sát</p></div><Link className="text-link" href="/binh-chon" aria-label="Khám phá các hồ sơ bình chọn"><CTAArrow /></Link></header>
        <div className="voting-recent-carousel" role="region" aria-roledescription="carousel" aria-label="Hồ sơ vừa được bình chọn">
          <div className="voting-recent-track" id="recent-votes-track" ref={track}>{recent.map((event,index)=>{
            const profile=votingProfiles.find(profile=>profile.slug===event.slug)!;
            return <article className="voting-recent-slide" key={event.slug} role="group" aria-roledescription="slide" aria-label={`${index+1} / ${recent.length}`} inert={active!==index}>
              <Link className="voting-recent-image" href={`/binh-chon/${profile.slug}`} aria-label={profile.name}><Image src={profile.image.src} alt={profile.name} width={720} height={432} unoptimized /></Link>
              <div className="voting-recent-caption"><p className="voting-community-meta">{profile.category}</p><h3><Link href={`/binh-chon/${profile.slug}`}>{profile.name}</Link></h3><p className="voting-recent-organization">{profile.organization}</p><p className="voting-recent-completed"><UiIcon name="check" size={14} /> Đã hoàn tất khảo sát <time dateTime={event.completedAt}>{displayTime(event.completedAt)}</time></p></div>
            </article>;
          })}</div>
          <div className="voting-recent-navigation"><div className="voting-recent-controls" role="group" aria-label="Chuyển hồ sơ mới nhất">
            <button type="button" className="voting-category-arrow" aria-label="Hồ sơ mới nhất trước" aria-controls="recent-votes-track" disabled={active===0} onClick={()=>selectSlide(active-1)}><span className="voting-slider-arrow-icon voting-slider-arrow-icon--prev" aria-hidden="true" /></button>
            <span className="voting-recent-position" aria-live="polite">{String(active+1).padStart(2,'0')} <span>/ {String(recent.length).padStart(2,'0')}</span></span>
            <button type="button" className="voting-category-arrow" aria-label="Hồ sơ mới nhất tiếp theo" aria-controls="recent-votes-track" disabled={active===recent.length-1} onClick={()=>selectSlide(active+1)}><span className="voting-slider-arrow-icon voting-slider-arrow-icon--next" aria-hidden="true" /></button>
          </div><span className="voting-community-meta">Vuốt để khám phá</span></div>
          <div className="voting-recent-thumbnails" role="group" aria-label="Chọn hồ sơ mới nhất">{recent.map((event,index)=>{
            const profile=votingProfiles.find(profile=>profile.slug===event.slug)!;
            return <button type="button" key={event.slug} aria-label={`Xem ${profile.name}`} aria-pressed={active===index} onClick={()=>selectSlide(index)}><Image src={profile.image.src} alt="" width={100} height={60} unoptimized /></button>;
          })}</div>
        </div>
      </section>
      <section className="voting-community-panel voting-community-panel--participants" aria-labelledby="completed-voters-title">
        <header className="voting-community-heading"><div><p className="voting-leaderboard-label"><UiIcon name="trophy" size={14} /> Top 10 người tham gia</p><h2 id="completed-voters-title">Người hoàn thành bình chọn</h2><p>Xếp theo số hạng mục đã hoàn tất khảo sát</p></div></header>
        <ol className="voting-community-list voting-leaderboard">{leaderboard.map((person,index)=><li className="voting-participant-item" key={person.id} data-current={person.isCurrent}>
          <span className="voting-participant-rank" data-rank={index+1} aria-label={`Hạng ${index+1}`}>{index<3?<><UiIcon name={index===0?'trophy':'medal'} size={24} /><span>{index+1}</span></>:String(index+1).padStart(2,'0')}</span>
          <Image className="voting-participant-avatar" src={`/assets/phase-2/avatars/${person.avatar}.jpg`} alt="" width={32} height={32} unoptimized />
          <div className="voting-community-copy"><h3>{person.name}</h3><p className="voting-community-meta">Hoàn tất lúc {person.time}</p></div>
          <span className={`voting-participant-progress${person.completed===15?' is-complete':''}`}><span>{person.completed}<span className="voting-progress-total">/15</span></span><span>hạng mục</span></span>
        </li>)}</ol>
      </section>
    </div>
    <p className="voting-community-note">Dữ liệu và ảnh đại diện minh họa · Khảo sát hoàn tất trong phiên trải nghiệm sẽ cập nhật tại đây; tải lại trang sẽ đặt lại dữ liệu.</p>
  </Container></Section>;
}
