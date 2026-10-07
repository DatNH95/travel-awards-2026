# Đối chiếu nội dung đăng ký — 07.10.2026

Nguồn: [Travel Awards - Master plan, Demo form đăng ký](https://docs.google.com/spreadsheets/d/1H9c-P0MIkqvflsUWEEpSEnv8pMmpurk-NVdPyJVVD-s/edit#gid=1548405136).

Đọc A1:AA360 và A361:AA1000; nội dung thực tế kết thúc tại hàng 166.

## Kết quả

- I: các trường đơn vị và người đại diện đã khớp; đổi “Địa chỉ email” thành “Email”. Giữ yêu cầu bắt buộc cho họ tên, điện thoại, email theo quyết định người dùng.
- II: các trường và mô tả đã khớp. Chuẩn hóa lỗi dấu `/` dư trong “Điểm khác biệt/nổi bật/ của đề cử” bằng copy hiện tại.
- III và minh chứng: đủ, khớp cả 6 hạng mục Trụ cột. Booking/Agoda/Tripadvisor/Nền tảng khác và Reach/Engagement/Lượt xem/Lượt nhắc đến/Media coverage được giữ thành các trường con tương ứng.
- Tiên phong: đủ 9 tên và thứ tự, khớp `src/data/awards.ts`; sheet chưa cung cấp mục III/minh chứng riêng. Dùng phần chung và giữ ghi chú chờ bổ sung, không tự tạo dữ liệu chuyên môn.
- Điều kiện tuân thủ: 5 nội dung đã khớp.
- Hồ sơ: loại tài liệu đã khớp. Giữ quy định dung lượng/định dạng đã thống nhất vì sheet còn placeholder dung lượng; giữ danh sách minh chứng trong mục V theo yêu cầu mới của người dùng.
- Giữ cấu trúc 4 bước, copy MyVNE ID, nhãn I. Thông tin, checkbox Xác nhận tất cả, cam kết và các refinement desktop/mobile đã duyệt.

Không sửa Google Sheet. Form và bước xác nhận dùng chung `registration-data.ts` nên nhãn mới áp dụng nhất quán.

## Kiểm tra

- TypeScript: đạt (`node node_modules/typescript/bin/tsc --noEmit`).
- Đây là cập nhật nhãn và nguồn dữ liệu; không thay đổi layout hay hành vi form.
