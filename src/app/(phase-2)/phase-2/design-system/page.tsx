import { UiIcon, uiIconNames } from '@/components/ui-icon';
import { Container, Section } from '@/components/primitives';
import { SiteHeader } from '@/components/phase-2/site-header';
import { SiteFooter } from '@/components/phase-2/site-footer';
import '@/app/home.css';
function SpecimenTitle({children}:{number:string;children:React.ReactNode}) { return <h2 className="type-heading-2">{children}</h2>; }
export default function Phase2Icons() { return <div className="home voting-site"><SiteHeader phase="voting" homePrefix="/" /><main id="main"><Section id="icons"><Container><SpecimenTitle number="00">UI Icons · Flaticon UIcons</SpecimenTitle><p className="preview-note">Bộ icon giao diện chung: Regular Rounded, kích thước 16 / 20 / 24px, màu currentColor theo semantic token. Dùng UiIcon; tên truy cập đặt trên button/link. Logo, icon thương hiệu và SVG arrow/zoom đã chọn cho gallery giữ nguyên. Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a>.</p><div className="ui-icon-grid">{uiIconNames.map(name => <div key={name}><UiIcon name={name} size={24} /><code>{name}</code></div>)}</div></Container></Section></main><SiteFooter homePrefix="/" /></div>; }
