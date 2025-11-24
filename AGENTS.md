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

- Follow related rules in CONTRIBUTING.md 

## Coding Style & Naming

- Use TypeScript where possible; follow existing Astro/TS patterns.
- Format code with Prettier (`npm run lint` or configured hooks).
- Use 2-space indentation; prefer descriptive names (`getUserConfig`, `HandbookSection`).
- Place shared helpers in `src/lib/` or the closest feature module.

## Testing Guidelines && Commit & Pull Requests

- Follow related rules in CONTRIBUTING.md 
- Add or update tests for any behavioral change.





## Agent-Specific Notes

- When editing files, use the `apply_patch` workflow instead of ad-hoc scripts.
- Follow existing directory boundaries; avoid large restructures without prior discussion.
