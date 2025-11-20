import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

export default function remarkGalleryDirective() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective' || node.name !== 'gallery') return
      const data = node.data || (node.data = {})
      const attrs = node.attributes || {}
      const cols = Number(attrs.cols) || 2
      let gap = attrs.gap || '12px'
      // If gap is a number (or string number) without unit, add px
      if (!isNaN(Number(gap))) {
        gap = `${gap}px`
      }
      const ratio = attrs.ratio
      const styleParts = [`--gallery-cols:${cols}`, `--gallery-gap:${gap}`]
      if (ratio) styleParts.push(`--gallery-ratio:${ratio}`)
      const hast = h(
        'div',
        {
          class: 'image-gallery',
          style: styleParts.join('; '),
        },
        node.children,
      )
      data.hName = hast.tagName
      data.hProperties = hast.properties
    })
  }
}
