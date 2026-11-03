'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { Button } from './primitives';
import { UiIcon } from './ui-icon';
import { votingProfiles } from '@/data/voting';
import type { VotingProfile } from '@/data/voting';
import { useVotingSession } from './voting-session';
import { SurveyProgress } from './voting-questionnaire/survey-progress';
import { ProfileScreening, SatisfactionRating, SurveyCompletion } from './voting-questionnaire/survey-experience';
import { emptyResponse, ratingLevels, type CategoryResponse } from './voting-questionnaire/survey-data';
import './voting-questionnaire/questionnaire.css';

const steps = [
  {id:'category',title:'Giải thưởng',description:'Xác nhận hạng mục khảo sát.'},
  {id:'experience',title:'Chọn hồ sơ',description:'Chia sẻ trải nghiệm của bạn.'},
  {id:'rating',title:'Đánh giá',description:'Đánh giá mức độ hài lòng.'},
  {id:'completion',title:'Hoàn thành',description:'Xem lại phản hồi.'},
];
export function VotingSurvey({ profile, label = 'Bình chọn' }: { profile: Pick<VotingProfile,'name'|'slug'|'categoryId'>; label?: string }) {
  const {completed,completedProfiles,finish} = useVotingSession();
  const previous = completed[profile.categoryId];
  const fullProfile = votingProfiles.find(item=>item.slug===profile.slug);
  const profiles = votingProfiles.filter(item=>item.categoryId===profile.categoryId).map(item=>({id:item.slug,name:item.name,location:item.organization,image:item.image.src}));
  const dialog=useRef<HTMLDialogElement>(null);
  const heading=useRef<HTMLHeadingElement>(null);
  const [open,setOpen]=useState(false);
  const [step,setStep]=useState(0);
  const [response,setResponse]=useState<CategoryResponse>(emptyResponse);
  const uid=useId();
  useEffect(()=>{if(!open)return;const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=before;};},[open]);
  function navigate(next:number){setStep(next);requestAnimationFrame(()=>{heading.current?.focus();dialog.current?.scrollTo({top:0});});}
  function complete(){if(!response.noneUsed && (response.selected.length===0||!response.selected.every(id=>profiles.some(item=>item.id===id)&&ratingLevels.some(level=>level.value===response.ratings[id]))))return;if(finish(profile.categoryId,response.noneUsed?profile.slug:response.selected)){setResponse({...response,completed:true});navigate(3);}}
  function close(){dialog.current?.close();}
  return <>
    <Button className="voting-survey-trigger" disabled={!!previous} title={previous ? completedProfiles[profile.categoryId]?.includes(profile.slug)?'Bạn đã bình chọn cho hồ sơ này':'Bạn đã bình chọn hồ sơ khác trong hạng mục này':undefined} onClick={()=>{setStep(0);setResponse(emptyResponse());dialog.current?.showModal();setOpen(true);}}>{previous?'Đã bình chọn':label}</Button>
    <dialog ref={dialog} className="voting-survey-modal surface surface--primary" aria-labelledby={`${uid}-title`} onClose={()=>setOpen(false)} onClick={event=>{if(event.target===dialog.current){const r=dialog.current.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}}}>
      <header className="voting-questionnaire-header"><div><p className="eyebrow">Travel Awards 2026</p><h2 ref={heading} tabIndex={-1} id={`${uid}-title`}>Khảo sát trải nghiệm</h2></div><button type="button" className="voting-dialog-close" aria-label="Đóng khảo sát" onClick={close}><UiIcon name="cross" /></button></header>
      <div className="nomination-layout survey-workspace" data-step={step}>
        <SurveyProgress steps={steps} currentStep={step} onBack={navigate} allowBack={false} variant="timeline" skippedSteps={step===3&&response.noneUsed?[2]:[]} />
        <div className="nomination-content survey-body">
          <header className="nomination-step-heading survey-body-heading"><div className="nomination-title-copy"><h3>{step===0?'Hạng mục bạn đang bình chọn':step===1?'Bạn đã trải nghiệm hồ sơ này chưa?':step===2?'Mức độ hài lòng của bạn':'Cảm ơn bạn đã chia sẻ'}</h3><p className="survey-body-lead"><strong>{fullProfile?.category}</strong></p></div></header>
          {step===0?<div className="stack"><div className="voting-questionnaire-selection"><p>{fullProfile?.category}</p><h3>{profile.name}</h3><p>{fullProfile?.organization}</p></div><p className="type-body-small">Bạn có thể chọn nhiều hồ sơ trong cùng hạng mục và đánh giá từng hồ sơ.</p><div className="nomination-actions"><Button variant="secondary" onClick={close}>Để sau</Button><Button onClick={()=>navigate(1)}>Tiếp tục</Button></div></div>:step===1?<ProfileScreening currentProfileId={profile.slug} categoryId={profile.categoryId} profiles={profiles} response={response} onChange={setResponse} onBack={()=>navigate(0)} onNext={()=>response.noneUsed?complete():navigate(2)}/>:step===2?<SatisfactionRating profiles={profiles} response={response} onChange={setResponse} onBack={()=>navigate(1)} onComplete={complete}/>:<><p className="voting-questionnaire-confirmation" role="status">Bạn đã hoàn tất bình chọn cho các hồ sơ đã chọn.</p><SurveyCompletion profiles={profiles} response={response} completedCounts={[{label:'Hạng mục đã hoàn tất',completed:Object.keys(completed).length,total:15}]} onBack={close}/><p className="type-body-small">Trạng thái mô phỏng trong phiên trải nghiệm, chưa gửi dữ liệu thật.</p></>}
        </div>
      </div>
    </dialog>
  </>;
}
