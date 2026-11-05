'use client';

import { useState } from 'react';
import { UiIcon } from './ui-icon';
import Image from 'next/image';
import rules from '@/data/travel-glow-rules.json';
import { votingProfiles } from '@/data/voting';
import { Container, Section, TextLink } from './phase-2/primitives';

// Front-end fixtures only. Names and like counts are illustrative.
const entries = [
  {title:'Tuổi 30, tôi tìm lại mình giữa biển trời Đà Nẵng',author:'Nguyễn Minh Anh',likes:245},
  {title:'Một chuyến đi, những khoảnh khắc rạng rỡ bên gia đình',author:'Trần Hoàng Nam',likes:186},
  {title:'Đi để khám phá, trở về để yêu thêm cuộc sống',author:'Lê Thảo Vy',likes:162},
  {title:'Hành trình chậm lại và lắng nghe chính mình',author:'Phạm Gia Huy',likes:138},
  {title:'Sau tuổi 30, những chuyến đi vẫn luôn mới',author:'Vũ Ngọc Hà',likes:127},
  {title:'Thanh xuân là những hành trình mình cùng nhau viết tiếp',author:'Đỗ Phương Linh',likes:109},
];
const prizeGroups: {title:string;prizes:{title:string;cash:string;description:string;notes:string[]}[]}[]=[];
for(const raw of rules.find(block=>block.title==='Cơ cấu giải thưởng')?.paragraphs ?? []) {
  const text=raw.trim();
  if(/^\d\. Nhóm giải/.test(text)) prizeGroups.push({title:text.replace(/^\d\. /,''),prizes:[]});
  else if(text.startsWith('- ')) prizeGroups.at(-1)?.prizes.push({title:text.slice(2).split(': Dành')[0],cash:'',description:text.includes(': Dành')?'Dành'+text.split(': Dành').slice(1).join(': Dành'):'',notes:[]});
  else { const prize=prizeGroups.at(-1)?.prizes.at(-1); if(prize) {if(text.startsWith('Tiền mặt:')) prize.cash=text.replace(/^Tiền mặt:\s*/,'');else prize.notes.push(text);} }
}
export function TravelGlowVoting() {
  const [voted,setVoted]=useState<number[]>([]);
  return <Section id="participate" className="home-travel-glow-voting"><Container>
    <header className="travel-glow-voting-heading"><div><h2 className="type-display-l">Cuộc thi 30Plus Travel Glow</h2><p>Chia sẻ hành trình trải nghiệm du lịch tuổi 30, lưu giữ những khoảnh khắc rạng rỡ theo cách của bạn.</p></div><TextLink href="/the-le#cuoc-thi-30plus-travelglow">Xem chi tiết thể lệ</TextLink></header>
    <div className="voting-grid">{entries.map((entry,index)=>{
      const selected=voted.includes(index);
      return <article className="voting-card travel-glow-entry" key={entry.title}>
        <div className="voting-image"><Image src={votingProfiles[index].image.src} alt="" width={720} height={432} unoptimized /></div>
        <div className="voting-card-body"><div className="voting-card-copy"><h3>{entry.title}</h3><p className="voting-card-organization">{entry.author}</p></div>
          <div className="travel-glow-entry-actions"><p><UiIcon name="heart" size={22} /><strong>{(entry.likes+(selected?1:0)).toLocaleString('vi-VN')}</strong><span>lượt thích</span></p><button type="button" className="button button--primary voting-survey-trigger" disabled={selected} onClick={()=>setVoted(previous=>previous.includes(index)?previous:[...previous,index])}>{selected?'Đã bình chọn':'Bình chọn'}</button></div>
          {selected&&<p className="travel-glow-entry-success" role="status">Bạn đã bình chọn cho bài thi này.</p>}
        </div>
      </article>;
    })}</div>
    <section className="travel-glow-prizes" aria-labelledby="travel-glow-prizes-title">
      <header className="travel-glow-prizes-heading"><h3 id="travel-glow-prizes-title">Cơ cấu <span>giải thưởng</span></h3><p>Những câu chuyện và hành trình rạng rỡ được ghi nhận cùng giải thưởng tiền mặt và quà tặng từ Nhà tài trợ.</p></header>
      <ul className="travel-glow-prizes-grid">{prizeGroups.flatMap(group=>group.prizes.map(prize=>({...prize,group:group.title}))).map((prize,index)=><li className="travel-glow-prize-item" data-featured={index===0} key={prize.title}>
        <Image className="travel-glow-prize-laurel" src="/assets/phase-2/prize-laurel.svg" alt="" width={100} height={92} unoptimized />
        <h4>{prize.title}</h4><p className="travel-glow-prize-method">{prize.group.includes('cộng đồng')?'Cộng đồng bình chọn':'BTC / Ban Giám khảo lựa chọn'}</p>
        <p className="travel-glow-prize-cash"><span>Tiền mặt / giải</span><strong>{prize.cash.split(' đồng')[0]}<small>VNĐ</small></strong></p>
        <p className="travel-glow-prize-description">{prize.description}</p>{prize.notes.map(note=><p className="travel-glow-prize-note" key={note}>{note}</p>)}
      </li>)}</ul>
    </section>
  </Container></Section>;
}
