import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

/**
 * Remark plugin to handle mark directives for colored text.
 * Converts :mark[text]{c=color} into HTML with color styling.
 *
 * Syntax:
 * - Inline: :mark[colored text]{c=red}
 * - Container: :::mark{c=blue}\nColored content\n:::
 * - Leaf: ::mark[single line]{c=green}
 *
 * Supported color parameter names: c, color
 * Color values: predefined names (red, blue, green, etc.) or CSS color values
 */
export default function remarkMarkDirective() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.name !== 'mark') return

      const attrs = node.attributes || {}
      const color = attrs.c || attrs.color || 'default'

      // Determine if color is a predefined name or custom CSS value
      const isCustomColor =
        color.startsWith('#') ||
        color.startsWith('rgb') ||
        color.startsWith('hsl')

      const props = {
        class: 'mark',
        'data-color': isCustomColor ? 'custom' : color,
      }

      // For custom colors, add inline style
      if (isCustomColor) {
        props.style = `--mark-color: ${color}`
      }

      // Handle text directives (inline): :mark[text]{c=color}
      if (node.type === 'textDirective') {
        node.data ??= {}
        const data = node.data
        const hast = h('span', props, node.children)
        data.hName = hast.tagName
        data.hProperties = hast.properties
      }

      // Handle container directives (block): :::mark{c=color}\n...\n:::
      if (node.type === 'containerDirective') {
        node.data ??= {}
        const data = node.data
        const hast = h(
          'div',
          { ...props, class: 'mark mark-block' },
          node.children,
        )
        data.hName = hast.tagName
        data.hProperties = hast.properties
      }

      // Handle leaf directives (block single line): ::mark[text]{c=color}
      if (node.type === 'leafDirective') {
        node.data ??= {}
        const data = node.data
        const hast = h(
          'div',
          { ...props, class: 'mark mark-leaf' },
          node.children,
        )
        data.hName = hast.tagName
        data.hProperties = hast.properties
      }
    })
  }
}
