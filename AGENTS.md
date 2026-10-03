<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Travel Awards 2026 — Project handoff

## Quy trình đẩy lên GitHub

Khi người dùng nói "Đẩy lên GitHub", thực hiện theo thứ tự:

1. Kiểm tra `git status`.
2. Chỉ commit thay đổi thuộc project, không commit file phát sinh ngoài ý muốn; kiểm tra phạm vi thay đổi trước khi stage.
3. Chạy kiểm tra cần thiết cho phần code vừa sửa.
4. Chạy `git add .` sau khi xác nhận toàn bộ thay đổi đều thuộc phạm vi commit.
5. Tạo commit message ngắn mô tả thay đổi và commit.
6. Chạy `git push origin main`.

Nếu có file bất thường, conflict hoặc build/check lỗi thì dừng và báo người dùng trước khi push. Không tự đưa file bất thường vào commit để tiếp tục quy trình.

Package manager của project là **pnpm**. Không dùng `npm install`.

- Ưu tiên người dùng: tiết kiệm tối đa token ở các yêu cầu tiếp theo; trao đổi ngắn, chỉ kiểm tra/đọc phần cần thiết nhưng vẫn hoàn thành yêu cầu.
- Step 2 có nút Lưu lại hồ sơ cạnh Tiếp tục, mở dialog xác nhận theo copy người dùng. Chỉ mô phỏng front-end, không gọi backend hoặc lưu bền vững.

### Nomination 03.10.2026 — Prompt 02

- Đối chiếu sheet mới: tab form đăng ký, A81:A165 chứa mục III của 5 hạng mục Trụ cột còn lại; toàn bộ trường và minh chứng đã khớp registration-data.ts. Tab Nhóm giải thưởng khác đã được gộp vào tab form đăng ký. Chưa có phần III riêng Tiên phong trong vùng bổ sung.

- Form đăng ký: viền focus #23aaff; viền và thông báo lỗi #da0803, lỗi ưu tiên khi ô vẫn đang focus. Áp dụng input/textarea, ô điện thoại và URL; không đổi focus token toàn website.
- Refinement mới: cụm breadcrumb/title/countdown cách menu header 24pt (32px), chỉ áp dụng trang đăng ký.
- Dấu sao bắt buộc màu đỏ; Người đại diện chỉ là title, Họ và tên/điện thoại/email bắt buộc, chức vụ tùy chọn. Mã quốc gia nằm trong ô điện thoại, mặc định Việt Nam; libphonenumber-js 1.13.14 kiểm tra số quốc tế, email/số sai hiện lỗi nội tuyến.
- Hình ảnh tùy chọn, mỗi ảnh 1–10MB, PNG/JPG/JPEG/WebP/GIF/AVIF/HEIC/HEIF. Hồ sơ giới thiệu PDF/PPT/PPTX tối đa 20MB mỗi tệp. Pháp lý gồm upload PDF/DOC/DOCX và ô link bản scan (cung cấp ít nhất một cách). Video link full-width có icon quả cầu và placeholder https://. Tệp chọn thêm được cộng dồn, bỏ trùng và có nút bỏ từng tệp; chưa upload thật.
- Build/TypeScript đạt; kiểm tra lỗi liên hệ, ngưỡng dung lượng, đổi quốc gia, Next/Back giữ tệp/dữ liệu và mobile 390px không tràn. Native required validation chặn chuyển bước khi thiếu thông tin.

