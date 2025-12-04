---
title: CC Switch - 冷切换工具
description: CC Switch 桌面应用配置
contributors:
  - claude
tab:
  label: CC Switch
  order: 10
---

[CC Switch](https://github.com/farion1231/cc-switch) 是一个跨平台桌面应用，支持 Claude Code、Codex、Gemini CLI 的多供应商切换。

## 特点

- **多供应商管理**：添加、切换不同 API 供应商
- **Prompt 管理**：保存和切换自定义 Prompt
- **环境变量检测**：自动检测冲突的环境变量
- **跨平台**：Windows / macOS / Linux

## 安装

从 [GitHub Releases](https://github.com/farion1231/cc-switch/releases) 下载对应平台安装包。

## 使用

1. **添加供应商**：填入 API Key 和 Base URL
2. **选择供应商**：点击切换当前使用的供应商
3. **启动 Claude Code**：应用会自动设置环境变量并启动

## 冷切换的含义

"冷切换"指：切换供应商后需要**重启 Claude Code 进程**才生效。

这是因为 Claude Code 启动时读取环境变量，运行中不会重新读取。

**适用场景**：
- 不需要频繁切换模型
- 想要简单直接的配置方式
- 每次任务使用固定供应商

## 类似工具

| 工具 | 特点 |
| --- | --- |
| [ccs](https://github.com/kaitranntt/ccs) | 支持 GLM、Kimi 等国产模型 |
| [claude-code-switch](https://github.com/foreveryh/claude-code-switch) | 支持多 Claude Pro 账号轮换 |
| [ccconfig](https://github.com/Danielmelody/ccconfig) | CLI 工具，轻量 |

如需运行中切换模型，使用 **CCR**（热切换）。
