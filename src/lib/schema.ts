import { clinic } from '../data/clinic'
import type { Faq, Service } from '../data/services'
import { route, serviceRoute, tr, type Lang } from '../i18n'

/** Structured data (schema.org JSON-LD) helpers. */

const abs = (site: URL, path: string) => new URL(path, site).href

export const clinicId = (site: URL) => `${abs(site, '/')}#clinic`

export function clinicSchema(site: URL, lang: Lang, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    '@id': clinicId(site),
    name: clinic.name.vi,
    alternateName: [clinic.shortName.vi, clinic.name.en],
    url: abs(site, route('home', lang)),
    image,
    logo: abs(site, '/icon-512.png'),
    telephone: clinic.phoneIntl,
    description:
      lang === 'vi'
        ? 'Phòng khám thú y cho chó mèo tại Bình Mỹ (Củ Chi), TP. Hồ Chí Minh: khám tổng quát, tiêm phòng, siêu âm, xét nghiệm, điều trị, phẫu thuật.'
        : 'Veterinary clinic for dogs and cats in Binh My (Cu Chi), Ho Chi Minh City: wellness exams, vaccinations, ultrasound, lab tests, treatment and surgery.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinic.address.street,
      addressLocality: clinic.address.ward,
      addressRegion: clinic.address.city,
      addressCountry: clinic.address.country,
    },
    hasMap: clinic.mapsUrl,
    areaServed: clinic.areaServed.map(name => ({ '@type': 'Place', name })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: clinic.hours.open,
        closes: clinic.hours.close,
      },
    ],
    employee: {
      '@type': 'Person',
      name: clinic.doctor.plainName,
      jobTitle: tr(clinic.doctor.role, lang),
    },
    knowsLanguage: ['vi', 'en'],
    sameAs: [clinic.zalo, clinic.facebook].filter(Boolean),
  }
}

export function websiteSchema(site: URL, lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${abs(site, '/')}#website`,
    url: abs(site, route('home', lang)),
    name: tr(clinic.name, lang),
    inLanguage: lang === 'vi' ? 'vi-VN' : 'en-US',
    publisher: { '@id': clinicId(site) },
  }
}

export function breadcrumbSchema(site: URL, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(site, item.path),
    })),
  }
}

export function faqSchema(faqs: Faq[], lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: tr(f.q, lang),
      acceptedAnswer: { '@type': 'Answer', text: tr(f.a, lang) },
    })),
  }
}

export function serviceSchema(site: URL, service: Service, lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: tr(service.title, lang),
    description: tr(service.metaDescription, lang),
    url: abs(site, serviceRoute(service.slug, lang)),
    serviceType: tr(service.title, lang),
    provider: { '@id': clinicId(site) },
    areaServed: clinic.areaServed.map(name => ({ '@type': 'Place', name })),
  }
}
