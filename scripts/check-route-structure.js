#!/usr/bin/env node
/**
 * Check that route files mirror content structure (level-2 directories)
 * - For each src/content/docs/<NN-alias>/<sub>/index.md
 *   expect: src/pages/<alias>/<sub>/index.astro exists
 * - Forbid: flat second-level route src/pages/<alias>/<sub>.astro
 * Exit non-zero on any mismatch.
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
  'fish-talks': '01-fish-talks',
  'basic-usage': '02-basic-usage',
  prompts: '03-prompts',
  advanced: '04-advanced-techniques',
  fun: '05-fun',
  resources: '06-resources',
  theoretical: '07-theoretical',
  setup: '99-setup',
}

function exists(p) {
  try {
    fs.accessSync(p)
    return true
  } catch {
    return false
  }
}

function isDir(p) {
  try {
    return fs.statSync(p).isDirectory()
  } catch {
    return false
  }
}

let errors = []

for (const [alias, numbered] of Object.entries(DOCS_MAP)) {
  const contentSection = path.join(DOCS_DIR, numbered)
  if (!isDir(contentSection)) continue

  const subs = fs.readdirSync(contentSection)
    .map((name) => path.join(contentSection, name))
    .filter((p) => isDir(p))

  for (const subPath of subs) {
    const subName = path.basename(subPath)
    const mdIndex = path.join(subPath, 'index.md')
    if (!exists(mdIndex)) {
      // Not a level-2 folder with index.md; skip
      continue
    }

    const expectedRoute = path.join(PAGES_DIR, alias, subName, 'index.astro')
    const flatRoute = path.join(PAGES_DIR, alias, `${subName}.astro`)

    if (!exists(expectedRoute)) {
      errors.push(
        `Missing route: ${path.relative(ROOT, expectedRoute)} (for content ${path.relative(
          ROOT,
          mdIndex
        )})`
      )
    }

    if (exists(flatRoute)) {
      errors.push(
        `Forbidden flat route exists: ${path.relative(
          ROOT,
          flatRoute
        )} (should be ${path.relative(ROOT, expectedRoute)})`
      )
    }
  }
}

if (errors.length > 0) {
  console.error('\n[check:routes] Found inconsistencies:')
  for (const e of errors) console.error(' - ' + e)
  process.exit(1)
} else {
  console.log('[check:routes] OK: route files mirror content structure (level-2)')
}

