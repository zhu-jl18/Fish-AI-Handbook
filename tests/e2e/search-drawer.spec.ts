import { test, expect } from '@playwright/test'

test.describe('搜索抽屉（重点）', () => {
  test('点击搜索按钮打开抽屉', async ({ page }) => {
    await page.goto('/')

    const drawer = page.locator('#search-drawer')
    await expect(drawer).toHaveAttribute('aria-hidden', 'true')

    const searchButton = page.locator('#search-trigger')
    await searchButton.click()

    await expect(drawer).toHaveAttribute('aria-hidden', 'false')

    const searchInput = page.locator('#search-drawer-input')
    await expect(searchInput).toBeFocused()
  })

  test('按 ESC 键关闭抽屉', async ({ page }) => {
    await page.goto('/')

    await page.locator('#search-trigger').click()
    const drawer = page.locator('#search-drawer')
    await expect(drawer).toHaveClass(/open/)

    await page.keyboard.press('Escape')

    await expect(drawer).toHaveAttribute('aria-hidden', 'true')
  })

  test('搜索框渲染和基本交互', async ({ page }) => {
    await page.goto('/')

    await page.locator('#search-trigger').click()

    const searchInput = page.locator('#search-drawer-input')
    await expect(searchInput).toBeVisible()
    await expect(searchInput).toHaveAttribute('type', 'search')

    await searchInput.fill('向量')
    await expect(searchInput).toHaveValue('向量')
  })

  test('搜索返回结果', async ({ page }) => {
    await page.goto('/')

    await page.locator('#search-trigger').click()

    const searchInput = page.locator('#search-drawer-input')
    await expect(searchInput).toBeVisible()

    const resultsBox = page.locator('.search-results')

    await searchInput.fill('向量')

    await expect(resultsBox).toHaveAttribute('data-state', 'results', {
      timeout: 10000,
    })

    const results = page.locator('.result-item')
    await expect(results.first()).toBeVisible({ timeout: 5000 })

    const firstResult = results.first()
    await expect(firstResult).toHaveAttribute('href', /\//)
  })

  test('搜索功能能处理无结果和清空状态', async ({ page }) => {
    await page.goto('/')

    await page.locator('#search-trigger').click()

    const searchInput = page.locator('#search-drawer-input')
    await expect(searchInput).toBeVisible()

    await searchInput.fill('xyz999nonexistent')

    const resultsBox = page.locator('.search-results')
    await expect(resultsBox).toHaveAttribute('data-state', /(empty|results)/, {
      timeout: 10000,
    })

    await searchInput.clear()
    await expect(resultsBox).toHaveAttribute('data-state', 'idle', {
      timeout: 5000,
    })
  })

  test('键盘快捷键 / 可以打开搜索并聚焦输入框', async ({ page }) => {
    await page.goto('/')

    const drawer = page.locator('#search-drawer')
    await expect(drawer).not.toHaveClass(/open/)

    await page.keyboard.press('/')

    await expect(drawer).toHaveClass(/open/)

    const searchInput = page.locator('#search-drawer-input')
    await expect(searchInput).toBeFocused()
  })

  test('搜索结果支持键盘上下键导航', async ({ page }) => {
    await page.goto('/')

    await page.locator('#search-trigger').click()
    const searchInput = page.locator('#search-drawer-input')
    await searchInput.fill('AI')

    const resultsBox = page.locator('.search-results')
    await expect(resultsBox).toHaveAttribute('data-state', 'results', {
      timeout: 10000,
    })

    await page.keyboard.press('ArrowDown')

    const firstResult = page.locator('.result-item').first()
    await expect(firstResult).toHaveClass(/active/)

    await page.keyboard.press('ArrowUp')
    const lastResult = page.locator('.result-item').last()
    await expect(lastResult).toHaveClass(/active/)
  })
})
