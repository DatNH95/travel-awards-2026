import type { UiIconName } from './ui-icon';

export type CategoryGroupId = 'pillar' | 'pioneering';
export type SurveyCategory = Readonly<{
  id: string;
  letter: string;
  title: string;
  description: string;
  summary?: string;
  icon: UiIconName;
}>;
export type CategoryGroup = Readonly<{
  id: CategoryGroupId;
  title: string;
  label: string;
  categories: readonly SurveyCategory[];
}>;

// Static snapshot of the Google Sheet explicitly supplied by the user on 23.10.2026.
// Names/order: 'form đăng ký'!B8:B13 and B16:B24; descriptions: 'Tiêu chí'!D3:D8 and D10:D18.
// See docs/award-categories-source.json. No live connection to the Sheet or Travel Awards repo.
export const categoryGroups: readonly CategoryGroup[] = [
  {
    "id": "pillar",
    "title": "Trụ cột",
    "label": "Trụ cột",
    "categories": [
      {
        "id": "destination",
        "letter": "A",
        "title": "Điểm đến du lịch của năm",
        "description": "Vinh danh địa phương có bước phát triển du lịch nổi bật nhất trong năm: tăng trưởng khách, sản phẩm mới, hạ tầng, chính sách và hình ảnh điểm đến được nâng tầm rõ rệt.",
        "icon": "marker",
        "summary": "Điểm đến cấp tỉnh, thành phố."
      },
      {
        "id": "tour-operator",
        "letter": "B",
        "title": "Doanh nghiệp lữ hành của năm",
        "description": "Vinh danh doanh nghiệp lữ hành vận hành xuất sắc, sản phẩm tour đa dạng, đội ngũ chuyên nghiệp và được khách hàng tin tưởng cao nhất.",
        "icon": "mountains",
        "summary": "Doanh nghiệp lữ hành nội địa và quốc tế."
      },
      {
        "id": "hotel",
        "letter": "C",
        "title": "Khách sạn của năm",
        "description": "Vinh danh khách sạn mang lại trải nghiệm lưu trú xuất sắc: cơ sở vật chất, dịch vụ chuyên nghiệp và cảm nhận thực tế của khách lưu trú.",
        "icon": "building",
        "summary": "Chất lượng lưu trú và dịch vụ khách sạn."
      },
      {
        "id": "resort",
        "letter": "D",
        "title": "Khu nghỉ dưỡng của năm (Resort)",
        "description": "Vinh danh resort mang đến trải nghiệm nghỉ dưỡng đẳng cấp: không gian, cảnh quan, bản sắc địa phương và dịch vụ cao cấp trọn vẹn.",
        "icon": "sun",
        "summary": "Không gian, dịch vụ và trải nghiệm nghỉ dưỡng."
      },
      {
        "id": "airline",
        "letter": "E",
        "title": "Hãng hàng không du lịch của năm",
        "description": "Vinh danh hãng bay đóng góp tích cực vào phát triển du lịch qua mạng lưới đường bay, chất lượng phục vụ và hợp tác quảng bá điểm đến.",
        "icon": "plane",
        "summary": "Chất lượng phục vụ và kết nối du lịch."
      },
      {
        "id": "travel-experience",
        "letter": "F",
        "title": "Trải nghiệm du lịch của năm",
        "description": "Vinh danh một sản phẩm/trải nghiệm cụ thể gây tiếng vang và được du khách yêu thích nhất trong năm.",
        "icon": "star",
        "summary": "Tour, lễ hội và hành trình trải nghiệm nổi bật."
      }
    ]
  },
  {
    "id": "pioneering",
    "title": "Tiên phong",
    "label": "Tiên phong",
    "categories": [
      {
        "id": "tourism-personality",
        "letter": "G",
        "title": "Nhân vật du lịch của năm",
        "description": "Vinh danh cá nhân có đóng góp đáng kể, tạo ảnh hưởng tích cực cho hình ảnh và sự phát triển của du lịch Việt Nam.",
        "icon": "star",
        "summary": "Cá nhân có đóng góp cho du lịch Việt Nam."
      },
      {
        "id": "sustainability",
        "letter": "H",
        "title": "Sáng kiến du lịch bền vững của năm",
        "description": "Vinh danh dự án/sáng kiến có tác động đo lường được đến phát triển bền vững — môi trường, cộng đồng, văn hóa bản địa.",
        "icon": "leaf",
        "summary": "Sáng kiến vì môi trường, văn hóa và cộng đồng."
      },
      {
        "id": "green-destination",
        "letter": "I",
        "title": "Điểm đến du lịch xanh của năm",
        "description": "Vinh danh địa phương/khu du lịch tiên phong bảo vệ môi trường, giảm phát thải và bảo tồn tài nguyên thiên nhiên.",
        "icon": "marker",
        "summary": "Điểm đến bảo vệ môi trường và tài nguyên."
      },
      {
        "id": "creative-product",
        "letter": "J",
        "title": "Sản phẩm du lịch sáng tạo của năm",
        "description": "Vinh danh sản phẩm/dịch vụ du lịch mới, có tính đột phá — tour chuyên đề, ứng dụng công nghệ, hình thức trải nghiệm mới.",
        "icon": "rocket",
        "summary": "Sản phẩm và dịch vụ du lịch mới, khác biệt."
      },
      {
        "id": "digital",
        "letter": "K",
        "title": "Chuyển đổi số xuất sắc trong du lịch",
        "description": "Vinh danh doanh nghiệp/điểm đến ứng dụng công nghệ số hiệu quả để nâng cao trải nghiệm khách hàng và hiệu quả vận hành.",
        "icon": "microchip",
        "summary": "Ứng dụng công nghệ nâng cao trải nghiệm du lịch."
      },
      {
        "id": "community-tourism",
        "letter": "L",
        "title": "Làng du lịch cộng đồng tiêu biểu của năm",
        "description": "Vinh danh mô hình du lịch cộng đồng/làng/homestay giúp bảo tồn văn hóa bản địa và tạo sinh kế cho người dân địa phương.",
        "icon": "home",
        "summary": "Du lịch gắn với văn hóa và sinh kế địa phương."
      },
      {
        "id": "culinary-experience",
        "letter": "M",
        "title": "Trải nghiệm ẩm thực du lịch của năm",
        "description": "Vinh danh điểm đến/thương hiệu ẩm thực gắn với du lịch, góp phần định vị ẩm thực Việt Nam trên bản đồ du lịch thế giới.",
        "icon": "heart",
        "summary": "Ẩm thực đặc trưng gắn với trải nghiệm du lịch."
      },
      {
        "id": "tourism-ambassador",
        "letter": "N",
        "title": "Gương mặt truyền thông du lịch của năm",
        "description": "Vinh danh cá nhân có đóng góp lan tỏa hình ảnh du lịch Việt Nam qua truyền thông và mạng xã hội.",
        "icon": "star",
        "summary": "Gương mặt lan tỏa hình ảnh du lịch Việt Nam."
      },
      {
        "id": "tourism-campaign",
        "letter": "O",
        "title": "Chiến dịch quảng bá du lịch của năm",
        "description": "Vinh danh chiến dịch truyền thông/marketing du lịch có hiệu ứng lan tỏa và hiệu quả kích cầu nổi bật.",
        "icon": "apps",
        "summary": "Chiến dịch quảng bá và kích cầu du lịch."
      }
    ]
  }
];

export const totalCategories = categoryGroups.reduce((total, group) => total + group.categories.length, 0);
