import type { HTMLAttributes } from 'react';

export function Motion({ kind = 'graphic', className = '', ...props }: HTMLAttributes<HTMLDivElement> & { kind?: 'typography' | 'line' | 'graphic' | 'depth' | 'image' }) {
  return <div className={`motion motion--${kind} ${className}`} {...props} />;
}
