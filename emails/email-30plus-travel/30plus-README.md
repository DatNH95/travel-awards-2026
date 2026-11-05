# Email xác nhận đăng ký 30Plus Travel Glow

- Template gửi: `30plus-registration-success.html`.
- Xem trước: `30plus-registration-success.preview.html` (dữ liệu và link minh họa, không dùng để gửi).
- Bản text cho phần `text/plain`: `30plus-registration-success.txt`.
- Banner: `assets/30plus-registration-banner.png`, cắt trực tiếp từ `public/assets/key-visual/email dang ky 30plus.svg`, kích thước 1270 × 400, hiển thị 635 × 200.

Subject đề xuất: **30Plus Travel Glow — Đăng ký hồ sơ thành công**

## Gắn vào automation

Chỉ kích hoạt sau khi hệ thống lưu và xác nhận submit hồ sơ thành công. Người nhận là email cá nhân người đăng ký lấy từ hồ sơ đã xác nhận; không gửi ở lượt mở form, bấm submit còn lỗi hoặc hồ sơ nháp. Dùng mã hồ sơ và loại thông báo làm khóa chống gửi trùng khi retry. Repo hiện chỉ có mẫu email, chưa kết nối dịch vụ gửi hoặc backend.

| Biến | Dữ liệu cần gán |
| --- | --- |
| `recipient_name` | Tên người đăng ký |
| `application_name` | Tên hồ sơ đăng ký |
| `application_url` | URL HTTPS tuyệt đối đến hồ sơ thật, tuân theo quyền truy cập của website |
| `banner_url` | URL HTTPS công khai của banner PNG hoặc CID ảnh đính kèm do dịch vụ gửi cung cấp |

Hạng mục cố định là `30PlusTravelGlow`, theo SVG. Escape HTML cho các biến văn bản; kiểm tra URL và escape thuộc tính trước khi chèn vào HTML. Không gửi khi còn biến chưa thay thế. Bản text dùng giá trị văn bản thuần, không dùng chuỗi đã escape HTML. Không dùng đường dẫn local, SVG hoặc ảnh base64 trong email gửi thật.

Template dùng table layout, CSS inline, font Arial và khung Outlook 694px. Media query giảm padding cho mobile; nội dung vẫn đọc được khi ảnh bị chặn. Không có JavaScript, React hoặc Next.js runtime.

Đã đối chiếu SVG và kiểm tra layout trình duyệt ở 694, 390 và 320px: ảnh tải đủ, không tràn ngang, không còn biến trong preview. Kết quả tại `30plus-QA.json`. Cần gửi thử qua dịch vụ được chọn để kiểm tra Gmail, Outlook và Apple Mail trước khi bật automation; kiểm tra trình duyệt chưa thay thế kiểm tra email client.
