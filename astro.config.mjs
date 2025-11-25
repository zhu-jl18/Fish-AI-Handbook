import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import astroExpressiveCode from 'astro-expressive-code'
import { siteConfig, codeConfig } from './src/config/index.ts'
import remarkListSpacing from './src/plugins/remark-list-spacing.js'
import remarkMath from 'remark-math'
import remarkDirective from 'remark-directive'
import remarkGalleryDirective from './src/plugins/remark-gallery-directive.js'
import remarkSpoilerDirective from './src/plugins/remark-spoiler-directive.js'
import { remarkModifiedTime } from './src/plugins/remark-frontmatter-last-modified.mjs'
import rehypeKatex from 'rehype-katex'

export default defineConfig({
  site: siteConfig.url,
  title: siteConfig.title,
  output: 'static',
  markdown: {
    smartypants: false,
    remarkPlugins: [
      remarkListSpacing,
       remarkMath,
      remarkDirective,
      remarkGalleryDirective,
      remarkSpoilerDirective,
      remarkModifiedTime,
    ],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    astroExpressiveCode({
      themes: codeConfig.themes,
      defaultProps: codeConfig.defaultProps,
      styleOverrides: codeConfig.styleOverrides,
      frames: codeConfig.frames,
    }),
    mdx(),
    sitemap(),
  ],
  devToolbar: {
    enabled: true,
  },
  vite: {
    build: {
      // 启用 CSS 代码分割，减少首屏 CSS 体积
      cssCodeSplit: true,
      // 资源内联阈值（4KB），小于此大小的资源将被内联为 base64
      assetsInlineLimit: 4096,
      // 启用压缩（默认使用 esbuild，速度快）
      minify: 'esbuild',
    },
  },
})
