'use client';
import { useEffect, useRef, useState } from 'react';
import { UiIcon, type UiIconName } from '@/components/ui-icon';
import { ContactInput } from './contact-input';
import { UrlControl, RequiredLabel } from './dossier-controls';
import { countWords, wordError } from './registration-ux';
import type { RegistrationField } from './registration-data';
import type { RegistrationDraft } from './registration-fields';
import type { CountryCode } from 'libphonenumber-js';

const mobileFieldLabels: Record<string, string> = {
  'representative-0': 'Họ và tên người liên hệ',
};
const mobileFieldHelp: Record<string, string> = {
  'representative-0': 'Là người đại diện hồ sơ, trực tiếp làm việc với Ban tổ chức.',
};

export function RegistrationInput({ field, fieldKey, id, draft, onChange }: { field: RegistrationField; fieldKey: string; id: string; draft: RegistrationDraft; onChange: (draft: RegistrationDraft) => void }) {
  const [touched, setTouched] = useState(false);
  const input = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const value = draft.values[fieldKey] ?? '';
  const count = countWords(value);
  const error = fieldKey === 'registration-1' && !value ? 'Vui lòng chọn thông tin này.' : wordError(value, field);
  const limitExceeded = !!field.maxWords && count > field.maxWords;
  const belowMinimum = !!field.minWords && count < field.minWords;
  const wordState = belowMinimum || limitExceeded ? 'invalid' : count ? 'valid' : 'empty';
  const wordMessage = belowMinimum ? `Cần thêm ${field.minWords! - count} từ để đạt tối thiểu ${field.minWords} từ.` : limitExceeded ? `Đã vượt giới hạn. Vui lòng rút gọn ${count - field.maxWords!} từ.` : count ? 'Đã đủ yêu cầu về số từ.' : 'Chưa nhập nội dung.';
  const shownError = limitExceeded ? `Đã vượt giới hạn ${field.maxWords} từ. Vui lòng rút gọn ${count - field.maxWords!} từ.` : touched ? error : '';
  const required = field.label.endsWith('*');
  const fullLabel = required ? field.label.slice(0, -1) : field.label;
  const label = mobileFieldLabels[fieldKey] ? <><span className="nomination-copy-desktop">{fullLabel}</span><span className="nomination-copy-mobile">{mobileFieldLabels[fieldKey]}</span></> : fullLabel;
  const update = (text: string) => {
    const values = { ...draft.values, [fieldKey]: text };
    if ((fieldKey === 'registration-0' || fieldKey === 'registration-1') && values['registration-1'] === 'Cá nhân' && !draft.checks['contact-is-other']) {
      values['representative-0'] = values['registration-0'] ?? '';
    }
    onChange({ ...draft, values });
  };
  useEffect(() => { input.current?.setCustomValidity(error); }, [error]);
  const props = { id, name: fieldKey, value, required, 'aria-invalid': !!shownError, 'aria-describedby': [field.help ? `${id}-help` : '', field.maxWords ? `${id}-count` : '', shownError && !field.maxWords ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined, onBlur: () => setTouched(true), onInvalid: () => setTouched(true), onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(event.target.value) };
  return <div className={`nomination-field${field.type === 'textarea' || fieldKey === 'nominee-0' || fieldKey === 'registration-0' || fieldKey === 'representative-0' ? ' nomination-field--wide' : ''}`}>
    <label htmlFor={id}>{required ? <RequiredLabel>{label}</RequiredLabel> : label}</label>
    {field.help && <p id={`${id}-help`} className="type-body-small nomination-muted">{mobileFieldHelp[fieldKey] ? <><span className="nomination-copy-desktop">{field.help}</span><span className="nomination-copy-mobile">{mobileFieldHelp[fieldKey]}</span></> : field.help}</p>}
    {field.type === 'tel' || field.type === 'email' ? <ContactInput id={id} name={fieldKey} type={field.type} value={value} country={(draft.values['representative-country'] ?? 'VN') as CountryCode} onChange={update} onCountryChange={country => onChange({ ...draft, values: { ...draft.values, 'representative-country': country } })} />
    : field.type === 'url' ? <UrlControl id={id} name={fieldKey} value={value} required={required} allowBareDomain={field.label === 'Website'} placeholder={field.label === 'Website' ? 'vnexpress.net' : 'https://'} onChange={update} />
    : fieldKey === 'registration-1' ? <select {...props}><option value="">Chọn</option>{['Cơ quan quản lý / địa phương', 'Doanh nghiệp', 'Tổ chức / hợp tác xã', 'Hộ kinh doanh', 'Cá nhân', 'Khác'].map(item => <option key={item}>{item}</option>)}</select>
    : field.type === 'textarea' ? <div className="nomination-counted-field"><textarea {...props} inputMode="text" enterKeyHint="enter" ref={node => { input.current = node; }} rows={field.minWords ? 8 : 5} />{field.maxWords && <div id={`${id}-count`} className="nomination-word-feedback" data-state={wordState}><progress value={Math.min(count, field.maxWords)} max={field.maxWords} aria-label="Tiến độ số từ" /><div><span>{wordMessage}</span><strong>{count}/{field.maxWords}</strong></div></div>}</div>
    : <input {...props} ref={node => { input.current = node; }} type={field.type ?? 'text'} autoComplete={fieldKey === 'registration-0' ? 'organization' : fieldKey === 'registration-2' ? 'street-address' : fieldKey === 'representative-0' ? 'name' : undefined} />}
    <div role="status" aria-live="polite" aria-atomic="true">

      {shownError && !field.maxWords && <p id={`${id}-error`} className="nomination-field-error type-body-small">{shownError}</p>}
    </div>
  </div>;
}

const channels = ['Website', 'Facebook', 'Instagram', 'TikTok', 'YouTube', 'Khác'];
const channelIcons: UiIconName[] = ['globe', 'facebook', 'instagram', 'tik-tok', 'youtube', 'link'];
export function CommunicationChannels({ fieldKey, id, draft, onChange }: { fieldKey: string; id: string; draft: RegistrationDraft; onChange: (draft: RegistrationDraft) => void }) {
  function update(name: string, value: string | boolean, ishheck = false) {
    const values = { ...draft.values }, checks = { ...draft.checks };
    if (ishheck) checks[name] = Boolean(value); else values[name] = String(value);
    values[fieldKey] = channels.filter((_, index) => checks[`channel-${fieldKey}-${index}`]).map(channel => {
      const index = channels.indexOf(channel), key = `channel-${fieldKey}-${index}`;
      return `${channel}: ${values[`${key}-url`] || 'Chưa cung cấp link'}${channel !== 'Website' ? `; ${values[`${key}-followers`] || 'Chưa cung cấp'} người theo dõi` : ''}`;
    }).join('\n');
    onChange({ ...draft, values, checks });
  }
  return <fieldset className="nomination-channel-picker nomination-field--wide"><legend>Kênh truyền thông chính thức</legend><p className="nomination-muted">Chọn kênh, điền link và số người theo dõi.</p>
    <div className="nomination-chip-list">{channels.map((channel, index) => { const key = `channel-${fieldKey}-${index}`; return <label className="nomination-chip" key={channel} data-selected={!!draft.checks[key]}><input type="checkbox" checked={!!draft.checks[key]} onChange={event => update(key, event.target.checked, true)} /><UiIcon name={channelIcons[index]} size={16} />{channel}</label>; })}</div>
    {draft.values[fieldKey] && !channels.some((_, index) => draft.checks[`channel-${fieldKey}-${index}`]) && <p className="nomination-muted">Thông tin đã nhập: {draft.values[fieldKey]}</p>}
    {channels.map((channel, index) => { const key = `channel-${fieldKey}-${index}`; if (!draft.checks[key]) return null; return <div className="nomination-channel-row" key={key}><div className="nomination-field"><label htmlFor={`${id}-${index}-url`}><RequiredLabel>Link {channel}</RequiredLabel></label><UrlControl id={`${id}-${index}-url`} name={`${key}-url`} required allowBareDomain={channel === 'Website'} placeholder={channel === 'Website' ? 'vnexpress.net' : 'https://'} value={draft.values[`${key}-url`] ?? ''} onChange={value => update(`${key}-url`, value)} /></div>{channel !== 'Website' && <div className="nomination-field"><label htmlFor={`${id}-${index}-followers`}><RequiredLabel>Số người theo dõi</RequiredLabel></label><input id={`${id}-${index}-followers`} name={`${key}-followers`} type="text" inputMode="numeric" required value={draft.values[`${key}-followers`] ?? ''} onChange={event => update(`${key}-followers`, event.target.value.replace(/\D/g, ''))} /></div>}</div>; })}
  </fieldset>;
}
