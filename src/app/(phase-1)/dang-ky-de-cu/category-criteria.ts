// Source: Travel Awards - Bộ tiêu chí update 22.10.xlsx, Giải trụ cột!A4:E9 / Giải tiên phong!A4:E12.
// Verified 2026-10-23, including red text; regenerate with scripts/read-registration-criteria.py <workbook>.
import type { RegistrationField } from './registration-data';
export type CategoryCriteria = {
  audience: string; conditions: string[]; fields: RegistrationField[];
  narratives: RegistrationField[]; evidence: string[];
  images: { min: number; max: number | null }; menuRequired: boolean;
};
export const categoryCriteria: Record<string, CategoryCriteria> = {
  "Điểm đến du lịch của năm": {
    "audience": "Các điểm đến cấp tỉnh, thành phố trực thuộc Trung ương, đề cử qua Sở Du lịch, Sở VHTTDL hoặc UBND tỉnh, thành phố.",
    "conditions": [
      "Hồ sơ do Sở Du lịch/Sở VHTTDL hoặc UBND tỉnh, thành phố chính thức lập và nộp (không nhận hồ sơ do cá nhân/doanh nghiệp tự đề cử một tỉnh, thành)",
      "Mỗi tỉnh, thành phố chỉ nộp 01 hồ sơ cho hạng mục này",
      "Không có sự cố an ninh, an toàn du khách đặc biệt nghiêm trọng trong kỳ xét giải (01/10/2025–30/09/2026). Sự cố nghiêm trọng được hiểu là có thương vong hoặc có văn bản chỉ đạo xử lý của cơ quan Trung ương (Bộ VHTTDL, Bộ Công an, Cục Du lịch Quốc gia Việt Nam)."
    ],
    "fields": [
      {
        "label": "Số liệu khách và tổng thu du lịch",
        "type": "textarea",
        "help": "Tổng lượt khách (nội địa, quốc tế), lượt khách lưu trú, tổng thu du lịch trong kỳ xét giải và cùng kỳ năm trước"
      },
      {
        "label": "Sản phẩm, hạ tầng và kết nối giao thông mới",
        "type": "textarea",
        "help": "Danh mục sản phẩm, hạ tầng, đường bay/tuyến giao thông mới đưa vào khai thác trong kỳ (tên, thời điểm, quy mô)"
      },
      {
        "label": "Chính sách và chương trình xúc tiến",
        "type": "textarea",
        "help": "Chính sách, chương trình xúc tiến đầu tư và quảng bá đã triển khai (tên văn bản, ngân sách nếu có)"
      },
      {
        "label": "Hoạt động bảo tồn và phát triển cộng đồng",
        "type": "textarea",
        "help": "Nêu tối đa 5 hoạt động, chương trình bảo tồn di sản, môi trường và phát triển cộng đồng tiêu biểu. Cung cấp báo cáo kết quả hoặc số liệu minh chứng tại mục Hồ sơ & minh chứng."
      },
      {
        "label": "Kênh truyền thông chính thức",
        "type": "textarea",
        "help": "Cung cấp link website, fanpage và tài khoản mạng xã hội chính thức của điểm đến; ghi rõ số người theo dõi của từng tài khoản mạng xã hội."
      }
    ],
    "narratives": [
      {
        "label": "Trách nhiệm bền vững: bảo tồn di sản, môi trường và cộng đồng",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Phát triển sản phẩm mới, hạ tầng và kết nối giao thông",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Chính sách, môi trường đầu tư và xúc tiến du lịch",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Công văn đăng ký có chữ ký, con dấu của Sở Du lịch/Sở VHTTDL hoặc UBND tỉnh, thành phố",
      "Báo cáo thống kê khách du lịch chính thức gần nhất của Sở/Cục Thống kê",
      "Văn bản chính sách đã ban hành; hình ảnh sản phẩm/hạ tầng mới (tối đa 10 ảnh)",
      "Bộ ảnh điểm đến (bắt buộc): 3–10 ảnh có kích thước tối thiểu 1.600 px: sản phẩm/hạ tầng mới, cảnh quan, hoạt động bảo tồn",
      "Video quảng bá điểm đến (khuyến khích): không quá 3 phút; link YouTube/Drive"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": false
  },
  "Doanh nghiệp lữ hành của năm": {
    "audience": "Doanh nghiệp lữ hành nội địa và quốc tế (tour operator, đại lý lữ hành) có giấy phép hợp lệ, đang hoạt động tại Việt Nam.",
    "conditions": [
      "Giấy phép kinh doanh dịch vụ lữ hành (quốc tế hoặc nội địa) còn hiệu lực; đã hoạt động tối thiểu 24 tháng tính đến 30/09/2026",
      "Không bị xử phạt vi phạm hành chính trong lĩnh vực du lịch, không có sự cố/khủng hoảng nghiêm trọng ảnh hưởng khách hàng được cơ quan chức năng hoặc báo chí xác nhận trong kỳ xét giải (01/10/2025–30/09/2026)"
    ],
    "fields": [
      {
        "label": "Doanh thu và lượt khách",
        "type": "textarea",
        "help": "Doanh thu và số lượt khách phục vụ (kỳ xét giải và cùng kỳ năm trước)"
      },
      {
        "label": "Kết quả theo phân khúc",
        "type": "textarea",
        "help": "Phân khúc chính: inbound / outbound / nội địa (cung cấp kết quả kinh doanh về doanh thu và lượt khách ở mỗi phân khúc)"
      },
      {
        "label": "Sản phẩm tour tiêu biểu",
        "type": "textarea",
        "help": "Danh mục sản phẩm tour tiêu biểu (tối đa 5)"
      },
      {
        "label": "Quy mô nhân sự",
        "type": "textarea",
        "help": "Quy mô đội ngũ: Số lượng nhân sự chính thức và cộng tác, cơ cấu phòng ban."
      },
      {
        "label": "Kênh truyền thông chính thức",
        "type": "textarea",
        "help": "Cung cấp link website, fanpage và tài khoản mạng xã hội chính thức của đơn vị; ghi rõ số người theo dõi của từng tài khoản mạng xã hội."
      }
    ],
    "narratives": [
      {
        "label": "Trách nhiệm bền vững: du lịch có trách nhiệm với điểm đến và đối tác địa phương",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Đa dạng và chất lượng sản phẩm tour",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Năng lực vận hành, chất lượng đội ngũ nhân sự và hướng dẫn viên",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Ứng dụng công nghệ, đổi mới sản phẩm",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Bản sao Giấy phép kinh doanh dịch vụ lữ hành",
      "Báo cáo tài chính năm 2025 (hoặc tờ khai thuế), báo cáo doanh thu nội bộ 9 tháng 2026",
      "Tài liệu, hình ảnh sản phẩm tour tiêu biểu",
      "Các chứng nhận xanh, bền vững và liên quan (nếu có)"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": false
  },
  "Khách sạn của năm": {
    "audience": "Khách sạn đã xếp hạng sao (4–5 sao) hoặc đạt chuẩn tương đương, đang hoạt động hợp pháp.",
    "conditions": [
      "Quyết định công nhận hạng 4–5 sao (TCVN 4391:2015) còn hiệu lực, hoặc chứng nhận tương đương với khách sạn thương hiệu quốc tế chưa xếp hạng",
      "Đạt yêu cầu PCCC; có Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm còn hiệu lực",
      "Không có sự cố nghiêm trọng (cháy nổ, ngộ độc thực phẩm tập thể, thương vong) trong kỳ xét giải (01/10/2025–30/09/2026)",
      "Đã hoạt động tối thiểu 12 tháng tính đến 30/09/2026",
      "Một cơ sở chỉ chọn một trong hai hạng mục Khách sạn hoặc Resort; chuỗi khách sạn nộp hồ sơ riêng cho từng cơ sở"
    ],
    "fields": [
      {
        "label": "Quy mô và hiệu quả kinh doanh",
        "type": "textarea",
        "help": "Số phòng, hạng sao, công suất phòng bình quân, giá phòng bình quân (ADR) (trong kỳ xét giải và cùng kỳ năm trước)"
      },
      {
        "label": "Đánh giá trên các nền tảng OTA",
        "type": "textarea",
        "help": "Điểm đánh giá trung bình, số lượng đánh giá, đường link trang cơ sở trên từng OTA (Booking, Agoda, Tripadvisor, Google…)"
      },
      {
        "label": "Quy mô và đào tạo nhân sự",
        "type": "textarea",
        "help": "Quy mô nhân sự: tổng số nhân sự, tỷ lệ nhân sự đã qua đào tạo (có chứng chỉ, bằng cấp), số giờ đào tạo nội bộ bình quân/người/năm"
      },
      {
        "label": "Kênh truyền thông chính thức",
        "type": "textarea",
        "help": "Cung cấp link website, fanpage và tài khoản mạng xã hội chính thức của đơn vị; ghi rõ số người theo dõi của từng tài khoản mạng xã hội."
      }
    ],
    "narratives": [
      {
        "label": "Thực hành bền vững, bảo vệ môi trường",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Chất lượng cơ sở vật chất và tiện nghi",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Chất lượng dịch vụ và phát triển đội ngũ nhân sự",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Đổi mới trải nghiệm khách hàng",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Quyết định/chứng nhận xếp hạng sao",
      "Ảnh chụp màn hình điểm đánh giá OTA (thấy rõ ngày chụp và số đánh giá)",
      "Các chứng nhận xanh, bền vững và liên quan (nếu có)",
      "Bộ ảnh cơ sở theo danh mục (bắt buộc): 3–10 ảnh có kích thước tối thiểu 1.600 px: mặt tiền, sảnh, ≥ 3 hạng phòng, nhà hàng, tiện ích (hồ bơi/spa/gym), ≥ 1 ảnh thực hành bền vững",
      "Video giới thiệu (khuyến khích): không quá 3 phút"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": false
  },
  "Khu nghỉ dưỡng của năm (Resort)": {
    "audience": "Khu nghỉ dưỡng / resort đã xếp hạng hoặc đạt chuẩn tương đương, đang hoạt động hợp pháp.",
    "conditions": [
      "Cơ sở lưu trú nghỉ dưỡng (khách sạn nghỉ dưỡng, biệt thự du lịch theo TCVN 4391:2015) đã xếp hạng 4–5 sao hoặc chứng nhận tương đương, còn hiệu lực",
      "Đạt yêu cầu PCCC; có Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm còn hiệu lực",
      "Không có sự cố đặc biệt nghiêm trọng trong kỳ xét giải (01/10/2025–30/09/2026)",
      "Đã hoạt động tối thiểu 12 tháng tính đến 30/09/2026",
      "Không đồng thời nộp hạng mục Khách sạn của năm"
    ],
    "fields": [
      {
        "label": "Quy mô và hiệu quả kinh doanh",
        "type": "textarea",
        "help": "Quy mô (số phòng/villa, diện tích, hạng mục dịch vụ), công suất phòng bình quân, ADR (trong kỳ xét giải và cùng kỳ năm trước)"
      },
      {
        "label": "Đánh giá trên các nền tảng OTA",
        "type": "textarea",
        "help": "Điểm đánh giá trung bình, số lượng đánh giá, đường link trên từng OTA (Booking, Agoda, Tripadvisor, Google…)"
      },
      {
        "label": "Quy mô và đào tạo nhân sự",
        "type": "textarea",
        "help": "Quy mô nhân sự: tổng số nhân sự, tỷ lệ nhân sự đã qua đào tạo (có chứng chỉ, bằng cấp), số giờ đào tạo nội bộ bình quân/người/năm"
      },
      {
        "label": "Kênh truyền thông chính thức",
        "type": "textarea",
        "help": "Cung cấp link website, fanpage và tài khoản mạng xã hội chính thức của đơn vị; ghi rõ số người theo dõi của từng tài khoản mạng xã hội."
      }
    ],
    "narratives": [
      {
        "label": "Thực hành bền vững, bảo vệ môi trường",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Không gian, kiến trúc và cảnh quan",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Trải nghiệm và dịch vụ nghỉ dưỡng cao cấp (spa, ẩm thực, giải trí) cung cấp cho du khách tại khu nghỉ",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Bản sắc địa phương và tính độc đáo tại khu nghỉ",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Quyết định/chứng nhận xếp hạng",
      "Ảnh chụp màn hình điểm đánh giá OTA (thấy rõ ngày chụp và số đánh giá)",
      "Hình ảnh, tài liệu minh họa không gian, kiến trúc, dịch vụ (tối đa 10 ảnh)",
      "Các chứng nhận xanh, bền vững và liên quan (nếu có)",
      "Bộ ảnh resort theo danh mục (bắt buộc): 3–10 ảnh có kích thước tối thiểu 1.600 px: toàn cảnh/cảnh quan, kiến trúc, ≥ 3 hạng phòng/villa, spa, nhà hàng, hoạt động trải nghiệm địa phương",
      "Video giới thiệu (khuyến khích): không quá 3 phút"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": false
  },
  "Hãng hàng không du lịch của năm": {
    "audience": "Hãng hàng không nội địa và quốc tế đang khai thác đường bay đi/đến/trong Việt Nam.",
    "conditions": [
      "Hãng Việt Nam: Giấy phép kinh doanh vận chuyển hàng không còn hiệu lực. Hãng nước ngoài: được Cục Hàng không Việt Nam cấp phép khai thác đường bay đến Việt Nam",
      "Chứng nhận an toàn khai thác IOSA còn hiệu lực hoặc tương đương; không xảy ra tai nạn/sự cố an toàn bay nghiêm trọng trong kỳ xét giải (01/10/2025–30/09/2026)"
    ],
    "fields": [
      {
        "label": "Mạng đường bay và tần suất",
        "type": "textarea",
        "help": "Danh sách mạng đường bay và đường bay mới mở trong kỳ xét giải (tần suất/tuần)"
      },
      {
        "label": "Số hành khách vận chuyển",
        "type": "textarea",
        "help": "Số hành khách vận chuyển đi/đến/trong Việt Nam trong kỳ xét giải"
      },
      {
        "label": "Tỷ lệ chuyến bay đúng giờ (OTP)",
        "type": "textarea",
        "help": "Tỷ lệ chuyến bay đúng giờ (OTP) trong kỳ xét giải"
      },
      {
        "label": "Chương trình giá và kích cầu",
        "type": "textarea",
        "help": "Chương trình giá/kích cầu du lịch đã triển khai"
      },
      {
        "label": "Hợp tác quảng bá điểm đến",
        "type": "textarea",
        "help": "Nêu các hoạt động hợp tác quảng bá điểm đến với địa phương, doanh nghiệp. Cung cấp báo cáo giới thiệu thỏa thuận hợp tác với các điểm đến tại mục Hồ sơ & minh chứng."
      },
      {
        "label": "Kênh truyền thông chính thức",
        "type": "textarea",
        "help": "Cung cấp link website, fanpage và tài khoản mạng xã hội chính thức của đơn vị; ghi rõ số người theo dõi của từng tài khoản mạng xã hội."
      }
    ],
    "narratives": [
      {
        "label": "Trách nhiệm bền vững: giảm phát thải, nhiên liệu bền vững",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Mạng đường bay, tần suất và đường bay du lịch mới",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Chính sách giá và chương trình kích cầu du lịch",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Hợp tác quảng bá điểm đến với địa phương/doanh nghiệp",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Đổi mới trải nghiệm khách hàng",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Giấy phép kinh doanh/khai thác vận chuyển hàng không",
      "Báo cáo OTP (nguồn: Cục Hàng không, OAG/Cirium hoặc báo cáo nội bộ)",
      "Các chứng nhận xanh, bền vững và xác nhận của cơ quan chức năng liên quan (nếu có)",
      "Hình ảnh sản phẩm/dịch vụ trên chuyến bay: Tối đa 10 ảnh"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": false
  },
  "Trải nghiệm du lịch của năm": {
    "audience": "Sản phẩm/chương trình trải nghiệm cụ thể (tour chuyên đề, lễ hội, show diễn, hành trình khám phá) do doanh nghiệp, địa phương hoặc tổ chức triển khai trong năm.",
    "conditions": [
      "Có giấy phép tổ chức hợp lệ nếu là sự kiện/lễ hội thuộc diện phải xin phép",
      "Không xảy ra sự cố an toàn nghiêm trọng ảnh hưởng người tham gia",
      "Đã diễn ra/vận hành trong kỳ xét giải (01/10/2025–30/09/2026); sự kiện một lần phải kết thúc trước 30/09/2026",
      "Đơn vị nộp là chủ sở hữu/đơn vị tổ chức, hoặc có văn bản ủy quyền"
    ],
    "fields": [
      {
        "label": "Lượng khách và tăng trưởng",
        "type": "textarea",
        "help": "Số lượng khách tham gia và tăng trưởng (nếu là mùa lặp lại)"
      },
      {
        "label": "Hiệu quả truyền thông",
        "type": "textarea",
        "help": "Cung cấp số liệu lan tỏa trên truyền thông, mạng xã hội trong kỳ xét giải. Nếu có báo cáo truyền thông, dán link tại mục Hồ sơ & minh chứng."
      },
      {
        "label": "Đánh giá trên các nền tảng",
        "type": "textarea",
        "help": "Điểm đánh giá trung bình, số lượng đánh giá, đường link trên từng OTA và nền tảng đánh giá (Booking, Agoda, Tripadvisor, Google…)"
      },
      {
        "label": "Kênh truyền thông chính thức",
        "type": "textarea",
        "help": "Cung cấp link website, fanpage và tài khoản mạng xã hội chính thức của đơn vị; ghi rõ số người theo dõi của từng tài khoản mạng xã hội."
      }
    ],
    "narratives": [
      {
        "label": "Giá trị cộng đồng và di sản của sản phẩm trải nghiệm",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Tính sáng tạo, độc đáo của sản phẩm trải nghiệm",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Chất lượng tổ chức, chuyên nghiệp trong vận hành",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Giấy phép tổ chức (nếu thuộc diện phải xin phép)",
      "Số liệu vé bán/lượt tham gia",
      "Báo cáo tổng hợp truyền thông (media coverage report)",
      "Bộ ảnh và video trải nghiệm (bắt buộc): 3–10 ảnh có kích thước tối thiểu 1.600 px; video không quá 3 phút qua link (khuyến khích)"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": false
  },
  "Sáng kiến du lịch bền vững của năm": {
    "audience": "Doanh nghiệp, tổ chức hoặc địa phương triển khai dự án/sáng kiến bền vững trong lĩnh vực du lịch.",
    "conditions": [
      "Sáng kiến đã triển khai thực tế trong kỳ xét giải (không phải kế hoạch/thí điểm chưa vận hành)"
    ],
    "fields": [
      {
        "label": "Sáng kiến và phạm vi triển khai",
        "type": "textarea",
        "help": "Mô tả sáng kiến, đơn vị/cá nhân thực hiện, phạm vi triển khai"
      },
      {
        "label": "Kết quả và tác động",
        "type": "textarea",
        "help": "Số liệu kết quả hoạt động sáng kiến và các tác động môi trường/xã hội đo lường được"
      },
      {
        "label": "So sánh trước và sau triển khai",
        "type": "textarea",
        "help": "Mốc so sánh (mốc ban đầu) trước khi triển khai và kết quả sau triển khai"
      }
    ],
    "narratives": [
      {
        "label": "Mức độ đổi mới so với thực hành hiện tại",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Tính khả thi và hiệu quả đo lường được",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Tác động môi trường và xã hội cụ thể",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Khả năng nhân rộng",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Báo cáo, xác nhận hoặc đánh giá tác động (nội bộ hoặc bên thứ ba)",
      "Hình ảnh, tài liệu minh họa quá trình triển khai"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": false
  },
  "Điểm đến du lịch xanh của năm": {
    "audience": "Địa phương hoặc khu/điểm du lịch cụ thể (mọi cấp) tiên phong về thực hành xanh.",
    "conditions": [
      "Có chính sách/chương trình môi trường đang triển khai chính thức tại điểm đến",
      "Tỉnh, thành phố có thể đồng thời nộp \"Điểm đến du lịch của năm\" (cấp tỉnh) và \"Điểm đến xanh\" (cho một khu/điểm cụ thể)"
    ],
    "fields": [
      {
        "label": "Chứng nhận xanh hoặc bền vững",
        "type": "textarea",
        "help": "Chứng nhận xanh hoặc bền vững đã đạt (nếu có)"
      },
      {
        "label": "Kết quả phát triển du lịch xanh",
        "type": "textarea",
        "help": "Số liệu kết quả hoạt động phát triển bền vững và du lịch xanh (chỉ số tác động môi trường, các hoạt động du lịch xanh…)"
      }
    ],
    "narratives": [
      {
        "label": "Mức độ đổi mới trong chính sách và hành động môi trường",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Hiệu quả đo lường được",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Sự tham gia và hưởng lợi của cộng đồng địa phương và doanh nghiệp",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Chứng nhận xanh (nếu có)",
      "Văn bản chính sách về phát triển du lịch xanh hay các chính sách, chương trình môi trường liên quan đã ban hành"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": false
  },
  "Sản phẩm du lịch sáng tạo của năm": {
    "audience": "Doanh nghiệp/tổ chức sở hữu hoặc vận hành sản phẩm, dịch vụ du lịch mới ra mắt trong năm.",
    "conditions": [
      "Sản phẩm/dịch vụ chính thức ra mắt và bán ra thị trường trong kỳ xét giải (01/10/2025–30/09/2026) (không phải bản thử nghiệm nội bộ)"
    ],
    "fields": [
      {
        "label": "Giới thiệu sản phẩm",
        "type": "textarea",
        "help": "Mô tả sản phẩm"
      },
      {
        "label": "Hiệu quả kinh doanh",
        "type": "textarea",
        "help": "Số liệu hiệu quả hoạt động kinh doanh (lượt đặt/mua, doanh thu)"
      },
      {
        "label": "Kênh truyền thông chính thức",
        "type": "textarea",
        "help": "Kênh truyền thông chính thức của doanh nghiệp (website, fanpage, tài khoản mạng xã hội)"
      }
    ],
    "narratives": [
      {
        "label": "Tính mới và độc đáo",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Tiềm năng phát triển và khả năng nhân rộng dài hạn",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Tài liệu giới thiệu sản phẩm",
      "Số liệu bán hàng/sử dụng (báo cáo nội bộ)"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": false
  },
  "Chuyển đổi số xuất sắc trong du lịch": {
    "audience": "Doanh nghiệp, điểm đến hoặc cơ quan quản lý du lịch ứng dụng công nghệ số vào vận hành/trải nghiệm khách hàng.",
    "conditions": [
      "Giải pháp công nghệ đã đưa vào vận hành thực tế (không phải bản demo/thử nghiệm nội bộ)"
    ],
    "fields": [
      {
        "label": "Giải pháp và thời gian triển khai",
        "type": "textarea",
        "help": "Mô tả giải pháp, thời gian triển khai chính thức"
      },
      {
        "label": "Công nghệ sử dụng",
        "type": "textarea",
        "help": "Công nghệ sử dụng (AI, dữ liệu, ứng dụng di động, nền tảng…)"
      },
      {
        "label": "Hiệu quả vận hành",
        "type": "textarea",
        "help": "Số liệu hiệu quả (thời gian xử lý giảm, chi phí tiết kiệm, mức độ sử dụng…)"
      }
    ],
    "narratives": [
      {
        "label": "Mức độ ứng dụng công nghệ (AI, dữ liệu, ứng dụng…)",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Hiệu quả cải thiện trải nghiệm khách hàng",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Hiệu quả vận hành nội bộ",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Hình ảnh/video minh họa giải pháp đang vận hành",
      "Số liệu hiệu quả (báo cáo nội bộ)"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": false
  },
  "Làng du lịch cộng đồng tiêu biểu của năm": {
    "audience": "Làng du lịch cộng đồng, hợp tác xã du lịch, mô hình homestay do cộng đồng địa phương vận hành.",
    "conditions": [
      "Mô hình có sự tham gia chính thức của cộng đồng địa phương (không do doanh nghiệp ngoài vận hành hoàn toàn); đã hoạt động tối thiểu 01 năm"
    ],
    "fields": [
      {
        "label": "Giới thiệu mô hình",
        "type": "textarea",
        "help": "Mô tả giới thiệu về mô hình làng du lịch cộng đồng"
      },
      {
        "label": "Kết quả hoạt động du lịch",
        "type": "textarea",
        "help": "Kết quả hoạt động du lịch của mô hình (lượt khách, doanh thu nếu có)"
      },
      {
        "label": "Sự tham gia và sinh kế cộng đồng",
        "type": "textarea",
        "help": "Số hộ dân tham gia, thu nhập/sinh kế tạo ra từ mô hình"
      }
    ],
    "narratives": [
      {
        "label": "Tính đặc sắc, khác biệt của mô hình (bảo tồn văn hóa, bản sắc địa phương)",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Tính bền vững trong vận hành",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Mức độ tham gia và hưởng lợi của cộng đồng địa phương",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Xác nhận của chính quyền địa phương hoặc tổ chức quản lý mô hình",
      "Hình ảnh, tài liệu minh họa hoạt động",
      "Bộ ảnh và video mô hình (bắt buộc): 3–10 ảnh: không gian làng, hoạt động văn hóa, homestay, người dân tham gia; video không quá 3 phút (tùy chọn)"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": false
  },
  "Trải nghiệm ẩm thực du lịch của năm": {
    "audience": "Nhà hàng, thương hiệu ẩm thực hoặc điểm đến ẩm thực gắn liền với hoạt động du lịch.",
    "conditions": [
      "Đang hoạt động hợp pháp, có Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm còn hiệu lực"
    ],
    "fields": [
      {
        "label": "Doanh thu và lượt khách",
        "type": "textarea",
        "help": "Doanh thu và số lượt khách phục vụ trong kỳ xét giải"
      },
      {
        "label": "Mô hình và trải nghiệm ẩm thực",
        "type": "textarea",
        "help": "Mô hình, quy mô không gian nhà hàng/điểm đến và trải nghiệm ẩm thực cung cấp tới du khách"
      },
      {
        "label": "Giải thưởng hoặc xếp hạng",
        "type": "textarea",
        "help": "Giải thưởng/xếp hạng ẩm thực đã đạt (nếu có)"
      },
      {
        "label": "Kênh truyền thông chính thức",
        "type": "textarea",
        "help": "Cung cấp link website, fanpage và tài khoản mạng xã hội chính thức của đơn vị; ghi rõ số người theo dõi của từng tài khoản mạng xã hội."
      },
      {
        "label": "Đánh giá trên các nền tảng",
        "type": "textarea",
        "help": "Điểm đánh giá trung bình, số lượng đánh giá, đường link trên từng OTA và nền tảng đánh giá (Booking, Agoda, Tripadvisor, Google…)"
      }
    ],
    "narratives": [
      {
        "label": "Chất lượng và tính đặc trưng, sáng tạo của ẩm thực",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Chất lượng trải nghiệm phục vụ du khách",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Tài liệu giải thưởng/xếp hạng đã đạt (nếu có)",
      "Bộ ảnh món ăn và không gian (bắt buộc): 3–10 ảnh có kích thước tối thiểu 1.600 px: 5 món tiêu biểu, không gian phục vụ, bếp/đầu bếp",
      "Thực đơn hiện hành (bắt buộc): PDF; có giá; ghi rõ thực đơn tiếng Anh nếu có",
      "Video giới thiệu (khuyến khích): không quá 3 phút"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": true
  },
  "Chiến dịch quảng bá du lịch của năm": {
    "audience": "Địa phương, doanh nghiệp hoặc tổ chức thực hiện chiến dịch truyền thông/marketing du lịch về điểm đến Việt Nam trong năm.",
    "conditions": [
      "Chiến dịch đã triển khai và có giai đoạn đo lường kết quả rõ ràng trong kỳ xét giải (01/10/2025–30/09/2026)"
    ],
    "fields": [
      {
        "label": "Chiến dịch và thời gian triển khai",
        "type": "textarea",
        "help": "Mô tả chiến dịch, đơn vị thực hiện, thời gian triển khai"
      },
      {
        "label": "KPI mục tiêu và kết quả",
        "type": "textarea",
        "help": "KPI mục tiêu đặt ra và kết quả đạt được"
      },
      {
        "label": "Hiệu quả truyền thông và kích cầu",
        "type": "textarea",
        "help": "Số liệu lan tỏa truyền thông và hiệu quả kích cầu (lượng khách, lượt đặt tour liên quan)"
      }
    ],
    "narratives": [
      {
        "label": "Tính sáng tạo và thông điệp chiến dịch",
        "type": "textarea",
        "maxWords": 250
      },
      {
        "label": "Hiệu quả đóng góp về tăng trưởng du lịch và tăng trưởng thương hiệu điểm đến đo lường được",
        "type": "textarea",
        "maxWords": 250
      }
    ],
    "evidence": [
      "Báo cáo kết quả chiến dịch",
      "Số liệu truyền thông (media report/analytics)"
    ],
    "images": {
      "min": 3,
      "max": 10
    },
    "menuRequired": false
  }
};

