export type RegistrationField = { label: string; type?: 'textarea' | 'email' | 'tel' | 'url' | 'number'; help?: string };
const fields = (labels: string[]): RegistrationField[] => labels.map(label => ({ label }));
export const registrationFields: RegistrationField[] = [
  { label: 'Tên đơn vị/tổ chức/cá nhân*' }, { label: 'Loại hình đơn vị*' }, { label: 'Địa chỉ*' },
  { label: 'Website', type: 'url' }, { label: 'Fanpage/Kênh truyền thông chính thức', type: 'url' },
];
export const representativeFields: RegistrationField[] = [
  { label: 'Họ và tên*' }, { label: 'Chức vụ' }, { label: 'Số điện thoại*', type: 'tel' }, { label: 'Địa chỉ email*', type: 'email' },
];
export const nominationFields: RegistrationField[] = [
  { label: 'Tên đơn vị/điểm đến/thương hiệu/trải nghiệm được đề cử*' },
  { label: 'Giới thiệu tổng quan*', type: 'textarea', help: 'Vui lòng giới thiệu ngắn gọn về đơn vị/điểm đến/thương hiệu/trải nghiệm và những dấu ấn nổi bật trong năm xét giải. (300 - 500 từ)' },
  { label: 'Thành tích nổi bật trong năm xét giải*', type: 'textarea', help: 'Vui lòng nêu những kết quả, thành tựu hoặc dấu ấn nổi bật làm cơ sở cho hồ sơ đề cử. (300 - 500 từ)' },
  { label: 'Điểm khác biệt/nổi bật của đề cử*', type: 'textarea', help: 'Điều gì tạo nên giá trị hoặc dấu ấn riêng của đơn vị/điểm đến/thương hiệu/trải nghiệm.' },
];
// Source: Form đăng ký Travel Awards 2026, tabs “form đăng ký” and “Nhóm giải thưởng khác”.
// Keys follow the shared award names; no category-specific fields were supplied for Tiên phong.
export const professionalFields: Record<string, { fields: RegistrationField[]; evidence: string[] }> = {
  'Điểm đến du lịch của năm': {
    fields: fields(['Tổng lượt khách du lịch năm xét giải*', 'Tổng lượt khách năm liền trước*', 'Tổng doanh thu du lịch năm xét giải*', 'Tổng doanh thu du lịch năm liền trước', 'Các sản phẩm/hạ tầng du lịch mới đưa vào khai thác trong năm', 'Các chương trình xúc tiến đầu tư/quảng bá du lịch nổi bật', 'Các hoạt động bảo tồn di sản, môi trường và phát triển cộng đồng']),
    evidence: ['Công văn/hồ sơ đăng ký chính thức', 'Báo cáo số liệu khách du lịch', 'Tài liệu về sản phẩm/hạ tầng mới', 'Tài liệu về các chương trình/chính sách liên quan'],
  },
  'Doanh nghiệp lữ hành của năm': {
    fields: fields(['Doanh thu năm xét giải*', 'Doanh thu năm liền trước', 'Số lượt khách phục vụ trong năm*', 'Số lượt khách phục vụ năm liền trước', 'Các sản phẩm/tour tiêu biểu trong năm', 'Quy mô đội ngũ hướng dẫn viên và nhân sự chăm sóc khách hàng', 'Các ứng dụng công nghệ/đổi mới sản phẩm đã triển khai']),
    evidence: ['Giấy phép kinh doanh lữ hành còn hiệu lực', 'Báo cáo doanh thu/số liệu hoạt động', 'Hồ sơ sản phẩm tour', 'Hình ảnh/tài liệu minh chứng'],
  },
  'Khách sạn của năm': {
    fields: fields(['Hạng sao/chứng nhận tương đương*', 'Số lượng phòng*', 'Công suất phòng bình quân trong năm*', 'Số đêm phòng bán ra trong năm', 'Điểm đánh giá trung bình trên các nền tảng OTA — Booking', 'Điểm đánh giá trung bình trên các nền tảng OTA — Agoda', 'Điểm đánh giá trung bình trên các nền tảng OTA — Tripadvisor', 'Điểm đánh giá trung bình trên các nền tảng OTA — Nền tảng khác', 'Link các trang đánh giá', 'Hoạt động đầu tư/nâng cấp/đổi mới trải nghiệm khách hàng', 'Các thực hành phát triển bền vững đã áp dụng']),
    evidence: ['Quyết định/chứng nhận xếp hạng', 'Chứng nhận PCCC', 'Hồ sơ an toàn vệ sinh thực phẩm', 'Link/ảnh chụp đánh giá OTA', 'Hình ảnh/tài liệu về hoạt động nổi bật'],
  },
  'Khu nghỉ dưỡng của năm (Resort)': {
    fields: fields(['Hạng/chứng nhận tương đương*', 'Số phòng/villa*', 'Công suất phòng bình quân trong năm*', 'Số đêm phòng bán ra trong năm', 'Điểm đánh giá trung bình trên các nền tảng OTA', 'Link các trang đánh giá', 'Quy mô và hệ thống dịch vụ của resort', 'Đặc trưng về không gian, kiến trúc và bản sắc địa phương', 'Các dịch vụ/trải nghiệm nghỉ dưỡng nổi bật', 'Các thực hành phát triển bền vững đã áp dụng']),
    evidence: ['Chứng nhận/xếp hạng', 'Chứng nhận PCCC, an toàn vệ sinh thực phẩm', 'Hình ảnh không gian, kiến trúc, dịch vụ', 'Tài liệu về hoạt động bền vững'],
  },
  'Hãng hàng không du lịch của năm': {
    fields: fields(['Giấy phép khai thác vận chuyển hàng không*', 'Chứng nhận an toàn khai thác*', 'Số đường bay khai thác đi/đến Việt Nam*', 'Số chuyến bay trung bình/tuần*', 'Các đường bay mới mở trong năm', 'Tỷ lệ chuyến bay đúng giờ trong năm', 'Các chương trình giá/kích cầu du lịch nổi bật', 'Các chương trình hợp tác quảng bá điểm đến']),
    evidence: ['Giấy phép khai thác', 'Chứng nhận an toàn khai thác', 'Báo cáo mạng đường bay', 'Báo cáo tỷ lệ đúng giờ', 'Tài liệu chương trình kích cầu/quảng bá'],
  },
  'Trải nghiệm du lịch của năm': {
    fields: fields(['Tên trải nghiệm/sản phẩm*', 'Thời gian triển khai*', 'Địa điểm*', 'Đơn vị thực hiện*', 'Số lượng khách/người tham gia*', 'Số lượng khách năm liền trước (nếu là sản phẩm đã triển khai nhiều năm)', 'Mức tăng trưởng lượng khách', 'Mô tả trải nghiệm và giá trị khác biệt', 'Số liệu lan tỏa truyền thông/mạng xã hội — Reach', 'Số liệu lan tỏa truyền thông/mạng xã hội — Engagement', 'Số liệu lan tỏa truyền thông/mạng xã hội — Lượt xem', 'Số liệu lan tỏa truyền thông/mạng xã hội — Lượt nhắc đến', 'Số liệu lan tỏa truyền thông/mạng xã hội — Media coverage']),
    evidence: ['Giấy phép tổ chức nếu thuộc diện phải xin phép', 'Số liệu vé bán/lượt tham gia', 'Báo cáo truyền thông', 'Hình ảnh/video', 'Link các bài viết, video, social content'],
  },
};
export const complianceStatements = [
  'Đơn vị/đề cử đáp ứng các điều kiện pháp lý cần thiết để tham gia hạng mục đăng ký.',
  'Các giấy phép/chứng nhận liên quan còn hiệu lực tại thời điểm đăng ký.',
  'Thông tin và số liệu cung cấp trong hồ sơ là chính xác và có thể được Ban tổ chức yêu cầu đối chiếu khi cần thiết.',
  'Đơn vị/đề cử không có sự cố nghiêm trọng liên quan đến an toàn du khách/khách hàng trong năm xét giải mà chưa được giải trình hoặc xử lý theo quy định.',
  'Tôi đồng ý để Ban tổ chức Travel Awards xác minh thông tin và sử dụng các tư liệu được cung cấp cho mục đích đánh giá, truyền thông và giới thiệu giải thưởng.',
];

