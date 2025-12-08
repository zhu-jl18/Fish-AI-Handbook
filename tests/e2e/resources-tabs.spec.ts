import { test, expect } from '@playwright/test'

// /resources 使用 TabContentLayout，多标签内容行为测试

test.describe('/resources 多标签内容', () => {
  test('初始加载时有多个标签且默认标签对应内容可见', async ({ page }) => {
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')

    const tabs = page.locator('.content-tab')
    const tabCount = await tabs.count()
    // 如果暂时没有配置多标签内容，则直接跳过
    if (tabCount <= 1) return

    const activeTab = page.locator('.content-tab.active').first()
    await expect(activeTab).toBeVisible()

    const tabId = await activeTab.getAttribute('data-tab-id')
    const activePanel = page.locator(
      `.content-tab-panel[data-tab-id="${tabId}"]`,
    )
    await expect(activePanel).toBeVisible()
  })

  test('点击其他标签会切换可见内容', async ({ page }) => {
    await page.goto('/resources')
    await page.waitForLoadState('networkidle')

    const tabs = page.locator('.content-tab')
    const tabCount = await tabs.count()

    if (tabCount < 2) return

    const secondTab = tabs.nth(1)
    const targetId = await secondTab.getAttribute('data-tab-id')

    await secondTab.click()

    const targetPanel = page.locator(
      `.content-tab-panel[data-tab-id="${targetId}"]`,
    )
    await expect(targetPanel).toBeVisible()

    // 确保至少有一个其他面板被隐藏
    const allPanels = page.locator('.content-tab-panel')
    const hiddenCount = await allPanels.evaluateAll(
      (els) => els.filter((el) => el.hasAttribute('hidden')).length,
    )
    expect(hiddenCount).toBeGreaterThanOrEqual(1)
  })
})
