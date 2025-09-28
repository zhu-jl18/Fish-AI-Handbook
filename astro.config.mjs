import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://aibook.functorfish.dpdns.org',
  title: 'Fish写给朋友们的AI使用指南',
  output: 'static',
  integrations: [mdx()],
  devToolbar: {
    enabled: true
  },
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
      wrap: true
    }
  }
})
