'use client';
import { useEffect, useState } from 'react';
export const sections = [['gioi-thieu','Giới thiệu chung'],['hang-muc','Hạng mục & đối tượng'],['thoi-gian','Thời gian tổ chức'],['tieu-chi','Tiêu chí đánh giá'],['ho-so','Hồ sơ đề cử'],['quy-dinh','Điều lệ & quy định']] as const;
export function RulesNavigation() {
 const [active,setActive]=useState<string>('gioi-thieu');
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(visible[0])setActive(visible[0].target.id);},{rootMargin:'-140px 0px -50% 0px',threshold:0});sections.forEach(([id])=>{const el=document.getElementById(id);if(el)observer.observe(el);});return()=>observer.disconnect();},[]);
  useEffect(()=>{const openTarget=()=>{const target=document.getElementById(window.location.hash.slice(1));if(target instanceof HTMLDetailsElement){target.open=true;target.scrollIntoView({block:'start'});}};openTarget();window.addEventListener('hashchange',openTarget);return()=>window.removeEventListener('hashchange',openTarget);},[]);
 return <nav className="rules-nav" aria-label="Mục lục thể lệ"><ol>{sections.map(([id,label],i)=><li key={id}><a href={'#'+id} aria-current={active===id?'location':undefined} onClick={()=>setActive(id)}><span>{String(i+1).padStart(2,'0')}</span>{label}</a></li>)}</ol></nav>;
}


