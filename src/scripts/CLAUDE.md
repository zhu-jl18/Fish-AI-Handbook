# src/scripts - 脚本工具模块

> [根索引](../../CLAUDE.md) > scripts

---

## 模块概览

TypeScript 脚本工具集，处理侧栏导航、文档映射和目录生成。

## 文件清单

| 文件 | 导出符号 | 功能 |
|------|----------|------|
| `sidebars.ts` | `getSidebarForPath`, `*_SIDEBAR` | 侧栏配置与路径匹配 |
| `docsMap.ts` | `DOCS_MAP` | 路由别名到内容目录映射 |
| `toc.ts` | `setupRightSidebar`, `collectHeadings` | 目录生成与高亮 |

## sidebars.ts

侧栏配置核心文件，定义各章节的侧栏结构。

### 导出符号

```typescript
// 各章节侧栏配置
const CONCEPTS_SIDEBAR: SidebarSection[]
const BASIC_USAGE_SIDEBAR: SidebarSection[]
const PROMPTS_SIDEBAR: SidebarSection[]
const ADVANCED_TECHNIQUES_SIDEBAR: SidebarSection[]
const FUN_SIDEBAR: SidebarSection[]
const RESOURCES_SIDEBAR: SidebarSection[]
const THEORETICAL_SIDEBAR: SidebarSection[]
const MANUAL_SIDEBAR: SidebarSection[]

// 根据路径获取侧栏
function getSidebarForPath(pathname: string): SidebarSection[] | null
```

### 类型定义

```typescript
interface SidebarLink {
  text: string
  href: string
}

interface SidebarGroup {
  text: string
  children: SidebarLink[]
}

type SidebarSection = SidebarLink | SidebarGroup
```

## docsMap.ts

路由别名到内容目录的映射表。

```typescript
const DOCS_MAP: Record<string, string> = {
  'concepts': '01-concepts',
  'basic-usage': '02-basic-usage',
  'prompts': '03-prompts',
  // ...
}
```

## toc.ts

右侧目录 (Table of Contents) 功能。

### 导出符号

```typescript
function setupRightSidebar(): void        // 初始化右侧栏
function collectHeadings(): TocItem[]     // 收集页面标题
function mountToc(items: TocItem[]): void // 渲染目录
function observeActive(): void            // 滚动高亮
```

## 修改指南

### 新增章节侧栏
1. 在 `sidebars.ts` 添加新的 `*_SIDEBAR` 常量
2. 在 `getSidebarForPath` 函数添加路径匹配

### 修改章节映射
编辑 `docsMap.ts` 中的 `DOCS_MAP` 对象。

### 修改目录行为
编辑 `toc.ts` 中的相关函数。
