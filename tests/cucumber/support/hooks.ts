import { Before, After, setDefaultTimeout } from '@cucumber/cucumber'
import { chromium, Browser, BrowserContext, Page } from '@playwright/test'

setDefaultTimeout(30000)

declare global {
  var browser: Browser
  var context: BrowserContext
  var page: Page
}

Before(async () => {
  const headless = process.env.PLAYWRIGHT_HEADLESS !== 'false'
  global.browser = await chromium.launch({ headless, slowMo: headless ? 0 : 300 })
  global.context = await global.browser.newContext()
  global.page = await global.context.newPage()
})

After(async () => {
  await global.page.close()
  await global.context.close()
  await global.browser.close()
})
