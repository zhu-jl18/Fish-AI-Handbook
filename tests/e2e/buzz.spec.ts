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
    const sidebar = page.locator('.left-sidebar')
    await expect(sidebar.locator('text=Vibe Coding')).toBeVisible()
    await expect(sidebar.locator('text=Agent')).toBeVisible()
    await expect(sidebar.locator('text=Workflow')).toBeVisible()
  })

  test('Vibe Coding页面正常加载', async ({ page }) => {
    await page.goto('/fish-talks/buzz/vibe-coding')

    // 检查页面标题
    await expect(page.locator('.content-inner h1').first()).toContainText(
      'Vibe Coding',
    )

    // 检查核心内容存在
    await expect(page.locator('text=氛围编程')).toBeVisible()
    await expect(page.locator('text=对话驱动')).toBeVisible()

    // 检查侧边栏高亮
    const activeLink = page.locator(
      '.left-sidebar a[href="/fish-talks/buzz/vibe-coding"]',
    )
    await expect(activeLink).toHaveClass(/active/)
  })

  test('Agent页面正常加载', async ({ page }) => {
    await page.goto('/fish-talks/buzz/agent')

    // 检查页面标题
    await expect(page.locator('.content-inner h1').first()).toContainText(
      'Agent',
    )

    // 检查核心内容存在（更精确的选择器）
    await expect(page.locator('.content-inner').first()).toContainText('智能体')
    await expect(page.locator('.content-inner').first()).toContainText(
      '工具使用',
    )

    // 检查侧边栏高亮
    const activeLink = page.locator(
      '.left-sidebar a[href="/fish-talks/buzz/agent"]',
    )
    await expect(activeLink).toHaveClass(/active/)
  })

  test('Workflow页面正常加载', async ({ page }) => {
    await page.goto('/fish-talks/buzz/workflow')

    // 检查页面标题
    await expect(page.locator('.content-inner h1').first()).toContainText(
      'Workflow',
    )

    // 检查核心内容存在（更精确的选择器）
    await expect(page.locator('.content-inner').first()).toContainText('工作流')
    await expect(page.locator('.content-inner').first()).toContainText(
      '流程编排',
    )

    // 检查侧边栏高亮
    const activeLink = page.locator(
      '.left-sidebar a[href="/fish-talks/buzz/workflow"]',
    )
    await expect(activeLink).toHaveClass(/active/)
  })

  test('子页面间导航正常', async ({ page }) => {
    // 从buzz首页进入vibe-coding
    await page.goto('/fish-talks/buzz')
    await page.click('a[href="/fish-talks/buzz/vibe-coding"]')
    await expect(page).toHaveURL(/\/fish-talks\/buzz\/vibe-coding/)

    // 通过侧边栏切换到agent
    await page.click('.left-sidebar a[href="/fish-talks/buzz/agent"]')
    await expect(page).toHaveURL(/\/fish-talks\/buzz\/agent/)

    // 通过侧边栏切换到workflow
    await page.click('.left-sidebar a[href="/fish-talks/buzz/workflow"]')
    await expect(page).toHaveURL(/\/fish-talks\/buzz\/workflow/)

    // 返回buzz首页
    await page.click('.left-sidebar a[href="/fish-talks/buzz"]:not(.toc-link)')
    await expect(page).toHaveURL(/\/fish-talks\/buzz$/)
  })
})
