'use client';
import { useState, type ReactNode } from 'react';
import { Button, CTAArrow } from '@/components/primitives';
import { UiIcon } from '@/components/ui-icon';
import { assessmentPeriodLabel, complianceStatements, nominationFields, professionalFields, registrationFields, representativeFields, type RegistrationField } from './registration-data';
import type { RegistrationDraft } from './registration-fields';
import { phoneCountries } from './contact-validation';
import { countWords, urlError } from './registration-ux';

export function ConfirmationStep({ selection, draft, isEditing = false, onEdit, onSubmit }: { selection: string; draft: RegistrationDraft; isEditing?: boolean; onEdit: (part?: number) => void; onSubmit: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const professional = professionalFields[selection];
  const conditions = [...(professional?.conditions ?? []), ...complianceStatements];
  const folderMode = draft.values['evidence-mode'] !== 'files';
  function review(items: RegistrationField[], prefix: string) {
    return <dl className="nomination-review">{items.map((field, index) => {
      const value = draft.values[`${prefix}-${index}`];
      const country = phoneCountries.find(item => item.code === (draft.values['representative-country'] ?? 'VN'));
      return <div key={field.label}><dt>{field.label.replace(/\*$/, '')}{field.maxWords && <small className="nomination-muted"> {countWords(value ?? '')} từ</small>}</dt><dd>{value ? <>{field.type === 'tel' && country && !value.startsWith('+') ? `+${country.callingCode} · ` : ''}{value}</> : 'Chưa cung cấp'}</dd></div>;
    })}</dl>;
  }
  function link(key: string, label: string) {
    const value = draft.values[key];
    return <div key={key}><dt>{label}</dt><dd>{value && !urlError(value) ? <a href={value.trim()} target="_blank" rel="noopener noreferrer">{value}<UiIcon name="arrow-up-right" size={14} /></a> : value || 'Chưa cung cấp'}</dd></div>;
  }
  function section(title: string, part: number, children: ReactNode) {
    return <section className="nomination-review-section" key={part}><div className="nomination-review-section-heading"><h3>{title}</h3><button type="button" className="nomination-text-action" onClick={() => onEdit(part)} aria-label={`Chỉnh sửa ${title}`}>Chỉnh sửa</button></div><details open={part === 0 || undefined}><summary>Xem thông tin <UiIcon name="angle-small-down" size={18} /></summary><div>{children}</div></details></section>;
  }
  return <form className="nomination-confirmation-form" onSubmit={event => { event.preventDefault(); if (agreed) onSubmit(); }}>
    <div className="nomination-choice-summary"><UiIcon name="trophy" /><span>Hạng mục đã đăng ký<strong>{selection}</strong></span></div>
    <p className="nomination-muted">Mở từng phần để kiểm tra. Chọn “Chỉnh sửa” để quay lại đúng phần đó; các thông tin còn lại vẫn được giữ.</p>
    {section('Đơn vị & liên hệ', 0, <>{review(registrationFields, 'registration')}<h4 className="nomination-subtitle">Người liên hệ hồ sơ</h4>{review(representativeFields, 'representative')}{selection === 'Điểm đến du lịch của năm' && review([{ label: 'Cơ quan/đơn vị đại diện đề cử' }], 'destination')}</>)}
    {section('Giới thiệu đề cử', 1, review(nominationFields, 'nominee'))}
    {section('Số liệu hoạt động', 2, <><p className="nomination-muted">{assessmentPeriodLabel}</p>{professional && review(professional.fields, `professional-${selection}`)}</>)}
    {section('Dấu ấn theo tiêu chí', 3, professional && review(professional.narratives, `narrative-${selection}`))}
    {section('Hồ sơ & minh chứng', 4, folderMode ? <><dl className="nomination-review">{link('full-dossier-link', 'Thư mục hồ sơ đầy đủ')}</dl><p className="nomination-muted">Bạn cung cấp hồ sơ, tài liệu pháp lý, ảnh và minh chứng trong cùng thư mục. Quyền xem và nội dung do bạn xác nhận.</p></> : <dl className="nomination-review">{[{ key: 'dossier-0', label: 'Hồ sơ giới thiệu đề cử' }, { key: 'dossier-1', label: 'Tài liệu pháp lý/minh chứng' }, { key: 'dossier-3', label: 'Hình ảnh' }, ...(professional?.menuRequired ? [{ key: 'menu', label: 'Thực đơn hiện hành' }] : [])].map(({ key, label }) => <div key={key}><dt>{label}</dt><dd>{draft.files[key]?.length ? <ul>{draft.files[key].map(file => <li key={`${file.name}-${file.size}-${file.lastModified}`}>{file.name}</li>)}</ul> : key === 'dossier-1' && draft.values['legal-scan-link'] ? 'Đã cung cấp qua link bản scan' : 'Chưa cung cấp'}</dd></div>)}{link('legal-scan-link', 'Link bản scan pháp lý')}{link('activity-evidence-link', 'Minh chứng số liệu hoạt động')}{professional?.narratives.map((criterion, index) => link(`criterion-${selection}-${index}`, `Minh chứng ${index + 1}: ${criterion.label}`))}{link('other-documents-link', 'Các tài liệu khác')}{link('video-0', 'Video giới thiệu')}</dl>)}
    {section('Điều kiện tham gia', 5, <ul className="nomination-review-checks">{conditions.map((statement, index) => <li key={statement}><strong>{draft.checks[`compliance-${selection}-${index}`] ? 'Đã xác nhận' : 'Chưa xác nhận'}:</strong> {statement}</li>)}</ul>)}
    <section className="nomination-final-consent"><h3>{isEditing ? 'Xác nhận cập nhật hồ sơ' : 'Sẵn sàng gửi hồ sơ?'}</h3><div className="nomination-checks"><label><input type="checkbox" required checked={agreed} onChange={event => setAgreed(event.target.checked)} /><span>Tôi cam kết thông tin trong hồ sơ là chính xác, đầy đủ và chịu trách nhiệm về nội dung đã cung cấp.<span className="nomination-required"> *</span></span></label></div></section>
    <div className="nomination-actions nomination-mobile-bar"><Button type="button" variant="secondary" onClick={() => onEdit(0)}><span className="nomination-arrow nomination-arrow--back"><CTAArrow /></span>Chỉnh sửa</Button><div className="nomination-confirm-submit"><p id="nomination-consent-hint" className="type-body-small nomination-muted">{agreed ? 'Bạn có thể gửi hồ sơ.' : 'Bạn cần cam kết thông tin trước khi gửi hồ sơ.'}</p><Button type="submit" disabled={!agreed} aria-describedby="nomination-consent-hint">{isEditing ? 'Lưu thay đổi' : 'Gửi hồ sơ'}<span className="nomination-arrow nomination-arrow--next"><CTAArrow /></span></Button></div></div>
  </form>;
}
