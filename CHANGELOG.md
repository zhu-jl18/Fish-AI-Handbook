# Changelog

本文件记录 Fish AI Handbook 项目的重要变更历史。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
项目版本遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

（暂无）

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
