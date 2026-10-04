'use client';

import { useEffect, useState } from 'react';

export function ArticleTimestamp() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); }, []);
  if (!now) return <span className="news-detail-timestamp" />;
  const parts = new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh', weekday: 'long', day: '2-digit',
    year: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find(part => part.type === type)?.value ?? '';
  const weekday = value('weekday');
  // The requested demo order is day / year / month, using the current GMT+7 time.
  return <time className="news-detail-timestamp" dateTime={now.toISOString()}>{weekday.charAt(0).toUpperCase() + weekday.slice(1)}, {value('day')}/{value('year')}/{value('month')}, {value('hour')}:{value('minute')} (GMT+7)</time>;
}
