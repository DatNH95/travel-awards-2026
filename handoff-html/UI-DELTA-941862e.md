# Delta UI bàn giao Tech — ae388cf → 941862e

**Before:** `ae388cf` — Add registration success email handoff, commit bàn giao ngay trước HEAD. **After:** `941862e` — Refine responsive pages and synchronize HTML handoff. Nếu chỉ xét bàn giao website, baseline `e4f76c8` cho cùng delta UI vì `ae388cf` chỉ thêm email/asset liên quan.

Phạm vi là hai snapshot Git đã commit. Không tính thay đổi chưa commit ở `registration-data.ts` và tài liệu review Google Sheet. Các giá trị dưới đây là CSS cuối cùng sau cascade, không phải các override trung gian. `rem` quy đổi theo root mặc định 16px.

## 1. Homepage — index.html / css/home.css

### Spacing và typography responsive

| Component / selector handoff | Before → After | Tech cập nhật |
| --- | --- | --- |
| Các section từ About đến Organizer; mobile `max-width:47.99rem` | Padding section theo token `clamp(3.5rem,7vw,7rem)`; Organizer 3.5rem; Final CTA nhân 1.2 → **32px trên/dưới** | Áp dụng cho `.home-about`, `.home-agenda`, `.home-awards`, `.home-participate`, `.home-minitalk`, `.home-tin-tuc`, `.home-final-cta`, `.home-organizer`. |
| h2 section; cùng breakpoint | Cỡ token/override riêng → **36px**, `white-space:normal` | Ngoại lệ Minitalk **48px**, Final CTA **40px**. |
| About → Agenda; desktop `min-width:48rem` | Padding theo token → About **96px top / 48px bottom**; Agenda **48px top** | Thêm line ở `home-agenda > .layout-container::before`: `top:-48px`, `inset-inline:0`, `border-top:var(--home-rule)`, không nhận pointer. Mobile line ở `top:-32px`. |
| `.home-copy`, `.home-award-group-copy`; mobile | Gap 1.5rem → **16px** | `.home-award-panel` row-gap 2.5rem → **16px**. |

### About / home-about

| Before → After | CSS / markup cần cập nhật |
| --- | --- |
| Hai đoạn giới thiệu dài → một đoạn: “Travel Awards tôn vinh những điểm đến, doanh nghiệp và dịch vụ tiêu biểu, góp phần định hình tương lai du lịch Việt Nam.” | Xóa đoạn thứ hai; giữ `type-body-large` và link Xem chi tiết. |
| Mobile “The First Signature” căn giữa, cỡ `clamp(1.5rem,9vw,var(--text-display-l))` → căn trái, theo cỡ h2 36px, được wrap | `.home-about-signature`: `justify-content:flex-start; font-size:inherit; flex-wrap:wrap`. Mỗi span vẫn nowrap. `.home-split` row-gap **40px → 16px**. |

### Agenda / home-agenda

| Before → After | CSS / interaction cần cập nhật |
| --- | --- |
| Nội dung bước 01 giải thích dài việc gửi hồ sơ → “Gửi hồ sơ đề cử hoặc tự đề cử theo từng hạng mục trên chuyên trang Travel Awards.” | Thay copy ở bước 01 theo `index.html`. |
| Bước 02 mô tả dài cả tỷ trọng/ngoại lệ → “Độc giả bình chọn song song với Hội đồng chuyên môn chấm điểm.”, tỷ trọng tách thành dòng **40% Độc giả · 60% Hội đồng** | Thêm `.home-timeline-ratio`: flex/wrap, gap **8px**, margin-top **16px**, màu text-brand; tỷ lệ weight **700**. |
| Mobile title/link xếp grid → một hàng flex title + Xem thể lệ | `.home-section-title`: flex, center, space-between, gap **16px**, margin-bottom **40px → 16px**. Link thêm `.home-agenda-rules-cta`, không shrink/nowrap. |
| Mobile copy bước 14px → **16px**; summary padding-bottom 1.5rem → **16px** | Giữ layout timeline một cột có sẵn; chỉ đổi các property này. |

