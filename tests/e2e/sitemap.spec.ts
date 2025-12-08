import { test, expect } from '@playwright/test'

// 基于 @astrojs/sitemap 默认行为和 Header 中 sitemap 按钮指向的 URL
// 验证 sitemap 索引是否可访问且为 XML

test.describe('Sitemap', () => {
  test('sitemap-index.xml 可访问且为 XML', async ({ page }) => {
    const response = await page.goto('/sitemap-index.xml')
    expect(response?.ok()).toBeTruthy()

    const contentType = response?.headers()['content-type'] ?? ''
    expect(contentType).toMatch(/xml/i)

    const content = await page.content()
    expect(content).toMatch(/<(sitemapindex|urlset)/i)
  })
})
