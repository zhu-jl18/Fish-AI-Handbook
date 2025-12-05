# Fish AI Handbook - AI 上下文索引

> 生成时间: 2025-12-05 16:40:00  
> 最后更新: 2025-12-05 16:40:00  
> 本文件由 `/init-project` 命令自动生成，用于为 AI Agent 提供项目上下文。

---

## 项目概览

**Fish AI Handbook** 是一个基于 Astro 构建的静态文档站点，用于记录和分享 AI 使用模式与技术实践。项目采用 Content Collections 管理 MDX/Markdown，Pagefind 站内搜索，支持 Playwright E2E 测试，并提供暗/亮主题切换与按需加载的数学渲染。

### 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | Astro 5 (静态导出) |
| 内容 | MDX + Markdown + Content Collections |
| 语言 | TypeScript |
| 代码高亮 | Shiki (astro-expressive-code) |
| 数学 | remark-math + rehype-katex（按页面 `hasMath` 懒加载 CSS） |
| 搜索 | Pagefind |
| 主题 | 自托管中英文字体 + 亮/暗主题切换（`ThemeToggle` + `/scripts/theme-toggle.js`） |
| 测试 | Playwright |
| 部署 | Vercel |

### 核心文档

| 文档 | 用途 |
|------|------|
| `README.md` | 架构速览与快速开始 |
| `CONTRIBUTING.md` | **唯一事实源** - 开发规范、流程、提交约定 |
| `AGENTS.md` | AI Agent 行为边界与通用规则 |

---

## 架构结构图

```mermaid
graph TB
    subgraph "用户界面层"
        Pages[src/pages/*.astro<br/>路由页面]
        Layouts[src/layouts/*.astro<br/>布局模板]
        Components[src/components/*.astro<br/>UI 组件]
    end

    subgraph "内容层"
        Content[src/content/docs/**<br/>MDX/Markdown 文档]
        ContentConfig[src/content/config.ts<br/>Content Collections]
    end

    subgraph "配置层"
        Config[src/config/<br/>站点/导航/主题/搜索配置]
        Scripts[src/scripts/<br/>侧栏/目录/文档映射]
    end

    subgraph "扩展层"
        Plugins[src/plugins/<br/>Remark 插件 + 懒加载/标记语法]
        Utils[src/utils/<br/>工具函数]
        Styles[src/styles/<br/>全局样式与主题令牌]
        Stores[src/stores/<br/>状态管理(预留 Nanostores)]
    end

    subgraph "构建输出"
        Dist[dist/<br/>静态文件]
        Pagefind[dist/pagefind/<br/>搜索索引]
    end

    Pages --> Layouts
    Layouts --> Components
    Pages --> Content
    Content --> ContentConfig
    Pages --> Config
    Pages --> Scripts
    Layouts --> Styles
    Content --> Plugins
    Pages --> Utils
    Pages --> Dist
    Dist --> Pagefind
```

---

## 目录结构

```
Fish-AI-Handbook-dev/
├── src/
│   ├── components/      # UI 组件 (14 核心 + 2 首页组件)
│   ├── config/          # 配置模块 (站点/导航/搜索/代码/主题)
│   ├── content/         # Content Collections: docs + home
│   │   └── docs/        # 8 个一级章节
│   ├── layouts/         # 布局模板 (BaseLayout, ContentLayout, TabContentLayout)
│   ├── pages/           # 路由页面 (与 docs 镜像，TabContentLayout 承载多标签)
│   ├── plugins/         # Remark/rehype 插件 (spoiler, gallery, mark, lazy-images, math)
│   ├── scripts/         # 侧栏/映射/目录脚本
│   ├── styles/          # 全局样式与主题变量
│   ├── utils/           # 工具函数 (docsPath, git, tabContent)
│   └── stores/          # Nanostores 预留（当前空）
├── scripts/             # Node 构建与校验脚本
├── tests/e2e/           # Playwright E2E 测试
├── public/              # 静态资源与前端行为脚本
├── astro.config.mjs     # Astro 配置入口
├── package.json         # 项目依赖与脚本
└── CONTRIBUTING.md      # 开发规范 (唯一事实源)
```

---

## 模块索引

### 📦 src/components
UI 组件集合，包含页面头部、侧栏、搜索、目录、主题切换以及首页模块等核心组件。