### Giải thưởng / home-awards / AwardTabs

| Before → After | CSS / markup cần cập nhật |
| --- | --- |
| Panel có nhãn “Nhóm giải thưởng / …”, heading, mô tả nhóm và text CTA → bỏ nhãn + mô tả ở cả hai nhóm | Giữ heading nhóm; desktop text CTA thêm `.home-award-desktop-cta`. |
| Mobile vẫn có số 15 lớn và CTA trong phần giới thiệu nhóm → ẩn số 15, CTA dạng button đặt **sau danh sách hạng mục** | `.home-awards-count{display:none}` trên mobile. Thêm `.home-award-mobile-cta.cta-mobile-dang-ky` ở cả hai panel; mobile `display:inline-flex; margin-top:16px; width:100%`; desktop ẩn button mới. Mobile ẩn text CTA desktop. |

### Hướng dẫn đề cử / home-participate

| Before → After | CSS / asset / interaction cần cập nhật |
| --- | --- |
| Logo Travel Awards dưới heading → ornament signature gốc | Thay `.home-participate-logo` bằng `.home-participate-ornament[aria-hidden=true]`, dùng SVG signature của bộ asset hiện có. Width **180px**, margin-top **24px**, pointer-events none; mobile **120px / 16px**. Không tạo artwork mới. |
| Ba hàng có border-top ngang, số dạng text → timeline dọc liên tục với marker tròn | `.home-steps`: grid, gap **16px**; từng hàng bỏ border-top, padding-block **24px → 0**, gap **24px → 16px**. Marker **40×40px**, border token border-strong, radius **50%**, nền brand-soft, chữ text-brand **14px/600**. |
| Không có đường nối dọc → có đường nối giữa 01–02–03 | Pseudo `::before` ở hai hàng đầu: `left:1.25rem; top:40px; bottom:-16px; border-left:var(--home-rule)`, không nhận pointer. |
| Copy 01 “Tìm hạng mục phù hợp với dấu ấn bạn muốn đề cử.” → “Chọn hạng mục phù hợp với dấu ấn của bạn.”; copy 02 “Kể câu chuyện…” → “Chuẩn bị thông tin và minh chứng cho đề cử.” | Paragraph margin-top **8px → 16px**; mobile font **14px → 16px**. |
| CTA cách nhóm bước 24px → nằm ngay hàng tiếp sau bước 03 theo grid gap **16px** | `.home-steps > .home-cta{margin-top:0}`; thêm `.cta-mobile-dang-ky`. `.home-participate .home-split`: align-items start, column-gap `clamp(24px,3vw,48px)` thay gap 7%; mobile row-gap **16px**. |
| Marker tĩnh → pulse viền nhẹ | `nomination-step-pulse`: **6s ease-in-out infinite**, peak shadow 6px với brand-accent 35%; delay 01/02/03: **0/1/2s**. Reduced motion tắt animation. |

### Minitalk / Tin tức / Final CTA / Organizer / Footer

| Vùng | Before → After | Tech cập nhật |
| --- | --- | --- |
| Minitalk | Mô tả dài → “Chăm da khoa học và dưỡng da đa nhiệm trong mỗi hành trình du lịch.”; mobile gap grid 40px/copy 24px → **16px** | Heading mobile **48px**; giữ reminder ngày 23/10. |
| Tin tức | Mobile lead bài chính hiện → **ẩn**; title 32px chính / 24px phụ → **20px cho cả bốn bài** | `.home-news-lead{display:none}`; `.home-tin-tuc .home-news-item h3.type-news-title{font-size:20px}` trong breakpoint mobile. |
| Font Tin tức của HTML | Homepage không được gán biến font sau khi loại class Next → dùng đúng Merriweather | Trong `css/base.css` và reset của exporter: `.news-site, .home-tin-tuc{--font-news-title:HandoffNews}`. Dùng font `fonts/merriweather/merriweather-bold.ttf` sẵn có; font-weight **700**, line-height title **1.6** giữ nguyên. Sửa này loại lệch chiều cao **32px** tại `#news` ở 390px. |
| Final CTA | Mobile CTA rộng 160px → **100% container** | Thêm class `.cta-mobile-dang-ky`; heading mobile **40px**. |
| Organizer | Mobile flex wrap → **grid 2 cột** | `repeat(2,minmax(0,1fr))`, width100%, gap16px, align-items start; unit gap **24px → 16px**; label **18px → 14px/1.4**, letter-spacing0; logo width **288px → min(160px,100%)**. Desktop label **18px → 16px**. |
| Footer dùng chung | Mobile utilities dạng flex cột → **grid 2 cột**; bỏ chữ Travel Awards 2026 ở footer-bottom | Gap16px, width100%, wrapper con `display:contents`; utility căn giữa. Thứ tự: Trở lại VnExpress / Điều khoản → Fanpage / Góp ý → Về đầu trang chiếm cả hàng. |

