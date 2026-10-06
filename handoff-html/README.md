# Travel Awards 2026 — HTML/CSS handoff

Bản bàn giao từ implementation hiện tại. Source Next.js không thay đổi.

## Mở và tích hợp

- Mở `index.html` trực tiếp hoặc phục vụ thư mục này bằng static server.
- Trang chính: `index.html`, `the-le.html`, `tin-tuc.html`, `dang-ky-de-cu.html`.
- `dang-ky-tru-cot-1.html` … `dang-ky-tru-cot-6.html` và `dang-ky-tien-phong-1.html` … `dang-ky-tien-phong-9.html`: các cấu hình Step 2.
- `xac-nhan.html`, `thanh-cong.html`: mẫu trạng thái Step 3/4, không phải kết quả gửi hồ sơ.
- `chinh-sua-ho-so.html`, `xac-nhan-cap-nhat.html`, `cap-nhat-thanh-cong.html`: trạng thái chỉnh sửa/xác nhận cập nhật/cập nhật thành công sau bước 4; chỉ mô phỏng, không gửi hoặc lưu dữ liệu. Các file HTML không chia sẻ draft.
- `tin-tuc-2.html` … `tin-tuc-7.html`: phân trang; `tin-*.html`: toàn bộ bài demo hiện có.
- `manifest.json` đối chiếu URL source với file bàn giao.

## CSS và assets

HTML không có div bọc toàn trang: header, các section nội dung và footer là con trực tiếp của body. Các class scope/theme được đặt trên body để giữ style; class spacing `section` đổi thành `section-travel-awards-2026`. Trang Tin tức/Thể lệ giữ một section bố cục riêng (`section-layout`) để bảo toàn grid và sidebar. Container chung 1100px; không còn hàng publisher/đăng nhập. Công cụ export giữ cấu trúc này ở các lần xuất tiếp theo.

`qa/structure-report.json` kiểm tra cấu trúc của toàn bộ HTML và đối chiếu bố cục trước/sau khi bỏ wrapper ở desktop 1440px và mobile 390px. `restructure.mjs`/`structure.mjs` là công cụ nội bộ, không deploy lên production.

Nạp theo thứ tự `tokens.css` → `base.css` → `home.css` → CSS trang (`rules.css`, `news.css`, `nomination.css`). CSS tiêu chuẩn, không cần Tailwind compiler hoặc runtime. Giữ class semantic hiện tại để Tech có thể chia thành template/partial. Các breakpoint và reduced-motion giữ từ source.

`assets/` và `fonts/` được copy từ public, artwork không chỉnh sửa. Đường dẫn tương đối hoạt động trong thư mục con. Ảnh CDN VnExpress giữ URL nguồn và cần mạng; không tải lại các ảnh ngoài. Merriweather news dùng font local.

## JavaScript tùy chọn

`js/handoff.js` là JavaScript thuần cho tab có bàn phím, chọn hạng mục/deep link, countdown, dialog, focus validation native và hiển thị tệp đã chọn. Không React, Next, hydration, router runtime hay thư viện bên ngoài. Có thể thay bằng handlers của Tech.

Form là template tích hợp, không có backend/upload/email hoặc lưu bền vững. Step 2/3 chặn submit và mở thông báo mô phỏng; không chuyển dữ liệu giữa các file HTML. Step 3 hiển thị trạng thái draft trống. Giữ riêng các view giúp Tech tích hợp state/server validation theo codebase của mình.

Tech cần nối draft và review, validation số quốc tế, giới hạn từ/dung lượng/định dạng/minh chứng pháp lý, cộng dồn/bỏ tệp và API gửi/lưu hồ sơ. Native required/email/url vẫn hoạt động. Chưa thay thế libphonenumber bằng regex đơn giản. Bản này ưu tiên giao diện responsive; bỏ pointer/scroll parallax, count-up và JS reveal trang theo yêu cầu giảm JS. CSS motion/sheens và reduced-motion giữ nguyên.

`export.mjs` và `verify.mjs` chỉ là công cụ nội bộ tạo/kiểm tra artifact, không deploy cùng website. Export sử dụng server local đã build và Playwright có sẵn trong môi trường tạo artifact; website bàn giao không phụ thuộc các công cụ đó.

## Kiểm tra bàn giao

- 110 file HTML: kiểm tra đường dẫn CSS, JavaScript, assets và link nội bộ; không có Next runtime.
- 50 lượt kiểm tra ở 1440px/390px: Homepage, Thể lệ, Tin tức, bài chi tiết, đủ 15 form Step 2 và các trạng thái đề cử/cập nhật; không tràn ngang. Ngoại lệ đối chiếu đã được người dùng chấp thuận nằm trong báo cáo QA.
- Kiểm tra tab Tiên phong đủ 9 hạng mục, deep link chọn đúng hạng mục, chuyển sang template form và dialog; không lỗi JavaScript hoặc ID trùng trên các trang được kiểm tra.
- Screenshot đối chiếu và kết quả nằm trong `qa/`, báo cáo `qa/report.json`. Không đưa thư mục QA và công cụ export/verify lên production.
- Công cụ export chỉ cập nhật `handoff-html/`; source và bản bàn giao được commit cùng nhau theo quy trình project.
