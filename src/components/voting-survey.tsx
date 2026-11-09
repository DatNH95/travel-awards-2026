'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { Button } from './primitives';
import { UiIcon } from './ui-icon';
import { votingProfiles } from '@/data/voting';
import type { VotingProfile } from '@/data/voting';
import { useVotingSession } from './voting-session';
import { SurveyHistory } from './voting-questionnaire/survey-history';
import { SurveyProgress } from './voting-questionnaire/survey-progress';
import { ProfileScreening, SatisfactionRating, SurveyCompletion } from './voting-questionnaire/survey-experience';
import { emptyResponse, ratingLevels, type CategoryResponse } from './voting-questionnaire/survey-data';
import './voting-questionnaire/questionnaire.css';
import { categoryGroups } from './voting-questionnaire/survey-categories';
import { UiIcon as SurveyIcon } from './voting-questionnaire/ui-icon';
import { awardCategoryId } from '@/data/awards';
import { getScreeningCopy } from './voting-questionnaire/survey-copy';

const steps = [
  {id:'category',title:'Giải thưởng',description:'Xác nhận hạng mục khảo sát.'},
  {id:'experience',title:'Chọn hồ sơ',description:'Chia sẻ trải nghiệm của bạn.'},
  {id:'rating',title:'Đánh giá',description:'Đánh giá mức độ hài lòng.'},
  {id:'completion',title:'Hoàn thành',description:'Xem lại phản hồi.'},
];
export function VotingSurvey({ profile, label = 'Bình chọn' }: { profile: Pick<VotingProfile,'name'|'slug'|'categoryId'>; label?: string }) {
  const {history,completed,completedProfiles,finish} = useVotingSession();
  const previous = completed[profile.categoryId];
  const [categoryId,setCategoryId]=useState(profile.categoryId);
  const drafts=useRef<Record<string,CategoryResponse>>({});
  const contextProfile=votingProfiles.find(item=>item.slug===profile.slug&&item.categoryId===categoryId)??votingProfiles.find(item=>item.categoryId===categoryId)!;
  const fullProfile=contextProfile;
  const profiles = votingProfiles.filter(item=>item.categoryId===categoryId).map(item=>({id:item.slug,name:item.name,location:item.organization,entrant:item.organization,image:item.image.src}));
  const screeningCopy=getScreeningCopy(categoryId);
  const dialog=useRef<HTMLDialogElement>(null);
  const heading=useRef<HTMLHeadingElement>(null);
  const [open,setOpen]=useState(false);
  const [step,setStep]=useState(1);
  const [response,setResponse]=useState<CategoryResponse>(emptyResponse);
  const uid=useId();
  useEffect(()=>{if(!open)return;const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=before;};},[open]);
  useEffect(()=>{
    if(!open||step!==0)return;
    const groups=dialog.current?.querySelector('.survey-category-groups');
    const pillar=groups?.firstElementChild;
    if(!groups||!pillar)return;
    const update=()=>{(groups as HTMLElement).style.setProperty('--pillar-panel-height',`${pillar.getBoundingClientRect().height}px`);};
    const observer=new ResizeObserver(update);observer.observe(pillar);update();
    return()=>observer.disconnect();
  },[open,step]);
  function navigate(next:number){setStep(next);requestAnimationFrame(()=>{heading.current?.focus();dialog.current?.querySelector('.survey-body')?.scrollTo({top:0});});}
  function complete(){if(!response.noneUsed && (response.selected.length===0||!response.selected.every(id=>profiles.some(item=>item.id===id)&&ratingLevels.some(level=>level.value===response.ratings[id]))))return;if(finish(categoryId,response.noneUsed?contextProfile.slug:response.selected,response)){setResponse({...response,completed:true});navigate(3);}}
  function updateResponse(next:CategoryResponse){drafts.current[categoryId]=next;setResponse(next);}
  function selectCategory(id:string){drafts.current[categoryId]=response;setCategoryId(id);setResponse(drafts.current[id]??emptyResponse());}
  const progressGroups=categoryGroups.map((group,index)=>({label:group.title,total:group.categories.length,ids:group.categories.map((_,categoryIndex)=>awardCategoryId(index,categoryIndex))}));
  const currentGroup=progressGroups.find(group=>group.ids.includes(categoryId))!;
  const currentIndex=currentGroup.ids.indexOf(categoryId);
  const nextCategory=[...currentGroup.ids.slice(currentIndex+1),...currentGroup.ids.slice(0,currentIndex),...progressGroups.filter(group=>group!==currentGroup).flatMap(group=>group.ids)].find(id=>!completed[id]);
  function continueCategory(){if(!nextCategory)return;selectCategory(nextCategory);navigate(0);}
  function close(){dialog.current?.close();}
  return <>
    <Button className="voting-survey-trigger" disabled={!!previous} title={previous ? completedProfiles[profile.categoryId]?.includes(profile.slug)?'Bạn đã bình chọn cho hồ sơ này':'Bạn đã bình chọn hồ sơ khác trong hạng mục này':undefined} onClick={()=>{setCategoryId(profile.categoryId);setStep(1);drafts.current={};setResponse({...emptyResponse(),selected:[profile.slug]});dialog.current?.showModal();setOpen(true);}}>{previous?'Đã bình chọn':label}</Button>
    <dialog ref={dialog} className="voting-survey-modal surface surface--primary" aria-labelledby={`${uid}-title`} onClose={()=>setOpen(false)} onClick={event=>{if(event.target===dialog.current){const r=dialog.current.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}}}>
      <header className="voting-questionnaire-header"><div><p className="eyebrow">Travel Awards 2026</p><h2 ref={heading} tabIndex={-1} id={`${uid}-title`}>Khảo sát trải nghiệm</h2></div><button type="button" className="voting-dialog-close" aria-label="Đóng khảo sát" onClick={close}><UiIcon name="cross" /></button></header>
      <div className="nomination-layout survey-workspace" data-step={step}>
        <div className="nomination-content survey-body">
          <header className="nomination-step-heading survey-body-heading"><div className="nomination-title-copy"><h3>{step===0?'Chọn hạng mục giải thưởng':step===1?screeningCopy.question:step===2?screeningCopy.ratingTitle:'Cảm ơn bạn đã chia sẻ'}</h3><p className="survey-body-lead"><strong>{fullProfile?.category}</strong></p></div><SurveyProgress steps={steps} currentStep={step} onBack={navigate} allowBack={false} variant="timeline" skippedSteps={step===3&&response.noneUsed?[2]:[]} /></header>
          {step===0?<form onSubmit={event=>{event.preventDefault();if(!completed[categoryId])navigate(1);}}>
            <div className="survey-category-groups">{categoryGroups.map((group,groupIndex)=><section className="survey-category-group" key={group.id} aria-label={group.title}>
              <header className="survey-group-heading"><h3>{group.title}</h3><span className="survey-group-count">{group.categories.length} hạng mục</span></header>
              <div className="survey-category-list" tabIndex={0} role="region" aria-label={`Danh sách ${group.title}`}>{group.categories.map((category,index)=>{const id=awardCategoryId(groupIndex,index);return <label className="nomination-category survey-category" data-selected={categoryId===id} data-completed={!!completed[id]} key={id}>
                <input type="radio" name="survey-category" value={id} checked={categoryId===id} disabled={!!completed[id]} onChange={()=>selectCategory(id)}/><span className="survey-category-icon"><SurveyIcon name={category.icon} size={22}/></span><span className="survey-category-copy"><span className="survey-category-title">{category.title}</span><span className="survey-category-description">{completed[id]?'Đã hoàn thành':category.summary??category.description}</span></span><span className="survey-category-arrow"><UiIcon name={categoryId===id?'check':'angle-right'} size={16}/></span>
              </label>;})}</div>
            </section>)}</div>
            <div className="nomination-actions"><Button variant="secondary" onClick={close}>Để sau</Button><Button type="submit" disabled={!!completed[categoryId]}>Tiếp tục</Button></div>
          </form>:step===1?<ProfileScreening currentProfileId={contextProfile.slug} categoryId={categoryId} profiles={profiles} response={response} onChange={updateResponse} onBack={()=>navigate(0)} onNext={()=>response.noneUsed?complete():navigate(2)}/>:step===2?<SatisfactionRating profiles={profiles} response={response} onChange={updateResponse} onBack={()=>navigate(1)} onComplete={complete}/>:<><SurveyCompletion profiles={profiles} response={response} completedCounts={progressGroups.map(group=>({label:group.label,total:group.total,completed:group.ids.filter(id=>!!completed[id]).length}))} onBack={close} onNext={nextCategory?continueCategory:undefined}/><SurveyHistory responses={history}/></>}
        </div>
      </div>
    </dialog>
  </>;
}