### Reveal và CTA dùng chung

| Before → After | Tech cập nhật |
| --- | --- |
| Homepage không mount ScrollReveal → mount, chỉ reveal **h2 section** một lần trong mỗi page visit | HTML dùng `.wrap-homepage > section h2`, class `.home-heading-enter`, IntersectionObserver threshold **0.05**, rootMargin bottom **-32px**, unobserve khi đã vào viewport. Reduced motion không chạy và bỏ class khi preference đổi. Không gắn reveal cả block/h3/timeline. |
| CTA đề cử chỉ có kích thước chuẩn → thêm biến thể mobile | Trong `css/base.css`: dưới `47.99rem`, `.button.button--nomination.cta-mobile-dang-ky{width:100%;min-width:0}`. Gắn ở Awards mobile, Participate và Final CTA. Cao **55px**, chữ **15px/140%**, arrow **12px** giữ theo CTA chuẩn. Design System thêm specimen `#cta-mobile-dang-ky`. |

## 2. Thể lệ — the-le.html / css/rules.css

| Component | Before → After | CSS / DOM / interaction cần cập nhật |
| --- | --- | --- |
| Nền trang | `#f7f7f7` → `var(--color-surface-primary)` | `.rules-site`. |
| Title các phần nội dung | Có số 01–06 cạnh h2 → bỏ số | Bỏ span số trong `.rules-section-title`; giữ ID section. |
| Hồ sơ đề cử | `<ol>` marker mặc định → ba marker tròn 01/02/03 | `.rules-dossier`: list-style none, padding-left0; li flex/gap16px; thêm `.rules-dossier-step` **40×40px**, flex-basis40px, border/radius50%, nền brand-soft, chữ brand **14px/600/1**. Mobile gap12px. |
| Mục lục mobile `max-width:640px` | Grid hai cột, nằm trong sidebar tĩnh → **thanh ngang cuộn, sticky top0**, tràn ra sát hai mép container | Aside và `.rules-sidebar-sticky` display contents; nav overflow-x auto, scrollbar ẩn, overscroll-x contain; width `calc(100% + var(--spacing-gutter)*2)`, margin-inline âm gutter; ol flex/width max-content/min-width100%, gap8px, padding-inline gutter. |
| Item mục lục mobile | Có số, border/background active → không số, active bằng underline | Ẩn span số. Link min-height44px, padding **10px 14px 20px**, font15px/1.4, nowrap. Active/hover nền transparent, border-bottom transparent, underline brand **2px**, offset **16px**. Focus outline **2px** brand, offset **-3px**. Nav nền primary, shadow `0 4px 16px` text-primary 10%, z-index40, padding-block8px 6px, margin-bottom24px. |
| Header Thể lệ khi cuộn mobile | Brand row sticky theo CSS dùng chung → brand row position static trong trạng thái nav data-scrolled=true | `.home-header-inner` padding-top0; brand-row padding-inline0, box-shadow none. |
| Anchor và active mục lục | Theo offset 100px mobile/160px desktop → cộng `html.scroll-padding-top` thực tế (**32px** hiện tại) | Scrollspy ngưỡng **132px/192px**, rAF scroll/resize; aria-current location đúng section. Mobile tự cuộn ngang đưa mục active vào vùng nhìn; reduced motion dùng instant. Link `#criteria-*` tự mở details rồi scroll. Section/criteria mobile scroll-margin-top cuối cùng **92px**. |
| Quảng cáo mobile | Hiện `.rules-ad` → **ẩn** | CSS dùng chung `home.css`, dưới47.99rem, cũng ẩn `.home-news-ad`, `.news-ad`, `.news-sidebar`. |

