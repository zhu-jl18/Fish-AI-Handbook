import { test, expect } from '@playwright/test'

test('RSS 订阅源可访问且为 XML', async ({ page }) => {
  const response = await page.goto('/rss.xml')
  expect(response?.ok()).toBeTruthy()

  const contentType = response?.headers()['content-type'] ?? ''
  expect(contentType).toMatch(/xml/)

  const content = await page.content()
  expect(content).toMatch(/<rss/i)
})

