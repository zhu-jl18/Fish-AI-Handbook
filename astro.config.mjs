import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import preact from '@astrojs/preact'
import astroExpressiveCode from 'astro-expressive-code'
import { siteConfig, codeConfig } from './src/config/index.ts'
import remarkListSpacing from './src/plugins/remark-list-spacing.js'
import remarkMath from 'remark-math'
import remarkDirective from 'remark-directive'
import remarkGalleryDirective from './src/plugins/remark-gallery-directive.js'
import remarkSpoilerDirective from './src/plugins/remark-spoiler-directive.js'
import remarkMarkDirective from './src/plugins/remark-mark-directive.js'
import { remarkModifiedTime } from './src/plugins/remark-frontmatter-last-modified.mjs'
import remarkLazyImages from './src/plugins/remark-lazy-images.js'
import rehypeKatex from 'rehype-katex'

export default defineConfig({
  site: siteConfig.url,
  title: siteConfig.title,
  output: 'static',
  image: {
    // 远程图片域名配置 - 新增图床时需同步更新此列表
    // 查找遗漏: Get-ChildItem -Path src/content -Recurse -Filter "*.md" | Select-String -Pattern 'https?://[^\s)]+\.(png|jpg|gif|webp|svg)' | % { ([uri]$_.Matches.Value).Host } | Sort -Unique
    domains: [
      // 自建图床
      'media.makomako.dpdns.org',
      // 第三方图床
      'p.sda1.dev',
      'static.woshipm.com',
      'miro.medium.com',
      'cloud.starkinsider.com',
      // GitHub 相关
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      // 其他 CDN
      'framerusercontent.com',
      'registry.npmmirror.com',
    ],
  },
  markdown: {
    smartypants: false,
    remarkPlugins: [
      remarkListSpacing,
      remarkMath,
      remarkDirective,
      remarkGalleryDirective,
      remarkSpoilerDirective,
      remarkMarkDirective,
      remarkModifiedTime,
      remarkLazyImages,
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
    mdx({
      optimize: true,
    }),
    sitemap(),
    preact(),
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
