import { test, expect } from '@playwright/test'

test.describe('搜索抽屉', () => {
  test('点击搜索按钮打开抽屉', async ({ page }) => {
    await page.goto('/')

    // 验证抽屉初始状态为关闭
    const drawer = page.locator('#search-drawer')
    await expect(drawer).toHaveAttribute('aria-hidden', 'true')
    await expect(drawer).not.toHaveClass(/open/)

    // 点击搜索按钮
    const searchButton = page.locator('#search-trigger')
    await searchButton.click()

    // 验证抽屉打开
    await expect(drawer).toHaveAttribute('aria-hidden', 'false')
    await expect(drawer).toHaveClass(/open/)

    // 验证搜索输入框获得焦点
    const searchInput = page.locator('#search-drawer-input')
    await expect(searchInput).toBeFocused()
  })

  test('按 ESC 键关闭抽屉', async ({ page }) => {
    await page.goto('/')

    // 打开抽屉
    await page.locator('#search-trigger').click()
    const drawer = page.locator('#search-drawer')
    await expect(drawer).toHaveClass(/open/)

    // 按 ESC 键
    await page.keyboard.press('Escape')

    // 验证抽屉关闭
    await expect(drawer).toHaveAttribute('aria-hidden', 'true')
    await expect(drawer).not.toHaveClass(/open/)
  })

  test('点击背景关闭抽屉', async ({ page }) => {
    await page.goto('/')

    // 打开抽屉
    await page.locator('#search-trigger').click()
    const drawer = page.locator('#search-drawer')
    await expect(drawer).toHaveClass(/open/)

    // 点击背景
    await page.locator('.search-backdrop').click()

    // 验证抽屉关闭
    await expect(drawer).toHaveAttribute('aria-hidden', 'true')
    await expect(drawer).not.toHaveClass(/open/)
  })

  test('搜索框渲染和基本交互', async ({ page }) => {
    await page.goto('/')

    // 打开抽屉
    await page.locator('#search-trigger').click()

    // 验证搜索输入框
    const searchInput = page.locator('#search-drawer-input')
    await expect(searchInput).toBeVisible()
    await expect(searchInput).toHaveAttribute('type', 'search')

    // 测试输入
    await searchInput.fill('向量')
    await expect(searchInput).toHaveValue('向量')
  })

  test('搜索返回结果', async ({ page }) => {
    await page.goto('/')

    // 打开抽屉
    await page.locator('#search-trigger').click()

    // 等待搜索框
    const searchInput = page.locator('#search-drawer-input')
    await expect(searchInput).toBeVisible()

    const resultsBox = page.locator('.search-results')

    // 搜索关键词
    await searchInput.fill('向量')

    // 等待结果出现
    await expect(resultsBox).toHaveAttribute('data-state', 'results', {
      timeout: 10000,
    })

    // 验证有结果
    const results = page.locator('.result-item')
    await expect(results.first()).toBeVisible({ timeout: 5000 })

    // 确保结果可点击并有正确的链接
    const firstResult = results.first()
    await expect(firstResult).toHaveAttribute('href', /\//)
  })

  test('搜索功能能够响应并处理任意输入', async ({ page }) => {
    await page.goto('/')

    // 打开抽屉
    await page.locator('#search-trigger').click()

    // 等待搜索框
    const searchInput = page.locator('#search-drawer-input')
    await expect(searchInput).toBeVisible()

    // 测试搜索功能能够处理各种输入
    await searchInput.fill('xyz999nonexistent')

    // 等待搜索完成
    const resultsBox = page.locator('.search-results')
    await expect(resultsBox).toHaveAttribute('data-state', /(empty|results)/, {
      timeout: 10000,
    })

    // 清空搜索框后应返回 idle 状态
    await searchInput.clear()
    await expect(resultsBox).toHaveAttribute('data-state', 'idle', {
      timeout: 5000,
    })
  })

  test('章节过滤功能可见', async ({ page }) => {
    await page.goto('/prompts')

    // 打开抽屉
    await page.locator('#search-trigger').click()

    // 验证章节过滤选项
    const chapterScope = page.locator('[data-scope="chapter"]')
    await expect(chapterScope).toBeVisible()

    // 验证章节语法显示
    const chapterSyntax = page.locator('[data-chapter-syntax]')
    await expect(chapterSyntax).toBeVisible()
    // 在 prompts 页面应该显示 chapter:prompts
    await expect(chapterSyntax).toContainText('chapter:')
  })

  test('作者过滤功能可见', async ({ page }) => {
    await page.goto('/')

    // 打开抽屉
    await page.locator('#search-trigger').click()

    // 验证作者过滤选项
    const authorScope = page.locator('[data-scope="author"]')
    await expect(authorScope).toBeVisible()

    // 验证作者语法显示
    const authorSyntax = page.locator('[data-author-syntax]')
    await expect(authorSyntax).toBeVisible()
    await expect(authorSyntax).toContainText('author:')
  })

  test('键盘快捷键 / 打开搜索', async ({ page }) => {
    await page.goto('/')

    const drawer = page.locator('#search-drawer')
    await expect(drawer).not.toHaveClass(/open/)

    // 按 / 键打开搜索
    await page.keyboard.press('/')

    // 验证抽屉打开
    await expect(drawer).toHaveClass(/open/)

    // 验证搜索输入框获得焦点
    const searchInput = page.locator('#search-drawer-input')
    await expect(searchInput).toBeFocused()
  })

  test('搜索结果键盘导航', async ({ page }) => {
    await page.goto('/')

    // 打开抽屉并搜索
    await page.locator('#search-trigger').click()
    const searchInput = page.locator('#search-drawer-input')
    await searchInput.fill('AI')

    // 等待结果
    const resultsBox = page.locator('.search-results')
    await expect(resultsBox).toHaveAttribute('data-state', 'results', {
      timeout: 10000,
    })

    // 按下箭头键选择第一个结果
    await page.keyboard.press('ArrowDown')

    // 验证第一个结果被激活
    const firstResult = page.locator('.result-item').first()
    await expect(firstResult).toHaveClass(/active/)

    // 按上箭头键应该循环到最后一个
    await page.keyboard.press('ArrowUp')
    const lastResult = page.locator('.result-item').last()
    await expect(lastResult).toHaveClass(/active/)
  })
})
