import type { CSSProperties } from 'react';

export const uiIconNames = ['home', 'search', 'angle-small-down', 'angle-left', 'angle-right', 'arrow-up-right', 'cross', 'expand', 'trophy', 'medal', 'document', 'link', 'globe', 'phone-call', 'bell', 'comment-alt', 'check', 'calendar', 'shield-check', 'facebook'] as const;
export type UiIconName = (typeof uiIconNames)[number];

/** Decorative UI icon. Put the accessible label on its button/link. */
export function UiIcon({ name, size = 20, className = '' }: { name: UiIconName; size?: number; className?: string }) {
  return <span className={`ui-icon ${name === 'facebook' ? 'fi-brands-facebook' : `fi-rr-${name}`} ${className}`} style={{ '--ui-icon-size': `${size}px` } as CSSProperties} aria-hidden="true" />;
}
