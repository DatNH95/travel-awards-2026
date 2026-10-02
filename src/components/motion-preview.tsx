'use client';
import { useState } from 'react';
import { BrandGraphic } from './brand-graphics';
import { Motion } from './motion';
import { Button } from './primitives';

export function MotionPreview() {
  const [iteration, replay] = useState(0);
  return <div><Button variant="secondary" onClick={() => replay(value => value + 1)}>Xem lại motion</Button><p className="type-caption mt-4" role="status">{iteration ? `Đã chạy mẫu lần ${iteration}. ` : ''}Reveal một lần từ KV V2; reduced motion giữ nội dung tĩnh.</p><div key={iteration} className="motion-grid mt-content">
    <figure><Motion kind="typography"><p className="type-heading-3">Dấu ấn tiên phong</p></Motion><figcaption>Typography reveal</figcaption></figure>
    <figure><Motion kind="line"><div className="contour-line" /></Motion><figcaption>Line reveal · không vẽ lại SVG</figcaption></figure>
    <figure><Motion kind="graphic"><BrandGraphic variant="signature" /></Motion><figcaption>Subtle graphic reveal</figcaption></figure>
    <figure><Motion kind="image"><BrandGraphic variant="landscape" label="KV V2 — mẫu image reveal nhẹ" /></Motion><figcaption>Image reveal · PNG V2 chính thức</figcaption></figure>
  </div></div>;
}
