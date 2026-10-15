import { getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js/max';
export { phoneCountries } from './phone-countries';

export function contactError(type: 'tel' | 'email', value: string, country: CountryCode = 'VN'): string {
  const text = value.trim();
  if (!text) return type === 'tel' ? 'Vui lòng nhập số điện thoại.' : 'Vui lòng nhập địa chỉ email.';
  if (type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) ? '' : 'Địa chỉ email chưa đúng định dạng. Ví dụ: ten@example.com.';
  const phone = parsePhoneNumberFromString(text, { defaultCountry: country, extract: false });
  if (!phone?.isValid()) return 'Số điện thoại chưa hợp lệ. Vui lòng kiểm tra số và quốc gia đã chọn.';
  if (phone.countryCallingCode !== getCountryCallingCode(country)) return 'Mã quốc gia không khớp với số điện thoại. Vui lòng chọn lại quốc gia.';
  return '';
}
