import { test, expect } from '@playwright/test'

test.describe('跨页面导航（精简）', () => {
  test('顶部导航可跳转到 Concepts', async ({ page }) => {
    await page.goto('/')

    const conceptsLink = page.locator('.nav-links a[href="/concepts"]')
    await expect(conceptsLink).toBeVisible()

    await conceptsLink.click()
    await page.waitForLoadState('networkidle')

    expect(page.url()).toContain('/concepts')
  })

  test('浏览器前进/后退在首页和 Concepts 之间正常工作', async ({ page }) => {
    await page.goto('/')
    await page.goto('/concepts')
    await page.waitForLoadState('networkidle')

    await page.goBack()
    await page.waitForLoadState('networkidle')
    expect(page.url()).toMatch(/\/$/)

    await page.goForward()
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/concepts')
  })

  test('桌面 TOC 点击可以跳转锚点', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/daily')
    await page.waitForLoadState('networkidle')

    const tocLinks = page.locator('.toc-nav a.toc-link')
    const count = await tocLinks.count()

    if (count > 0) {
      const firstLink = tocLinks.first()
      const targetId = await firstLink.getAttribute('data-id')

      await firstLink.click()

      await expect
        .poll(() => page.url())
        .toContain(`#${encodeURIComponent(targetId ?? '')}`)
    }
  })
})
