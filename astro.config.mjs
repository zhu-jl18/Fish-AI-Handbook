import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import astroExpressiveCode from 'astro-expressive-code'
import { siteConfig, codeConfig } from './src/config/index.ts'
import remarkListSpacing from './src/plugins/remark-list-spacing.js'

export default defineConfig({
  site: siteConfig.url,
  title: siteConfig.title,
  output: 'static',
  markdown: {
    remarkPlugins: [remarkListSpacing],
  },
  integrations: [
    astroExpressiveCode({
      themes: codeConfig.themes,
      defaultProps: codeConfig.defaultProps,
      styleOverrides: codeConfig.styleOverrides,
      frames: codeConfig.frames,
    }),
    mdx(),
  ],
  devToolbar: {
    enabled: true,
  },
})
