# Fish AI Handbook

本项目由我借助 AI 建立与维护，README 仅面向“未来的我”。目标：能在数分钟内回忆技术栈和原理，并按步骤完成新增/修改/删除与部署。

## 长远计划

- 增加一个基于LLM和知识库的问答系统
- 增加一个静态网站CMS

## 项目文档

- 开发协作规范（人类和AI通用）：CONTRIBUTING.md
- AI Agent 通用规则（适用Claude Code，Codex等AI Agent）：AGENTS.md
- Warp 专用规则：WARP.md
- Cursor 专用规则：.cursor/\*
- PR 模板：.github/PULL_REQUEST_TEMPLATE.md
- Issue 模板：.github/ISSUE_TEMPLATE/

## 快速开始（速查）

```
npm install        # 安装依赖
npm run dev        # 本地开发（默认 4321）
npm run build      # 生成 dist/ 并构建搜索索引
npm run preview    # 预览 dist/
npm run test:links # 基于 dist/ 的站内断链检测
npm run format     # 代码格式化
```

### 提交前自检（建议）

- `npm run check:routes` — 校验 1/2/3 级内容与路由镜像一致，禁止二级平铺 .astro 与三级“文件夹+index”。
- `npm run type-check` — 运行 Astro 的 `astro check`，覆盖 .astro + 相关 TS/JS + Content Collections；要求 0 errors / 0 warnings（hints 如 is:inline 可忽略）。
- `npm run test:links` — 基于 dist/ 的站内断链检测（需先 build）。


更多流程与示例请见 CONTRIBUTING.md（唯一事实源）。

## 架构速览

- 框架：Astro（静态导出）+ MDX；代码高亮：Shiki
- 目录：内容 `src/content/docs/`；路由 `src/pages/`；布局 `src/layouts/`；组件 `src/components/`；侧栏逻辑 `src/scripts/sidebars.ts`
- 内容层级：最多三级（一级/二级=文件夹+index.md；三级=单页 md）
- 顶层目录命名：`NN-alias`（01..06、99-setup 置底）

## 文档结构可视化

```
src/
├─ content/
│  └─ docs/              # 文档内容（Markdown/MDX）
├─ pages/                # 路由（.astro，一一对应内容）
├─ layouts/              # 通用布局（如 ContentLayout）
├─ components/           # 组件（通用 UI）
└─ scripts/
   └─ sidebars.ts        # 左侧栏清单与选择逻辑

public/                  # 静态资源（robots.txt、字体等）
dist/                    # 构建输出（由 build 生成）
```

## 常见坑与反模式

- 仅改侧栏未建路由页面，导致 404
- frontmatter 缺 `description` 导致构建失败
- 路由与内容路径不一致，`getEntry` 读取失败
- 三级误用"文件夹+index.md"（应为单页 .md）；Astro 不报错但违反层级约定
- **使用重定向而非重新构建路由**：进行结构调整时，必须删除旧路径并按新结构重建路由，同时更新侧栏、链接与测试，禁止使用路径重定向，以保证一致性与可维护性
- 在根提交 `dist/`、`.astro/`、或工具本地数据

## 变更记录

- 见 CHANGELOG.md（遵循 Keep a Changelog）

## 适用范围

- 本 README 仅面向维护者与“未来的我”，作为最小必要信息与导航。
- AI 的通用行为与边界见 AGENTS.md；具体流程始终以 CONTRIBUTING.md 为准。

## 运维与应急速查

- 依赖维护
  - 查看/升级：`npm outdated` / `npm update`
  - 锁文件策略：仅通过 `npm` 改动，不手改 `package-lock.json`
- 搜索索引
  - 已在 `npm run build` 后自动生成 Pagefind 索引；预览：`npm run preview`
- 链接检查
  - `npm run test:links` 仅检查站内链接（已忽略外链/邮件/电话）
- 收录策略
  - 当前不收录：BaseLayout Robots meta + `public/robots.txt` Disallow
  - 允许收录：移除 Robots meta + 放开 `robots.txt` + 按需修改 `vercel.json`
- 常见应急
  - 404：补齐对应 `src/pages/**` 与侧栏条目，路径与 `getEntry` 保持一致
  - 构建失败：多为对象缺逗号或字符串 `\n` 混入，按报错定位
  - Header 高亮错位：基于“别名”匹配，不与中文文案绑定
