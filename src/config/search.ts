import navigationConfig from './navigation'

export const CHAPTER_LABELS = navigationConfig.items.reduce<
  Record<string, string>
>((acc, item) => {
  acc[item.key] = item.label
  return acc
}, {})

export type ChapterKey = keyof typeof CHAPTER_LABELS
