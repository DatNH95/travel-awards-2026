import type { ReactNode } from 'react';
import blocks from '@/data/travel-glow-rules.json';
import { UiIcon } from '@/components/ui-icon';

const formUrl = '/dang-ky-30-plus';
function prizeIcon(title: string) {
  if (title.includes('Chuyến đi được yêu thích nhất')) return 'heart';
  if (title.includes('Travel Glow Choice')) return 'star';
  if (title.includes('Câu chuyện truyền cảm hứng')) return 'book-open-cover';
  if (title.includes('Khoảnh khắc rạng rỡ')) return 'camera';
  return 'trophy';
}
const schedule = [
  ['18/11/2026', 'Phát động cuộc thi, truyền thông trên các kênh'],
  ['18/11 – 18/12/2026', 'Nhận bài dự thi'],
  ['00:00 ngày 22/12/2026 – 23:59 ngày 05/01/2027', 'Mở cổng bình chọn'],
  ['12/01/2027', 'Công bố kết quả trên trang'],
];
const voting = [
  '- Độc giả truy cập Landing Page Travel Awards và đăng nhập tài khoản MyVNEID để tham gia bình chọn cho các bài dự thi.',
  '- Thời gian mở cổng bình chọn: từ 00:00 ngày 22/12/2026 đến hết 23:59 ngày 05/01/2027 (giờ Việt Nam).',
  'Cách thức tính điểm:',
  'Kết quả của nhóm giải Bình chọn được xác định dựa trên tổng số lượt bình chọn hợp lệ của mỗi bài dự thi tại thời điểm kết thúc chương trình.',
  'BTC có quyền kiểm tra và loại bỏ các lượt bình chọn có dấu hiệu bất thường, gian lận hoặc sử dụng công cụ nhằm làm sai lệch kết quả.',
];

function Paragraphs({ texts }: { texts: string[] }) {
  const nodes: ReactNode[] = [];
  for (let i = 0; i < texts.length; i++) {
    const text = texts[i].trim();
    if (/^-\s/.test(text)) {
      const items: string[] = [];
      while (i < texts.length && /^-\s/.test(texts[i].trim())) items.push(texts[i++].trim().replace(/^-\s*/, ''));
      i--;
      nodes.push(<ul key={i}>{items.map(item => <li key={item}>{item}</li>)}</ul>);
    } else if (text === 'Form đăng ký:') {
      nodes.push(<p className="rules-glow-form" key={i}>Form đăng ký: <a className="text-link" href={formUrl} aria-label="Form đăng ký 30Plus TravelGlow: tại đây">tại đây</a></p>);
    } else if (/^Điều \d|^\d\. Nhóm giải|^Cách thức tham gia:|^Cách thức tính điểm:/.test(text)) {
      nodes.push(<h4 key={i}>{text}</h4>);
    } else {
      nodes.push(<p key={i} className={text.startsWith('Tiền mặt:') ? 'rules-glow-prize' : undefined}>{text}</p>);
    }
  }
  return nodes;
}

