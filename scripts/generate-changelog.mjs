#!/usr/bin/env node
/**
 * Generate a static changelog JSON for the homepage.
 * - Runs in CI on push to main.
 * - Reads recent git commits (requires full history).
 * - Produces 3-5 English highlights directly from commit subjects (no LLM).
 * - Writes output to src/data/changelog.json for Astro to import statically.
 */
import { execSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

const MAX_COMMITS = 10
const HIGHLIGHT_COUNT = 5
const OUTPUT_PATH = resolve(process.cwd(), 'src/data/changelog.json')

function run(cmd) {
  return execSync(cmd, { encoding: 'utf-8' }).trim()
}

function getHashes() {
  try {
    return run(`git rev-list --max-count=${MAX_COMMITS} HEAD`)
      .split('\n')
      .filter(Boolean)
  } catch (error) {
    console.error('Failed to read git history:', error)
    return []
  }
}

function getCommitInfo(hash) {
  const shortHash = hash.slice(0, 7)
  const date = run(`git show -s --date=short --format=%ad ${hash}`)
  const subject = run(`git show -s --format=%s ${hash}`)
  return {
    hash: shortHash,
    date,
    subject,
  }
}

async function main() {
  const hashes = getHashes()
  if (hashes.length === 0) {
    throw new Error('No git commits found. Ensure the workflow checks out with fetch-depth: 0.')
  }

  const commits = hashes.map(getCommitInfo)
  const highlights = commits
    .map((c) => c.subject || c.hash)
    .filter(Boolean)
    .slice(0, HIGHLIGHT_COUNT)

  const payload = {
    generatedAt: new Date().toISOString(),
    highlights,
    commits,
  }

  await mkdir(resolve(process.cwd(), 'src/data'), { recursive: true })
  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2))
  console.log(`Changelog written to ${OUTPUT_PATH}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
