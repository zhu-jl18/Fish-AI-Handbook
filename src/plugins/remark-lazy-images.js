import { visit } from 'unist-util-visit'

/**
 * Remark plugin to add lazy loading attributes to images.
 * Automatically adds loading="lazy" and decoding="async" to all images.
 */
export default function remarkLazyImages() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      const data = node.data || (node.data = {})
      const props = data.hProperties || (data.hProperties = {})
      // Only set if not already defined
      props.loading = props.loading || 'lazy'
      props.decoding = props.decoding || 'async'
    })
  }
}
