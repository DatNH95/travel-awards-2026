'use client';

import { useEffect, useRef, useState } from 'react';
import { dossierError, megabyte, mergeDossierFiles } from './dossier-validation';
import { normalizeWebsite, urlError } from './registration-ux';
import { UiIcon } from '@/components/ui-icon';

export function RequiredLabel({ children }: { children: React.ReactNode }) {
  return <>{children}<span className="nomination-required" aria-hidden="true"> *</span><span className="sr-only"> (bắt buộc)</span></>;
}

export function UrlControl({ id, name, value, onChange, placeholder = 'vnexpress.net hoặc link tài liệu', required = false, allowBareDomain = true }: { id: string; name: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean; allowBareDomain?: boolean }) {
  const [touched, setTouched] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const normalized = normalizeWebsite(value);
  const validationError = urlError(normalized, required);
  const error = validationError;
  const shownError = (value.trim() || touched) ? error : '';
  useEffect(() => { input.current?.setCustomValidity(error); }, [error]);
  const canAddScheme = !!value.trim() && !/^[a-z][a-z\d+.-]*:/i.test(value.trim()) && !urlError(`https://${value.trim()}`);
  return <><div className="nomination-url-control" data-invalid={!!shownError}>
    <UiIcon name="globe" />
    <input ref={input} id={id} name={name} type="text" inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck={false} required={required} value={value} placeholder={placeholder} aria-invalid={!!shownError} aria-describedby={shownError ? `${id}-error` : undefined} onBlur={() => { setTouched(true); if (value !== normalized) onChange(normalized); }} onInvalid={() => setTouched(true)} onChange={event => onChange(event.target.value)} />
  </div>{shownError && <p id={`${id}-error`} className="nomination-field-error type-body-small" role="status">{shownError} {canAddScheme && <button className="nomination-text-action" type="button" onClick={() => onChange(`https://${value.trim()}`)}>Thêm https://</button>}</p>}</>;
}

export function DossierFileField({ id, fieldKey, label, help, accept, files, onChange, legalLink = '', imagePolicy }: {
  id: string; fieldKey: string; label: string; help?: string; accept?: string; files: File[]; onChange: (files: File[]) => void; legalLink?: string;
  imagePolicy?: { min: number; max: number | null };
}) {
  const input = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);
  const error = dossierError(fieldKey, files, legalLink, imagePolicy);
  const shownError = touched ? error : '';
  useEffect(() => { input.current?.setCustomValidity(error); }, [error]);
  return <div className="nomination-field nomination-field--wide">
    <label htmlFor={id}>{label.endsWith('*') ? <RequiredLabel>{label.slice(0, -1)}</RequiredLabel> : label}</label>
    {help && <p id={`${id}-help`} className="type-body-small nomination-muted">{help}</p>}
    <input ref={input} id={id} name={fieldKey} type="file" multiple accept={accept} aria-invalid={shownError ? true : undefined} aria-describedby={[help ? `${id}-help` : '', shownError ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined} onInvalid={() => setTouched(true)} onChange={event => { setTouched(true); onChange(mergeDossierFiles(files, Array.from(event.target.files ?? []))); event.target.value = ''; }} />
    {files.length > 0 && <ul className="nomination-file-list">{files.map((file, index) => <li key={`${file.name}-${file.size}-${file.lastModified}`}><span>{file.name} <span className="nomination-muted">({file.size < megabyte ? `${Math.max(1, Math.round(file.size / 1000))} KB` : `${(file.size / megabyte).toLocaleString('vi', { maximumFractionDigits: 2 })} MB`})</span></span><button type="button" aria-label={`Bỏ tệp ${file.name}`} onClick={() => { setTouched(true); onChange(files.filter((_, fileIndex) => fileIndex !== index)); }}>Bỏ tệp <span aria-hidden="true">×</span></button></li>)}</ul>}
    {shownError && <p id={`${id}-error`} className="nomination-field-error type-body-small" role="alert">{shownError}</p>}
  </div>;
}
