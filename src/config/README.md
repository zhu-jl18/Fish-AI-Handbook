# 配置文件说明

本目录集中管理站点的所有可配置变量，方便模板化与部署。

## 📁 文件结构

```
src/config/
├── index.ts         # 统一导出入口
├── site.ts          # 站点信息（URL、标题、SEO）
├── navigation.ts    # 导航配置（导航项、路由）
├── theme.ts         # 主题配置（排版、布局、响应式）
├── code.ts          # 代码块配置（Expressive Code）
└── README.md        # 本文档
```

---

## 🎯 配置文件详解

### 1. `site.ts` - 站点信息

包含站点的核心元数据，用于 SEO、社交分享、页面标题等。

**配置项：**

- `url` - 站点完整 URL（用于 sitemap、canonical 等）
- `title` - 站点简称（用于 Astro config）
- `titleFull` - 站点全称（用于页面标题）
- `description` - 站点描述（meta description）
- `logoMark` - Logo 标记文本（单字母）
- `logoImage` - Logo 图片 URL（可选，支持 GIF；为空则显示 logoMark 文本）
- `logoName` - Logo 主标题
- `logoMeta` - Logo 副标题
- `searchLabel` - 搜索按钮文案
- `avatarImage` - 个人头像图片 URL（可选，支持 GIF；为空则显示 logoMark 文本）
- `robots` - SEO robots 策略

**示例：**

```typescript
import { siteConfig, getRobotsContent } from '@/config'

// 获取站点 URL
const url = siteConfig.url

// 生成 robots meta 内容
const robotsContent = getRobotsContent(siteConfig.robots)
```

---

### 2. `navigation.ts` - 导航配置

管理顶部导航栏的所有链接与路由映射。

**配置项：**

- `items` - 导航项数组（`{ key, href, label }`）
- `validKeys` - 所有有效的导航键集合

**示例：**

```typescript
import { navigationConfig, getCurrentNavKey } from '@/config'

// 遍历导航项
navigationConfig.items.map((item) => {
  console.log(item.key, item.href, item.label)
})

// 根据路径获取当前导航键
const currentKey = getCurrentNavKey('/concepts/models')
// => 'concepts'
```

**修改导航：**
只需编辑 `navItems` 数组，即可调整导航栏顺序、添加或删除导航项。

---

### 3. `theme.ts` - 主题配置

集中管理排版与布局参数，支持响应式断点。

**配置分类：**

#### 排版参数

- `fontSizeBase` - 正文基础字号
- `fontSizeLg` - 大屏字号
- `lineHeightBase` - 正文行高
- `paragraphSpacing` - 段落间距
- `sectionSpacing` - 章节间距

#### 布局参数

- `layoutMaxWidth` - 整体布局最大宽度
- `contentMaxWidth` - 正文区域最大宽度
- `sidebarWidth` - 侧边栏宽度
- `layoutGap` - 布局元素间距

#### Header 参数

- `headerHeight` - Header 高度
- `headerTop` - Header 粘性定位的 top 值

#### 响应式断点

- `breakpoints.mobile` - 移动端断点（768px）
- `breakpoints.tablet` - 平板端断点（1024px）
- `breakpoints.laptop` - 笔记本断点（1200px）
- `breakpoints.desktop` - 桌面端断点（1440px）

**示例：**

```typescript
import { theme } from '@/config'

// 在 Astro 组件中使用
const style = `
  font-size: ${theme.fontSizeBase};
  max-width: ${theme.contentMaxWidth};
`

// 在 CSS 媒体查询中使用
@media (max-width: ${theme.breakpoints.tablet}) {
  // 平板样式
}
```

---

### 4. `code.ts` - 代码块配置

配置 Expressive Code 插件的样式与行为。

**配置项：**

- `themes` - 代码块主题数组
- `defaultProps` - 默认属性（换行、缩进）
- `styleOverrides` - 样式覆写（字号、内边距、圆角）
- `frames` - 功能配置（复制按钮、文件名提取）

**示例：**

```typescript
import { codeConfig } from '@/config'

// 在 astro.config.mjs 中使用
astroExpressiveCode({
  themes: codeConfig.themes,
  defaultProps: codeConfig.defaultProps,
  styleOverrides: codeConfig.styleOverrides,
  frames: codeConfig.frames,
})
```

---

## 🔧 使用指南

### 统一导入

推荐从 `index.ts` 统一导入：

```typescript
import {
  siteConfig,
  navigationConfig,
  theme,
  codeConfig,
  getCurrentNavKey,
  getRobotsContent,
} from '@/config'
```

或按需导入：

```typescript
import { siteConfig } from '@/config/site'
import { theme } from '@/config/theme'
```

### 在 Astro 组件中使用

```astro
---
import { siteConfig, theme } from '@/config'
---

<head>
  <title>{siteConfig.titleFull}</title>
  <meta name="description" content={siteConfig.description} />
</head>

<div style={`max-width: ${theme.contentMaxWidth}`}>
  <!-- 内容 -->
</div>
```

### 在 TypeScript 中使用

```typescript
import type { SiteConfig, Theme } from '@/config'

function processSiteConfig(config: SiteConfig) {
  console.log(config.url)
}
```

---

## 🚀 最佳实践

### 1. 修改配置

- ✅ **直接修改** `src/config/*.ts` 中的配置对象
- ❌ **不要硬编码** 在组件中直接写死配置值

### 2. 添加新配置

```typescript
// 在对应的配置文件中添加
export type SiteConfig = {
  // ... 现有配置
  newField: string // 新增字段
}

const siteConfig: SiteConfig = {
  // ... 现有配置
  newField: 'value',
}
```

### 3. 类型安全

所有配置都有完整的 TypeScript 类型定义，修改时会自动检查类型错误。

### 4. 与 CSS 变量同步

如果修改了 `theme.ts` 中的布局参数，确保同步更新 `src/styles/global.css` 中的对应 CSS 变量。

---

## 📦 部署与环境

### 环境变量支持

如需根据环境动态配置（如测试/生产站点 URL），可使用环境变量：

```typescript
// site.ts
const siteConfig: SiteConfig = {
  url: import.meta.env.PUBLIC_SITE_URL || 'https://default-url.com',
  // ...
}
```

### 多环境配置

可创建 `config.dev.ts`、`config.prod.ts`，并在构建时动态导入：

```typescript
const config = import.meta.env.PROD
  ? await import('./config.prod')
  : await import('./config.dev')
```

---

## 🔄 迁移记录

- **2025-10-22**: 初始化配置系统，抽离站点、导航、主题、代码块配置
- 从以下文件迁移：
  - `astro.config.mjs` → `site.ts` + `code.ts`
  - `BaseLayout.astro` → `site.ts`
  - `Header.astro` → `site.ts` + `navigation.ts`
  - `ContentLayout.astro` → `navigation.ts`
  - `global.css` → `theme.ts`（部分）

---

## 📖 相关文档

- [CONTRIBUTING.md](../../CONTRIBUTING.md) - 贡献指南
- [README.md](../../README.md) - 项目说明
- [AGENTS.md](../../AGENTS.md) - AI Agent 行为规则
