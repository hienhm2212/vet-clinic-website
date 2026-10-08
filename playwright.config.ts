import { defineConfig, devices } from '@playwright/test'

// Uses a pre-installed Chromium when CHROMIUM_PATH is set (e.g. in CI images
// that ship their own browser); otherwise Playwright's bundled one.
const executablePath = process.env.CHROMIUM_PATH || undefined
const PORT = 4329

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    launchOptions: { executablePath },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], launchOptions: { executablePath } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], launchOptions: { executablePath } } },
  ],
  webServer: {
    command: `npx astro preview --port ${PORT}`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
  },
})
