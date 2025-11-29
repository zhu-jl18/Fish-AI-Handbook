# Fish AI Handbook

<a id="top"></a>

> ⚠️ **注意：网站内容结构正在进行大规模重构，提交 PR 前请先与我沟通。**
>
> 🚫 **警告：大部分内容为 AI 生成预填充，人工编写内容正在路上。**

本项目由我借助 AI 建立与维护，README 仅面向"未来的我"。目标：能在数分钟内回忆技术栈和原理，并按步骤完成新增/修改/删除与部署或快速交接进行后续新功能开发。

## 目录

- [Fish AI Handbook](#fish-ai-handbook)
  - [目录](#目录)
  - [长远计划](#长远计划)
  - [项目文档](#项目文档)
  - [快速开始（速查）](#快速开始速查)
  - [架构速览](#架构速览)
  - [文档结构可视化](#文档结构可视化)
  - [常见坑与反模式](#常见坑与反模式)
  - [变更记录](#变更记录)
  - [适用范围](#适用范围)
  - [运维与应急速查](#运维与应急速查)

## 长远计划

- [ ] 增加一个基于LLM和知识库的问答系统，当前进度已经选型 n8n
- [ ] 增加一个静态网站CMS，尚未构思




## 项目文档

- 开发协作规范（人类和AI通用）：[CONTRIBUTING.md](CONTRIBUTING.md)
- AI Agent 通用规则（适用Claude Code，Codex等AI Agent）：[AGENTS.md](AGENTS.md)
  - [Claude Customized](CLAUDE.md) & 各模块下的 CLAUDE.md; 定期更新
  - [Gemini Specified](GEMINI.md) 
- PR 模板：[.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md)
- Issue 模板：[.github/ISSUE_TEMPLATE/](.github/ISSUE_TEMPLATE/)



## 快速开始（速查）

```
npm install        # 安装依赖
npm run dev        # 本地开发（默认 4321）
npm run build      # 生成 dist/ 并构建搜索索引
npm run preview    # 预览 dist/
npm run test:links # 基于 dist/ 的站内断链检测
npm run format     # 代码格式化
```

提交前自检（推荐使用封装命令）：

```bash
npm run check:page-structure  # 页面结构检查：build → check:routes → test:links
npm run check:all             # 全量检查：format → build → type-check → check:routes → test:links
```

单项命令：
- `npm run check:routes` — 校验 1/2/3 级内容与路由镜像一致
- `npm run type-check` — TypeScript 类型检查
- `npm run test:links` — 站内断链检测（需先 build）


更多流程与示例请见 [CONTRIBUTING.md](CONTRIBUTING.md)（唯一事实源）。



## 架构速览

- 框架：Astro（静态导出）+ MDX；代码高亮：Shiki
- 目录：内容 `src/content/docs/`；路由 `src/pages/`；布局 `src/layouts/`；组件 `src/components/`；侧栏逻辑 `src/scripts/sidebars.ts`
- 内容层级：最多三级（一级/二级=文件夹+index.md；三级=单页 md）
- 顶层目录命名：`NN-alias`（01..07、99-manual 置底）

<div align="right"><a href="#top">回到顶部 ↑</a></div>

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

- 使用 Git 提交历史与 Pull Request 查看变更



## 适用范围

- 本 README 仅面向维护者与"未来的我"，作为最小必要信息与导航。
- AI 的通用行为与边界见 [AGENTS.md](AGENTS.md)；具体流程始终以 [CONTRIBUTING.md](CONTRIBUTING.md) 为准。



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
  - Header 高亮错位：基于"别名"匹配，不与中文文案绑定

<div align="right"><a href="#top">回到顶部 ↑</a></div>
