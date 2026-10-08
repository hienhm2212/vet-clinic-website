import type { T } from '../i18n'

/**
 * Single source of truth for the clinic's name, address, phone and hours (NAP).
 * Keep this identical to the Google Business Profile — consistent NAP is one of
 * the strongest local-SEO signals.
 */
export const clinic = {
  name: { vi: 'Phòng Khám Thú Y Huỳnh Như', en: 'Huynh Nhu Veterinary Clinic' } as T,
  shortName: { vi: 'PKTY Huỳnh Như', en: 'Huynh Nhu Vet' } as T,
  phone: '0961 291 597',
  phoneHref: 'tel:+84961291597',
  phoneIntl: '+84961291597',
  zalo: 'https://zalo.me/0961291597',
  sms: 'sms:+84961291597',
  facebook: '', // add the Facebook page URL here when available
  doctor: {
    name: { vi: 'BSTY Trần Thị Huỳnh Như', en: 'Dr. Tran Thi Huynh Nhu (DVM)' } as T,
    plainName: 'Trần Thị Huỳnh Như',
    role: { vi: 'Bác sĩ thú y phụ trách', en: 'Lead veterinarian' } as T,
  },
  yearsExperience: 5,
  address: {
    street: '138 Hà Duy Phiên',
    ward: 'Xã Bình Mỹ',
    city: 'Thành phố Hồ Chí Minh',
    country: 'VN',
    full: {
      vi: '138 Hà Duy Phiên, xã Bình Mỹ, TP. Hồ Chí Minh',
      en: '138 Ha Duy Phien, Binh My Commune, Ho Chi Minh City',
    } as T,
    note: {
      vi: 'Trước đây thuộc huyện Củ Chi, gần Hóc Môn',
      en: 'Formerly Cu Chi District, near Hoc Mon',
    } as T,
  },
  areaServed: ['Bình Mỹ', 'Củ Chi', 'Hóc Môn', 'Thành phố Hồ Chí Minh'],
  /** 24h clock, Asia/Ho_Chi_Minh, every day of the week. */
  hours: { open: '08:00', close: '20:00' },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Ph%C3%B2ng+kh%C3%A1m+th%C3%BA+y+Hu%E1%BB%B3nh+Nh%C6%B0%2C+138+H%C3%A0+Duy+Phi%C3%AAn%2C+B%C3%ACnh+M%E1%BB%B9',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=138+H%C3%A0+Duy+Phi%C3%AAn%2C+B%C3%ACnh+M%E1%BB%B9%2C+H%E1%BB%93+Ch%C3%AD+Minh',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=138+H%C3%A0+Duy+Phi%C3%AAn,+B%C3%ACnh+M%E1%BB%B9,+H%E1%BB%93+Ch%C3%AD+Minh&output=embed&hl=vi',
}
