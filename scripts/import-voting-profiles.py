"""Import the HTML-table .xls export. Only explicitly public fields leave this process.
Usage: python scripts/import-voting-profiles.py <export.xls>
No representative, account, legal, evidence or approval metadata is exported.
"""
import collections
import html
import json
import re
import sys
import unicodedata
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class ExportTable(HTMLParser):
    def __init__(self):
        super().__init__()
        self.rows, self.row, self.cell = [], [], None

    def handle_starttag(self, tag, attrs):
        if tag == 'tr': self.row = []
        if tag in ('td', 'th'): self.cell = ''
        if tag == 'br' and self.cell is not None: self.cell += '\n'

    def handle_data(self, text):
        if self.cell is not None: self.cell += text

    def handle_endtag(self, tag):
        if tag in ('td', 'th') and self.cell is not None:
            self.row.append(self.cell.strip())
            self.cell = None
        if tag == 'tr' and self.row: self.rows.append(self.row)


def clean(text):
    text = html.unescape(text).replace('\r', '').replace('\xa0', ' ')
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n[ \t]*\n(?:[ \t]*\n)+', '\n\n', text).strip()
    return '' if text in ('-', '—', '') else text


def slug(text):
    text = unicodedata.normalize('NFD', text.lower().replace('đ', 'd'))
    return re.sub('[^a-z0-9]+', '-', ''.join(c for c in text if not unicodedata.combining(c))).strip('-')


def run(source):
    table = ExportTable()
    table.feed(source.read_text(encoding='utf-8-sig'))
    headers, *rows = table.rows
    # Fail closed if the export schema changes; do not shift private fields into public slots.
    assert len(headers) == 69 and all(len(row) == 69 for row in rows)
    expected = {1:'Mã hồ sơ',3:'Hạng mục',4:'Tên đề cử',14:'Tên đơn vị đứng tên',25:'Giới thiệu tổng quan',28:'Chiến dịch và thời gian triển khai',34:'Tính sáng tạo và thông điệp chiến dịch',39:'Thời gian và kết quả chiến dịch',53:'Hình ảnh',68:'Thumbnail Url'}
    assert all(headers[i] == label for i, label in expected.items()), 'Export schema changed'
    criteria_source = (ROOT/'src/app/(phase-1)/dang-ky-de-cu/category-criteria.ts').read_text(encoding='utf-8')
    criteria = json.loads(criteria_source.split('export const categoryCriteria: Record<string, CategoryCriteria> = ', 1)[1].strip().removesuffix(';'))
    awards = (ROOT/'src/data/awards.ts').read_text(encoding='utf-8')
    groups = [re.findall(r"'([^']+)'", awards.split(f'export const {name} = [',1)[1].split('];',1)[0]) for name in ('pillarCategories','pioneeringCategories')]
    category_ids = {name:f'{"tru-cot" if g == 0 else "tien-phong"}-{i+1}' for g, categories in enumerate(groups) for i, name in enumerate(categories)}
    profiles, dossiers, warnings = [], {}, []
    for row in rows:
        row = list(map(clean, row))
        code, category, title, organization = row[1], row[3], row[4], row[14]
        assert category in category_ids and code.isdigit()
        assert code not in dossiers, 'Duplicate source ID'
        if slug(title) == slug(category):
            title = organization or title
            warnings.append({'code':code,'issue':'Generic category title replaced with registered organization'})
        prefix = category + ':'
        if title.startswith(prefix): title = title[len(prefix):].strip()
        image_urls = list(dict.fromkeys(re.findall(r'https?://[^\s<>"\']+', '\n'.join([row[68],row[66],row[67],row[53]]))))
        image_urls = [url for url in image_urls if re.search(r'\.(jpg|jpeg|png|webp|avif)(?:\?|$)', url, re.I)]
        gallery = [{'src':url,'alt':title,'caption':'Ảnh do đơn vị đề cử cung cấp.','source':''} for url in image_urls]
        if not gallery:
            gallery = [{'src':'/assets/phase-2/profile-image-pending.svg','alt':'Hình ảnh hồ sơ đang cập nhật','caption':'','source':''}]
            warnings.append({'code':code,'issue':'No public images in export; neutral placeholder used, no unrelated demo photo'})
        criteria_fields = criteria[category]
        professional = [{'label':f['label'],'value':row[28+i]} for i,f in enumerate(criteria_fields['fields']) if row[28+i]]
        narratives = [{'label':f['label'],'value':row[34+i]} for i,f in enumerate(criteria_fields['narratives']) if row[34+i]]
        common = [{'label':label,'value':row[i]} for label,i in [('Tên đơn vị/tổ chức/cá nhân',14),('Loại hình đơn vị',15),('Địa chỉ',17),('Website',19),('Fanpage/Kênh truyền thông chính thức',20)] if row[i]]
        # Recover official channels from the category's channel field only, never private contact columns.
        channels = '\n'.join(e['value'] for e in professional if e['label']=='Kênh truyền thông chính thức')
        for label, pattern in [('Website',r'Website\s*:\s*(https?://[^\s|]+)'),('Fanpage/Kênh truyền thông chính thức',r'(?:Facebook|Fanpage)\s*:\s*(https?://[^\s|]+)')]:
            match = re.search(pattern, channels, re.I)
            if match and not any(e['label']==label for e in common): common.append({'label':label,'value':match[1]})
        dossier = {'intro':row[25],'highlights':[], 'common':common,'destination':{'label':'Cơ quan/đơn vị đại diện đề cử','value':row[21]} if row[21] and category_ids[category]=='tru-cot-1' else None,'nomination':[{'label':label,'value':row[i]} for label,i in [('Thành tích trong năm',26),('Điểm khác biệt',27)] if row[i]],'professional':professional,'narratives':narratives}
        dossiers[code] = dossier
        profiles.append({'slug':f'{slug(title)}-{code}','code':code,'categoryId':category_ids[category],'category':category,'group':'Trụ cột' if category in groups[0] else 'Tiên phong','name':title,'organization':organization or title,'location':row[17],'image':gallery[0],'gallery':gallery})
    def write(path, value):
        (ROOT/path).write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n',encoding='utf-8')
    write('src/data/voting-profiles.json',profiles)
    write('src/data/voting-public-dossiers.json',dossiers)
    write('docs/voting-import-report.json',{'source':source.name,'records':len(profiles),'categories':dict(collections.Counter(p['categoryId'] for p in profiles)),'sourceStatuses':dict(collections.Counter(row[9] for row in rows)),'mapping':'Fields 28–33 and 34–38 map by category criterion order, NOT repeated export column labels. Column 39 is a confirmation and is excluded. No fabricated metrics or survey counts.','warnings':warnings,'excluded':'Representative/contact/account/approval/legal/evidence/Drive fields are not exported.'})
    print(f'Imported {len(profiles)} profiles; {len(category_ids)} known categories; {len(warnings)} mapping notes.')


if __name__ == '__main__': run(Path(sys.argv[1]))
