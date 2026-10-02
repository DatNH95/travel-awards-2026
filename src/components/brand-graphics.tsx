import Image from 'next/image';

const assets = {
  logo: { src: 'logo.svg', width: 1000, height: 350 },
  campaign: { src: 'campaign-lockup.svg', width: 690, height: 420 },
  signature: { src: 'signature-ornament.svg', width: 305, height: 72 },
  marker: { src: 'signature-marker.svg', width: 38, height: 38 },
  landscape: { src: 'travel-awards-kv-v2.png', width: 1920, height: 1080 },
} as const;

// External SVG references isolate Illustrator class names/IDs from the document.
// Assets always retain their original palette and intrinsic aspect ratio.
export function BrandGraphic({ variant, label, className = '' }: { variant: keyof typeof assets; label?: string; className?: string }) {
  const { src, width, height } = assets[variant];
  return <Image src={`/assets/key-visual/${src}`} width={width} height={height} alt={label ?? ''} aria-hidden={label ? undefined : true} unoptimized className={`brand-graphic brand-graphic--${variant} ${className}`} />;
}

export function SignatureDivider() {
  return <div className="signature-divider" aria-hidden="true"><span /><BrandGraphic variant="signature" /><span /></div>;
}

export function SectionMarker() { return <BrandGraphic variant="marker" />; }

// Select the strongest allowed accent deliberately; Sections never add it automatically.
export function GraphicAccent({ level }: { level: 'primary' | 'chapter' | 'minor' | 'content' }) {
  if (level === 'primary') return <BrandGraphic variant="campaign" label="Dấu Ấn Tiên Phong — The First Signature" />;
  if (level === 'chapter') return <SignatureDivider />;
  if (level === 'minor') return <SectionMarker />;
  return null;
}
