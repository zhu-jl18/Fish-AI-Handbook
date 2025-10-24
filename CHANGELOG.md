# Changelog

本文件记录 Fish AI Handbook 项目的重要变更历史。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
项目版本遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Fixed

- **理论学习章节导航**：修复理论学习（07-theoretical）章节缺失顶部导航入口的问题
  - 在 `src/config/navigation.ts` 中添加理论学习导航项，位于第 7 位（资源合集之后、配置指南之前）
  - 在 `src/scripts/docsMap.ts` 中添加 `theoretical: '07-theoretical'` 映射
  - 确保配置格式与其他一级页面完全一致

## [2025-10-24]

### Added

- **基础用法：AI 应用**：新增 "AI 应用" 二级页面（内容、路由、侧栏）
  - 内容文件：`src/content/docs/02-basic-usage/ai-apps/index.md`
  - 路由文件：`src/pages/basic-usage/ai-apps.astro`
  - 侧栏更新：在 `BASIC_USAGE_SIDEBAR` 中添加 AI 应用条目，替代原 Others 页面
  - 页面涵盖生产力工具、创意工具、专业工具等 AI 应用分类与使用建议
- **理论学习章节**：新增 07-theoretical 一级章节，专注于 AI 理论知识与学术研究
  - 内容文件：`src/content/docs/07-theoretical/index.md`（一级页面）
  - 内容文件：`src/content/docs/07-theoretical/grpo/index.md`（二级页面 GRPO）
  - 路由文件：`src/pages/theoretical/index.astro` 和 `src/pages/theoretical/grpo/index.astro`
  - 侧栏更新：在 `src/scripts/sidebars.ts` 新增 `THEORETICAL_SIDEBAR` 常量，并在 `getSidebarForPath` 中注册 `/theoretical` 路径
  - 访问路径：`/theoretical` 和 `/theoretical/grpo`
- **配置指南：Claude Code - CCR**：新增 Claude Code 的 CCR 插件三级页面
  - 内容文件：`src/content/docs/99-setup/claude-code/ccr.md`
  - 路由文件：`src/pages/setup/claude-code/ccr.astro`
  - 侧栏更新：将 `SETUP_SIDEBAR` 中的 Claude Code 从单项改为带子项的分组结构
  - 页面内容包含插件简介、安装、基础配置、高级用法、常见问题等章节（占位框架）
- **术语扫盲：衍生词**：新增 glossary 下三级页面“衍生词”（derived-terms）与路由
- 内容文件：`src/content/docs/01-fish-talks/glossary/derived-terms.md`
- 路由文件：`src/pages/fish-talks/glossary/derived-terms.astro`
- 侧栏更新：在“术语扫盲”分组下新增子项“衍生词”

### Changed

- **基础用法：编辑器重命名**：将 AI IDE 从 editor-agent 重命名为 ide-agent，统一命名规范
  - 内容迁移：`src/content/docs/02-basic-usage/editor-agent/` → `ide-agent/`
  - 路由重构：`src/pages/basic-usage/editor-agent.astro` → `ide-agent.astro`
  - 侧栏更新：`BASIC_USAGE_SIDEBAR` 中路径从 `/basic-usage/editor-agent` 改为 `/basic-usage/ide-agent`
  - 索引页更新：`02-basic-usage/index.md` 中引用链接同步更新
  - 完全删除旧路径，无重定向
- **鱼说必看 - 结构重构**：将"模型排行"从二级页面迁移为 Models 下的三级页面
  - 内容迁移：`llm-rankings/index.md` → `models/llm-rankings.md`（三级单页）
  - 路由重构：`models.astro` → `models/index.astro`；新增 `models/llm-rankings.astro`
  - 侧栏更新：Models 改为带子项的分组结构，新增"模型排名"子项
  - 完全删除旧路径：移除 `01-fish-talks/llm-rankings/` 和 `pages/fish-talks/llm-rankings.astro`
  - 访问路径：`/fish-talks/models/llm-rankings`
- **文档规范强化：禁止路径重定向原则**：在 AGENTS.md、CONTRIBUTING.md、README.md 中明确
  - 内容结构调整时必须完全删除旧路径，重新构建路由，禁止使用重定向
  - 原则：确保完全一致性、简洁性和可维护性
