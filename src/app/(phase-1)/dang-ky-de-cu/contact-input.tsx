'use client';

import { useEffect, useRef, useState } from 'react';
import type { CountryCode } from 'libphonenumber-js';
import { contactError, phoneCountries } from './contact-validation';

export function ContactInput({ id, name, type, value, country, onChange, onCountryChange }: {
  id: string; name: string; type: 'tel' | 'email'; value: string; country: CountryCode;
  onChange: (value: string) => void; onCountryChange: (country: CountryCode) => void;
}) {
  const [touched, setTouched] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const error = contactError(type, value, country);
  const shownError = touched ? error : '';
  useEffect(() => { input.current?.setCustomValidity(error); }, [error]);
  const control = <input ref={input} id={id} name={name} type={type} required value={value} autoComplete={type === 'tel' ? 'tel-national' : 'email'} inputMode={type === 'tel' ? 'tel' : 'email'} aria-invalid={shownError ? true : undefined} aria-describedby={shownError ? `${id}-error` : undefined} placeholder={type === 'tel' ? 'Nhập số điện thoại' : 'ten@example.com'} onBlur={() => setTouched(true)} onInvalid={() => setTouched(true)} onChange={event => onChange(event.target.value)} />;
  return <>
    {type === 'tel' ? <div className="nomination-phone-control" data-invalid={!!shownError}>
      <select name={`${name}-country`} aria-label="Quốc gia và mã gọi điện thoại" value={country} onChange={event => { onCountryChange(event.target.value as CountryCode); if (value) setTouched(true); }}>
        {phoneCountries.map(item => <option key={item.code} value={item.code}>{item.name} (+{item.callingCode})</option>)}
      </select>
      {control}
    </div> : control}
    {shownError && <p id={`${id}-error`} className="nomination-field-error type-body-small" role="alert">{shownError}</p>}
  </>;
}
