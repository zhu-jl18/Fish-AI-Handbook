import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  retries: 0,
  use: {
    // 使用较少被占用的端口，避免与本地 4321/4322 冲突
    baseURL: 'http://localhost:4242',
    trace: 'on-first-retry',
  },
  webServer: {
    // 通过参数显式指定 Astro 预览端口，避免默认 4321 与本地冲突
    command: 'npm run preview:search -- --port 4242',
    port: 4242,
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
