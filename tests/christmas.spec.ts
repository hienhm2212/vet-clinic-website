import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Times are UTC; the clinic is UTC+7. The window is 1–31 Dec, local time.
const IN_SEASON = '2026-12-15T03:00:00Z'
const BETWEEN_SEASONS = '2026-11-15T03:00:00Z'

const banner = (page: Page) => page.getByRole('complementary', { name: 'Giáng sinh' })
const tips = (page: Page) => page.getByRole('heading', { name: 'Giáng sinh an toàn cho bé' })

async function at(page: Page, iso: string, path = '/') {
  await page.clock.setFixedTime(new Date(iso))
  await page.goto(path)
}

test('Christmas decorations show in December', async ({ page }) => {
  await at(page, IN_SEASON)
  await expect(page.locator('html')).toHaveAttribute('data-season', 'christmas')
  await expect(banner(page)).toBeVisible()
  await expect(banner(page).getByRole('link', { name: /0961 291 597/ })).toHaveAttribute('href', 'tel:+84961291597')
  await expect(tips(page)).toBeVisible()
  await expect(page.locator('.santa-hat')).toBeVisible()
  await expect(page.locator('.hero .decor--christmas')).toBeVisible()
  // Halloween stays off.
  await expect(page.getByRole('complementary', { name: 'Halloween' })).toBeHidden()
  await expect(page.locator('.witch-hat')).toBeHidden()
})

test('nothing seasonal shows between Halloween and Christmas', async ({ page }) => {
  await at(page, BETWEEN_SEASONS)
  await expect(page.locator('html')).not.toHaveAttribute('data-season', /.+/)
  await expect(page.locator('.seasonal').first()).toBeHidden()
  const visible = await page.locator('.seasonal').evaluateAll(els => els.filter(e => e.checkVisibility()).length)
  expect(visible).toBe(0)
})

test('Christmas window boundaries follow Vietnam time', async ({ page }) => {
  const cases: [string, string | null][] = [
    ['2026-11-30T16:59:00Z', null], //        30 Nov 23:59 local
    ['2026-11-30T17:00:00Z', 'christmas'], //  1 Dec 00:00 local
    ['2026-12-31T16:59:00Z', 'christmas'], // 31 Dec 23:59 local
    ['2026-12-31T17:00:00Z', null], //         1 Jan 00:00 local
  ]
  for (const [iso, season] of cases) {
    await at(page, iso)
    expect(await page.locator('html').getAttribute('data-season'), iso).toBe(season)
  }
})

test('dismissing the Christmas banner does not hide next year’s Halloween banner', async ({ page }) => {
  await at(page, IN_SEASON)
  await banner(page).getByRole('button', { name: 'Đóng thông báo Giáng sinh' }).click()
  await expect(banner(page)).toBeHidden()
  await page.reload()
  await expect(banner(page)).toBeHidden()
  // A different season uses its own storage key.
  await at(page, IN_SEASON, '/?season=halloween')
  await expect(page.getByRole('complementary', { name: 'Halloween' })).toBeVisible()
})

test('?season=christmas previews the theme any time', async ({ page }) => {
  await at(page, BETWEEN_SEASONS, '/?season=christmas')
  await expect(tips(page)).toBeVisible()
  await at(page, BETWEEN_SEASONS, '/en/?season=christmas')
  await expect(page.getByRole('heading', { name: 'A safe Christmas for your pet' })).toBeVisible()
  await expect(page.getByRole('complementary', { name: 'Christmas' })).toContainText('Merry Christmas!')
})

test('Christmas pages pass axe and do not scroll sideways', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const path of ['/', '/en/', '/lien-he/']) {
    await at(page, IN_SEASON, path)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze()
    expect(results.violations.map(v => `${v.id}: ${v.nodes.map(n => n.target.join(' ')).join(' | ')}`), path).toEqual([])
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow, path).toBeLessThanOrEqual(0)
  }
})
