---
title: CCR
description: Claude Code Rules 插件的安装与配置指南。
---

本文为占位内容，将在后续迭代中补充真实配置细节。请参考本项目其他配置页面的写作风格与结构保持一致。

## 插件简介

CCR（Claude Code Rules）是 Claude Code 的规则扩展插件，用于统一代码智能补全与规则校验体验。

## 安装

- 在目标编辑器的插件市场搜索并安装：Claude Code Rules（CCR）。
- 如需离线安装，请在团队制品库中获取对应版本包。

## 基础配置

- 在工作区或用户级配置中启用 CCR。
- 示例占位键位（根据实际实现替换）：
  - ccr.enable: true
  - ccr.rulesPreset: "recommended"

## 高级用法

- 项目级规则覆盖：在项目根目录新增配置文件（如 .ccrrc 或 ccr.config），实现团队化规则落地。
- 与 CI 集成：在 CI 任务中增加 CCR 校验步骤，保障 PR 质量。

## 常见问题

- 插件未生效：确认已启用并与 Claude Code 主插件版本兼容。
- 规则冲突：逐步缩小生效范围或禁用冲突条目。

## 参考与后续

- 后续将补充：规则清单、最佳实践范例、常见 IDE 的 UI 引导截图。
