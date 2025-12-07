/**
 * Unit tests for tabContent utility functions
 * Run with: npx vitest run tests/unit/tabContent.test.ts
 */
import { describe, it, expect } from 'vitest'
import {
  getTabLabel,
  getTabOrder,
  isTabVariantEntry,
  getTabBasePath,
} from '../../src/utils/tabContent'

describe('getTabLabel', () => {
  describe('without frontmatter config', () => {
    it('should return default label for index', () => {
      expect(getTabLabel('index')).toBe('Overview')
    })

    it('should return default label for overview', () => {
      expect(getTabLabel('overview')).toBe('Overview')
    })

    it('should return default label for details', () => {
      expect(getTabLabel('details')).toBe('Details')
    })

    it('should return default label for examples', () => {
      expect(getTabLabel('examples')).toBe('Examples')
    })

    it('should return default label for changelog', () => {
      expect(getTabLabel('changelog')).toBe('Changelog')
    })

    it('should return default label for guide', () => {
      expect(getTabLabel('guide')).toBe('Guide')
    })

    it('should return default label for faq', () => {
      expect(getTabLabel('faq')).toBe('FAQ')
    })

    it('should capitalize unknown filenames', () => {
      expect(getTabLabel('custom-tab')).toBe('Custom Tab')
    })

    it('should handle single word filenames', () => {
      expect(getTabLabel('about')).toBe('About')
    })

    it('should strip file extensions', () => {
      expect(getTabLabel('index.md')).toBe('Overview')
      expect(getTabLabel('details.mdx')).toBe('Details')
    })

    it('should strip /index suffix', () => {
      expect(getTabLabel('chapter/index')).toBe('Overview')
    })
  })

  describe('with frontmatter config', () => {
    it('should use label from config', () => {
      expect(getTabLabel('index', { label: 'Custom Label' })).toBe('Custom Label')
    })

    it('should prefer config label over defaults', () => {
      expect(getTabLabel('overview', { label: 'Start Here' })).toBe('Start Here')
    })

    it('should fallback to default when config has no label', () => {
      expect(getTabLabel('overview', { order: 5 })).toBe('Overview')
    })
  })
})

describe('getTabOrder', () => {
  describe('without frontmatter config', () => {
    it('should return 0 for index', () => {
      expect(getTabOrder('index')).toBe(0)
    })

    it('should return 0 for overview', () => {
      expect(getTabOrder('overview')).toBe(0)
    })

    it('should return 10 for details', () => {
      expect(getTabOrder('details')).toBe(10)
    })

    it('should return 20 for examples', () => {
      expect(getTabOrder('examples')).toBe(20)
    })

    it('should return 30 for changelog', () => {
      expect(getTabOrder('changelog')).toBe(30)
    })

    it('should return high number for unknown files', () => {
      const order = getTabOrder('custom')
      expect(order).toBeGreaterThanOrEqual(100)
    })

    it('should strip file extensions', () => {
      expect(getTabOrder('index.md')).toBe(0)
      expect(getTabOrder('details.mdx')).toBe(10)
    })
  })

  describe('with frontmatter config', () => {
    it('should use order from config', () => {
      expect(getTabOrder('custom', { order: 5 })).toBe(5)
    })

    it('should prefer config order over defaults', () => {
      expect(getTabOrder('index', { order: 99 })).toBe(99)
    })

    it('should handle order of 0', () => {
      expect(getTabOrder('custom', { order: 0 })).toBe(0)
    })

    it('should fallback to default when config has no order', () => {
      expect(getTabOrder('details', { label: 'Custom' })).toBe(10)
    })
  })
})

describe('isTabVariantEntry', () => {
  it('should return false for index entries', () => {
    expect(isTabVariantEntry('docs/chapter/index')).toBe(false)
  })

  it('should return true for non-index entries', () => {
    expect(isTabVariantEntry('docs/chapter/details')).toBe(true)
  })

  it('should return false for empty filename', () => {
    expect(isTabVariantEntry('docs/chapter/')).toBe(false)
  })

  it('should handle single segment paths', () => {
    expect(isTabVariantEntry('overview')).toBe(true)
    expect(isTabVariantEntry('index')).toBe(false)
  })

  it('should handle deeply nested paths', () => {
    expect(isTabVariantEntry('a/b/c/d/details')).toBe(true)
    expect(isTabVariantEntry('a/b/c/d/index')).toBe(false)
  })
})

describe('getTabBasePath', () => {
  describe('single file ID with extension', () => {
    it('should strip .md extension', () => {
      expect(getTabBasePath('docs/automation.md')).toBe('docs/automation')
    })

    it('should strip .mdx extension', () => {
      expect(getTabBasePath('docs/automation.mdx')).toBe('docs/automation')
    })
  })

  describe('full path without extension', () => {
    it('should return parent directory for index', () => {
      expect(getTabBasePath('docs/api/index')).toBe('docs/api')
    })

    it('should return parent directory for details', () => {
      expect(getTabBasePath('docs/api/details')).toBe('docs/api')
    })

    it('should handle deeply nested paths', () => {
      expect(getTabBasePath('a/b/c/d/index')).toBe('a/b/c/d')
    })
  })

  describe('single segment paths', () => {
    it('should return the segment for single path', () => {
      expect(getTabBasePath('overview')).toBe('overview')
    })

    it('should handle extension in single segment', () => {
      expect(getTabBasePath('overview.md')).toBe('overview')
    })
  })
})

describe('tab utilities integration', () => {
  it('should correctly identify and process tab variants', () => {
    // Simulate a multi-tab page scenario
    const entries = [
      'resources/api/index',
      'resources/api/details',
      'resources/api/examples',
    ]

    const basePath = getTabBasePath(entries[0])
    expect(basePath).toBe('resources/api')

    // All should resolve to same base path
    entries.forEach((entry) => {
      const entryBase = getTabBasePath(entry)
      expect(entryBase).toBe('resources/api')
    })

    // Tab variants should be identified correctly
    expect(isTabVariantEntry(entries[0])).toBe(false) // index
    expect(isTabVariantEntry(entries[1])).toBe(true) // details
    expect(isTabVariantEntry(entries[2])).toBe(true) // examples

    // Labels should be generated correctly
    expect(getTabLabel('index')).toBe('Overview')
    expect(getTabLabel('details')).toBe('Details')
    expect(getTabLabel('examples')).toBe('Examples')

    // Orders should maintain correct sequence
    expect(getTabOrder('index')).toBeLessThan(getTabOrder('details'))
    expect(getTabOrder('details')).toBeLessThan(getTabOrder('examples'))
  })
})
