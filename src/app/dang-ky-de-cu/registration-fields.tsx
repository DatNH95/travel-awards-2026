'use client';

import { useId } from 'react';
import type { CountryCode } from 'libphonenumber-js';
import { ContactInput } from './contact-input';
import { DossierFileField, RequiredLabel, UrlControl } from './dossier-controls';
import { assessmentPeriodLabel, complianceStatements, nominationFields, professionalFields, registrationFields, representativeFields, type RegistrationField } from './registration-data';

export type RegistrationDraft = { values: Record<string, string>; checks: Record<string, boolean>; files: Record<string, File[]> };

function FieldLabel({ label }: { label: string }) {
  return <>{label.replace(/\*$/, '')}{label.endsWith('*') && <><span className="nomination-required" aria-hidden="true"> *</span><span className="sr-only"> (bắt buộc)</span></>}</>;
}

export function RegistrationFields({ selection, draft, onChange }: { selection: string; draft: RegistrationDraft; onChange: (draft: RegistrationDraft) => void }) {
  const id = useId();
  const professional = professionalFields[selection];
  const conditions = professional ? [...professional.conditions, ...complianceStatements] : complianceStatements;
  const imagePolicy = professional?.images ?? { min: 3, max: 10 };
  function renderFields(items: RegistrationField[], prefix: string) {
    return <div className="nomination-field-grid">{items.map((field, index) => {
      const key = `${prefix}-${index}`;
      const inputId = `${id}-${key}`;
      const multiline = field.type === 'textarea' || /^(Các |Hoạt động |Mô tả |Đặc trưng |Quy mô và)/.test(field.label);
      const wordCount = (draft.values[key] ?? '').trim().split(/\s+/u).filter(Boolean).length;
      const props = { id: inputId, name: key, required: field.label.endsWith('*'), value: draft.values[key] ?? '', 'aria-describedby': field.help ? `${inputId}-help` : undefined, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = event.target.value;
        if (field.maxWords) {
          const words = Array.from(value.matchAll(/\S+/gu));
          if (words.length > field.maxWords) value = value.slice(0, words[field.maxWords].index).trimEnd();
        }
        onChange({ ...draft, values: { ...draft.values, [key]: value } });
      } };
      return <div className={`nomination-field${multiline || key === 'nominee-0' ? ' nomination-field--wide' : ''}`} key={key}>
        <label htmlFor={inputId}><FieldLabel label={field.label} /></label>
        {field.help && <p id={`${inputId}-help`} className="type-body-small nomination-muted">{field.help}</p>}
        {field.type === 'tel' || field.type === 'email' ? <ContactInput id={inputId} name={key} type={field.type} value={props.value} country={(draft.values['representative-country'] ?? 'VN') as CountryCode} onChange={value => onChange({ ...draft, values: { ...draft.values, [key]: value } })} onCountryChange={country => onChange({ ...draft, values: { ...draft.values, 'representative-country': country } })} /> : multiline ? field.maxWords ? <div className="nomination-counted-field"><textarea {...props} rows={5} aria-describedby={`${inputId}-count`} /><span id={`${inputId}-count`} className="nomination-word-count">{wordCount}/{field.maxWords}</span></div> : <textarea {...props} rows={5} /> : <input {...props} type={field.type ?? 'text'} />}
        {field.maxWords && wordCount > field.maxWords && <p className="nomination-field-error type-body-small" role="alert">Nội dung vượt quá {field.maxWords} từ. Vui lòng rút gọn.</p>}
      </div>;
    })}</div>;
  }
  return <div className="nomination-registration">
    <p className="nomination-selection">Hạng mục đã chọn: <strong>{selection}</strong></p>
    <p className="type-body-large nomination-muted">Các trường có dấu <span className="nomination-required">*</span> là thông tin bắt buộc theo hồ sơ đăng ký. Bấm lưu hồ sơ để chỉnh sửa lại thông tin nếu cần thay đổi.</p>
    <fieldset className="nomination-form-section"><legend className="type-heading-3">I. Thông tin</legend>
      {renderFields(registrationFields, 'registration')}
      <h3 className="type-body-large">Người đại diện hồ sơ</h3>
      {renderFields(representativeFields, 'representative')}
      {selection === 'Điểm đến du lịch của năm' && <div className="nomination-conditional">
        <p className="type-body-large">Đối với Điểm đến du lịch của năm (Cấp tỉnh/thành)</p>
        {renderFields([{ label: 'Cơ quan/đơn vị đại diện đề cử*' }], 'destination')}
      </div>}
    </fieldset>
    <fieldset className="nomination-form-section"><legend className="type-heading-3">II. Thông tin đề cử</legend>{renderFields(nominationFields, 'nominee')}</fieldset>
    <fieldset className="nomination-form-section"><legend className="type-heading-3">III. Số liệu hoạt động & thông tin minh chứng</legend>
      {professional && <><p className="nomination-muted">{assessmentPeriodLabel} Đối tượng: {professional.audience}</p></>}
      {professional ? renderFields(professional.fields, `professional-${selection}`) : <p className="nomination-muted">Các trường số liệu chuyên môn và minh chứng riêng cho hạng mục Tiên phong sẽ được bổ sung khi có hướng dẫn. Bạn có thể điền thông tin chung và chuẩn bị hồ sơ bên dưới.</p>}
      {professional && <><h3 className="type-body-large">Thuyết minh theo tiêu chí chấm giải</h3>{renderFields(professional.narratives, `narrative-${selection}`)}</>}
    </fieldset>
    <fieldset className="nomination-form-section"><legend className="type-heading-3">IV. Điều kiện tuân thủ</legend><p>Tôi xác nhận rằng:</p>

      <div className="nomination-checks">{conditions.map((statement, index) => <label key={statement}><input type="checkbox" checked={draft.checks[`compliance-${selection}-${index}`] ?? false} onChange={event => onChange({ ...draft, checks: { ...draft.checks, [`compliance-${selection}-${index}`]: event.target.checked } })} /><span>{statement}</span></label>)}</div>
      <div className="nomination-checks"><label><input type="checkbox" checked={conditions.every((_, index) => draft.checks[`compliance-${selection}-${index}`])} onChange={event => {
        const checks = { ...draft.checks };
        conditions.forEach((_, index) => { checks[`compliance-${selection}-${index}`] = event.target.checked; });
        onChange({ ...draft, checks });
      }} /><span>Xác nhận tất cả</span></label></div>
    </fieldset>
    <fieldset className="nomination-form-section"><legend className="type-heading-3">V. Hồ sơ & minh chứng</legend>
      {professional && <div className="nomination-evidence"><p className="type-body-large">Minh chứng cần chuẩn bị:</p><ul>{professional.evidence.map(item => <li key={item}>{item}</li>)}</ul></div>}
      <div className="nomination-field-grid">
        <DossierFileField id={`${id}-dossier-0`} fieldKey="dossier-0" label="Hồ sơ giới thiệu đề cử*" help="Chấp nhận PDF, PPT, PPTX. Tối đa 50 MB/tệp." accept=".pdf,.ppt,.pptx" files={draft.files['dossier-0'] ?? []} onChange={files => onChange({ ...draft, files: { ...draft.files, 'dossier-0': files } })} />
        <fieldset className="nomination-legal-fields nomination-field--wide">
          <legend><RequiredLabel>Tài liệu pháp lý/chứng nhận</RequiredLabel></legend>
          <p className="type-body-small nomination-muted">Chọn tệp tài liệu hoặc dán link Google Docs bản scan. Đảm bảo đường dẫn cho phép Ban tổ chức xem tài liệu.</p>
          <DossierFileField id={`${id}-dossier-1`} fieldKey="dossier-1" label="Chọn tệp tài liệu" help="Chấp nhận PDF, DOC, DOCX. Tối đa 20 MB/tệp." accept=".pdf,.doc,.docx" files={draft.files['dossier-1'] ?? []} legalLink={draft.values['legal-scan-link'] ?? ''} onChange={files => onChange({ ...draft, files: { ...draft.files, 'dossier-1': files } })} />
          <div className="nomination-field nomination-field--wide"><label htmlFor={`${id}-legal-link`}>Link Google Docs bản scan</label><UrlControl id={`${id}-legal-link`} name="legal-scan-link" value={draft.values['legal-scan-link'] ?? ''} placeholder="https://docs.google.com/..." onChange={value => onChange({ ...draft, values: { ...draft.values, 'legal-scan-link': value } })} /></div>
        </fieldset>
        <DossierFileField id={`${id}-dossier-2`} fieldKey="dossier-2" label="Tài liệu chứng minh số liệu hoạt động" help="Tối đa 20 MB/tệp." files={draft.files['dossier-2'] ?? []} onChange={files => onChange({ ...draft, files: { ...draft.files, 'dossier-2': files } })} />
        <DossierFileField id={`${id}-dossier-3`} fieldKey="dossier-3" label={imagePolicy.min ? 'Hình ảnh*' : 'Hình ảnh'} help={`Lưu ý: ${imagePolicy.min ? `tối thiểu ${imagePolicy.min} ảnh. ` : 'Không bắt buộc. '}${imagePolicy.max !== null ? `Tối đa ${imagePolicy.max} ảnh. ` : ''}Chấp nhận JPG, JPEG, PNG; mỗi ảnh từ 1 MB đến 10 MB. Xem yêu cầu nội dung ảnh của hạng mục ở trên.`} imagePolicy={imagePolicy} accept=".jpg,.jpeg,.png" files={draft.files['dossier-3'] ?? []} onChange={files => onChange({ ...draft, files: { ...draft.files, 'dossier-3': files } })} />
        {professional?.menuRequired && <DossierFileField id={`${id}-menu`} fieldKey="menu" label="Thực đơn hiện hành*" help="Tệp PDF có giá, tối đa 20 MB/tệp. Ghi rõ nếu có thực đơn tiếng Anh." accept=".pdf" files={draft.files.menu ?? []} onChange={files => onChange({ ...draft, files: { ...draft.files, menu: files } })} />}
        {professional?.narratives.map((criterion, index) => {
          const key = `criterion-${selection}-${index}`;
          return <DossierFileField key={key} id={`${id}-criterion-${index}`} fieldKey={key} label={`Minh chứng tiêu chí ${index + 1}: ${criterion.label}`} help="Tối đa 20 MB/tệp." files={draft.files[key] ?? []} onChange={files => onChange({ ...draft, files: { ...draft.files, [key]: files } })} />;
        })}
        <div className="nomination-field nomination-field--wide"><label htmlFor={`${id}-video-link`}>Video giới thiệu</label><p className="type-body-small nomination-muted">Dán link YouTube, Drive hoặc nền tảng tương ứng.</p><UrlControl id={`${id}-video-link`} name="video-0" value={draft.values['video-0'] ?? ''} onChange={value => onChange({ ...draft, values: { ...draft.values, 'video-0': value } })} /></div>
        <DossierFileField id={`${id}-dossier-4`} fieldKey="dossier-4" label="Các tài liệu khác" help="Tối đa 20 MB/tệp." files={draft.files['dossier-4'] ?? []} onChange={files => onChange({ ...draft, files: { ...draft.files, 'dossier-4': files } })} />
      </div>
    </fieldset>
  </div>;
}


