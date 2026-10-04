export type NewsBlock =
  | { type: 'paragraph' | 'heading'; text: string }
  | { type: 'image'; src: string; alt: string; caption: string };

export type NewsArticle = {
  slug: string;
  title: string;
  lead: string;
  publishedAt: string;
  category: string;
  author: string;
  image: { src: string; alt: string; caption: string };
  content: NewsBlock[];
};

const keyVisual = {
  src: '/assets/key-visual/travel-awards-kv-v2.png',
  alt: 'Nhận diện Travel Awards 2026 với cảnh quan Việt Nam',
  caption: 'Key visual chính thức của Travel Awards 2026.',
};
const forest = {
  src: 'https://i1-dulich.vnecdn.net/2026/09/30/trekking-canhdongtalai-1790755-6724-8000-1790755048.jpg?w=1200&h=675&q=100&dpr=1&fit=crop&s=ouyLF0Ak6vYQlXk_JKvTfQ',
  alt: 'Hành trình khám phá thiên nhiên tại Cát Tiên',
  caption: 'Ảnh minh họa du lịch thiên nhiên. Nguồn: VnExpress Du lịch.',
};
const landscape = {
  src: 'https://i2-vnexpress.vnecdn.net/2026/09/27/DJI-0251-copy-4-1790519911.png?w=1200&h=675&q=100&dpr=1&fit=crop&s=TinwzC029-jInqWaUduOjw',
  alt: 'Cảnh quan mùa gặt tại Cao Bằng',
  caption: 'Ảnh minh họa cảnh quan Cao Bằng. Nguồn: VnExpress Du lịch.',
};
const mountain = {
  src: 'https://i1-dulich.vnecdn.net/2026/10/01/2aobor24edwga8cozpy3gh08dgf2j1-3502-7965-1790818861.webp?w=1200&h=675&q=100&dpr=1&fit=crop&s=-4yZB3eD8lf5Ylkuk6L7yg',
  alt: 'Cảnh quan núi tại Tà Xùa',
  caption: 'Ảnh minh họa cảnh quan Tà Xùa. Nguồn: VnExpress Du lịch.',
};