|| 组件 | 功能 |
||------|------|
|| `Header.astro` | 页面头部导航，集成主题切换与搜索入口 |
|| `ThemeToggle.astro` | 亮/暗主题切换按钮（配合 `/scripts/theme-toggle.js`） |
|| `LeftSidebar.astro` | 左侧章节导航 |
|| `RightSidebar.astro` | 右侧目录 (TOC) |
|| `SearchDrawer.astro` | 搜索抽屉 (Pagefind) |
|| `MobileMenu.astro` | 移动端菜单 |
|| `ContentActions.astro` | 内容操作栏 |
|| `ContentTabSwitcher.astro` | 多标签内容切换（全章节通用） |
|| `SidebarPanels.astro` | 侧栏面板切换 |
|| `SidebarStructure.astro` | 文档结构视图 |
|| `SidebarToc.astro` | 目录视图 |
|| `SidebarContributors.astro` | 贡献者视图 |
|| `Footer.astro` | 页脚 |
|| `BackToTop.astro` | 返回顶部 |
|| `home/HeroSection.astro` | 首页欢迎区块 |
|| `home/LinksSection.astro` | 首页链接/阅读列表 |

→ 详见: [src/components/CLAUDE.md](src/components/CLAUDE.md)

### ⚙️ src/config
站点配置中心，管理站点信息、导航、主题、搜索和代码高亮。

| 文件 | 导出符号 | 功能 |
|------|----------|------|
| `site.ts` | `siteConfig`, `CONTRIBUTORS_MAP`, `getRobotsContent` | 站点元数据、贡献者映射、robots 工具 |
| `navigation.ts` | `navigationConfig`, `getCurrentNavKey`, `navItems` | 顶部导航配置 |
| `search.ts` | `CHAPTER_LABELS` | 搜索章节映射 |
| `code.ts` | `codeConfig` | 代码高亮配置 |
| `theme.ts` | `theme` | 主题配置 |
| `index.ts` | 统一导出 | 配置聚合入口 |

→ 详见: [src/config/CLAUDE.md](src/config/CLAUDE.md)

### 📝 src/content
Content Collections 管理的 MDX/Markdown。`docs` 集合用于正文，`home` 集合用于首页 Todo / Reading / Links 配置。

**章节结构** (8 个一级章节):
| 序号 | 目录 | 别名 | 路由 |
|------|------|------|------|
| 01 | `01-concepts` | concepts | `/concepts` |
| 02 | `02-daily` | daily | `/daily` |
| 03 | `03-prompts` | prompts | `/prompts` |
| 04 | `04-advanced` | advanced | `/advanced` |
| 05 | `05-fun` | fun | `/fun` |
| 06 | `06-resources` | resources | `/resources` |
| 07 | `07-theoretical` | theoretical | `/theoretical` |
| 99 | `99-manual` | manual | `/manual` (置底) |

**Schema 摘要**
- `docs`: `title`、`description`、`contributors?`、`tab?`、`_isTabVariant?`、`hasMath?`（为 KaTeX 懒加载标记）
- `home`: `todos[]` / `readings[]` / `links[]`（均为 text/href/meta）

→ 详见: [src/content/CLAUDE.md](src/content/CLAUDE.md)

### 🎨 src/layouts
页面布局模板。

| 文件 | 功能 |
|------|------|
| `BaseLayout.astro` | 基础 HTML 结构、SEO meta |
| `ContentLayout.astro` | 文档页布局 (三栏结构) |
| `TabContentLayout.astro` | 多标签文档布局（任意章节，支持 tab + 侧栏同步） |

→ 详见: [src/layouts/CLAUDE.md](src/layouts/CLAUDE.md)

### 📄 src/pages
Astro 路由页面，与 `src/content/docs` 一一镜像。

**路由规则**:
- 一级: `<别名>/index.astro`
- 二级: `<别名>/<子目录>/index.astro`
- 三级: `<别名>/<子目录>/<页面>.astro`

→ 详见: [src/pages/CLAUDE.md](src/pages/CLAUDE.md)

### 🔧 src/scripts
脚本工具集，处理侧栏、文档映射、目录生成。

| 文件 | 导出符号 | 功能 |
|------|----------|------|
| `sidebars.ts` | `getSidebarForPath`, `*_SIDEBAR` | 侧栏配置与路径匹配（label/href 结构，涵盖新 Manual 分组） |
| `docsMap.ts` | `DOCS_MAP` | 别名到内容目录映射 |
| `toc.ts` | `setupRightSidebar`, `collectHeadings` | 目录生成与交互 |

