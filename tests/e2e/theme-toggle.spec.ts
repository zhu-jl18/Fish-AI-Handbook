import { test, expect } from '@playwright/test'

test.describe('主题切换（精简）', () => {
  test('点击切换按钮更改主题', async ({ page }) => {
    await page.goto('/')

    const themeToggle = page.locator('#theme-toggle')
    const html = page.locator('html')

    const initialTheme = await html.getAttribute('data-theme')

    await themeToggle.click()
    await page.waitForTimeout(300)

    const newTheme = await html.getAttribute('data-theme')
    expect(newTheme).not.toBe(initialTheme)
  })
})
