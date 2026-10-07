import type { CSSProperties } from 'react';
import { BrandGraphic, SectionMarker } from '@/components/brand-graphics';
import { Container, Eyebrow, ResponsiveImage, Section, SectionHeading, TextLink, Button, NominationCTA } from '@/components/primitives';
import { PreviewButton } from '@/components/preview-button';
import { SurfaceRefinement, GraphicRefinement, MotionRefinement } from '@/components/foundation-refinements';

const palette = [
  ['brand-primary', 'Logo blue', '#0076BE'], ['brand-secondary', 'Signature green', '#019047'],
  ['brand-teal', 'Landscape teal', '#00719C'], ['brand-accent', 'Water & outline', '#91D5D8'],
  ['surface-secondary', 'Atmosphere', '#E8F5F3'], ['surface-mint', 'Mint horizon', '#AFDDD6'],
  ['brand-leaf', 'Landscape leaf', '#BADCAD'], ['text-primary', 'Ink', '#263C53'],
] as const;
const typography = [
  ['display-xl', 'Display XL', 'Dấu ấn tiên phong'], ['display-l', 'Section title · 38pt (50.667px) / giãn dòng 140%', 'The First Signature'],
  ['heading-1', 'Heading 1', 'Một hành trình mới'], ['heading-2', 'Heading 2', 'Tôn vinh những dấu ấn'],
  ['heading-3', 'Heading 3', 'Câu chuyện của điểm đến'],
  ['news-title', 'News title · 24pt (32px) / giãn dòng 160%', 'Những câu chuyện trên hành trình khám phá Việt Nam'],
  ['news-title-secondary', 'News title phụ · 18pt (24px) / giãn dòng 160%', 'Câu chuyện của những điểm đến Việt Nam'],
  ['body-large', 'Body Large', 'Nơi di sản, thiên nhiên và những hành trình gặp nhau.'],
  ['body', 'Body', 'Mỗi dấu ấn mở ra một góc nhìn mới về du lịch Việt Nam.'],
  ['body-small', 'Body Small', 'Khám phá những trải nghiệm tạo nên sự khác biệt.'],
  ['label', 'Label', 'Travel Awards 2026'], ['caption', 'Caption', 'Hệ thống thị giác · Bản xem trước'],
  ['navigation', 'Navigation', 'Dấu ấn · Hành trình · Câu chuyện'],
] as const;
const sections = [['colors', 'Màu sắc'], ['typography', 'Typography'], ['controls', 'Buttons & links'], ['graphics', 'Graphic elements'], ['images', 'Image treatment'], ['headings', 'Section heading'], ['surfaces', 'Surfaces'], ['hierarchy', 'Graphic hierarchy'], ['kv-layers', 'KV V2'], ['motion', 'Motion'], ['landing-header-footer', 'Header + Footer']] as const;

