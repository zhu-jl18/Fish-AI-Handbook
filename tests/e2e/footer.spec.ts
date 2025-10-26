import { test, expect } from '@playwright/test'

test.describe('页脚组件', () => {
  test('页脚在页面底部正常渲染', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('.site-footer')
    await expect(footer).toBeVisible()

    const footerContainer = page.locator('.footer-container')
    await expect(footerContainer).toBeVisible()

    // 验证页脚在页面底部
    const footerBox = await footer.boundingBox()
    const pageHeight = await page.evaluate(() => document.body.scrollHeight)
    expect(footerBox?.y).toBeGreaterThan(pageHeight - 200)
  })

  test('版权信息显示正确', async ({ page }) => {
    await page.goto('/')

    const copyright = page.locator('.copyright')
    await expect(copyright).toBeVisible()
    await expect(copyright).toContainText('Fish AI Handbook')
    await expect(copyright).toContainText(new Date().getFullYear().toString())
  })

  test('Powered by 链接正确', async ({ page }) => {
    await page.goto('/')

    const poweredBy = page.locator('.powered-by')
    await expect(poweredBy).toBeVisible()
    await expect(poweredBy).toContainText('Powered by')

    const githubLink = poweredBy.locator('a[href="https://github.com"]')
    await expect(githubLink).toBeVisible()
    await expect(githubLink).toHaveAttribute('target', '_blank')
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    const vercelLink = poweredBy.locator('a[href="https://vercel.com"]')
    await expect(vercelLink).toBeVisible()
    await expect(vercelLink).toHaveAttribute('target', '_blank')
    await expect(vercelLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('Status 占位符不可点击', async ({ page }) => {
    await page.goto('/')

    const statusPlaceholder = page.locator('.status-placeholder')
    await expect(statusPlaceholder).toBeVisible()
    await expect(statusPlaceholder).toContainText('Status')

    // 确认 Status 是 span 而不是 a 标签
    const tagName = await statusPlaceholder.evaluate((el) => el.tagName)
    expect(tagName).toBe('SPAN')

    // 确认没有 href 属性
    await expect(statusPlaceholder).not.toHaveAttribute('href')
  })

  test('Contact 链接可点击且指向正确', async ({ page }) => {
    await page.goto('/')

    const contactLink = page
      .locator('.footer-container > a')
      .filter({ hasText: 'Contact' })
    await expect(contactLink).toBeVisible()
    await expect(contactLink).toHaveAttribute(
      'href',
      'https://github.com/zhu-jl18/Fish-AI-Handbook-styles/issues',
    )
    await expect(contactLink).toHaveAttribute('target', '_blank')
    await expect(contactLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('分隔符正确显示', async ({ page }) => {
    await page.goto('/')

    const separators = page.locator('.separator')
    await expect(separators.first()).toBeVisible()
    await expect(separators.first()).toContainText('·')

    // 验证有多个分隔符
    const count = await separators.count()
    expect(count).toBeGreaterThan(0)
  })

  test('页脚在不同页面均显示', async ({ page }) => {
    const pages = ['/', '/setup', '/prompts']

    for (const pagePath of pages) {
      await page.goto(pagePath)
      const footer = page.locator('.site-footer')
      await expect(footer).toBeVisible()
    }
  })
})
