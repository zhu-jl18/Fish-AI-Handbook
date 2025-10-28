# CONTRIBUTING.md （开发维护贡献者手册）

本指南面向维护者与贡献者，概述了本项目的目录规范、内容新增流程、路由与侧栏维护、提交流程与质量门禁等要求。

## 目录与排序规则

- 顶层严格递增：01-fish-talks、02-basic-usage、03-prompts、04-advanced-techniques、05-fun、06-resources、99-setup（置底）
- 不允许跳号；新增一级目录按顺序加 1；Setup 固定使用 99-setup
- 已移除：tech（技术向）、demo（DEMO）。原“技术向”内容已合并到 06-resources 下的两个二级页面（2API、云平台）

## 内容结构与 Frontmatter

- 深度最多 3 级：
  - 一级/二级：文件夹 + index.md（可含子页面）
  - 三级：单页 `.md` 文件（**禁止**使用"文件夹+index.md"）

**正确示例**：

```
03-prompts/
├── index.md              # 一级 ✓
├── context/
│   ├── index.md          # 二级 ✓
│   ├── dialogue-levels.md  # 三级 ✓
│   └── request-body.md     # 三级 ✓
```

**错误示例**（勿模仿）：

```
03-prompts/
├── context/
│   ├── dialogue-levels/
│   │   └── index.md      # 三级用文件夹 ✗
```

```
03-prompts/
└── context.md     # 二级用单文件 ✗
```

- 所有内容文件必须包含 frontmatter：

```yaml
---
title: 标题（必填）
description: 简短描述（必填，未填将导致构建失败）
---
```

## 新增内容的标准流程（示例）

1. 新增一级章节（假设 08-playground）

- 内容：`src/content/docs/08-playground/index.md`
- 路由：`src/pages/playground/index.astro` 读取 `getEntry('docs','08-playground')`
- 导航：在 `src/config/navigation.ts` 添加导航项 `{ key: 'playground', href: '/playground', label: '名称' }`
- 映射：在 `src/scripts/docsMap.ts` 添加 `playground: '08-playground'`
- 侧栏：在 `sidebars.ts` 中为 `/playground` 注册对应条目

2. 新增二级 + 三级页面（以 prompts 为例）

- 内容：
  - `src/content/docs/03-prompts/best-practices/index.md`
  - `src/content/docs/03-prompts/best-practices/tracing.md`
- 路由：
  - `src/pages/prompts/best-practices/index.astro`
  - `src/pages/prompts/best-practices/tracing.astro`
- 侧栏：向 `PROMPTS_SIDEBAR` 添加二级与三级链接

3. 修改/删除内容

- 修改：编辑对应 Markdown/astro
- 删除：删除 Markdown 与 astro 页面，并从 `sidebars.ts` 移除对应链接，防止死链

4. 结构调整与迁移（强制规范）

**禁止使用路径重定向**，进行内容结构调整时必须遵循以下原则：

- **完全删除旧路径**：同步删除旧的内容目录（`src/content/docs/**`）和路由文件（`src/pages/**`）
- **重新构建新路由**：按新结构创建内容和路由，确保符合三级规范（三级必须使用单页 .md）
- **更新所有引用**：修改侧栏配置、站内链接、测试用例中的路径引用
- **禁止重定向**：不得在 `vercel.json`、`astro.config.mjs` 或其他配置文件中添加 301/302/307 等重定向规则
- **质量保证**：确保完全一致性、简洁性和可维护性，避免路径歧义和维护负担

## 特殊约定

- 06-resources（二级）：
  - 2API：仅罗列原技术向/2API 的条目
  - 云平台：仅罗列原“部署平台”的条目
- 99-setup：
  - 将“环境准备”拆分为二级直达页（Terminal、VS Code、Node.js、GitHub、VPN）
  - Cherry Studio 合并为单页 `setup/cherrystudio`

## 自定义 Markdown 扩展语法

本项目使用 `remark-directive` 插件扩展了标准 Markdown 语法，支持以下自定义指令：

### Spoiler（文本遮罩）

用于隐藏敏感信息或剧透内容，点击后显示。

**行内语法**：

```markdown
联系方式 :spoiler[866811662]
```

**块级语法（容器）**：

```markdown
:::spoiler
这是一段被隐藏的内容
可以包含多行文本
:::
```

**块级语法（叶子节点）**：

```markdown
::spoiler[单行隐藏内容]
```

**渲染效果**：

