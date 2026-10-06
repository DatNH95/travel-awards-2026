'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ConfirmationStep } from './confirmation-step';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { CTAArrow, Button } from '@/components/primitives';
import { awardGroups, awardCategoryFromId } from '@/data/awards';
import { RegistrationFields, type RegistrationDraft } from './registration-fields';

const steps = ['Chọn giải thưởng', 'Thông tin đăng ký', 'Xác nhận', 'Thành công'];

export function NominationFlow() {
  const params = useSearchParams();
  const categoryId = params.get('category') ?? '';
  const preview = params.get('preview');
  const previewStep = preview === 'confirmation' ? 2 : ['1', '2', '3', '4'].includes(preview ?? '') ? Number(preview) - 1 : null;
  const requestedStep = params.get('step');
  const initialStep = ['1', '2', '3', '4'].includes(requestedStep ?? '') ? Number(requestedStep) - 1 : previewStep ?? 0;
  return <NominationForm key={`${categoryId}-${previewStep}-${initialStep}`} initialSelection={awardCategoryFromId(categoryId) || (previewStep !== null || initialStep > 0 ? awardGroups[0].categories[0] : '')} previewStep={previewStep} initialStep={initialStep} />;
}

function NominationForm({ initialSelection, previewStep, initialStep }: { initialSelection: string; previewStep: number | null; initialStep: number }) {
  const [step, setStep] = useState(initialStep);
  const [submitted, setSubmitted] = useState(initialStep === 3);
  const [updated, setUpdated] = useState(false);
  const [selection, setSelection] = useState(initialSelection);
  const [activeGroup, setActiveGroup] = useState(Math.max(0, awardGroups.findIndex(group => group.categories.includes(initialSelection))));
  const groupTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [draft, setDraft] = useState<RegistrationDraft>({ values: {}, checks: {}, files: {} });
  const title = useRef<HTMLHeadingElement>(null);
  const saveDialog = useRef<HTMLDialogElement>(null);
  const submitDialog = useRef<HTMLDialogElement>(null);
  const emailDialog = useRef<HTMLDialogElement>(null);
  function navigate(next: number) {
    setStep(next);
    requestAnimationFrame(() => title.current?.focus());
  }
  return <div className="nomination-layout">
    <nav className="nomination-progress" aria-label="Tiến trình đề cử">
      <p className="type-label">Các bước tham gia</p>
      <ol>{steps.map((label, index) => <li key={label} data-state={index === step ? 'current' : index < step ? 'complete' : 'upcoming'}>
        <button type="button" aria-label={label} aria-current={index === step ? 'step' : undefined} disabled={previewStep === null && index > step} onClick={() => navigate(index)}>
          <span className="nomination-step-number" aria-hidden="true"><span className="nomination-step-desktop-number">{index < step ? '✓' : String(index + 1).padStart(2, '0')}</span><span className="nomination-step-mobile-number">{String(index + 1).padStart(2, '0')}</span></span>
          <span className="nomination-step-label">{label}</span>
          <span className="sr-only">{index === step ? ' — Bước hiện tại' : index < step ? ' — Đã hoàn tất' : ' — Chưa mở'}</span>
        </button>
      </li>)}</ol>
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
        <fieldset className="nomination-choices" aria-describedby="nomination-choice-help">
          <legend className="type-body-large">Chọn một hạng mục bạn muốn đề cử.</legend>
          <p id="nomination-choice-help" className="nomination-muted type-body-small">Lưu ý: Mỗi hồ sơ chỉ đăng ký cho một hạng mục. Trường hợp muốn tham gia nhiều hạng mục, vui lòng thực hiện hồ sơ riêng cho từng hạng mục.</p>
          <div className="nomination-group-tabs" role="tablist" aria-label="Nhóm giải thưởng">{awardGroups.map((group, index) => <button type="button" role="tab" key={group.name} id={`nomination-group-tab-${index}`} aria-controls={`nomination-group-panel-${index}`} aria-selected={activeGroup === index} tabIndex={activeGroup === index ? 0 : -1} ref={node => { groupTabs.current[index] = node; }} onClick={() => setActiveGroup(index)} onKeyDown={event => { let next: number; if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') next = 1 - activeGroup; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = 1; else return; event.preventDefault(); setActiveGroup(next); groupTabs.current[next]?.focus(); }}>{group.name} <span className="type-body-small">({group.categories.length})</span></button>)}</div>
          <div className="nomination-groups">{awardGroups.map((group, groupIndex) => <section key={group.name} hidden={activeGroup !== groupIndex} role="tabpanel" id={`nomination-group-panel-${groupIndex}`} aria-labelledby={`nomination-group-tab-${groupIndex}`}>
            <div className="nomination-category-list">{group.categories.map((category, index) => <label key={category} className="nomination-category" data-selected={selection === category}>
              <input type="radio" name="award-category" value={category} checked={selection === category} onChange={() => setSelection(category)} />
              <span className="nomination-category-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span>{category}</span>
            </label>)}</div>
          </section>)}</div>
        </fieldset>
        <div className="nomination-selection type-body-small" role="status">{selection ? <>Đã chọn: <strong>{selection}</strong></> : 'Chưa chọn hạng mục.'}</div>
        <div className="nomination-actions nomination-mobile-bar">
          <Link href="/" className="button button--secondary">Quay lại trang chủ</Link>
          <Button type="submit" disabled={!selection}>Tiếp tục <span aria-hidden="true">→</span></Button>
        </div>
      </form> : step === 1 ? <form className="nomination-registration-form" noValidate onSubmit={event => { event.preventDefault(); navigate(2); }}>
        {submitted && <p className="type-body-large">Bạn có thể chỉnh sửa nội dung, thêm hoặc thay thế tệp trong hồ sơ đã gửi. Tiếp tục để kiểm tra và lưu thay đổi.</p>}
        <RegistrationFields selection={selection} draft={draft} onChange={setDraft} />
        <Button className="nomination-mobile-save" type="button" variant="secondary" onClick={() => saveDialog.current?.showModal()}>Lưu lại hồ sơ</Button>
        <div className="nomination-actions nomination-mobile-bar">
          <Button variant="secondary" onClick={() => navigate(0)}>← Quay lại</Button>
          <div className="nomination-action-next">
          <Button className="nomination-save-action" type="button" variant="secondary" onClick={() => saveDialog.current?.showModal()}>Lưu lại hồ sơ</Button>
          <Button type="submit">Tiếp tục <span aria-hidden="true">→</span></Button>
          </div>
        </div>
      </form> : step === 2 ? <ConfirmationStep selection={selection} draft={draft} isEditing={submitted} onEdit={() => navigate(1)} onSubmit={() => { setUpdated(submitted); setSubmitted(true); navigate(3); }} /> : <div className="nomination-success">
        <div className="nomination-success-heading"><Image src="/assets/key-visual/tick.svg" width={56} height={56} alt="" aria-hidden="true" />
        <h2 ref={title} tabIndex={-1} className="type-heading-2">{updated ? 'Cập nhật hồ sơ thành công' : 'Thành công'}</h2></div>
        <p className="type-body-large">Cảm ơn bạn đã tham gia đăng ký đề cử, mọi thắc mắc xin liên hệ ban tổ chức theo hotline.</p>
        <div className="nomination-success-actions">
          <div className="nomination-hotline-contact"><p>Hotline Ban tổ chức:</p><a href="tel:0838880123" className="button button--primary nomination-hotline"><span className="nomination-hotline-icon" aria-hidden="true" />083 888 0123</a></div>
          <Button type="button" onClick={() => emailDialog.current?.showModal()}>Kiểm tra email</Button>
        </div>
        <p className="type-body-small nomination-muted">Giao diện xem trước: hồ sơ chưa được gửi và chưa có email xác nhận.</p>
        <div className="nomination-actions nomination-mobile-bar"><Button variant="secondary" onClick={() => navigate(1)}>← Chỉnh sửa hồ sơ</Button><Link href="/" className="button button--secondary">Về trang chủ</Link></div>
      </div>}
    </div>
    <dialog ref={emailDialog} className="nomination-save-dialog" aria-labelledby="nomination-email-title">
      <h2 id="nomination-email-title" className="type-heading-3">Kiểm tra email</h2>
      <p>Mở hộp thư bạn dùng để đăng ký. Nếu dùng dịch vụ khác, vui lòng mở ứng dụng email của bạn.</p>
      <div className="nomination-success-actions"><a className="button button--secondary" href="https://mail.google.com/" target="_blank" rel="noopener noreferrer">Gmail <CTAArrow /></a><a className="button button--secondary" href="https://outlook.live.com/mail/" target="_blank" rel="noopener noreferrer">Outlook <CTAArrow /></a><Button type="button" onClick={() => emailDialog.current?.close()}>Đóng</Button></div>
    </dialog>
    <dialog ref={submitDialog} className="nomination-save-dialog" aria-labelledby="nomination-submit-title">
      <h2 id="nomination-submit-title" className="type-heading-3">Xác nhận hồ sơ</h2><p>Bạn đã hoàn tất bước xác nhận trong bản xem trước. Hồ sơ chưa được gửi đến Ban tổ chức.</p><Button type="button" onClick={() => submitDialog.current?.close()}>Đóng</Button>
    </dialog>
    <dialog ref={saveDialog} className="nomination-save-dialog" aria-labelledby="nomination-save-title">
      <h2 id="nomination-save-title" className="type-heading-3">Lưu hồ sơ</h2>
      <p>Hồ sơ của bạn đã được lưu lại trên hệ thống.</p>
      <Button type="button" onClick={() => saveDialog.current?.close()}>Đóng</Button>
    </dialog>
  </div>;
}



















