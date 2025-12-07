import { test, expect } from '@playwright/test'

test.describe('首页（精简）', () => {
  test('首页问候与 Ask Box 基本渲染', async ({ page }) => {
    await page.goto('/')

    const greeting = page.locator('.greeting')
    await expect(greeting).toBeVisible()

    const askInput = page.locator('#ask-input')
    await expect(askInput).toBeVisible()
    await expect(askInput).toHaveAttribute('placeholder', 'Ask anything')
  })

  test('从首页通过导航进入章节并可点击 Logo 返回首页', async ({ page }) => {
    await page.goto('/')

    const conceptsLink = page.locator('.nav-links a[href="/concepts"]')
    await expect(conceptsLink).toBeVisible()

    await conceptsLink.click()
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/concepts')

    const logo = page.locator('.logo')
    await logo.click()
    await page.waitForLoadState('networkidle')
    expect(page.url()).toMatch(/\/$|\?/) 
  })
})