- 默认状态：显示为灰色遮罩，提示"点击查看"或"点击查看隐藏内容"
- 点击后：显示真实内容，带有淡入动画效果
- 支持键盘访问（Tab + Enter/Space）

**适用场景**：

- 隐藏联系方式、邀请码等敏感信息
- 隐藏剧透内容或答案
- 需要用户主动确认才显示的内容

**技术实现**：

- 插件：`remark-directive` + 自定义处理器 `src/plugins/remark-spoiler-directive.js`
- 样式：`src/styles/global.css` 中的 `.spoiler` 相关类
- 交互：`public/scripts/spoiler.js` 处理点击事件

## 命名规范

- 目录与文件：kebab-case（如 `best-practices`）
- 组件：PascalCase；脚本：camelCase
- 顶层目录：`NN-alias` 两位数字 + 别名（如 `03-prompts`）

## 开发与验证

- 安装与开发：

```bash
npm install
npm run dev   # 默认 4321（Playwright 测试会复用 4321）
```

- 构建与预览与链接检测：

```bash
npm run build
npm run preview
npm run test:links  # 站内死链/断链扫描（基于 dist/）
npm run lint:markdown  # 校验 Markdown 代码块闭合与语法
```

- 格式化：

```bash
npm run format
```

- 端到端测试（Playwright）：

```bash
npm run test:e2e
npm run test:e2e:headed
```

必跑校验（加强版）

- 构建：`npm run build`
- Markdown 代码块：`npm run lint:markdown`
- 预览（含搜索索引）：`npm run preview:search`
- 站内链接：`npm run test:links`
- 类型检查：`npm run type-check`
- 端到端测试：`npm run test:e2e`（如有 E2E 场景变更，需新增/更新用例）

## 与 AI 协作

- 本仓库面向多类 AI Agent，通用行为与边界请见 AGENTS.md。
- 使用 AI 工具前，请在对话开头明确要求其严格遵循 AGENTS.md，并告知本文件是流程与实现的唯一事实源。
- 流程细节（目录/层级/路由/侧栏/提交规范）以本文件为准。

## 提交信息与分支

- 提交前缀建议：
  - `content:` 内容新增/修改
  - `nav:` 侧栏/导航改动
  - `layout:` 布局与样式
  - `fix:` 修复（含死链）
  - `build:` 构建与配置
  - `docs:` 文档说明
  - `refactor:` 结构性重构
- 分支与工作流：
  - 保护分支：`main`（禁止直接提交，默认仅超级管理员可 push）
  - 创建分支：从远程 `main` 新建并切换
    - 示例：`git fetch origin && git checkout -b feature/<短描述> origin/main`
  - 提交与推送：本地小步提交，推送远程同名分支
  - 合并方式：一律通过 PR 合入 `main`，禁止直接在 `main` 提交
  - 合并前：确保 `npm run build`、`npm run test:links` 通过

## 变更登记与交叉维护

- 必须更新 CHANGELOG.md（[Unreleased] 下按 Added/Changed/Fixed/Removed 分类）
- 自查并同步相关文档引用：README.md、AGENTS.md、CONTRIBUTING.md、WARP/CLAUDE/CURSOR.md
- 提交信息建议包含 Why/What/How 与验证结果摘要

## PR 检查清单（见 .github/PULL_REQUEST_TEMPLATE.md）

- 顶层编号是否按顺序（01..06、99）且未跳号
- 新增页面是否包含必填 frontmatter `title`、`description`
- 路由 `.astro` 与内容路径一致（getEntry）
- 侧栏/导航是否同步更新
- 构建是否通过、无 404 与死链

## 结构反模式（禁止）

- ❌ 二级使用"名字.md"（如 `03-prompts/best-practices.md`）
- ❌ 三级使用"文件夹+index.md"（如 `glossary/ai-concepts/index.md`）
- ❌ 超过三级深度（如 `prompts/context/levels/basic/index.md`）
- ❌ 二级路径与三级路径重复（如同时存在 `01-fish-talks/model-params/` 和 `01-fish-talks/glossary/model-params/`）

**原因**：

- Astro 的 `getEntry` 对两种结构都能识别，不会报错
- 但"文件夹+index.md"用于三级会破坏层级约定，导致后续维护混乱

## 常见问题

- 构建报错 description 必填：为该内容文件补充 frontmatter `description`
- 页面 404：请同时检查内容文件、路由文件与侧栏条目是否一一对应
- Header 高亮错位：使用别名匹配，不与中文文案直接绑定