// Original demonstration copy, not published reporting. Images reuse approved site assets.
// Keep the data contract separate from presentation for a future CMS adapter.
export const newsArticles: NewsArticle[] = [
  {
    slug: 'travel-awards-dau-an-tien-phong',
    title: 'Travel Awards 2026: Hành trình ghi nhận những dấu ấn tiên phong',
    lead: 'Mùa giải đầu tiên hướng đến những điểm đến, doanh nghiệp và dịch vụ góp phần định hình tương lai du lịch Việt Nam.',
    category: 'Travel Awards', publishedAt: '2026-10-03T09:00:00+07:00', author: 'Travel Awards', image: keyVisual,
    content: [
      { type: 'paragraph', text: 'Travel Awards là giải thưởng thường niên về du lịch nhằm tôn vinh những điểm đến, doanh nghiệp và dịch vụ du lịch tiêu biểu của Việt Nam. Chủ đề The First Signature — Dấu ấn tiên phong mở đầu hành trình ghi nhận những giá trị mới của ngành.' },
      { type: 'image', ...keyVisual },
      { type: 'heading', text: 'Một dấu ấn, nhiều giá trị' },
      { type: 'paragraph', text: 'Một hành trình đáng nhớ có thể bắt đầu từ cảnh quan, một dịch vụ chu đáo hoặc sự kết nối với cộng đồng địa phương. Những trải nghiệm ấy gợi mở cách nhìn về du lịch: vừa khám phá, vừa trân trọng những giá trị của nơi mình đến.' },
      { type: 'paragraph', text: 'Hệ thống giải thưởng gồm hai nhóm Trụ cột và Tiên phong, với 15 hạng mục. Mỗi nhóm tạo không gian để nhìn nhận các đóng góp từ nhiều góc độ, từ hoạt động dịch vụ đến những sáng kiến và trải nghiệm mới.' },
      { type: 'heading', text: 'Chuẩn bị cho hành trình đề cử' },
      { type: 'paragraph', text: 'Người tham gia có thể bắt đầu bằng việc lựa chọn hạng mục phù hợp, chuẩn bị thông tin giới thiệu và tập hợp minh chứng. Mỗi hồ sơ chỉ đăng ký cho một hạng mục; nếu tham gia nhiều hạng mục, cần chuẩn bị hồ sơ riêng.' },
    ],
  },
  {
    slug: 'du-lich-gan-voi-thien-nhien', title: 'Khi hành trình khám phá gắn với gìn giữ thiên nhiên',
    lead: 'Từ những chuyến đi giữa rừng đến trải nghiệm tại điểm đến xanh, thiên nhiên mang lại cảm hứng cho cách du lịch có trách nhiệm.',
    category: 'Góc nhìn', publishedAt: '2026-10-02T10:00:00+07:00', author: 'Travel Awards', image: forest,
    content: [
      { type: 'paragraph', text: 'Khám phá thiên nhiên không chỉ là ngắm cảnh. Đó còn là cơ hội tìm hiểu hệ sinh thái, lắng nghe câu chuyện về vùng đất và nhận biết tác động của mỗi chuyến đi.' },
      { type: 'image', ...forest },
      { type: 'heading', text: 'Trải nghiệm từ những điều nhỏ' },
      { type: 'paragraph', text: 'Đi theo hướng dẫn tại điểm đến, hạn chế đồ dùng một lần và tôn trọng không gian sống của động vật là những lựa chọn thiết thực. Khi được thực hiện xuyên suốt hành trình, các thói quen nhỏ có thể tạo nên một trải nghiệm đáng nhớ.' },
      { type: 'paragraph', text: 'Việc gìn giữ cảnh quan cũng cần sự kết nối giữa đơn vị tổ chức, người dân và du khách. Những câu chuyện địa phương giúp mỗi chuyến đi có thêm chiều sâu và khuyến khích người tham gia trân trọng nơi mình đến.' },
    ],
  },
  {
    slug: 'ban-sac-dia-phuong-trong-moi-chuyen-di', title: 'Bản sắc địa phương trong mỗi chuyến đi',
    lead: 'Cảnh quan, ẩm thực và đời sống cộng đồng tạo nên những lớp trải nghiệm riêng của mỗi vùng đất.',
    category: 'Trải nghiệm', publishedAt: '2026-10-01T15:00:00+07:00', author: 'Travel Awards', image: landscape,
    content: [
      { type: 'paragraph', text: 'Mỗi vùng đất có một nhịp sống riêng. Quan sát mùa vụ, thưởng thức món ăn và trò chuyện với người dân là những cách để du khách hiểu thêm về điểm đến.' },
      { type: 'image', ...landscape },
      { type: 'heading', text: 'Kết nối với cộng đồng' },
      { type: 'paragraph', text: 'Một trải nghiệm giàu bản sắc bắt đầu từ sự tôn trọng. Tìm hiểu tập quán trước chuyến đi, xin phép khi chụp ảnh và sử dụng dịch vụ địa phương giúp tạo nên những kết nối gần gũi.' },
      { type: 'paragraph', text: 'Du khách có thể dành thêm thời gian cho một điểm dừng, thay vì chỉ đi qua. Những chi tiết nhỏ trong đời sống thường ngày đôi khi là điều được nhớ lâu nhất sau hành trình.' },
    ],
  },
  {
    slug: 'diem-den-va-nhung-cau-chuyen', title: 'Điểm đến và những câu chuyện làm nên dấu ấn',
    lead: 'Một khung cảnh đẹp mở đầu chuyến đi; câu chuyện về con người và văn hóa khiến hành trình đọng lại lâu hơn.',
    category: 'Điểm đến', publishedAt: '2026-09-30T09:00:00+07:00', author: 'Travel Awards', image: mountain,
    content: [
      { type: 'paragraph', text: 'Điểm đến có thể được nhìn qua nhiều lớp: cảnh quan, lịch sử, văn hóa và những người đang sống tại đó. Mỗi lớp bổ sung một góc nhìn cho hành trình khám phá.' },
      { type: 'image', ...mountain },
      { type: 'heading', text: 'Dành thời gian để cảm nhận' },
      { type: 'paragraph', text: 'Đi chậm hơn, tìm hiểu câu chuyện của vùng đất và lựa chọn trải nghiệm phù hợp giúp chuyến đi có chiều sâu. Một hành trình tốt không nhất thiết cần nhiều điểm dừng.' },
      { type: 'paragraph', text: 'Giữ gìn môi trường và tôn trọng đời sống địa phương là cách để những trải nghiệm ấy tiếp tục dành cho người đến sau.' },
    ],
  },
  {
    slug: 'chuan-bi-ho-so-de-cu', title: 'Chuẩn bị hồ sơ đề cử: Bắt đầu từ dấu ấn của bạn',
    lead: 'Lựa chọn hạng mục phù hợp và sắp xếp minh chứng rõ ràng là những bước đầu tiên khi chuẩn bị hồ sơ Travel Awards.',
    category: 'Hướng dẫn', publishedAt: '2026-09-29T09:00:00+07:00', author: 'Travel Awards', image: keyVisual,
    content: [
      { type: 'paragraph', text: 'Hồ sơ là nơi người tham gia giới thiệu hoạt động, giá trị và những kết quả của mình. Trước khi điền thông tin, hãy xem hệ thống hạng mục để lựa chọn phạm vi đề cử phù hợp.' },
      { type: 'image', ...keyVisual },
      { type: 'heading', text: 'Sắp xếp thông tin rõ ràng' },
      { type: 'paragraph', text: 'Thông tin giới thiệu nên có trọng tâm và gắn với minh chứng. Hình ảnh, tài liệu và liên kết cần được sắp xếp để người đọc dễ theo dõi câu chuyện của hồ sơ.' },
      { type: 'paragraph', text: 'Mỗi hồ sơ chỉ đăng ký cho một hạng mục. Trường hợp muốn tham gia nhiều hạng mục, vui lòng thực hiện hồ sơ riêng cho từng hạng mục.' },
    ],
  },
];

