# Email Travel Awards 2026

Mẫu `registration-success.html` đối chiếu với `public/assets/key-visual/email dang ky ho so.svg`. Banner PNG được cắt trực tiếp từ SVG gốc, kích thước 1270 × 400, hiển thị 635 × 200. Nội dung dùng chữ HTML, table layout và CSS inline; không có runtime hoặc JavaScript.

Subject: **Travel Awards 2026 — Đăng ký hồ sơ thành công**

Trigger: chỉ gửi sau khi hệ thống xác nhận hồ sơ đã submit thành công. Gửi đến email cá nhân người đăng ký; hệ thống gửi cần chống gửi trùng khi retry. Repo hiện chỉ có template, chưa kết nối backend hay dịch vụ email.

| Biến | Giá trị |
| --- | --- |
| `recipient_name` | Tên người nhận |
| `application_name` | Tên hồ sơ đăng ký |
| `category_name` | Hạng mục đăng ký |
| `application_url` | URL HTTPS tuyệt đối đến chi tiết hồ sơ thật |
| `banner_url` | URL HTTPS công khai của `assets/registration-banner.png`, hoặc CID do dịch vụ gửi cung cấp |

Escape HTML cho tất cả giá trị văn bản. Kiểm tra URL trước khi gán vào thuộc tính và escape thuộc tính HTML. Không gửi khi còn biến chưa thay thế. Không dùng SVG/base64 hoặc đường dẫn ảnh local trong email gửi thật.

`registration-success.preview.html` là bản xem trước với dữ liệu minh họa, ảnh tương đối và link mẫu; không dùng để gửi thật. Kiểm tra gửi thử Gmail, Outlook và Apple Mail trên dịch vụ được chọn trước khi kích hoạt automation. Outlook có thể hiển thị hộp thông tin với góc vuông.

Khi có yêu cầu cập nhật SVG hoặc thêm mẫu email: đọc bản thiết kế mới, cập nhật HTML/ảnh tương ứng, giữ biến dữ liệu, cập nhật bản preview và đối chiếu desktop/mobile. Không tự theo dõi file hoặc tự gửi email.
