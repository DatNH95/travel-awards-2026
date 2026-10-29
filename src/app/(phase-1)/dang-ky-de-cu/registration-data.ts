export type RegistrationField = { label: string; type?: 'textarea' | 'email' | 'tel' | 'url' | 'number'; help?: string; minWords?: number; maxWords?: number };
export { categoryCriteria as professionalFields } from './category-criteria';
export const assessmentPeriodLabel = 'Thời gian hoạt động được xét giải: 01/10/2025–30/09/2026.';
export const registrationFields: RegistrationField[] = [
  { label: 'Tên đơn vị/tổ chức/cá nhân đứng tên hồ sơ*', help: 'Ghi đúng tên pháp lý của đơn vị nộp hồ sơ. Nếu nộp với tư cách cá nhân, điền họ tên của bạn.' }, { label: 'Loại hình đơn vị*' }, { label: 'Địa chỉ*' },
  { label: 'Website', type: 'url' }, { label: 'Fanpage/Kênh truyền thông chính thức', type: 'url' },
];
export const representativeFields: RegistrationField[] = [
  { label: 'Họ và tên người liên hệ*', help: 'Người phụ trách hồ sơ để Ban tổ chức trao đổi, yêu cầu bổ sung. Nếu bạn tự nộp, điền họ tên của bạn.' }, { label: 'Chức vụ' }, { label: 'Số điện thoại*', type: 'tel' }, { label: 'Email*', type: 'email' },
];
export const nominationFields: RegistrationField[] = [
  { label: 'Tên đơn vị/điểm đến/thương hiệu/trải nghiệm được đề cử*' },
  { label: 'Giới thiệu tổng quan*', type: 'textarea', minWords: 300, maxWords: 500, help: 'Bạn là ai, hoạt động ở đâu, phục vụ ai và có dấu ấn gì trong năm xét giải? Viết từ 300 đến 500 từ.' },
  { label: 'Thành tích nổi bật trong năm xét giải*', type: 'textarea', minWords: 300, maxWords: 500, help: 'Nêu kết quả, thành tựu nổi bật và số liệu làm cơ sở đề cử. Viết từ 300 đến 500 từ.' },
  { label: 'Điểm khác biệt/nổi bật của đề cử*', type: 'textarea', help: 'Điều gì tạo nên giá trị hoặc dấu ấn riêng của đơn vị/điểm đến/thương hiệu/trải nghiệm.' },
];
export const complianceStatements = [
  'Đơn vị/đề cử đáp ứng các điều kiện pháp lý cần thiết để tham gia hạng mục đăng ký.',
  'Các giấy phép/chứng nhận liên quan còn hiệu lực tại thời điểm đăng ký.',
  'Thông tin và số liệu cung cấp trong hồ sơ là chính xác và có thể được Ban tổ chức yêu cầu đối chiếu khi cần thiết.',
  'Đơn vị/đề cử không có sự cố nghiêm trọng liên quan đến an toàn du khách/khách hàng trong năm xét giải mà chưa được giải trình hoặc xử lý theo quy định.',
  'Tôi đồng ý để Ban tổ chức Travel Awards xác minh thông tin và sử dụng các tư liệu được cung cấp cho mục đích đánh giá, truyền thông và giới thiệu giải thưởng.',
];

