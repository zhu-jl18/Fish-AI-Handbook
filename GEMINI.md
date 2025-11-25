# Fish AI Handbook - Gemini Context

This `GEMINI.md` provides essential context and instructions for AI agents working on the **Fish AI Handbook** project.

## Project Overview

**Fish AI Handbook** is a comprehensive documentation site built with **Astro**. It aims to be a quick-reference guide for AI concepts, prompts, and tools. The project emphasizes strict structural conventions to maintain maintainability across a large content base.

### Key Technologies
- **Framework:** [Astro](https://astro.build/) (Static Site Generation)
- **Content:** MDX (`.mdx`) and Markdown (`.md`)
- **Styling:** CSS (Global styles in `src/styles`)
- **Search:** [Pagefind](https://pagefind.app/)
- **Testing:** Playwright (E2E), Linkinator (Link checking)
- **Language:** TypeScript

## Architecture & Structure

The project follows a strict mirroring strategy between content and routes.

```
src/
├── content/docs/        # Source of truth for content
│   ├── 01-concepts/     # Level 1 Directory (Order-Alias)
│   │   ├── index.md     # Level 1 Index
│   │   └── topic/       # Level 2 Directory
│   │       ├── index.md # Level 2 Index
│   │       └── page.md  # Level 3 Single File (Leaf)
├── pages/               # Astro Routes (MUST mirror content/docs structure)
│   ├── index.astro
│   └── concepts/        # Matches alias 'concepts' from '01-concepts'
│       ├── index.astro
│       └── topic/
│           ├── index.astro
│           └── page.astro
├── components/          # Reusable UI components
├── layouts/             # Page layouts (BaseLayout, ContentLayout)
├── config/              # Configuration (Nav, Site metadata)
└── scripts/             # Build and Client scripts (sidebars.ts, docsMap.ts)
```

### Critical Structural Rules

1.  **Route Mirroring:**
    - Every content file in `src/content/docs` MUST have a corresponding `.astro` file in `src/pages`.
    - **Level 1 & 2:** MUST use `folder/index.md` (content) and `folder/index.astro` (route).
    - **Level 3:** MUST use `filename.md` (content) and `filename.astro` (route).
    - **Prohibited:** Level 2 single files, Level 3 folders. Max depth is 3.

2.  **Frontmatter:**
    - All content files must include:
      ```yaml
      ---
      title: "Title Here"
      description: "Short description (Required for build)"
      ---
      ```

3.  **Directory Naming:**
    - Top-level content directories use `NN-alias` format (e.g., `01-concepts`).
    - Route directories use only the `alias` (e.g., `concepts`).
    - Mappings are maintained in `src/scripts/docsMap.ts`.

## Key Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start local development server (default port 4321). |
| `npm run build` | Build for production (`dist/`) and generate search index. |
| `npm run preview` | Preview the built site (`dist/`). |
| `npm run check:routes` | **Mandatory.** Validates structure consistency between content and routes. |
| `npm run type-check` | Runs `astro check` for TypeScript and Astro component types. |
| `npm run test:links` | Checks for broken internal links (requires `npm run build` first). |
| `npm run test:e2e` | Runs Playwright end-to-end tests. |
| `npm run lint:markdown`| Lints Markdown code blocks. |

## Workflow for Adding Content

To add a new page or section, you must update multiple files to ensure consistency:

1.  **Content:** Create the `.md` file in `src/content/docs/NN-alias/...`.
2.  **Route:** Create the `.astro` file in `src/pages/alias/...` using `getEntry`.
3.  **Sidebar:** Update `src/scripts/sidebars.ts` to include the new link.
4.  **Navigation:** (If Level 1) Update `src/config/navigation.ts`.
5.  **Mapping:** (If Level 1) Update `src/scripts/docsMap.ts`.
6.  **Verify:** Run `npm run check:routes` and `npm run test:links`.

## Commit Conventions

The project follows **Conventional Commits**:
- `feat(scope): ...`
- `fix(scope): ...`
- `docs(scope): ...`
- `chore: ...`

Common scopes: `sidebar`, `search`, `content`, `routing`.

## Search Configuration

- Search is powered by **Pagefind**.
- Search filters (`chapter:`) rely on the first path segment.
- If renaming chapters, update `src/config/search.ts` (which drives `SearchDrawer`), `docsMap.ts`, and `sidebars.ts`.
