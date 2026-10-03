import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BrandGraphic, SectionMarker, SignatureDivider } from '@/components/brand-graphics';
import { Container, Eyebrow, Section, TextLink, ResponsiveImage } from '@/components/primitives';
import { AwardTabs } from '@/components/award-tabs';
import { ScrollReveal } from '@/components/scroll-reveal';
import { HeroStage, NominationCountdown } from '@/components/hero-stage';
import { HeaderNavigation } from '@/components/header-navigation';
import { AwardCount } from '@/components/award-count';
import { SiteFooter } from '@/components/site-footer';
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

function journeyLead(text: string) {
  const words = text.trim().split(/\s+/);
  return words.length > 38 ? `${words.slice(0, 38).join(' ')}…` : text;
}

export default function HomePage() {
  return <div className="home">
    <ScrollReveal />
    <header className="home-header">
      <div className="home-publisher-bar">
        <Container className="home-publisher-inner">
          <div className="home-publisher-links"><a className="home-publisher-name" href="https://vnexpress.net/">VnExpress</a><span className="home-publisher-separator" aria-hidden="true" /><a href="https://vnexpress.net/du-lich">Du lịch</a></div>
          <a className="home-account-link" href="https://my.vnexpress.net/" target="_blank" rel="noopener noreferrer"><Image src="/assets/key-visual/login.svg" alt="" aria-hidden="true" width={20} height={20} unoptimized /><span>Đăng nhập</span></a>
        </Container>
      </div>
      <Container className="home-header-inner">
        <Link href="/#main" aria-label="Travel Awards — Trang chủ"><BrandGraphic variant="logo" /></Link>
        <HeaderNavigation />
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
            <div className="home-copy"><p className="type-body-large">Travel Awards là giải thưởng thường niên về du lịch nhằm tôn vinh những điểm đến, doanh nghiệp và dịch vụ du lịch tiêu biểu của Việt Nam.</p><p>Chủ đề của mùa giải đầu tiên Travel Awards, đánh dấu sự khởi đầu của hành trình tôn vinh những điểm đến, doanh nghiệp và cá nhân tiên phong đang kiến tạo những giá trị mới cho du lịch Việt Nam. Mỗi dấu ấn được ghi nhận không chỉ là thành tựu của hôm nay mà còn là nguồn cảm hứng cho sự phát triển bền vững của ngành trong tương lai.</p><TextLink href="#participate">Xem chi tiết</TextLink></div>
          </div>
        </Container>
      </Section>
      <Section id="journey" className="home-journey">
        <Container>
          <ChapterLabel number="02">Award Journey</ChapterLabel>
          <div className="home-section-title"><h2 className="type-display-l">Hành trình của một dấu ấn.</h2><TextLink href="#participate">Xem thể lệ</TextLink></div>
          <ol className="home-timeline">
            <li><span className="home-timeline-index">01 / Đề cử</span><div className="home-timeline-summary"><h3 className="type-heading-2">Vòng Sơ loại</h3><p className="home-timeline-date">Tháng 9 - Tháng 11</p></div><p>Các doanh nghiệp, điểm đến, dịch vụ và đơn vị hoạt động trong lĩnh vực du lịch trên toàn quốc gửi hồ sơ đề cử hoặc tự đề cử theo từng hạng mục thông qua cổng đăng ký trên chuyên trang Travel Awards.</p></li>
            <li><span className="home-timeline-index">02 / Bình chọn</span><div className="home-timeline-summary"><h3 className="type-heading-2">Sơ loại / Chung kết</h3><p className="home-timeline-date">Tháng 11 - Tháng 12</p></div><p>{journeyLead('Công bố danh sách các đề cử hợp lệ bước vào vòng Sơ loại. Độc giả VnExpress bình chọn cho các đề cử yêu thích, đồng thời Hội đồng chuyên môn tiến hành đánh giá theo bộ tiêu chí của từng hạng mục. Kết quả được tính dựa trên 40% điểm bình chọn của độc giả và 60% điểm đánh giá của Hội đồng chuyên môn.')}</p></li>
            <li><span className="home-timeline-index">03 / Vinh danh</span><div className="home-timeline-summary"><h3 className="type-heading-2">Gala trao giải</h3><p className="home-timeline-date">Tháng 1/2027</p></div><p>{journeyLead('Công bố danh sách đề cử vào vòng Chung kết. Độc giả tiếp tục bình chọn cho các đề cử xuất sắc nhất, song song với quá trình chấm điểm của Hội đồng chuyên môn. Kết quả chung cuộc được tính dựa trên 40% điểm bình chọn của độc giả và 60% điểm đánh giá của Hội đồng chuyên môn đối với tất cả các hạng mục, ngoại trừ Giải Bình chọn, được quyết định hoàn toàn dựa trên kết quả bình chọn của độc giả.')}</p></li>
          </ol>
        </Container>
      </Section>
      <Section id="awards" tone="brand-soft" className="home-awards">
        <Container>
          <ChapterLabel number="03">Giải thưởng</ChapterLabel>
          <div className="home-split"><div><h2 className="type-display-l">Giá trị bền vững.<br />Tinh thần tiên phong.</h2><p className="home-awards-intro">Hai nhóm giải thưởng. Mười lăm hạng mục.<br />Nhiều cách để tạo nên một dấu ấn.</p></div><div className="home-awards-count"><AwardCount /><Eyebrow>Hạng mục vinh danh</Eyebrow></div></div>
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
        <Container className="home-organizer-inner"><div className="home-organizer-logos"><div className="home-organizer-unit"><Eyebrow>Đơn vị tổ chức</Eyebrow><Image src="/assets/key-visual/logo vnexpress.svg" alt="VnExpress" width={1366} height={768} unoptimized /></div><div className="home-organizer-unit"><Eyebrow>Đơn vị vận hành</Eyebrow><Image src="/assets/key-visual/logo fpt online.svg" alt="FPT Online" width={1366} height={768} unoptimized /></div></div></Container>
      </Section>
    </main>
    <SiteFooter />
  </div>;
}
