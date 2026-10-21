'use client';
import { UiIcon } from './ui-icon';

import { useEffect, useId, useRef, useState } from 'react';
import { Button } from './primitives';
import type { VotingProfile } from '@/data/voting';
import { useVotingSession } from './voting-session';

export function VotingSurvey({ profile, label = 'Bình chọn' }: { profile: Pick<VotingProfile,'name'|'slug'|'categoryId'>; label?: string }) {
  const {name,slug,categoryId} = profile;
  const {completed,finish} = useVotingSession();
  const previous = completed[categoryId];
  const dialog = useRef<HTMLDialogElement>(null);
  const uid = useId();
  const [experience, setExperience] = useState('');
  const [complete, setComplete] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function close() { dialog.current?.close(); }
  return <>
    <Button className="voting-survey-trigger" disabled={!!previous} title={previous ? previous === slug ? 'Bạn đã bình chọn cho hồ sơ này' : 'Bạn đã bình chọn hồ sơ khác trong hạng mục này' : undefined} onClick={() => { setComplete(false); setExperience(''); form.current?.reset(); dialog.current?.showModal(); setOpen(true); }}>{previous ? 'Đã bình chọn' : label}</Button>
    <dialog ref={dialog} className="voting-survey surface surface--primary" aria-labelledby={`${uid}-title`} onClose={() => setOpen(false)} onClick={event => { if (event.target === dialog.current) { const rect = dialog.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
      <button type="button" className="voting-dialog-close" aria-label="Đóng khảo sát" onClick={close}><UiIcon name="cross" /></button>
      {!complete && <p className="eyebrow">Góc nhìn từ hành trình của bạn</p>}
      <h2 className="type-heading-3" id={`${uid}-title`}>{complete ? 'Cảm ơn bạn đã chia sẻ' : `Bạn đã trải nghiệm ${name}?`}</h2>
      {complete ? <div className="voting-survey-success" role="status"><p>Bạn đã bình chọn cho hồ sơ này.</p><p className="type-body-small">Trạng thái được mô phỏng trong phiên trải nghiệm; chưa gửi dữ liệu thật.</p><Button onClick={close}>Đóng</Button></div> : <form ref={form} onSubmit={event => { event.preventDefault(); if (finish(categoryId,slug)) setComplete(true); else close(); }}>
        <p className="type-body-small">Khảo sát mẫu · Chọn một câu trả lời cho mỗi câu hỏi. Không thu thập thông tin cá nhân.</p>
        <fieldset><legend>01. Bạn đã đến hoặc sử dụng dịch vụ, trải nghiệm này chưa?</legend>{['Đã trải nghiệm', 'Chưa trải nghiệm'].map(value => <label className="voting-survey-option" key={value}><input type="radio" name="experience" value={value} required checked={experience === value} onChange={() => setExperience(value)} />{value}</label>)}</fieldset>
        {experience && <fieldset key={experience}><legend>{experience === 'Đã trải nghiệm' ? '02. Bạn đánh giá trải nghiệm của mình như thế nào?' : '02. Bạn có muốn trải nghiệm trong tương lai?'}</legend>{(experience === 'Đã trải nghiệm' ? ['Rất hài lòng', 'Hài lòng', 'Bình thường', 'Chưa hài lòng'] : ['Rất muốn', 'Có thể cân nhắc', 'Chưa có kế hoạch']).map(value => <label className="voting-survey-option" key={value}><input type="radio" name="impression" value={value} required />{value}</label>)}</fieldset>}
        <div className="voting-survey-actions"><Button variant="secondary" onClick={close}>Để sau</Button><Button type="submit" disabled={!experience}>Hoàn tất bình chọn mẫu</Button></div>
      </form>}
    </dialog>
  </>;
}
