import { normalizeEntryId, buildDocCandidates } from '../utils/docsPath'

type ToastType = 'success' | 'error'

export function showToast(message: string, type: ToastType = 'success') {
  const container = document.getElementById('toast-container')
  if (!container) {
    alert(message)
    return
  }

  const toast = document.createElement('div')
  toast.className = 'toast'
  const svgIcon =
    type === 'success'
      ? '<polyline points="20 6 9 17 4 12"></polyline>'
      : '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>'
  toast.innerHTML = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgIcon}</svg>`
  const span = document.createElement('span')
  span.textContent = message
  toast.appendChild(span)

  container.appendChild(toast)

  setTimeout(() => {
    toast.classList.add('toast-hide')
    setTimeout(() => {
      toast.remove()
    }, 200)
  }, 2000)
}

const RAW_MODULES = import.meta.glob('/src/content/docs/**/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
})

async function loadMarkdown(entryId: string): Promise<string | null> {
  const cleanId = normalizeEntryId(entryId)
  const candidates = buildDocCandidates(cleanId)

  for (const p of candidates) {
    const loader = RAW_MODULES[p]
    if (loader) {
      return (await loader()) as string
    }
  }

  for (const p of candidates) {
    try {
      const response = await fetch(p)
      if (response.ok) {
        return await response.text()
      }
    } catch {}
  }

  return null
}

export async function copyMarkdownSource(
  entryId: string | null | undefined,
  label?: string,
) {
  if (!entryId) {
    showToast('未找到文档标识', 'error')
    return
  }

  try {
    const content = await loadMarkdown(entryId)
    if (content == null) {
      throw new Error('文件不存在或无法访问')
    }
    await navigator.clipboard.writeText(content)
    showToast(label ? `已复制Markdown源码（${label}）` : '已复制Markdown源码')
  } catch (error) {
    console.error('复制失败:', error)
    showToast('复制失败或源文件不存在', 'error')
  }
}

export async function copyAllTabsMarkdown(
  entryIds: string[],
  labels?: string[],
) {
  if (!entryIds || entryIds.length === 0) {
    showToast('未找到标签页内容', 'error')
    return
  }

  const parts: string[] = []
  for (let i = 0; i < entryIds.length; i++) {
    const id = entryIds[i]
    const label = labels?.[i] || id.split('/').pop() || `tab-${i + 1}`
    const content = await loadMarkdown(id)
    if (content == null) {
      continue
    }
    parts.push(
      `<!-- ---------------- tab: ${label} ---------------- -->\n${content.trimEnd()}`,
    )
  }

  if (parts.length === 0) {
    showToast('复制失败或源文件不存在', 'error')
    return
  }

  try {
    await navigator.clipboard.writeText(parts.join('\n\n'))
    showToast('已复制全部标签页Markdown源码')
  } catch (error) {
    console.error('复制失败:', error)
    showToast('复制失败或源文件不存在', 'error')
  }
}
