'use client';
import { useEffect, useRef, useState } from 'react';
import { UiIcon, type UiIconName } from '@/components/ui-icon';
import { ContactInput } from './contact-input';
import { UrlControl, RequiredLabel } from './dossier-controls';
import { countWords, wordError } from './registration-ux';
import type { RegistrationField } from './registration-data';
import type { RegistrationDraft } from './registration-fields';
import type { CountryCode } from 'libphonenumber-js';

export function RegistrationInput({ field, fieldKey, id, draft, onChange }: { field: RegistrationField; fieldKey: string; id: string; draft: RegistrationDraft; onChange: (draft: RegistrationDraft) => void }) {
  const [touched, setTouched] = useState(false);
  const input = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const value = draft.values[fieldKey] ?? '';
  const count = countWords(value);
  const error = wordError(value, field);
  const limitExceeded = !!field.maxWords && count > field.maxWords;
  const limitReached = !!field.maxWords && count === field.maxWords;
  const shownError = limitExceeded ? `Đã vượt giới hạn ${field.maxWords} từ. Vui lòng rút gọn ${count - field.maxWords!} từ.` : touched ? error : '';
  const required = field.label.endsWith('*');
  const update = (text: string) => onChange({ ...draft, values: { ...draft.values, [fieldKey]: text } });
  useEffect(() => { input.current?.setCustomValidity(error); }, [error]);
  const props = { id, name: fieldKey, value, required, 'aria-invalid': !!shownError, 'aria-describedby': [field.help ? `${id}-help` : '', field.maxWords ? `${id}-count` : '', limitReached ? `${id}-limit` : '', shownError ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined, onBlur: () => setTouched(true), onInvalid: () => setTouched(true), onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(event.target.value) };
  return <div className={`nomination-field${field.type === 'textarea' || fieldKey === 'nominee-0' || fieldKey === 'registration-0' ? ' nomination-field--wide' : ''}`}>
    <label htmlFor={id}>{required ? <RequiredLabel>{field.label.slice(0, -1)}</RequiredLabel> : field.label}</label>
    {field.help && <p id={`${id}-help`} className="type-body-small nomination-muted">{field.help}</p>}
    {field.type === 'tel' || field.type === 'email' ? <ContactInput id={id} name={fieldKey} type={field.type} value={value} country={(draft.values['representative-country'] ?? 'VN') as CountryCode} onChange={update} onCountryChange={country => onChange({ ...draft, values: { ...draft.values, 'representative-country': country } })} />
    : field.type === 'url' ? <UrlControl id={id} name={fieldKey} value={value} required={required} allowBareDomain={field.label === 'Website'} placeholder={field.label === 'Website' ? 'vnexpress.net' : 'https://'} onChange={update} />
    : fieldKey === 'registration-1' ? <select {...props}><option value="">Chọn loại hình</option>{['Cơ quan quản lý / địa phương', 'Doanh nghiệp', 'Tổ chức / hợp tác xã', 'Hộ kinh doanh', 'Cá nhân', 'Khác'].map(item => <option key={item}>{item}</option>)}</select>
    : field.type === 'textarea' ? <div className="nomination-counted-field"><textarea {...props} inputMode="text" enterKeyHint="enter" ref={node => { input.current = node; }} rows={field.minWords ? 8 : 5} />{field.maxWords && <span id={`${id}-count`} className="nomination-word-count" data-invalid={!!shownError}>{count}/{field.maxWords} từ{field.minWords ? ` · tối thiểu ${field.minWords}` : ''}</span>}</div>
    : <input {...props} ref={node => { input.current = node; }} type={field.type ?? 'text'} autoComplete={fieldKey === 'registration-0' ? 'organization' : fieldKey === 'registration-2' ? 'street-address' : fieldKey === 'representative-0' ? 'name' : undefined} />}
    <div role="status" aria-live="polite" aria-atomic="true">
      {limitReached && <p id={`${id}-limit`} className="nomination-muted type-body-small">Đã đạt giới hạn {field.maxWords} từ.</p>}
      {shownError && <p id={`${id}-error`} className="nomination-field-error type-body-small">{shownError}</p>}
    </div>
  </div>;
}

const channels = ['Website', 'Facebook', 'Instagram', 'TikTok', 'YouTube', 'Khác'];
const channelIcons: UiIconName[] = ['globe', 'facebook', 'instagram', 'tik-tok', 'youtube', 'link'];
export function CommunicationChannels({ fieldKey, id, draft, onChange }: { fieldKey: string; id: string; draft: RegistrationDraft; onChange: (draft: RegistrationDraft) => void }) {
  function update(name: string, value: string | boolean, isCheck = false) {
    const values = { ...draft.values }, checks = { ...draft.checks };
    if (isCheck) checks[name] = Boolean(value); else values[name] = String(value);
    values[fieldKey] = channels.filter((_, index) => checks[`channel-${fieldKey}-${index}`]).map(channel => {
      const index = channels.indexOf(channel), key = `channel-${fieldKey}-${index}`;
      return `${channel}: ${values[`${key}-url`] || 'Chưa cung cấp link'}${channel !== 'Website' ? `; ${values[`${key}-followers`] || 'Chưa cung cấp'} người theo dõi` : ''}`;
    }).join('\n');
    onChange({ ...draft, values, checks });
  }
  return <fieldset className="nomination-channel-picker nomination-field--wide"><legend>Kênh truyền thông chính thức</legend><p className="nomination-muted">Chọn các kênh bạn có, rồi điền link và số người theo dõi. Không cần gõ lại tên nền tảng.</p>
    <div className="nomination-chip-list">{channels.map((channel, index) => { const key = `channel-${fieldKey}-${index}`; return <label className="nomination-chip" key={channel} data-selected={!!draft.checks[key]}><input type="checkbox" checked={!!draft.checks[key]} onChange={event => update(key, event.target.checked, true)} /><UiIcon name={channelIcons[index]} size={16} />{channel}</label>; })}</div>
    {draft.values[fieldKey] && !channels.some((_, index) => draft.checks[`channel-${fieldKey}-${index}`]) && <p className="nomination-muted">Thông tin đã nhập: {draft.values[fieldKey]}</p>}
    {channels.map((channel, index) => { const key = `channel-${fieldKey}-${index}`; if (!draft.checks[key]) return null; return <div className="nomination-channel-row" key={key}><div className="nomination-field"><label htmlFor={`${id}-${index}-url`}><RequiredLabel>Link {channel}</RequiredLabel></label><UrlControl id={`${id}-${index}-url`} name={`${key}-url`} required allowBareDomain={channel === 'Website'} placeholder={channel === 'Website' ? 'vnexpress.net' : 'https://'} value={draft.values[`${key}-url`] ?? ''} onChange={value => update(`${key}-url`, value)} /></div>{channel !== 'Website' && <div className="nomination-field"><label htmlFor={`${id}-${index}-followers`}><RequiredLabel>Số người theo dõi</RequiredLabel></label><input id={`${id}-${index}-followers`} name={`${key}-followers`} type="text" inputMode="numeric" required value={draft.values[`${key}-followers`] ?? ''} onChange={event => update(`${key}-followers`, event.target.value.replace(/\D/g, ''))} /></div>}</div>; })}
  </fieldset>;
}
