import type { Metadata } from 'next';
import { BrandGraphic } from '@/components/brand-graphics';
import { Container, Eyebrow, Section, TextLink } from '@/components/primitives';

export const metadata: Metadata = { title: 'Đề cử — Travel Awards 2026' };

export default function NominationPage() {
  return <main id="main"><Section><Container><BrandGraphic variant="logo" label="Travel Awards" /><div className="section-heading" style={{marginTop:'var(--spacing-section)'}}><Eyebrow>Travel Awards 2026 / Đề cử</Eyebrow><h1 className="type-display-l">Dấu ấn của bạn.<br />Hành trình phía trước.</h1><p className="type-body-large">Nhận đề cử từ 16.10 đến 16.11.2026.</p><p>Trang gửi đề cử sẽ được cập nhật ở bước tiếp theo.</p><TextLink href="/#participate">Về hướng dẫn tham gia</TextLink></div></Container></Section></main>;
}