### Typography/spacing Thể lệ mobile ≤640px — giá trị cuối cần thay

| Selector / role | Before → After |
| --- | --- |
| `.rules-section-title h2` | Heading-3 token → **24px/1.35/600**, text-wrap balance; title margin-bottom **24px → 16px**. |
| `.rules-signature h3` | Heading-3 token → **20px/1.4/600**; box padding **20px**, margin-top **32px → 24px**. |
| Heading nhóm awards/criteria | Body-large 18px → **18px/1.4/600**; group heading gap8px, padding-bottom **16px → 12px**. |
| Link tên award / title summary criteria | Body-large hoặc kế thừa → **16px/1.45/600**; award li gap **16px → 10px**, padding-block **20px → 16px**; index **12px**, line-height24px, min-width20px. |
| Body section/signature/pending; mô tả award/timeline/dossier; criteria body/link | Kế thừa hoặc role cũ → **16px/1.6**; mô tả award margin-top **8px → 6px**. |
| Timeline/dossier/pending h3 | Body-large18px → **17px/1.4/600**, margin-bottom8px. |
| Timeline eyebrow, số lượng hạng mục, legend, ratio | Caption/body-small cũ → **14px/1.5**; eyebrow weight600, letter-spacing .03em; legend gap **8px 16px**. |
| Criteria summary | Flex wrap → **grid `20px minmax(0,1fr) 32px`**, gap **6px 10px**, padding-block **16px**. Ratio ở cột2/hàng2; plus ở cột3/hàng1, width32px, line-height24px. |
| Criteria body / dossier / pending | Body padding-bottom **24px → 20px**, li kế nhau gap **8px → 10px**, link min-height44px. Dossier margin-top24px, li margin-bottom **20px → 24px**; pending padding **24px → 20px**. |

## 3. Đăng ký / xác nhận / thành công — css/nomination.css

Áp dụng các template `dang-ky-de-cu.html`, `dang-ky-tru-cot-*.html`, `dang-ky-tien-phong-*.html`, `chinh-sua-ho-so.html`, `xac-nhan*.html`, `thanh-cong.html`, `cap-nhat-thanh-cong.html` theo thành phần hiện diện. Breakpoint nhóm này là **max-width:39.99rem**.

