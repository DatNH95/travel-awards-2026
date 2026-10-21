# Layout độc lập theo phase — 20.10.2026

Phase 1 đối chiếu với tag `phase-1-final`, commit `98c6dbb8d87db9f81e044798b320253e79617b28`. Giữ source Phase 2 hiện tại, không reset project và không thay URL.

## Phân chia route

| Group vật lý | URL | Layout / giao diện |
| --- | --- | --- |
| `src/app/(phase-1)` | `/`, `/dang-ky-de-cu`, `/the-le`, `/tin-tuc`, `/tin-tuc/[slug]`, `/design-system`, `/design-system/landing-preview` | Root layout và Header/Footer/CTA/SVG icon theo tag Phase 1. |
| `src/app/(phase-2)` | `/phase-2`, `/binh-chon`, `/binh-chon/[slug]` | Root layout, component riêng, CSS icon và VotingSessionProvider của Phase 2. |
| `src/app/(phase-2)/phase-2/design-system` | `/phase-2/design-system#icons` | Chuyển specimen icon Flaticon sang phạm vi Phase 2; `/design-system` được trả về tag Phase 1. |

Hai root layout đều có html/body riêng và dùng cùng foundation CSS tại `src/app/globals.css`. Không còn root layout chung bọc provider. Theo cơ chế route groups của Next.js, chuyển **giữa hai phase tải lại document**; CSS và provider cũ không giữ sang phase kia. Điều hướng client **bên trong Phase 2** vẫn giữ trạng thái bình chọn mẫu. Reload/rời root Phase 2 reset phiên demo như thiết kế bộ nhớ, không thêm storage/API.

## File chính thay đổi

- Di chuyển `src/app/page.tsx`, `layout.tsx` và các thư mục `dang-ky-de-cu`, `the-le`, `tin-tuc`, `design-system` vào `(phase-1)`; di chuyển `phase-2`, `binh-chon` vào `(phase-2)`. Các URL giữ nguyên. Sửa import CSS và đường dẫn font do thay vị trí file.
- Thêm `src/app/(phase-2)/layout.tsx`, `phase-2.css`; provider và hai stylesheet Flaticon chỉ được nạp ở layout này. CSS UiIcon có scope `.phase-2-scope`.
- Thêm `src/components/phase-2/{site-header,header-navigation,site-footer,award-tabs,primitives,countdown}.tsx` để giữ giao diện Phase 2 mà không chỉnh biến thể Phase 1.
- Khôi phục `src/components/{site-header,header-navigation,site-footer,award-tabs,primitives,hero-stage}.tsx`, `src/app/globals.css`, các icon form/hotline/quy định và Design System Phase 1 từ tag.
- Giữ dùng chung Container/Section/Button/Surface, tokens, home.css, BrandGraphic, HeroStage, ScrollReveal và dữ liệu giải thưởng. Các phần này không chứa provider hoặc icon Phase 2.
- `public/assets/key-visual/facebook.svg` trả về asset Phase 1; bản Phase 2 hiện tại được giữ byte-for-byte ở `public/assets/phase-2/facebook.svg`, chỉ được tham chiếu trong scope Phase 2.
- Cập nhật import ở `src/components/voting-browser.tsx`, `voting-dossier.tsx`, `src/data/voting-dossier.ts` và các page Phase 2. Dữ liệu/flow/gallery/share không bị bỏ đi.
- Cập nhật đường dẫn công cụ tại `scripts/check-registration-criteria.cjs`, `scripts/read-registration-criteria.py`, `scripts/qa-voting-detail.cjs`, `handoff-html/export.mjs`; bổ sung `scripts/qa-phase-isolation.cjs`. QA Phase 2 nhận `QA_BASE_URL` để kiểm tra server riêng.

Nội dung được chuyển theo route group, không mất các route Phase 1/2. Yêu cầu ngày 21.10 cho phép commit/push cùng cập nhật trang đăng ký và hai bộ handoff.

## Kết quả QA

| Kiểm tra | Kết quả |
| --- | --- |
| Production build | Đạt, 241 trang generate, đủ route hai phase và specimen icon Phase 2. |
| TypeScript `tsc --noEmit` | Đạt. |
| Criteria/config và giới hạn tệp | Đạt `node scripts/check-registration-criteria.cjs`. |
| Tag comparison | 24 lượt = 12 URL × 1440/390px; nội dung main, geometry main/toàn trang, header links khớp tag; không có delta đo được. Footer mobile Phase 1 về 936.203125px, không còn +34px credit. |
| HTTP Phase 1 | 87/87 URL công khai đạt 200, không redirect ngoài dự kiến. |
| Phase isolation | 22 checks desktop/mobile đạt; Phase 1 không có UiIcon/stylesheet hoặc request Flaticon. Phase 2 có stylesheet/icon/credit riêng. Chuyển root về Phase 1 tạo document mới và không còn UI/CSS Phase 2. |
| Luồng Phase 1 | Tab Awards, chọn hạng mục, lưu dialog, sang xác nhận, giữ input/thuyết minh, checkbox cam kết khóa/mở submit, chặn hai giải BTC, criteria deep link, phân trang đều đạt ở hai viewport và khớp baseline. |
| Voting state Phase 2 | Đạt ở 1440/390px: category lock, category khác vẫn mở, giữ state qua danh sách/detail, reload reset demo. |
| Voting detail Phase 2 | Đạt 1440/768/390/320px: gallery, zoom, related profiles, share, dialog, field coverage/privacy và icon theo từng phase. Geometry gallery/title/actions/body/ad khớp bản trước khi tách, sai lệch không quá 1px. |

Giới hạn có chủ đích: Design System mobile giữ cả trạng thái tràn ngang đã có trong tag; không sửa lại CSS Phase 1 ngoài yêu cầu khôi phục. Các trang vận hành Phase 1 được kiểm tra không tràn ngang. Tag comparison dùng reduced motion/cố định thời gian; không tuyên bố mọi frame animation là pixel-perfect trên mọi trình duyệt. Không kiểm tra MyVNEID/backend thật vì dự án đang mô phỏng front-end.

## Báo cáo và chạy lại

- `docs/phase-isolation-qa.json`
- `docs/phase1-tag-comparison-qa.json`
- `docs/phase1-route-smoke-qa.json`
- `docs/phase2-vote-state-qa.json`
- `docs/voting-detail-qa.json`

Chạy `scripts/qa-phase-isolation.cjs` với `QA_BASE_URL` trỏ tới production server hiện tại. Có thể đặt thêm `QA_BASELINE_URL` trỏ tới bản build độc lập của tag để đối chiếu hình học/nội dung. Hai script voting dùng `QA_BASE_URL` tương tự. Screenshot QA chỉ nằm trong thư mục tạm ngoài repo.

Cập nhật bàn giao 21.10: `handoff-html/` được xuất lại theo trang đăng ký hiện tại; Phase 2 nằm riêng trong `hand-off-phase 2/` (152 trang HTML). Báo cáo so sánh tag phía trên là kết quả tại thời điểm tách layout; các cập nhật form sau đó được kiểm tra theo implementation hiện tại, không khẳng định form mới giống tag. Xem `handoff-html/qa/report.json` và `docs/phase2-handoff-qa.json` cho kết quả bàn giao mới. State xuyên route trong source giữ bằng provider; các file HTML riêng reset state demo khi tải document khác, Tech nối state ở bước tích hợp.
