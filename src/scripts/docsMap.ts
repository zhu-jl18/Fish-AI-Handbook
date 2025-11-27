export const DOCS_MAP = {
  concepts: '01-concepts',
  daily: '02-daily',
  prompts: '03-prompts',
  advanced: '04-advanced',
  fun: '05-fun',
  resources: '06-resources',
  theoretical: '07-theoretical',
  manual: '99-manual',
} as const

export type DocsSection = keyof typeof DOCS_MAP
