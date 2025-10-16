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
        options && options.onClick && options.onClick(it.id)
      }
    })
    container.appendChild(a)
  }
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

  let clickLockUntil = 0
  function setActive(id) {
    const links = nav.querySelectorAll('a.toc-link')
    links.forEach((a) => a.classList.toggle('active', a.dataset.id === id))
  }

  const stop = observeActive(items, (id) => {
    if (Date.now() < clickLockUntil) return
    setActive(id)
  })

  mountToc(nav, items, {
    onClick: (id) => {
      setActive(id)
      clickLockUntil = Date.now() + 800
    },
  })

  if (location.hash) {
    const id = decodeURIComponent(location.hash.slice(1))
    setActive(id)
  }

  return () => stop()
}
