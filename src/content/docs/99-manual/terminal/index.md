---
title: Terminal
description: 终端工具安装与配置全指南
---

本页介绍如何安装和配置终端工具，提升玩 AI 的体验。

## 终端三件套

终端有三个组成部分：

| 组件 | 说明 | 推荐 |
| --- | --- | --- |
| **终端外壳** | 窗口容器，负责显示和交互 | Windows Terminal |
| **Shell 内核** | 命令解释器 | PowerShell 7 / Fish |
| **Shell 插件** | 增强功能（补全、美化等） | oh-my-posh / PSReadLine |

默认的 CMD = 默认外壳 + CMD Shell + 无插件 = ugly + inconvenient。

## Windows Terminal（必装）

唯一推荐的终端外壳，微软官方出品：

```bash
winget install Microsoft.WindowsTerminal
```

<img src="https://static.woshipm.com/views/woshipm_api_def_20251028173629_3603.png" alt="Windows Terminal" width="80%">

其他终端我都试过了（WezTerm、Rio、Alacritty、Kitty），都不如 Windows Terminal 省心。

## 快速导航

| 标签 | 内容 |
| --- | --- |
| **CMD** | Clink 增强、oh-my-posh 美化 |
| **PowerShell 7** | 安装配置、插件（PSReadLine、posh-git、Terminal-Icons） |
| **Git Bash** | oh-my-posh、Windows Terminal 集成 |
| **WSL 2** | Fish Shell、Fisher 插件、常见问题 |
| **SSH** | Terminus、密钥配置、config 简化 |

## 通用技巧

### 配置代理

```bash
# PowerShell
$env:http_proxy="http://127.0.0.1:7890"
$env:https_proxy="http://127.0.0.1:7890"

# Bash / Fish
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
```

### oh-my-posh 主题

所有 Shell 都可以用 oh-my-posh 美化，安装后选主题：

```bash
# 安装
winget install JanDeDobbeleer.OhMyPosh -s winget

# 浏览主题
Get-PoshThemes
```

主题库：[ohmyposh.dev/docs/themes](https://ohmyposh.dev/docs/themes)
