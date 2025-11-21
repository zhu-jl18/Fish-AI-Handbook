import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

/**
 * Remark plugin to handle spoiler directives.
 * Converts :spoiler[text] and :::spoiler blocks into HTML with spoiler styling.
 *
 * Syntax:
 * - Inline: :spoiler[hidden text]
 * - Container: :::spoiler\nHidden content\n:::
 */
export default function remarkSpoilerDirective() {
  return (tree) => {
    visit(tree, (node) => {
      // Handle text directives (inline): :spoiler[text]
      if (node.type === 'textDirective' && node.name === 'spoiler') {
        node.data ??= {}
        const data = node.data
        const hast = h('span.spoiler.spoiler-inline', node.children)
        data.hName = hast.tagName
        data.hProperties = hast.properties
      }

      // Handle container directives (block): :::spoiler\n...\n:::
      if (node.type === 'containerDirective' && node.name === 'spoiler') {
        node.data ??= {}
        const data = node.data
        const hast = h('div.spoiler.spoiler-block', node.children)
        data.hName = hast.tagName
        data.hProperties = hast.properties
      }

      // Handle leaf directives (block without content): ::spoiler[text]
      if (node.type === 'leafDirective' && node.name === 'spoiler') {
        node.data ??= {}
        const data = node.data
        const hast = h('div.spoiler.spoiler-leaf', node.children)
        data.hName = hast.tagName
        data.hProperties = hast.properties
      }
    })
  }
}
