---
paths: src/pages/**/*
---

# src/pages - 路由模块

## 模块概览

Astro 路由页面目录，与 `src/content/docs` 内容目录一一镜像。

## 目录结构

```
pages/
├── index.astro           # 首页
├── rss.xml.ts            # RSS 订阅
├── advanced/             # /advanced/*
├── daily/                # /daily/*
├── concepts/             # /concepts/*
├── fun/                  # /fun/*
├── manual/               # /manual/*
├── prompts/              # /prompts/*
├── resources/            # /resources/*
└── theoretical/          # /theoretical/*
```

## 路由镜像规则

| 层级 | 内容路径 | 路由路径 |
|------|----------|----------|
| 一级 | `docs/<NN-alias>/index.md` | `<alias>/index.astro` |
| 二级 | `docs/<NN-alias>/<sub>/index.md` | `<alias>/<sub>/index.astro` |
| 三级 | `docs/<NN-alias>/<sub>/<page>/index.md` | `<alias>/<sub>/<page>/index.astro` |

> 说明：同一目录下额外的 `*.md`（如 `details.md`、`glm.md`）作为标签文件，由 `TabContentLayout.astro` 渲染，不需要对应的 `.astro` 路由。

### 示例
```
内容: src/content/docs/03-prompts/my-tricks/index.md
路由: src/pages/prompts/my-tricks/index.astro ✓

内容: src/content/docs/06-resources/api/details.md (标签页)
路由: 由 src/pages/resources/api/index.astro 的 TabContentLayout 承载（无需额外路由）
```

## 页面模板

标准文档页面结构：

```astro
---
import ContentLayout from '../../layouts/ContentLayout.astro'
import { getEntry } from 'astro:content'

const entry = await getEntry('docs', '03-prompts/context')
if (!entry) throw new Error('Entry not found')

const { Content, headings } = await entry.render()
---

<ContentLayout entry={entry} headings={headings}>
  <Content />
</ContentLayout>
```

## 特殊页面

| 页面 | 功能 |
|------|------|
| `index.astro` | 站点首页 |
| `rss.xml.ts` | RSS 订阅端点 |

## TabContentLayout 多标签页面

多标签页面统一使用 `TabContentLayout.astro`，适用于所有章节：

```astro
---
import TabContentLayout from '../../layouts/TabContentLayout.astro'
import { RESOURCES_SIDEBAR } from '../../scripts/sidebars'
---

<TabContentLayout
  basePath="06-resources/preparation"
  title="Preparation"
  sidebarItems={RESOURCES_SIDEBAR}
/>
```

标签内容文件 (带 `tab:` frontmatter) 不需要单独的 `.astro` 路由文件，它们会在对应目录下作为标签被 TabContentLayout 自动渲染。
TabContentLayout 仅匹配 `basePath` 目录的直接子文件（不递归）。

## 修改指南

### 新增页面
1. 在 `src/content/docs/` 创建内容文件
2. 在 `src/pages/` 创建对应路由文件
3. 更新 `src/scripts/sidebars.ts` 侧栏配置

### 新增多标签内容
1. 在对应内容目录下添加新的 `.md` 文件（如 `details.md`、`glm.md`）
2. 在标签文件中配置 `tab:` frontmatter
3. 确保父级路由使用 `TabContentLayout.astro`，无需为标签文件创建路由

### 删除页面
1. 删除内容文件和路由文件
2. 更新侧栏配置
3. 检查站内链接 (`npm run test:links`)

### 路由校验
运行 `npm run check:page-structure` 与 `npm run check:routes` 验证内容与路由的镜像一致性（带 `tab:` 的多标签内容由 TabContentLayout 统一承载，已在路由检查脚本中作为特例处理，无需为标签文件创建 `.astro` 路由）。
