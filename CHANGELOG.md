# Changelog

本文件记录Fish AI Handbook项目的重要变更历史。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
项目版本遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Added

- 新功能和改进待发布

## [2025-10-17]

### Changed

- **buzz页面重构**：将"流行词汇"从单页结构改为多级结构
  - 新增三个子页面：Agent（智能体）、Vibe Coding（氛围编程）、Workflow（工作流）
  - 统一所有页面的.astro模板格式，提升代码一致性
  - 修复死链问题：更新LangChain文档链接、GitHub博客链接等
  - 完善测试覆盖：添加buzz页面的e2e测试

### Fixed

- 修复models.astro页面模板不一致问题
- 修复外部链接失效问题（LangChain、GitHub等）

## 之前的版本

### 已完成功能

- ✅ 站内搜索接入（Pagefind集成）
- ✅ 实现二级页面折叠（LeftSidebar分组可折叠并记忆）
- ✅ 禁止搜索引擎收录（robots meta + robots.txt）
- ✅ 进阶玩法模块重构（知识库、Agents、Workflow）
