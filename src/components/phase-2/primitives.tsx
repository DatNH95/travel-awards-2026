import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import { CTAArrow } from '../primitives';
export { CTAArrow } from '../primitives';
export { Container, Section, Surface, Eyebrow, SectionHeading, Button, ResponsiveImage } from '../primitives';
export function TextLink({className,children,disabled,...props}: AnchorHTMLAttributes<HTMLAnchorElement> & {disabled?:boolean}) {
 const content=<>{children}<span aria-hidden="true"><CTAArrow /></span></>;
 return disabled ? <span className={['text-link',className].filter(Boolean).join(' ')} aria-disabled="true">{content}</span> : <a className={['text-link',className].filter(Boolean).join(' ')} {...props}>{content}</a>;
}
export function NominationCTA({className}: {className?:string}) { return <Link href="/dang-ky-de-cu" className={['button button--primary button--nomination',className].filter(Boolean).join(' ')}>Đăng ký đề cử<CTAArrow /></Link>; }
export function VotingCTA({className, href='/phase-2#about', label='Bình chọn'}: {className?:string; href?:string; label?:string}) { return <Link href={href} className={['button button--primary button--nomination voting-primary-cta',className].filter(Boolean).join(' ')}>{label}<CTAArrow /></Link>; }
