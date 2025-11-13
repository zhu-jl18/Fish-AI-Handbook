## BASIC RULES

* Always responde in Chinese and think in English.

## Strictly Follow CONTRIBUTING.md


Repository Guidelines
======================

## Project Structure & Modules

- App source lives in `src/` (pages, layouts, components, utilities).
- Tests live in `tests/` (unit, integration, and Playwright e2e).
- Static assets are in `public/`; built artifacts output to `dist/`.
- Scripts for maintenance and automation live in `scripts/`.

## Build, Test, and Development

- `npm install` — install all dependencies.
- `npm run dev` — start local dev server.
- `npm run build` — build the production bundle to `dist/`.
- `npm test` — run unit/integration tests.
- `npx playwright test` — run browser e2e tests.

## Coding Style & Naming

- Use TypeScript where possible; follow existing Astro/TS patterns.
- Format code with Prettier (`npm run lint` or configured hooks).
- Use 2-space indentation; prefer descriptive names (`getUserConfig`, `HandbookSection`).
- Place shared helpers in `src/lib/` or the closest feature module.

## Testing Guidelines

- Add or update tests for any behavioral change.
- Mirror source structure in `tests/` (e.g., `src/foo/bar.ts` → `tests/foo/bar.test.ts`).
- Keep tests deterministic and fast; avoid real network calls.

## Commit & Pull Requests

- Write clear, imperative commit messages (e.g., "Add handbook TOC sidebar").
- Keep PRs focused and small; describe motivation and key changes.
- Link related issues, add screenshots for UI changes, and note any breaking changes.

## Agent-Specific Notes

- When editing files, use the `apply_patch` workflow instead of ad-hoc scripts.
- Follow existing directory boundaries; avoid large restructures without prior discussion.