→ 详见: [src/scripts/CLAUDE.md](src/scripts/CLAUDE.md)

### 🔌 src/plugins
Remark / Rehype 插件，扩展 Markdown 语法与性能。

| 文件 | 功能 |
|------|------|
| `remark-spoiler-directive.js` | Spoiler 遮罩语法 |
| `remark-gallery-directive.js` | 图片画廊语法 |
| `remark-mark-directive.js` | 高亮标记语法 (`:mark[]`) |
| `remark-list-spacing.js` | 列表间距处理 |
| `remark-lazy-images.js` | Markdown 图片懒加载 |
| `remark-frontmatter-last-modified.mjs` | 最后修改时间注入 |
| `remark-math` + `rehype-katex` | 数学公式解析/渲染（与 frontmatter `hasMath` 联动） |

→ 详见: [src/plugins/CLAUDE.md](src/plugins/CLAUDE.md)

### 🛠️ src/utils
工具函数。

|| 文件 | 导出符号 | 功能 |
||------|----------|------|
|| `docsPath.ts` | `buildDocCandidates`, `normalizeEntryId` | 文档路径处理 |
|| `git.ts` | `getGitLastModifiedIso` | Git 最后修改时间 |
|| `tabContent.ts` | `organizeTabEntries`, `getTabLabel`, `getTabOrder`, `getTabBasePath`, `isTabVariantEntry`, `hasMultipleTabs` | 多标签内容检测与组织（默认标签排序/label 扩展） |
|| `changelog.ts` | `getChangelog`, `type CommitInfo` | 读取 Git 提交记录并为首页生成变更记录数据 |

→ 详见: [src/utils/CLAUDE.md](src/utils/CLAUDE.md)

### 🎨 src/styles
全局样式。

| 文件 | 功能 |
|------|------|
| `global.css` | 全局样式、组件样式、Markdown 渲染与主题变量 |
| `right-sidebar.css` | 右侧栏样式 |

---

## 常用命令

```bash
npm run dev          # 本地开发 (端口 4321)
npm run build        # 构建 + Pagefind 索引
npm run preview      # 预览构建结果
npm run preview:search # 构建后预览，便于验证搜索
npm run format       # Prettier 格式化
npm run lint:markdown # Markdown 代码块与图床校验
npm run type-check   # TypeScript 类型检查
npm run check:page-structure # 路由/目录综合校验
npm run check:routes # 路由结构校验
npm run check:all    # 运行全部校验器
npm run test:links   # 站内链接检测
npm run test:e2e     # Playwright E2E 测试（无头）
npm run test:e2e:headed # Playwright E2E（可视化）
```

---

## 开发规范要点

### 内容层级 (最多 3 级)
- **一级**: `docs/<NN-alias>/index.md`（文件夹 + index.md）
- **二级**: `docs/<NN-alias>/<sub>/index.md`（文件夹 + index.md）
- **三级**: `docs/<NN-alias>/<sub>/<page>/index.md`（文件夹 + index.md，可在同目录下放置多个标签文件）
  - 同目录下额外的 `*.md`（如 `details.md`、`glm.md`）作为标签文件，由 TabContentLayout 渲染为标签

### 路由镜像 (强制)
内容路径与路由必须一一对应：
- 内容: `src/content/docs/03-prompts/context/index.md`
- 路由: `src/pages/prompts/context/index.astro`
- 内容: `src/content/docs/02-daily/claude-code/basics/index.md`
- 路由: `src/pages/daily/claude-code/basics/index.astro`

### 提交规范
遵循 Conventional Commits，格式: `type(scope): description`

### 质量门禁
提交前必跑: `format` → `build` → `type-check` → `check:page-structure` → `check:routes` → `test:links`

---

## 覆盖率与缺口

| 指标 | 数值 |
|------|------|
| 源文件数 | 119 (*.ts, *.astro, *.js, *.css) |
| 内容文档数 | 125 (*.md / *.mdx) |
| 模块文档数 | 9 (1 根索引 + 8 模块索引) |
| 核心模块覆盖率 | 8/8 (100%) ✅ |
| 模块级 CLAUDE.md | 9/9 (100%) ✅ |

### 建议下一步
1. ✅ ~~生成各模块级 `CLAUDE.md` 文件~~ (已完成 9/9)
2. 保持文档与代码同步更新（增量维护）
3. 定期运行 `check:page-structure`、`check:routes` 与 `test:links` 确保一致性
