import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { expect, test } from '@playwright/test'

// Every built HTML page (except 404), as a URL path.
function builtPages(dir = 'dist'): string[] {
  return readdirSync(dir).flatMap(name => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return builtPages(full)
    if (name !== 'index.html') return []
    return ['/' + relative('dist', full).replace(/index\.html$/, '')]
  })
}

const pages = builtPages()

test('builds every expected page', () => {
  expect(pages.length).toBe(20)
  for (const p of ['/', '/en/', '/dich-vu/', '/dich-vu/tiem-phong/', '/lien-he/', '/gioi-thieu/', '/en/services/vaccinations/'])
    expect(pages).toContain(p)
})

test.describe('SEO tags', () => {
  // Static HTML checks — run once, not per device.
  test.skip(({ isMobile }) => isMobile)

  for (const path of pages) {
    test(`head of ${path}`, async ({ page }) => {
      const res = await page.goto(path)
      expect(res?.status()).toBe(200)

      const title = await page.title()
      expect(title.length, `title "${title}"`).toBeGreaterThanOrEqual(25)
      expect(title.length, `title "${title}"`).toBeLessThanOrEqual(70)

      const desc = await page.locator('meta[name="description"]').getAttribute('content')
      expect(desc?.length ?? 0, `description "${desc}"`).toBeGreaterThanOrEqual(90)
      expect(desc?.length ?? 0, `description "${desc}"`).toBeLessThanOrEqual(175)

      const lang = path.startsWith('/en/') ? 'en' : 'vi'
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
      await expect(page.locator('h1')).toHaveCount(1)

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(new URL(canonical!).pathname).toBe(path)

      for (const hl of ['vi', 'en', 'x-default'])
        await expect(page.locator(`link[rel="alternate"][hreflang="${hl}"]`)).toHaveCount(1)
      // The alternate for this page's own language must point back to itself.
      expect(new URL((await page.locator(`link[hreflang="${lang}"]`).getAttribute('href'))!).pathname).toBe(path)

      for (const prop of ['og:title', 'og:description', 'og:image', 'og:url'])
        await expect(page.locator(`meta[property="${prop}"]`)).toHaveCount(1)

      const ld = await page.locator('script[type="application/ld+json"]').allTextContents()
      const types = ld.map(s => JSON.parse(s)['@type'])
      expect(types).toContain('VeterinaryCare')
      if (path !== '/' && path !== '/en/') expect(types).toContain('BreadcrumbList')
    })
  }

  test('titles and descriptions are unique', async ({ request }) => {
    const titles = new Set<string>()
    const descs = new Set<string>()
    for (const p of pages) {
      const html = await (await request.get(p)).text()
      titles.add(html.match(/<title>(.*?)<\/title>/)![1])
      descs.add(html.match(/<meta name="description" content="(.*?)"/)![1])
    }
    expect(titles.size).toBe(pages.length)
    expect(descs.size).toBe(pages.length)
  })

  test('hreflang pairs are reciprocal', async ({ request }) => {
    for (const p of pages) {
      const html = await (await request.get(p)).text()
      for (const hl of ['vi', 'en']) {
        const href = html.match(new RegExp(`hreflang="${hl}" href="([^"]+)"`))![1]
        const other = await (await request.get(new URL(href).pathname)).text()
        expect(other, `${p} -> ${href}`).toContain(`href="${new URL(p, href).href}"`)
      }
    }
  })

  test('sitemap lists every page and robots.txt points to it', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text()
    expect(robots).toMatch(/Sitemap: .*sitemap-index\.xml/)
    const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8')
    for (const p of pages) expect(sitemap).toContain(`${p}</loc>`)
    expect(sitemap).not.toContain('404')
  })

  test('no broken internal links or images', async ({ request }) => {
    const checked = new Map<string, number>()
    for (const p of pages) {
      const html = await (await request.get(p)).text()
      const refs = [...html.matchAll(/(?:href|src|srcset)="([^"]+)"/g)]
        .flatMap(m => m[1].split(',').map(s => s.trim().split(' ')[0]))
        .filter(u => u.startsWith('/') && !u.startsWith('//'))
      for (const ref of refs) {
        const url = ref.split('#')[0]
        if (!url || checked.has(url)) continue
        checked.set(url, (await request.get(url)).status())
      }
    }
    const broken = [...checked].filter(([, s]) => s !== 200)
    expect(broken).toEqual([])
    expect(checked.size).toBeGreaterThan(30)
  })

  test('every image has alt text and dimensions', async ({ page }) => {
    for (const p of pages) {
      await page.goto(p)
      const bad = await page.$$eval('img', imgs =>
        imgs
          .filter(i => i.closest('dialog') === null)
          .filter(i => !i.hasAttribute('alt') || !i.getAttribute('width') || !i.getAttribute('height'))
          .map(i => i.outerHTML.slice(0, 120)),
      )
      expect(bad, p).toEqual([])
    }
  })
})
