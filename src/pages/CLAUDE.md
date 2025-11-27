# src/pages - 路由模块

> [根索引](../../CLAUDE.md) > pages

---

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
| 三级 | `docs/<NN-alias>/<sub>/<page>.md` | `<alias>/<sub>/<page>.astro` |

### 示例
```
内容: src/content/docs/03-prompts/context/index.md
路由: src/pages/prompts/context/index.astro ✓

内容: src/content/docs/03-prompts/context/dialogue-levels.md
路由: src/pages/prompts/context/dialogue-levels.astro ✓
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

## 修改指南

### 新增页面
1. 在 `src/content/docs/` 创建内容文件
2. 在 `src/pages/` 创建对应路由文件
3. 更新 `src/scripts/sidebars.ts` 侧栏配置

### 删除页面
1. 删除内容文件和路由文件
2. 更新侧栏配置
3. 检查站内链接 (`npm run test:links`)

### 路由校验
运行 `npm run check:routes` 验证内容与路由的镜像一致性。
