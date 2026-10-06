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

Homepage dùng cấu trúc `body > header`, `body > div.wrap-homepage.width_common > section`, `body > footer` theo mẫu Tech. Wrapper giữ toàn chiều ngang để bảo toàn nền các box; container nội dung bên trong vẫn 1100px. Mỗi box bắt đầu bằng class `section` và tên riêng, lần lượt: `home-hero`, `home-about`, `home-agenda`, `home-awards`, `home-participate`, `home-minitalk`, `home-tin-tuc`, `home-final-cta`, `home-organizer`. ID section và các class thành phần con giữ nguyên để các link/handler hiện có hoạt động.

Trang Tin tức/Thể lệ và form giữ cấu trúc hiện có; class spacing `section-travel-awards-2026` ở các trang này không đổi. Công cụ export áp dụng cấu trúc Homepage mới ở các lần xuất tiếp theo. Source Next.js không đổi.

Toàn bộ trang handoff đặt `header.home-header` và `footer.home-footer` trực tiếp trong `body`; không có `div.home` hoặc thẻ `main` bọc nội dung. Class `home` trên body chỉ dùng làm scope CSS. `id="main"` nằm trên section nội dung để skip-link hoạt động. Không có node ẩn, script hydration hoặc `next-route-announcer` của Next. `qa/shell-report.json` kiểm tra shell, link, responsive và thao tác UI của bản bàn giao; `check-shell.mjs` không dùng trên production.

Đã kiểm tra shell và đường dẫn của 110 file, 16 lượt responsive ở 1440px/390px, tab giải thưởng, chọn hạng mục, dialog và phân trang. Link có anchor (`#main`, `#news-latest`, các mục Thể lệ) cũng chuyển sang file HTML tương đối; export giữ cách chuyển này ở các lần xuất tiếp theo.

`qa/structure-report.json` kiểm tra cấu trúc của toàn bộ HTML và đối chiếu bố cục trước/sau khi bỏ wrapper ở desktop 1440px và mobile 390px. `restructure.mjs`/`structure.mjs` là công cụ nội bộ, không deploy lên production.

`qa/home-structure-report.json` đối chiếu trước/sau cập nhật wrapper và tên class Homepage; `update-home-structure.mjs` chỉ dùng để migration/QA, không deploy lên production.

Nạp theo thứ tự `tokens.css` → `base.css` → `home.css` → CSS trang (`rules.css`, `news.css`, `nomination.css`). CSS tiêu chuẩn, không cần Tailwind compiler hoặc runtime. Giữ class semantic hiện tại để Tech có thể chia thành template/partial. Các breakpoint và reduced-motion giữ từ source.

`assets/` và `fonts/` được copy từ public, artwork không chỉnh sửa. Đường dẫn tương đối hoạt động trong thư mục con. Ảnh CDN VnExpress giữ URL nguồn và cần mạng; không tải lại các ảnh ngoài. Merriweather news dùng font local.

## JavaScript tùy chọn

`js/handoff.js` là JavaScript thuần cho tab có bàn phím, chọn hạng mục/deep link, countdown, dialog, focus validation native và hiển thị tệp đã chọn. Không React, Next, hydration, router runtime hay thư viện bên ngoài. Có thể thay bằng handlers của Tech.

Form là template tích hợp, không có backend/upload/email hoặc lưu bền vững. Step 2/3 chặn submit và mở thông báo mô phỏng; không chuyển dữ liệu giữa các file HTML. Step 3 hiển thị trạng thái draft trống. Giữ riêng các view giúp Tech tích hợp state/server validation theo codebase của mình.

Tech cần nối draft và review, validation số quốc tế, giới hạn từ/dung lượng/định dạng/minh chứng pháp lý, cộng dồn/bỏ tệp và API gửi/lưu hồ sơ. Native required/email/url vẫn hoạt động. Chưa thay thế libphonenumber bằng regex đơn giản. Bản này ưu tiên giao diện responsive; bỏ pointer/scroll parallax, count-up và JS reveal trang theo yêu cầu giảm JS. CSS motion/sheens và reduced-motion giữ nguyên.

`export.mjs` và `verify.mjs` chỉ là công cụ nội bộ tạo/kiểm tra artifact, không deploy cùng website. Export sử dụng server local đã build và Playwright có sẵn trong môi trường tạo artifact; website bàn giao không phụ thuộc các công cụ đó.

## Kiểm tra bàn giao

- 110 file HTML: kiểm tra đường dẫn CSS, JavaScript, assets và link nội bộ; không có Next runtime.
- Lượt cập nhật mới nhất: 44 đối chiếu ở 1440px/390px cho Homepage, đủ 15 form Step 2 và các trạng thái đề cử/cập nhật; không tràn ngang, bố cục khớp source. Kiểm tra shell/link toàn bộ 110 file và countdown trước mở/đang nhận/hết hạn đều đạt.
- Kiểm tra tab Tiên phong đủ 9 hạng mục, deep link chọn đúng hạng mục, chuyển sang template form và dialog; không lỗi JavaScript hoặc ID trùng trên các trang được kiểm tra.
- Screenshot đối chiếu và kết quả nằm trong `qa/`, báo cáo `qa/report.json`. Không đưa thư mục QA và công cụ export/verify lên production.
- Công cụ export chỉ cập nhật `handoff-html/`; source và bản bàn giao được commit cùng nhau theo quy trình project.
