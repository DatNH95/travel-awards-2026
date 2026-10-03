<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Travel Awards 2026 — Project handoff

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
| `src/app/nomination/page.tsx` | `/nomination`: thông báo sẽ cập nhật, không phải form |
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
| Journey `#journey` | Timeline ba cột: 01 / Đề cử — Vòng Sơ loại (Tháng 9 - Tháng 11), 02 / Bình chọn — Sơ loại / Chung kết (Tháng 11 - Tháng 12), 03 / Vinh danh — Gala trao giải (Tháng 1/2027). Nội dung chính thức do người dùng cung cấp; tỷ trọng 40% độc giả / 60% Hội đồng, riêng Giải Bình chọn hoàn toàn theo độc giả. Bỏ câu phụ cạnh tiêu đề, thêm Xem thể lệ tới #participate; nhãn vòng và thời gian 18px; thời gian cùng màu tiêu đề, cách tiêu đề 0.5rem và cách mô tả 1.5rem, mô tả box 01 hiển thị đầy đủ không chấm lửng; box 02/03 giới hạn 38 từ, chỉ thêm dấu chấm lửng nếu dài hơn (giữ copy đầy đủ trong source; ba cột cùng chiều cao, cụm tiêu đề/thời gian sát nhau và mô tả bắt đầu cùng hàng). Line reveal trái sang phải 1400ms, chữ fade 1200ms với delay 250–450ms, chạy một lần khi cuộn và tắt khi reduced motion. Lịch mới chỉ cập nhật Journey; countdown Hero chưa được yêu cầu đổi. |
| Awards `#awards` | Surface mint, nhãn Giải thưởng; số 15 lớn hơn, đếm 0–15 trong 1800ms khi vào viewport một lần, reduced motion hiển thị ngay 15; tab Trụ cột 6 / Tiên phong 9, list có số thứ tự. Click và ArrowLeft/Right/Home/End hoạt động. Tên/tiêu chí vẫn placeholder “chờ công bố”. |
| Participation `#participate` | 01 Chọn hạng mục → 02 Chuẩn bị hồ sơ → 03 Gửi đề cử; CTA `/nomination`. |
| Minitalk `#minitalk` | Glow On The Go.; surface deep; lịch/khách mời chưa công bố. |
| News `#news` | 1 featured + 3 bài phụ, copy ghi rõ preview, featured dùng KV V2; chưa có bài/ảnh/link bài chính thức. |
| Final CTA `#nominate` | Surface deep, “Dấu ấn tiếp theo. Có thể là bạn.”, CTA và deadline. |
| Organizer `#organizer` | Hai cụm căn giữa, mỗi nhãn body-large trên logo: VnExpress — Đơn vị tổ chức đứng trước; FPT Online — Đơn vị vận hành đứng sau. Dùng SVG trong `public/assets/key-visual/`. |
| Footer | Theo cấu trúc Vietnam iContent: logo/menu ngang, hàng tiện ích, hai cột thông tin báo/liên hệ, bản quyền. Toàn bộ chữ dùng font-body sans-serif. Thông tin báo và email chung đối chiếu footer nguồn; đầu mối tài trợ do người dùng cung cấp: Vũ Bình Minh, MinhVB@fpt.com, 0915681515; nhãn/nội dung căn cột, chữ thông tin footer màu đen. Chưa có fanpage/form góp ý riêng, góp ý dùng mailto email sự kiện chung. Component site-footer.tsx. |

Copy About do người dùng cung cấp, không tự viết lại khi chỉnh visual:

> Travel Awards là giải thưởng thường niên về du lịch nhằm tôn vinh những điểm đến, doanh nghiệp và dịch vụ du lịch tiêu biểu của Việt Nam.

> Chủ đề của mùa giải đầu tiên Travel Awards, đánh dấu sự khởi đầu của hành trình tôn vinh những điểm đến, doanh nghiệp và cá nhân tiên phong đang kiến tạo những giá trị mới cho du lịch Việt Nam. Mỗi dấu ấn được ghi nhận không chỉ là thành tựu của hôm nay mà còn là nguồn cảm hứng cho sự phát triển bền vững của ngành trong tương lai.

Lưu ý đánh số: người dùng gọi **khu vực 1 = Header**, **khu vực 2 = About**; khác số chapter hiện trên trang (About 01, Journey 02...). Đọc tên/nội dung block khi xác định phạm vi, không đoán theo chapter number.

Links hiện tại:

- Mọi CTA gửi đề cử → `/nomination`. Route này chỉ có thông báo nhận đề cử 16.10–16.11.2026 và quay về hướng dẫn tham gia.
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

