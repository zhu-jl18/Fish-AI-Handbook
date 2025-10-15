import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://aibook.functorfish.dpdns.org',
  title: 'Fish写给朋友们的AI使用指南',
  output: 'static',
  integrations: [mdx()],
  devToolbar: {
    enabled: true,
  },
  redirects: {
    '/prompts/interaction-basics/definition':
      '/prompts/interaction-basics/basics',
    '/prompts/interaction-basics/necessity':
      '/prompts/interaction-basics/basics',
    '/prompts/context-learning': '/prompts/context',
    '/prompts/dialogue-levels/system-prompts': '/prompts/dialogue-levels/',
    '/prompts/dialogue-levels/assistant-messages': '/prompts/dialogue-levels/',
    '/prompts/dialogue-levels/user-prompts': '/prompts/dialogue-levels/',
    '/prompts/practical-tips/priority': '/prompts/practical-tips/',
    '/prompts/practical-tips/instruction-following': '/prompts/practical-tips/',
    '/prompts/practical-tips/prompt-amplification': '/prompts/practical-tips/',
    '/prompts/practical-tips/self-iteration': '/prompts/practical-tips/',
    '/prompts/handy-examples': '/prompts/examples',
  },
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
      wrap: true,
    },
  },
})
