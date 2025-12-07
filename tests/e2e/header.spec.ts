import { test, expect } from '@playwright/test'

test.describe('Header 组件（精简冒烟）', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Header 渲染基础元素', async ({ page }) => {
    const header = page.locator('header').first()
    await expect(header).toBeVisible()

    const logo = page.locator('.logo')
    await expect(logo).toBeVisible()

    const navLinks = page.locator('.nav-links a')
    await expect(navLinks.first()).toBeVisible()
  })

  test('Sitemap 按钮存在', async ({ page }) => {
    const sitemapButton = page.locator('#sitemap-button')
    await expect(sitemapButton).toBeVisible()
  })
})
