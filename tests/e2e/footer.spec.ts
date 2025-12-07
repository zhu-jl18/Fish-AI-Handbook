import { test, expect } from '@playwright/test'

test.describe('页脚组件（精简）', () => {
  test('页脚在主要页面均显示', async ({ page }) => {
    const pages = ['/', '/manual', '/prompts']

    for (const pagePath of pages) {
      await page.goto(pagePath)
      const footer = page.locator('.site-footer')
      await expect(footer).toBeVisible()
    }
  })
})
