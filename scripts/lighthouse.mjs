// Runs Lighthouse (mobile, simulated throttling) against the built site.
// Usage: npm run build && npm run lighthouse  (expects `astro preview` on :4329)
import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'

const base = process.env.LH_BASE ?? 'http://localhost:4329'
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/dich-vu/tiem-phong/', '/lien-he/', '/gioi-thieu/', '/en/']
const chrome = await launch({ chromePath: process.env.CHROMIUM_PATH, chromeFlags: ['--headless=new', '--no-sandbox'] })
let failed = false
for (const p of paths) {
  const { lhr } = await lighthouse(base + p, { port: chrome.port, output: 'json', logLevel: 'error' })
  const scores = Object.fromEntries(Object.entries(lhr.categories).map(([k, c]) => [k, Math.round(c.score * 100)]))
  const a = lhr.audits
  console.log(p.padEnd(24), JSON.stringify(scores), `LCP ${a['largest-contentful-paint'].displayValue}, CLS ${a['cumulative-layout-shift'].displayValue}, TBT ${a['total-blocking-time'].displayValue}`)
  for (const [k, c] of Object.entries(lhr.categories)) {
    if (c.score < 0.95) failed = true
    for (const ref of c.auditRefs) {
      const audit = a[ref.id]
      if (ref.weight > 0 && audit.score !== null && audit.score < 0.9) console.log(`   ↳ [${k}] ${audit.id}: ${audit.displayValue ?? ''} ${audit.title}`)
    }
  }
}
await chrome.kill()
process.exit(failed ? 1 : 0)
