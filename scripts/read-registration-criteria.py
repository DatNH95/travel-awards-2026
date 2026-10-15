"""Read the supplied workbook without modifying it; generate category form data."""
import json
import re
import sys
from pathlib import Path
import openpyxl

workbook = openpyxl.load_workbook(sys.argv[1], data_only=True)
keys = [
    'Điểm đến du lịch của năm', 'Doanh nghiệp lữ hành của năm', 'Khách sạn của năm',
    'Khu nghỉ dưỡng của năm (Resort)', 'Hãng hàng không du lịch của năm', 'Trải nghiệm du lịch của năm',
    'Nhân vật du lịch của năm (Cá nhân)', 'Sáng kiến du lịch bền vững của năm',
    'Điểm đến du lịch xanh của năm', 'Sản phẩm du lịch sáng tạo của năm', 'Chuyển đổi số xuất sắc trong du lịch',
    'Làng du lịch cộng đồng tiêu biểu của năm', 'Trải nghiệm ẩm thực du lịch của năm',
    'Gương mặt truyền thông du lịch của năm (Đại sứ)', 'Chiến dịch quảng bá du lịch của năm',
]
def bullets(value):
    return [clean(line.strip().lstrip('•').strip()) for line in (value or '').splitlines() if line.strip()]

def clean(value):
    for old, new in [('phân khúc) )', 'phân khúc)'), ('&', 'và'), ('TripAdvisor', 'Tripadvisor'), ('nhà hàng/ điểm đến', 'nhà hàng/điểm đến'), ('≥ 1600px', 'tối thiểu 1.600 px'), ('≤ 3 phút', 'không quá 3 phút'), ('MỘT', 'một'), (' + ', ', '), ('(baseline)', '(mốc ban đầu)'), ('nền tảng review', 'nền tảng đánh giá'), ('nguồn Cục Hàng không, OAG/Cirium hoặc nội bộ', 'nguồn: Cục Hàng không, OAG/Cirium hoặc báo cáo nội bộ')]:
        value = value.replace(old, new)
    return value.strip()

records = {}
labels = [
    ['Số liệu khách và tổng thu du lịch', 'Sản phẩm, hạ tầng và kết nối giao thông mới', 'Chính sách và chương trình xúc tiến', 'Hoạt động bảo tồn và phát triển cộng đồng', 'Kênh truyền thông chính thức'],
    ['Doanh thu và lượt khách', 'Kết quả theo phân khúc', 'Sản phẩm tour tiêu biểu', 'Quy mô nhân sự', 'Kênh truyền thông chính thức'],
    ['Quy mô và hiệu quả kinh doanh', 'Đánh giá trên các nền tảng OTA', 'Quy mô và đào tạo nhân sự', 'Kênh truyền thông chính thức'],
    ['Quy mô và hiệu quả kinh doanh', 'Đánh giá trên các nền tảng OTA', 'Quy mô và đào tạo nhân sự', 'Kênh truyền thông chính thức'],
    ['Mạng đường bay và tần suất', 'Số hành khách vận chuyển', 'Tỷ lệ chuyến bay đúng giờ (OTP)', 'Chương trình giá và kích cầu', 'Hợp tác quảng bá điểm đến', 'Kênh truyền thông chính thức'],
    ['Lượng khách và tăng trưởng', 'Hiệu quả truyền thông', 'Đánh giá trên các nền tảng', 'Kênh truyền thông chính thức'],
    [],
    ['Sáng kiến và phạm vi triển khai', 'Kết quả và tác động', 'So sánh trước và sau triển khai'],
    ['Chứng nhận xanh hoặc bền vững', 'Kết quả phát triển du lịch xanh'],
    ['Giới thiệu sản phẩm', 'Hiệu quả kinh doanh', 'Kênh truyền thông chính thức'],
    ['Giải pháp và thời gian triển khai', 'Công nghệ sử dụng', 'Hiệu quả vận hành'],
    ['Giới thiệu mô hình', 'Kết quả hoạt động du lịch', 'Sự tham gia và sinh kế cộng đồng'],
    ['Doanh thu và lượt khách', 'Mô hình và trải nghiệm ẩm thực', 'Giải thưởng hoặc xếp hạng', 'Kênh truyền thông chính thức', 'Đánh giá trên các nền tảng'],
    [],
    ['Chiến dịch và thời gian triển khai', 'KPI mục tiêu và kết quả', 'Hiệu quả truyền thông và kích cầu'],
]
rows = list(workbook['Giải trụ cột'].iter_rows(min_row=4, values_only=True)) + list(workbook['Giải tiên phong'].iter_rows(min_row=4, values_only=True))
for key, row in zip(keys, rows, strict=True):
    title, conditions, declarations, criteria, evidence = row[:5]
    if key in (keys[6], keys[13]):
        continue
    narrative_labels = [clean(re.sub(r'^\d+\.\s*', '', line.strip())) for line in criteria.splitlines() if re.match(r'^\d+\.', line.strip())]
    records[key] = {
        'audience': clean(title.split('Đối tượng:', 1)[1]),
        'conditions': bullets(conditions),
        'fields': [{'label': label, 'type': 'textarea', 'help': help} for label, help in zip(labels[keys.index(key)], bullets(declarations), strict=True)],
        'narratives': [{'label': label, 'type': 'textarea', 'maxWords': 300} for label in narrative_labels],
        'evidence': bullets(evidence),
    }
    # Explicit image requirements from column E; otherwise retain existing upload limits.
    minimum = {'Khách sạn của năm': 12, 'Khu nghỉ dưỡng của năm (Resort)': 15, 'Trải nghiệm du lịch của năm': 8, 'Làng du lịch cộng đồng tiêu biểu của năm': 8, 'Trải nghiệm ẩm thực du lịch của năm': 8}.get(key, 0)
    records[key]['images'] = {'min': minimum, 'max': None if minimum else (15 if key == keys[0] else 10)}
    records[key]['menuRequired'] = key == 'Trải nghiệm ẩm thực du lịch của năm'

out = Path('src/app/dang-ky-de-cu/category-criteria.ts')
out.write_text('''// Source: Bo tieu chi ho so ung cu.xlsx, Giải trụ cột!A4:E9 / Giải tiên phong!A4:E12.
// Verified 2026-10-15; regenerate with scripts/read-registration-criteria.py <workbook>.
import type { RegistrationField } from './registration-data';
export type CategoryCriteria = {
  audience: string; conditions: string[]; fields: RegistrationField[];
  narratives: RegistrationField[]; evidence: string[];
  images: { min: number; max: number | null }; menuRequired: boolean;
};
export const categoryCriteria: Record<string, CategoryCriteria> = ''' + json.dumps(records, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
