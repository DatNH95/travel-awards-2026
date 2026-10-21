import type { Metadata } from 'next';
import Image from 'next/image';
import localFont from 'next/font/local';
import Link from 'next/link';

import { BrandGraphic, SignatureDivider } from '@/components/brand-graphics';
import { CTAArrow, Container, Eyebrow, Section, TextLink, VotingCTA } from '@/components/phase-2/primitives';
import { AwardTabs } from '@/components/phase-2/award-tabs';
import { ScrollReveal } from '@/components/scroll-reveal';
import { HeroStage } from '@/components/hero-stage';
import { NominationCountdown } from '@/components/phase-2/countdown';
import { SiteHeader } from '@/components/phase-2/site-header';
import { AwardCount } from '@/components/award-count';
import { SiteFooter } from '@/components/phase-2/site-footer';
import { VotingBrowser } from '@/components/voting-browser';
import { VotingCommunity } from '@/components/voting-community';
import '@/app/home.css';
import '../binh-chon/voting.css';

export const metadata: Metadata = {
  title: 'Travel Awards 2026 — Bình chọn',
  description: 'Tôn vinh những dấu ấn góp phần định hình tương lai du lịch Việt Nam. Đề cử đến ngày 20.11.2026.',
};


const newsFont = localFont({ src: '../../../../public/fonts/merriweather/merriweather-bold.ttf', weight: '700', display: 'swap', variable: '--font-news-title' });

// Demo articles from VnExpress Du lịch; replace when campaign news is supplied.
const newsItems = [
  {
    title: 'Tà Xùa lần đầu được vinh danh điểm đến mới nổi hàng đầu châu Á',
    href: '/tin-tuc/ta-xua-lan-dau-duoc-vinh-danh-diem-den-moi-noi-hang-dau-chau-a-5126915',
    image: 'https://i1-dulich.vnecdn.net/2026/10/01/2aobor24edwga8cozpy3gh08dgf2j1-3502-7965-1790818861.webp?w=1200&h=675&q=100&dpr=1&fit=crop&s=-4yZB3eD8lf5Ylkuk6L7yg',
  },
  {
    title: 'Tour cùng kiểm lâm xuyên rừng Cát Tiên được đề cử giải du lịch thế giới',
    href: '/tin-tuc/tour-cung-kiem-lam-xuyen-rung-cat-tien-duoc-de-cu-giai-du-lich-the-gioi-5126696',
    image: 'https://i1-dulich.vnecdn.net/2026/09/30/trekking-canhdongtalai-1790755-6724-8000-1790755048.jpg?w=1200&h=675&q=100&dpr=1&fit=crop&s=ouyLF0Ak6vYQlXk_JKvTfQ',
  },
  {
    title: 'Cao Bằng vào mùa gặt',
    href: '/tin-tuc/cao-bang-vao-mua-gat-5125445',
    image: 'https://i2-vnexpress.vnecdn.net/2026/09/27/DJI-0251-copy-4-1790519911.png?w=1200&h=675&q=100&dpr=1&fit=crop&s=TinwzC029-jInqWaUduOjw',
  },
  {
    title: "Phong Nha - Kẻ Bàng giành 'cú đúp' giải thưởng du lịch quốc tế",
    href: '/tin-tuc/phong-nha-ke-bang-gianh-cu-dup-giai-thuong-du-lich-quoc-te-5125627',
    image: 'https://i1-dulich.vnecdn.net/2026/09/28/dji-1790570736-3186-1790570740.jpg?w=1200&h=675&q=100&dpr=1&fit=crop&s=IBzng60cz4dpQdDmRDBr2A',
  },
];

