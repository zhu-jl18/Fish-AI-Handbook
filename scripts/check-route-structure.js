#!/usr/bin/env node
/**
 * Check that route files mirror content structure (level-1/2/3)
 * Rules (must keep in sync with AGENTS.md & CONTRIBUTING.md):
 * - Level-1: content src/content/docs/<NN-alias>/index.md ↔ route src/pages/<alias>/index.astro
 *   • Forbid: flat root route src/pages/<alias>.astro
 * - Level-2: content <NN-alias>/<sub>/index.md ↔ route <alias>/<sub>/index.astro
 *   • Forbid: flat second-level route <alias>/<sub>.astro
 * - Level-3: content <NN-alias>/<sub>/<page>/index.md ↔ route <alias>/<sub>/<page>/index.astro
 *   • Forbid: legacy 3rd-level flat content <NN-alias>/<sub>/<page>.md
 *   • Forbid: legacy 3rd-level flat route <alias>/<sub>/<page>.astro
 * - Orphans: report any route without content, or content without route (for the above pairs)
 * - Multi-Tab Content: non-index .md files with `tab:` frontmatter are rendered via the same
 *   index.astro and do NOT require separate routes（适用于所有章节）.
 * Exits non-zero on any mismatch.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const DOCS_DIR = path.join(ROOT, 'src', 'content', 'docs')
const PAGES_DIR = path.join(ROOT, 'src', 'pages')

// Keep in sync with src/scripts/docsMap.ts
const DOCS_MAP = {
  concepts: '01-concepts',
  daily: '02-daily',
  prompts: '03-prompts',
  advanced: '04-advanced',
  fun: '05-fun',
  resources: '06-resources',
  theoretical: '07-theoretical',
  manual: '99-manual',
}

const rel = (p) => path.relative(ROOT, p)
const exists = (p) => {
  try {
    fs.accessSync(p)
    return true
  } catch {
    return false
  }
}
const isDir = (p) => {
  try {
    return fs.statSync(p).isDirectory()
  } catch {
    return false
  }
}
const listDirs = (p) => {
  try {
    return fs
      .readdirSync(p)
      .map((n) => path.join(p, n))
      .filter(isDir)
  } catch {
    return []
  }
}
const listFiles = (p) => {
  try {
    return fs
      .readdirSync(p)
      .map((n) => path.join(p, n))
      .filter((x) => !isDir(x))
  } catch {
    return []
  }
}

/**
 * Check if a markdown file is a multi-tab content file (has `tab:` in frontmatter).
 * These files are rendered via the parent index.astro and don't need separate routes.
 * Applies to all chapters (resources, daily, concepts, fun, manual, etc.).
 */
const isTabContentFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    // Check for tab: in frontmatter (between --- markers)
    // Handle both Unix (\n) and Windows (\r\n) line endings
    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1]
      // Look for tab: field (with or without nested properties)
      return /^tab:/m.test(frontmatter)
    }
    return false
  } catch {
    return false
  }
}

let errors = []

