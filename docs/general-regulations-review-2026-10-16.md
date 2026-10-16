# Điều lệ & quy định — 16.10.2026

Nguồn: tab **Quy định chung**, hàng 4–15 của [Bộ tiêu chí hồ sơ ứng cử](https://docs.google.com/spreadsheets/d/1HMOULL6KwcNWDQLWpkycWWaXnOkvlJsn/edit#gid=1606237718), đọc lại qua Google Drive ngày 16.10.2026. Không sửa file nguồn.

Đã thay phần placeholder cũ bằng 12 nội dung chính thức: kỳ hoạt động, hình thức tham gia, số hồ sơ/hạng mục, nguyên tắc đánh giá, xung đột lợi ích, thời gian nhận đề cử, ngôn ngữ/định dạng, cam kết, bảo mật tài chính, bình chọn, xử lý gian dối và miễn phí tham gia. Giữ nguyên ý nghĩa khi rút gọn câu chữ.

Các ngoại lệ theo chỉ dẫn mới nhất của người dùng:

- Thời gian nhận đề cử 12:00 ngày 26/10/2026 đến 23:59 ngày 20/11/2026, giờ Việt Nam. Không đưa placeholder TBC hoặc tự đặt hạn bổ sung hồ sơ.
- Hai giải cá nhân/đại sứ do Ban tổ chức đề cử theo danh sách riêng, không đăng ký online.
- Người dùng đã chọn giữ định dạng/dung lượng hiện có của form: hồ sơ PDF/PPT/PPTX tối đa 20 MB/tệp; pháp lý PDF/DOC/DOCX hoặc link; ảnh JPG/JPEG/PNG 1–10 MB. Không áp mức 10 MB/tệp và 50 MB/hồ sơ trong sheet.

Mục “Điều lệ & quy định” có lại trong mục lục desktop/mobile; dùng cùng nội dung và semantic tokens. Không thay đổi flow hoặc validation của form trong lần cập nhật này.

Kiểm tra: TypeScript đạt; rà soát mục lục/ID `quy-dinh`, không còn nội dung chờ cập nhật trong section.

## Refinement bố cục và câu chữ

- Giữ đủ 12 nội dung, gom thành 3 nhóm: Tham gia & thời hạn; Hồ sơ & đánh giá; Cam kết & minh bạch.
- Mỗi nhóm có một icon SVG nét mảnh, decorative/aria-hidden. Không thêm thư viện icon, màu hay token foundation.
- Desktop: tiêu đề quy định bên trái, nội dung bên phải. Mobile: một cột, tiêu đề trước nội dung; chữ nội dung 16px. Ngày giờ và giới hạn tệp chuyển thành danh sách nhãn–giá trị dễ tra cứu.
- Giới hạn mới theo người dùng: giới thiệu 50 MB/tệp, tài liệu minh chứng/pháp lý/thực đơn 20 MB/tệp, ảnh 1–10 MB/ảnh.
- Browser: 3 nhóm/12 mục, không tràn ngang ở desktop và mobile 390px. Reload bản cuối không ghi nhận lỗi console mới. TypeScript đạt.
