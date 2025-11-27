import { test, expect } from '@playwright/test'

test('右侧目录自动生成且可点击跳转与滚动高亮', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/daily')
  await page.addStyleTag({
    content: 'astro-dev-toolbar{pointer-events:none !important;opacity:0;}',
  })

  // 等待右侧目录渲染
  const tocLinks = page.locator('.toc-nav a.toc-link')
  await expect(tocLinks.first()).toBeVisible()

  // 记录初始 hash（可能为空）
  const beforeHash = page.url().split('#')[1] ?? ''

  // 尝试点击第二个目录项（若只有一个则点第一个）
  const count = await tocLinks.count()
  const indexToClick = count > 1 ? 1 : 0
  const target = tocLinks.nth(indexToClick)
  const targetId = await target.getAttribute('data-id')
  await page.evaluate((id) => {
    const el = document.querySelector(`.toc-nav a[data-id="${id}"]`)
    if (el instanceof HTMLElement) el.scrollIntoView({ block: 'center' })
  }, targetId)
  await page.evaluate((id) => {
    const link = document.querySelector(`.toc-nav a[data-id="${id}"]`)
    if (link instanceof HTMLElement) {
      link.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      )
    }
  }, targetId)

  // URL hash 应更新为对应 id
  await expect
    .poll(() => page.url())
    .toContain(`#${encodeURIComponent(targetId ?? '')}`)

  // 对应目录项应带有 active class
  await expect(target).toHaveClass(/active/)
})