function SpecimenTitle({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="preview-section-top"><span className="preview-section-number">{number}</span><SectionMarker /><h2>{children}</h2></div>;
}

export default function DesignSystem() {
  return <>
    <header className="preview-header"><Container className="preview-header-inner"><BrandGraphic variant="logo" label="Travel Awards" /><p className="preview-header-note type-caption">2026 / Design foundation<br />Development preview</p></Container></header>
    <main id="main">
      <div className="preview-intro"><Container>
        <div className="preview-intro-grid">
          <div className="reveal"><Eyebrow>Travel Awards 2026 · Visual system 01</Eyebrow><h1 className="type-display-l">Từ dấu ấn.<br />Đến hệ thống.</h1><p className="preview-intro-copy type-body-large">Foundation được phát triển từ Key Visual chính thức: cảnh quan nhiều lớp, sắc nước xanh và nét chữ mang dấu ấn riêng.</p></div>
          <figure className="preview-campaign"><BrandGraphic variant="campaign" label="Dấu Ấn Tiên Phong — The First Signature, vector chiến dịch chính thức" /></figure>
        </div>
        <nav className="preview-nav" aria-label="Các mẫu design system">{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      </Container></div>

      <Section id="colors"><Container><SpecimenTitle number="01">Color palette</SpecimenTitle><p className="preview-note">Màu được lấy từ fill và gradient stop trong SVG gốc. Xanh logo và xanh chữ chiến dịch giữ vai trò riêng; mint và teal kết nối với cảnh quan.</p><div className="swatch-grid">{palette.map(([token, label, hex]) => <div className="swatch" key={token}><div className="swatch-color" style={{ backgroundColor: `var(--color-${token})` } as CSSProperties} /><p className="type-navigation">{label}</p><code>{token}</code><code>{hex}</code></div>)}</div></Container></Section>

      <SurfaceRefinement />

      <Section id="typography" tone="secondary"><Container><SpecimenTitle number="02">Typography</SpecimenTitle><p className="preview-note"><strong>temporary UI font</strong>: Arial / Helvetica sans-serif dùng thống nhất cho display, heading và body. Repo không có file font hay guideline xác nhận tên font chính thức. Chữ trong logo.svg và typo.svg là path vector gốc, không phải webfont. Display và title heading dùng chung giãn dòng 140% trên toàn dự án. Màu brand chỉ nhấn từ hoặc cụm chữ được chỉ định, không tô toàn bộ tiêu đề.</p><dl>{typography.map(([token, label, sample]) => <div className="type-specimen" key={token}><dt className="type-caption">{label}<br /><code>{token}</code></dt><dd className={`type-${token}`}>{sample}</dd></div>)}</dl></Container></Section>

      <Section id="controls"><Container><SpecimenTitle number="03">Buttons & links</SpecimenTitle><p className="preview-note">CTA xanh logo, viền teal, hình khối gọn. Hover, active và focus dùng semantic tokens. Dùng Tab để xem focus; nhấn giữ để xem active.</p><div className="preview-control-group"><NominationCTA /><p className="type-caption">NominationCTA · 160 × 55px · arrow · /dang-ky-de-cu. Mẫu dùng chung cho mọi button Đăng ký đề cử.</p></div><div className="preview-control-group" id="cta-mobile-dang-ky"><NominationCTA className="cta-mobile-dang-ky" /><p className="type-caption">cta-mobile-dang-ky · Mobile dưới 768px: rộng 100% container, cao 55px, chữ 15px/140%, arrow 12px. Dùng NominationCTA với className="cta-mobile-dang-ky". Desktop giữ kích thước CTA chuẩn.</p></div><div className="preview-controls"><div className="preview-control-group"><PreviewButton variant="primary" /><PreviewButton variant="secondary" /></div><div className="preview-control-group"><div className="preview-action"><Button disabled>Primary disabled</Button><span className="type-caption">Disabled / primary</span></div><div className="preview-action"><Button variant="secondary" disabled>Secondary disabled</Button><span className="type-caption">Disabled / secondary</span></div></div><div className="preview-control-group"><TextLink href="#graphics">Khám phá graphic elements</TextLink><TextLink disabled>Link chưa khả dụng</TextLink></div></div></Container></Section>

      <Section id="graphics" tone="secondary"><Container><SpecimenTitle number="04">Graphic elements</SpecimenTitle><p className="preview-note">Nét trang trí và ngôi sao được trích nguyên path từ typo.svg. Không vẽ lại, đổi màu hoặc bóp méo. Dùng chúng cho điểm mở đầu và chuyển đoạn.</p><div className="graphic-grid"><figure className="graphic-specimen"><BrandGraphic variant="logo" label="Logo Travel Awards màu xanh chính thức" /><figcaption>BrandGraphic / logo · chỉ cắt khoảng trắng</figcaption></figure><figure className="graphic-specimen"><BrandGraphic variant="signature" /><figcaption>SignatureDivider · nét trang trí gốc</figcaption></figure><figure className="graphic-specimen"><SectionMarker /><figcaption>SectionMarker · ngôi sao từ lockup</figcaption></figure></div><figure className="landscape-specimen"><BrandGraphic variant="landscape" label="KV V2 chính thức: địa danh Việt Nam, núi, sương và dòng sông xanh" /><figcaption>Key Visual V2 · PNG chính thức · giữ nguyên màu, effect và tỷ lệ 16:9.</figcaption></figure></Container></Section>

      <GraphicRefinement />

      <Section id="images"><Container><SpecimenTitle number="05">Image treatment</SpecimenTitle><p className="preview-note">Ưu tiên crop editorial 4:3, 3:4 hoặc 16:9; cạnh thẳng, không bo góc mặc định. Motif chữ nằm ngoài ảnh để giữ nội dung ảnh rõ ràng. Repo chưa có photography chính thức.</p><div className="image-grid"><figure><ResponsiveImage src="/assets/key-visual/travel-awards-kv-v2.png" alt="Crop minh họa từ KV: cảnh quan, núi và dòng sông" unoptimized /><figcaption>ResponsiveImage / 4:3 · minh họa crop bằng KV, chưa phải ảnh photography.</figcaption><div className="mt-4 contour-line" aria-hidden="true" /></figure><figure><div className="image-placeholder"><div><SectionMarker /><p className="type-heading-3 mt-4">Chờ ảnh chính thức</p><p className="type-body-small mt-4">Điểm đến · Con người · Trải nghiệm</p></div></div><figcaption>Khung photography 4:3 · chỉ là placeholder cho việc review treatment.</figcaption></figure><figure className="image-full-bleed-specimen"><ResponsiveImage ratio="wide" treatment="full-bleed" src="/assets/key-visual/travel-awards-kv-v2.png" alt="KV minh họa treatment full bleed 16:9" unoptimized /><figcaption>Full bleed 16:9 · chiếm toàn bề ngang vùng composition, không border/card. Mẫu này dùng KV; ảnh photography vẫn chưa có.</figcaption></figure></div></Container></Section>

      <MotionRefinement />
      <Section id="headings" tone="brand-deep"><Container><SpecimenTitle number="06">Section heading</SpecimenTitle><SectionHeading eyebrow="The First Signature" description="Một hệ thống chung cho những câu chuyện, hành trình và dấu ấn sẽ được phát triển ở các bước tiếp theo.">Tôn vinh dấu ấn.<br />Mở lối hành trình.</SectionHeading></Container></Section>
      <Section id="landing-header-footer"><Container>
        <SpecimenTitle number="07">header + footer Landing page Desktop/Mobile</SpecimenTitle>
        <p className="preview-note">Quy chuẩn đã chốt cho các landing page của Travel Awards. Tái sử dụng SiteHeader, HeaderNavigation và SiteFooter; dùng font sans-serif và token của Design System.</p>
        <div className="landing-demo-grid">
          <figure>
            <figcaption className="type-heading-3">Desktop · 1200px</figcaption>
            <div className="landing-demo-frame landing-demo-frame--desktop"><iframe src="/design-system/landing-preview" title="Header và footer thực tế trên desktop" loading="lazy" width="1200" height="700" /></div>
          </figure>
          <figure>
            <figcaption className="type-heading-3">Mobile · 390px</figcaption>
            <div className="landing-demo-frame landing-demo-frame--mobile"><iframe src="/design-system/landing-preview" title="Header hai cấp và footer thực tế trên mobile" loading="lazy" width="390" height="720" /></div>
          </figure>
        </div>
        <p className="preview-note">Mẫu dùng component thật, có logo, icon, CTA và liên kết hiện hành. Cuộn bên trong từng khung để thử sticky; khung desktop có thể cuộn ngang trên màn hình nhỏ.</p>
        <div className="refinement-grid">
          <div className="hierarchy-specimen">
            <h3 className="type-heading-3">Header · Desktop</h3>
            <p>Thanh thông tin phía trên cao 48px: VnExpress / Du lịch và Đăng nhập dùng chữ thường, cỡ 14px. Icon login đứng cạnh Đăng nhập; icon notification đứng sau chữ Đăng nhập.</p>
            <p>Thanh điều hướng cao 65px, logo và icon Home dẫn về /#main. Menu Thể lệ, Tin tức cỡ 15px, không bold; hover và active dùng màu, gạch chân từ Design System. Tin tức dẫn về /tin-tuc.</p>
            <p>Khi cuộn, thanh điều hướng sticky và có shadow nhẹ; thanh thông tin cuộn khỏi màn hình.</p>
          </div>
          <div className="hierarchy-specimen">
            <h3 className="type-heading-3">Header · Mobile</h3>
            <p>Áp dụng dưới 48rem. Tách hai cấp rõ ràng: cấp 1 cao 65px gồm logo bên trái và CTA bên phải; cấp 2 tối thiểu 45px gồm icon Home, Thể lệ, Tin tức trên một hàng, cho phép cuộn ngang.</p>
            <p>Chỉ cấp 1 giữ cố định khi cuộn và có shadow nhẹ. Cấp 2 cùng thanh thông tin cuộn theo trang. Giữ khoảng trống cho hàng cố định để tránh nhảy bố cục; anchor chừa 65px cho header.</p>
            <p>CTA header dùng NominationCTA: 160 × 45px, chữ Đăng ký đề cử, có arrow, dẫn về /dang-ky-de-cu. CTA trong nội dung giữ 160 × 55px.</p>
          </div>
          <div className="hierarchy-specimen">
            <h3 className="type-heading-3">Footer · Desktop / Mobile</h3>
            <p>Bố cục theo footer landing page Vietnam iContent, font theo Design System: logo + điều hướng; nhóm tiện ích; thông tin tòa soạn và liên hệ / tài trợ; bản quyền.</p>
            <p>Desktop: thông tin chia hai cột. Mobile: xếp một cột; logo, menu và tiện ích xuống hàng, các nút có thể wrap. Footer cuộn theo trang.</p>
            <p>Text nội dung và bản quyền màu đen; © 1997–2026 cùng cỡ chữ với Thuộc Bộ Khoa học và Công nghệ. Phường Cầu Giấy, Hà Nội giữ cùng một dòng. Nhãn và giá trị liên hệ căn theo cột.</p>
            <p>Fanpage dùng facebook.svg, nền xanh nhạt; tạm disabled khi chưa có URL. Góp ý cho sự kiện dùng sms.svg, nền hồng nhạt và mailto:sukien@vnexpress.net. Trở lại VnExpress và Điều khoản sử dụng có cùng cách hover đổi nền nhẹ.</p>
          </div>
          <div className="hierarchy-specimen">
            <h3 className="type-heading-3">Thông tin &amp; asset dùng chung</h3>
            <p>VnExpress → https://vnexpress.net/ · Du lịch → https://vnexpress.net/du-lich · Đăng nhập → https://my.vnexpress.net/.</p>
            <p>Asset gốc trong /assets/key-visual/: logo, home.svg, login.svg, notification.svg, facebook.svg, sms.svg. Không vẽ lại hoặc đổi nhận diện logo.</p>
            <p>Tài trợ sự kiện: Vũ Bình Minh · MinhVB@fpt.com · 0915681515. Email và điện thoại dùng link mailto / tel.</p>
            <p>Vùng đơn vị: VnExpress là đơn vị tổ chức, đứng trước FPT Online là đơn vị vận hành. Mỗi cụm căn giữa, nhãn phía trên và logo phía dưới.</p>
          </div>
        </div>
      </Container></Section>
    </main>
    <footer className="preview-footer"><Container className="preview-footer-inner"><p className="type-caption">Travel Awards 2026 · Foundation review</p><p className="type-caption">Homepage và các phase sẽ được triển khai sau.</p></Container></footer>
  </>;
}
