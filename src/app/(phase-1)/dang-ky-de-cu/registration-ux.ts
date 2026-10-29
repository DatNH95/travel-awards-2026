import { contactError } from './contact-validation';
import { dossierError } from './dossier-validation';
import { complianceStatements, nominationFields, professionalFields, registrationFields, representativeFields, type RegistrationField } from './registration-data';
import type { RegistrationDraft } from './registration-fields';
import type { CountryCode } from 'libphonenumber-js';

export const registrationParts = ['Đơn vị & liên hệ', 'Giới thiệu đề cử', 'Số liệu hoạt động', 'Dấu ấn theo tiêu chí', 'Hồ sơ & minh chứng', 'Điều kiện tham gia'];
export const partDescriptions = [
  'Cho biết ai đứng tên hồ sơ và ai là người Ban tổ chức có thể liên hệ.',
  'Giới thiệu đề cử bằng câu chuyện, thành tích và điểm khác biệt của bạn.',
  'Kê khai số liệu theo hạng mục đã chọn. Có thể bổ sung giải thích ngay trong từng ô.',
  'Mỗi tiêu chí là một nội dung riêng, tối đa 300 từ. Mở từng tiêu chí để viết.',
  'Dùng một thư mục tài liệu để thao tác nhanh trên điện thoại, hoặc bổ sung từng tệp.',
  'Đọc và xác nhận các điều kiện trước khi kiểm tra lại toàn bộ hồ sơ.',
];
export function countWords(value: string): number { return value.trim().split(/\s+/u).filter(Boolean).length; }
export function normalizeCategorySearch(value: string): string { return value.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd'); }
export function sanitizePhone(value: string): string { return value.replace(/[^\d+()\s-]/g, '').replace(/(?!^)\+/g, ''); }
export function urlError(value: string, required = false): string {
  const raw = value.trim();
  const text = raw && !/^[a-z][a-z\d+.-]*:/i.test(raw) ? `https://${raw}` : raw;
  if (!text) return required ? 'Vui lòng dán đường link.' : '';
  if (!/^https?:\/\//i.test(text)) return 'Link chưa hợp lệ. Ví dụ: vnexpress.net';
  try { const url = new URL(text); if (!url.hostname.includes('.') || /\s/.test(text) || url.username || url.password) return 'Link chưa hợp lệ. Ví dụ: https://example.com'; }
  catch { return 'Link chưa hợp lệ. Ví dụ: https://example.com'; }
  return '';
}
export function normalizeWebsite(value: string): string {
  const text = value.trim();
  if (!text || /^[a-z][a-z\d+.-]*:/i.test(text)) return text;
  const fullUrl = `https://${text}`;
  return urlError(fullUrl) ? text : fullUrl;
}
export function wordError(value: string, field: RegistrationField): string {
  const count = countWords(value);
  if (!count && field.label.endsWith('*')) return 'Vui lòng điền thông tin này.';
  if (field.minWords && count < field.minWords) return `Cần ít nhất ${field.minWords} từ; hiện có ${count} từ.`;
  if (field.maxWords && count > field.maxWords) return `Tối đa ${field.maxWords} từ; vui lòng rút gọn ${count - field.maxWords} từ.`;
  return '';
}
export type RegistrationIssue = { key: string; message: string };
export function partIssues(part: number, selection: string, draft: RegistrationDraft): RegistrationIssue[] {
  const issues: RegistrationIssue[] = [];
  const professional = professionalFields[selection];
  function fields(items: RegistrationField[], prefix: string) {
    items.forEach((field, index) => {
      const key = `${prefix}-${index}`, value = draft.values[key] ?? '';
      let message = wordError(value, field);
      if (field.type === 'tel' || field.type === 'email') message = contactError(field.type, value, (draft.values['representative-country'] ?? 'VN') as CountryCode);
      if (field.type === 'url') message = urlError(field.label === 'Website' ? normalizeWebsite(value) : value, field.label.endsWith('*'));
      if (message) issues.push({ key, message: `${field.label.replace(/\*$/, '')}: ${message}` });
    });
  }
  if (part === 0) {
    fields(registrationFields, 'registration'); fields(representativeFields, 'representative');
    if (selection === 'Điểm đến du lịch của năm') fields([{ label: 'Cơ quan/đơn vị đại diện đề cử*' }], 'destination');
  }
  if (part === 1) fields(nominationFields, 'nominee');
  if (part === 2 && professional) {
    fields(professional.fields, `professional-${selection}`);
    professional.fields.forEach((field, index) => {
      if (field.label !== 'Kênh truyền thông chính thức') return;
      for (let channel = 0; channel < 6; channel++) {
        const key = `channel-professional-${selection}-${index}-${channel}`;
        if (!draft.checks[key]) continue;
        const value = draft.values[`${key}-url`] ?? '';
        const message = urlError(channel === 0 ? normalizeWebsite(value) : value, true);
        if (message) issues.push({ key: `${key}-url`, message });
        if (channel > 0 && !draft.values[`${key}-followers`]?.trim()) issues.push({ key: `${key}-followers`, message: 'Vui lòng điền số người theo dõi (có thể là 0).' });
      }
    });
  }
  if (part === 3 && professional) fields(professional.narratives, `narrative-${selection}`);
  if (part === 4) {
    if (draft.values['evidence-mode'] !== 'files') {
      const message = urlError(draft.values['full-dossier-link'] ?? '', true);
      if (message) issues.push({ key: 'full-dossier-link', message });
      for (const key of ['folder-introduction', 'folder-legal', 'folder-images', 'folder-evidence', 'folder-access', ...(professional?.menuRequired ? ['folder-menu'] : [])]) {
        if (!draft.checks[key]) { issues.push({ key, message: 'Vui lòng kiểm tra và xác nhận đủ thành phần hồ sơ, ảnh và quyền xem thư mục.' }); break; }
      }
    } else {
      for (const key of ['dossier-0', 'dossier-1', 'dossier-3', ...(professional?.menuRequired ? ['menu'] : [])]) {
        const message = dossierError(key, draft.files[key] ?? [], draft.values['legal-scan-link'] ?? '', professional?.images);
        if (message) issues.push({ key, message });
      }
      for (const key of ['legal-scan-link', 'activity-evidence-link', 'other-documents-link', 'video-0', ...(professional?.narratives.map((_, i) => `criterion-${selection}-${i}`) ?? [])]) {
        const message = urlError(draft.values[key] ?? ''); if (message) issues.push({ key, message });
      }
    }
  }
  if (part === 5) {
    const conditions = [...(professional?.conditions ?? []), ...complianceStatements];
    const index = conditions.findIndex((_, position) => !draft.checks[`compliance-${selection}-${position}`]);
    if (index >= 0) issues.push({ key: `compliance-${selection}-${index}`, message: 'Vui lòng đọc và xác nhận các điều kiện tham gia còn lại.' });
  }
  return issues;
}
