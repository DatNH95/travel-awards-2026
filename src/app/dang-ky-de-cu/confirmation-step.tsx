'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives';
import { assessmentPeriodLabel, complianceStatements, nominationFields, professionalFields, registrationFields, representativeFields, type RegistrationField } from './registration-data';
import type { RegistrationDraft } from './registration-fields';
import { phoneCountries } from './contact-validation';

export function ConfirmationStep({ selection, draft, isEditing = false, onEdit, onSubmit }: { selection: string; draft: RegistrationDraft; isEditing?: boolean; onEdit: () => void; onSubmit: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const professional = professionalFields[selection];
  const conditions = professional ? [...professional.conditions, ...complianceStatements] : complianceStatements;
  function review(items: RegistrationField[], prefix: string) {
    return <dl className="nomination-review">{items.map((field, index) => {
      const value = draft.values[`${prefix}-${index}`];
      const country = phoneCountries.find(item => item.code === (draft.values['representative-country'] ?? 'VN'));
      return <div key={field.label}><dt>{field.label.replace(/\*$/, '')}</dt><dd>{value ? <>{field.type === 'tel' && country ? `+${country.callingCode} · ` : ''}{value}</> : 'Chưa cung cấp'}</dd></div>;
    })}</dl>;
  }
  return <form className="nomination-confirmation-form" onSubmit={event => { event.preventDefault(); if (agreed) onSubmit(); }}>
    <p className="nomination-selection">Hạng mục đã đăng ký: <strong>{selection}</strong></p>
    <section className="nomination-form-section"><h3 className="type-heading-3">I. Thông tin</h3>{review(registrationFields, 'registration')}<h4 className="type-body-large">Người đại diện hồ sơ</h4>{review(representativeFields, 'representative')}{selection === 'Điểm đến du lịch của năm' && review([{ label: 'Cơ quan/đơn vị đại diện đề cử' }], 'destination')}</section>
    <section className="nomination-form-section"><h3 className="type-heading-3">II. Thông tin đề cử</h3>{review(nominationFields, 'nominee')}</section>
    <section className="nomination-form-section"><h3 className="type-heading-3">III. Số liệu hoạt động & thông tin minh chứng</h3>{professional ? <><p className="nomination-muted">{assessmentPeriodLabel} Đối tượng: {professional.audience}</p>{review(professional.fields, `professional-${selection}`)}<h4 className="type-body-large">Thuyết minh theo tiêu chí chấm giải</h4>{review(professional.narratives, `narrative-${selection}`)}</> : <p className="nomination-muted">Chưa có trường chuyên môn riêng cho hạng mục này.</p>}</section>
    <section className="nomination-form-section"><h3 className="type-heading-3">IV. Điều kiện tuân thủ</h3><ul className="nomination-review-checks">{conditions.map((statement, index) => <li key={statement}><strong>{draft.checks[`compliance-${selection}-${index}`] ? 'Đã xác nhận' : 'Chưa xác nhận'}:</strong> {statement}</li>)}</ul></section>
    <section className="nomination-form-section"><h3 className="type-heading-3">V. Hồ sơ & minh chứng</h3>{professional && <div className="nomination-evidence"><p className="type-body-large">Minh chứng cần chuẩn bị:</p><ul>{professional.evidence.map(item => <li key={item}>{item}</li>)}</ul></div>}<dl className="nomination-review">{['Hồ sơ giới thiệu đề cử', 'Tài liệu pháp lý/chứng nhận', 'Tài liệu chứng minh số liệu hoạt động', 'Hình ảnh', 'Các tài liệu khác'].map((label, index) => <div key={label}><dt>{label}</dt><dd>{draft.files[`dossier-${index}`]?.length ? <ul>{draft.files[`dossier-${index}`].map(file => <li key={`${file.name}-${file.size}-${file.lastModified}`}>{file.name}</li>)}</ul> : 'Chưa cung cấp'}</dd></div>)}<div><dt>Link Google Docs bản scan</dt><dd>{draft.values['legal-scan-link'] || 'Chưa cung cấp'}</dd></div><div><dt>Video giới thiệu</dt><dd>{draft.values['video-0'] || 'Chưa cung cấp'}</dd></div>{professional?.menuRequired && <div><dt>Thực đơn hiện hành</dt><dd>{draft.files.menu?.map(file => file.name).join(', ') || 'Chưa cung cấp'}</dd></div>}{professional?.narratives.map((criterion, index) => <div key={criterion.label}><dt>Minh chứng tiêu chí {index + 1}: {criterion.label}</dt><dd>{draft.files[`criterion-${selection}-${index}`]?.map(file => file.name).join(', ') || 'Chưa cung cấp'}</dd></div>)}</dl></section>
    <section className="nomination-form-section"><h3 className="type-heading-3">{isEditing ? 'Xác nhận cập nhật hồ sơ' : 'Xác nhận và gửi hồ sơ'}</h3><p>Người nộp hồ sơ xác nhận các thông tin trên là chính xác và đầy đủ, đồng thời đồng ý với quy định tham gia Travel Awards.</p><div className="nomination-checks"><label><input type="checkbox" required checked={agreed} onChange={event => setAgreed(event.target.checked)} /><span>Tôi cam kết bản kê khai trên là sự thật và chịu mọi trách nhiệm nếu thông tin không đúng sự thật.<span className="nomination-required"> *</span></span></label></div></section>
    <div className="nomination-actions nomination-mobile-bar"><Button type="button" variant="secondary" onClick={onEdit}><span aria-hidden="true">←</span><span className="nomination-button-desktop-label">Quay lại chỉnh sửa</span><span className="nomination-button-mobile-label">Chỉnh sửa hồ sơ</span></Button><div className="nomination-confirm-submit"><p id="nomination-consent-hint" className="type-body-small nomination-muted">{isEditing ? 'Bạn cần cam kết thông tin trước khi lưu thay đổi' : 'Bạn cần cam kết thông tin trước khi gửi hồ sơ'}</p><Button type="submit" disabled={!agreed} aria-describedby="nomination-consent-hint">{isEditing ? 'Lưu thay đổi' : 'Gửi hồ sơ'} <span aria-hidden="true">→</span></Button></div></div>
  </form>;
}




