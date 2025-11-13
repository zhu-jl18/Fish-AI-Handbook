import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { DOCS_MAP } from '../scripts/docsMap'

const SECTION_PREFIX_ENTRIES = Object.entries(DOCS_MAP)

function resolvePathFromSlug(slug: string): string | null {
  const segments = slug.split('/')
  if (segments.length === 0) return null

  const [prefix, ...rest] = segments
  const sectionEntry = SECTION_PREFIX_ENTRIES.find(([, value]) => value === prefix)
  if (!sectionEntry) return null

  const [section] = sectionEntry

  let tail = rest
  if (tail[tail.length - 1] === 'index') {
    tail = tail.slice(0, -1)
  }

  const pathSegments = [section, ...tail]
  return `/${pathSegments.join('/')}`
}

export async function GET(context: { site: URL }) {
  const entries = await getCollection('docs')

  const items = entries
    .map((entry) => {
      const link = resolvePathFromSlug(entry.slug)
      if (!link) return null

      return {
        title: entry.data.title,
        description: entry.data.description,
        link,
      }
    })
    .filter((item): item is { title: string; description: string; link: string } => !!item)

  return rss({
    title: 'Fish AI Handbook',
    description: 'Fish AI Handbook 文档更新订阅',
    site: context.site,
    items,
  })
}

