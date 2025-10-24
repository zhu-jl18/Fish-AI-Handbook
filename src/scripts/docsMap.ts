export const DOCS_MAP = {
  'fish-talks': '01-fish-talks',
  'basic-usage': '02-basic-usage',
  prompts: '03-prompts',
  advanced: '04-advanced-techniques',
  fun: '05-fun',
  resources: '06-resources',
  theoretical: '07-theoretical',
  setup: '99-setup',
} as const

export type DocsSection = keyof typeof DOCS_MAP
