/**
 * Changelog 工具函数
 * 从 Git 历史获取最近提交，并使用 LLM 生成中文摘要
 */
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

// ============ Types ============

export interface CommitInfo {
  hash: string
  date: string
  message: string
  summary?: string // LLM 生成的摘要
}

interface CacheData {
  [hash: string]: string // hash -> summary
}

// ============ Config ============

const CACHE_FILE = '.changelog-cache.json'
const MAX_COMMITS = 8

// ============ Git Functions ============

/**
 * 获取最近 N 条 Git 提交
 */
export function getRecentCommits(count: number = MAX_COMMITS): CommitInfo[] {
  try {
    // 格式: hash|date|message
    const output = execSync(
      `git log -${count} --pretty=format:"%H|%ad|%s" --date=short`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] },
    )

    return output
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [hash, date, ...messageParts] = line.split('|')
        return {
          hash: hash.substring(0, 7), // 短 hash
          date,
          message: messageParts.join('|'), // 处理 message 中可能包含 | 的情况
        }
      })
  } catch (error) {
    console.error('Failed to get git commits:', error)
    return []
  }
}

// ============ Cache Functions ============

function loadCache(): CacheData {
  try {
    if (existsSync(CACHE_FILE)) {
      return JSON.parse(readFileSync(CACHE_FILE, 'utf-8'))
    }
  } catch {
    // ignore
  }
  return {}
}

function saveCache(cache: CacheData): void {
  try {
    writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
  } catch {
    // ignore
  }
}

// ============ LLM Functions ============

/**
 * 调用 LLM API 生成提交摘要
 */
async function callLLM(messages: string[]): Promise<string[]> {
  const apiUrl = import.meta.env.LLM_API_URL || process.env.LLM_API_URL
  const apiKey = import.meta.env.LLM_API_KEY || process.env.LLM_API_KEY
  const model =
    import.meta.env.LLM_MODEL || process.env.LLM_MODEL || 'gpt-3.5-turbo'

  if (!apiUrl || !apiKey) {
    console.log('LLM API not configured, using original messages')
    return messages
  }

  const prompt = `你是一个 Git 提交信息翻译专家。请将以下 Git 提交信息翻译成简洁的中文摘要。
要求：
1. 每条摘要不超过 30 个字
2. 使用合适的 emoji 开头（如 ✨新功能、🐛修复、📝文档、🎨样式、⚡性能、🔧配置）
3. 保持技术准确性
4. 每行一条，按顺序输出

提交信息：
${messages.map((m, i) => `${i + 1}. ${m}`).join('\n')}

请直接输出翻译结果，每行一条：`

  try {
    // 确保 URL 格式正确
    const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl
    const endpoint = baseUrl.includes('/v1')
      ? `${baseUrl}/chat/completions`
      : `${baseUrl}/v1/chat/completions`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ''

    // 解析返回的摘要
    const summaries = content
      .trim()
      .split('\n')
      .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean)

    // 确保返回数量匹配
    return messages.map((_, i) => summaries[i] || messages[i])
  } catch (error) {
    console.error('LLM API call failed:', error)
    return messages
  }
}

// ============ Main Export ============

/**
 * 获取带有 LLM 摘要的 changelog
 */
export async function getChangelog(): Promise<CommitInfo[]> {
  const commits = getRecentCommits()
  if (commits.length === 0) return []

  const cache = loadCache()

  // 找出需要生成摘要的提交
  const uncachedCommits = commits.filter((c) => !cache[c.hash])

  if (uncachedCommits.length > 0) {
    const messages = uncachedCommits.map((c) => c.message)
    const summaries = await callLLM(messages)

    // 更新缓存
    uncachedCommits.forEach((commit, i) => {
      cache[commit.hash] = summaries[i]
    })
    saveCache(cache)
  }

  // 返回带摘要的提交列表
  return commits.map((commit) => ({
    ...commit,
    summary: cache[commit.hash] || commit.message,
  }))
}
