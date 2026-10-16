// Source: “Quy định chung”, rows 4–15, workbook 1HMOULL6KwcNWDQLWpkycWWaXnOkvlJsn.
// Dates, organizer nominations and upload limits follow the user's latest instructions.
type Regulation = { title: string; paragraphs?: string[]; facts?: { label: string; value: string }[] };
type RegulationGroup = { id: string; title: string; icon: 'participation' | 'dossier' | 'integrity'; items: Regulation[] };
export const regulationGroups: RegulationGroup[] = [
  {
    id: 'tham-gia', title: 'Tham gia & thời hạn', icon: 'participation',
    items: [
      { title: 'Hình thức tham gia', paragraphs: [
        'Tự ứng cử hoặc được Ban tổ chức đề cử, tùy hạng mục.',
        'Nhân vật du lịch của năm và Gương mặt truyền thông du lịch của năm (Đại sứ) do Ban tổ chức đề cử theo danh sách riêng, không nhận đăng ký trực tuyến.',
      ] },
      { title: 'Số hồ sơ', paragraphs: [
        'Mỗi đơn vị, cá nhân được tham gia tối đa 3 hạng mục, mỗi hạng mục một hồ sơ.',
        'Chuỗi khách sạn, resort nộp riêng cho từng cơ sở. Một cơ sở chỉ chọn Khách sạn của năm hoặc Khu nghỉ dưỡng của năm (Resort).',
      ] },
      { title: 'Nhận đề cử', facts: [
        { label: 'Mở đăng ký', value: '12:00 ngày 26/10/2026' },
        { label: 'Đóng đăng ký', value: '23:59 ngày 20/11/2026' },
      ], paragraphs: ['Thời gian tính theo giờ Việt Nam.'] },
      { title: 'Phí tham gia', paragraphs: ['Miễn phí.'] },
    ],
  },
  {
    id: 'ho-so-danh-gia', title: 'Hồ sơ & đánh giá', icon: 'dossier',
    items: [
      { title: 'Thời gian xét giải', paragraphs: [
        'Đánh giá hoạt động từ 01/10/2025 đến 30/09/2026; so sánh tăng trưởng với cùng kỳ năm trước.',
        'Riêng Điểm đến du lịch của năm có thể dùng thống kê chính thức 9 tháng năm 2026 so với 9 tháng năm 2025.',
      ] },
      { title: 'Yêu cầu hồ sơ', paragraphs: ['Dùng tiếng Việt; đơn vị nước ngoài có thể dùng tiếng Anh. Kê khai tiền tệ bằng VND.'], facts: [
        { label: 'Hồ sơ giới thiệu', value: 'PDF, PPT, PPTX · Tối đa 50 MB/tệp' },
        { label: 'Pháp lý, chứng nhận', value: 'PDF, DOC, DOCX · Tối đa 20 MB/tệp; hoặc link bản scan' },
        { label: 'Tài liệu minh chứng khác', value: 'Tối đa 20 MB/tệp' },
        { label: 'Hình ảnh', value: 'JPG, JPEG, PNG · 1–10 MB/ảnh; số lượng theo hạng mục' },
        { label: 'Video', value: 'Gửi qua đường link' },
      ] },
      { title: 'Nguyên tắc chấm', paragraphs: ['Hội đồng chuyên môn chỉ đánh giá thông tin trong hồ sơ, không khảo sát thực tế. Nội dung không kê khai sẽ không được xem xét.'] },
    ],
  },
  {
    id: 'cam-ket', title: 'Cam kết & minh bạch', icon: 'integrity',
    items: [
      { title: 'Xung đột lợi ích', paragraphs: [
        'Đơn vị có liên quan đến thành viên Hội đồng, nhân sự Ban tổ chức hoặc đơn vị tư vấn chuyên môn không được ứng cử.',
        'Nhà tài trợ, đối tác được tham gia nhưng phải khai báo mối quan hệ với chương trình.',
      ] },
      { title: 'Trách nhiệm kê khai', paragraphs: ['Cung cấp thông tin trung thực; đồng ý để Ban tổ chức xác minh và sử dụng tên, logo, hình ảnh đã cung cấp để truyền thông chương trình.'] },
      { title: 'Bảo mật tài chính', paragraphs: ['Doanh thu, giá phòng và ngân sách chỉ dùng để chấm giải, không công bố công khai.'] },
      { title: 'Bình chọn công bằng', paragraphs: ['Không kêu gọi bình chọn kèm quà tặng hoặc dùng công cụ tự động. Vi phạm sẽ bị loại khỏi hạng mục.'] },
      { title: 'Xử lý gian dối', paragraphs: ['Kê khai gian dối ở bất kỳ giai đoạn nào đều bị loại. Nếu đã trao giải, Ban tổ chức sẽ thu hồi giải và công bố việc xử lý.'] },
    ],
  },
];
