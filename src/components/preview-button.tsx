'use client';

import { useState } from 'react';
import { CTAArrow, Button } from './primitives';

export function PreviewButton({ variant }: { variant: 'primary' | 'secondary' }) {
  const [activated, setActivated] = useState(false);
  return <div className="preview-action"><Button variant={variant} onClick={() => setActivated(value => !value)}>{variant === 'primary' ? 'Khám phá dấu ấn' : 'Tìm hiểu thêm'} <span aria-hidden="true"><CTAArrow /></span></Button><span className="type-caption" role="status">{activated ? 'Đã kích hoạt CTA mẫu.' : 'Bấm để thử tương tác.'}</span></div>;
}
