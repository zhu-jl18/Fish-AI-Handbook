# src/components - UI 组件模块

> [根索引](../../CLAUDE.md) > components

---

## 模块概览

本目录包含所有 Astro UI 组件，负责页面的视觉呈现和交互功能。

## 组件清单

| 组件 | 功能 | 依赖 |
|------|------|------|
| `Header.astro` | 页面头部导航栏（集成主题切换、RSS/Sitemap 复制） | `site.ts`, `navigation.ts` |
| `ThemeToggle.astro` | 亮/暗主题切换按钮 | `/public/scripts/theme-toggle.js` |
| `Footer.astro` | 页面底部 | - |
| `LeftSidebar.astro` | 左侧章节导航 | `sidebars.ts` |
| `RightSidebar.astro` | 右侧目录 (TOC) | `toc.ts` |
| `SearchDrawer.astro` | 搜索抽屉 (Pagefind) | `search.ts` |
| `MobileMenu.astro` | 移动端菜单 | - |
| `ContentActions.astro` | 内容操作栏 (编辑/分享) | - |
| `ContentTabSwitcher.astro` | 多标签内容切换栏 | `tabContent.ts` |
| `SidebarPanels.astro` | 侧栏面板切换容器 | - |
| `SidebarStructure.astro` | 文档结构视图 | - |
| `SidebarToc.astro` | 目录视图 | - |
| `SidebarContributors.astro` | 贡献者视图 | `site.ts` |
| `BackToTop.astro` | 返回顶部按钮 | - |
| `home/HeroSection.astro` | 首页 Hero 区块 | `site.ts` |
| `home/LinksSection.astro` | 首页推荐链接列表 | `home` collection 数据 |

## 组件依赖关系

```mermaid
graph TD
    BaseLayout[BaseLayout.astro] --> Header
    BaseLayout --> Footer
    ContentLayout[ContentLayout.astro] --> LeftSidebar
    ContentLayout --> RightSidebar
    ContentLayout --> ContentActions
    ContentLayout --> MobileMenu
    RightSidebar --> SidebarPanels
    SidebarPanels --> SidebarToc
    SidebarPanels --> SidebarStructure
    SidebarPanels --> SidebarContributors
    Header --> SearchDrawer
    Header --> ThemeToggle
```

## 关键组件说明

### Header.astro
头部导航组件，负责 Logo、导航链接与工具按钮。
- 依赖 `site.ts` 与 `navigation.ts` 提供文案与链接
- 内置主题切换、Chat Bot 外链、RSS/Sitemap 复制按钮
- 铃铛图标仅保留视觉占位，通知模块已下线，不再挂载 Popover

### ThemeToggle.astro
亮/暗主题切换按钮。
- 通过 `/scripts/theme-toggle.js` 更新 `data-theme`，持久化到 `localStorage`
- 内联预设脚本在 BaseLayout 中执行，避免主题闪烁

### SearchDrawer.astro
搜索功能入口，集成 Pagefind 搜索引擎。
- 通过 `data-pagefind-filter` 支持 `chapter:` 过滤
- 章节映射来自 `src/config/search.ts`

### LeftSidebar.astro
左侧导航栏，根据当前路由动态渲染对应章节的侧栏。
- 调用 `getSidebarForPath()` 获取侧栏配置

### RightSidebar.astro
右侧目录栏，包含三个面板：
1. 目录 (TOC) - 当前页面标题导航
2. 结构 - 文档结构树
3. 贡献者 - 页面贡献者信息

### ContentTabSwitcher.astro
GitHub 风格的多标签内容切换组件（全章节通用）。
- 当目录下存在 2+ 个 .md 文件时自动显示标签栏
- 支持键盘导航 (ArrowLeft/Right, Home/End)
- 通过 `tab:` frontmatter 配置标签名称和排序
- 由 `TabContentLayout.astro` 在任意章节调用

## 修改指南

1. 新增组件请保持 PascalCase 命名
2. 组件若依赖配置，需在本文档更新依赖关系
3. 涉及搜索/导航的改动需同步 `src/config/` 配置
