// Dev helper: full-page screenshots of a few pages at desktop + mobile widths.
import { chromium } from '@playwright/test'

const base = process.argv[2] ?? 'http://localhost:4329'
const out = process.argv[3] ?? 'screenshots'
const pages = (process.argv[4] ?? '/,/dich-vu/tiem-phong/,/lien-he/,/gioi-thieu/').split(',')
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
for (const [name, viewport] of [['desktop', { width: 1366, height: 860 }], ['mobile', { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' })
    // Scroll through the page so lazy images load.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y)
        await new Promise(r => setTimeout(r, 60))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForLoadState('networkidle')
    const file = `${out}/${name}${p.replace(/\//g, '_') || '_'}.png`
    await page.screenshot({ path: file, fullPage: true })
    console.log(file)
  }
  await ctx.close()
}
await browser.close()
