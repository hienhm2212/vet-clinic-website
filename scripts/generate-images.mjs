// Generates the social preview image (public/og-image.jpg) and PNG app icons
// from HTML using Playwright. Run with `npm run og` after changing branding.
import { readFileSync } from 'node:fs'
import { chromium } from '@playwright/test'
import sharp from 'sharp'

const root = new URL('..', import.meta.url)
const file = p => new URL(p, root)
const dataUrl = (p, type) => `data:${type};base64,${readFileSync(file(p)).toString('base64')}`

const fonts = ['latin', 'vietnamese']
  .flatMap(subset => [
    `@font-face{font-family:'Baloo 2';font-weight:700;src:url(${dataUrl(`node_modules/@fontsource/baloo-2/files/baloo-2-${subset}-700-normal.woff2`, 'font/woff2')})}`,
    `@font-face{font-family:'Nunito';font-weight:700;src:url(${dataUrl(`node_modules/@fontsource/nunito/files/nunito-${subset}-700-normal.woff2`, 'font/woff2')})}`,
  ])
  .join('\n')

const logo = readFileSync(file('public/favicon.svg'), 'utf8')
const dog = dataUrl('src/assets/photos/dog.jpg', 'image/jpeg')
const cat = dataUrl('src/assets/photos/meo.jpg', 'image/jpeg')

const og = `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;font-family:Nunito;background:
  radial-gradient(circle at 85% 15%,#ffe4cc,transparent 45%),
  radial-gradient(circle at 0% 100%,#d5f5ef,transparent 40%),#fffaf4;
  color:#2a1a12;position:relative;overflow:hidden}
.copy{position:absolute;left:72px;top:72px;width:620px}
.brand{display:flex;align-items:center;gap:16px;font-family:'Baloo 2';font-size:30px}
.brand svg{width:64px;height:64px}
h1{font-family:'Baloo 2';font-size:66px;line-height:1.08;margin-top:36px}
h1 span{color:#c2410c}
p{margin-top:22px;font-size:27px;color:#5c4033;line-height:1.4}
.pills{display:flex;gap:14px;margin-top:34px}
.pill{padding:12px 22px;border-radius:999px;font-size:24px;background:#c2410c;color:#fff}
.pill.alt{background:#fff;color:#2a1a12;border:2px solid #f0e0cf}
.blob{position:absolute;right:-60px;top:70px;width:560px;height:560px;border-radius:42% 58% 55% 45%/50% 40% 60% 50%;background:linear-gradient(135deg,#fed7aa,#fdba74);opacity:.65}
.dog{position:absolute;right:70px;top:46px;width:330px;height:440px;object-fit:cover;border-radius:180px 180px 32px 32px;border:8px solid #fff;box-shadow:0 20px 50px rgba(74,40,20,.18)}
.cat{position:absolute;right:300px;top:340px;width:240px;height:240px;object-fit:cover;border-radius:50%;border:8px solid #fff;box-shadow:0 20px 50px rgba(74,40,20,.18)}
</style></head><body>
<div class="blob"></div>
<img class="dog" src="${dog}"><img class="cat" src="${cat}">
<div class="copy">
  <div class="brand">${logo}<span>PKTY Huỳnh Như</span></div>
  <h1>Phòng khám thú y <span>tận tâm</span> cho chó mèo</h1>
  <p>138 Hà Duy Phiên, Bình Mỹ (Củ Chi), TP.HCM<br>Mở cửa 8:00 – 20:00 mỗi ngày</p>
  <div class="pills"><span class="pill">☎ 0961 291 597</span><span class="pill alt">Khám · Tiêm · Siêu âm</span></div>
</div>
</body></html>`

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(og, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
const png = await page.screenshot({ type: 'png' })
await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(file('public/og-image.jpg').pathname)
await browser.close()

// Icons from the SVG logo
const svg = Buffer.from(logo)
for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(svg, { density: 1200 }).resize(size, size).png().toFile(file(`public/${name}`).pathname)
}
console.log('Generated og-image.jpg and icons')
