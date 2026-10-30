'use client';

import { useEffect, useId } from 'react';
import { UiIcon } from '@/components/ui-icon';
import { DossierFileField, RequiredLabel, UrlControl } from './dossier-controls';
import { RegistrationInput, CommunicationChannels } from './registration-inputs';
import { assessmentPeriodLabel, complianceStatements, nominationFields, professionalFields, registrationFields, representativeFields, type RegistrationField } from './registration-data';
import { countWords, partDescriptions, registrationParts } from './registration-ux';

export type RegistrationDraft = { values: Record<string, string>; checks: Record<string, boolean>; files: Record<string, File[]> };
const mobileDescriptions = [
  'Điền đơn vị đứng tên và người liên hệ.',
  'Giới thiệu đề cử, thành tích và điểm khác biệt.',
  'Điền số liệu theo hạng mục. Ghi rõ đơn vị tính.',
  'Mỗi tiêu chí tối đa 300 từ.',
  'Dán link thư mục hoặc tải từng tệp.',
  'Xác nhận điều kiện rồi kiểm tra hồ sơ.',
];
function ResponsiveCopy({ desktop, mobile }: { desktop: string; mobile: string }) {
  return <><span className="nomination-copy-desktop">{desktop}</span><span className="nomination-copy-mobile">{mobile}</span></>;
}

