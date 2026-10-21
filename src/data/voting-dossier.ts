import { categoryCriteria } from '@/app/(phase-1)/dang-ky-de-cu/category-criteria';
import { registrationFields, nominationFields } from '@/app/(phase-1)/dang-ky-de-cu/registration-data';
import type { VotingProfile } from './voting';

// Authored front-end fixtures, not verified statements about the pictured businesses.
const categoryContent: Record<string, { metrics: string[]; narratives: string[] }> = {
  'tru-cot-1': {
    metrics: [
      'Trong kỳ xét giải, điểm đến đón 4,8 triệu lượt khách, gồm 3,2 triệu khách nội địa và 1,6 triệu khách quốc tế; 2,9 triệu lượt khách lưu trú. Tổng thu du lịch đạt 12.600 tỷ đồng, tăng 18% so với cùng kỳ năm trước (4,1 triệu lượt khách; 10.680 tỷ đồng).',
      'Đưa vào khai thác tuyến tham quan văn hóa ven biển từ tháng 3/2026, kết nối 12 điểm trải nghiệm. Hoàn thiện 3 trạm thông tin du lịch, bổ sung 20 xe điện và tăng tần suất các tuyến kết nối trung tâm với khu du lịch.',
      'Triển khai chương trình “Bốn mùa khám phá” với 24 sự kiện; tổ chức 6 chương trình giới thiệu điểm đến và 4 chuyến khảo sát dành cho đối tác lữ hành. Ngân sách xúc tiến trong kỳ là 18 tỷ đồng.',
      'Phục hồi 2 không gian sinh hoạt văn hóa; tổ chức 18 đợt làm sạch bãi biển với 1.200 lượt tình nguyện viên; hỗ trợ 65 hộ kinh doanh tham gia chuỗi dịch vụ; đào tạo 180 hướng dẫn viên cộng đồng.',
      'Cổng thông tin điểm đến, fanpage du lịch và bản đồ số được cập nhật bằng tiếng Việt và tiếng Anh. Nội dung tập trung vào lịch sự kiện, hướng dẫn di chuyển và trải nghiệm văn hóa địa phương.',
    ],
    narratives: ['Mỗi tuyến tham quan gắn với quy tắc bảo vệ cảnh quan và hoạt động giới thiệu di sản. Người dân địa phương trực tiếp vận hành các điểm trải nghiệm, được đào tạo về an toàn và đón tiếp khách.', 'Các sản phẩm mới kết nối biển, làng nghề và ẩm thực trong cùng một hành trình. Hạ tầng thông tin, giao thông và tiện ích công cộng được phát triển đồng bộ để du khách dễ tự khám phá.', 'Cơ chế phối hợp giữa cơ quan quản lý và doanh nghiệp giúp cập nhật sản phẩm theo mùa. Chương trình xúc tiến ưu tiên thời gian lưu trú, chi tiêu tại địa phương và chất lượng trải nghiệm.'],
  },
  'tru-cot-2': {
    metrics: ['Doanh thu đạt 286 tỷ đồng, phục vụ 42.500 lượt khách; tăng lần lượt 21% và 18% so với cùng kỳ (236 tỷ đồng; 36.000 lượt).', 'Nội địa: 24.800 khách, 112 tỷ đồng. Inbound: 12.200 khách, 108 tỷ đồng. Outbound: 5.500 khách, 66 tỷ đồng.', 'Năm hành trình chủ lực: Di sản miền Trung; Sắc màu Tây Bắc; Mekong bản địa; Phú Quốc cho gia đình; Khám phá Việt Nam bằng đường sắt.', '160 nhân sự chính thức và 85 cộng tác viên; các bộ phận gồm điều hành, sản phẩm, kinh doanh, chăm sóc khách hàng và hướng dẫn viên.', 'Website đặt tour, fanpage và kênh video giới thiệu hành trình; nội dung được cập nhật hằng tuần bằng tiếng Việt và tiếng Anh.'],
    narratives: ['Ưu tiên lưu trú và nhà cung cấp địa phương, giới hạn quy mô đoàn ở những điểm nhạy cảm về môi trường. Chi phí trải nghiệm được thỏa thuận minh bạch với cộng đồng.', 'Danh mục tour phân theo nhóm khách và mùa du lịch; mỗi chương trình có phương án thời tiết, an toàn và hỗ trợ riêng.', 'Đội ngũ hướng dẫn viên tham gia 48 giờ đào tạo mỗi năm. Trung tâm điều hành hỗ trợ khách trong suốt hành trình và rà soát phản hồi sau mỗi đoàn.', 'Nền tảng quản lý đặt chỗ liên thông điều hành và chăm sóc khách hàng, rút ngắn thời gian xác nhận tour xuống còn 15 phút.'],
  },
  'tru-cot-3': {
    metrics: ['Khách sạn 5 sao với 240 phòng; công suất bình quân 78%, ADR 2,45 triệu đồng. Cùng kỳ năm trước: công suất 71%, ADR 2,2 triệu đồng.', 'Booking: 9,1/10 từ 1.240 đánh giá; Agoda: 9,0/10 từ 980 đánh giá; Google: 4,6/5 từ 2.100 đánh giá. Số liệu chốt ngày 30/09/2026.', '285 nhân sự; 92% đã qua đào tạo chuyên môn; bình quân 56 giờ đào tạo nội bộ/người/năm.', 'Website giới thiệu phòng và đặt dịch vụ trực tiếp, fanpage, kênh hình ảnh và tổng đài chăm sóc khách hàng.'],
    narratives: ['Thay chai nhựa dùng một lần bằng bình thủy tinh và trạm tiếp nước; giảm 22% nhựa tiêu thụ, theo dõi điện và nước trên mỗi đêm phòng.', 'Không gian phòng tận dụng ánh sáng tự nhiên; khu ẩm thực, phòng họp, hồ bơi và phòng tập được bảo trì theo kế hoạch hằng tháng.', 'Chương trình đào tạo gắn với từng vị trí và phản hồi của khách; đội ngũ có thể hỗ trợ bằng ba ngôn ngữ.', 'Khách có thể chọn tiện ích trước khi đến, nhận hướng dẫn địa phương qua mã QR và gửi yêu cầu dịch vụ trực tiếp từ điện thoại.'],
  },
  'tru-cot-4': {
    metrics: ['Khu nghỉ dưỡng rộng 18 ha với 180 phòng và 42 villa; công suất 76%, ADR 4,8 triệu đồng. Cùng kỳ: 69% và 4,3 triệu đồng. Dịch vụ gồm spa, 3 nhà hàng và khu trải nghiệm thiên nhiên.', 'Booking: 9,3/10 từ 860 đánh giá; Agoda: 9,2/10 từ 740 đánh giá; Google: 4,7/5 từ 1.560 đánh giá, cập nhật ngày 30/09/2026.', '360 nhân sự; 90% được đào tạo nghiệp vụ; 60 giờ đào tạo nội bộ/người/năm; 62% nhân sự đến từ địa phương.', 'Website đặt phòng trực tiếp, fanpage và kênh nội dung về nghỉ dưỡng, ẩm thực, chăm sóc sức khỏe.'],
    narratives: ['Giữ 65% diện tích cho cảnh quan xanh, tái sử dụng nước tưới và phân loại chất thải tại nguồn; giảm 16% điện năng trên mỗi đêm lưu trú.', 'Kiến trúc thấp tầng sử dụng vật liệu địa phương, kết nối phòng ở với vườn và lối dạo ven biển, hạn chế tác động đến địa hình tự nhiên.', 'Hành trình nghỉ dưỡng kết hợp trị liệu, lớp nấu ăn và hoạt động ngoài trời theo nhu cầu từng gia đình.', 'Ẩm thực theo mùa, workshop thủ công và chuyến thăm làng nghề được đồng tổ chức cùng nghệ nhân, tạo nguồn thu trực tiếp cho đối tác địa phương.'],
  },
  'tru-cot-5': {
    metrics: ['Khai thác 32 đường bay đi/đến/trong Việt Nam, 420 chuyến/tuần. Mở 4 đường bay du lịch mới trong kỳ, mỗi đường bay 3–7 chuyến/tuần.', 'Vận chuyển 6,2 triệu hành khách; 4,5 triệu khách nội địa và 1,7 triệu khách quốc tế, tăng 15% so với cùng kỳ.', 'Tỷ lệ đúng giờ bình quân đạt 89,6%; cùng kỳ năm trước 86,2%. Theo dõi theo tháng và theo từng sân bay khai thác.', 'Triển khai 8 đợt kích cầu, cung cấp 350.000 chỗ ưu đãi; bổ sung gói vé kết hợp lưu trú và chính sách linh hoạt cho gia đình.', 'Phối hợp với 6 địa phương xây dựng nội dung điểm đến, tổ chức 12 chuyến khảo sát và quảng bá trên các kênh trước, trong, sau chuyến bay.', 'Website, ứng dụng đặt vé, fanpage và bản tin hành khách; cung cấp thông tin bằng tiếng Việt, tiếng Anh.'],
    narratives: ['Tối ưu kế hoạch bay và giảm trọng lượng vật dụng trên khoang; thay một số đồ dùng nhựa bằng vật liệu tái sử dụng và theo dõi nhiên liệu theo chặng.', 'Lịch bay kết nối các trung tâm lớn với điểm đến mới, ưu tiên khung giờ thuận tiện để du khách nối chuyến và sử dụng dịch vụ tại địa phương.', 'Các đợt kích cầu phân bổ vào mùa thấp điểm, công bố rõ điều kiện vé và phối hợp cùng đối tác lưu trú.', 'Chiến dịch điểm đến được xây dựng cùng địa phương, kết hợp nội dung văn hóa, ẩm thực và sản phẩm mới để tăng nhu cầu khám phá.', 'Ứng dụng hỗ trợ nhận thông báo chuyến bay, tự làm thủ tục và quản lý dịch vụ bổ sung; đội ngũ mặt đất tăng hỗ trợ các nhóm khách cần trợ giúp.'],
  },
  'tru-cot-6': {
    metrics: ['Đón 86.000 lượt khách tham gia, tăng 24% so với mùa trước (69.350 lượt); tỷ lệ khách quay lại đạt 18%.', 'Đạt 8,4 triệu lượt tiếp cận, 620.000 lượt tương tác, 145 bài viết và video từ báo chí, nhà sáng tạo nội dung.', 'Google: 4,7/5 từ 1.280 đánh giá; Tripadvisor: 4,6/5 từ 620 đánh giá; 94% khách tham gia khảo sát sau trải nghiệm hài lòng.', 'Website giới thiệu lịch trải nghiệm, fanpage và kênh video; có hướng dẫn đặt chỗ, di chuyển và lưu ý an toàn.'],
    narratives: ['Câu chuyện di sản được kể bởi người địa phương qua ẩm thực, âm nhạc và nghề truyền thống; 45 hộ dân tham gia cung cấp dịch vụ.', 'Hành trình kết hợp khám phá tương tác với trình diễn trực tiếp, cho phép khách lựa chọn điểm dừng phù hợp với sở thích.', 'Kiểm soát sức chứa theo khung giờ, tập huấn an toàn trước mỗi mùa và duy trì nhóm hỗ trợ tại mọi điểm trải nghiệm.'],
  },
  'tien-phong-2': {
    metrics: ['Chương trình giảm nhựa tại 28 cơ sở du lịch, triển khai từ tháng 11/2025 với hệ thống trạm tiếp nước, thu gom và hướng dẫn nhà cung cấp.', 'Giảm 18 tấn nhựa dùng một lần, tái chế 32 tấn chất thải; 240 lao động được tập huấn và 36 hộ dân tham gia chuỗi thu gom.', 'Trước triển khai: 420 g chất thải nhựa/khách. Sau triển khai: 265 g/khách, giảm 37%; tỷ lệ phân loại đúng tăng từ 35% lên 81%.'],
    narratives: ['Kết hợp quy trình thay thế vật dụng với việc đo lường tại từng cơ sở, thay vì chỉ truyền thông nâng cao nhận thức.', 'Chi phí đầu tư được hoàn vốn dự kiến trong 18 tháng nhờ tiết kiệm vật tư; dữ liệu thu gom được đối chiếu hằng tháng.', 'Giảm chất thải phát sinh tại điểm đến và tạo thu nhập bổ sung cho nhóm lao động thu gom địa phương.', 'Bộ hướng dẫn và mẫu đo lường được chuẩn hóa để 50 cơ sở mới có thể áp dụng trong năm tiếp theo.'],
  },
  'tien-phong-3': {
    metrics: ['Áp dụng bộ tiêu chí vận hành xanh nội bộ từ tháng 12/2025; hoàn tất đánh giá tại 18 đơn vị dịch vụ. Chưa đăng ký chứng nhận quốc tế.', 'Giảm 26% rác thải chôn lấp và 19% nước sạch tiêu thụ/khách; 70% nhà cung cấp tham gia phân loại rác; tổ chức 24 hoạt động bảo vệ cảnh quan.'],
    narratives: ['Quản lý sức chứa theo ngày và đưa chỉ số môi trường vào đánh giá nhà cung cấp; du khách được hướng dẫn ứng xử ngay khi đặt dịch vụ.', 'Chỉ số điện, nước, chất thải được tổng hợp mỗi tháng và so sánh cùng kỳ để điều chỉnh vận hành.', '85 hộ dân cung cấp dịch vụ; quỹ cộng đồng nhận một phần doanh thu để duy trì cảnh quan và tổ chức hoạt động văn hóa.'],
  },
  'tien-phong-4': {
    metrics: ['Hành trình khám phá văn hóa bằng âm thanh định vị, ra mắt tháng 1/2026 tại 12 điểm dừng; nội dung có ba ngôn ngữ và chế độ phù hợp cho gia đình.', '18.600 lượt mua, doanh thu 5,2 tỷ đồng; 92% người dùng hoàn thành hành trình, 31% tiếp tục đặt một dịch vụ địa phương.', 'Website giới thiệu sản phẩm, trang đặt chỗ và kênh video hướng dẫn trải nghiệm.'],
    narratives: ['Âm thanh, câu chuyện và nhiệm vụ khám phá thay đổi theo vị trí, kết nối không gian thật với nội dung tương tác mà không cần lắp đặt thiết bị tại di tích.', 'Có thể bổ sung ngôn ngữ và điểm dừng từ cùng nền tảng; mô hình chia sẻ doanh thu tạo động lực cho cộng đồng tiếp tục phát triển nội dung.'],
  },
  'tien-phong-5': {
    metrics: ['Nền tảng quản lý trải nghiệm khách hàng triển khai chính thức từ 12/2025, kết nối đặt dịch vụ, chăm sóc khách và điều hành tại 8 cơ sở.', 'Ứng dụng di động, mã QR, dữ liệu tập trung và trợ lý AI hỗ trợ tra cứu dịch vụ bằng tiếng Việt, tiếng Anh.', 'Thời gian xác nhận giảm từ 25 phút xuống 7 phút; tiết kiệm 3.600 giờ xử lý/tháng; 78% yêu cầu được giải quyết ngay trên nền tảng.'],
    narratives: ['Dữ liệu đặt dịch vụ và phản hồi được đồng bộ để đội ngũ vận hành có một nguồn thông tin xuyên suốt hành trình.', 'Khách tra cứu lịch trình, gửi yêu cầu và nhận hướng dẫn trên điện thoại; mức hài lòng tăng từ 4,2 lên 4,6/5.', 'Tự động phân công và theo dõi yêu cầu giúp giảm thao tác lặp lại, ưu tiên những tình huống cần con người hỗ trợ.'],
  },
  'tien-phong-6': {
    metrics: ['Mô hình do hợp tác xã địa phương điều hành, kết hợp 24 homestay, không gian thủ công và các tuyến đi bộ tìm hiểu văn hóa.', 'Đón 21.500 lượt khách, doanh thu dịch vụ 12,8 tỷ đồng, tăng 22% so với cùng kỳ; thời gian lưu trú bình quân 1,8 đêm.', '68 hộ dân tham gia; tạo 145 việc làm thường xuyên và thời vụ; thu nhập bình quân từ du lịch 6,8 triệu đồng/người/tháng.'],
    narratives: ['Du khách ở cùng cộng đồng, học làm sản phẩm thủ công và tham gia sinh hoạt văn hóa theo lịch của làng; người dân quyết định cách giới thiệu di sản.', 'Quy định sức chứa, phân loại rác và lịch luân phiên đón khách giúp giảm áp lực lên cảnh quan, đồng thời phân bổ cơ hội kinh doanh.', 'Hợp tác xã công khai doanh thu và trích quỹ bảo tồn; phụ nữ và người trẻ tham gia quản lý, hướng dẫn và phát triển sản phẩm.'],
  },
  'tien-phong-7': {
    metrics: ['Phục vụ 38.000 lượt khách, doanh thu 24 tỷ đồng trong kỳ xét giải; tỷ lệ khách du lịch quốc tế 42%.', 'Không gian 120 chỗ ngồi, bếp mở và thực đơn theo mùa; du khách được nghe câu chuyện nguyên liệu và tham gia lớp nấu ăn 90 phút.', 'Được giới thiệu trong tuyển tập ẩm thực địa phương năm 2026; chưa đăng ký xếp hạng quốc tế.', 'Website giới thiệu thực đơn, fanpage và kênh hình ảnh món ăn, nghệ nhân, nguyên liệu theo mùa.', 'Google: 4,7/5 từ 940 đánh giá; Tripadvisor: 4,6/5 từ 510 đánh giá, chốt ngày 30/09/2026.'],
    narratives: ['Thực đơn lấy cảm hứng từ món ăn truyền thống và nguyên liệu trong bán kính 80 km, đổi mới cách trình bày nhưng giữ kỹ thuật chế biến cốt lõi.', 'Đội ngũ giải thích khẩu vị, chế độ ăn và nguồn gốc nguyên liệu; thực đơn song ngữ có giá rõ ràng, cung cấp lựa chọn chay và hỗ trợ dị ứng.'],
  },
  'tien-phong-9': {
    metrics: ['Chiến dịch “Đi để chạm vào bản sắc”, triển khai từ 01/2026 đến 08/2026, kết hợp phim ngắn, bản đồ trải nghiệm và sự kiện tại điểm đến.', 'Mục tiêu 12 triệu lượt tiếp cận và 20.000 lượt quan tâm đặt dịch vụ; kết quả 16,8 triệu lượt tiếp cận và 27.500 lượt quan tâm, đạt 140% và 137,5%.', '1,2 triệu lượt tương tác, 280 bài viết/video, 8.200 lượt đặt dịch vụ được ghi nhận qua mã chiến dịch; lượng khách ở nhóm đối tác tăng 17%.'],
    narratives: ['Thông điệp khai thác góc nhìn của người địa phương, dùng câu chuyện đời sống để dẫn khách đến những trải nghiệm có thể tham gia trực tiếp.', 'Đo lường từ tiếp cận đến đặt dịch vụ qua mã chiến dịch, khảo sát nhận biết thương hiệu và báo cáo của các đối tác để đánh giá đóng góp thực tế.'],
  },
};

