'use client';

import { Fragment, useEffect, useState } from 'react';


const nominationDeadline = Date.parse('2026-11-20T23:59:00+07:00');
const units = ['Ngày', 'Giờ', 'Phút', 'Giây'];

export function NominationCountdown({ label = 'Thời gian nhận đề cử còn lại:', kind = 'nomination' }: { label?: string; kind?: 'nomination' | 'survey' }) {
  const [seconds, setSeconds] = useState<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const now = Date.now();


      const remaining = Math.max(0, Math.floor((nominationDeadline - now) / 1000));
      setSeconds(remaining);
      if (remaining > 0) timer = setTimeout(tick, 1000);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  const values = seconds === null ? null : [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
  return <div className="home-countdown">
    <p className="home-countdown-deadline">{seconds === 0 ? kind === 'survey' ? 'Đã hết thời gian khảo sát' : 'Đã hết hạn gửi đề cử' : label}</p>
    {kind === 'nomination' && <time className="home-sr-only" dateTime="2026-10-26T12:00:00+07:00">Mở nhận đề cử: 12:00 ngày 26.10.2026</time>}
    <time className="home-sr-only" dateTime="2026-11-20T23:59:00+07:00">{kind === 'survey' ? 'Hạn khảo sát' : 'Hạn gửi đề cử'}: 23:59 ngày 20.11.2026</time>
    <div className="home-countdown-units" role="timer" aria-live="off" aria-label={kind === 'survey' ? 'Thời gian khảo sát còn lại' : 'Thời gian còn lại để gửi đề cử'}>{units.map((unit, index) => <Fragment key={unit}>{index > 0 && <span className="home-countdown-separator" aria-hidden="true">:</span>}<div className="home-countdown-circle"><span className="home-countdown-value">{values ? String(values[index]).padStart(2, '0') : '—'}</span><span className="home-countdown-label">{unit}</span></div></Fragment>)}</div>
    <noscript>{kind === 'survey' ? 'Khảo sát đến 23:59 ngày 20.11.2026 (giờ Việt Nam).' : 'Nhận đề cử từ 12:00 ngày 26.10.2026 đến 23:59 ngày 20.11.2026 (giờ Việt Nam).'}</noscript>
  </div>;
}
