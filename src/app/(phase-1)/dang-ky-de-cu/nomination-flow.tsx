'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ConfirmationStep } from './confirmation-step';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CTAArrow, Button } from '@/components/primitives';
import { awardGroups, awardCategoryFromId, isOrganizerNominated } from '@/data/awards';
import { UiIcon } from '@/components/ui-icon';
import { CategoryChooser } from './category-chooser';
import { partIssues, registrationParts, type RegistrationIssue } from './registration-ux';
import { RegistrationFields, type RegistrationDraft } from './registration-fields';

const steps = ['Chọn giải thưởng', 'Thông tin đăng ký', 'Xác nhận', 'Thành công'];

export function NominationFlow() {
  const params = useSearchParams();
  const categoryId = params.get('category') ?? '';
  const preview = params.get('preview');
  const previewStep = preview === 'confirmation' ? 2 : ['1', '2', '3', '4'].includes(preview ?? '') ? Number(preview) - 1 : null;
  const requestedStep = params.get('step');
  const requestedCategory = awardCategoryFromId(categoryId);
  const closed = isOrganizerNominated(requestedCategory);
  const initialStep = closed ? 0 : ['1', '2', '3', '4'].includes(requestedStep ?? '') ? Number(requestedStep) - 1 : previewStep ?? 0;
  return <><NominationForm key={`${categoryId}-${previewStep}`} initialSelection={closed ? '' : requestedCategory || (previewStep !== null || initialStep > 0 ? awardGroups[0].categories[0] : '')} previewStep={closed ? null : previewStep} initialStep={initialStep} initialGroup={closed ? 1 : undefined} /></>;
}