for (const [alias, numbered] of Object.entries(DOCS_MAP)) {
  const contentSection = path.join(DOCS_DIR, numbered)
  const pagesSection = path.join(PAGES_DIR, alias)
  if (!isDir(contentSection)) continue

  // Level-1 checks
  const contentL1 = path.join(contentSection, 'index.md')
  const routeL1 = path.join(pagesSection, 'index.astro')
  const flatL1 = path.join(PAGES_DIR, `${alias}.astro`)
  if (!exists(contentL1)) {
    errors.push(
      `Missing content: ${rel(contentL1)} (top-level index for ${numbered})`,
    )
  }
  if (!exists(routeL1)) {
    errors.push(`Missing route: ${rel(routeL1)} (top-level route for ${alias})`)
  }
  if (exists(flatL1)) {
    errors.push(
      `Forbidden flat root route exists: ${rel(flatL1)} (should be ${rel(routeL1)})`,
    )
  }

  // Level-2 directories under section
  const subDirs = listDirs(contentSection)
  for (const subPath of subDirs) {
    const sub = path.basename(subPath)
    const mdIndex = path.join(subPath, 'index.md')
    const routeL2 = path.join(pagesSection, sub, 'index.astro')
    const flatL2 = path.join(pagesSection, `${sub}.astro`)

    // If content L2 exists, require matching route; forbid flat L2
    if (exists(mdIndex)) {
      if (!exists(routeL2)) {
        errors.push(
          `Missing route: ${rel(routeL2)} (for content ${rel(mdIndex)})`,
        )
      }
      if (exists(flatL2)) {
        errors.push(
          `Forbidden flat route exists: ${rel(flatL2)} (should be ${rel(routeL2)})`,
        )
      }

      // Level-3 content under this section (NEW RULE: folder + index.md)

      // 3.1 legacy 3rd-level single-file content under subPath (should be migrated)
      const files = listFiles(subPath)
      for (const f of files) {
        if (!f.endsWith('.md')) continue
        const base = path.basename(f, '.md')
        if (base === 'index') continue

        // Skip multi-tab content files (they render via parent index.astro)
        if (isTabContentFile(f)) {
          continue
        }

        const expected = path.join(subPath, base, 'index.md')
        errors.push(
          `Forbidden legacy 3rd-level content file: ${rel(f)} (should be ${rel(
            expected,
          )})`,
        )
      }

      // 3.2 canonical 3rd-level folders: <NN>/<sub>/<page>/index.md
      for (const leafDir of listDirs(subPath)) {
        const leaf = path.basename(leafDir)
        const leafIndex = path.join(leafDir, 'index.md')
        if (!exists(leafIndex)) {
          errors.push(
            `Missing 3rd-level index.md: ${rel(leafIndex)} (directory exists without index.md)`,
          )
          continue
        }

        const routeL3 = path.join(pagesSection, sub, leaf, 'index.astro')
        if (!exists(routeL3)) {
          errors.push(
            `Missing route: ${rel(routeL3)} (for 3rd-level content ${rel(
              leafIndex,
            )})`,
          )
        }

        // Extra markdown files inside 3rd-level folder must either:
        // - be index.md, or
        // - be tab files with `tab:` frontmatter
        for (const lf of listFiles(leafDir)) {
          if (!lf.endsWith('.md')) continue
          const base = path.basename(lf, '.md')
          if (base === 'index') continue
          if (isTabContentFile(lf)) continue
          errors.push(
            `Forbidden non-tab content file under 3rd-level folder: ${rel(
              lf,
            )} (expected to be a tab.md with tab: frontmatter or moved to its own folder)`,
          )
        }
      }
    }

    // Orphan route at level-2
    if (exists(routeL2) && !exists(mdIndex)) {
      errors.push(
        `Orphan route (level-2): ${rel(routeL2)} has no matching content ${rel(
          mdIndex,
        )}`,
      )
    }

    // Routes-side checks at level-3
    const pagesSubDir = path.join(pagesSection, sub)
    if (isDir(pagesSubDir)) {
      // 3.3 forbid flat 3rd-level routes <alias>/<sub>/<page>.astro
      for (const file of listFiles(pagesSubDir)) {
        if (!file.endsWith('.astro')) continue
        const base = path.basename(file)
        if (base === 'index.astro') continue
        const leaf = base.replace(/\.astro$/, '')
        const expected = path.join(pagesSubDir, leaf, 'index.astro')
        errors.push(
          `Forbidden flat 3rd-level route: ${rel(file)} (should be ${rel(
            expected,
          )})`,
        )
      }

      // 3.4 ensure every 3rd-level folder route has matching content folder
      for (const d of listDirs(pagesSubDir)) {
        const idx = path.join(d, 'index.astro')
        if (!exists(idx)) continue
        const leaf = path.basename(d)
        const md = path.join(subPath, leaf, 'index.md')
        if (!exists(md)) {
          errors.push(
            `Orphan route (level-3): ${rel(idx)} has no matching content ${rel(
              md,
            )}`,
          )
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error('\n[check:routes] Found inconsistencies:')
  for (const e of errors) console.error(' - ' + e)
  process.exit(1)
} else {
  console.log(
    '[check:routes] OK: route files mirror content structure (level-1/2/3)',
  )
}
