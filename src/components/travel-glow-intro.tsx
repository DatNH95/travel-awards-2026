import { Container, Eyebrow, Section, TextLink } from './primitives';

export function TravelGlowIntro() {
  return <Section id="travel-glow" className="home-travel-glow">
    <Container>
      <div className="travel-glow-layout">
        <div className="travel-glow-title">
          <Eyebrow>Cuộc thi chia sẻ trải nghiệm du lịch</Eyebrow>
          <h2 className="type-display-l">30 Plus<br /><span>Travel Glow</span></h2>
          <p className="travel-glow-hashtag">#30PlusTravelGlow</p>
          <svg className="travel-glow-art" viewBox="0 0 360 150" fill="none" aria-hidden="true"><circle cx="180" cy="68" r="42" fill="currentColor" opacity=".13"/><circle cx="180" cy="68" r="28" stroke="currentColor" strokeWidth="1.5"/><path className="travel-glow-sun-rays" d="M180 12v12m0 88v12M124 68h12m88 0h12M140 28l9 9m62 62 9 9m0-80-9 9m-62 62-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path className="travel-glow-route" d="M12 125C65 125 65 90 115 108s80 32 125 0 75-19 108-38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 7"/><circle cx="12" cy="125" r="4" fill="currentColor"/><circle cx="348" cy="70" r="5" fill="currentColor"/><path d="M32 88h42m212-49h38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/></svg>
        </div>
        <div className="travel-glow-copy">
          <h3>30+ rồi, chuyến đi nào khiến bạn rạng rỡ nhất?</h3>
          <p>Chia sẻ chuyến đi, khoảnh khắc và trải nghiệm giúp bạn vui hơn, tự tin hơn và tìm thấy phiên bản rạng rỡ của chính mình. Một hoạt động cộng đồng trong khuôn khổ Travel Awards, dành cho công dân Việt Nam từ đủ 30 tuổi.</p>
          <dl className="travel-glow-facts"><div><dt>Nhận bài dự thi</dt><dd>18/11 – 18/12/2026</dd></div><div><dt>Bình chọn</dt><dd>22/12/2026 – 05/01/2027</dd></div></dl>
          <TextLink href="/the-le#cuoc-thi-30plus-travelglow">Cách thức tham gia</TextLink>
        </div>
      </div>
    </Container>
  </Section>;
}
