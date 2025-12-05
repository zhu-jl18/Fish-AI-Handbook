---
title: Node.js
description: Node.js 安装配置与使用指南
---

## 什么是 Node.js？

**Node.js** = JavaScript 运行时，让 JS 脱离浏览器，用于后端服务、命令行工具、脚本自动化。

玩 AI 必须装，因为：
- 很多 AI 工具用 Node.js 开发（MCP 服务器、CLI 工具）
- 前端项目（如本文档站）依赖 Node.js 构建

## 快速导航

| 标签 | 内容 |
| --- | --- |
| **NVM** | 版本管理器，多版本共存、项目级版本锁定 |
| **npm & npx** | 包管理（npm）、命令执行（npx）、MCP 配置 |
| **常见问题** | 网络问题、权限问题、依赖冲突解决 |

## 快速安装

**方式 1**：直接安装（简单）

```bash
winget install OpenJS.NodeJS.LTS
```

**方式 2**：通过 NVM 安装（推荐，支持多版本）

```bash
winget install CoreyButler.NVMforWindows
# 重启终端后
nvm install lts
nvm use lts
```

## 验证安装

```bash
node -v   # 例如 v20.11.1
npm -v    # 例如 10.2.4
npx -v    # 与 npm 相同
```
