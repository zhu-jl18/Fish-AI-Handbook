# Fish-AI-Handbook 站点加载性能优化方案

> 创建日期: 2025-12-04
> 更新日期: 2025-12-04
> 状态: Phase 1 + Phase 2 + Phase 3 已完成
> 预期收益: FCP 15-25%↑, TBT 20-30%↑, LCP 10-20%↑

---

## 问题描述

优化基于 Astro 5 + Preact + MDX + KaTeX + Pagefind 构建的中文文档站点加载速度。

**当前瓶颈：**
- ~370KB 中文 Web 字体 (2 × woff2)
- 公共脚本未打包优化
- KaTeX CSS 全局加载 (~28KB)
- 远程图片未配置优化

---

## 当前状态分析

**技术栈：**
| 组件 | 版本/配置 | 状态 |
|------|-----------|------|
| Astro | 5.16.3 (static output) | ✅ 最新 |
| Preact | ^10.28.0 | ✅ |
| MDX | ^4.3.6 | ⚠️ 未启用 optimize |
| KaTeX | ^0.16.25 | ⚠️ 全局加载 |
| Pagefind | ^1.4.0 | ✅ 懒加载 |
| 中文字体 | Noto Sans SC (~185KB × 2) | ✅ woff2 + swap |

**构建产物：**
- HTML: 78 文件
- JS: 98 文件 (~618KB)
- CSS: 7 文件 (~118KB)
- 字体: 21 文件 (~616KB)

**已有优化：**
- ✅ CSS 代码分割
- ✅ 字体 preload + font-display: swap
- ✅ Vercel 缓存 (fonts/pagefind)
- ✅ DNS prefetch (media.makomako)

---

## 优化方案 (小批次分布式)

### Phase 1: 快速胜利 (零风险) ✅ 已完成

#### 1.1 启用 MDX 优化 ✅

**文件:** `astro.config.mjs`

```javascript
// 修改前
integrations: [
  mdx(),
  // ...
]

// 修改后
integrations: [
  mdx({
    optimize: true,
  }),
  // ...
]
```

**预期收益:** MDX 渲染速度提升 10-20%
**回滚:** 移除 `optimize: true`

---

#### 1.2 启用 SVG 实验性优化 (可选) ⏸️ 暂缓

**文件:** `astro.config.mjs`

```javascript
export default defineConfig({
  // ...
  experimental: {
    svgo: true,
  },
})
```

**注意:** 当前项目无独立 .svg 文件，影响有限。保留以备未来使用。

---

#### 1.3 Pagefind 分片预热 (官方 API) ✅

**文件:** `src/components/SearchDrawer.astro`

在现有 `loadPagefind()` 后添加预热逻辑：

```javascript
// 在 script 模块内添加
const preloaded = new Set()

const tryPreload = (char) => {
  const c = char?.toLowerCase()
  // 支持字母、数字、中文
  if (c && /[a-z0-9\u4e00-\u9fa5]/.test(c) && !preloaded.has(c)) {
    preloaded.add(c)
    pagefind?.preload(c)
  }
}

// 修改 openDrawer 函数，在 loadPagefind() 后添加
const openDrawer = async () => {
  if (isOpen || !drawer) return
  positionPanel()
  updateScopes()
  isOpen = true
  drawer.classList.add('open')
  drawer.setAttribute('aria-hidden', 'false')
  window.requestAnimationFrame(() => {
    input?.focus()
  })
  
  // 加载引擎后预热常用首字母
  await loadPagefind()
  tryPreload('a')
  
  emitState()
}

// 在 input keyup 事件中添加预热
input?.addEventListener('keyup', (e) => {
  const value = e.target?.value || ''
  if (value.length > 0) {
    tryPreload(value[0])
  }
})
```

**验收标准:**
- ✅ 首次搜索响应更快
- ✅ 无 404 分片请求
- ✅ Network 面板可见预热请求

**回滚:** 移除 `tryPreload` 相关代码

---

#### 1.4 外部域名 Preconnect ✅

**文件:** `src/layouts/BaseLayout.astro`

```html
<!-- 在现有 preconnect 后添加 -->
<link rel="preconnect" href="https://static.woshipm.com" crossorigin />
<link rel="preconnect" href="https://framerusercontent.com" crossorigin />
```

---

#### 1.5 Vercel 缓存头优化 ✅

**文件:** `vercel.json`

```json
{
  "headers": [
    {
      "source": "/_astro/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        },
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    },
    {
      "source": "/pagefind/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

---

### Phase 2: JavaScript 优化 (低风险) ✅ 已完成

#### 2.1 延迟非关键脚本 ✅

**文件:** `src/layouts/BaseLayout.astro`

```html
<!-- 修改前 -->
<script is:inline type="module" src="/scripts/lightbox.js"></script>
<script is:inline type="module" src="/scripts/spoiler.js"></script>
<script is:inline type="module" src="/scripts/relative-time.js"></script>

<!-- 修改后：使用 defer + 条件加载 -->
<script>
  // Lightbox: 仅当页面有图片时加载
  if (document.querySelector('.content-inner img')) {
    import('/scripts/lightbox.js')
  }
  
  // Spoiler: 仅当页面有 spoiler 元素时加载
  if (document.querySelector('.spoiler')) {
    import('/scripts/spoiler.js')
  }
  
  // Relative-time: DOMContentLoaded 后加载
  document.addEventListener('DOMContentLoaded', () => {
    import('/scripts/relative-time.js')
  })