function NominationForm({ initialSelection, previewStep, initialStep, initialGroup }: { initialSelection: string; previewStep: number | null; initialStep: number; initialGroup?: number }) {
  const [step, setStep] = useState(initialStep);
  const [submitted, setSubmitted] = useState(initialStep === 3);
  const [updated, setUpdated] = useState(false);
  const [selection, setSelection] = useState(initialSelection);
  const [part, setPart] = useState(0);
  const [visitedParts, setVisitedParts] = useState<number[]>([0]);
  const [issues, setIssues] = useState<RegistrationIssue[]>([]);
  const [draft, setDraft] = useState<RegistrationDraft>({ values: {}, checks: {}, files: {} });
  const errorsByPart = registrationParts.map((_, index) => partIssues(index, selection, draft));
  const title = useRef<HTMLHeadingElement>(null);
  const saveDialog = useRef<HTMLDialogElement>(null);
  const emailDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!Object.values(draft.values).some(Boolean) && !Object.values(draft.files).some(files => files.length) && !Object.values(draft.checks).some(Boolean)) return;
    const protectDraft = (event: BeforeUnloadEvent) => { if (!submitted || step === 1) event.preventDefault(); };
    window.addEventListener('beforeunload', protectDraft);
    return () => window.removeEventListener('beforeunload', protectDraft);
  }, [draft, submitted, step]);
  function goPart(next: number) {
    setPart(next); setVisitedParts(previous => previous.includes(next) ? previous : [...previous, next]); setIssues([]);
    requestAnimationFrame(() => {
      const heading = document.getElementById('nomination-part-title');
      heading?.focus({ preventScroll: true }); heading?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  }
  function navigate(next: number) {
    if (next > 0 && (!selection || isOrganizerNominated(selection))) return;
    if (next === 2 && step === 1) {
      const missingPart = errorsByPart.findIndex(errors => errors.length);
      if (missingPart >= 0) { goPart(missingPart); setIssues(errorsByPart[missingPart]); focusIssues(); return; }
    }
    setStep(next); setIssues([]);
    const url = new URL(window.location.href);
    url.searchParams.set('step', String(next + 1));
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    requestAnimationFrame(() => {
      if (next === 0) {
        const finder = document.querySelector<HTMLElement>('.nomination-category-finder');
        const heading = finder?.querySelector('h3');
        heading?.setAttribute('tabindex', '-1');
        heading?.focus({ preventScroll: true });
        finder?.scrollIntoView({ block: 'start', behavior: 'instant' });
      } else {
        title.current?.focus({ preventScroll: true });
        title.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    });
  }
  function focusIssues() {
    requestAnimationFrame(() => {
      const summary = document.getElementById('nomination-error-summary');
      summary?.focus({ preventScroll: true }); summary?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  }
  function continuePart(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = partIssues(part, selection, draft);
    if (errors.length) { event.currentTarget.checkValidity(); setIssues(errors); focusIssues(); return; }
    if (part < registrationParts.length - 1) goPart(part + 1); else navigate(2);
  }
  function issueItem(issue: RegistrationIssue) {
    return <li key={issue.key}><button type="button" onClick={() => {
      const control = document.getElementsByName(issue.key)[0];
      control?.closest('details')?.setAttribute('open', '');
      control?.scrollIntoView({ block: 'center', behavior: 'instant' }); control?.focus({ preventScroll: true });
    }}>{issue.message}</button></li>;
  }
  return <div className="nomination-layout">
    <nav className="nomination-progress" aria-label="Tiến trình đề cử">
      <p className="type-label">Các bước tham gia</p>
      <ol>{steps.map((label, index) => <li key={label} data-state={index === step ? 'current' : index < step ? 'complete' : 'upcoming'}>
        <button type="button" aria-label={label} aria-current={index === step ? 'step' : undefined} disabled={previewStep === null && index > step} onClick={() => navigate(index)}>
          <span className="nomination-step-number" aria-hidden="true"><span className="nomination-step-desktop-number">{index < step ? '✓' : String(index + 1).padStart(2, '0')}</span><span className="nomination-step-mobile-number">{index < step ? '✓' : String(index + 1).padStart(2, '0')}</span></span>
          <span className="nomination-step-label">{label}</span>
          <span className="sr-only">{index === step ? ' — Bước hiện tại' : index < step ? ' — Đã hoàn tất' : ' — Chưa mở'}</span>
        </button>
      </li>)}</ol>
      {step === 1 && <div className="nomination-desktop-parts"><p className="nomination-kicker">Các phần trong hồ sơ</p>{registrationParts.map((label, index) => <button type="button" key={label} data-complete={visitedParts.includes(index) && !errorsByPart[index].length} aria-current={part === index ? 'step' : undefined} onClick={() => goPart(index)}><span>{visitedParts.includes(index) && !errorsByPart[index].length ? <UiIcon name="check" size={16} /> : index + 1}</span>{label}</button>)}</div>}
    </nav>
    <div className="nomination-content">
      <header className="nomination-step-heading">
        {step !== 3 && <h2 ref={title} tabIndex={-1} className="type-heading-2">{submitted && step === 1 ? 'Chỉnh sửa hồ sơ' : submitted && step === 2 ? 'Xác nhận cập nhật' : steps[step]}</h2>}
        <div className="nomination-step-timeline" role="progressbar" aria-label={`Tiến trình đề cử: ${steps[step]}`} aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1}>
          <div className="nomination-step-track" aria-hidden="true">
            <span className="nomination-step-fill" style={{ width: `${step / (steps.length - 1) * 100}%` }} />
            {steps.map((label, index) => <span key={label} className="nomination-step-stop" data-complete={index <= step} style={{ left: `${index / (steps.length - 1) * 100}%` }}><span>{String(index + 1).padStart(2, '0')}</span></span>)}
            <span className="nomination-step-anchor" style={{ left: `${step / (steps.length - 1) * 100}%` }} />
          </div>
        </div>

      </header>
      {step === 0 ? <form onSubmit={event => { event.preventDefault(); if (selection) navigate(1); }}>
        <CategoryChooser selection={selection} initialGroup={initialGroup} onSelect={category => { setSelection(category); setPart(0); setVisitedParts([0]); setIssues([]); }} />
        <div className="nomination-actions nomination-mobile-bar nomination-category-actions">
          <p className="nomination-category-action-status" role="status" aria-live="polite" aria-atomic="true">{selection ? <>Đã chọn: <strong>{selection}</strong></> : 'Chưa chọn hạng mục'}</p>
          <Link href="/" className="button button--secondary">Quay lại trang chủ</Link>
          <Button type="submit" disabled={!selection}>Tiếp tục <span className="nomination-arrow nomination-arrow--next"><CTAArrow /></span></Button>
        </div>
      </form> : step === 1 ? <form className="nomination-registration-form" noValidate onSubmit={continuePart}>
        <div className="nomination-inner-progress">
          <div><span className="nomination-kicker">Bước 2 / 4 · Phần {part + 1} / 6</span><button className="nomination-text-action" type="button" onClick={() => saveDialog.current?.showModal()}><UiIcon name="document" size={16} /> Lưu hồ sơ</button></div>
          <progress value={visitedParts.filter(index => !errorsByPart[index].length).length} max={6} aria-label="Số phần đáp ứng yêu cầu" />
          <label className="sr-only" htmlFor="nomination-jump-part">Chuyển phần trong hồ sơ</label><select id="nomination-jump-part" value={part} onChange={event => goPart(Number(event.target.value))}>{registrationParts.map((label, index) => <option value={index} key={label}>{index + 1}. {label}{visitedParts.includes(index) && !errorsByPart[index].length ? ' ✓' : ''}</option>)}</select>
        </div>
        <div className="nomination-selected-strip"><UiIcon name="trophy" size={18} /><span>{selection}</span><a href="?step=1" className="button button--secondary nomination-change-category" onClick={event => { event.preventDefault(); navigate(0); }}><UiIcon name="exchange" size={16} />Đổi hạng mục</a></div>
        {issues.length > 0 && <div className="nomination-error-summary" id="nomination-error-summary" tabIndex={-1} role="alert"><strong>{issues.length} thông tin cần bổ sung trước khi tiếp tục</strong><ul>{issues.slice(0, 1).map(issueItem)}</ul>{issues.length > 1 && <details><summary>Xem {issues.length - 1} mục còn lại</summary><ul>{issues.slice(1).map(issueItem)}</ul></details>}</div>}
        <RegistrationFields key={part} part={part} selection={selection} draft={draft} onChange={next => { setDraft(next); if (issues.length) setIssues(partIssues(part, selection, next)); }} />
        <p className="nomination-session-note"><UiIcon name="shield-check" size={16} /> Thông tin được giữ khi chuyển phần trong phiên này. Chưa gửi đến Ban tổ chức.</p>
        <div className="nomination-actions nomination-mobile-bar nomination-part-actions"><Button type="button" variant="secondary" onClick={() => part ? goPart(part - 1) : navigate(0)}><span className="nomination-arrow nomination-arrow--back"><CTAArrow /></span>{part ? 'Phần trước' : 'Hạng mục'}</Button><Button type="submit">{part === 5 ? 'Kiểm tra hồ sơ' : 'Tiếp tục'}<span className="nomination-arrow nomination-arrow--next"><CTAArrow /></span></Button></div>
      </form> : step === 2 ? <ConfirmationStep selection={selection} draft={draft} isEditing={submitted} onEdit={(nextPart = 0) => { setPart(nextPart); navigate(1); }} onSubmit={() => { setUpdated(submitted); setSubmitted(true); navigate(3); }} /> : <div className="nomination-success">
        <div className="nomination-success-heading"><Image src="/assets/key-visual/tick.svg" width={56} height={56} alt="" aria-hidden="true" />
        <h2 ref={title} tabIndex={-1} className="type-heading-2">{updated ? 'Cập nhật hồ sơ thành công' : 'Thành công'}</h2></div>
        <p className="type-body-large">Cảm ơn bạn đã tham gia đăng ký đề cử. Mọi thắc mắc, xin vui lòng liên hệ Ban tổ chức theo email <a href="mailto:sukien@vnexpress.net">sukien@vnexpress.net</a>.</p>
        <div className="nomination-success-actions">
          <Button type="button" onClick={() => emailDialog.current?.showModal()}>Kiểm tra email</Button>
        </div>
        <div className="nomination-actions nomination-mobile-bar"><Button type="button" variant="secondary" onClick={() => { setPart(0); navigate(1); }}><span className="nomination-arrow nomination-arrow--back"><CTAArrow /></span>Chỉnh sửa hồ sơ</Button><Link href="/" className="button button--secondary">Về trang chủ</Link></div>
      </div>}
    </div>
    <dialog ref={emailDialog} className="nomination-save-dialog" aria-labelledby="nomination-email-title">
      <h2 id="nomination-email-title" className="type-heading-3">Kiểm tra email</h2>
      <p>Mở hộp thư bạn dùng để đăng ký. Nếu dùng dịch vụ khác, vui lòng mở ứng dụng email của bạn.</p>
      <div className="nomination-success-actions"><a className="button button--secondary" href="https://mail.google.com/" target="_blank" rel="noopener noreferrer">Gmail <CTAArrow /></a><a className="button button--secondary" href="https://outlook.live.com/mail/" target="_blank" rel="noopener noreferrer">Outlook <CTAArrow /></a><Button type="button" onClick={() => emailDialog.current?.close()}>Đóng</Button></div>
    </dialog>
    <dialog ref={saveDialog} className="nomination-save-dialog" aria-labelledby="nomination-save-title">
      <h2 id="nomination-save-title" className="type-heading-3">Lưu hồ sơ</h2>
      <p>Thông tin và tệp đang được giữ trong phiên đăng ký này. Bạn có thể chuyển phần để tiếp tục chỉnh sửa. Vui lòng không đóng hoặc tải lại trang.</p>
      <Button type="button" onClick={() => saveDialog.current?.close()}>Đóng</Button>
    </dialog>
  </div>;
}



















