import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BrandGraphic, SectionMarker, SignatureDivider } from '@/components/brand-graphics';
import { Container, Eyebrow, Section, TextLink, ResponsiveImage } from '@/components/primitives';
import { AwardTabs } from '@/components/award-tabs';
import { ScrollReveal } from '@/components/scroll-reveal';
import { HeroStage, NominationCountdown } from '@/components/hero-stage';
import './home.css';

export const metadata: Metadata = {
  title: 'Travel Awards 2026 — Dấu ấn tiên phong',
  description: 'Tôn vinh những dấu ấn góp phần định hình tương lai du lịch Việt Nam. Đề cử đến ngày 16.11.2026.',
};

function NominationLink({ children = 'GỬI ĐỀ CỬ' }: { children?: React.ReactNode }) {
  return <Link href="/nomination" className="button button--primary home-cta">{children}<span aria-hidden="true">↗</span></Link>;
}

function ChapterLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="home-chapter"><span>{number}</span><SectionMarker /><Eyebrow>{children}</Eyebrow></div>;
}

export default function HomePage() {
  return <div className="home">
    <ScrollReveal />
    <header className="home-header">
      <div className="home-publisher-bar">
        <Container className="home-publisher-inner">
          <div className="home-publisher-links"><a className="home-publisher-name" href="https://vnexpress.net/">VnExpress</a><span className="home-publisher-separator" aria-hidden="true" /><a href="https://vnexpress.net/du-lich">Du lịch</a></div>
          <a className="home-account-link" href="https://my.vnexpress.net/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="7" r="3.5" /><path d="M5 21v-3a7 7 0 0 1 14 0v3M5 18c4 2 10 2 14 0" /></svg><span>Đăng nhập MyVnE</span></a>
        </Container>
      </div>
      <Container className="home-header-inner">
        <Link href="/" aria-label="Travel Awards — Trang chủ"><BrandGraphic variant="logo" /></Link>
        <nav aria-label="Điều hướng chính">
          <Link href="/" className="home-nav-home" aria-label="Trang chủ" aria-current="page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M9 21v-8h6v8" /></svg></Link><a href="#participate">Thể lệ</a><a href="#news">Tin tức</a>
        </nav>
      </Container>
    </header>
    <main id="main">
      <HeroStage>
        <Image className="home-hero-landscape" src="/assets/key-visual/travel-awards-kv-v2.png" alt="" aria-hidden="true" width={1920} height={1080} unoptimized preload />
        <div className="home-hero-content">
          <Eyebrow>Travel Awards 2026</Eyebrow>
          <h1 id="hero-title"><span className="home-sr-only">THE FIRST SIGNATURE — DẤU ẤN TIÊN PHONG</span><BrandGraphic variant="campaign" /></h1>
          <p className="home-hero-statement">Tôn vinh những dấu ấn góp phần định hình<br className="home-desktop-break" /> tương lai du lịch Việt Nam.</p>
          <div className="home-hero-actions"><NominationCountdown /><NominationLink /></div>
        </div>
        <div className="home-hero-foot"><a href="#about">Khám phá hành trình <span aria-hidden="true">↓</span></a></div>
      </HeroStage>
      <Section id="about" className="home-about">
        <Container>
          <ChapterLabel number="01">Về Travel Awards</ChapterLabel>
          <div className="home-split">
            <h2 className="type-display-l"><span className="home-about-signature">The First Signature</span><br />Dấu ấn tiên phong</h2>
            <div className="home-copy"><p className="type-body-large">Travel Awards là giải thưởng thường niên về du lịch nhằm tôn vinh những điểm đến, doanh nghiệp và dịch vụ du lịch tiêu biểu của Việt Nam.</p><p>Chủ đề của mùa giải đầu tiên Travel Awards, đánh dấu sự khởi đầu của hành trình tôn vinh những điểm đến, doanh nghiệp và cá nhân tiên phong đang kiến tạo những giá trị mới cho du lịch Việt Nam. Mỗi dấu ấn được ghi nhận không chỉ là thành tựu của hôm nay mà còn là nguồn cảm hứng cho sự phát triển bền vững của ngành trong tương lai.</p><TextLink href="#participate">Xem thể lệ</TextLink></div>
          </div>
        </Container>
      </Section>
      <Section id="journey" className="home-journey">
        <Container>
          <ChapterLabel number="02">Award Journey</ChapterLabel>
          <div className="home-section-title"><h2 className="type-display-l">Hành trình của một dấu ấn.</h2><p>Từ sự ghi nhận hôm nay<br />đến khoảnh khắc vinh danh.</p></div>
          <ol className="home-timeline">
            <li><span className="home-timeline-index">01 / ĐỀ CỬ</span><h3 className="type-heading-2">Khởi đầu dấu ấn</h3><p className="home-timeline-date">16.10 — 16.11<span>2026</span></p><p>Gửi đề cử cho những giá trị xứng đáng được ghi nhận.</p></li>
            <li><span className="home-timeline-index">02 / BÌNH CHỌN</span><h3 className="type-heading-2">Lan tỏa giá trị</h3><p className="home-timeline-date">23.11 — 21.12<span>2026</span></p><p>Cùng cộng đồng lựa chọn những dấu ấn tiêu biểu.</p></li>
            <li><span className="home-timeline-index">03 / VINH DANH</span><h3 className="type-heading-2">Chạm tới tương lai</h3><p className="home-timeline-date">15.01<span>2027</span></p><p>Gặp gỡ và tôn vinh những dấu ấn tiên phong.</p></li>
          </ol>
        </Container>
      </Section>
      <Section id="awards" tone="brand-soft" className="home-awards">
        <Container>
          <ChapterLabel number="03">Award System</ChapterLabel>
          <div className="home-split"><div><h2 className="type-display-l">Giá trị bền vững.<br />Tinh thần tiên phong.</h2><p className="home-awards-intro">Hai nhóm giải thưởng. Mười lăm hạng mục.<br />Nhiều cách để tạo nên một dấu ấn.</p></div><div className="home-awards-count"><span>15</span><Eyebrow>Hạng mục vinh danh</Eyebrow></div></div>
          <SignatureDivider />
          <AwardTabs />
        </Container>
      </Section>
      <Section id="participate" className="home-participate">
        <Container>
          <ChapterLabel number="04">How to Participate</ChapterLabel>
          <div className="home-split"><h2 className="type-display-l">Dấu ấn của bạn.<br />Bắt đầu từ đây.</h2><div className="home-steps">
            <div><span>01</span><div><h3 className="type-heading-3">Chọn hạng mục</h3><p>Tìm hạng mục phù hợp với dấu ấn bạn muốn đề cử.</p></div></div>
            <div><span>02</span><div><h3 className="type-heading-3">Chuẩn bị hồ sơ</h3><p>Kể câu chuyện của bạn cùng thông tin và minh chứng liên quan.</p></div></div>
            <div><span>03</span><div><h3 className="type-heading-3">Gửi đề cử</h3><p>Hoàn thành đề cử trước ngày 16.11.2026.</p></div></div>
            <NominationLink />
          </div></div>
        </Container>
      </Section>
      <Section id="minitalk" tone="brand-deep" className="home-minitalk">
        <Container>
          <ChapterLabel number="05">Minitalk / Những cuộc trò chuyện</ChapterLabel>
          <div className="home-minitalk-grid"><div><Eyebrow>Travel. Ideas. Inspiration.</Eyebrow><h2>Glow On<br /><em>The Go.</em></h2></div><div className="home-minitalk-copy"><p className="type-heading-2">Đi để khám phá.<br />Gặp để mở lối.</p><p>Những cuộc trò chuyện về hành trình, cảm hứng và các góc nhìn mới cho du lịch Việt Nam.</p><div className="home-coming-soon"><span className="type-label">Sắp công bố</span><p>Lịch trò chuyện và khách mời sẽ được cập nhật.</p></div></div></div>
        </Container>
      </Section>
      <Section id="news" className="home-news">
        <Container>
          <ChapterLabel number="06">News / Nhật ký hành trình</ChapterLabel>
          <div className="home-section-title"><h2 className="type-display-l">Những câu chuyện tiếp nối.</h2><span className="home-content-status">Nội dung preview · chờ bài viết chính thức</span></div>
          <div className="home-news-grid">
            <article className="home-news-feature"><ResponsiveImage src="/assets/key-visual/travel-awards-kv-v2.png" alt="Cảnh quan và địa danh Việt Nam từ Key Visual Travel Awards 2026" ratio="wide" unoptimized /><Eyebrow>Travel Awards 2026 / Câu chuyện thương hiệu</Eyebrow><h3 className="type-heading-1">Dấu ấn tiên phong:<br />mở ra một hành trình mới.</h3><p>Một góc nhìn về những giá trị góp phần định hình tương lai du lịch Việt Nam.</p></article>
            <div className="home-news-secondary">
              <article><Eyebrow>01 / Giải thưởng</Eyebrow><h3 className="type-heading-2">Hai nhóm giải thưởng.<br />Một tinh thần tiên phong.</h3><p>Ghi nhận nền tảng bền vững và những hướng đi mới.</p></article>
              <article><Eyebrow>02 / Hành trình</Eyebrow><h3 className="type-heading-2">Từ câu chuyện của bạn<br />đến dấu ấn cộng đồng.</h3><p>Cùng lan tỏa những hành trình xứng đáng được biết đến.</p></article>
              <article><Eyebrow>03 / Minitalk</Eyebrow><h3 className="type-heading-2">Glow On The Go.<br />Cảm hứng trên mỗi bước đi.</h3><p>Những cuộc gặp gỡ để nhìn du lịch từ một góc mới.</p></article>
            </div>
          </div>
        </Container>
      </Section>
      <Section id="nominate" tone="brand-deep" className="home-final-cta">
        <Container><Eyebrow>The First Signature</Eyebrow><h2 className="type-display-xl">Dấu ấn tiếp theo.<br /><em>Có thể là bạn.</em></h2><p>Cùng định hình tương lai du lịch Việt Nam.</p><NominationLink /><p className="home-final-deadline">Nhận đề cử đến 16.11.2026</p></Container>
      </Section>
      <Section id="organizer" className="home-organizer">
        <Container className="home-organizer-inner"><Eyebrow>Đơn vị tổ chức</Eyebrow><div className="home-organizer-logos"><Image src="/assets/key-visual/logo fpt online.svg" alt="FPT Online" width={1366} height={768} unoptimized /><Image src="/assets/key-visual/logo vnexpress.svg" alt="VnExpress" width={1366} height={768} unoptimized /></div></Container>
      </Section>
    </main>
    <footer className="home-footer"><Container><div className="home-footer-top"><div><Link href="/" aria-label="Travel Awards — Trang chủ"><BrandGraphic variant="logo" /></Link><p>Dấu ấn tiên phong.<br />Tương lai du lịch Việt Nam.</p></div><nav aria-label="Điều hướng chân trang"><a href="#about">Về giải thưởng</a><a href="#awards">Hệ thống giải thưởng</a><a href="#participate">Cách tham gia</a><a href="#news">Tin tức</a></nav><div><Eyebrow>Travel Awards 2026</Eyebrow><TextLink href="/nomination">Gửi đề cử của bạn</TextLink></div></div><div className="home-footer-bottom"><span>© 2026 Travel Awards</span><span>THE FIRST SIGNATURE</span><a href="#main">Về đầu trang ↑</a></div></Container></footer>
  </div>;
}
