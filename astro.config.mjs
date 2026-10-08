// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// Canonical URLs, sitemap and Open Graph tags need the real domain.
// Set SITE_URL (e.g. https://thuyhuynhnhu.vn) in the hosting provider; on Vercel
// the production domain is picked up automatically.
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321')

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'vi', locales: { vi: 'vi-VN', en: 'en-US' } },
      filter: page => !page.includes('/404'),
    }),
  ],
})