- **文档规范强化：三级内容结构陷阱防范**：修正并补充 AGENTS.md、CONTRIBUTING.md、WARP.md、README.md 中关于三级内容结构的表述
  - **问题根因**：原表述"三级 `*.md`"存在歧义，未排除"文件夹+index.md"结构；Astro 的 `getEntry` 对两种结构都识别（容错性），导致错误结构不报错
  - **AGENTS.md（4处）**：
    - 修正"新增二级/三级"表述，明确"三级：单页 `.md` 文件（禁止使用'文件夹+index.md'）"
    - 新增专节"3.1 三级结构陷阱与强制约束"，包含正误结构对比、Astro 容错性警示、叶子节点性质说明
    - 质量门禁补充"三级必须单页 .md，不得用文件夹+index.md"约束
    - 故障排查新增"三级结构错误"诊断条目
  - **CONTRIBUTING.md（2处）**：补充正确/错误示例对比；新增"结构反模式"章节，明确三种禁止模式及原因
  - **WARP.md（2处）**：层级限制补充 Astro 容错性陷阱警示；常见陷阱表格新增"三级结构错误"条目
  - **README.md（1处）**："常见坑与反模式"新增三级结构错误提示
  - **效果**：统一使用"单页 `.md`"术语，提供可视化对比，强调 Astro 不报错但违反规范的隐蔽错误
- **鱼说必看 - 术语扫盲三级页面规范化**：修复 `glossary` 下第三级页面文件组织形式
  - 扁平化：`glossary/ai-concepts/index.md` → `glossary/ai-concepts.md`（三级为单页 .md）
  - 扁平化：`glossary/model-params/index.md` → `glossary/model-params.md`（三级为单页 .md）
  - 清理重复路径：删除错误的二级路径 `01-fish-talks/model-params/`（与三级路径重复）
  - 路由与侧栏保持不变（Astro `getEntry` 对文件/文件夹结构透明）
  - 符合项目规范：一级/二级为文件夹+index.md，三级为单页 .md（见 CONTRIBUTING.md）
- **Claude Code 路由结构重构**：将二级页面改为支持三级子页面的目录结构
  - 迁移：`src/pages/setup/claude-code.astro` → `src/pages/setup/claude-code/index.astro`
  - 更新导入路径层级：从 `../../` 提升为 `../../../`（因目录层级增加）
  - 路由访问保持不变：`/setup/claude-code` 仍为二级页面入口
  - 新增三级页面：`/setup/claude-code/ccr`

### Fixed

- 无

### Removed

- **基础用法：移除 Others 页面**
  - 删除内容：`src/content/docs/02-basic-usage/others/` 文件夹及 `index.md`
  - 删除路由：`src/pages/basic-usage/others.astro`
  - 侧栏移除：从 `BASIC_USAGE_SIDEBAR` 中移除 Others 条目
  - 索引页更新：从 `02-basic-usage/index.md` 中移除 Others 引用
  - 由新的"AI 应用"页面替代
- **移除"流行词汇（buzz）"模块**
  - 删除内容：`src/content/docs/01-fish-talks/buzz/` 全部文件
  - 删除路由：`src/pages/fish-talks/buzz/` 全部页面
  - 删除测试：`tests/e2e/buzz.spec.ts`

## [2025-10-23]

### Added

- **配置指南：MCP Router**：新增 "MCP Router" 二级页面（内容、路由、侧栏）
  - 内容文件：`src/content/docs/99-setup/mcp-router/index.md`
  - 路由文件：`src/pages/setup/mcp-router/index.astro`
  - 侧栏更新：在 `SETUP_SIDEBAR` 中在 Codex 后添加 MCP Router 条目
  - 页面内容为占位框架，后续可替换为正式内容
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

- **99-setup 文件结构规范化**：将所有二级页面迁移为文件夹+index.md结构
  - 迁移文件：git.md → git/index.md, nodejs.md → nodejs/index.md, terminal.md → terminal/index.md, vpn.md → vpn/index.md, vs-code.md → vs-code/index.md
  - 符合项目规范：二级页面必须使用文件夹+index.md形式，便于后续扩展三级页面
  - 路由和侧边栏无需修改：Astro 的 getEntry 自动识别两种结构
  - 内容完整保留，frontmatter 无损，UTF-8 编码正确
- **代码块样式重构**：完全迁移至 Expressive Code 原生配置系统
  - 移除 `src/styles/global.css` 中 107 行手动维护的样式覆盖代码
  - 通过 `src/config/code.ts` 的 `styleOverrides` 配置统一管理所有代码块样式
  - 利用 CSS 变量引用（`var(--code-bg)` 等）复用项目设计令牌
  - 配置 `styleOverrides.frames` 实现自定义复制按钮样式和交互效果
  - 新增完整的 TypeScript 类型定义，提供编辑器自动补全和类型检查
  - 视觉效果保持完全一致，维护成本降低约 90%
  - 消除与库默认样式的冲突风险，更易于跟进版本更新
  - 保留最小化必要样式（仅代码块外边距，3 行代码）
- **代码块样式统一化**：禁用终端框架自动检测，确保所有代码块显示一致
  - 在 `src/config/code.ts` 中设置 `defaultProps.frame: 'code'`
  - 禁用 bash/powershell 等语言的终端窗口样式自动检测
  - 所有代码块统一使用 GitHub 风格的代码编辑器框架样式
  - 保持边框、圆角、背景色、复制按钮等视觉元素的完全一致
  - 移除 `terminal.md` 中冗余的局部 `frame="code"` 属性
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
