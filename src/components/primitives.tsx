import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type SurfaceTone = 'primary' | 'brand-soft' | 'brand-deep' | 'secondary' | 'inverse';

export function Surface({ className, tone = 'primary', ...props }: HTMLAttributes<HTMLDivElement> & { tone?: SurfaceTone }) {
  return <div className={cx('surface', `surface--${tone}`, className)} {...props} />;
}

const cx = (...values: (string | undefined | false)[]) => values.filter(Boolean).join(' ');

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('layout-container', className)} {...props} />;
}

export function Section({ className, tone = 'primary', ...props }: HTMLAttributes<HTMLElement> & { tone?: SurfaceTone }) {
  return <section className={cx('section surface', `surface--${tone}`, `section--${tone}`, className)} {...props} />;
}

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('eyebrow', className)} {...props} />;
}

export function SectionHeading({ eyebrow, children, description, level = 2 }: { eyebrow?: string; children: ReactNode; description?: string; level?: 1 | 2 | 3 }) {
  const Heading = `h${level}` as 'h1' | 'h2' | 'h3';
  return <header className="section-heading">{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<Heading className="type-heading-2">{children}</Heading>{description && <p className="type-body-large text-text-secondary">{description}</p>}</header>;
}

export function Button({ variant = 'primary', className, type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) {
  return <button type={type} className={cx('button', `button--${variant}`, className)} {...props} />;
}

export function CTAArrow() {
  return <svg className="cta-arrow" aria-hidden="true" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 13 13 3M3 3h10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function NominationCTA({ className }: { className?: string }) {
  return <Link href="/dang-ky-de-cu" className={cx('button', 'button--primary', 'button--nomination', className)}>Đăng ký đề cử<CTAArrow /></Link>;
}

export function TextLink({ className, children, disabled, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean }) {
  if (disabled) return <span className={cx('text-link', className)} aria-disabled="true">{children}<span aria-hidden="true"><CTAArrow /></span></span>;
  return <a className={cx('text-link', className)} {...props}>{children}<span aria-hidden="true"><CTAArrow /></span></a>;
}

// Explicit alt is required. Editorial crops use a fixed ratio and preserve proportions.
export function ResponsiveImage({ ratio = 'landscape', treatment = 'editorial', sizes, className, ...props }: Omit<ImageProps, 'fill' | 'width' | 'height'> & { ratio?: 'landscape' | 'portrait' | 'wide'; treatment?: 'editorial' | 'full-bleed' }) {
  return <div className={cx('responsive-image', `responsive-image--${ratio}`, `responsive-image--${treatment}`, className)}><Image fill sizes={sizes ?? (treatment === 'full-bleed' ? '100vw' : '(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 50vw')} {...props} /></div>;
}
