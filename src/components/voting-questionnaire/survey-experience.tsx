import Image from 'next/image';
import { Button } from '@/components/primitives';
import { UiIcon } from './ui-icon';
import { ProfileScrollList } from './profile-scroll-list';
import { getScreeningCopy } from './survey-copy';
import { ratingLevels, type CategoryResponse, type SurveyProfile } from './survey-data';

function ratingTone(value: number | undefined) {
  return value !== undefined && value <= 2 ? 'negative' : value !== undefined && value >= 4 ? 'positive' : 'neutral';
}

export function ProfileScreening({ categoryId, profiles, currentProfileId, response, onChange, onBack, onNext }: {
  categoryId: string;
  currentProfileId: string;
  profiles: readonly SurveyProfile[];
  response: CategoryResponse;
  onChange: (response: CategoryResponse) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const copy = getScreeningCopy(categoryId);

  function toggleProfile(id: string, checked: boolean) {
    onChange({ selected: checked ? [...response.selected,id] : response.selected.filter(value=>value!==id), noneUsed: false, ratings: Object.fromEntries(Object.entries(response.ratings).filter(([key])=>checked||key!==id)), completed: false });
  }
  return <form onSubmit={event => { event.preventDefault(); if (response.noneUsed || response.selected.length) onNext(); }}>
    <fieldset className="nomination-form-section stack">
      <legend className="sr-only">{copy.question}</legend>
      <p className="type-body-small">Có thể tick nhiều hồ sơ bạn đã trải nghiệm để khảo sát.</p>
      {[{title:'Hồ sơ đang chọn hiện tại',items:profiles.filter(item=>item.id===currentProfileId),current:true},{title:'Hồ sơ khác cùng hạng mục',items:profiles.filter(item=>item.id!==currentProfileId),current:false}].map(group=>group.items.length>0&&<section className="survey-profile-group" data-current={group.current} key={group.title} aria-label={group.title}>
        <header className="survey-profile-group-heading"><h4>{group.title}</h4><span>{group.items.length} hồ sơ</span></header>
        <ProfileScrollList count={group.items.length}>{group.items.map(item=><label className="survey-profile-card" data-selected={response.selected.includes(item.id)} key={item.id}>
          <input type="checkbox" name="experienced-profile" value={item.id} checked={response.selected.includes(item.id)} onChange={event=>toggleProfile(item.id,event.target.checked)} />
          {item.image?<Image unoptimized className="survey-profile-image" src={item.image} width={96} height={72} alt=""/>:<span className="survey-profile-image survey-profile-placeholder" aria-hidden="true"><UiIcon name="document" size={28}/></span>}
          <span className="survey-profile-copy"><strong>{item.name}</strong><span>{item.location}</span></span>
          <span className="survey-profile-state" aria-hidden="true">{response.selected.includes(item.id)?'Đã chọn khảo sát':'Chưa chọn'}</span>
        </label>)}</ProfileScrollList>
      </section>)}
      <p className="survey-choice-divider">{copy.divider}</p>
      <label className="survey-profile-card survey-none-used" data-selected={response.noneUsed}>
        <input type="checkbox" checked={response.noneUsed} onChange={event => onChange({ selected: [], noneUsed: event.target.checked, ratings: {}, completed: false })} />
        <span className="survey-profile-copy"><strong>{copy.noneLabel}</strong><span>Bỏ qua chấm điểm và hoàn tất khảo sát.</span></span>
      </label>
      <p className="type-body-small survey-screening-hint">Vui lòng chọn ít nhất 1 hồ sơ hoặc chọn &quot;{copy.noneLabel}&quot;</p>
    </fieldset>
    <div className="nomination-actions"><Button variant="secondary" onClick={onBack}><UiIcon name="angle-left" size={16} />Chọn lại giải thưởng</Button><div className="survey-action-group"><Button className="survey-continue" type="submit" disabled={!response.noneUsed && response.selected.length === 0}>Tiếp tục<UiIcon name="arrow-right" size={18} /></Button></div></div>
  </form>;
}

export function SatisfactionRating({ profiles, response, onChange, onBack, onComplete }: {
  profiles: readonly SurveyProfile[];
  response: CategoryResponse;
  onChange: (response: CategoryResponse) => void;
  onBack: () => void;
  onComplete: () => void;
}) {
  const selected = profiles.filter(profile => response.selected.includes(profile.id));
  const rated = selected.filter(profile => ratingLevels.some(level => level.value === response.ratings[profile.id])).length;
  return <form onSubmit={event => { event.preventDefault(); if (selected.length > 0 && rated === selected.length) onComplete(); }}>
    <div className="survey-rating-table-wrap"><table className="survey-rating-table">
      <caption>Mức độ hài lòng (Thang điểm 5 mức)</caption>
      <thead><tr><th scope="col">Hồ sơ đã chọn</th>{ratingLevels.map(level => <th key={level.value} scope="col" data-rating-tone={ratingTone(level.value)}><span>{level.label}</span><span className="survey-rating-number" aria-label={`${level.value} điểm`}><UiIcon name="star" size={20} /></span></th>)}</tr></thead>
      <tbody>{selected.map(profile => <tr key={profile.id}><th scope="row"><div className="survey-rating-profile">{profile.image && <Image unoptimized src={profile.image} alt="" width={44} height={32} />}<span><strong>{profile.name}</strong><small>{profile.location}</small></span></div></th>{ratingLevels.map(level => <td key={level.value} data-label={level.label} data-rating-tone={ratingTone(level.value)}><label className="survey-rating-control"><input type="radio" required name={`rating-${profile.id}`} value={level.value} checked={response.ratings[profile.id] === level.value} onChange={() => onChange({ ...response, ratings: { ...response.ratings, [profile.id]: level.value }, completed: false })} /><span className="sr-only">{level.label} cho {profile.name}</span><span className="survey-rating-mobile-label" aria-hidden="true">{level.label}</span></label></td>)}</tr>)}</tbody>
    </table></div>
    <div className="nomination-actions"><Button variant="secondary" onClick={onBack}><UiIcon name="angle-left" size={16} />Chọn lại giải thưởng</Button><div className="survey-action-group"><p className="type-body-small">{rated === selected.length ? 'Đã đánh giá đủ' : 'Vui lòng đánh giá tất cả hồ sơ'}</p><Button type="submit" disabled={selected.length === 0 || rated !== selected.length}>Hoàn tất<UiIcon name="arrow-right" size={18} /></Button></div></div>
  </form>;
}

export function SurveyCompletion({ profiles, response, completedCounts, onBack, onNext }: {
  profiles: readonly SurveyProfile[];
  response: CategoryResponse;
  completedCounts: readonly { label: string; completed: number; total: number }[];
  onBack: () => void;
  onNext?: () => void;
}) {
  return <div className="survey-completion stack">
    <span className="survey-completion-icon"><UiIcon name="check" size={44} /></span>
    <h3 className="type-heading-3">Hoàn thành</h3>
    <p>Cảm ơn bạn đã tham gia khảo sát.</p>
    <div className="survey-completion-summary stack"><h4>Phản hồi của bạn</h4>{response.noneUsed ? <p>Chưa trải nghiệm · Không chấm điểm.</p> : <dl>{profiles.filter(profile => response.selected.includes(profile.id)).map(profile => <div key={profile.id}><dt>{profile.name}</dt><dd data-rating-tone={ratingTone(response.ratings[profile.id])}><strong>{response.ratings[profile.id]}/5</strong> · {ratingLevels.find(level => level.value === response.ratings[profile.id])?.label}</dd></div>)}</dl>}
      <div className="survey-completion-progress">{completedCounts.map(group => <div key={group.label}><p>{group.label}<strong>{group.completed}/{group.total}</strong></p><progress value={group.completed} max={group.total} aria-label={`Tiến trình mẫu ${group.label}`} /></div>)}</div>
    </div>
    <div className="survey-completion-actions"><Button variant="secondary" onClick={onBack}>Về danh sách</Button>{onNext && <Button onClick={onNext}>Hạng mục tiếp theo<UiIcon name="arrow-right" size={18} /></Button>}</div>
  </div>;
}
