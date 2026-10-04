import type { Metadata } from 'next';
import Image from 'next/image';
import localFont from 'next/font/local';
import Link from 'next/link';

import { BrandGraphic, SignatureDivider } from '@/components/brand-graphics';
import { Container, Eyebrow, Section, TextLink, NominationCTA } from '@/components/primitives';
import { AwardTabs } from '@/components/award-tabs';
import { ScrollReveal } from '@/components/scroll-reveal';
import { HeroStage, NominationCountdown } from '@/components/hero-stage';
import { SiteHeader } from '@/components/site-header';
import { AwardCount } from '@/components/award-count';
import { SiteFooter } from '@/components/site-footer';
import './home.css';

export const metadata: Metadata = {
  title: 'Travel Awards 2026 — Dấu ấn tiên phong',
  description: 'Tôn vinh những dấu ấn góp phần định hình tương lai du lịch Việt Nam. Đề cử đến ngày 16.11.2026.',
};


const newsFont = localFont({ src: '../../public/fonts/merriweather/merriweather-bold.ttf', weight: '700', display: 'swap', variable: '--font-news-title' });

// Demo articles from VnExpress Du lịch; replace when campaign news is supplied.
const newsItems = [
  {
    title: 'Tà Xùa lần đầu được vinh danh điểm đến mới nổi hàng đầu châu Á',
    href: 'https://vnexpress.net/ta-xua-lan-dau-duoc-vinh-danh-diem-den-moi-noi-hang-dau-chau-a-5126915.html',
    image: 'https://i1-dulich.vnecdn.net/2026/10/01/2aobor24edwga8cozpy3gh08dgf2j1-3502-7965-1790818861.webp?w=1200&h=675&q=100&dpr=1&fit=crop&s=-4yZB3eD8lf5Ylkuk6L7yg',
  },
  {
    title: 'Tour cùng kiểm lâm xuyên rừng Cát Tiên được đề cử giải du lịch thế giới',
    href: 'https://vnexpress.net/tour-cung-kiem-lam-xuyen-rung-cat-tien-duoc-de-cu-giai-du-lich-the-gioi-5126696.html',
    image: 'https://i1-dulich.vnecdn.net/2026/09/30/trekking-canhdongtalai-1790755-6724-8000-1790755048.jpg?w=1200&h=675&q=100&dpr=1&fit=crop&s=ouyLF0Ak6vYQlXk_JKvTfQ',
  },
  {
    title: 'Cao Bằng vào mùa gặt',
    href: 'https://vnexpress.net/cao-bang-vao-mua-gat-5125445.html',
    image: 'https://i2-vnexpress.vnecdn.net/2026/09/27/DJI-0251-copy-4-1790519911.png?w=1200&h=675&q=100&dpr=1&fit=crop&s=TinwzC029-jInqWaUduOjw',
  },
  {
    title: "Phong Nha - Kẻ Bàng giành 'cú đúp' giải thưởng du lịch quốc tế",
    href: 'https://vnexpress.net/phong-nha-ke-bang-gianh-cu-dup-giai-thuong-du-lich-quoc-te-5125627.html',
    image: 'https://i1-dulich.vnecdn.net/2026/09/28/dji-1790570736-3186-1790570740.jpg?w=1200&h=675&q=100&dpr=1&fit=crop&s=IBzng60cz4dpQdDmRDBr2A',
  },
];