| Component | Before → After | CSS / interaction cần cập nhật |
| --- | --- | --- |
| Thông báo mobile | Không có → dialog “Đăng ký đề cử”, copy “Vui lòng truy cập bằng thiết bị desktop/laptop để trải nghiệm đăng ký được tốt nhất.”, nút “Đã hiểu” | `.nomination-mobile-notice` padding24px; button width100%, height/min-height42px, padding-block8px. Mở một lần với localStorage key `travel-awards-mobile-registration-notice-seen`; bấm Đã hiểu đóng. Không mở nếu storage không khả dụng. |
| Progress mobile | Số44px + label bước hiện tại; không có connector → **số36px/14px**, ẩn toàn bộ label và “Các bước tham gia”, có connector | ol margin-top0/gap0; button min-height44px, padding4px, justify-content center, nền transparent kể cả current. Connector top22px, left `calc(50% + 18px)`, width `calc(100% - 36px)`, height1px; complete màu action-primary. Số bước hoàn tất đổi sang **✓**. |
| Countdown mobile | Circle56px, số/separator20px → **48px / 18px** | Label vẫn10px; chỉ áp dụng nomination. |
| Step 1 | Legend hướng dẫn + status dưới danh sách ở mọi size → mobile legend chứa status, ẩn status phía dưới | `.nomination-choice-desktop-lead/status` display none mobile; `.nomination-choice-mobile-status` display inline, role status; khi đã chọn màu action-primary. Desktop giữ legend/status cũ. |
| Note Step 1 | Body-small14px → **16px/1.5** | `#nomination-choice-help`. |
| Note bắt buộc Step 2 | type-body-small → **type-body-large**, 16px | Heading Step 2/selection/note dùng line-height1.4 ngoài mobile; mobile note body-large cuối cùng1.5. |
| Lưu hồ sơ mobile Step 2 | Nút inline riêng width theo nội dung → wrapper `.nomination-mobile-inline-actions` | Wrapper flex, gap12px, margin-top24px; một button width100%, **42px**, padding8px 12px, font14px/1.4. Desktop wrapper display none; vẫn có nút Lưu lại hồ sơ trong action desktop. |
| Back button | Step 2 “Quay lại”; Step 3 “Quay lại chỉnh sửa” → mobile “Chọn giải thưởng” / “Chỉnh sửa hồ sơ” | Hai span `.nomination-button-desktop-label` / `-mobile-label`, hoán đổi display tại breakpoint. Handler giữ tác vụ quay về bước tương ứng. |
| Chỉnh sửa hồ sơ | Có lead “Bạn có thể chỉnh sửa nội dung, thêm hoặc thay thế tệp…” → bỏ lead này | Bỏ paragraph riêng phía trước RegistrationFields. |
| Success hotline mobile | Wrapper contact theo nội dung → **width100%** | `.nomination-success > .nomination-success-actions .nomination-hotline-contact`. |
| Khoảng đầu content mobile | Content có border-top/padding-top theo rule responsive cũ → **border-top0; padding-top0** | Layout giữ padding-top24px, border-top token, gap24px; không thêm line thứ hai. |

### Typography nomination mobile — giá trị cuối cần thay

| Role / selector | Before → After |
| --- | --- |
| Step heading / success h2 | Heading role cũ → **24px/1.4**. |
| Legend/h3 title phần form | 30px → **22px/1.4**. |
| Registration/confirmation/success body, body-large p, review dd, checks/evidence | Kế thừa/token cũ → **16px/1.5**. |
| h3/h4 type-body-large trong registration/confirmation | Role cũ → **18px/1.4**. |
| Field label, legal legend, review dt; type-body-small; hint trước submit | Role cũ → **14px/1.5**. |
| Input/textarea/phone input | Kế thừa form → **16px/1.5**. |
| Success button / nút lưu mobile | Role button cũ → **14px/1.4**. |
| Dialog h2 / paragraph | Role cũ → **22px/1.4** / **16px/1.5**. |

## 4. Delta asset, hành vi HTML và bằng chứng kiểm tra

| Hạng mục | Delta |
| --- | --- |
| Asset trong bundle website | Thêm bản copy `assets/key-visual/email dang ky ho so.svg` từ public asset đã có ở baseline; SHA-256 khớp nguồn. Website không thêm vị trí render asset này; template email không đổi trong delta. |
| JS thuần | `js/handoff.js` thêm mobile notice/Đã hiểu, rules scrollspy/hash-open và reveal h2 như các mục trên. Chỉ lưu cờ notice; không thêm lưu hồ sơ/API/upload. |
| Sửa exporter | Gán biến font Homepage News để các lần export sau không mất Merriweather; file cần cập nhật `export.mjs` cùng `css/base.css`. |
| QA đã lưu tại commit after | `qa/report.json`: 50 lượt đối chiếu1440px/390px, không lỗi; bỏ assertion chiều cao bài chi tiết tin theo yêu cầu trước đó. `qa/shell-report.json`: shell/link110 file, 16 responsive checks, 3 countdown phases, không lỗi. Source build và TypeScript đạt. |

Các file HTML bài tin được export lại do footer dùng chung thay đổi; không có delta nội dung bài tin. Tài liệu này mô tả delta từ Git và báo cáo QA đã commit; không phải một lượt chạy browser mới.