export function RegistrationFields({ selection, draft, onChange, part = 0 }: { selection: string; draft: RegistrationDraft; onChange: (draft: RegistrationDraft) => void; part?: number }) {
  const id = useId();
  const professional = professionalFields[selection];
  const folderKeys = ['folder-introduction', 'folder-legal', 'folder-images', ...(professional?.menuRequired ? ['folder-menu'] : []), 'folder-evidence', 'folder-access'];
  const conditions = [...(professional?.conditions ?? []), ...complianceStatements];
  const personal = draft.values['registration-1'] === 'Cá nhân';
  const selfContact = personal && !draft.checks['contact-is-other'];
  useEffect(() => {
    if (selfContact && draft.values['representative-0'] !== (draft.values['registration-0'] ?? '')) {
      onChange({ ...draft, values: { ...draft.values, 'representative-0': draft.values['registration-0'] ?? '' } });
    }
  }, [selfContact, draft, onChange]);
  const setValue = (key: string, value: string) => onChange({ ...draft, values: { ...draft.values, [key]: value } });
  const setCheck = (key: string, checked: boolean) => onChange({ ...draft, checks: { ...draft.checks, [key]: checked } });
  function renderFields(items: RegistrationField[], prefix: string, startIndex = 0) {
    return <div className="nomination-field-grid">{items.map((field, offset) => {
      const index = startIndex + offset;
      const key = `${prefix}-${index}`;
      return field.label === 'Kênh truyền thông chính thức' ? <CommunicationChannels key={key} fieldKey={key} id={`${id}-${index}`} draft={draft} onChange={onChange} /> : <RegistrationInput key={key} field={field} fieldKey={key} id={`${id}-${key}`} draft={draft} onChange={onChange} />;
    })}</div>;
  }
  function link(key: string, label: string, help?: string, required = false) {
    return <div className="nomination-field nomination-field--wide" key={key}><label htmlFor={`${id}-${key}`}>{required ? <RequiredLabel>{label}</RequiredLabel> : label}</label>{help && <p className="type-body-small nomination-muted">{help}</p>}<UrlControl placeholder={key === 'full-dossier-link' ? 'Link tài liệu' : undefined} id={`${id}-${key}`} name={key} value={draft.values[key] ?? ''} required={required} onChange={value => setValue(key, value)} /></div>;
  }
  function file(key: string, label: string, help: string, accept?: string) {
    return <DossierFileField key={key} id={`${id}-${key}`} fieldKey={key} label={label} help={help} accept={accept} files={draft.files[key] ?? []} legalLink={draft.values['legal-scan-link'] ?? ''} imagePolicy={professional?.images} onChange={files => onChange({ ...draft, files: { ...draft.files, [key]: files } })} />;
  }
  return <div className="nomination-registration">
    <header className="nomination-part-heading"><span className="nomination-kicker">Phần {part + 1} / {registrationParts.length}</span><h3 tabIndex={-1} className="type-heading-3" id="nomination-part-title">{registrationParts[part]}</h3><p className="nomination-muted"><ResponsiveCopy desktop={partDescriptions[part]} mobile={mobileDescriptions[part]} /></p><p className="nomination-required-note"><span className="nomination-required">*</span> Thông tin bắt buộc</p></header>
    {part === 0 && <section className="nomination-part-body">
      <p className="nomination-explainer">{personal ? 'Bạn đứng tên hồ sơ và trực tiếp liên hệ với Ban tổ chức, trừ khi chọn người liên hệ khác.' : 'Đơn vị đứng tên nộp hồ sơ. Người liên hệ là người phụ trách trao đổi với Ban tổ chức.'}</p>
      {renderFields(registrationFields.slice(1, 2), 'registration', 1)}
      {renderFields([{ ...registrationFields[0], label: personal ? 'Họ và tên của bạn*' : 'Tên đơn vị đứng tên*', help: personal ? 'Dùng tên này cho hồ sơ và thông tin liên hệ.' : 'Ghi tên pháp lý của đơn vị nộp hồ sơ.' }], 'registration')}
      {renderFields(registrationFields.slice(2, 3), 'registration', 2)}
      <h4 className="nomination-subtitle">{selfContact ? 'Thông tin liên hệ của bạn' : 'Người liên hệ hồ sơ'}</h4>
      {personal && <div className="nomination-checks"><label><input type="checkbox" name="contact-is-other" checked={!!draft.checks['contact-is-other']} onChange={event => {
        const other = event.target.checked;
        onChange({ ...draft, checks: { ...draft.checks, 'contact-is-other': other }, values: { ...draft.values, ...(!other ? { 'other-contact-name': draft.values['representative-0'] ?? '' } : {}), 'representative-0': other ? draft.values['other-contact-name'] ?? '' : draft.values['registration-0'] ?? '' } });
      }} /><span>Người khác liên hệ thay tôi</span></label></div>}
      {!selfContact && renderFields(representativeFields.slice(0, 1), 'representative')}
      {renderFields(representativeFields.slice(2), 'representative', 2)}
      <details className="nomination-help-details"><summary>{selfContact ? 'Liên kết (tùy chọn)' : 'Liên kết & chức vụ (tùy chọn)'}</summary><div className="nomination-optional-fields">{renderFields(registrationFields.slice(3), 'registration', 3)}{!selfContact && renderFields(representativeFields.slice(1, 2), 'representative', 1)}</div></details>
      {selection === 'Điểm đến du lịch của năm' && <div className="nomination-conditional"><h4 className="nomination-subtitle">Cơ quan đại diện điểm đến</h4>{renderFields([{ label: 'Cơ quan/đơn vị đại diện đề cử*', help: 'Sở Du lịch, Sở VHTTDL hoặc UBND tỉnh, thành phố chính thức nộp hồ sơ.' }], 'destination')}</div>}
    </section>}
    {part === 1 && <section className="nomination-part-body"><p className="nomination-explainer"><ResponsiveCopy desktop="Tên đề cử có thể là điểm đến, khách sạn, thương hiệu hoặc trải nghiệm; có thể khác tên pháp lý của đơn vị nộp hồ sơ." mobile="Điền tên điểm đến, thương hiệu hoặc trải nghiệm được đề cử; có thể khác tên đơn vị nộp hồ sơ." /></p>{!draft.values['nominee-0'] && !!draft.values['registration-0'] && <button className="nomination-text-action" type="button" onClick={() => setValue('nominee-0', draft.values['registration-0'])}>Dùng tên đơn vị đứng tên</button>}{renderFields(nominationFields, 'nominee')}</section>}
    {part === 2 && <section className="nomination-part-body"><p className="nomination-explainer"><UiIcon name="calendar" />{assessmentPeriodLabel}</p><details className="nomination-help-details"><summary>Cách kê khai số liệu và thuật ngữ</summary><p><ResponsiveCopy desktop="Ghi rõ đơn vị tính và kỳ số liệu. Nếu chưa có số liệu, ghi “Chưa có số liệu” cùng lý do thay vì nhập 0." mobile="Ghi đơn vị tính và kỳ số liệu. Nếu chưa có, ghi lý do thay vì nhập 0." /></p><p>ADR: giá phòng bình quân. OTA: nền tảng đặt dịch vụ trực tuyến như Booking, Agoda. OTP: tỷ lệ chuyến bay đúng giờ. KPI: chỉ tiêu mục tiêu và kết quả đạt được.</p></details>{professional && renderFields(professional.fields, `professional-${selection}`)}</section>}
    {part === 3 && <section className="nomination-part-body">{professional?.narratives.map((criterion, index) => { const key = `narrative-${selection}-${index}`, count = countWords(draft.values[key] ?? ''); return <details className="nomination-criterion" key={key} open={index === 0 || undefined}><summary><span className="nomination-criterion-index">{index + 1}</span><span>{criterion.label}<small>{count}/300 từ</small></span><UiIcon name="angle-small-down" /></summary><div><RegistrationInput field={criterion} fieldKey={key} id={`${id}-${key}`} draft={draft} onChange={onChange} /></div></details>; })}</section>}
    {part === 4 && <section className="nomination-part-body">
      <fieldset className="nomination-evidence-modes"><legend className="sr-only">Cách cung cấp hồ sơ</legend>{[{ value: 'folder', icon: 'link' as const, title: 'Một link cho toàn bộ hồ sơ' }, { value: 'files', icon: 'document' as const, title: 'Tải tệp & bổ sung từng link' }].map(mode => <label className="nomination-mode-card" key={mode.value} data-selected={(draft.values['evidence-mode'] ?? 'folder') === mode.value}><input type="radio" name="evidence-mode" value={mode.value} checked={(draft.values['evidence-mode'] ?? 'folder') === mode.value} onChange={() => setValue('evidence-mode', mode.value)} /><UiIcon name={mode.icon} /><span><strong>{mode.title}</strong></span></label>)}</fieldset>
      <details className="nomination-help-details" open><summary><UiIcon name="document" /> Cần chuẩn bị những gì?</summary><ul>{professional?.evidence.map(item => <li key={item}>{item}</li>)}</ul></details>
      {draft.values['evidence-mode'] !== 'files' ? <>{link('full-dossier-link', 'Link thư mục hồ sơ đầy đủ', 'Dán link Drive, OneDrive hoặc nền tảng khác và cấp quyền xem cho Ban tổ chức.', true)}<fieldset className="nomination-folder-checklist"><legend>Thư mục của bạn đã có:</legend><div className="nomination-checks">{[['folder-introduction', 'Hồ sơ giới thiệu đề cử (PDF/PPT/PPTX, tối đa 50 MB/tệp)'], ['folder-legal', 'Tài liệu pháp lý/minh chứng (PDF/DOC/DOCX, tối đa 10 MB/tệp hoặc bản scan)'], ['folder-images', 'Từ 3 đến 10 ảnh JPG/JPEG/PNG, tối đa 10 MB/ảnh'], ...(professional?.menuRequired ? [['folder-menu', 'Thực đơn hiện hành có giá (PDF, tối đa 20 MB/tệp)']] : []), ['folder-evidence', 'Số liệu hoạt động và minh chứng tiêu chí'], ['folder-access', 'Đã cấp quyền xem thư mục và tài liệu cho Ban tổ chức']].map(([key, label]) => <label key={key}><input type="checkbox" name={key} checked={draft.checks[key] ?? false} onChange={event => setCheck(key, event.target.checked)} /><span>{label}</span></label>)}<label className="nomination-folder-select-all"><input type="checkbox" name="folder-all" checked={folderKeys.every(key => !!draft.checks[key])} ref={node => { if (node) node.indeterminate = folderKeys.some(key => !!draft.checks[key]) && !folderKeys.every(key => !!draft.checks[key]); }} onChange={event => onChange({ ...draft, checks: { ...draft.checks, ...Object.fromEntries(folderKeys.map(key => [key, event.target.checked])) } })} /><span>Tất cả</span></label></div></fieldset><p className="nomination-muted type-body-small"><ResponsiveCopy desktop="Các xác nhận trên là do bạn cung cấp. Hệ thống chưa tự kiểm tra nội dung hoặc quyền truy cập thư mục." mobile="Bạn tự xác nhận nội dung và quyền xem thư mục. Hệ thống chưa kiểm tra tự động." /></p></> : <>
        <div className="nomination-explainer"><UiIcon name="document" /><div><strong>Định dạng tài liệu</strong><p>PDF/PowerPoint giữ bố cục hồ sơ; JPG/JPEG/PNG dùng cho ảnh. Có thể dán link bản scan pháp lý. Các link tài liệu cần cấp quyền xem cho Ban tổ chức.</p></div></div>
        <div className="nomination-field-grid">{file('dossier-0', 'Hồ sơ giới thiệu đề cử*', 'PDF, PPT hoặc PPTX · tối đa 50 MB/tệp.', '.pdf,.ppt,.pptx')}<fieldset className="nomination-legal-fields nomination-field--wide"><legend><RequiredLabel>Tài liệu pháp lý/minh chứng</RequiredLabel></legend><p className="nomination-muted">Tải tệp hoặc dán link bản scan; chỉ cần một cách.</p>{file('dossier-1', 'Chọn tệp pháp lý', 'PDF, DOC hoặc DOCX · tối đa 10 MB/tệp.', '.pdf,.doc,.docx')}{link('legal-scan-link', 'Link bản scan pháp lý')}</fieldset>{file('dossier-3', 'Hình ảnh*', '3–10 ảnh JPG/JPEG/PNG · tối đa 10 MB/ảnh. Có thể chọn nhiều lần.', '.jpg,.jpeg,.png')}{professional?.menuRequired && file('menu', 'Thực đơn hiện hành*', 'PDF có giá · tối đa 20 MB/tệp. Ghi rõ nếu có thực đơn tiếng Anh.', '.pdf')}{link('activity-evidence-link', 'Minh chứng số liệu hoạt động')}{professional?.narratives.map((criterion, index) => link(`criterion-${selection}-${index}`, `Minh chứng tiêu chí ${index + 1}: ${criterion.label}`))}{link('video-0', 'Video giới thiệu', 'Link YouTube, Drive hoặc nền tảng tương ứng.')}{link('other-documents-link', 'Các tài liệu khác')}</div>
      </>}
    </section>}
    {part === 5 && <section className="nomination-part-body"><p className="nomination-explainer"><UiIcon name="shield-check" /><span>Điều kiện tham gia: <strong>{selection}</strong>. Chỉ xác nhận khi đã đọc và đáp ứng các điều kiện.</span></p><div className="nomination-checks">{conditions.map((statement, index) => { const key = `compliance-${selection}-${index}`; return <label key={key}><input type="checkbox" name={key} checked={draft.checks[key] ?? false} onChange={event => setCheck(key, event.target.checked)} /><span>{statement}</span></label>; })}<label className="nomination-select-all"><input type="checkbox" name="confirm-all" checked={conditions.every((_, index) => draft.checks[`compliance-${selection}-${index}`])} onChange={event => { const checks = { ...draft.checks }; conditions.forEach((_, index) => { checks[`compliance-${selection}-${index}`] = event.target.checked; }); onChange({ ...draft, checks }); }} /><span>Tôi đã đọc và xác nhận tất cả điều kiện</span></label></div></section>}
  </div>;
}