const demoTopics = [
  'Du lịch xanh từ những lựa chọn nhỏ', 'Một hành trình, nhiều trải nghiệm',
  'Khám phá bản sắc qua ẩm thực địa phương', 'Cộng đồng làm nên câu chuyện điểm đến',
  'Đi chậm để hiểu thêm một vùng đất', 'Những giá trị còn lại sau chuyến đi',
  'Chăm chút trải nghiệm trong từng điểm dừng', 'Kết nối di sản với hành trình hôm nay',
  'Cảnh quan và cảm hứng khám phá', 'Du lịch có trách nhiệm với địa phương',
  'Tìm dấu ấn riêng trong mỗi hành trình', 'Chuẩn bị cho một chuyến đi đáng nhớ',
];
// Local demo records for six pages of twelve stories; no API or persistence.
const demoArticles: NewsArticle[] = Array.from({ length: 71 }, (_, index) => {
  const seed = newsArticles[index % 4];
  const angles = ['', 'Góc nhìn: ', 'Trải nghiệm: ', 'Câu chuyện du lịch: ', 'Cảm hứng: ', 'Hành trình: '];
  return { ...seed, slug: `cau-chuyen-du-lich-${index + 1}`, title: `${angles[Math.floor(index / 12)]}${demoTopics[index % 12]}` };
});
const homepageArticles: NewsArticle[] = [
  {
    "lead": "Tà Xùa lần đầu được vinh danh điểm đến mới nổi hàng đầu châu Á",
    "content": [
      {
        "type": "paragraph",
        "text": "Nội dung demo để xem trước trang chi tiết tin tức của Travel Awards. Bài viết đầy đủ sẽ được cập nhật khi có nội dung chính thức."
      },
      {
        "src": "https://i1-dulich.vnecdn.net/2026/10/01/2aobor24edwga8cozpy3gh08dgf2j1-3502-7965-1790818861.webp?w=1200&h=675&q=100&dpr=1&fit=crop&s=-4yZB3eD8lf5Ylkuk6L7yg",
        "caption": "Ảnh: VnExpress Du lịch.",
        "type": "image",
        "alt": "Tà Xùa lần đầu được vinh danh điểm đến mới nổi hàng đầu châu Á"
      }
    ],
    "category": "Du lịch",
    "title": "Tà Xùa lần đầu được vinh danh điểm đến mới nổi hàng đầu châu Á",
    "slug": "ta-xua-lan-dau-duoc-vinh-danh-diem-den-moi-noi-hang-dau-chau-a-5126915",
    "publishedAt": "2026-10-01T09:00:00+07:00",
    "author": "Travel Awards · Demo",
    "image": {
      "src": "https://i1-dulich.vnecdn.net/2026/10/01/2aobor24edwga8cozpy3gh08dgf2j1-3502-7965-1790818861.webp?w=1200&h=675&q=100&dpr=1&fit=crop&s=-4yZB3eD8lf5Ylkuk6L7yg",
      "caption": "Ảnh: VnExpress Du lịch.",
      "alt": "Tà Xùa lần đầu được vinh danh điểm đến mới nổi hàng đầu châu Á"
    }
  },
  {
    "lead": "Tour cùng kiểm lâm xuyên rừng Cát Tiên được đề cử giải du lịch thế giới",
    "content": [
      {
        "type": "paragraph",
        "text": "Nội dung demo để xem trước trang chi tiết tin tức của Travel Awards. Bài viết đầy đủ sẽ được cập nhật khi có nội dung chính thức."
      },
      {
        "src": "https://i1-dulich.vnecdn.net/2026/09/30/trekking-canhdongtalai-1790755-6724-8000-1790755048.jpg?w=1200&h=675&q=100&dpr=1&fit=crop&s=ouyLF0Ak6vYQlXk_JKvTfQ",
        "caption": "Ảnh: VnExpress Du lịch.",
        "type": "image",
        "alt": "Tour cùng kiểm lâm xuyên rừng Cát Tiên được đề cử giải du lịch thế giới"
      }
    ],
    "category": "Du lịch",
    "title": "Tour cùng kiểm lâm xuyên rừng Cát Tiên được đề cử giải du lịch thế giới",
    "slug": "tour-cung-kiem-lam-xuyen-rung-cat-tien-duoc-de-cu-giai-du-lich-the-gioi-5126696",
    "publishedAt": "2026-10-01T09:00:00+07:00",
    "author": "Travel Awards · Demo",
    "image": {
      "src": "https://i1-dulich.vnecdn.net/2026/09/30/trekking-canhdongtalai-1790755-6724-8000-1790755048.jpg?w=1200&h=675&q=100&dpr=1&fit=crop&s=ouyLF0Ak6vYQlXk_JKvTfQ",
      "caption": "Ảnh: VnExpress Du lịch.",
      "alt": "Tour cùng kiểm lâm xuyên rừng Cát Tiên được đề cử giải du lịch thế giới"
    }
  },
  {
    "lead": "Cao Bằng vào mùa gặt",
    "content": [
      {
        "type": "paragraph",
        "text": "Nội dung demo để xem trước trang chi tiết tin tức của Travel Awards. Bài viết đầy đủ sẽ được cập nhật khi có nội dung chính thức."
      },
      {
        "src": "https://i2-vnexpress.vnecdn.net/2026/09/27/DJI-0251-copy-4-1790519911.png?w=1200&h=675&q=100&dpr=1&fit=crop&s=TinwzC029-jInqWaUduOjw",
        "caption": "Ảnh: VnExpress Du lịch.",
        "type": "image",
        "alt": "Cao Bằng vào mùa gặt"
      }
    ],
    "category": "Du lịch",
    "title": "Cao Bằng vào mùa gặt",
    "slug": "cao-bang-vao-mua-gat-5125445",
    "publishedAt": "2026-10-01T09:00:00+07:00",
    "author": "Travel Awards · Demo",
    "image": {
      "src": "https://i2-vnexpress.vnecdn.net/2026/09/27/DJI-0251-copy-4-1790519911.png?w=1200&h=675&q=100&dpr=1&fit=crop&s=TinwzC029-jInqWaUduOjw",
      "caption": "Ảnh: VnExpress Du lịch.",
      "alt": "Cao Bằng vào mùa gặt"
    }
  },
  {
    "lead": "Phong Nha - Kẻ Bàng giành 'cú đúp' giải thưởng du lịch quốc tế",
    "content": [
      {
        "type": "paragraph",
        "text": "Nội dung demo để xem trước trang chi tiết tin tức của Travel Awards. Bài viết đầy đủ sẽ được cập nhật khi có nội dung chính thức."
      },
      {
        "src": "https://i1-dulich.vnecdn.net/2026/09/28/dji-1790570736-3186-1790570740.jpg?w=1200&h=675&q=100&dpr=1&fit=crop&s=IBzng60cz4dpQdDmRDBr2A",
        "caption": "Ảnh: VnExpress Du lịch.",
        "type": "image",
        "alt": "Phong Nha - Kẻ Bàng giành 'cú đúp' giải thưởng du lịch quốc tế"
      }
    ],
    "category": "Du lịch",
    "title": "Phong Nha - Kẻ Bàng giành 'cú đúp' giải thưởng du lịch quốc tế",
    "slug": "phong-nha-ke-bang-gianh-cu-dup-giai-thuong-du-lich-quoc-te-5125627",
    "publishedAt": "2026-10-01T09:00:00+07:00",
    "author": "Travel Awards · Demo",
    "image": {
      "src": "https://i1-dulich.vnecdn.net/2026/09/28/dji-1790570736-3186-1790570740.jpg?w=1200&h=675&q=100&dpr=1&fit=crop&s=IBzng60cz4dpQdDmRDBr2A",
      "caption": "Ảnh: VnExpress Du lịch.",
      "alt": "Phong Nha - Kẻ Bàng giành 'cú đúp' giải thưởng du lịch quốc tế"
    }
  }
];
const allNewsArticles = [...newsArticles, ...homepageArticles, ...demoArticles];
export function getNewsArticles() { return allNewsArticles; }
export function getNewsArticle(slug: string) { return allNewsArticles.find(article => article.slug === slug); }
export function getRelatedNews(slug: string) { return newsArticles.filter(article => article.slug !== slug).slice(0, 3); }
