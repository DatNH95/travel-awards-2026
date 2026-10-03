export const megabyte = 1_000_000;
export const introductionLimit = 20 * megabyte;
const imageExtensions = /\.(png|jpe?g|webp|gif|avif|heic|heif)$/i;

export function dossierError(key: string, files: File[], legalLink = ''): string {
  if (key === 'dossier-0') {
    if (!files.length) return 'Vui lòng chọn hồ sơ giới thiệu đề cử.';
    if (files.some(file => !/\.(pdf|ppt|pptx)$/i.test(file.name))) return 'Hồ sơ giới thiệu chỉ chấp nhận PDF, PPT hoặc PPTX.';
    if (files.some(file => file.size > introductionLimit)) return 'Mỗi tệp hồ sơ giới thiệu không được vượt quá 20 MB.';
  }
  if (key === 'dossier-1') {
    if (!files.length && !legalLink.trim()) return 'Vui lòng chọn tài liệu pháp lý/chứng nhận hoặc dán link Google Docs bản scan.';
    if (files.some(file => !/\.(pdf|doc|docx)$/i.test(file.name))) return 'Tài liệu pháp lý/chứng nhận chấp nhận PDF, DOC hoặc DOCX.';
  }
  if (key === 'dossier-3') {
    if (files.some(file => !imageExtensions.test(file.name))) return 'Vui lòng chọn ảnh PNG, JPG/JPEG, WEBP, GIF, AVIF hoặc HEIC/HEIF.';
    if (files.some(file => file.size < megabyte || file.size > 10 * megabyte)) return 'Mỗi ảnh cần có dung lượng từ 1 MB đến 10 MB.';
  }
  return '';
}
export function mergeDossierFiles(previous: File[], incoming: File[]): File[] {
  return [...previous, ...incoming].filter((file, index, list) => list.findIndex(item => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified) === index);
}
