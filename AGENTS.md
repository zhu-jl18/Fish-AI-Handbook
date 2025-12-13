## BASIC RULES

* Always respond in Chinese and think in English.
* 始终遵循 `CONTRIBUTING.md`（唯一事实源）。
* 编辑文件优先使用 `apply_patch`。


Repository Guidelines
======================

## Project Structure & Modules

- App source lives in `src/` (pages, layouts, components, utilities).
- Tests live in `tests/` (unit, integration, and Playwright e2e).
- Static assets are in `public/`; built artifacts output to `dist/`.
- Scripts for maintenance and automation live in `scripts/`.

## Build, Test, and Development

- 格式化：`npm run format`（写入变更）。CI/封装命令不会替你改文件，需手动运行。
- 跑全套校验：`npm run check:all`（prettier --check + build + type-check + check:routes + test:links，纯验证）；仅大改动/发布前使用。若需要自动修复，请先 `npm run format` 再跑。
- 常用单项：`npm run check:page-structure`、`npm run check:routes`、`npm run test:links`。小改动遵循最小必要命令：文案/单文件可 `npm run format && npm run type-check`，结构改动用 `check:routes` + `test:links`，不要一行改动就跑全套。
- 预览搜索：`npm run preview:search`（build 后验证 Pagefind）

## Coding Style & Naming

- 使用 TypeScript；遵循现有 Astro/TS 模式与 2 空格缩进。
- 统一使用 Prettier (`npm run format`)。
- 组件/模块命名清晰：如 `getUserConfig`, `HandbookSection`。
- 共享工具放入 `src/utils/` 或就近模块；布局/组件保持目录边界。

## Testing Guidelines && Commit & Pull Requests

- 遵循 `CONTRIBUTING.md` 的提交流程与 Conventional Commits。
- 行为变更需补/更新测试（Playwright、link check、route check 等）。
- KaTeX/多标签/搜索等改动需同时验证 build + check:routes + test:links。





## Agent-Specific Notes

- 编辑使用 `apply_patch`，避免大范围重构目录。
- Content Routes 必须镜像 `src/content/docs`，多标签由 `TabContentLayout` 承载，不额外建路由。
- 新增图床/远程资源需同步 `astro.config.mjs` image domains。
- 主题/KaTeX 为按需加载：页面（或任一标签）有 `hasMath: true` 才加载 KaTeX CSS；ThemeToggle 依赖 `/public/scripts/theme-toggle.js`。
