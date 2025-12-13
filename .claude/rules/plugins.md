---
paths: src/plugins/**/*
---

# src/plugins - Remark 插件模块

## 模块概览

Remark / Rehype 插件集合，扩展 Markdown 语法与渲染性能。

## 文件清单

| 文件 | 功能 | 语法 |
|------|------|------|
| `remark-spoiler-directive.js` | Spoiler 遮罩效果 | `:spoiler[]`, `:::spoiler` |
| `remark-gallery-directive.js` | 图片画廊布局 | `:::gallery{cols gap ratio}` |
| `remark-mark-directive.js` | 文本高亮 | `:mark[]` |
| `remark-list-spacing.js` | 列表间距处理 | - |
| `remark-lazy-images.js` | 图片懒加载属性 (loading/decoding) | - |
| `remark-frontmatter-last-modified.mjs` | 注入最后修改时间 | - |
| `remark-math` (依赖) | 解析数学公式 | `$...$` / `$$...$$` |
| `rehype-katex` (依赖) | 渲染数学公式 | 与 `hasMath` frontmatter 联动 |

## 插件配置

在 `astro.config.mjs` 中注册：

```javascript
markdown: {
  remarkPlugins: [
    remarkListSpacing,
  remarkMath,
  remarkDirective,           // 基础指令支持
  remarkGalleryDirective,
  remarkSpoilerDirective,
  remarkMarkDirective,
  remarkModifiedTime,
  remarkLazyImages,
  ],
  rehypePlugins: [rehypeKatex],
}
```

## Spoiler 插件

### 语法
```markdown
行内: :spoiler[隐藏文本]
块级叶子: ::spoiler[单行隐藏]
块级容器:
:::spoiler
多行隐藏内容
:::
```

### 渲染
- 生成 `<span class="spoiler">` 元素
- 样式在 `src/styles/global.css`
- 交互在 `public/scripts/spoiler.js`

## Gallery 插件

### 语法
```markdown
:::gallery{cols=2 gap=18 ratio=1/1}
![图1](url1)
![图2](url2)
:::
```

### 参数
| 参数 | 默认值 | 说明 |
|------|--------|------|
| `cols` | 2 | 列数 |
| `gap` | 12px | 间距 |
| `ratio` | auto | 宽高比 |

### 渲染
- 生成 `<div class="image-gallery">` 容器
- CSS Grid 布局，样式在 `src/styles/global.css`

## Mark 插件

### 语法
```markdown
:mark[高亮文本]
```

### 渲染
- 生成 `<mark>` 元素，样式继承全局排版

## Math 管线
- 语法：行内 `$x^2$`，块级 `$$ E=mc^2 $$`
- 解析：`remark-math`
- 渲染：`rehype-katex`
- **加载策略**：当页面（含任一标签页）声明 `hasMath: true` 时，BaseLayout 才会注入 KaTeX CSS

## 图片懒加载
- `remark-lazy-images` 为所有 Markdown 图片添加 `loading="lazy"`、`decoding="async"`，无需手动标记

## 修改指南

### 新增插件
1. 在本目录创建 `.js` 或 `.mjs` 文件
2. 在 `astro.config.mjs` 注册
3. 在 `src/styles/global.css` 添加样式
4. 更新 `CONTRIBUTING.md` 文档

### 修改现有插件
直接编辑对应文件，注意同步更新相关样式和文档。
