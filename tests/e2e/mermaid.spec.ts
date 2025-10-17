import { test, expect } from '@playwright/test'

// Verify Mermaid renders from code blocks on a representative page
// We assert that .mermaid container exists and contains an <svg> after client script runs

test.describe('Mermaid 渲染', () => {
  test('buzz/workflow 页面上的 mermaid 图表已渲染为 SVG', async ({ page }) => {
    await page.goto('/fish-talks/buzz/workflow')

    // 等待脚本替换 pre[data-language="mermaid"] 并运行 mermaid.run
    await page.waitForSelector('.mermaid', { state: 'attached' })

    // Mermaid 渲染完成后会注入 <svg>（或 <div> 包含 <svg>）
    const svg = page.locator('.mermaid svg')
    await expect(svg.first()).toBeVisible()

    // 确认不再存在原始的 mermaid 代码块（至少一个被替换）
    const preCount = await page.locator("pre[data-language='mermaid']").count()
    expect(preCount).toBeLessThan(2) // 页面有多个图，至少有一个被替换
  })
})