export default function Phase2HomePage() {
  return <div className="home home-phase-2">
    <SiteHeader phase="voting" /><ScrollReveal />
    <main id="main">
      <HeroStage>
        <Image className="home-hero-landscape" src="/assets/key-visual/travel-awards-kv-v2.png" alt="" aria-hidden="true" width={1920} height={1080} unoptimized preload />
        <div className="home-hero-content">
          <h1 id="hero-title"><span className="home-sr-only">THE FIRST SIGNATURE — DẤU ẤN TIÊN PHONG</span><BrandGraphic variant="campaign" /></h1>
          <p className="home-hero-statement">Giai đoạn bình chọn đề cử</p>
          <div className="home-hero-actions"><NominationCountdown label="Thời gian còn lại:" kind="survey" /></div>
        </div>
      </HeroStage>
      <VotingBrowser id="about" />
      <VotingCommunity />
      <Section id="participate" tone="brand-soft" className="home-participate">
        <Container>
          <div className="home-split"><div className="home-participate-heading"><h2 className="type-display-l">Cách tham gia<br />bình chọn</h2><TextLink href="/the-le">Tìm hiểu thể lệ</TextLink></div><div id="nomination-guide" className="home-steps">
            <div><span>01</span><div><h3 className="type-heading-3">Đăng nhập MyVNEID</h3><p>Sử dụng tài khoản MyVNEID để tham gia bình chọn khi chương trình mở chính thức.</p></div></div>
            <div><span>02</span><div><h3 className="type-heading-3">Chọn hồ sơ bạn biết</h3><p>Khám phá 15 hạng mục và chọn một hồ sơ trong mỗi hạng mục để chia sẻ trải nghiệm.</p></div></div>
            <div><span>03</span><div><h3 className="type-heading-3">Hoàn tất khảo sát</h3><p>Trả lời đầy đủ các câu hỏi và gửi khảo sát. Mỗi tài khoản được bình chọn một hồ sơ cho mỗi hạng mục.</p></div></div>
            <VotingCTA href="#about" label="Bình chọn ngay" className="voting-guide-cta" />
          </div></div>
        </Container>
      </Section>
      <Section id="journey" className="home-journey">
        <Container>
          <div className="home-section-title"><h2 className="type-display-l">Agenda sự kiện</h2><TextLink className="home-agenda-rules-cta" href="/the-le">Xem thể lệ</TextLink></div>
          <ol className="home-timeline">
            <li><span className="home-timeline-index">Đề cử</span><div className="home-timeline-summary"><h3 className="type-heading-2">Vòng Sơ loại</h3><p className="home-timeline-date">Tháng 10 - 11</p></div><p>Gửi hồ sơ đề cử hoặc tự đề cử theo từng hạng mục trên chuyên trang Travel Awards.</p></li>
            <li><span className="home-timeline-index">Bình chọn</span><div className="home-timeline-summary"><h3 className="type-heading-2">Sơ loại / Chung kết</h3><p className="home-timeline-date">Tháng 11 - Tháng 12</p></div><p>Độc giả bình chọn song song với Hội đồng chuyên môn chấm điểm.</p></li>
            <li><span className="home-timeline-index">Vinh danh</span><div className="home-timeline-summary"><h3 className="type-heading-2">Gala trao giải</h3><p className="home-timeline-date">Tháng 1/2027</p></div><p>Công bố các đề cử trúng giải, hoạt động bên lề Gala vinh danh.</p></li>
          </ol>
        </Container>
      </Section>
      <Section id="awards" tone="brand-soft" className="home-awards">
        <Container>
          <div className="home-split"><div><h2 className="type-display-l home-awards-title">Hạng mục <span>giải thưởng</span><br />Travel Awards</h2><p className="home-awards-intro">Hai nhóm giải thưởng chính, 15 hạng mục.</p></div><div className="home-awards-count"><AwardCount /><Eyebrow>Hạng mục vinh danh</Eyebrow></div></div>
          <SignatureDivider />
          <AwardTabs phase="voting" />
        </Container>
      </Section>
      <Section id="news" className={`home-news ${newsFont.variable}`}>
        <Container>
          <div className="home-section-title"><h2 className="type-display-l"><Link href="/tin-tuc">Tin tức</Link></h2><Link className="text-link" href="/tin-tuc">Xem tất cả<span aria-hidden="true"><CTAArrow /></span></Link></div>
          <div className="home-news-layout"><div className="home-news-grid">
            {newsItems.map((item, index) => <article className={`home-news-item${index === 0 ? ' home-news-item--featured' : ''}`} key={item.href}>
              <a className="home-news-image" href={item.href} tabIndex={-1} aria-hidden="true"><Image src={item.image} alt="" width={1000} height={600} unoptimized /></a>
              <div className="home-news-copy"><h3 className="type-news-title"><a href={item.href}>{item.title}</a></h3>{index === 0 && <p className="home-news-lead"><a href={item.href}>Tà Xùa lần đầu ghi dấu ấn với danh hiệu điểm đến mới nổi hàng đầu châu Á tại giải thưởng du lịch quốc tế.</a></p>}</div>
            </article>)} </div><aside className="home-news-ad" aria-label="Vị trí quảng cáo demo"><Image src="/assets/key-visual/ADS%20300x600.jpg" alt="Quảng cáo demo Travel Awards" width={300} height={600} unoptimized /></aside></div>
        </Container>
      </Section>
      <Section id="nominate" tone="brand-deep" className="home-final-cta">
        <Container><Eyebrow>Góc nhìn từ hành trình của bạn</Eyebrow><h2 className="type-display-xl">Mỗi trải nghiệm.<br /><em>Một góc nhìn.</em></h2><p>Khám phá hồ sơ, chia sẻ cảm nhận và góp phần ghi nhận những dấu ấn du lịch Việt Nam.</p><Link href="/binh-chon" className="button button--primary home-cta">Bình chọn<CTAArrow /></Link></Container>
      </Section>
      <Section id="organizer" className="home-organizer">
        <Container className="home-organizer-inner"><div className="home-organizer-logos"><div className="home-organizer-unit"><Eyebrow>Đơn vị tổ chức</Eyebrow><Image src="/assets/key-visual/logo vnexpress.svg" alt="VnExpress" width={1366} height={768} unoptimized /></div><div className="home-organizer-unit"><Eyebrow>Đơn vị vận hành</Eyebrow><Image src="/assets/key-visual/logo fpt online.svg" alt="FPT Online" width={1366} height={768} unoptimized /></div></div></Container>
      </Section>
    </main>
    <SiteFooter />
  </div>;
}