- Cập nhật mới: gộp steps 03/04/05 vào step 02 Thông tin đăng ký, tiến trình còn 4 bước Chọn giải thưởng → Thông tin đăng ký → Xác nhận → Thành công. Step 2 có các phần thông tin đăng ký/đại diện, thông tin đề cử, số liệu chuyên môn theo 6 hạng mục Trụ cột, điều kiện tuân thủ, hồ sơ và minh chứng từ Google Sheet `1ZRUXD1NWpcISnEUJFeiCT2U8hgSYiSRRBwSAVDZ1PIc` (tabs form đăng ký và Nhóm giải thưởng khác).
- Trường Cơ quan/đơn vị đại diện đề cử chỉ hiện cho Điểm đến du lịch của năm. Sheet chưa có trường chuyên môn riêng cho 9 Tiên phong; hiện phần chung và ghi chú chờ bổ sung, không tự đặt trường chuyên môn.
- Draft thông tin và tệp giữ trong phiên component khi Back/Next; chưa có backend/upload thật, validation bắt buộc, email/điện thoại và định dạng/dung lượng tệp đã triển khai; giới hạn số từ chưa triển khai. Step 3 vẫn trạng thái chờ, chưa gửi hồ sơ hoặc mở Thành công. Những ghi chú cũ “chỉ step 1 / 7 bước” bên dưới được thay thế bởi cập nhật này.
- Cụm title/lead đầu trang được gom thành một khối bên trái countdown, gap 0.5rem; title line-height 1.2 và lead 1.4 theo refinement mới, chỉ áp dụng trang đăng ký. Build/TypeScript đạt; browser kiểm tra đủ 6 cấu hình chuyên môn, Tiên phong, Back/Next giữ dữ liệu, mobile 390px không tràn và console sạch.
- Intro trang đăng ký dùng breadcrumb “Trang chủ / Đăng ký” thay Travel Awards 2026. Countdown chung Homepage đặt bên phải ngang hàng title trên desktop, xếp dưới title trên mobile; nhãn “Thời gian nhận đề cử còn lại:”, giữ deadline và style ô tròn/blur Homepage.
- Step 1 dùng lưu ý chung cho Trụ cột và Tiên phong: “Lưu ý: Mỗi hồ sơ chỉ đăng ký cho một hạng mục. Trường hợp muốn tham gia nhiều hạng mục, vui lòng thực hiện hồ sơ riêng cho từng hạng mục.” Thay dòng mô tả Hai nhóm giải thưởng, 15 hạng mục; vẫn chọn một hạng mục mỗi hồ sơ.
- Route đăng ký đã đổi thành `/dang-ky-de-cu`; toàn bộ internal link/CTA cập nhật cùng route này. Chỉ đổi route, không đổi UI/logic hoặc thêm redirect cho route cũ.
- Nền riêng trang `/dang-ky-de-cu` dùng `#f5f5f5` theo yêu cầu người dùng; header/footer Phase 1 giữ nền hiện có, không đổi token foundation.
- Theo yêu cầu bổ sung, `/dang-ky-de-cu` giữ nguyên header/footer Homepage Phase 1 qua `SiteHeader` / `SiteFooter` dùng chung cùng CSS hiện có. Link Thể lệ / Tin tức / Giải thưởng từ nomination dẫn về section Homepage; Về đầu trang vẫn về đầu trang hiện tại. Homepage giữ giao diện và hành vi cũ.
- `/dang-ky-de-cu` dùng App Router hiện có: application shell, progress 7 bước, Step 1 chọn một hạng mục và Back/Next; desktop progress trái / form phải, mobile một cột progress trên.
- Dữ liệu 6 Trụ cột / 9 Tiên phong chuyển nguyên văn từ AwardTabs sang `src/data/awards.ts`; Homepage và nomination dùng chung, không thay giao diện/copy Homepage.
- Tiếp tục khóa khi chưa chọn; sau khi chọn chỉ mở trạng thái chờ bước 2. Quay lại bằng nút hoặc progress giữ lựa chọn trong phiên component; reload không lưu lựa chọn. Các bước khác chưa mở, chưa có form bước sau, backend, upload hoặc animation.
- Build và TypeScript đạt; browser kiểm tra desktop, mobile 390px không tràn ngang, chọn hạng mục ở cả hai nhóm, Next/Back giữ lựa chọn, Homepage và link về trang chủ; console không có lỗi/cảnh báo.
- Các mô tả `/dang-ky-de-cu` là trang thông báo ở phần handoff cũ bên dưới đã được thay thế bởi iteration này. Tiếp tục các bước sau chỉ khi có brief mới.

### Refinement 03.10.2026 — Tin tức và đăng ký đề cử

- Box News Homepage: tiêu đề **Tin tức** là link `/tin-tuc`; thêm **Xem tất cả ↗** cạnh tiêu đề cùng dẫn folder `/tin-tuc`.

- Link **Tin tức** trên header dùng `/tin-tuc` thay anchor #news; active trên trang danh sách và bài chi tiết `/tin-tuc/[slug]`.

- Link từng hạng mục ở cả hai tab dẫn `/dang-ky-de-cu?category=tru-cot-1`…`tru-cot-6` hoặc `tien-phong-1`…`tien-phong-9`; trang đăng ký tự chọn đúng radio tại bước 1 và cho đổi lựa chọn. Query không hợp lệ/không có query giữ trạng thái chưa chọn. Mapping dùng chung trong `src/data/awards.ts`, NominationFlow đọc query trong Suspense; reload URL giữ lựa chọn ban đầu.

- CTA Đăng ký đề cử chuẩn dùng component `NominationCTA` trong primitives, có SVG arrow ↗ currentColor, kích thước token 160×55px. Header/Hero/tham gia/Final CTA cùng dùng component này; có specimen `/design-system#controls`. Khi thêm button đề cử ở trang sau, dùng NominationCTA thay vì tự dựng style; text link giữ vai trò riêng.

- Mọi button Đăng ký đề cử trên Homepage (header/Hero/tham gia/Final CTA) cùng kích thước: cao 3.25rem, padding .875rem 1.125rem, chữ 15px/140%, width fit-content; bỏ mũi tên phụ để width đồng nhất. Text link Awards giữ vai trò riêng. Arrow Khám phá hành trình chuyển động xuống nhẹ 2 nhịp rồi nghỉ, lặp chu kỳ 3 giây; reduced motion tắt.

- CTA Hero dùng width fit-content, padding ngang 1.125rem, gap .75rem và letter-spacing .02em để gọn theo nhãn; thay width cố định 15rem.

- Ngoại lệ typography campaign: **Glow On The Go** và **Dấu ấn tiếp theo. Có thể là bạn.** trả giãn dòng về .98 như ban đầu; heading thông thường giữ 140%.

