import { test, expect } from '@playwright/test'

test.describe('返回顶部按钮（精简）', () => {
  test('点击按钮可以滚动回顶部', async ({ page }) => {
    await page.goto('/daily')
    await page.addStyleTag({
      content: 'astro-dev-toolbar{pointer-events:none !important;opacity:0;}',
    })

    const backToTop = page.locator('.back-to-top')

    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(300)

    await backToTop.click()
    await page.waitForTimeout(500)

    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeLessThan(50)
  })
})
