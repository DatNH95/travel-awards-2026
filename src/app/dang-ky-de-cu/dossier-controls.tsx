'use client';

import { useEffect, useRef, useState } from 'react';
import { dossierError, megabyte, mergeDossierFiles } from './dossier-validation';

export function RequiredLabel({ children }: { children: React.ReactNode }) {
  return <>{children}<span className="nomination-required" aria-hidden="true"> *</span><span className="sr-only"> (bắt buộc)</span></>;
}

export function UrlControl({ id, name, value, onChange, placeholder = 'https://' }: { id: string; name: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <div className="nomination-url-control">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18M5 7h14M5 17h14" /></svg>
    <input id={id} name={name} type="url" inputMode="url" value={value} placeholder={placeholder} onChange={event => onChange(event.target.value)} />
  </div>;
}

export function DossierFileField({ id, fieldKey, label, help, accept, files, onChange, legalLink = '' }: {
  id: string; fieldKey: string; label: string; help?: string; accept?: string; files: File[]; onChange: (files: File[]) => void; legalLink?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);
  const error = dossierError(fieldKey, files, legalLink);
  const shownError = touched ? error : '';
  useEffect(() => { input.current?.setCustomValidity(error); }, [error]);
  return <div className="nomination-field nomination-field--wide">
    <label htmlFor={id}>{label.endsWith('*') ? <RequiredLabel>{label.slice(0, -1)}</RequiredLabel> : label}</label>
    {help && <p id={`${id}-help`} className="type-body-small nomination-muted">{help}</p>}
    <input ref={input} id={id} name={fieldKey} type="file" multiple accept={accept} aria-invalid={shownError ? true : undefined} aria-describedby={[help ? `${id}-help` : '', shownError ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined} onInvalid={() => setTouched(true)} onChange={event => { setTouched(true); onChange(mergeDossierFiles(files, Array.from(event.target.files ?? []))); event.target.value = ''; }} />
    {files.length > 0 && <ul className="nomination-file-list">{files.map((file, index) => <li key={`${file.name}-${file.size}-${file.lastModified}`}><span>{file.name} <span className="nomination-muted">({(file.size / megabyte).toLocaleString('vi', { maximumFractionDigits: 2 })} MB)</span></span><button type="button" aria-label={`Bỏ tệp ${file.name}`} onClick={() => { setTouched(true); onChange(files.filter((_, fileIndex) => fileIndex !== index)); }}>Bỏ tệp <span aria-hidden="true">×</span></button></li>)}</ul>}
    {shownError && <p id={`${id}-error`} className="nomination-field-error type-body-small" role="alert">{shownError}</p>}
  </div>;
}