- Quy ước mới: toàn bộ token display/heading dùng line-height **140%** (thay 160%), áp dụng Design System và các trang sau; giãn dòng title bài News vẫn 160%. Chỉ cụm **giải thưởng** trong heading Awards dùng Logo blue `--color-brand-primary` (#0076BE); phần chữ còn lại và title Đăng ký giữ màu nền tảng. Khi làm UI, dùng màu chọn lọc cho từ/cụm được chỉ định để tạo điểm nhấn, không tự tô cả tiêu đề. Minitalk bỏ override .98. Mọi CTA đề cử thống nhất nhãn **Đăng ký đề cử**, route `/dang-ky-de-cu`; Hero CTA rộng 15rem để nhãn mới không xuống dòng.

- Header menu dùng font-size 15px và thêm CTA **Đăng ký đề cử** sau Tin tức, style button primary Design System, dẫn `/dang-ky-de-cu`; dùng chung Homepage và trang đề cử. Mọi CTA Gửi đề cử đã kiểm tra cùng dẫn `/dang-ky-de-cu`.

- Sửa nhấp nháy reveal khi cuộn lên tại Final CTA: theo dõi vị trí layout bằng offset (không chịu ảnh hưởng transform/clip-path), cập nhật qua requestAnimationFrame khi scroll/resize. Entry cách mép 32px; chỉ reset sau khi ra ngoài viewport 64px để tránh bật/tắt ở ranh giới. Vẫn replay hai chiều và tôn trọng reduced motion.

- Scroll reveal **chạy lại khi nội dung vào viewport ở cả chiều cuộn xuống và lên** trên toàn Homepage, gồm Hero title; reset class khi rời viewport, không unobserve sau lần đầu. Hero giữ kiểu signature-reveal; heading khác mở chữ trái sang phải. Reduced motion tắt hiệu ứng; count-up 15 vẫn một lần.
- Tránh nhấp nháy reveal: clip-path có thể làm observer báo không giao nhau giữa animation; chỉ xóa class khi bounding box thực sự ra ngoài viewport, không reset theo isIntersecting=false đơn thuần.

- Header có icon thông báo `public/assets/key-visual/notification.svg` 20×20 đặt sau chữ Đăng nhập; chỉ hiển thị icon, chưa có popup hay chức năng thông báo.

- Quy ước mới: **title heading section 38pt = 50.667px**, dùng `--text-display-l` / `type-display-l` trên Homepage và các page sau này; ghi trong specimen Typography Design System. Thay các override 38px của Awards và 40px của tiêu đề Tin tức. Title bài tin/hạng mục và typography campaign Hero/Minitalk/Final CTA vẫn giữ vai trò riêng.

- Awards heading hai dòng **Hạng mục giải thưởng / Travel Awards**, dùng chuẩn heading mới **38pt (50.667px)**, giữ cụm **giải thưởng** cùng một dòng; lead **Hai nhóm giải thưởng chính, 15 hạng mục.** Giữ count-up 15 và layout tabs.

- Tiên phong đã có đủ 9 tên theo thứ tự người dùng cung cấp trong `pioneeringCategories`: Nhân vật du lịch; Sáng kiến du lịch bền vững; Điểm đến du lịch xanh; Sản phẩm du lịch sáng tạo; Chuyển đổi số xuất sắc; Làng du lịch cộng đồng; Trải nghiệm ẩm thực; Gương mặt truyền thông (Đại sứ); Chiến dịch quảng bá. Bỏ toàn bộ placeholder/pending ở cả hai tab; cùng text link tới `#participate` và hover/focus như Trụ cột. Tiêu chí và trang chi tiết từng hạng mục vẫn chưa được cung cấp.

- Trụ cột có 6 tên chính thức người dùng cung cấp: Điểm đến du lịch của năm; Doanh nghiệp lữ hành của năm; Khách sạn của năm; Khu nghỉ dưỡng của năm (Resort); Hãng hàng không du lịch của năm; Trải nghiệm du lịch của năm. Bỏ Chờ công bố và note pending; link hạng mục dẫn tới hướng dẫn tham gia `#participate`, hover/focus đổi màu brand, underline và hiện mũi tên; chưa có tiêu chí/trang chi tiết hạng mục.

- About: **The First Signature** dùng màu `--color-action-primary` (#0076BE), cùng nền nút Gửi đề cử; thay quyết định màu signature green trước đó. Typography và bố cục giữ nguyên.
- Theo yêu cầu mới **bỏ line ngăn cách About và Agenda**, giữ whitespace hiện có. Homepage bỏ toàn bộ chapter label nhỏ có số thứ tự ở đầu section (About/Journey/Awards); title chính giữ nguyên. **Section heading vẫn giữ trong Design System** theo xác nhận của người dùng.
- Hero countdown có ba dấu **:** ngăn giữa bốn ô Ngày / Giờ / Phút / Giây, căn giữa theo chiều dọc; ô tròn và blur giữ nguyên, dấu phân cách decorative aria-hidden.

- Agenda bước 02 Sơ loại / Chung kết dùng copy mới bắt đầu **Công bố danh sách đề cử. Độc giả tiếp tục bình chọn…**, nêu tỷ trọng 40% độc giả / 60% Hội đồng và ngoại lệ Giải Bình chọn. Theo yêu cầu mới hiển thị **toàn bộ lead**, bỏ giới hạn 38 từ và dấu …; giữ bố cục ba cột và hàng cùng chiều cao.
- Agenda bước 03 Vinh danh dùng lead **Công bố các đề cử trúng giải, hoạt động bên lề Gala vinh danh.**; hiển thị đầy đủ, không dấu ….

- Minitalk bỏ chapter label 05 và Travel. Ideas. Inspiration.; **Đẹp không dịch chuyển** nằm ở đầu cột phải, thay cụm Đi để khám phá / Gặp để mở lối; cột trái chỉ giữ Glow On The Go. Mô tả dùng copy người dùng về tư duy chăm da khoa học, lối sống hiện đại và dưỡng da đa nhiệm trong hành trình du lịch. Thay Sắp công bố bằng icon `notification.svg` rung nhẹ theo nhịp có nghỉ và **Tập đầu tiên ngày 23/10.**; reduced motion tắt rung. Không thêm chức năng đăng ký nhắc nhở.

- Mục 04 bỏ chapter label **Đăng ký đề cử**; tiêu đề chia hai dòng **Đăng ký / tham gia đề cử**. Text link **Hướng dẫn đăng ký** dưới tiêu đề cuộn tới ba bước hiện có (`#nomination-guide`). Bỏ ornament/star dưới link; vùng tròn radial gradient aqua/mint/blue đặt lệch trái hắt vào cụm chữ, CSS lan tỏa chậm chu kỳ 7 giây (scale .94–1.18, opacity .8–1), chữ đứng yên, không cản thao tác. Reduced motion giữ vùng màu tĩnh. Không thêm form hoặc trang hướng dẫn mới.
- News đổi tiêu đề thành **Tin tức**, bỏ nhãn preview/category và lead; người dùng đã xác nhận **4 tin: 1 chính + 3 phụ**. Desktop tin chính bên trái có thumbnail lớn, ba tin phụ xếp dọc bên phải; mọi ảnh crop **5:3**. Giữ font và reveal heading của foundation.
- Hover title đổi màu semantic text-brand; hover ảnh zoom nhẹ 1.035 trong 600ms, crop trong khung cố định, reduced motion tắt zoom.
- Typography News title chính **24pt = 32px**, ba tin phụ **18pt = 24px**, cùng giãn dòng **160%** (người dùng đã xác nhận là line-height, không phải padding). Token `--text-news-title`, `--text-news-title-secondary`, `--text-news-title--line-height`; có specimen trong `/design-system#typography`.
- Tiêu đề section **Tin tức** giảm xuống **30pt = 40px**, dùng token `--text-news-section-title`; cỡ title bài giữ nguyên.
- Demo bốn bài từ VnExpress Du lịch: Tà Xùa được vinh danh, tour kiểm lâm Cát Tiên, Cao Bằng mùa gặt và Phong Nha - Kẻ Bàng; dùng ảnh CDN gốc và link bài gốc. Đây là dữ liệu demo được người dùng yêu cầu; thay bằng tin campaign khi có nội dung chính thức, không tự thêm nhãn preview lên giao diện.

Cập nhật: 02.10.2026. Tổng hợp từ lịch sử trao đổi và code hiện tại. Đọc file này trước khi tiếp tục; yêu cầu mới của người dùng luôn được ưu tiên. Giữ nguyên khối hướng dẫn Next.js tự sinh ở trên.

## 1. Vai trò và phạm vi hiện tại

- Làm việc như Senior Front-end Engineer có tư duy Product Design và Design System; trao đổi bằng tiếng Việt, ngắn gọn, dễ hiểu.
- Foundation, KV V2 và Homepage Phase 1 đã được dựng. Người dùng đang refinement Homepage theo từng khu vực, không yêu cầu thiết kế lại.
- Ưu tiên desktop visual/composition. Mobile có bố cục cơ bản, chưa refinement đầy đủ.
- Làm trực tiếp trong repo; không chỉ đưa code để người dùng tự copy. Giữ thay đổi trong phạm vi block được yêu cầu, không refactor foundation hoặc thêm dependency/component nếu không cần.
- Chưa làm backend, nomination form, voting hay các phase sự kiện tiếp theo. Không tự triển khai các phần này từ checklist.

## 2. Tech stack và chạy local

- Next.js **16.3.8**, App Router; React / React DOM **19.3.0**.
- TypeScript **7.0.2**, strict mode; alias `@/*` → `src/*`.
- Tailwind CSS **4.3.3**, PostCSS `@tailwindcss/postcss`; theme khai báo trong CSS bằng `@theme static`, không dùng cấu hình Tailwind v3.
- pnpm **11.19.0**; README yêu cầu Node.js **20.9+**. Dependencies được pin trong `package.json` và `pnpm-lock.yaml`.
- Không có backend/CMS, thư viện animation, component library hoặc test runner riêng.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm typecheck
pnpm start
pnpm assets:generate
```

- Local: `http://127.0.0.1:3000/`. Dev/start bind `127.0.0.1`.
- Nếu pnpm không có trong shell nhưng Node có: dùng `node node_modules/next/dist/bin/next dev --hostname 127.0.0.1`, `node node_modules/next/dist/bin/next build`, `node node_modules/typescript/bin/tsc --noEmit`.
- Production server phải restart sau build và browser phải reload. Không đoán session ID cũ; kiểm tra server hiện tại trước khi khởi chạy thêm.
- Trên môi trường Windows sandbox này, build từng gặp `spawn EPERM` ở worker TypeScript; chạy lại cùng build với quyền được công cụ cho phép đã thành công. Đây không phải lỗi compile của code.

## 3. Cấu trúc và file cần tìm

| File/thư mục | Vai trò |
| --- | --- |
| `src/app/page.tsx` | Homepage; copy, thứ tự section, header/footer, helper `NominationLink` và `ChapterLabel` |
| `src/app/home.css` | Composition riêng Homepage; selector `home-*`; serif exception của About |
| `src/app/globals.css` | Base styles, primitive classes, typography, surfaces, preview layout, keyframes, reduced motion |
| `src/styles/tokens.css` | Palette semantic, typography, spacing, grid, image ratios và motion tokens |
| `src/app/layout.tsx` | Root layout tiếng Việt, skip link `#main`, metadata mặc định; hiện `robots` noindex/nofollow |
| `src/app/design-system/page.tsx` | Trang review foundation `/design-system` |
| `src/app/dang-ky-de-cu/page.tsx` | `/dang-ky-de-cu`: thông báo sẽ cập nhật, không phải form |
| `src/components/primitives.tsx` | `Container`, `Section`, `Surface`, `Eyebrow`, `SectionHeading`, `Button`, `TextLink`, `ResponsiveImage` |
| `src/components/brand-graphics.tsx` | `BrandGraphic`, `SignatureDivider`, `SectionMarker`, `GraphicAccent` |
| `src/components/award-tabs.tsx` | Tabs Trụ cột/Tiên phong, keyboard navigation, 6/9 entries placeholder |
| `src/components/scroll-reveal.tsx` | Client observer cho reveal khi cuộn Homepage |
| `src/components/hero-stage.tsx` | Hero parallax nhẹ trên PNG V2 và countdown ngày/giờ/phút/giây |
| `src/components/motion.tsx`, `motion-preview.tsx` | Primitive motion và demo replay trong Design System |
| `src/components/foundation-refinements.tsx` | Preview surfaces, hierarchy, KV V2 và motion |
| `src/components/preview-button.tsx` | Tương tác demo button trong Design System |
| `publish/assets/key-visual/` | Source chính thức: PNG V2, `logo.svg`, `typo.svg` |
| `public/assets/key-visual/` | Assets đang được frontend sử dụng và `provenance.json` |
| `scripts/prepare-assets.cjs` | Copy PNG V2, crop khoảng trắng SVG, extract path gốc, ghi SHA-256 nguồn |
| `archive/key-visual-v1/` | KV cũ, layer trống đồng/cảnh quan, extraction script và tài liệu cũ; chỉ archive |
| `docs/` | Notes foundation, visual refinement, verification và Homepage Phase 1 |
| `artifacts/` | Screenshot review; không phải nguồn asset cho frontend |

## 4. Những quyết định visual phải giữ

- Hướng thương hiệu: **Vietnam Heritage × Contemporary Travel × Editorial Award**. Editorial, nhiều whitespace, typography và graphic KV làm chủ đạo; không SaaS/card-heavy, không luxury đen/vàng.
- **PNG KV V2** `publish/assets/key-visual/travel-awards-kv-v2.png` (1920 × 1080) là chuẩn về màu, effect và appearance. Public copy byte-for-byte, không filter/recolor/redraw.
- KV cũ/trống đồng đã bị loại khỏi frontend và chuyển vào archive. Không khôi phục `landscape.svg`, `layer-drum.svg` hoặc composition/overlay bằng các layer cũ.
- Giữ logo, campaign lockup, star, divider từ SVG gốc khi render đúng. Source `typo.svg` chứa chữ dạng vector path, không phải webfont.
- Các màu chính giữ nguyên: blue `#0076BE`, signature green `#019047`, teal `#00719C`, aqua `#91D5D8`, mint `#E8F5F3`/`#AFDDD6`, leaf `#BADCAD`, ink `#263C53`. Không thêm palette tùy ý.
- Surfaces: `surface-primary` sáng/trắng, `surface-brand-soft` mint nhạt, `surface-brand-deep` teal. Text/action/link/focus tự đổi qua semantic CSS variables. Không hard-code màu riêng từng component.
- Graphic hierarchy: Hero/brand moment mạnh nhất; major chapter có thể dùng signature; minor section chỉ marker/line/type; content area ưu tiên whitespace. Homepage hiện dùng `SignatureDivider` tại Awards, không rải mọi section.
- Image treatment cạnh thẳng, editorial crop hoặc full bleed. Chưa có photography được duyệt; không tự thêm ảnh, mask lạ, card bo góc hoặc redraw KV. Depth/parallax nhiều layer V2 đang hoãn vì chưa có asset độc lập khớp V2.

## 5. Typography và motion mới nhất

- Người dùng đã chốt **sans-serif cho chữ giao diện**: cả `--font-display` và `--font-body` là `Arial, Helvetica, sans-serif`. Design System mô tả là **temporary UI font**, chưa có official/licensed brand font.
- Cập nhật mới nhất: **The First Signature** trong About dùng cùng font sans-serif và kiểu chữ với Dấu ấn tiên phong, giữ màu signature green. Đã bỏ ngoại lệ serif/italic và bỏ ba signoff cùng đường kẻ bên dưới About.
- Logo và lockup SVG giữ chữ artwork gốc; quy tắc sans-serif không thay đổi vector nhận diện.
- Typo Hero (`#hero-title`) hiện dần ngay khi vào trang bằng CSS `signature-reveal` 1400ms; loại khỏi observer heading để tránh animate hai lần. Đã bỏ tagline “Di sản Việt Nam. Tầm nhìn tiên phong.” ở chân Hero. Link “Khám phá hành trình” căn giữa, mũi tên dưới chữ dịch xuống nhẹ 3 nhịp; reduced motion tắt cả hai hiệu ứng.
- Countdown Hero dùng nền trắng trong mờ 65% và backdrop blur 12px, viền aqua; không dùng gradient. Chỉ blur nền phía sau, chữ/số giữ sắc nét. Dòng “Hãy tham gia ngay” dùng body-large 18px, weight 600, màu text-brand.
- Hero mới có parallax nhẹ trên toàn PNG V2: scale 1.045, scroll tối đa 20px, pointer mouse ±4px; không tách/redraw layer hoặc đổi màu. Reduced motion bỏ transform. Countdown gồm 4 ô tròn (aspect-ratio 1, không co giãn), dòng nhắc “Hãy tham gia ngay” và CTA đặt dưới countdown; cập nhật mỗi giây, dừng và giữ 0 khi hết hạn; giờ đóng tạm tính **23:59:59 ngày 16.11.2026 UTC+07:00**, cần xác nhận giờ chính thức. CTA Hero rộng 12rem; các CTA khác giữ nguyên.
- **Quy ước người dùng đã chốt: mọi title/heading chính phải hiện dần khi cuộn vào màn hình.** Khi thêm/chỉnh section tiếp theo, giữ quy tắc này; không chỉ animate cả block rồi bỏ qua heading.
- `html` có smooth scrolling. `ScrollReveal` observe `.home main > .section > .layout-container` và mọi `h1`, `h2`, `h3` trong `.home main`, threshold 0.05, bottom root margin -32px; add `.home-scroll-enter` cho block hoặc `.home-heading-enter` cho heading rồi unobserve để chạy một lần. Heading section và tiêu đề phụ dùng heading-text-reveal 1400ms: mở chữ từ trái sang phải bằng clip-path và dịch ngang nhẹ, thay fade trước đây. Hero giữ hiệu ứng entrance riêng; reduced motion tắt hiệu ứng.
- Reveal dùng keyframe `signature-reveal`, duration 600ms và distance 0.5rem từ tokens. Không ẩn nội dung SSR để đợi JavaScript, không đổi layout hay chạy loop.
- `prefers-reduced-motion` tắt animation/transition/smooth scroll; observer không chạy nếu đã bật giảm chuyển động và dừng khi preference chuyển sang reduce.

## 6. Homepage đã làm xong

Thứ tự giữ nguyên: **Header → Hero → About → Award Journey → Award System → How to Participate → Minitalk → News → Final CTA → Organizer → Footer**.

| Vùng | Trạng thái/copy đã chốt |
| --- | --- |
| Header | Thanh trên: VnExpress / Du lịch / Đăng nhập 14px, weight 400, icon login.svg và các link đã chốt. Thanh điều hướng dưới cao 65px, sticky khi cuộn (thanh publisher cuộn khỏi màn hình), bóng đổ nhẹ chỉ khi scrollY > 48px; Thể lệ / Tin tức 14px, weight 400; hover/active dùng màu và underline của text-link Design System; active cập nhật theo hash điều hướng. Logo và home.svg cùng dẫn tới /#main. Không có CTA đề cử ở header. |
| Hero | KV V2 PNG + lockup SVG gốc; Travel Awards 2026; THE FIRST SIGNATURE / DẤU ẤN TIÊN PHONG; “Tôn vinh những dấu ấn góp phần định hình tương lai du lịch Việt Nam.”; CTA GỬI ĐỀ CỬ, deadline 16.11.2026. |
| About `#about` | Giữ hai cột: tiêu đề The First Signature / Dấu ấn tiên phong bên trái cùng font sans-serif, nội dung người dùng cung cấp bên phải; link **Xem chi tiết** → `#participate`. Đã bỏ ba signoff và đường kẻ bên dưới. |
| Journey `#journey` | Tiêu đề Agenda sự kiện; timeline ba cột: 01 / Đề cử — Vòng Sơ loại (Tháng 9 - Tháng 11), 02 / Bình chọn — Sơ loại / Chung kết (Tháng 11 - Tháng 12), 03 / Vinh danh — Gala trao giải (Tháng 1/2027). Nội dung chính thức do người dùng cung cấp; tỷ trọng 40% độc giả / 60% Hội đồng, riêng Giải Bình chọn hoàn toàn theo độc giả. Bỏ câu phụ cạnh tiêu đề, thêm Xem thể lệ tới #participate; nhãn vòng và thời gian 18px; thời gian cùng màu tiêu đề, cách tiêu đề 0.5rem và cách mô tả 1.5rem, mô tả box 01 hiển thị đầy đủ không chấm lửng; box 02/03 giới hạn 38 từ, chỉ thêm dấu chấm lửng nếu dài hơn (giữ copy đầy đủ trong source; ba cột cùng chiều cao, cụm tiêu đề/thời gian sát nhau và mô tả bắt đầu cùng hàng). Line reveal trái sang phải 1400ms, chữ fade 1200ms với delay 250–450ms, chạy một lần khi cuộn và tắt khi reduced motion. Lịch mới chỉ cập nhật Journey; countdown Hero chưa được yêu cầu đổi. |
| Awards `#awards` | Surface mint, nhãn Giải thưởng; số 15 lớn hơn, đếm 0–15 trong 1800ms khi vào viewport một lần, reduced motion hiển thị ngay 15; tab Trụ cột 6 / Tiên phong 9, list có số thứ tự. Click và ArrowLeft/Right/Home/End hoạt động. Tên/tiêu chí vẫn placeholder “chờ công bố”. |
| Participation `#participate` | 01 Chọn hạng mục → 02 Chuẩn bị hồ sơ → 03 Gửi đề cử; CTA `/dang-ky-de-cu`. |
| Minitalk `#minitalk` | Glow On The Go.; surface deep; lịch/khách mời chưa công bố. |
| News `#news` | 1 featured + 3 bài phụ, copy ghi rõ preview, featured dùng KV V2; chưa có bài/ảnh/link bài chính thức. |
| Final CTA `#nominate` | Surface deep, “Dấu ấn tiếp theo. Có thể là bạn.”, CTA và deadline. |
| Organizer `#organizer` | Hai cụm căn giữa, mỗi nhãn body-large trên logo: VnExpress — Đơn vị tổ chức đứng trước; FPT Online — Đơn vị vận hành đứng sau. Dùng SVG trong `public/assets/key-visual/`. |
| Footer | Theo cấu trúc Vietnam iContent: logo/menu ngang, hàng tiện ích, hai cột thông tin báo/liên hệ, bản quyền. Toàn bộ chữ dùng font-body sans-serif. Thông tin báo và email chung đối chiếu footer nguồn; đầu mối tài trợ do người dùng cung cấp: Vũ Bình Minh, MinhVB@fpt.com, 0915681515; nhãn/nội dung căn cột, chữ thông tin footer màu đen; bản quyền 14px như lead; cụm phường Cầu Giấy, Hà Nội không ngắt dòng; hover nút tiện ích đổi nền nhẹ không gạch chân. Fanpage dùng facebook.svg, chưa gắn link theo yêu cầu người dùng; Góp ý dùng sms.svg và mailto email sự kiện chung. Hai nút theo màu/bo góc Vietnam iContent (ngoại lệ màu tiện ích footer đã được người dùng yêu cầu), font-body giữ nguyên. Component site-footer.tsx. |

Copy About do người dùng cung cấp, không tự viết lại khi chỉnh visual:

> Travel Awards là giải thưởng thường niên về du lịch nhằm tôn vinh những điểm đến, doanh nghiệp và dịch vụ du lịch tiêu biểu của Việt Nam.

> Chủ đề của mùa giải đầu tiên Travel Awards, đánh dấu sự khởi đầu của hành trình tôn vinh những điểm đến, doanh nghiệp và cá nhân tiên phong đang kiến tạo những giá trị mới cho du lịch Việt Nam. Mỗi dấu ấn được ghi nhận không chỉ là thành tựu của hôm nay mà còn là nguồn cảm hứng cho sự phát triển bền vững của ngành trong tương lai.

Lưu ý đánh số: người dùng gọi **khu vực 1 = Header**, **khu vực 2 = About**; khác số chapter hiện trên trang (About 01, Journey 02...). Đọc tên/nội dung block khi xác định phạm vi, không đoán theo chapter number.

Links hiện tại:

- Mọi CTA gửi đề cử → `/dang-ky-de-cu`. Route này chỉ có thông báo nhận đề cử 16.10–16.11.2026 và quay về hướng dẫn tham gia.
- Header `Thể lệ` và About `Xem chi tiết` → `#participate`, chưa có trang thể lệ chính thức.
- Header `Tin tức` → `#news`; icon home/logo → `/`.
- Publisher → `https://vnexpress.net/`, Du lịch → `https://vnexpress.net/du-lich`.
- MyVnE → `https://my.vnexpress.net/` mở tab mới với `noopener noreferrer`; chỉ liên kết ngoài, **chưa tích hợp SSO/auth**.
- Header reference: https://vnexpress.net/khoa-hoc-cong-nghe/ai4vn-2026. Chỉ tham khảo bố cục header, không sao chép visual language của AI4VN.

## 7. Quy ước code và kiểm tra

- TypeScript/TSX, functional components; mặc định Server Components. Chỉ dùng `'use client'` cho state/event/effect như tabs, scroll reveal, demo controls.
- Tái sử dụng token và primitive trước khi tạo mới; giữ CSS Homepage trong `home.css`, foundation trong `globals.css`/`tokens.css`. Tailwind utility có sẵn cho preview.
- Dùng `next/link` cho route nội bộ, anchor cho section/external; giữ CTA destination nhất quán. Không thêm link hoặc button giả vờ chức năng đã hoàn thiện.
- Semantic HTML, heading hierarchy, nav labels, skip link, focus-visible và keyboard tabs. Ảnh nội dung có alt; decorative SVG/image có alt rỗng/aria-hidden. SVG bên ngoài giữ nguyên path/tỷ lệ/màu để tránh ID/class Illustrator xung đột.
- Giữ asset source nguyên vẹn; script generation chỉ copy PNG, crop khoảng trắng, extract path. Nếu source SVG đổi, review path indices trước regenerate.
- Không invent tên giải, tiêu chí, organizer, lịch Minitalk hay tin đã xuất bản. Ghi rõ pending/preview cho nội dung chưa được cung cấp.
- Kiểm tra build + TypeScript sau sửa code; review đúng block trong browser, console, links/tabs, desktop trước; kiểm tra responsive/reduced-motion khi thay đổi liên quan. Không cần build lại cho thay đổi chỉ tài liệu.
- Build gần nhất trước handoff đã đạt (sau thêm scroll reveal); browser xác nhận link `Xem thể lệ` tới `#participate`, smooth scroll và reveal hoạt động, không có console errors/warnings hay desktop overflow. Trước đó tabs 6/9, keyboard và CTA đã kiểm tra; mobile 390px có kiểm tra overflow cơ bản, chưa phải QA mobile đầy đủ.
- Screenshot review mới nhất: `artifacts/about-rules-link.png`; các ảnh trước gồm `about-signature-typography.png`, `homepage-about-content.png`, `homepage-header-v2.png`, `homepage-sans-serif.png`. Ảnh cũ có thể không phản ánh trạng thái mới nhất.

## 8. Phần còn dở và checklist tiếp theo

Đây là danh sách công việc chờ, không phải yêu cầu tự động mở rộng phạm vi:

- [ ] Tiếp tục refinement theo block/ý tưởng **tiếp theo người dùng cung cấp**. Header và About đã được sửa; chưa có yêu cầu mới cho Journey/Awards/các block sau.
- [ ] Nhận tên + tiêu chí chính thức cho 6 Trụ cột và 9 Tiên phong, thay placeholder mà giữ editorial list/tabs.
- [ ] Nhận nội dung thể lệ và thống nhất route/destination thật; hiện cả hai link thể lệ chỉ dẫn hướng dẫn tham gia.
- [ ] Xác nhận giờ đóng đề cử chính thức cho countdown (đang giả định cuối ngày 16.11.2026 giờ Việt Nam).
- [ ] Nhận tên/logo organizer, đối tác; lịch/khách mời Minitalk; News và photography được duyệt.
- [ ] Refinement mobile khi được yêu cầu: header, Hero crop, long headings, spacing/list, touch/focus; kiểm tra nhiều viewport.
- [ ] Nomination form, backend và MyVnE SSO chỉ triển khai khi có brief/API/auth contract và được yêu cầu.
- [ ] Voting, Pre-Gala, Live Event, Winners vẫn chưa triển khai.
- [ ] Asset V2 nhiều layer/optimized variants và brand font chỉ bổ sung khi có nguồn phù hợp; không dùng lại KV cũ.
- [ ] Trước public launch: review metadata/robots (hiện noindex), routes/official content và accessibility/performance theo phạm vi được giao.
- [ ] Đồng bộ tài liệu cũ khi cập nhật docs: `docs/design-foundation.md`, `docs/visual-refinement.md`, `docs/verification.md` vẫn có câu “No Homepage” từ snapshot foundation; README/docs chưa ghi đầy đủ ngoại lệ serif và refinement header/About/scroll. **Code hiện tại và handoff này là trạng thái mới hơn**, không xóa Homepage để khớp notes cũ.

Sau mỗi iteration, cập nhật phần trạng thái/checklist của file này nếu có quyết định quan trọng mới; không ghi session IDs hoặc trạng thái runtime tạm thời thành quy ước dự án.





