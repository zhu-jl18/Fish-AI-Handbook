# src/styles - 样式模块

> [根索引](../../CLAUDE.md) > styles

---

## 模块概览

全局 CSS 样式文件，定义站点的视觉表现。

## 文件清单

| 文件 | 功能 |
|------|------|
| `global.css` | 全局样式、组件样式、Markdown 渲染样式 |
| `right-sidebar.css` | 右侧栏特定样式 |

## global.css

主样式文件，包含：

### 样式分类
- **CSS 变量 / 主题**: 颜色、字体、间距等设计令牌；`data-theme="light"` 切换浅色主题
- **基础重置**: 元素默认样式重置
- **排版**: 标题、段落、链接等
- **组件样式**: 按钮、卡片、表格等
- **Markdown 渲染**: 代码块、列表、引用等
- **插件样式**: Spoiler、Gallery、Mark、高亮等扩展语法

### 关键类名
| 类名 | 用途 |
|------|------|
| `.spoiler` | Spoiler 遮罩效果 |
| `.spoiler.revealed` | Spoiler 已展开状态 |
| `.image-gallery` | 图片画廊容器 |
| `.image-gallery__item` | 画廊单项 |
| `.theme-transition` | 主题切换过渡（由 theme-toggle 脚本控制） |

### CSS 变量
```css
:root {
  --gallery-cols: 2;
  --gallery-gap: 12px;
  --gallery-ratio: auto;
  /* ... */
}
```

## right-sidebar.css

右侧栏专用样式，包含：
- TOC 目录样式
- 面板切换样式
- 滚动高亮效果

## 修改指南

### 修改全局样式
编辑 `global.css`，注意：
- 保持 CSS 变量命名一致性
- 新增组件样式需添加注释分隔

### 修改右侧栏样式
编辑 `right-sidebar.css`。

### 新增样式文件
1. 创建新 `.css` 文件
2. 在 `BaseLayout.astro` 中引入
