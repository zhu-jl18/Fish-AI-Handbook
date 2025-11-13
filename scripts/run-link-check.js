#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { LinkChecker, LinkState } from 'linkinator'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const DIST_DIR = path.join(ROOT, 'dist')
const PAGES_DIR = path.join(ROOT, 'src', 'pages')
const CONFIG_PATH = path.join(ROOT, 'linkinator.config.json')

if (!fs.existsSync(DIST_DIR)) {
  console.error('Missing dist output. Run `npm run build` first.')
  process.exit(1)
}

const toPosix = (p) => p.split(path.sep).join('/')

const collectRoutes = () => {
  const routes = new Set()
  const stack = [PAGES_DIR]
  while (stack.length > 0) {
    const current = stack.pop()
    for (const dirent of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, dirent.name)
      if (dirent.isDirectory()) {
        stack.push(fullPath)
        continue
      }
      if (!dirent.isFile() || !dirent.name.endsWith('.astro')) continue
      const rel = toPosix(path.relative(PAGES_DIR, fullPath))
      let route
      if (rel === 'index.astro') {
        route = '/'
      } else if (rel.endsWith('/index.astro')) {
        route = '/' + rel.slice(0, -'/index.astro'.length)
      } else {
        route = '/' + rel.replace(/\.astro$/, '')
      }
      routes.add(route)
    }
  }
  return Array.from(routes).sort()
}

const routeToDistFile = (route) => {
  if (route === '/') return path.join(DIST_DIR, 'index.html')
  const parts = route.replace(/^\//, '').split('/')
  return path.join(DIST_DIR, ...parts, 'index.html')
}

const loadConfig = () => {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

const config = loadConfig()
const skipPatterns = Array.isArray(config.skip) ? config.skip : []
const wantsHttpSkip = skipPatterns.includes('^https?://')
const skipRegexes = skipPatterns
  .filter((pattern) => pattern !== '^https?://')
  .map((pattern) => new RegExp(pattern))

const shouldSkipLink = async (url) => {
  if (
    wantsHttpSkip &&
    (url.startsWith('http://') || url.startsWith('https://'))
  ) {
    try {
      const { hostname } = new URL(url)
      if (hostname !== 'localhost' && hostname !== '127.0.0.1') return true
    } catch {
      return false
    }
  }
  return skipRegexes.some((regex) => regex.test(url))
}

const routes = collectRoutes()
if (routes.length === 0) {
  console.error('No routes discovered under src/pages')
  process.exit(1)
}

const entryFiles = routes.map((route) => {
  const target = routeToDistFile(route)
  if (!fs.existsSync(target)) {
    console.error(`Missing built file for route ${route}: ${target}`)
    process.exit(1)
  }
  return target
})

const relativeEntries = entryFiles.map((file) => {
  const relative = path.relative(DIST_DIR, file)
  if (!relative || relative.startsWith('..')) {
    console.error(`Entry outside dist: ${file}`)
    process.exit(1)
  }
  return relative.split(path.sep).join('/')
})

const serverRoot = path.relative(ROOT, DIST_DIR) || '.'

console.log(
  `[link-check] Routes: ${routes.length}, entry files: ${entryFiles.length}, server root: ${serverRoot}`,
)

const checker = new LinkChecker()

const main = async () => {
  const result = await checker.check({
    path: relativeEntries,
    serverRoot,
    recurse: config.recurse ?? true,
    timeout: config.timeout ?? 20000,
    concurrency: config.concurrency ?? 20,
    directoryListing: config.directoryListing ?? false,
    linksToSkip: shouldSkipLink,
  })

  const scanned = result.links.filter(
    (link) => link.state !== LinkState.SKIPPED,
  )
  const broken = result.links.filter((link) => link.state === LinkState.BROKEN)

  if (broken.length > 0) {
    console.error(
      `[link-check] Broken links: ${broken.length}, scanned: ${scanned.length}, entries: ${relativeEntries.length}`,
    )
    for (const link of broken) {
      const parent = link.parent ? toPosix(link.parent) : '<no-parent>'
      console.error(` - [${link.status ?? 'ERR'}] ${link.url} <- ${parent}`)
    }
    process.exit(1)
  }

  console.log(
    `[link-check] OK: scanned ${scanned.length} links from ${relativeEntries.length} entry files`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
