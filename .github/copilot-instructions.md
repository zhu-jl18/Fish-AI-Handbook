# GitHub Copilot Instructions

These instructions tailor Copilot’s suggestions to this repository’s conventions.

## Must follow
- Respect top-level numbering: 01..06, with 99-setup at the end; do not invent `tech`/`demo` top sections
- For content, always include required frontmatter:
```yaml
---
title: Title
description: Short description (required)
---
```
- Keep content, route, and sidebar synchronized:
  - Content path: `src/content/docs/<NN-alias>/...`
  - Route loads: `getEntry('docs', '<NN-alias/subpath>')`
  - Sidebar entries in `src/scripts/sidebars.ts`
- Use kebab-case for file/route names; do not change existing casing unless part of a planned rename

## Prefer
- Small, explicit edits that preserve existing patterns
- Updating all impacted references (imports, getEntry paths, sidebars) in the same change
- Running local build after changes (`npm run build`) and addressing missing entries/404s

## Avoid
- Adding non-existent sections or reverting numbering policy
- Creating pages under removed top-level sections (tech/demo)
- Proposing large refactors without clear justification and migration steps
