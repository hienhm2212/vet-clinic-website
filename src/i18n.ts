export const LANGS = ['vi', 'en'] as const
export type Lang = (typeof LANGS)[number]

/** A piece of copy in both languages. */
export type T = { vi: string; en: string }

export const tr = (text: T, lang: Lang): string => text[lang]

export type RouteKey = 'home' | 'about' | 'services' | 'contact'

const ROUTES: Record<RouteKey, T> = {
  home: { vi: '/', en: '/en/' },
  about: { vi: '/gioi-thieu/', en: '/en/about/' },
  services: { vi: '/dich-vu/', en: '/en/services/' },
  contact: { vi: '/lien-he/', en: '/en/contact/' },
}

export const route = (key: RouteKey, lang: Lang) => ROUTES[key][lang]

export const serviceRoute = (slug: T, lang: Lang) =>
  `${route('services', lang)}${slug[lang]}/`

/** UI strings shared by the layout and components. */
export const ui = {
  skip: { vi: 'Bỏ qua tới nội dung chính', en: 'Skip to main content' },
  nav: {
    home: { vi: 'Trang chủ', en: 'Home' },
    services: { vi: 'Dịch vụ', en: 'Services' },
    about: { vi: 'Giới thiệu', en: 'About' },
    contact: { vi: 'Liên hệ', en: 'Contact' },
  },
  menu: { vi: 'Mở menu', en: 'Open menu' },
  book: { vi: 'Đặt lịch khám', en: 'Book a visit' },
  call: { vi: 'Gọi ngay', en: 'Call now' },
  callShort: { vi: 'Gọi', en: 'Call' },
  zalo: { vi: 'Nhắn Zalo', en: 'Zalo chat' },
  directions: { vi: 'Chỉ đường', en: 'Directions' },
  switchLang: { vi: 'English version', en: 'Phiên bản tiếng Việt' },
  learnMore: { vi: 'Xem chi tiết', en: 'Learn more' },
  allServices: { vi: 'Xem tất cả dịch vụ', en: 'See all services' },
  openNow: { vi: 'Đang mở cửa', en: 'Open now' },
  closedNow: { vi: 'Đã đóng cửa', en: 'Closed now' },
  closesAt: { vi: 'đóng cửa lúc', en: 'closes at' },
  opensAt: { vi: 'mở cửa lúc', en: 'opens at' },
  everyDay: { vi: 'Thứ 2 – Chủ nhật', en: 'Monday – Sunday' },
  hours: { vi: 'Giờ mở cửa', en: 'Opening hours' },
  address: { vi: 'Địa chỉ', en: 'Address' },
  phone: { vi: 'Điện thoại', en: 'Phone' },
  doctor: { vi: 'Bác sĩ phụ trách', en: 'Lead veterinarian' },
  breadcrumb: { vi: 'Đường dẫn', en: 'Breadcrumb' },
  faq: { vi: 'Câu hỏi thường gặp', en: 'Frequently asked questions' },
  callFirst: {
    vi: 'Nên gọi trước để bác sĩ sắp xếp thời gian, tránh phải chờ.',
    en: 'Please call ahead so the doctor can set aside time for you.',
  },
} satisfies Record<string, T | Record<string, T>>