</script>
```

**预期收益:** TBT 减少 ~50-100ms

---

#### 2.2 打包公共脚本 (可选) ⏸️ 暂缓

将 `public/scripts/*.js` 移动到 `src/scripts/` 并通过 Astro 打包。

**暂不实施** - Phase 2.1 的条件加载已提供足够优化。

---

### Phase 3: CSS/字体优化 (中等风险) ✅ 已完成

#### 3.1 KaTeX CSS 条件加载 ✅

**方案: Frontmatter 标记**

在使用数学公式的 4 个文件中添加：

```yaml
---
title: xxx
hasMath: true
---
```

**文件:** `src/styles/global.css`

```css
/* 移除这行 */
@import 'katex/dist/katex.min.css';
```

**文件:** `src/layouts/ContentLayout.astro`

```astro
---
// 从 entry.data 获取 hasMath
const hasMath = entry?.data?.hasMath ?? false
---

{hasMath && (
  <link rel="stylesheet" href="/katex/katex.min.css" />
)}
```

**已标记的文件 (3个，benchmark 无数学公式):**
1. ✅ `src/content/docs/01-concepts/model-params/temperature-top-p-k.md`
2. ✅ `src/content/docs/03-prompts/index.md`
3. ✅ `src/content/docs/01-concepts/model-params/index.md`

**预期收益:** ~28KB CSS 节省 (95% 页面)

---

#### 3.2 字体优化 (暂缓)

当前字体配置已合理：
- ✅ woff2 格式 (最优压缩)
- ✅ font-display: swap
- ✅ preload 关键字体

进一步优化需要：
- 自定义字符子集工具
- 100+ 分片文件管理
- 复杂构建流程

**结论:** 投入产出比低，暂不实施。

---

### Phase 4: 图片优化 (中等风险)

#### 4.1 配置远程图片域名

**文件:** `astro.config.mjs`

```javascript
export default defineConfig({
  // ...
  image: {
    domains: [
      'media.makomako.dpdns.org',
      'static.woshipm.com',
      'framerusercontent.com',
    ],
  },
})
```

---

#### 4.2 Markdown 图片优化插件 (可选)

创建 remark 插件自动为图片添加 `loading="lazy"` 和 `decoding="async"`。

**文件:** `src/plugins/remark-lazy-images.js`

```javascript
import { visit } from 'unist-util-visit'

export default function remarkLazyImages() {
  return (tree) => {
    visit(tree, 'image', (node) => {
      const data = node.data || (node.data = {})
      const props = data.hProperties || (data.hProperties = {})
      props.loading = props.loading || 'lazy'
      props.decoding = props.decoding || 'async'
    })
  }
}
```

**在 astro.config.mjs 中注册:**

```javascript
import remarkLazyImages from './src/plugins/remark-lazy-images.js'

export default defineConfig({
  markdown: {
    remarkPlugins: [
      // ... 现有插件
      remarkLazyImages,
    ],
  },
})
```

---

### Phase 5: 构建性能 (可选)

#### 5.1 增加构建并发

**文件:** `astro.config.mjs`

```javascript
export default defineConfig({
  build: {
    concurrency: 2, // 默认为 1
  },
})
```

**注意:** 监控内存使用，如遇问题改回 1。

---

## 实施顺序

| 优先级 | 任务 | 风险 | 预期收益 |
|--------|------|------|----------|
| 1 | Phase 1.1 MDX optimize | 零 | 中 |
| 2 | Phase 1.5 Vercel headers | 零 | 中 |
| 3 | Phase 1.3 Pagefind preload | 零 | 中 |
| 4 | Phase 1.4 Preconnect | 零 | 低 |
| 5 | Phase 2.1 Defer scripts | 低 | 中 |
| 6 | Phase 3.1 KaTeX conditional | 中 | 高 |
| 7 | Phase 4.1 Image domains | 低 | 低 |
| 8 | Phase 4.2 Lazy images | 中 | 中 |

**跳过项:**
- ~~Phase 1.2 SVG~~ - 无独立 SVG 文件
- ~~Phase 2.2 Bundle scripts~~ - 条件加载已足够
- ~~Phase 3.2 Font subset~~ - 复杂度高
- ~~Phase 5.2 Content Layer~~ - 已用 content collections

---

## 验收标准

### Lighthouse 指标

| 指标 | 当前 | 目标 |
|------|------|------|
| FCP | - | ≤ 1.5s |
| LCP | - | ≤ 2.5s |
| TBT | - | ≤ 200ms |
| CLS | - | ≤ 0.1 |

### 功能验收

- [ ] 搜索功能正常，首次响应更快
- [ ] 数学公式页面渲染正确
- [ ] 图片懒加载生效
- [ ] 主题切换正常
- [ ] 移动端体验无退化

---

## 回滚方案

每个优化项都是独立的，可单独回滚：

1. **MDX optimize:** 移除 `optimize: true`
2. **Pagefind preload:** 移除 `tryPreload` 相关代码
3. **Vercel headers:** 还原 `vercel.json`
4. **Defer scripts:** 改回 `is:inline` 加载
5. **KaTeX conditional:** 恢复全局 `@import`
6. **Image domains:** 移除 `image.domains` 配置

---

## 参考资料

- [Astro 5 Performance](https://docs.astro.build/en/guides/performance/)
- [Pagefind API - preload()](https://pagefind.app/docs/api/#preloading-search-terms)
- [Vercel Caching Headers](https://vercel.com/docs/edge-network/headers)
- [Web Vitals](https://web.dev/vitals/)
