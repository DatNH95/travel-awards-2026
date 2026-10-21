import { awardGroups, awardCategoryId } from './awards';

const demoImages = [
  {src: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Golden_Bridge_Da-Nang.jpg', alt: 'Cầu Vàng tại Đà Nẵng', caption: 'Ảnh: xiquinhosilva / Wikimedia Commons, CC BY 2.0. Ảnh được crop khi hiển thị.', source: 'https://commons.wikimedia.org/wiki/File:Golden_Bridge_Da-Nang.jpg'},
  {src: 'https://static.vinwonders.com/production/2025/12/vinwonders-phu-quoc.jpg', alt: 'VinWonders Phú Quốc', caption: 'Ảnh minh họa: VinWonders.', source: 'https://vinwonders.com/en/vinwonders-phu-quoc/'},
  {src: 'https://static.vinwonders.com/production/Ngoi-lang-chien-binh-scaled-1.jpg', alt: 'Ngôi làng chiến binh tại VinWonders Phú Quốc', caption: 'Ảnh minh họa: VinWonders.', source: 'https://vinwonders.com/en/vinwonders-phu-quoc/'},
];
const demoTitles = [
  'Đà Nẵng – Hành trình khám phá thành phố biển',
  'VinWonders Phú Quốc – Thế giới trải nghiệm không giới hạn',
  'Khám phá ngôi làng chiến binh tại VinWonders Phú Quốc',
  'Đà Nẵng – Dấu ấn giữa thiên nhiên và kiến trúc',
  'VinWonders Phú Quốc – Một điểm đến, muôn vàn trải nghiệm',
  'Hành trình phiêu lưu dành cho cả gia đình tại VinWonders',
  'Đà Nẵng – Nơi những hành trình đáng nhớ bắt đầu',
  'VinWonders Phú Quốc – Khám phá thế giới giải trí và văn hóa qua những trải nghiệm dành cho mọi thế hệ',
  'VinWonders – Khơi nguồn cảm hứng khám phá',
  'Đà Nẵng – Kết nối văn hóa, thiên nhiên và con người',
];

// Six distinct images from the official VinWonders Phu Quoc page.
const phuQuocGallery = [demoImages[1], demoImages[2], ...[
  { src: 'https://static.vinwonders.com/production/Tet-VN-du-xuan-the-gioi-scaled-1.jpg', alt: 'Du khách khám phá khu lâu đài tại VinWonders Phú Quốc' },
  { src: 'https://static.vinwonders.com/2022/11/BXjgvzxd-Once-Show-1.jpg', alt: 'Sân khấu trình diễn Once Show tại VinWonders Phú Quốc' },
  { src: 'https://static.vinwonders.com/production/2026/03/tien-ca.jpg', alt: 'Biểu diễn nàng tiên cá trong thủy cung' },
  { src: 'https://static.vinwonders.com/production/2025/08/Anh-chup-man-hinh-2025-08-05-152810-1.png', alt: 'Đoàn diễu hành Carnival tại VinWonders Phú Quốc' },
].map(image => ({ ...image, caption: 'Ảnh: VinWonders.', source: 'https://vinwonders.com/en/vinwonders-phu-quoc/' }))];

const daNangGallery = [demoImages[0], ...[
  { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Da_Nang_Dragon_Bridge_%28I%29.jpg/1280px-Da_Nang_Dragon_Bridge_%28I%29.jpg', alt: 'Toàn cảnh cầu Rồng bắc qua sông Hàn', caption: 'Ảnh: Supanut Arunoprayote / Wikimedia Commons, CC BY 4.0.', source: 'https://commons.wikimedia.org/wiki/File:Da_Nang_Dragon_Bridge_(I).jpg' },
  { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Han_River_in_Da_Nang_1.jpg/1280px-Han_River_in_Da_Nang_1.jpg', alt: 'Cảnh quan hai bên sông Hàn tại Đà Nẵng', caption: 'Ảnh: Christophe95 / Wikimedia Commons, CC BY-SA 4.0.', source: 'https://commons.wikimedia.org/wiki/File:Han_River_in_Da_Nang_1.jpg' },
  { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/My_Khe_Beach_Danang_Coastline.jpg/1280px-My_Khe_Beach_Danang_Coastline.jpg', alt: 'Đường bờ biển Mỹ Khê nhìn từ trên cao', caption: 'Ảnh: Jpatokal / Wikimedia Commons, CC BY-SA 4.0.', source: 'https://commons.wikimedia.org/wiki/File:My_Khe_Beach_Danang_Coastline.jpg' },
  { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/My_Khe_Beach_1.jpg/1280px-My_Khe_Beach_1.jpg', alt: 'Bãi cát và sóng biển tại Mỹ Khê, Đà Nẵng', caption: 'Ảnh: Christophe95 / Wikimedia Commons, CC BY-SA 4.0.', source: 'https://commons.wikimedia.org/wiki/File:My_Khe_Beach_1.jpg' },
  { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Lady_Buddha_Statue_at_Linh_Ung_Pagoda.jpg/1280px-Lady_Buddha_Statue_at_Linh_Ung_Pagoda.jpg', alt: 'Tượng Quan Âm tại chùa Linh Ứng, Đà Nẵng', caption: 'Ảnh: SerChevalerie / Wikimedia Commons, CC0.', source: 'https://commons.wikimedia.org/wiki/File:Lady_Buddha_Statue_at_Linh_Ung_Pagoda.jpg' },
]];

// Front-end fixtures only. These are not official nominees or survey questions.
export const votingProfiles = awardGroups.flatMap((group, groupIndex) => group.categories.flatMap((category, categoryIndex) =>
  Array.from({length: 10}, (_, index) => {
    const categoryId = awardCategoryId(groupIndex, categoryIndex);
    const image = demoImages[index % demoImages.length];
    return {
      slug: `${categoryId}-ho-so-${index + 1}`,
      code: `TA26-${groupIndex + 1}${String(categoryIndex + 1).padStart(2, '0')}${index + 1}`,
      categoryId, category, group: group.name,
      name: demoTitles[index],
      organization: 'Vingroup', // User-supplied demo label; not an ownership/nomination assertion.
      location: index % 3 === 0 ? 'Đà Nẵng' : 'Phú Quốc',
      image,
      gallery: index % 3 === 0 ? daNangGallery : [image, ...phuQuocGallery.filter(item => item.src !== image.src)],
      surveyCount: 245, // Layout fixture only; never incremented by the demo survey.
      summary: 'Khám phá những giá trị địa phương qua hành trình gắn kết cảnh quan, văn hóa và con người.',
      description: 'Hồ sơ minh họa cho trải nghiệm bình chọn Travel Awards 2026. Nội dung giới thiệu cách một hành trình kết nối du khách với thiên nhiên, văn hóa và cộng đồng tại điểm đến. Thông tin này sẽ được thay thế bằng hồ sơ được duyệt khi có dữ liệu chính thức.',
      highlights: ['Kết nối với văn hóa và cộng đồng địa phương', 'Khuyến khích trải nghiệm có trách nhiệm', 'Mang đến những góc nhìn mới trong mỗi hành trình'],
    };
  })
));

export type VotingProfile = (typeof votingProfiles)[number];
