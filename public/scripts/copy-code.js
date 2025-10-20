// Enhance code blocks: copy (selection-first) and long-code collapse
;(function () {
  // Read CSS duration token like "160ms" or "0.2s" and return milliseconds
  function readCssDurationVar(varName, fallbackMs = 2000) {
    try {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim()
      if (!raw) return fallbackMs
      const m = raw.match(/^([\d.]+)\s*(ms|s)$/i)
      if (!m) return fallbackMs
      const val = parseFloat(m[1])
      return m[2].toLowerCase() === 's' ? val * 1000 : val
    } catch (_) {
      return fallbackMs
    }
  }
  function withReducedMotion(ms) {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      return mq && mq.matches ? 1 : ms
    } catch (_) {
      return ms
    }
  }
  function feedbackDurationMs() {
    return withReducedMotion(
      readCssDurationVar('--motion-duration-feedback', 2000),
    )
  }

  function getSelectedTextWithin(element) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return ''
    const range = selection.getRangeAt(0)
    if (!element.contains(range.commonAncestorContainer)) return ''
    return selection.toString()
  }

  function createCopyButton(pre) {
    const btn = document.createElement('button')
    btn.className = 'code-copy-button'
    btn.textContent = 'Copy'
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')
      if (!code) return
      let text = getSelectedTextWithin(pre)
      if (!text) text = code.innerText
      try {
        await navigator.clipboard.writeText(text)
        btn.textContent = 'Copied!'
        btn.classList.add('copied')
        setTimeout(() => {
          btn.textContent = 'Copy'
          btn.classList.remove('copied')
        }, feedbackDurationMs())
      } catch (err) {
        console.error('Failed to copy code: ', err)
        btn.textContent = 'Error'
        setTimeout(() => (btn.textContent = 'Copy'), 2000)
      }
    })
    pre.appendChild(btn)
  }

  function collapseIfLong(pre) {
    const code = pre.querySelector('code')
    if (!code) return
    const declared = Number(pre.dataset.collapseLines || 24)
    let lines = 0
    const shikiLines = pre.querySelectorAll('.line')
    if (shikiLines && shikiLines.length) lines = shikiLines.length
    else lines = code.innerText.split('\n').length

    if (lines <= declared) return

    const wrapper = document.createElement('div')
    wrapper.style.position = 'relative'
    wrapper.style.maxHeight = '420px'
    wrapper.style.overflow = 'hidden'
    wrapper.className = 'code-collapsed-wrapper'

    const gradient = document.createElement('div')
    gradient.style.position = 'absolute'
    gradient.style.left = '0'
    gradient.style.right = '0'
    gradient.style.bottom = '0'
    gradient.style.height = '64px'
    gradient.style.background =
      'linear-gradient(180deg, rgba(0,0,0,0) 0%, var(--code-bg) 60%)'

    const btn = document.createElement('button')
    btn.textContent = '展开代码'
    btn.style.position = 'absolute'
    btn.style.bottom = '12px'
    btn.style.right = '12px'
    btn.style.background = '#2a2a2a'
    btn.style.color = '#fff'
    btn.style.border = '1px solid #444'
    btn.style.padding = '6px 10px'
    btn.style.borderRadius = '4px'
    btn.style.cursor = 'pointer'

    const content = pre.cloneNode(true)
    // remove existing copy button duplicates
    const existingBtn = content.querySelector('.code-copy-button')
    if (existingBtn) existingBtn.remove()

    pre.replaceWith(wrapper)
    wrapper.appendChild(content)
    // re-attach copy button to the cloned pre node
    createCopyButton(content)
    wrapper.appendChild(gradient)
    wrapper.appendChild(btn)

    let expanded = false
    btn.addEventListener('click', () => {
      expanded = !expanded
      if (expanded) {
        wrapper.style.maxHeight = 'none'
        gradient.style.display = 'none'
        btn.textContent = '收起代码'
      } else {
        wrapper.style.maxHeight = '420px'
        gradient.style.display = ''
        btn.textContent = '展开代码'
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }

  function init() {
    const blocks = document.querySelectorAll('pre')
    blocks.forEach((pre) => {
      if (!pre.querySelector('code')) return
      createCopyButton(pre)
      collapseIfLong(pre)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
