// Remark plugin to differentiate paragraph→list spacing based on whether
// there is a blank line between them in the source markdown.
//
// - Adds class "md-list--tight" to a list that immediately follows a paragraph (no blank line)
// - Adds class "md-list--spaced" to a list that follows after at least one blank line
//
// Notes:
// - We skip inside listItem to avoid interfering with nested list spacing rules.
// - Relies on node.position.{start,end}.line which remark provides by default.
export default function remarkListSpacing() {
  function addClassToList(listNode, cls) {
    if (!listNode) return;
    listNode.data = listNode.data || {};
    listNode.data.hProperties = listNode.data.hProperties || {};
    const hp = listNode.data.hProperties;
    let classList = hp.className || hp.class || [];
    if (typeof classList === 'string') classList = classList.split(/\s+/).filter(Boolean);
    if (!Array.isArray(classList)) classList = [];
    if (!classList.includes(cls)) classList.push(cls);
    hp.className = classList;
  }

  function process(node) {
    if (!node || node.type === 'listItem' || !Array.isArray(node.children)) return;
    const ch = node.children;
    for (let i = 0; i < ch.length - 1; i++) {
      const a = ch[i];
      const b = ch[i + 1];
      if (a && b && a.type === 'paragraph' && b.type === 'list') {
        const endL = a.position && a.position.end && a.position.end.line;
        const startL = b.position && b.position.start && b.position.start.line;
        if (Number.isInteger(endL) && Number.isInteger(startL)) {
          const spaced = startL >= endL + 2; // at least one blank line between
          addClassToList(b, spaced ? 'md-list--spaced' : 'md-list--tight');
        } else {
          // Fallback: treat as tight when positions are missing
          addClassToList(b, 'md-list--tight');
        }
      }
    }
    for (const c of ch) process(c);
  }

  return (tree) => process(tree);
}
