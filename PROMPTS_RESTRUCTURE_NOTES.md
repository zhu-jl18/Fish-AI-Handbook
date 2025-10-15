# Prompts Section Restructure (2025-10)

This document records the structural changes applied to the Prompts chapter.

## Changes

- interaction-basics
  - definition.md + necessity.md → basics.md (merged)
  - good-vs-bad.md retained
- context-learning → context (title: 上下文)
- dialogue-levels
  - system-prompts.md, assistant-messages.md, user-prompts.md → merged into index.md
  - example.md retained
- practical-tips
  - Removed: priority.md, instruction-following.md, prompt-amplification.md, self-iteration.md
  - index.md retained as placeholder
- handy-examples → examples (title: Examples)
- Sidebar updated to reflect simplified structure
- Global link updates applied
- Astro redirects added in astro.config.mjs for backward compatibility

## New navigation (Prompts)

- /prompts/interaction-basics/basics
- /prompts/interaction-basics/good-vs-bad
- /prompts/context
- /prompts/dialogue-levels/ (with /example)
- /prompts/practical-tips
- /prompts/advanced-frameworks
- /prompts/examples
- /prompts/extended-reading

## Redirects

Old → New

- /prompts/interaction-basics/definition → /prompts/interaction-basics/basics
- /prompts/interaction-basics/necessity → /prompts/interaction-basics/basics
- /prompts/context-learning → /prompts/context
- /prompts/dialogue-levels/system-prompts → /prompts/dialogue-levels/
- /prompts/dialogue-levels/assistant-messages → /prompts/dialogue-levels/
- /prompts/dialogue-levels/user-prompts → /prompts/dialogue-levels/
- /prompts/practical-tips/priority → /prompts/practical-tips/
- /prompts/practical-tips/instruction-following → /prompts/practical-tips/
- /prompts/practical-tips/prompt-amplification → /prompts/practical-tips/
- /prompts/practical-tips/self-iteration → /prompts/practical-tips/
- /prompts/handy-examples → /prompts/examples

## Notes

- Only one H1 per page; merged sections are H2 and below.
- Frontmatter standardized to minimal fields (title, optional description).
- Please update future links to the new paths to avoid relying on redirects.
