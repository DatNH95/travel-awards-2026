'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Button } from '@/components/primitives';
import { awardGroups } from '@/data/awards';
import { RegistrationFields, type RegistrationDraft } from './registration-fields';

const steps = ['Chọn giải thưởng', 'Thông tin đăng ký', 'Xác nhận', 'Thành công'];

export function NominationFlow() {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState('');
  const [draft, setDraft] = useState<RegistrationDraft>({ values: {}, checks: {}, files: {} });
  const title = useRef<HTMLHeadingElement>(null);
  const saveDialog = useRef<HTMLDialogElement>(null);
  function navigate(next: number) {
    setStep(next);
    requestAnimationFrame(() => title.current?.focus());
  }
  return <div className="nomination-layout">
    <nav className="nomination-progress" aria-label="Tiến trình đề cử">
      <p className="type-label">Các bước tham gia</p>
      <ol>{steps.map((label, index) => <li key={label} data-state={index === step ? 'current' : index < step ? 'complete' : 'upcoming'}>
        <button type="button" aria-current={index === step ? 'step' : undefined} disabled={index > step} onClick={() => navigate(index)}>
          <span className="nomination-step-number" aria-hidden="true">{index < step ? '✓' : String(index + 1).padStart(2, '0')}</span>
          <span>{label}</span>
          <span className="sr-only">{index === step ? ' — Bước hiện tại' : index < step ? ' — Đã hoàn tất' : ' — Chưa mở'}</span>
        </button>
      </li>)}</ol>
    </nav>
    <div className="nomination-content">
      <header className="nomination-step-heading">
        <p className="type-label">Bước {String(step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</p>
        <h2 ref={title} tabIndex={-1} className="type-heading-2">{steps[step]}</h2>
      </header>
      {step === 0 ? <form onSubmit={event => { event.preventDefault(); if (selection) navigate(1); }}>
        <fieldset className="nomination-choices" aria-describedby="nomination-choice-help">
          <legend className="type-body-large">Chọn một hạng mục bạn muốn đề cử.</legend>
          <p id="nomination-choice-help" className="nomination-muted type-body-small">Lưu ý: Mỗi hồ sơ chỉ đăng ký cho một hạng mục. Trường hợp muốn tham gia nhiều hạng mục, vui lòng thực hiện hồ sơ riêng cho từng hạng mục.</p>
          <div className="nomination-groups">{awardGroups.map((group, groupIndex) => <section key={group.name} aria-labelledby={`nomination-group-${groupIndex}`}>
            <h3 id={`nomination-group-${groupIndex}`} className="type-heading-3">{group.name} <span className="type-body-small">{group.categories.length} hạng mục</span></h3>
            <div className="nomination-category-list">{group.categories.map((category, index) => <label key={category} className="nomination-category" data-selected={selection === category}>
              <input type="radio" name="award-category" value={category} checked={selection === category} onChange={() => setSelection(category)} />
              <span className="nomination-category-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span>{category}</span>
            </label>)}</div>
          </section>)}</div>
        </fieldset>
        <div className="nomination-selection type-body-small" role="status">{selection ? <>Đã chọn: <strong>{selection}</strong></> : 'Chưa chọn hạng mục.'}</div>
        <div className="nomination-actions">
          <Link href="/" className="button button--secondary">Quay lại trang chủ</Link>
          <Button type="submit" disabled={!selection}>Tiếp tục <span aria-hidden="true">→</span></Button>
        </div>
      </form> : step === 1 ? <form onSubmit={event => { event.preventDefault(); navigate(2); }}>
        <RegistrationFields selection={selection} draft={draft} onChange={setDraft} />
        <div className="nomination-actions">
          <Button variant="secondary" onClick={() => navigate(0)}>← Quay lại</Button>
          <div className="nomination-action-next">
          <Button type="button" variant="secondary" onClick={() => saveDialog.current?.showModal()}>Lưu lại hồ sơ</Button>
          <Button type="submit">Tiếp tục <span aria-hidden="true">→</span></Button>
          </div>
        </div>
      </form> : <>
        <div className="nomination-pending surface surface--brand-soft">
          <p className="type-body-large">Bước xác nhận và gửi hồ sơ sẽ được cập nhật tiếp theo.</p>
          <p>Hạng mục đã chọn: <strong>{selection}</strong></p>
          <p className="type-body-small">Hồ sơ chưa được gửi. Bạn có thể quay lại để chỉnh sửa thông tin đăng ký.</p>
        </div>
        <div className="nomination-actions">
          <Button variant="secondary" onClick={() => navigate(1)}>← Quay lại</Button>
          <Button disabled>Tiếp tục</Button>
        </div>
      </>}
    </div>
    <dialog ref={saveDialog} className="nomination-save-dialog" aria-labelledby="nomination-save-title">
      <h2 id="nomination-save-title" className="type-heading-3">Lưu hồ sơ</h2>
      <p>Hồ sơ của bạn đã được lưu lại trên hệ thống.</p>
      <Button type="button" onClick={() => saveDialog.current?.close()}>Đóng</Button>
    </dialog>
  </div>;
}
