---
paths: src/scripts/**/*
---

# src/scripts - 脚本工具模块

## 模块概览

TypeScript 脚本工具集，处理侧栏导航、文档映射和目录生成。

## 文件清单

| 文件 | 导出符号 | 功能 |
|------|----------|------|
| `sidebars.ts` | `getSidebarForPath`, `*_SIDEBAR` | 侧栏配置与路径匹配 |
| `docsMap.ts` | `DOCS_MAP` | 路由别名到内容目录映射 |
| `toc.ts` | `setupRightSidebar`, `collectHeadings` | 目录生成与高亮 |
| `content-tabs.ts` | `initTabSwitcher` | 多标签客户端交互逻辑（打包为模块，自动监听 `DOMContentLoaded` 与 `astro:page-load`） |

## sidebars.ts

侧栏配置核心文件，定义各章节的侧栏结构。

### 导出符号

```typescript
type SidebarLink = { label: string; href: string; activeMatch?: RegExp | string }
type SidebarGroup = {
  label: string
  href?: string
  items?: SidebarLink[]
  openMatch?: RegExp | string
}
type SidebarSection = Array<SidebarLink | SidebarGroup>

const CONCEPTS_SIDEBAR: SidebarSection
const DAILY_SIDEBAR: SidebarSection
const PROMPTS_SIDEBAR: SidebarSection
const ADVANCED_TECHNIQUES_SIDEBAR: SidebarSection
const FUN_SIDEBAR: SidebarSection
const RESOURCES_SIDEBAR: SidebarSection
const THEORETICAL_SIDEBAR: SidebarSection
const MANUAL_SIDEBAR: SidebarSection

function getSidebarForPath(pathname: string): SidebarSection
```

### 配置要点
- 侧栏项改为 `label/href` 字段；`items` 用于二级分组
- Manual 侧栏细分 Terminal / VS Code / Node.js / Git / Network Proxy / CC Switch / MCP Router / VPS
- 返回空数组代表未匹配章节（无 null）

## docsMap.ts

路由别名到内容目录的映射表。

```typescript
const DOCS_MAP: Record<string, string> = {
  concepts: '01-concepts',
  daily: '02-daily',
  prompts: '03-prompts',
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

> 构建后输出为 `/public/scripts/toc.js`，TabContentLayout 在浏览器端按需加载，用于多标签 TOC 重建。

## content-tabs.ts

多标签切换的客户端脚本，打包后通过 `?url` 引入：

```astro
import contentTabsUrl from '../scripts/content-tabs.ts?url'
<script type="module" src={contentTabsUrl}></script>
```

模块内部已自动监听 `DOMContentLoaded` 与 `astro:page-load`，无需额外事件绑定。默认会跳过已初始化的 tab 容器，避免重复绑定。修改时保持导出 API 名称不变（`initTabSwitcher`），确保 `TabContentLayout` 与 `ContentTabSwitcher` 的依赖稳定。

## 修改指南

### 新增章节侧栏
1. 在 `sidebars.ts` 添加新的 `*_SIDEBAR` 常量
2. 在 `getSidebarForPath` 函数添加路径匹配

### 修改章节映射
编辑 `docsMap.ts` 中的 `DOCS_MAP` 对象。

### 修改目录行为
编辑 `toc.ts` 中的相关函数。
