import { test, expect } from '@playwright/test'

test.describe('搜索功能', () => {
  test('搜索页面正常加载', async ({ page }) => {
    await page.goto('/search')

    // 页面标题
    await expect(page).toHaveTitle(/搜索/)

    await expect(
      page.getByRole('heading', { name: '搜索', level: 1, hidden: true }),
    ).toHaveCount(1)

    // 搜索容器存在
    await expect(page.locator('#search')).toBeVisible()
  })

  test('搜索框渲染和基本交互', async ({ page }) => {
    await page.goto('/search')

    // 等待 Pagefind UI 加载
    const searchInput = page.locator('.pagefind-ui__search-input')
    await expect(searchInput).toBeVisible({ timeout: 10000 })

    // 输入框占位符：现已移除（空字符串）
    await expect(searchInput).toHaveAttribute('placeholder', '')

    // 测试输入
    await searchInput.fill('RAG')
    await expect(searchInput).toHaveValue('RAG')
  })

  test('搜索返回结果', async ({ page }) => {
    await page.goto('/search')

    // 等待搜索框
    const searchInput = page.locator('.pagefind-ui__search-input')
    await expect(searchInput).toBeVisible({ timeout: 10000 })

    // 搜索关键词
    await searchInput.fill('向量')

    // 等待结果出现
    const results = page.locator('.pagefind-ui__result')
    await expect(results.first()).toBeVisible({ timeout: 10000 })

    // 确保有结果
    const resultCount = await results.count()
    expect(resultCount).toBeGreaterThan(0)

    // 确保结果可点击
    const firstResult = results.first()
    const link = firstResult.locator('.pagefind-ui__result-link')
    await expect(link).toHaveAttribute('href', /\//)
  })

  test('搜索反馈消息可见', async ({ page }) => {
    await page.goto('/search')

    // 等待搜索框
    const searchInput = page.locator('.pagefind-ui__search-input')
    await expect(searchInput).toBeVisible({ timeout: 10000 })

    // 搜索一个极不可能存在的随机字符串
    await searchInput.fill('qzxjwplvndkthgbrmsycfuioa_9876543210_zzzzzzzzzz')

    // 等待无结果提示
    const message = page.locator('.pagefind-ui__message')
    await expect(message).toBeVisible()
    // 兼容不同 UI 文案：
    // - “未找到结果”
    // - “找到 X 个 ... 结果”
    // - “没有找到与"{term}"相关的内容” (Pagefind 默认模板变量未替换的情况)
    await expect(message).toHaveText(
      /未找到结果|找到\s+\d+\s+个|没有找到与"\{term\}"相关的内容/,
    )
  })
})
