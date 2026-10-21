export const megabyte = 1_000_000;
export const introductionLimit = 50 * megabyte;
export const evidenceLimit = 20 * megabyte;
export const legalLimit = 10 * megabyte;
const imageExtensions = /\.(png|jpe?g)$/i;

export function dossierError(key: string, files: File[], legalLink = '', imagePolicy = { min: 3, max: 10 as number | null }): string {
  if (key === 'menu') {
    if (files.some(file => file.size > evidenceLimit)) return 'Mỗi tệp thực đơn không được vượt quá 20 MB.';
    if (!files.length) return 'Vui lòng chọn thực đơn hiện hành.';
    if (files.some(file => !/\.pdf$/i.test(file.name))) return 'Thực đơn chỉ chấp nhận tệp PDF.';
  }
  if (key === 'dossier-0') {
    if (!files.length) return 'Vui lòng chọn hồ sơ giới thiệu đề cử.';
    if (files.some(file => !/\.(pdf|ppt|pptx)$/i.test(file.name))) return 'Hồ sơ giới thiệu chỉ chấp nhận PDF, PPT hoặc PPTX.';
    if (files.some(file => file.size > introductionLimit)) return 'Mỗi tệp hồ sơ giới thiệu không được vượt quá 50 MB.';
  }
  if (key === 'dossier-1') {
    if (!files.length && !legalLink.trim()) return 'Vui lòng chọn tài liệu pháp lý/minh chứng hoặc dán link Google Docs bản scan.';
    if (files.some(file => !/\.(pdf|doc|docx)$/i.test(file.name))) return 'Tài liệu pháp lý/minh chứng chấp nhận PDF, DOC hoặc DOCX.';
    if (files.some(file => file.size > legalLimit)) return 'Mỗi tệp tài liệu pháp lý/minh chứng không được vượt quá 10 MB.';
  }
  if (key === 'dossier-3') {
    if (files.length < imagePolicy.min) return `Vui lòng chọn tối thiểu ${imagePolicy.min} ảnh.`;
    if (imagePolicy.max !== null && files.length > imagePolicy.max) return `Chỉ được chọn tối đa ${imagePolicy.max} ảnh.`;
    if (files.some(file => !imageExtensions.test(file.name))) return 'Chỉ chấp nhận ảnh JPG, JPEG hoặc PNG.';
    if (files.some(file => file.size < megabyte || file.size > 10 * megabyte)) return 'Mỗi ảnh cần có dung lượng từ 1 MB đến 10 MB.';
  }
  return '';
}
export function mergeDossierFiles(previous: File[], incoming: File[]): File[] {
  return [...previous, ...incoming].filter((file, index, list) => list.findIndex(item => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified) === index);
}

