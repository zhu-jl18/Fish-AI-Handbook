import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://aibook.functorfish.dpdns.org',
  title: 'Fish写给朋友们的AI使用指南',
  output: 'static',
  devToolbar: {
    enabled: true
  }
})
