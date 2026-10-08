import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const KEY_PAGES = ['/', '/dich-vu/', '/dich-vu/tiem-phong/', '/gioi-thieu/', '/lien-he/', '/en/', '/en/contact/', '/404/']

test.describe('accessibility (axe, WCAG 2.1 AA)', () => {
  for (const path of KEY_PAGES) {
    test(path, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(path)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze()
      const summary = results.violations.map(v => `${v.id} (${v.impact}): ${v.nodes.map(n => n.target.join(' ')).slice(0, 3).join(' | ')}`)
      expect(summary).toEqual([])
    })
  }
})

test('no horizontal scrolling on any key page', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 })
  for (const path of KEY_PAGES) {
    await page.goto(path)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow, path).toBeLessThanOrEqual(0)
  }
})

test('mobile menu opens, closes with Escape and navigates', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only')
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Mở menu' })
  const servicesLink = page.locator('#site-nav').getByRole('link', { name: 'Dịch vụ' })
  await expect(servicesLink).toBeHidden()
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(servicesLink).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await toggle.click()
  await servicesLink.click()
  await expect(page).toHaveURL(/\/dich-vu\/$/)
  await expect(page.locator('h1')).toContainText('Dịch vụ')
})

test('mobile contact dock is visible with call, Zalo and booking actions', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only')
  await page.goto('/')
  const dock = page.getByRole('complementary', { name: 'Liên hệ nhanh' })
  for (const name of ['Gọi', 'Zalo', 'Đặt lịch khám']) await expect(dock.getByRole('link', { name })).toBeVisible()
  // Desktop-only floating button is hidden on phones.
  await expect(page.locator('.zalo-fab')).toBeHidden()
  await expect(dock.getByRole('link', { name: 'Gọi' })).toHaveAttribute('href', 'tel:+84961291597')
  await expect(dock.getByRole('link', { name: 'Zalo' })).toHaveAttribute('href', 'https://zalo.me/0961291597')
})

test('booking form validates and produces a Zalo/SMS message', async ({ page }) => {
  await page.goto('/lien-he/')
  const form = page.locator('#booking-form')
  await form.getByRole('button', { name: 'Gửi yêu cầu đặt lịch' }).click()
  await expect(page.locator('#bf-name-err')).toHaveText('Vui lòng nhập họ tên.')
  await expect(page.locator('#bf-name')).toBeFocused()

  await page.getByLabel('Họ và tên').fill('Nguyễn Văn A')
  await page.getByLabel('Số điện thoại').fill('12345')
  await form.getByRole('button', { name: 'Gửi yêu cầu đặt lịch' }).click()
  await expect(page.locator('#bf-phone-err')).toContainText('Số điện thoại chưa đúng')
  await expect(page.locator('#bf-name-err')).toBeEmpty()

  await page.getByLabel('Số điện thoại').fill('+84 912.345.678')
  await page.getByLabel('Tên thú cưng').fill('Mochi')
  await page.getByRole('radio', { name: /Mèo/ }).check()
  await page.getByLabel('Dịch vụ cần').selectOption('Tiêm phòng vắc-xin')
  await page.getByLabel('Tình trạng của bé').fill('Mèo con 2 tháng')
  await form.getByRole('button', { name: 'Gửi yêu cầu đặt lịch' }).click()

  const result = page.locator('[data-booking-result]')
  await expect(result).toBeVisible()
  await expect(form).toBeHidden()
  const msg = result.locator('[data-message]')
  await expect(msg).toContainText('Nguyễn Văn A')
  await expect(msg).toContainText('0912345678')
  await expect(msg).toContainText('Mèo – Mochi')
  await expect(msg).toContainText('Tiêm phòng vắc-xin')
  const sms = await result.getByRole('link', { name: 'Gửi SMS' }).getAttribute('href')
  expect(sms).toMatch(/^sms:\+84961291597\?body=/)
  expect(decodeURIComponent(sms!.split('body=')[1])).toContain('Mochi')

  await result.getByRole('button', { name: /Sửa lại thông tin/ }).click()
  await expect(form).toBeVisible()
  await expect(page.getByLabel('Họ và tên')).toHaveValue('Nguyễn Văn A')
})

test('gallery lightbox opens, steps and closes with Escape', async ({ page }) => {
  await page.goto('/')
  const first = page.getByRole('button', { name: /Phóng to ảnh: Không gian phòng khám/ })
  await first.scrollIntoViewIfNeeded()
  await first.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('figcaption')).toHaveText('Không gian phòng khám')
  await dialog.getByRole('button', { name: 'Ảnh tiếp theo' }).click()
  await expect(dialog.locator('figcaption')).toHaveText('Bé cún tinh nghịch')
  await expect(dialog.locator('img')).toHaveJSProperty('complete', true)
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  // Focus returns to the photo that was being viewed.
  await expect(page.getByRole('button', { name: /Phóng to ảnh: Bé cún tinh nghịch/ })).toBeFocused()
})

test('map loads only on request', async ({ page }) => {
  await page.goto('/lien-he/')
  await expect(page.locator('iframe')).toHaveCount(0)
  await page.getByRole('button', { name: 'Xem bản đồ' }).click()
  await expect(page.locator('iframe[title="Phòng Khám Thú Y Huỳnh Như"]')).toHaveCount(1)
})

test('language switch goes to the matching page', async ({ page, isMobile }) => {
  await page.goto('/dich-vu/tiem-phong/')
  if (isMobile) await page.getByRole('button', { name: 'Mở menu' }).click()
  await page.locator('#site-nav a[hreflang="en"]').click()
  await expect(page).toHaveURL(/\/en\/services\/vaccinations\/$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('h1')).toHaveText('Vaccinations')
})

test('open-now badge reflects clinic hours', async ({ page }) => {
  // 10:00 in Ho Chi Minh City (UTC+7) -> open
  await page.clock.setFixedTime(new Date('2026-10-08T03:00:00Z'))
  await page.goto('/')
  await expect(page.locator('[data-open-status]').first()).toHaveAttribute('data-state', 'open')
  await expect(page.locator('[data-open-status] [data-open-label]').first()).toHaveText('Đang mở cửa · đóng cửa lúc 20:00')

  // 22:30 local -> closed
  await page.clock.setFixedTime(new Date('2026-10-08T15:30:00Z'))
  await page.reload()
  await expect(page.locator('[data-open-status]').first()).toHaveAttribute('data-state', 'closed')
})

test('site works without JavaScript', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 800 } })
  const page = await ctx.newPage()
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
  // Nav links are reachable even though the menu toggle needs JS.
  await expect(page.locator('#site-nav').getByRole('link', { name: 'Dịch vụ' })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Mọi điều bé cần/ })).toBeVisible()
  await ctx.close()
})
