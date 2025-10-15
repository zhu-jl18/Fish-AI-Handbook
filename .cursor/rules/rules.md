# Cursor Rules

These rules guide Cursor (and similar editor AIs) when editing this repository.

## Project structure and numbering

- Top-level sections are strictly ordered: 01-fish-talks, 02-basic-usage, 03-prompts, 04-advanced-techniques, 05-fun, 06-resources, 99-setup
- No new top-level `tech`/`demo` sections. Technical content lives under Resources (2API, 云平台)
- Setup always remains 99-setup; split prerequisites into direct second-level pages (Terminal, VS Code, Node.js, GitHub, VPN)

## Content and routes

- Content: `src/content/docs/<NN-alias>/...`
- Routes: `src/pages/<route>/...`
- Load content via: `getEntry('docs', '<NN-alias/subpath>')`
- Sidebars: `src/scripts/sidebars.ts` – keep sidebar entries in sync with routes
- Frontmatter required:

```yaml
---
title: Title
description: Short description (required)
---
```

## Editing guidance

- Prefer targeted edits; avoid sweeping refactors without approval
- When renaming/moving sections, update all `getEntry` paths and sidebars, then run `npm run build`
- Validate there are no dead links (404) or missing entries after changes

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run format
```

## Commit hygiene

- Use small, focused commits with prefixes: content:/nav:/layout:/fix:/build:/docs:/refactor:
- Ensure local build passes before committing
