import { readdirSync, readFileSync } from 'node:fs'
import { join, extname } from 'node:path'

const ROOT = 'src/content'
const VALID_EXTS = new Set(['.md', '.mdx'])
const errors = []

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath)
    } else if (VALID_EXTS.has(extname(entry.name))) {
      inspectFile(fullPath)
    }
  }
}

function inspectFile(file) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  const stack = []

  lines.forEach((line, index) => {
    const match = line.match(/^(\s*)(`{3,})(\S*)\s*$/)
    if (!match) return

    const [, indent, fence, langRaw] = match
    const lang = langRaw ?? ''
    const top = stack[stack.length - 1]

    if (top && top.indent === indent && top.fence === fence) {
      if (lang.length > 0) {
        errors.push(
          `${file}:${index + 1} 代码块结束行不应包含语言标识（检测到 \`${lang}\`）`,
        )
      } else {
        stack.pop()
      }
    } else {
      stack.push({ indent, fence, line: index + 1 })
    }
  })

  if (stack.length > 0) {
    for (const unclosed of stack) {
      errors.push(
        `${file}:${unclosed.line} 代码块未正确闭合，请补充对应的结尾 \`${unclosed.fence}\``,
      )
    }
  }
}

walk(ROOT)

if (errors.length > 0) {
  console.error('Markdown 代码块检查失败：')
  for (const msg of errors) {
    console.error(` - ${msg}`)
  }
  process.exit(1)
}

console.log('Markdown 代码块检查通过')
