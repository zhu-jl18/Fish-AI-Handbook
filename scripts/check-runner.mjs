#!/usr/bin/env node
/**
 * 检查命令封装器 - 简化 AI 上下文输出
 * 成功时只显示简洁信息，失败时只显示错误相关内容
 */
import { spawn } from 'child_process'

const GROUPS = {
  'page-structure': [
    { name: 'build', cmd: 'npm', args: ['run', 'build'] },
    { name: 'check:routes', cmd: 'npm', args: ['run', 'check:routes'] },
    { name: 'test:links', cmd: 'node', args: ['scripts/run-link-check.js'] },
  ],
  all: [
    { name: 'format', cmd: 'npx', args: ['prettier', '--check', '.'] },
    { name: 'build', cmd: 'npm', args: ['run', 'build'] },
    { name: 'type-check', cmd: 'npm', args: ['run', 'type-check'] },
    { name: 'check:routes', cmd: 'npm', args: ['run', 'check:routes'] },
    { name: 'test:links', cmd: 'node', args: ['scripts/run-link-check.js'] },
  ],
}

function run(cmd, args) {
  return new Promise((resolve) => {
    const proc = spawn(cmd, args, { shell: true, stdio: 'pipe' })
    let out = ''
    proc.stdout.on('data', (d) => (out += d))
    proc.stderr.on('data', (d) => (out += d))
    proc.on('error', (err) => {
      out += String(err) + '\n'
      resolve({ code: 1, out })
    })
    proc.on('close', (code) => resolve({ code, out }))
  })
}

async function main() {
  const group = process.argv[2]
  if (!GROUPS[group]) {
    console.log(
      `Usage: node scripts/check-runner.mjs <${Object.keys(GROUPS).join('|')}>`,
    )
    process.exit(1)
  }

  const tasks = GROUPS[group]
  for (const task of tasks) {
    const { code, out } = await run(task.cmd, task.args)
    if (code !== 0) {
      console.log(`✗ ${task.name}`)
      console.log(out)
      process.exit(1)
    }
    console.log(`✓ ${task.name}`)
  }
  console.log('\nAll passed ✓')
}

main()
