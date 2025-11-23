import { test, expect } from '@playwright/test'

test('移动端目录抽屉可打开并跳转 TOC', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/basic-usage')
  await page.addStyleTag({
    content: 'astro-dev-toolbar{pointer-events:none !important;opacity:0;}',
  })

  const trigger = page.locator('.mobile-menu-trigger')
  await expect(trigger).toBeVisible()
  await trigger.click()

  const overlay = page.locator('#mobile-menu-overlay')
  await expect(overlay).toHaveClass(/open/)

  const tocLinks = overlay.locator('.mobile-toc-nav a.toc-link')
  await expect(tocLinks.first()).toBeVisible()

  const target = tocLinks.first()
  const targetId = await target.getAttribute('data-id')
  await target.click({ force: true })

  await expect
    .poll(() => page.url())
    .toContain(`#${encodeURIComponent(targetId ?? '')}`)

  await expect(overlay).not.toHaveClass(/open/, { timeout: 2000 })
})