export default function HomePage() {
  return <div className="home">
    <ScrollReveal />
    <SiteHeader />
    <main id="main">
      <HeroStage>
        <Image className="home-hero-landscape" src="/assets/key-visual/travel-awards-kv-v2.png" alt="" aria-hidden="true" width={1920} height={1080} unoptimized preload />
        <div className="home-hero-content">
          <Eyebrow>Travel Awards 2026</Eyebrow>
          <h1 id="hero-title"><span className="home-sr-only">THE FIRST SIGNATURE — DẤU ẤN TIÊN PHONG</span><BrandGraphic variant="campaign" /></h1>
          <p className="home-hero-statement">Tôn vinh những dấu ấn góp phần định hình<br className="home-desktop-break" /> tương lai du lịch Việt Nam.</p>
          <div className="home-hero-actions"><NominationCountdown /><NominationCTA className="home-cta" /></div>
        </div>
        <div className="home-hero-foot"><a href="#about">Khám phá hành trình <span aria-hidden="true">↓</span></a></div>
      </HeroStage>
      <Section id="about" className="home-about">
        <Container>
          <div className="home-split">
            <h2 className="type-display-l"><span className="home-about-signature"><span>The</span>{' '}<span>First</span>{' '}<span>Signature</span></span><br />Dấu ấn tiên phong</h2>
            <div className="home-copy"><p className="type-body-large">Travel Awards là giải thưởng thường niên về du lịch nhằm tôn vinh những điểm đến, doanh nghiệp và dịch vụ du lịch tiêu biểu của Việt Nam.</p><p>Chủ đề của mùa giải đầu tiên Travel Awards, đánh dấu sự khởi đầu của hành trình tôn vinh những điểm đến, doanh nghiệp và cá nhân tiên phong đang kiến tạo những giá trị mới cho du lịch Việt Nam. Mỗi dấu ấn được ghi nhận không chỉ là thành tựu của hôm nay mà còn là nguồn cảm hứng cho sự phát triển bền vững của ngành trong tương lai.</p><TextLink href="/the-le#gioi-thieu">Xem chi tiết</TextLink></div>
          </div>
        </Container>
      </Section>
      <Section id="journey" className="home-journey">
        <Container>
          <div className="home-section-title"><h2 className="type-display-l">Agenda sự kiện</h2><TextLink href="/the-le">Xem thể lệ</TextLink></div>
          <ol className="home-timeline">
            <li><span className="home-timeline-index">01 / Đề cử</span><div className="home-timeline-summary"><h3 className="type-heading-2">Vòng Sơ loại</h3><p className="home-timeline-date">Tháng 10 - 11</p></div><p>Các doanh nghiệp, điểm đến, dịch vụ và đơn vị hoạt động trong lĩnh vực du lịch trên toàn quốc gửi hồ sơ đề cử hoặc tự đề cử theo từng hạng mục thông qua cổng đăng ký trên chuyên trang Travel Awards.</p></li>
            <li><span className="home-timeline-index">02 / Bình chọn</span><div className="home-timeline-summary"><h3 className="type-heading-2">Sơ loại / Chung kết</h3><p className="home-timeline-date">Tháng 11 - Tháng 12</p></div><p>Công bố danh sách đề cử. Độc giả tiếp tục bình chọn cho các đề cử xuất sắc nhất, song song với quá trình chấm điểm của Hội đồng chuyên môn. Kết quả chung cuộc được tính dựa trên 40% điểm bình chọn của độc giả và 60% điểm đánh giá của Hội đồng chuyên môn đối với tất cả các hạng mục, ngoại trừ Giải Bình chọn, được quyết định hoàn toàn dựa trên kết quả bình chọn của độc giả.</p></li>
            <li><span className="home-timeline-index">03 / Vinh danh</span><div className="home-timeline-summary"><h3 className="type-heading-2">Gala trao giải</h3><p className="home-timeline-date">Tháng 1/2027</p></div><p>Công bố các đề cử trúng giải, hoạt động bên lề Gala vinh danh.</p></li>
          </ol>
        </Container>
      </Section>
      <Section id="awards" tone="brand-soft" className="home-awards">
        <Container>
          <div className="home-split"><div><h2 className="type-display-l home-awards-title">Hạng mục <span>giải thưởng</span><br />Travel Awards</h2><p className="home-awards-intro">Hai nhóm giải thưởng chính, 15 hạng mục.</p></div><div className="home-awards-count"><AwardCount /><Eyebrow>Hạng mục vinh danh</Eyebrow></div></div>
          <SignatureDivider />
          <AwardTabs />
        </Container>
      </Section>
      <Section id="participate" className="home-participate">
        <Container>
          <div className="home-split"><div className="home-participate-heading"><h2 className="type-display-l">Đăng ký<br />tham gia đề cử</h2><TextLink href="#nomination-guide">Hướng dẫn đăng ký</TextLink></div><div id="nomination-guide" className="home-steps">
            <div><span>01</span><div><h3 className="type-heading-3">Chọn hạng mục</h3><p>Tìm hạng mục phù hợp với dấu ấn bạn muốn đề cử.</p></div></div>
            <div><span>02</span><div><h3 className="type-heading-3">Chuẩn bị hồ sơ</h3><p>Kể câu chuyện của bạn cùng thông tin và minh chứng liên quan.</p></div></div>
            <div><span>03</span><div><h3 className="type-heading-3">Gửi đề cử</h3><p>Hoàn thành đề cử trước ngày 16.11.2026.</p></div></div>
            <NominationCTA className="home-cta" />
          </div></div>
        </Container>
      </Section>
      <Section id="minitalk" tone="brand-deep" className="home-minitalk">
        <Container>
          <div className="home-minitalk-grid"><div><h2>Glow On<br /><em>The Go.</em></h2></div><div className="home-minitalk-copy"><h3 className="type-heading-2">Đẹp không dịch chuyển</h3><p>Chuỗi minitalk chia sẻ về tư duy chăm da khoa học, phong cách sống hiện đại và giải pháp dưỡng da đặc trị đa nhiệm dành riêng cho phái đẹp trong mỗi hành trình du lịch, di chuyển nhưng da vẫn đẹp.</p><div className="home-coming-soon"><span className="home-minitalk-reminder-icon" aria-hidden="true" /><p>Tập đầu tiên ngày 23/10.</p></div></div></div>
        </Container>
      </Section>
      <Section id="news" className={`home-news ${newsFont.variable}`}>
        <Container>
          <div className="home-section-title"><h2 className="type-display-l"><Link href="/tin-tuc">Tin tức</Link></h2><Link className="text-link" href="/tin-tuc">Xem tất cả<span aria-hidden="true">↗</span></Link></div>
          <div className="home-news-layout"><div className="home-news-grid">
            {newsItems.map((item, index) => <article className={`home-news-item${index === 0 ? ' home-news-item--featured' : ''}`} key={item.href}>
              <a className="home-news-image" href={item.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true"><Image src={item.image} alt="" width={1000} height={600} unoptimized /></a>
              <div className="home-news-copy"><h3 className="type-news-title"><a href={item.href} target="_blank" rel="noopener noreferrer">{item.title}</a></h3>{index === 0 && <p className="home-news-lead">Tà Xùa lần đầu ghi dấu ấn với danh hiệu điểm đến mới nổi hàng đầu châu Á tại giải thưởng du lịch quốc tế.</p>}</div>
            </article>)} </div><aside className="home-news-ad" aria-label="Vị trí quảng cáo demo"><Image src="/assets/key-visual/ADS%20300x600.jpg" alt="Quảng cáo demo Travel Awards" width={300} height={600} unoptimized /></aside></div>
        </Container>
      </Section>
      <Section id="nominate" tone="brand-deep" className="home-final-cta">
        <Container><Eyebrow>The First Signature</Eyebrow><h2 className="type-display-xl">Dấu ấn tiếp theo.<br /><em>Có thể là bạn.</em></h2><p>Cùng định hình tương lai du lịch Việt Nam.</p><NominationCTA className="home-cta" /><p className="home-final-deadline">Nhận đề cử đến 16.11.2026</p></Container>
      </Section>
      <Section id="organizer" className="home-organizer">
        <Container className="home-organizer-inner"><div className="home-organizer-logos"><div className="home-organizer-unit"><Eyebrow>Đơn vị tổ chức</Eyebrow><Image src="/assets/key-visual/logo vnexpress.svg" alt="VnExpress" width={1366} height={768} unoptimized /></div><div className="home-organizer-unit"><Eyebrow>Đơn vị vận hành</Eyebrow><Image src="/assets/key-visual/logo fpt online.svg" alt="FPT Online" width={1366} height={768} unoptimized /></div></div></Container>
      </Section>
    </main>
    <SiteFooter />
  </div>;
}


