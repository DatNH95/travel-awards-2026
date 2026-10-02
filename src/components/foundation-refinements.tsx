import { BrandGraphic, GraphicAccent } from './brand-graphics';
import { Container, Section, Surface, Button, TextLink, type SurfaceTone } from './primitives';
import { MotionPreview } from './motion-preview';

const surfaces: { tone: SurfaceTone; label: string; usage: string }[] = [
  { tone: 'primary', label: 'Light / primary', usage: 'About · Journey · Participation · News' },
  { tone: 'brand-soft', label: 'Brand soft / mint', usage: 'Awards · các chapter cần nhịp dịu' },
  { tone: 'brand-deep', label: 'Brand deep / teal', usage: 'Minitalk · Final CTA · contrast' },
];
const hierarchy = [
  { level: 'primary', title: 'Primary Brand Moment', usage: 'Hero / major campaign moment', rule: 'PNG KV V2 và lockup gốc là điểm nhấn mạnh nhất.' },
  { level: 'chapter', title: 'Major Chapter', usage: 'Award System / Final CTA', rule: 'SignatureDivider hoặc một graphic lớn, dùng có chọn lọc.' },
  { level: 'minor', title: 'Minor Section', usage: 'Timeline / Minitalk / News', rule: 'SectionMarker, line hoặc typography; không thêm signature.' },
  { level: 'content', title: 'Content Area', usage: 'Nội dung / chi tiết bài viết', rule: 'Whitespace và typography; không thêm decoration mặc định.' },
] as const;

export function SurfaceRefinement() {
  return <Section id="surfaces"><Container><h2 className="type-heading-2 mb-content">Surface system</h2><p className="preview-note">Vietnam Heritage × Contemporary Travel × Editorial Award. Cùng một bộ component tự chuyển màu chữ, link, CTA và focus theo surface.</p><div className="surface-grid">{surfaces.map(({ tone, label, usage }) => <Surface key={tone} tone={tone} className="surface-specimen"><p className="type-label">{label}</p><code className="type-caption">surface-{tone}</code><h3 className="type-heading-3">Dấu ấn Việt Nam</h3><p className="text-text-secondary type-body-small">{usage}</p><Button>Primary CTA</Button><Button variant="secondary">Secondary CTA</Button><TextLink href="#hierarchy">Xem graphic hierarchy</TextLink></Surface>)}</div><ol className="rhythm-strip" aria-label="Nhịp surface dự kiến, chưa triển khai Homepage">{[['Hero / rich visual', 'brand-soft'], ['About / light', 'primary'], ['Journey / light', 'primary'], ['Awards / soft', 'brand-soft'], ['Participation / light', 'primary'], ['Minitalk / deep', 'brand-deep'], ['News / light', 'primary'], ['Final CTA / deep', 'brand-deep']].map(([label, tone]) => <li key={label} className={`surface surface--${tone}`}>{label}</li>)}</ol><p className="type-caption text-text-secondary">Nhịp composition tham chiếu cho bước sau; đây không phải Homepage.</p></Container></Section>;
}

export function GraphicRefinement() {
  return <>
    <Section id="hierarchy" tone="brand-soft"><Container><h2 className="type-heading-2 mb-content">Graphic hierarchy</h2><p className="preview-note">Graphic càng đặc trưng càng được dùng có chọn lọc. Section không tự thêm graphic; mức độ nhấn được chọn chủ động.</p><div className="hierarchy-grid">{hierarchy.map(({ level, title, usage, rule }) => <Surface tone="primary" className="hierarchy-specimen" key={level}><p className="type-label">{title}</p>{level !== 'content' && <div className="hierarchy-accent"><GraphicAccent level={level} /></div>}<h3 className="type-heading-3">{usage}</h3><p className="type-body-small text-text-secondary">{rule}</p></Surface>)}</div></Container></Section>
    <Section id="kv-layers"><Container><h2 className="type-heading-2 mb-content">Key Visual V2</h2><p className="preview-note">PNG V2 là reference chính thức về màu, effect và appearance. Giữ logo, lockup, star và divider gốc. Các layer cảnh quan SVG cũ đã chuyển vào archive; chưa dùng lại để composition hoặc overlay khi appearance chưa khớp V2.</p><figure><BrandGraphic variant="landscape" label="Key Visual V2 chính thức: núi, sương, địa danh và dòng sông Việt Nam" /><figcaption className="type-caption text-text-secondary mt-4">PNG V2 nguyên bản · 1920 × 1080 · không filter, recolor hay tái tạo effect.</figcaption></figure></Container></Section>
  </>;
}

export function MotionRefinement() {
  return <Section id="motion" tone="brand-soft"><Container><h2 className="type-heading-2 mb-content">Motion language</h2><p className="preview-note">Typography, line, graphic và image reveal nhẹ. Chưa minh họa depth nhiều layer khi chưa có asset V2 phù hợp. Không chạy loop hay parallax mạnh. Khi bật prefers-reduced-motion, mọi mẫu giữ nội dung tĩnh.</p><MotionPreview /></Container></Section>;
}
