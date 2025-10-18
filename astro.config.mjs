import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import astroExpressiveCode from 'astro-expressive-code'

export default defineConfig({
  site: 'https://aibook.functorfish.dpdns.org',
  title: 'Fish写给朋友们的AI使用指南',
  output: 'static',
  integrations: [
    astroExpressiveCode({
      themes: ['dark-plus'],
      defaultProps: {
        wrap: true,
        preserveIndent: true,
      },
      styleOverrides: {
        codeFontSize: '0.9rem',
        codeLineHeight: '1.4',
        codePaddingBlock: '1rem',
        codePaddingInline: '1.25rem',
        borderRadius: '0.5rem',
        borderWidth: '1px',
      },
      frames: {
        showCopyToClipboardButton: true,
        extractFileNameFromCode: true,
      },
    }),
    mdx(),
  ],
  devToolbar: {
    enabled: true,
  },
})
