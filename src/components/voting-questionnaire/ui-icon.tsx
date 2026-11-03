import type { CSSProperties, ReactNode } from 'react';

export const uiIconNames = ['home', 'angle-left', 'angle-right', 'arrow-right', 'arrow-up-right', 'cross', 'document', 'check', 'building', 'mountains', 'plane', 'marker', 'sun', 'star', 'microchip', 'leaf', 'rocket', 'heart', 'apps'] as const;
export type UiIconName = (typeof uiIconNames)[number];

// Project-owned geometric SVGs. No icon font or third-party icon assets are used.
const shapes: Record<UiIconName, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7v11h-6v-7H9v7H3Z" /></>,
  'angle-left': <path d="m15 5-7 7 7 7" />,
  'angle-right': <path d="m9 5 7 7-7 7" />,
  'arrow-right': <path d="M3 12h18m-7-7 7 7-7 7" />,
  'arrow-up-right': <path d="M5 19 19 5M5 5h14v14" />,
  cross: <path d="m5 5 14 14M5 19 19 5" />,
  document: <><path d="M5 3h9l5 5v13H5Z" /><path d="M14 3v6h5M8 13h8m-8 4h6" /></>,
  check: <path d="m4 12 5 5L20 6" />,
  building: <><path d="M3 21h18M6 21V5l6-3 6 3v16M10 21v-5h4v5" /><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01" /></>,
  mountains: <><path d="m2 20 7-14 5 8 3-5 5 11Z" /><path d="m7 10 2 2 2-2" /></>,
  plane: <path d="m3 10 7 1V4l2-2 2 9 7 2v2l-7-1v5l3 2v1l-5-1-5 1v-1l3-2v-5l-7 1Z" />,
  marker: <><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
  star: <path d="m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1Z" />,
  microchip: <><rect x="6" y="6" width="12" height="12" rx="1" /><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" /></>,
  leaf: <><path d="M20 3C9 3 3 9 5 17c8 2 14-3 15-14Z" /><path d="m4 21 12-12" /></>,
  rocket: <><path d="M8 16 4 20m5-4-4-4 6-6 10-3-3 10-6 6Z" /><circle cx="15" cy="9" r="2" /><path d="m6 10-3 1 1 5m10 2 1 3 5-1" /></>,
  heart: <path d="M12 21 3 12a6 6 0 0 1 9-8 6 6 0 0 1 9 8Z" />,
  apps: <>{[3,14].flatMap(x => [3,14].map(y => <rect key={`${x}-${y}`} x={x} y={y} width="7" height="7" rx="1" />))}</>,
};

/** Decorative icon; place the accessible label on its button or link. */
export function UiIcon({ name, size = 20 }: { name: UiIconName; size?: number }) {
  return <svg className="ui-icon" style={{ '--ui-icon-size': `${size}px` } as CSSProperties} viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[name]}</svg>;
}
