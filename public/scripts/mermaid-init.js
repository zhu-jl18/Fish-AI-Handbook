// Client-side Mermaid renderer for Shiki-emitted code blocks
// - Finds pre[data-language="mermaid"] code blocks (Astro Shiki output)
// - Replaces them with .mermaid containers
// - Dynamically imports Mermaid ESM from CDN and renders

async function initializeMermaidDiagrams() {
  try {
    const codeBlocks = Array.from(
      document.querySelectorAll("pre[data-language='mermaid'] code"),
    )
    if (!codeBlocks.length) return

    // Replace code blocks with .mermaid containers preserving text content
    for (const code of codeBlocks) {
      const pre = code.closest('pre')
      if (!pre) continue
      const text = code.textContent || ''

      const container = document.createElement('div')
      container.className = 'mermaid-container'
      const el = document.createElement('div')
      el.className = 'mermaid'
      el.textContent = text
      container.appendChild(el)

      pre.replaceWith(container)
    }

    const { default: mermaid } = await import(
      'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs'
    )

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose', // allow links etc. consistent with docs
      theme: 'dark',
    })

    await mermaid.run({ querySelector: '.mermaid' })
  } catch (err) {
    console.warn('[mermaid] initialization failed; leaving code blocks as-is:', err)
  }
}

;(async () => {
  if (document.readyState === 'loading') {
    await new Promise((r) => document.addEventListener('DOMContentLoaded', r, { once: true }))
  }
  await initializeMermaidDiagrams()
})()

// Expose a manual re-init hook for dynamic content cases
// (not required for static site, but harmless)
window.reinitializeMermaid = initializeMermaidDiagrams
