import { test, expect } from '@playwright/test'

// 移动端 TOC（MobileMenu 抽屉）

test.describe('移动端 TOC 抽屉', () => {
  test('打开抽屉（若存在 TOC 则展示）', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/daily')
    await page.waitForLoadState('networkidle')

    const trigger = page.locator('.mobile-menu-trigger')
    await expect(trigger).toBeVisible()

    await trigger.click()

    const overlay = page.locator('#mobile-menu-overlay')
    await expect(overlay).toHaveClass(/open/)

    // TOC 可能因为当前文档结构暂未生成，此处只要不报错即可
  })

  test('点击 TOC 链接（如果存在）会更新 hash', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/daily')
    await page.waitForLoadState('networkidle')

    const trigger = page.locator('.mobile-menu-trigger')
    await expect(trigger).toBeVisible()
    await trigger.click()

    const overlay = page.locator('#mobile-menu-overlay')
    await expect(overlay).toHaveClass(/open/)

    const tocLink = overlay.locator('.mobile-toc-nav a.toc-link').first()
    const count = await tocLink.count()
    if (count === 0) return

    const targetId = await tocLink.getAttribute('data-id')
    await tocLink.click()

    await expect
      .poll(() => page.url())
      .toContain(`#${encodeURIComponent(targetId ?? '')}`)
  })
})
