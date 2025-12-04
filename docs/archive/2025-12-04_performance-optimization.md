# Fish-AI-Handbook 站点加载性能优化方案

> 创建日期: 2025-12-04T08:00:00Z
> 完成日期: 2025-12-04T11:00:00Z
> 状态: ✅ Phase 1-4 已完成（Phase 5 暂缓）
> 预期收益: FCP 15-25%↑, TBT 20-30%↑, LCP 10-20%↑

---

## Git 提交历史

| Phase | Commit Hash | 描述 |
|-------|-------------|------|
| Phase 1 | `6487e352` | MDX optimize, Pagefind preload, Vercel cache headers |
| Phase 1.4 + Phase 2.1 | `a07cd8a3` | Preconnect external domains, defer non-critical scripts |
| Phase 3 | `5ad8aff7` | Conditional KaTeX CSS loading |
| Phase 4 | `bb8402d6` | Remote image domains + auto lazy loading |
| 文档 | `fe910eee` | CONTRIBUTING.md hasMath 说明 |

---

## 问题描述

优化基于 Astro 5 + Preact + MDX + KaTeX + Pagefind 构建的中文文档站点加载速度。

**优化前瓶颈：**
- ~370KB 中文 Web 字体 (2 × woff2)
- 公共脚本全局加载
- KaTeX CSS 全局加载 (~28KB)
- 远程图片未配置优化

---

## 实施结果

### Phase 1: 快速胜利 (零风险) ✅

| 任务 | 文件 | 状态 |
|------|------|------|
| 1.1 MDX optimize | `astro.config.mjs` | ✅ |
| 1.2 SVG 优化 | - | ⏸️ 暂缓（无 SVG 文件）|
| 1.3 Pagefind preload | `SearchDrawer.astro` | ✅ |
| 1.4 Preconnect | `BaseLayout.astro` | ✅ |
| 1.5 Vercel headers | `vercel.json` | ✅ |

### Phase 2: JavaScript 优化 (低风险) ✅

| 任务 | 文件 | 状态 |
|------|------|------|
| 2.1 条件加载脚本 | `BaseLayout.astro` | ✅ |
| 2.2 打包公共脚本 | - | ⏸️ 暂缓（2.1 已足够）|

### Phase 3: CSS/字体优化 (中等风险) ✅

| 任务 | 文件 | 状态 |
|------|------|------|
| 3.1 KaTeX CSS 条件加载 | `ContentLayout.astro`, `global.css`, `config.ts` | ✅ |
| 3.2 字体子集化 | - | ⏸️ 暂缓（复杂度高）|

**KaTeX 条件加载实现：**
- 新增 frontmatter 字段 `hasMath: true`
- KaTeX CSS 从 `node_modules` 移至 `public/katex/`
- 仅有 3 个页面需要 KaTeX，95% 页面节省 ~28KB

### Phase 4: 图片优化 (中等风险) ✅

| 任务 | 文件 | 状态 |
|------|------|------|
| 4.1 远程图片域名 | `astro.config.mjs` | ✅ |
| 4.2 懒加载插件 | `remark-lazy-images.js` | ✅ |

**配置的图片域名：**
- 自建图床: `media.makomako.dpdns.org`
- 第三方图床: `p.sda1.dev`, `static.woshipm.com`, `miro.medium.com`, `cloud.starkinsider.com`
- GitHub: `avatars.githubusercontent.com`, `raw.githubusercontent.com`
- 其他 CDN: `framerusercontent.com`, `registry.npmmirror.com`

### Phase 5: 构建性能 ⏸️ 暂缓

**原因：** 当前构建速度已可接受，增加并发可能引发内存问题。

---

## 关键变更文件

```
astro.config.mjs          # MDX optimize, image domains, remark-lazy-images
src/layouts/BaseLayout.astro    # preconnect, conditional scripts, hasMath prop
src/layouts/ContentLayout.astro # hasMath extraction, KaTeX CSS conditional
src/content/config.ts           # hasMath schema
src/styles/global.css           # 移除 KaTeX @import
src/components/SearchDrawer.astro # Pagefind preload
src/plugins/remark-lazy-images.js # 新增
public/katex/                   # KaTeX CSS + fonts
vercel.json                     # 缓存头优化
```

---

## 回滚方案

每项优化独立，可单独回滚：

1. **MDX optimize:** 移除 `optimize: true`
2. **Pagefind preload:** 移除 `tryPreload` 相关代码
3. **Vercel headers:** 还原 `vercel.json`
4. **Defer scripts:** 改回 `is:inline` 加载
5. **KaTeX conditional:** 恢复 `global.css` 的 `@import 'katex/dist/katex.min.css'`
6. **Image domains:** 移除 `image.domains` 配置

---

## 参考资料

- [Astro 5 Performance](https://docs.astro.build/en/guides/performance/)
- [Pagefind API - preload()](https://pagefind.app/docs/api/#preloading-search-terms)
- [Vercel Caching Headers](https://vercel.com/docs/edge-network/headers)
- [Web Vitals](https://web.dev/vitals/)
