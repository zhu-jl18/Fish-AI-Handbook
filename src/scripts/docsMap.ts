export const DOCS_MAP = {
  'fish-talks': '01-fish-talks',
  'basic': '02-basic-usage',
  'prompts': '03-prompts',
  'advanced': '04-advanced-techniques',
  'demo': '05-demos',
  'tech': '06-technical-deep-dive',
  'fun': '07-fun',
  'resources': '08-resources',
} as const;

export type DocsSection = keyof typeof DOCS_MAP;