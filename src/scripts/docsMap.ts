export const DOCS_MAP = {
  'fish-talks': '01-fish-talks',
  'basic-usage': '02-basic-usage',
  prompts: '04-prompts',
  advanced: '05-advanced-techniques',
  demo: '06-demos',
  tech: '07-technical-deep-dive',
  fun: '08-fun',
  resources: '09-resources',
} as const

export type DocsSection = keyof typeof DOCS_MAP
