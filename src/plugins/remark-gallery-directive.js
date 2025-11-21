import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

export default function remarkGalleryDirective() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective' || node.name !== 'gallery') return
      node.data ??= {}
      const data = node.data
      const attrs = node.attributes || {}
      const cols = Number(attrs.cols) || 2
      const gapRaw = attrs.gap
      let gap = gapRaw === undefined ? '12px' : String(gapRaw).trim()
      // 如果作者没写单位，强制补 px
      if (!/[a-z%]+$/i.test(gap)) {
        gap = `${gap}px`
      }
      const ratio = attrs.ratio
      const styleParts = [`--gallery-cols:${cols}`, `--gallery-gap:${gap}`]
      if (ratio) styleParts.push(`--gallery-ratio:${ratio}`)

      // 抽取所有图片节点，拆成一张图一个 item，避免多图被同一 <p> 包住只占一格
      const images = []
      for (const child of node.children || []) {
        if (child.type === 'image') {
          images.push(child)
          continue
        }
        if (child.type === 'paragraph') {
          for (const inner of child.children || []) {
            if (inner.type === 'image') {
              images.push(inner)
            }
          }
        }
      }
      let hastChildren = node.children
      if (images.length) {
        hastChildren = images.map((img) =>
          h(
            'figure',
            { class: 'image-gallery__item' },
            h('img', {
              src: img.url,
              alt: img.alt || '',
              title: img.title || undefined,
              loading: 'lazy',
            }),
          ),
        )
        // 防止 remark-rehype 再次包裹段落：直接把 HAST children 写回 node
        data.hChildren = hastChildren
        data.hName = 'div'
        data.hProperties = {
          class: 'image-gallery',
          style: styleParts.join('; '),
        }
        return
      }

      const hast = h('div', {
        class: 'image-gallery',
        style: styleParts.join('; '),
      })
      data.hName = hast.tagName
      data.hProperties = hast.properties
      data.hChildren = hastChildren
    })
  }
}
