import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import astroExpressiveCode from 'astro-expressive-code'
import { siteConfig, codeConfig } from './src/config/index.ts'

export default defineConfig({
  site: siteConfig.url,
  title: siteConfig.title,
  output: 'static',
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
