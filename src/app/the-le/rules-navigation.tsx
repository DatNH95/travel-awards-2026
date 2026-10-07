'use client';
import { useEffect, useRef, useState } from 'react';
export const sections = [['gioi-thieu','Giới thiệu chung'],['hang-muc','Hạng mục & đối tượng'],['thoi-gian','Thời gian tổ chức'],['tieu-chi','Tiêu chí đánh giá'],['ho-so','Hồ sơ đề cử'],['quy-dinh','Điều lệ & quy định']] as const;
export function RulesNavigation() {
 const [active,setActive]=useState<string>('gioi-thieu');
 const navRef=useRef<HTMLElement>(null);
 useEffect(()=>{
  let frame=0;
  const update=()=>{frame=0;let current:string=sections[0][0];const scrollPadding=parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||0;const offset=(window.matchMedia('(max-width:640px)').matches?100:160)+scrollPadding;for(const [id] of sections){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=offset)current=id;}setActive(current);};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
 },[]);
 useEffect(()=>{
  if(!window.matchMedia('(max-width:640px)').matches)return;
  const nav=navRef.current;const link=nav?.querySelector<HTMLElement>('a[aria-current]');if(!nav||!link)return;
  const bounds=nav.getBoundingClientRect();const item=link.getBoundingClientRect();
  if(item.left<bounds.left||item.right>bounds.right)nav.scrollTo({left:nav.scrollLeft+item.left-bounds.left-(bounds.width-item.width)/2,behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
 },[active]);
  useEffect(()=>{const openTarget=()=>{const target=document.getElementById(window.location.hash.slice(1));if(target instanceof HTMLDetailsElement){target.open=true;target.scrollIntoView({block:'start'});}};openTarget();window.addEventListener('hashchange',openTarget);return()=>window.removeEventListener('hashchange',openTarget);},[]);
 return <nav ref={navRef} className="rules-nav" aria-label="Mục lục thể lệ"><ol>{sections.map(([id,label],i)=><li key={id}><a href={'#'+id} aria-current={active===id?'location':undefined} onClick={()=>setActive(id)}><span>{String(i+1).padStart(2,'0')}</span>{label}</a></li>)}</ol></nav>;
}
