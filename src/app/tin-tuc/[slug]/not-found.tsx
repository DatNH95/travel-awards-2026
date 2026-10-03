import Link from 'next/link';
import { Container } from '@/components/primitives';
export default function ArticleNotFound() {
  return <main id="main" className="news-main"><Container><h1 className="type-heading-2">Không tìm thấy bài viết</h1><p className="news-lead">Bài viết bạn tìm kiếm không có trong danh sách tin tức.</p><Link className="text-link" href="/tin-tuc">Trở về Tin tức</Link></Container></main>;
}
