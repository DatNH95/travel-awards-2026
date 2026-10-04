import Image from 'next/image';
import Link from 'next/link';
import { BrandGraphic } from './brand-graphics';
import { Container } from './primitives';

export function SiteFooter({ homePrefix = '' }: { homePrefix?: '' | '/' }) {
  return <footer className="home-footer"><Container>
    <div className="home-footer-navigation"><Link href="/#main" aria-label="Travel Awards — Trang chủ"><BrandGraphic variant="logo" /></Link><nav aria-label="Điều hướng chân trang"><a href="/#main" aria-label="Trang chủ"><Image src="/assets/key-visual/home.svg" alt="" width={20} height={20} unoptimized /></a><a href={`${homePrefix}#awards`}>Giải thưởng</a><Link href="/the-le">Thể lệ</Link><a href={`${homePrefix}#news`}>Tin tức</a></nav></div>
    <div className="home-footer-utilities"><a className="home-footer-utility" href="https://vnexpress.net/">← Trở lại VnExpress</a><div><button type="button" className="home-footer-utility home-footer-utility--facebook" disabled title="Fanpage sẽ được cập nhật"><span className="home-footer-icon home-footer-icon--facebook" aria-hidden="true" />Fanpage</button><a className="home-footer-utility home-footer-utility--feedback" href="mailto:sukien@vnexpress.net"><span className="home-footer-icon home-footer-icon--feedback" aria-hidden="true" />Góp ý cho sự kiện</a><a className="home-footer-utility" href="https://vnexpress.net/dieu-khoan-su-dung">Điều khoản sử dụng</a><a href="#main">Về đầu trang ↑</a></div></div>
    <div className="home-footer-information"><div><p className="home-footer-label">Báo tiếng Việt nhiều người xem nhất</p><p>Thuộc Bộ Khoa học và Công nghệ</p><p>Số giấy phép: 548/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 24/8/2021</p><dl><div><dt>Tổng biên tập:</dt><dd>Phạm Văn Hiếu</dd></div><div><dt>Địa chỉ:</dt><dd>Tầng 10, Tòa A FPT Tower, số 10 Phạm Văn Bạch, <span className="home-footer-address-locality">phường Cầu Giấy, Hà Nội</span></dd></div><div><dt>Đường dây nóng:</dt><dd><a href="tel:0838880123">083 888 0123</a></dd></div><div><dt>Email:</dt><dd><a href="mailto:bandoc@vnexpress.net">bandoc@vnexpress.net</a></dd></div></dl></div><div><p className="home-footer-label">Thông tin liên hệ</p><dl><div><dt>Email:</dt><dd><a href="mailto:sukien@vnexpress.net">sukien@vnexpress.net</a></dd></div></dl><p className="home-footer-label">Tài trợ sự kiện</p><dl><div><dt>Đại diện:</dt><dd>Vũ Bình Minh</dd></div><div><dt>Email:</dt><dd><a href="mailto:MinhVB@fpt.com">MinhVB@fpt.com</a></dd></div><div><dt>Điện thoại:</dt><dd><a href="tel:0915681515">0915681515</a></dd></div></dl></div></div>
    <div className="home-footer-bottom"><span>© 1997–2026. Toàn bộ bản quyền thuộc VnExpress.</span><span>Travel Awards 2026</span></div>
  </Container></footer>;
}


