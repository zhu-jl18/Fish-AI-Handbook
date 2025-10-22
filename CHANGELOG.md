# Changelog

本文件记录 Fish AI Handbook 项目的重要变更历史。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
项目版本遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Added

- **统一配置系统**：建立集中式配置管理体系，提升代码可维护性与模板化能力
  - 新增 `src/config/site.ts`：站点元数据（URL、标题、描述、Logo、SEO robots）
  - 新增 `src/config/navigation.ts`：导航配置（导航项、路由映射、当前导航键推导）
  - 新增 `src/config/code.ts`：代码块配置（Expressive Code 主题与样式）
  - 扩展 `src/config/theme.ts`：主题配置（排版、布局、响应式断点）
  - 新增 `src/config/index.ts`：统一导出入口
  - 新增 `src/config/README.md`：配置系统完整文档与使用指南
  - 应用到 `astro.config.mjs`、`BaseLayout.astro`、`Header.astro`、`ContentLayout.astro`
  - 消除硬编码：导航链接、站点信息、SEO 策略均从配置读取
  - 支持类型安全：所有配置项具有完整 TypeScript 类型定义
- **正文字体配置化**：新增 `src/config/theme.ts` 主题配置文件，集中管理正文排版参数
  - 将正文字体大小、行高等参数抽取为可配置项
  - 支持独立设置桌面端（fontSizeBase）和大屏（fontSizeLg）字号
  - 通过 ContentLayout.astro 内联样式注入，确保仅影响正文区域
  - 当前配置：正文基础字号 14px（原 16px），行高 1.7
  - 后续调整：仅需修改 theme.ts 文件即可
- 设计令牌（Design Tokens）：在 `global.css` 的 `:root` 增加一组颜色/表面令牌（保持原数值不变），用于统一管理：
  - 基础与边框：`--color-pure-black`、`--color-border-dark`、`--color-border-hover` 等
  - 文本与灰阶：`--color-text-white`、`--color-text-secondary`、`--color-accent-gray`
  - 浮层/TOC：`--color-bg-overlay-*`、`--color-text-overlay`、`--color-toc-*`
  - 半透明表面：`--surface-tint-02/03/06/08`
- 字体子集化工具脚本 `scripts/build_used_charset.py`：
  - 自动提取文档中实际使用的字符
  - 支持可选的常用汉字缓冲列表（scripts/common-zh-1000.txt）
  - 生成字符集供 pyftsubset 使用
- 添加 `tsconfig.json`，提供 Astro 项目标准 TypeScript 配置，包含严格类型检查和路径别名支持
- 新增 `npm run type-check` 脚本，用于 TypeScript 类型检查（使用 `tsc --noEmit`），增强代码质量保证

### Changed

- **CSS 样式优先级优化**：通过提高选择器特异性替代 !important，提升样式可维护性
  - 减少 !important 使用从 47 个降至 5 个（减少 89.4%）
  - 对 Expressive Code 代码块相关选择器加倍类名（`.expressive-code.expressive-code`）以提升特异性
  - 保留无障碍相关的必要 !important（`prefers-reduced-motion` 和 `.visually-hidden`）
  - 不改变视觉表现，仅优化 CSS 架构
- 样式重构（不改变视觉表现）：用上面的设计令牌替换以下文件中的硬编码颜色
  - `src/components/Header.astro`
  - `src/styles/global.css`
  - `src/styles/right-sidebar.css`
  - `src/components/LeftSidebar.astro`
- 右侧目录（TOC）悬停效果降级一档，保持 Active 对比度不变
  - Hover：使用更柔和的文字与更轻的背景（`--color-toc-hover` + `--color-toc-bg-hover`）
  - Active：维持 `--surface-tint-06` 与字重 600
- **字体加载性能优化**：Noto Sans SC 从 TTF 转换为 WOFF2 子集
  - 提取文档实际使用的1237个字符（含中文、英文、标点符号）
  - 生成 Regular (400) 与 SemiBold (600) 两个字重的 WOFF2 子集
  - 更新 `src/styles/global.css` 的 @font-face 声明
  - 更新 `src/layouts/BaseLayout.astro` 的字体预加载标签
  - 删除原始 TTF 文件
  - **体积减少**：从 20.6MB 降至 366KB（减少 98.2%）
  - 提供可维护的脚本，方便未来增量更新字符集

### Fixed

- 右侧目录（TOC）仅显示 h2 层级标题
  - 修复 `public/scripts/toc.js` 中默认 max 层级从 4 改为 2
  - 移除子级标题（h3/h4）的渲染逻辑，确保目录简洁清晰
  - 根因：静态资源目录中的 toc.js 覆盖了构建产物，导致层级配置不一致
- 行内代码圆角从 12px 降至 4px，内边距从 3px 8px 调整为 2px 6px，提升与黑白灰主题的视觉一致性
- 左侧栏分组切换按钮的垂直对齐与位置漂移问题
  - 将按钮定位锚点固定在父级链接那一行（新增 `.group-header` 包裹），展开/收起在同一位置
  - 优化按钮命中区域（24×24）与可访问性（hover/聚焦可见）

### Removed

- 无

## [2025-10-17]

### Added

- Mermaid 图表渲染支持
  - 客户端渲染方案，从 CDN 动态加载 Mermaid 库
  - 配置深色主题以匹配站点风格
  - 自动渲染所有 Markdown 中的 Mermaid 代码块
  - 添加错误处理和降级显示
  - 完全兼容 Vercel 部署
  - 新增 E2E 测试校验 Mermaid 在含图页面渲染为 SVG

- 样式优化提升阅读体验
  - 代码块添加语言标签显示
  - 优化代码块边框和背景色
  - 改进链接样式，添加悬停下划线效果
  - 提升文本对比度至 rgba(226, 232, 240, 0.95)
  - 优化 Mermaid 图表容器样式

- UI 布局优化 - 更紧凑的现代化设计
  - 采用居中容器布局方式，将侧边栏向中间收拢
  - 更新配色方案：使用更柔和的深色背景（#0a0b0d）
  - 统一圆角设计：大圆角 12px，小圆角 8px
  - 边框样式：极简的半透明边框（rgba(255, 255, 255, 0.08)）
  - 侧边栏改进：从 fixed 改为 sticky 定位，添加悬停高亮效果
  - 优化响应式断点，确保各屏幕尺寸下的良好体验

### Changed

- buzz页面重构：将"流行词汇"从单页结构改为多级结构
  - 新增三个子页面：Agent（智能体）、Vibe Coding（氛围编程）、Workflow（工作流）
  - 统一所有页面的.astro模板格式，提升代码一致性
  - 修复死链问题：更新LangChain文档链接、GitHub博客链接等
  - 完善测试覆盖：添加buzz页面的e2e测试

### Fixed

- 修复models.astro页面模板不一致问题
- 修复外部链接失效问题（LangChain、GitHub等）
- 调整搜索反馈消息 E2E 断言，兼容不同文案

## 之前的版本

### 已完成功能

- 站内搜索接入（Pagefind集成）
- 实现二级页面折叠（LeftSidebar分组可折叠并记忆）
- 禁止搜索引擎收录（robots meta + robots.txt）
- 进阶玩法模块重构（知识库、Agents、Workflow）
