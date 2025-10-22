import { test, expect } from '@playwright/test'

test.describe('流行词汇页面测试', () => {
  test('流行词汇首页正常加载', async ({ page }) => {
    await page.goto('/fish-talks/buzz')

    // 检查页面标题
    await expect(page.locator('.content-inner h1').first()).toContainText(
      '流行词汇',
    )

    // 检查三个子页面链接存在（在内容区域）
    await expect(
      page.locator('.content-inner a[href="/fish-talks/buzz/vibe-coding"]'),
    ).toBeVisible()
    await expect(
      page.locator('.content-inner a[href="/fish-talks/buzz/agent"]'),
    ).toBeVisible()
    await expect(
      page.locator('.content-inner a[href="/fish-talks/buzz/workflow"]'),
    ).toBeVisible()

    // 检查侧边栏子项存在
    const structure = page.locator('.structure-nav')
    await expect(
      structure.locator('.structure-sublink[href="/fish-talks/buzz/vibe-coding"]'),
    ).toBeVisible()
    await expect(
      structure.locator('.structure-sublink[href="/fish-talks/buzz/agent"]'),
    ).toBeVisible()
    await expect(
      structure.locator('.structure-sublink[href="/fish-talks/buzz/workflow"]'),
    ).toBeVisible()
  })

  test('Vibe Coding页面正常加载', async ({ page }) => {
    await page.goto('/fish-talks/buzz/vibe-coding')

    // 检查页面标题
    await expect(page.locator('.content-inner h1').first()).toContainText(
      'Vibe Coding',
    )

    // 核心英文内容检查（简化）
    await expect(page.locator('.content-inner').first()).toContainText(
      'Vibe Coding',
    )

    // 检查侧边栏高亮
    const activeLink = page.locator(
      '.structure-sublink[href="/fish-talks/buzz/vibe-coding"]',
    )
    await expect(activeLink).toHaveClass(/active/)
  })

  test('Agent页面正常加载', async ({ page }) => {
    await page.goto('/fish-talks/buzz/agent')

    // 检查页面标题
    await expect(page.locator('.content-inner h1').first()).toContainText(
      'Agent',
    )

    // 核心英文内容检查（简化）
    await expect(page.locator('.content-inner').first()).toContainText('Agent')

    // 检查侧边栏高亮
    const activeLink = page.locator(
      '.structure-sublink[href="/fish-talks/buzz/agent"]',
    )
    await expect(activeLink).toHaveClass(/active/)
  })

  test('Workflow页面正常加载', async ({ page }) => {
    await page.goto('/fish-talks/buzz/workflow')

    // 检查页面标题
    await expect(page.locator('.content-inner h1').first()).toContainText(
      'Workflow',
    )

    // 核心英文内容检查（简化）
    await expect(page.locator('.content-inner').first()).toContainText(
      'Workflow',
    )
    await expect(page.locator('.content-inner').first()).toContainText(
      'Platform',
    )

    // 检查侧边栏高亮
    const activeLink = page.locator(
      '.structure-sublink[href="/fish-talks/buzz/workflow"]',
    )
    await expect(activeLink).toHaveClass(/active/)
  })

  test('子页面间导航正常', async ({ page }) => {
    // 从buzz首页进入vibe-coding
    await page.goto('/fish-talks/buzz')
    await page.click('a[href="/fish-talks/buzz/vibe-coding"]')
    await expect(page).toHaveURL(/\/fish-talks\/buzz\/vibe-coding/)

    // 通过侧边栏切换到agent
    await page.click('.structure-sublink[href="/fish-talks/buzz/agent"]')
    await expect(page).toHaveURL(/\/fish-talks\/buzz\/agent/)

    // 通过侧边栏切换到workflow
    await page.click('.structure-sublink[href="/fish-talks/buzz/workflow"]')
    await expect(page).toHaveURL(/\/fish-talks\/buzz\/workflow/)

    // 返回buzz首页
    await page.click('.structure-link[href="/fish-talks/buzz"]')
    await expect(page).toHaveURL(/\/fish-talks\/buzz$/)
  })
})