function Prizes({ texts }: { texts: string[] }) {
  const groups: { title: string; prizes: { title: string; description: string; notes: string[] }[] }[] = [];
  for (const raw of texts) {
    const text = raw.trim();
    if (/^\d\. Nhóm giải/.test(text)) groups.push({ title: text.replace(/^\d\. /, ''), prizes: [] });
    else if (text.startsWith('- ')) {
      const [title, ...description] = text.slice(2).split(': Dành');
      groups.at(-1)?.prizes.push({ title, description: description.length ? `Dành${description.join(': Dành')}` : '', notes: [] });
    } else groups.at(-1)?.prizes.at(-1)?.notes.push(text);
  }
  return <div className="rules-glow-prize-groups">{groups.map(group => <div key={group.title}>
    <h4>{group.title}</h4>
    <ul className="rules-glow-prize-grid">{group.prizes.map(prize => <li className="rules-glow-prize-label" data-prize-icon={prizeIcon(prize.title)} key={prize.title} data-prize={prizeIcon(prize.title)}>
      <span className="rules-glow-prize-icon"><UiIcon name={prizeIcon(prize.title)} size={30} /></span>
      <h5>{prize.title}</h5>
      {prize.notes.filter(note => note.startsWith('Tiền mặt:')).map(note => <p className="rules-glow-prize-value" key={note}><span>Tiền mặt</span><strong>{note.replace(/^Tiền mặt:\s*/, '')}</strong></p>)}
      <p>{prize.description}</p>
      <div className="rules-glow-prize-extras">{prize.notes.filter(note => !note.startsWith('Tiền mặt:')).map(note => <p className="rules-glow-prize-note" key={note}>{note.includes('Quà tặng') && <UiIcon name="gift" size={18} />}<span>{note}</span></p>)}</div>
    </li>)}</ul>
  </div>)}</div>;
}

function Participation({ texts }: { texts: string[] }) {
  const suggestions = texts.indexOf('Gợi ý nội dung dự thi:');
  const questions = texts.slice(suggestions + 2, suggestions + 6);
  return <>
    <h4>Cách thức tham gia</h4>
    <p>{texts[1]}</p>
    <ul>{texts.slice(2, 5).map(text => <li key={text}>{text}</li>)}</ul>
    <Paragraphs texts={[texts[5]]} />
    <div className="rules-glow-prompts">
      <h4>Gợi ý nội dung dự thi</h4>
      <p>{texts[suggestions + 1].replace(/^-\s*/, '')}</p>
      <ul className="rules-glow-questions">{questions.map(question => <li key={question}><span className="rules-glow-question-icon" aria-hidden="true">?</span><span>{question}</span></li>)}</ul>
      <Paragraphs texts={texts.slice(suggestions + 6)} />
    </div>
  </>;
}

export function TravelGlowRules() {
  return <section id="cuoc-thi-30plus-travelglow" className="rules-travel-glow">
    <header className="rules-section-title"><h2 className="type-heading-3">Cuộc thi 30Plus TravelGlow</h2></header>
    {blocks.map((block, index) => <div className="rules-glow-block" key={block.title}>
      <h3>{block.title}</h3>
      {index === 0 ? <><p className="rules-glow-lead">{block.paragraphs[0]}</p><Paragraphs texts={block.paragraphs.slice(1)} /></> :
        block.title === 'Cách thức tham gia và gợi ý nội dung' ? <Participation texts={block.paragraphs} /> :
        block.title === 'Cơ cấu giải thưởng' ? <Prizes texts={block.paragraphs} /> :
        block.title === 'Các điều khoản chung' ? <div className="rules-glow-terms">{block.paragraphs.reduce<{title:string; paragraphs:string[]}[]>((groups, text) => {
          if (/^Điều \d/.test(text)) groups.push({title:text, paragraphs:[]});
          else groups[groups.length-1]?.paragraphs.push(text);
          return groups;
        }, []).map(group => <details key={group.title}><summary>{group.title}<span aria-hidden="true">+</span></summary><div><Paragraphs texts={group.paragraphs} /></div></details>)}</div> :
        <Paragraphs texts={block.paragraphs} />}
      {block.title === 'Đối tượng tham gia' && <div className="rules-glow-schedule"><h3>Thời gian</h3><ol className="rules-glow-timeline">{schedule.map(([date, label], index) => <li key={label}><span className="rules-glow-milestone" aria-hidden="true">{index + 1}</span><div><p className="rules-glow-date">{date}</p><h4>{label}</h4></div></li>)}</ol></div>}
      {block.title === 'Cách thức tham gia và gợi ý nội dung' && <div className="rules-glow-voting"><h3>Cơ chế bình chọn</h3><Paragraphs texts={voting} /></div>}
    </div>)}
  </section>;
}
