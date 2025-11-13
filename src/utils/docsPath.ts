export function normalizeEntryId(raw: string | undefined | null): string {
  let s = String(raw ?? '').trim()
  s = s.replace(/\.(md|mdx)$/i, '')
  s = s.replace(/\/index$/i, '')
  s = s.replace(/^\/+/, '')
  return s
}

export function buildDocCandidates(normalizedId: string): string[] {
  const id = normalizeEntryId(normalizedId)
  return [
    `/src/content/docs/${id}.md`,
    `/src/content/docs/${id}.mdx`,
    `/src/content/docs/${id}/index.md`,
    `/src/content/docs/${id}/index.mdx`,
  ]
}
