# Đối chiếu hồ sơ đăng ký — 15.10.2026

Nguồn: [Bộ tiêu chí hồ sơ ứng cử](https://docs.google.com/spreadsheets/d/1HMOULL6KwcNWDQLWpkycWWaXnOkvlJsn/edit), file Excel được xem qua Google Drive. Đọc `Giải trụ cột!A3:E9` và `Giải tiên phong!A3:E12`; không sửa file nguồn.

## Nội dung cập nhật

- Giữ cấu trúc I–V, các trường chung I/II, 4 bước, layout, typography, sticky bar và mô phỏng lưu/chỉnh sửa hiện có.
- Mục III: số liệu kê khai và thuyết minh theo từng tiêu chí cho 6 Trụ cột và 7 Tiên phong được đăng ký. Hiển thị kỳ xét giải 01/10/2025–30/09/2026 và đối tượng áp dụng.
- Mục IV: thêm điều kiện riêng theo hạng mục trước các cam kết chung. Checkbox xác nhận tất cả và dữ liệu xác nhận được tách theo hạng mục.
- Mục V: thay danh sách minh chứng theo file; thêm tài liệu theo từng tiêu chí (tối đa 3), thực đơn PDF cho giải ẩm thực và số lượng ảnh theo hạng mục.
- Ảnh bắt buộc: khách sạn tối thiểu 12; resort tối thiểu 15; trải nghiệm du lịch, làng du lịch cộng đồng và trải nghiệm ẩm thực tối thiểu 8. Các giải khác không có yêu cầu ảnh bắt buộc trong hai tab. Điểm đến cho phép 15 ảnh để đáp ứng bộ ảnh khuyến khích 8–15; các giới hạn định dạng/dung lượng đã duyệt được giữ lại.
- Nhân vật du lịch và Gương mặt truyền thông (Đại sứ) vẫn có tên trong danh sách 9 Tiên phong, nhưng radio bị khóa, có nhãn “Ban tổ chức đề cử · Không mở đăng ký”. Truy cập category tương ứng, kể cả kèm step/preview, quay về bước chọn và không tự chọn thay một giải khác.
- Bước xác nhận dùng cùng cấu hình, hiển thị số liệu/thuyết minh, điều kiện, thực đơn và tệp từng tiêu chí.

## Biên tập UX

- Dùng nhãn ngắn; hướng dẫn bên dưới giữ đủ các thành phần cần kê khai. Chuẩn hóa dấu câu, khoảng trắng, dấu ngoặc thừa, tên Tripadvisor và thuật ngữ “nền tảng đánh giá”.
- Theo refinement mới nhất, bỏ hướng dẫn 250 chữ/3 tài liệu lặp lại. Bộ đếm 0/300 từ nằm trong ô thuyết minh, tối đa 300 từ theo yêu cầu người dùng (thay giới hạn nguồn 250 chữ); khi dán nội dung dài, giữ 300 từ đầu. File tiêu chí vẫn cảnh báo vượt 3 tài liệu; thực đơn kiểm tra PDF.
- Giữ chế độ mô phỏng front-end và hành vi chuyển bước hiện có. Chưa có upload/backend; kích thước pixel của ảnh và thời lượng video chỉ là hướng dẫn, chưa được xác minh tự động. Cơ chế xác thực toàn bộ hồ sơ trước khi gửi nằm ngoài cập nhật nội dung lần này.
- `category-criteria.ts` chứa nội dung đã biên tập; công cụ đọc lại nguồn là `scripts/read-registration-criteria.py` (Python/openpyxl, chỉ đọc workbook).

## QA

- TypeScript và production build đạt.
- `node scripts/check-registration-criteria.cjs`: đủ 13 cấu hình mở đăng ký, 2 giải BTC, biên số lượng ảnh 12/15/8, tối đa 3 tài liệu và định dạng thực đơn PDF.
- Browser trên production build: form ẩm thực đủ nội dung mới; xác nhận tất cả chọn cả điều kiện riêng/chung; bước 3 hiển thị kết quả đúng.
- URL `category=tien-phong-1&step=3`: bị đưa về bước 1, cả hai radio giải BTC bị khóa và Tiếp tục bị khóa.
- Mobile 390px: form khách sạn và thuyết minh không tràn ngang, console không có lỗi.
