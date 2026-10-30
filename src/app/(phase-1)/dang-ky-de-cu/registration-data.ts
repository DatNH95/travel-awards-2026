export type RegistrationField = { label: string; type?: 'textarea' | 'email' | 'tel' | 'url' | 'number'; help?: string; minWords?: number; maxWords?: number };
export { categoryCriteria as professionalFields } from './category-criteria';
export const assessmentPeriodLabel = 'Thời gian hoạt động được xét giải: 01/10/2025–30/09/2026.';
export const registrationFields: RegistrationField[] = [
  { label: 'Tên đơn vị/tổ chức/cá nhân đứng tên hồ sơ*', help: 'Tên pháp lý của đơn vị, hoặc họ tên nếu nộp cá nhân.' }, { label: 'Đăng ký với tư cách*' }, { label: 'Địa chỉ*' },
  { label: 'Website', type: 'url' }, { label: 'Fanpage/Kênh truyền thông chính thức', type: 'url' },
];
export const representativeFields: RegistrationField[] = [
  { label: 'Họ và tên người liên hệ*', help: 'Là người đại diện hồ sơ, trực tiếp làm việc với Ban tổ chức.' }, { label: 'Chức vụ' }, { label: 'Số điện thoại*', type: 'tel' }, { label: 'Email*', type: 'email' },
];
export const nominationFields: RegistrationField[] = [
  { label: 'Tên đề cử*' },
  { label: 'Giới thiệu tổng quan*', type: 'textarea', minWords: 300, maxWords: 500, help: 'Giới thiệu hoạt động, địa bàn, khách hàng và dấu ấn trong năm xét giải. 300–500 từ.' },
  { label: 'Thành tích nổi bật trong năm xét giải*', type: 'textarea', minWords: 300, maxWords: 500, help: 'Nêu thành tựu và số liệu nổi bật trong năm xét giải. 300–500 từ.' },
  { label: 'Điểm khác biệt/nổi bật của đề cử*', type: 'textarea', help: 'Điều gì tạo nên giá trị riêng của đề cử?' },
];
export const complianceStatements = [
  'Đơn vị/đề cử đáp ứng các điều kiện pháp lý cần thiết để tham gia hạng mục đăng ký.',
  'Các giấy phép/chứng nhận liên quan còn hiệu lực tại thời điểm đăng ký.',
  'Thông tin và số liệu cung cấp trong hồ sơ là chính xác và có thể được Ban tổ chức yêu cầu đối chiếu khi cần thiết.',
  'Đơn vị/đề cử không có sự cố nghiêm trọng liên quan đến an toàn du khách/khách hàng trong năm xét giải mà chưa được giải trình hoặc xử lý theo quy định.',
  'Tôi đồng ý để Ban tổ chức Travel Awards xác minh thông tin và sử dụng các tư liệu được cung cấp cho mục đích đánh giá, truyền thông và giới thiệu giải thưởng.',
];

