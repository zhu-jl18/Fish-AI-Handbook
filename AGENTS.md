<!-- OPENSPEC:START -->
# If `@openspec` folder doesn't exist just ignore this section

# OpenSpec Instructions 


These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

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
