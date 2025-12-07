/**
 * Unit tests for docsPath utility functions
 * Run with: npx vitest run tests/unit/docsPath.test.ts
 */
import { describe, it, expect } from 'vitest'
import { normalizeEntryId, buildDocCandidates } from '../../src/utils/docsPath'

describe('normalizeEntryId', () => {
  it('should remove .md extension', () => {
    expect(normalizeEntryId('docs/intro.md')).toBe('docs/intro')
  })

  it('should remove .mdx extension', () => {
    expect(normalizeEntryId('docs/intro.mdx')).toBe('docs/intro')
  })

  it('should remove /index suffix', () => {
    expect(normalizeEntryId('docs/chapter/index')).toBe('docs/chapter')
  })

  it('should remove leading slashes', () => {
    expect(normalizeEntryId('/docs/intro')).toBe('docs/intro')
    expect(normalizeEntryId('//docs/intro')).toBe('docs/intro')
  })

  it('should handle combined cases', () => {
    expect(normalizeEntryId('/docs/chapter/index.md')).toBe('docs/chapter')
    expect(normalizeEntryId('//docs/article.mdx')).toBe('docs/article')
  })

  it('should handle empty string', () => {
    expect(normalizeEntryId('')).toBe('')
  })

  it('should handle undefined', () => {
    expect(normalizeEntryId(undefined)).toBe('')
  })

  it('should handle null', () => {
    expect(normalizeEntryId(null)).toBe('')
  })

  it('should preserve valid paths', () => {
    expect(normalizeEntryId('docs/chapter/article')).toBe('docs/chapter/article')
  })

  it('should handle case-insensitive extensions', () => {
    expect(normalizeEntryId('docs/intro.MD')).toBe('docs/intro')
    expect(normalizeEntryId('docs/intro.MDX')).toBe('docs/intro')
  })

  it('should handle case-insensitive index', () => {
    expect(normalizeEntryId('docs/chapter/INDEX')).toBe('docs/chapter')
  })

  it('should trim whitespace', () => {
    expect(normalizeEntryId('  docs/intro  ')).toBe('docs/intro')
  })
})

describe('buildDocCandidates', () => {
  it('should generate all possible file paths', () => {
    const candidates = buildDocCandidates('01-concepts/intro')
    expect(candidates).toEqual([
      '/src/content/docs/01-concepts/intro.md',
      '/src/content/docs/01-concepts/intro.mdx',
      '/src/content/docs/01-concepts/intro/index.md',
      '/src/content/docs/01-concepts/intro/index.mdx',
    ])
  })

  it('should handle nested paths', () => {
    const candidates = buildDocCandidates('01-concepts/developer/automation')
    expect(candidates).toContain('/src/content/docs/01-concepts/developer/automation.md')
    expect(candidates).toContain(
      '/src/content/docs/01-concepts/developer/automation/index.md',
    )
  })

  it('should normalize input before generating candidates', () => {
    const candidates1 = buildDocCandidates('docs/intro.md')
    const candidates2 = buildDocCandidates('docs/intro')
    expect(candidates1).toEqual(candidates2)
  })

  it('should handle root level paths', () => {
    const candidates = buildDocCandidates('intro')
    expect(candidates).toContain('/src/content/docs/intro.md')
  })

  it('should handle paths with index already', () => {
    const candidates = buildDocCandidates('docs/chapter/index')
    expect(candidates).toContain('/src/content/docs/docs/chapter.md')
  })

  it('should return 4 candidates', () => {
    const candidates = buildDocCandidates('any/path')
    expect(candidates).toHaveLength(4)
  })
})
