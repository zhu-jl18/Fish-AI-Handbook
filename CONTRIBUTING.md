# CONTRIBUTING.md

本指南面向维护者与贡献者，概述了本项目的目录规范、内容新增流程、路由与侧栏维护、提交流程与质量门禁等要求。

## 目录与排序规则

- 顶层严格递增：01-fish-talks、02-basic-usage、03-prompts、04-advanced-techniques、05-fun、06-resources、99-setup（置底）
- 不允许跳号；新增一级目录按顺序加 1；Setup 固定使用 99-setup
- 已移除：tech（技术向）、demo（DEMO）。原“技术向”内容已合并到 06-resources 下的两个二级页面（2API、云平台）

## 内容结构与 Frontmatter

- 深度最多 3 级：
  - 一级/二级：文件夹 + index.md
  - 三级：单页 md
- 所有内容文件必须包含 frontmatter：

```yaml
---
title: 标题（必填）
description: 简短描述（必填，未填将导致构建失败）
---
```

## 新增内容的标准流程（示例）

1. 新增一级章节（假设 07-playground）

- 内容：`src/content/docs/07-playground/index.md`
- 路由：`src/pages/playground/index.astro` 读取 `getEntry('docs','07-playground')`
- 侧栏：在 `sidebars.ts` 中为 `/playground` 注册对应条目（如需要）

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

## 特殊约定

- 06-resources（二级）：
  - 2API：仅罗列原技术向/2API 的条目
  - 云平台：仅罗列原“部署平台”的条目
- 99-setup：
  - 将“环境准备”拆分为二级直达页（Terminal、VS Code、Node.js、GitHub、VPN）
  - Cherry Studio 合并为单页 `setup/cherrystudio`

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

## PR 检查清单（见 .github/PULL_REQUEST_TEMPLATE.md）

- 顶层编号是否按顺序（01..06、99）且未跳号
- 新增页面是否包含必填 frontmatter `title`、`description`
- 路由 `.astro` 与内容路径一致（getEntry）
- 侧栏/导航是否同步更新
- 构建是否通过、无 404 与死链

## 常见问题

- 构建报错 description 必填：为该内容文件补充 frontmatter `description`
- 页面 404：请同时检查内容文件、路由文件与侧栏条目是否一一对应
- Header 高亮错位：使用别名匹配，不与中文文案直接绑定
