# src/content - 内容模块

> [根索引](../../CLAUDE.md) > content

---

## 模块概览

文档内容存储目录，使用 Astro Content Collections 管理 MDX/Markdown 文档。

## 目录结构

```
content/
├── config.ts          # Content Collections 配置
└── docs/              # 文档目录 (8 个一级章节)
    ├── 01-concepts/       # 核心概念
    ├── 02-daily/          # Daily（日常应用）
    ├── 03-prompts/        # 提示词技巧
    ├── 04-advanced/       # 进阶技术
    ├── 05-fun/            # 趣味内容
    ├── 06-resources/      # 资源汇总
    ├── 07-theoretical/    # 理论基础
    └── 99-manual/         # 使用手册 (置底)
```

## 章节映射

| 内容目录 | 路由别名 | 路由路径 |
|----------|----------|----------|
| `01-concepts` | concepts | `/concepts` |
| `02-daily` | daily | `/daily` |
| `03-prompts` | prompts | `/prompts` |
| `04-advanced` | advanced | `/advanced` |
| `05-fun` | fun | `/fun` |
| `06-resources` | resources | `/resources` |
| `07-theoretical` | theoretical | `/theoretical` |
| `99-manual` | manual | `/manual` |

## 内容规范

### 层级规则 (最多 3 级)
```
docs/
├── 03-prompts/
│   ├── index.md              # 一级: 目录 + index.md
│   └── context/
│       ├── index.md          # 二级: 目录 + index.md
│       ├── dialogue-levels.md # 三级: 单页 .md
│       └── request-body.md    # 三级: 单页 .md
```

### Frontmatter (必填)
```yaml
---
title: 页面标题 (必填)
description: 简短描述 (必填，缺失会导致构建失败)
---
```

### 禁止模式
- 二级直接使用单文件 `*.md`
- 三级使用目录 + `index.md`
- 超过三级深度

## Content Collections 配置

`config.ts` 定义了 `docs` collection，schema 包含：
- `title` (string, 必填)
- `description` (string, 必填)
- 其他可选字段

## 自定义 Markdown 语法

### Spoiler (文本遮罩)
```markdown
行内: :spoiler[隐藏内容]
块级: :::spoiler
      隐藏内容
      :::
```

### Gallery (图片画廊)
```markdown
:::gallery{cols=2 gap=18 ratio=1/1}
![图1](url1)
![图2](url2)
:::
```

## Multi-Tab Content (多标签内容)

> **试点章节：** `06-resources`
> **扩展性：** 可推广至其他章节

允许同一 URL 下切换多个内容变体，类似 GitHub 的 README/CONTRIBUTING 切换。

### 目录结构
```text
06-resources/api/
├── index.md        # 默认标签 (必须)
├── details.md      # 详情标签 (可选, 需 tab: frontmatter)
└── examples.md     # 示例标签 (可选)
```

### Frontmatter
```yaml
---
title: API Key - Details
description: 详细配置指南
tab:
  label: Details    # 可选
  order: 10         # 可选 (index=0, details=10, others=20+)
---
```

### 关键文件
- Schema: `src/content/config.ts` (`tabSchema`)
- Utils: `src/utils/tabContent.ts`
- Component: `src/components/ContentTabSwitcher.astro`
- Layout: `src/layouts/ResourcesContentLayout.astro`

### 注意事项
- 标签文件不需要单独的 `.astro` 路由
- 单文件目录自动退化为普通页面

## 修改指南

1. 新增内容必须在 `src/pages/` 创建对应路由
2. 新增章节需更新 `src/config/navigation.ts` 和 `src/scripts/docsMap.ts`
3. 修改/删除内容需同步更新侧栏配置 `src/scripts/sidebars.ts`
4. 多标签内容只需添加 `.md` 文件并配置 `tab:` frontmatter
