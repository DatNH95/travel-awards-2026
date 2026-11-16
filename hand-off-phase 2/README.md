# Travel Awards — Phase 2

Bản HTML/CSS thuần cho Tech: `index.html` (Homepage), `binh-chon.html` (15 hạng mục qua query `?category=...`) và 21 trang hồ sơ thực `ho-so-*.html`. Giữ folder này cạnh `handoff-html/` để link Thể lệ/Tin tức Phase 1 hoạt động.

Không có React/Next.js/Tailwind runtime. CSS foundation và asset được đóng gói tại chỗ; ảnh hồ sơ/tin tức demo vẫn dùng URL gốc. Giữ credit Uicons by Flaticon và các giấy phép đi kèm.

Thứ tự CSS: `tokens.css` → `font.css` → `base.css` → `voting.css` → `home.css` → `icons.css`. Không dùng `@layer`. Toàn bộ `@font-face` (Merriweather và Flaticon) nằm trong `font.css`; glyph và định nghĩa icon dùng chung nằm trong `icons.css`. Giữ WOFF2 và NOTICE trong thư mục assets; không cần nạp thêm stylesheet vendor.

Gallery Đà Nẵng/Phú Quốc có 6 ảnh, nguồn và credit nằm trong popup phóng to; metadata mỗi ảnh được giữ trong HTML. Dải số liệu count-up một lần khi vào viewport, giữ số cuối cho screen reader và tắt chuyển động khi reduced motion. Banner detail sticky từ 1024px; tablet/mobile giữ vị trí bình thường.

`js/handoff.js` chỉ mô phỏng filter/search, khảo sát, share, gallery và slider. `js/survey.js` dùng markup công khai trong `js/data.js` để chạy popup nhiều hồ sơ, chuyển hạng mục và lịch sử bằng JS thuần. Chỉ hoàn tất khi chấm đủ các hồ sơ đã chọn; khóa từng hồ sơ đã bình chọn, cho phép bổ sung hồ sơ khác cùng hạng mục. Tiến độ đếm tối đa 15 hạng mục; số fixture 245 không tăng. Dữ liệu chỉ nằm trong bộ nhớ trang; tải lại hoặc mở HTML khác sẽ reset. Tech nối state xuyên route, MyVNEID và backend ở bước tích hợp; bản này không lưu/gửi dữ liệu thật. Không có dữ liệu minh chứng, pháp lý hoặc liên hệ đại diện trong trang công khai.

Chạy lại từ project: build, mở production server tại port 3001, chạy `node handoff-html/export.mjs`, sau đó `node scripts/export-phase2-handoff.mjs`. Công cụ export nằm ngoài runtime bàn giao. Header/footer là con trực tiếp body; không có wrapper `div.home` hay thẻ main. Skip-link dẫn `#main` trên section nội dung.

Homepage đã đồng bộ bố cục hiện tại, box 30Plus, slider giải thưởng và popup. QA so sánh kích thước section desktop/mobile và kiểm tra chọn nhiều hồ sơ, lịch sử, khóa trùng, bình chọn bổ sung: `qa/homepage-sync.json`. Chỉ Homepage được xuất lại trong lần đồng bộ này; CSS/JS dùng chung đã kiểm tra hồi quy ở danh sách.

## Hồ sơ review ngày 16.11.2026

21 hồ sơ từ export gốc đang ghi Chờ duyệt, không phải danh sách đã duyệt. Chỉ xuất dữ liệu công khai; dossier được đọc ở server, không đưa dữ liệu đại diện, liên hệ, MyVNE, pháp lý hoặc minh chứng riêng vào HTML/bundle. Theo yêu cầu review, toàn bộ card/gallery hồ sơ thực dùng ảnh demo Đà Nẵng/VinWonders; dữ liệu import và nội dung detail giữ nguyên. Không có tổng lượt khảo sát trong nguồn nên không tự thêm số mẫu. Sáu hạng mục chưa có hồ sơ bị khóa trong popup.

30Plus tiếp tục dùng fixture riêng, nhãn Bình chọn và hành vi demo cũ; Travel Awards dùng Khảo sát/Đã khảo sát. Các trang hồ sơ mẫu cũ đã được loại khỏi bộ handoff.

QA: `node scripts/qa-phase2-handoff.mjs` kiểm tra toàn bộ HTML mới và 21 detail/popup. Kết quả: `qa/real-profiles.json`, `qa/real-homepage.json`, `qa/homepage-sync.json`. Import và whitelist: `scripts/import-voting-profiles.py`, `docs/voting-import-report.json`.
