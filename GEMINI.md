# Fish AI Handbook - Gemini Context

简要规则（中文思考/输出）：遵循 `CONTRIBUTING.md`、`AGENTS.md`，使用 `apply_patch` 编辑。

## Project Overview
静态文档站点，Astro 5 + TypeScript + MDX/Markdown（Content Collections），Pagefind 搜索，Playwright E2E，Vercel 部署。支持暗/亮主题切换（`ThemeToggle` + `/scripts/theme-toggle.js`）、按需 KaTeX（frontmatter `hasMath`）以及多标签内容（TabContentLayout）。

### Key Technologies
- Framework: Astro 5 (SSG)
- Content: MDX/Markdown via Content Collections (`docs`, `home`)
- Styling: CSS (`src/styles/global.css`, `right-sidebar.css`)
- Search: Pagefind
- Testing: Playwright, Link check
- Language: TypeScript

## Architecture & Structure

```
src/
├── components/      # Header/Search/ThemeToggle/Sidebars/TabSwitcher/Home blocks
├── config/          # site/navigation/search/code/theme
├── content/         # collections: docs + home
│   └── docs/01-..99- # 8 章节，NN-alias 命名
├── layouts/         # BaseLayout / ContentLayout / TabContentLayout
├── pages/           # 必镜像 docs；TabContentLayout 承载多标签
├── plugins/         # remark/rehype (spoiler/gallery/mark/lazy-images/math/modified)
├── scripts/         # sidebars/docsMap/toc
├── styles/          # global + right-sidebar
├── utils/           # docsPath/git/tabContent/changelog
└── public/scripts/  # theme-toggle/toc/lightbox/spoiler/relative-time
```

### Chapter Map (docs)
`01-concepts`, `02-daily`, `03-prompts`, `04-advanced`, `05-fun`, `06-resources`, `07-theoretical`, `99-manual`。

### Critical Rules
1) **Route Mirroring**：`src/content/docs/**` ↔ `src/pages/**`；多标签同目录 `*.md` 由 TabContentLayout 渲染，无需额外 `.astro`。  
2) **Frontmatter**（必填）：`title`, `description`；可选 `contributors`, `tab`, `hasMath`。`tab.default/label/order` 控制多标签。  
3) **Levels**：最多 3 级；一级/二级必须目录 + `index.md`；三级为目录 + `index.md`，同目录其他 `.md` 作为标签。  
4) **Assets/Images**：新增远程域需同步 `astro.config.mjs` 的 `image.domains`；Markdown 图片默认懒加载（remark-lazy-images）。  
5) **Math**：任何标签 `hasMath: true` 即加载 KaTeX CSS 一次。  
6) **Theme**：BaseLayout 内联初始化，按钮在 `ThemeToggle.astro`，逻辑在 `/public/scripts/theme-toggle.js`。

## Key Commands
| Command | Purpose |
| --- | --- |
| `npm run dev` | 本地开发 (4321) |
| `npm run build` | 构建 + Pagefind 索引 |
| `npm run preview:search` | 构建后预览并验证搜索 |
| `npm run type-check` | Astro + TS 类型检查 |
| `npm run lint:markdown` | Markdown 代码块/图床校验 |
| `npm run check:page-structure` | 路由/目录综合校验 |
| `npm run check:routes` | 内容与路由镜像校验 |
| `npm run test:links` | 站内死链检测（需先 build） |
| `npm run test:e2e` / `:headed` | Playwright E2E |
| `npm run check:all` | 一键跑 prettier --check/build/type-check/check:routes/test:links（验证，不写文件） |

## Workflow for Adding Content
1) 内容：在 `src/content/docs/NN-alias/...` 添加 `index.md`（或同目录标签文件）。  
2) 路由：在 `src/pages/alias/...` 创建对应 `.astro`；多标签只需父级路由。  
3) 侧栏：更新 `src/scripts/sidebars.ts`。  
4) 导航/映射：新增一级章节需改 `src/config/navigation.ts`、`src/scripts/docsMap.ts`。  
5) 验证：`npm run check:page-structure && npm run check:routes && npm run test:links`。  

## Commit Conventions
Conventional Commits，常用 scope：`content`、`sidebar`、`search`、`routing`、`perf`、`ui`、`dx`。  

## Search Notes
Pagefind 过滤依赖路径首段（chapter）。重命名章节时同步 navigation/search/docsMap/sidebars，并重建索引（`npm run build`）。
