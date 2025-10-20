// Public TOC utilities for production (no build step required)

function slugify(input) {
  let s = (input || '').trim().toLowerCase()
  s = s.replace(/[()（）【】\[\]{}，。、“”‘’：:；;！!？?·。…,.]/g, ' ')
  s = s.replace(/\s+/g, '-')
  s = s.replace(/[^a-z0-9_\-\u4e00-\u9fa5]/g, '')
  s = s.replace(/-+/g, '-')
  return s || 'section'
}

function ensureUniqueId(base, used) {
  let id = base
  let n = 2
  while (used.has(id)) {
    id = `${base}-${n++}`
  }
  used.add(id)
  return id
}

export function collectHeadings(root, options) {
  const min = (options && options.min) || 2
  const max = (options && options.max) || 4
  const selectors = Array.from(
    { length: max - min + 1 },
    (_, i) => `h${i + min}`,
  )
  const nodes = Array.from(root.querySelectorAll(selectors.join(',')))

  const used = new Set()
  const items = []
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
      id = ensureUniqueId(id, used)
      el.id = id
    }
    items.push({ id, text, depth, el })
  }
  return items
}

export function mountToc(container, items, options) {
  container.innerHTML = ''

  // 按最近的 h2 进行分组
  const groups = []
  let current = null
  for (const it of items) {
    if (it.depth === 2) {
      current = { h2: it, children: [] }
      groups.push(current)
    } else if (current) {
      current.children.push(it)
    }
  }

  const idToLink = new Map()
  const idToGroup = new Map()
  const groupEls = []

  for (const g of groups) {
    const groupEl = document.createElement('div')
    groupEl.className = 'toc-group'
    groupEl.setAttribute('data-id', g.h2.id)

    const a2 = document.createElement('a')
    a2.href = `#${encodeURIComponent(g.h2.id)}`
    a2.textContent = g.h2.text || g.h2.id
    a2.title = g.h2.text || g.h2.id
    a2.className = 'toc-link toc-2'
    a2.setAttribute('data-id', g.h2.id)
    idToLink.set(g.h2.id, a2)
    idToGroup.set(g.h2.id, groupEl)

    a2.addEventListener('click', (e) => {
      e.preventDefault()
      const target = document.getElementById(g.h2.id)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        history.replaceState(null, '', `#${encodeURIComponent(g.h2.id)}`)
        options && options.onClick && options.onClick(g.h2.id)
      }
    })

    groupEl.appendChild(a2)

    if (g.children.length) {
      const sub = document.createElement('div')
      sub.className = 'toc-sub'
      for (const it of g.children) {
        const a = document.createElement('a')
        a.href = `#${encodeURIComponent(it.id)}`
        a.textContent = it.text || it.id
        a.title = it.text || it.id
        a.className = `toc-link toc-${it.depth}`
        a.setAttribute('data-id', it.id)
        idToLink.set(it.id, a)
        idToGroup.set(it.id, groupEl)
        a.addEventListener('click', (e) => {
          e.preventDefault()
          const target = document.getElementById(it.id)
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            history.replaceState(null, '', `#${encodeURIComponent(it.id)}`)
            options && options.onClick && options.onClick(it.id)
          }
        })
        sub.appendChild(a)
      }
      groupEl.appendChild(sub)
    }

    container.appendChild(groupEl)
    groupEls.push(groupEl)
  }

  return { idToLink, idToGroup, groupEls }
}

export function observeActive(items, onActive) {
  const observer = new IntersectionObserver(
    (entries) => {
      let best = null
      for (const en of entries) {
        if (!best || en.intersectionRatio > best.intersectionRatio) best = en
      }
      const id = best && best.target && best.target.id
      if (id) onActive(id)
    },
    {
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
  const nav = document.querySelector(navSelector)
  if (!root || !nav) return () => {}
  const items = collectHeadings(root)

  const mounted = mountToc(nav, items, {})

  let clickLockUntil = 0
  function setActive(id) {
    // 激活链接
    mounted.idToLink.forEach((el, key) => {
      el.classList.toggle('active', key === id)
    })
    // 展开所属分组（默认仅显示 h2）
    const activeGroup = mounted.idToGroup.get(id) || null
    mounted.groupEls.forEach((g) => {
      g.classList.toggle('expanded', g === activeGroup)
    })
  }

  // 滚动观察：激活并展开对应分组
  const stop = observeActive(items, (id) => {
    if (Date.now() < clickLockUntil) return
    setActive(id)
  })

  // 点击时先行设置高亮，并在短时间内忽略滚动观察的干扰
  mounted.idToLink.forEach((a, id) => {
    a.addEventListener('click', () => {
      setActive(id)
      clickLockUntil = Date.now() + 800
    })
  })

  // 如果初始包含 hash，尝试高亮并展开对应分组
  if (location.hash) {
    const id = decodeURIComponent(location.hash.slice(1))
    setActive(id)
  }

  return () => stop()
}
