import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Times are UTC; the clinic is UTC+7. The window is 15 Oct – 1 Nov, local time.
const IN_SEASON = '2026-10-20T03:00:00Z'
const AFTER_SEASON = '2026-11-05T03:00:00Z'

const banner = (page: Page) => page.getByRole('complementary', { name: 'Halloween' })
const tips = (page: Page) => page.getByRole('heading', { name: 'Halloween an toàn cho bé' })

async function at(page: Page, iso: string, path = '/') {
  await page.clock.setFixedTime(new Date(iso))
  await page.goto(path)
}

test('decorations show during the Halloween window', async ({ page }) => {
  await at(page, IN_SEASON)
  await expect(page.locator('html')).toHaveAttribute('data-season', 'halloween')
  await expect(banner(page)).toBeVisible()
  await expect(banner(page).getByRole('link', { name: /0961 291 597/ })).toHaveAttribute('href', 'tel:+84961291597')
  await expect(tips(page)).toBeVisible()
  await expect(page.locator('.witch-hat')).toBeVisible()
  await expect(page.locator('.hero .decor')).toBeVisible()
})

test('decorations are hidden outside the window', async ({ page }) => {
  await at(page, AFTER_SEASON)
  await expect(page.locator('html')).not.toHaveAttribute('data-season', /.+/)
  await expect(banner(page)).toBeHidden()
  await expect(tips(page)).toBeHidden()
  await expect(page.locator('.witch-hat')).toBeHidden()
})

test('window boundaries follow Vietnam time', async ({ page }) => {
  const cases: [string, boolean][] = [
    ['2026-10-14T16:59:00Z', false], // 14 Oct 23:59 local
    ['2026-10-14T17:00:00Z', true], //  15 Oct 00:00 local
    ['2026-11-01T16:59:00Z', true], //  1 Nov 23:59 local
    ['2026-11-01T17:00:00Z', false], // 2 Nov 00:00 local
  ]
  for (const [iso, on] of cases) {
    await at(page, iso)
    const season = await page.locator('html').getAttribute('data-season')
    expect(season === 'halloween', iso).toBe(on)
  }
})

test('banner can be dismissed and stays closed', async ({ page }) => {
  await at(page, IN_SEASON)
  await banner(page).getByRole('button', { name: 'Đóng thông báo Halloween' }).click()
  await expect(banner(page)).toBeHidden()
  // The rest of the theme stays on.
  await expect(tips(page)).toBeVisible()
  await page.reload()
  await expect(banner(page)).toBeHidden()
  await page.goto('/lien-he/')
  await expect(banner(page)).toBeHidden()
})

test('?season= previews or hides the theme', async ({ page }) => {
  await at(page, AFTER_SEASON, '/?season=halloween')
  await expect(tips(page)).toBeVisible()
  await at(page, IN_SEASON, '/?season=off')
  await expect(tips(page)).toBeHidden()
})

test('English pages get the themed banner too', async ({ page }) => {
  await at(page, IN_SEASON, '/en/')
  await expect(banner(page)).toContainText('Happy Halloween!')
  await expect(page.getByRole('heading', { name: 'A safe Halloween for your pet' })).toBeVisible()
})

test('themed pages pass axe and do not scroll sideways', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const path of ['/', '/en/', '/lien-he/']) {
    await at(page, IN_SEASON, path)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze()
    expect(results.violations.map(v => `${v.id}: ${v.nodes.map(n => n.target.join(' ')).join(' | ')}`), path).toEqual([])
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow, path).toBeLessThanOrEqual(0)
  }
})
