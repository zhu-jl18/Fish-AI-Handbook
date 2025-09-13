import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://fish-ai-book.vercel.app',
  title: 'Fish写给朋友们的AI使用指南',
  output: 'static',
  devToolbar: {
    enabled: true
  }
})