const clean = (label: string) => label.replace(/\*$/, '');
export type DossierEntry = { label: string; value: string };

export function getVotingDossier(profile: VotingProfile) {
  const criteria = categoryCriteria[profile.category];
  const content = categoryContent[profile.categoryId];
  const intro = `${profile.name} mở ra một hành trình kết nối cảnh quan, văn hóa và con người tại ${profile.location}. Từ những điểm dừng quen thuộc đến các hoạt động khám phá mới, mỗi trải nghiệm được xây dựng để du khách có thể chủ động lựa chọn nhịp điệu và cách tận hưởng của riêng mình.`;
  const overview = `${intro}\n\nTrong năm xét giải, đơn vị tập trung cải thiện chất lượng phục vụ, phát triển sản phẩm theo mùa và mở rộng hợp tác cùng các đối tác địa phương. Những câu chuyện về ẩm thực, nghề truyền thống và đời sống cộng đồng được đưa vào hành trình, giúp mỗi chuyến đi có thêm chiều sâu và sự gắn kết.\n\nĐội ngũ vận hành chú trọng an toàn, sự thuận tiện và khả năng tiếp cận của nhiều nhóm khách. Phản hồi sau trải nghiệm được tổng hợp định kỳ để điều chỉnh dịch vụ; các hoạt động sử dụng tài nguyên và bảo vệ cảnh quan được lồng ghép vào quy trình hằng ngày.`;
  const commonValues = [profile.organization, 'Doanh nghiệp dịch vụ du lịch', `${profile.location}, Việt Nam`, 'https://travel-experience.example.com', 'https://social.example.com/travel-experience'];
  function entries(fields: { label: string }[], values: string[]): DossierEntry[] {
    return fields.map((field, index) => ({ label: clean(field.label), value: values[index] }));
  }
  const achievement = content?.metrics[0] ?? 'Trong năm xét giải, hoàn thành chuỗi hoạt động kết nối cộng đồng và giới thiệu văn hóa địa phương; đồng hành cùng các chương trình truyền thông về du lịch có trách nhiệm.';
  return {
    intro,
    common: entries(registrationFields, commonValues),
    destination: profile.categoryId === 'tru-cot-1' ? { label: 'Cơ quan/đơn vị đại diện đề cử', value: `Trung tâm Xúc tiến Du lịch ${profile.location}` } : null,
    nomination: entries(nominationFields, [profile.name, overview, `${achievement}\n\nBên cạnh kết quả hoạt động, hồ sơ chú trọng chất lượng phục vụ và sự tham gia của đối tác địa phương. Các chương trình đào tạo và đánh giá định kỳ giúp duy trì trải nghiệm nhất quán xuyên suốt hành trình.`, 'Điểm khác biệt nằm ở sự kết nối giữa trải nghiệm hiện đại và bản sắc địa phương. Du khách không chỉ tham quan mà còn có cơ hội lắng nghe câu chuyện, tương tác với người dân và tham gia hoạt động phù hợp với sở thích. Cách tổ chức linh hoạt cho phép gia đình, nhóm bạn và khách đi riêng cùng tìm thấy một hành trình đáng nhớ.']),
    professional: criteria && content ? entries(criteria.fields, content.metrics) : [],
    narratives: criteria && content ? entries(criteria.narratives, content.narratives) : [],
  };
}
