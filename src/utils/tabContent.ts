/**
 * Multi-Tab Content Utilities
 *
 * Provides functions for detecting and organizing tab content in the resources chapter.
 * This system allows multiple .md files in a directory to be rendered as switchable tabs
 * at the same URL, similar to GitHub's README/CONTRIBUTING switcher.
 *
 * Currently piloted in: /resources chapter
 * Extensibility: Can be applied to other chapters by creating chapter-specific layouts
 */

import type { CollectionEntry } from 'astro:content'
import type { TabConfig } from '../content/config'

export interface TabInfo {
  /** Unique identifier (filename without extension) */
  id: string
  /** Display label for the tab */
  label: string
  /** Sort order (lower = first) */
  order: number
  /** Whether this tab is the default/active one */
  isDefault: boolean
  /** The content entry for rendering */
  entry: CollectionEntry<'docs'>
  /** Rendered content component */
  Content?: any
  /** Headings from the content */
  headings?: any[]
}

/**
 * Default tab ordering values
 */
const DEFAULT_ORDER = {
  index: 0,
  overview: 0,
  details: 10,
  examples: 20,
  changelog: 30,
} as const

/**
 * Default tab labels (used when not specified in frontmatter)
 */
const DEFAULT_LABELS: Record<string, string> = {
  index: 'Overview',
  overview: 'Overview',
  details: 'Details',
  examples: 'Examples',
  changelog: 'Changelog',
  guide: 'Guide',
  tutorial: 'Tutorial',
  reference: 'Reference',
  faq: 'FAQ',
}

/**
 * Get the display label for a tab based on filename and optional frontmatter config
 */
export function getTabLabel(filename: string, tabConfig?: TabConfig): string {
  // Priority: frontmatter > default labels > capitalized filename
  if (tabConfig?.label) {
    return tabConfig.label
  }

  const baseName = filename.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '')
  const key = baseName.toLowerCase()

  if (DEFAULT_LABELS[key]) {
    return DEFAULT_LABELS[key]
  }

  // Capitalize first letter of each word
  return baseName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Get the sort order for a tab based on filename and optional frontmatter config
 */
export function getTabOrder(filename: string, tabConfig?: TabConfig): number {
  // Priority: frontmatter > default order > alphabetical (high number)
  if (tabConfig?.order !== undefined) {
    return tabConfig.order
  }

  const baseName = filename.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '')
  const key = baseName.toLowerCase() as keyof typeof DEFAULT_ORDER

  if (key in DEFAULT_ORDER) {
    return DEFAULT_ORDER[key]
  }

  // Default to 100 + alphabetical position for unknown files
  return 100 + baseName.charCodeAt(0)
}

/**
 * Check if a content entry is a tab variant (non-index file in same directory)
 */
export function isTabVariantEntry(entryId: string): boolean {
  // Tab variants are files that are NOT index.md but are siblings
  const parts = entryId.split('/')
  const filename = parts[parts.length - 1]
  return !filename.startsWith('index') && filename !== ''
}

/**
 * Get the base path for finding sibling tabs
 * e.g., '06-resources/api/details' -> '06-resources/api'
 */
export function getTabBasePath(entryId: string): string {
  const parts = entryId.split('/')
  // Remove the filename part
  if (parts.length > 1) {
    // Check if last part looks like a filename (not 'index')
    const last = parts[parts.length - 1]
    if (last !== 'index' && !last.includes('/')) {
      parts.pop()
    }
  }
  return parts.join('/')
}

/**
 * Filter and organize tab entries from a collection of entries
 */
export function organizeTabEntries(
  entries: CollectionEntry<'docs'>[],
  basePath: string,
): TabInfo[] {
  // Filter entries that belong to the same directory
  const tabEntries = entries.filter((entry) => {
    const entryBase = getTabBasePath(entry.id)
    return (
      entryBase === basePath ||
      entry.id === basePath ||
      entry.id === `${basePath}/index`
    )
  })

  // Transform to TabInfo objects
  const tabs: TabInfo[] = tabEntries.map((entry) => {
    const parts = entry.id.split('/')
    const filename = parts[parts.length - 1] || 'index'
    const tabConfig = entry.data.tab

    const isIndex = filename === 'index' || entry.id === basePath

    return {
      id: isIndex ? 'index' : filename.replace(/\.(md|mdx)$/, ''),
      label: getTabLabel(filename, tabConfig),
      order: getTabOrder(filename, tabConfig),
      isDefault: isIndex || tabConfig?.default === true,
      entry,
    }
  })

  // Sort by order, then alphabetically
  tabs.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order
    }
    return a.label.localeCompare(b.label)
  })

  // Ensure only one default (first one with isDefault, or first tab overall)
  let hasDefault = false
  for (const tab of tabs) {
    if (tab.isDefault && !hasDefault) {
      hasDefault = true
    } else {
      tab.isDefault = false
    }
  }
  if (!hasDefault && tabs.length > 0) {
    tabs[0].isDefault = true
  }

  return tabs
}

/**
 * Check if a resources page has multiple tabs
 */
export function hasMultipleTabs(
  entries: CollectionEntry<'docs'>[],
  basePath: string,
): boolean {
  const tabs = organizeTabEntries(entries, basePath)
  return tabs.length > 1
}
