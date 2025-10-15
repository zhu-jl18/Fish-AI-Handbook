export type TocItem = {
  id: string
  text: string
  depth: number
  el: HTMLElement
}

function slugify(input: string): string {
  // 更稳健的 slug 生成：
  // - 保留中文、英文、数字与连字符
  // - 去除中英文标点、圆括号等
  // - 将空白压缩为单个连字符
  let s = input.trim().toLowerCase()
  // 去掉常见中英文标点
  s = s.replace(/[\(\)（）【】\[\]{}，。、“”‘’：:；;！!？?·。…,.]/g, ' ')
  // 压缩空白为连字符
  s = s.replace(/\s+/g, '-')
  // 仅保留：中文、英文、数字、连字符、下划线
  s = s.replace(/[^a-z0-9_\-\u4e00-\u9fa5]/g, '')
  // 规范化重复连字符
  s = s.replace(/-+/g, '-')
  return s || 'section'
}

function ensureUniqueId(base: string, exist: Set<string>): string {
  let id = base
  let n = 2
  while (exist.has(id)) {
    id = `${base}-${n++}`
  }
  exist.add(id)
  return id
}

export function collectHeadings(
  root: ParentNode,
  options?: { min?: number; max?: number },
): TocItem[] {
  const min = options?.min ?? 2
  const max = options?.max ?? 4
  const selectors = Array.from(
    { length: max - min + 1 },
    (_, i) => `h${i + min}`,
  )
  const nodes = Array.from(
    root.querySelectorAll<HTMLElement>(selectors.join(',')),
  )

  const used = new Set<string>()
  const items: TocItem[] = []
  for (const el of nodes) {
    const depth = Number(el.tagName.substring(1))
    const text = (el.textContent || '').trim()
    let id = el.id
    if (!id) {
      id = ensureUniqueId(slugify(text), used)
      el.id = id
    } else if (!used.has(id)) {
      used.add(id)
    } else {
      // 页面上已经存在同名 id，追加后缀保证唯一
      id = ensureUniqueId(id, used)
      el.id = id
    }
    items.push({ id, text, depth, el })
  }
  return items
}

export function mountToc(
  container: HTMLElement,
  items: TocItem[],
  options?: { onClick?: (id: string) => void },
) {
  container.innerHTML = ''
  for (const it of items) {
    const a = document.createElement('a')
    a.href = `#${encodeURIComponent(it.id)}`
    a.textContent = it.text || it.id
    a.className = `toc-link toc-${it.depth}`
    a.setAttribute('data-id', it.id)
    a.addEventListener('click', (e) => {
      e.preventDefault()
      const target = document.getElementById(it.id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        history.replaceState(null, '', `#${encodeURIComponent(it.id)}`)
        options?.onClick?.(it.id)
      }
    })
    container.appendChild(a)
  }
}

export function observeActive(
  items: TocItem[],
  onActive: (id: string) => void,
) {
  const observer = new IntersectionObserver(
    (entries) => {
      // 可见比例最大的标题作为当前激活项
      let best: IntersectionObserverEntry | null = null
      for (const en of entries) {
        if (!best || en.intersectionRatio > best.intersectionRatio) best = en
      }
      const id = best?.target && (best.target as HTMLElement).id
      if (id) onActive(id)
    },
    {
      // 提前激活，避免滚到顶才高亮
      rootMargin: '-40% 0px -55% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    },
  )
  items.forEach((i) => observer.observe(i.el))
  return () => observer.disconnect()
}

export function setupRightSidebar(
  rootSelector = '.content-inner',
  navSelector = '.toc-nav',
) {
  const root = document.querySelector(rootSelector)
  const nav = document.querySelector(navSelector) as HTMLElement | null
  if (!root || !nav) return () => {}
  const items = collectHeadings(root)

  let clickLockUntil = 0
  function setActive(id: string) {
    const links = nav.querySelectorAll<HTMLAnchorElement>('a.toc-link')
    links.forEach((a) => a.classList.toggle('active', a.dataset.id === id))
  }

  // 点击时先行设置高亮，并在短时间内忽略滚动观察的干扰
  mountToc(nav, items, {
    onClick: (id) => {
      setActive(id)
      clickLockUntil = Date.now() + 800 // 800ms 内不被滚动回调覆盖
    },
  })

  const stop = observeActive(items, (id) => {
    if (Date.now() < clickLockUntil) return
    setActive(id)
  })

  // 如果初始包含 hash，尝试高亮
  if (location.hash) {
    const id = decodeURIComponent(location.hash.slice(1))
    setActive(id)
  }
  return () => stop()
}
