import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const projectRoot = fileURLToPath(new URL('../../', import.meta.url))
const cache = new Map<string, string | undefined>()

function resolvePath(inputPath: string) {
  if (!inputPath) return undefined
  return path.isAbsolute(inputPath)
    ? inputPath
    : path.join(projectRoot, inputPath)
}

export function getGitLastModifiedIso(filePath?: string | null) {
  const resolved = filePath ? resolvePath(filePath) : undefined
  if (!resolved) return undefined
  if (cache.has(resolved)) return cache.get(resolved)
  try {
    const output = execSync(`git log -1 --pretty="format:%cI" "${resolved}"`, {
      encoding: 'utf-8',
    }).trim()
    const timestamp = output || undefined
    cache.set(resolved, timestamp)
    return timestamp
  } catch {
    cache.set(resolved, undefined)
    return undefined
  }
}
