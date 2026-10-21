# Travel Awards — Phase 2

Bản HTML/CSS thuần cho Tech: `index.html` (Homepage), `binh-chon.html` (15 hạng mục qua query `?category=...`) và 150 trang `ho-so-*.html`. Giữ folder này cạnh `handoff-html/` để link Thể lệ/Tin tức Phase 1 hoạt động.

Không có React/Next.js/Tailwind runtime. CSS foundation và asset được đóng gói tại chỗ; ảnh hồ sơ/tin tức demo vẫn dùng URL gốc. Giữ credit Uicons by Flaticon và các giấy phép đi kèm.

`js/handoff.js` chỉ mô phỏng filter/search, khảo sát, share, gallery và slider. Khảo sát chỉ ghi nhận sau khi trả lời đủ; khóa một hồ sơ trong mỗi hạng mục, không tăng số fixture 245. Dữ liệu chỉ nằm trong bộ nhớ trang; tải lại hoặc mở HTML khác sẽ reset. Tech nối state xuyên route, MyVNEID và backend ở bước tích hợp; bản này không lưu/gửi dữ liệu thật. Không có dữ liệu minh chứng, pháp lý hoặc liên hệ đại diện trong trang công khai.

Chạy lại từ project: build, mở production server tại port 3001, chạy `node handoff-html/export.mjs`, sau đó `node scripts/export-phase2-handoff.mjs`. Công cụ export nằm ngoài runtime bàn giao. Header/footer là con trực tiếp body; không có wrapper `div.home` hay thẻ main. Skip-link dẫn `#main` trên section nội dung.
