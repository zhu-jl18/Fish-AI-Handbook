---
title: Git
description: Git 配置与使用指南（2025）
contributors:
  - claude
---


[最好的 GitHub 教程 没有之一](https://www.bilibili.com/video/BV1pwC6BxEeb)

Git 是版本控制的事实标准。玩 AI 编程必须会用，因为：
- 代码助手需要 Git 来管理变更
- gh CLI 让 AI 自动创建 PR、修复 issue
- 多平台协作是常态

## 安装

```bash
winget install Git.Git
```

## 快速导航

| 标签 | 内容 |
| --- | --- |
| **多账号配置** | 凭证管理、SSH 多密钥、目录级配置 |
| **代理与镜像** | 中国大陆访问问题、Steam Community 302、镜像加速 |
| **gh CLI** | GitHub CLI 安装、AI 编程助手集成、自动化工作流 |
| **多平台** | GitHub / GitLab / Gitee 同仓库多远程配置 |

## 基础配置

```bash
# 设置用户信息
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 设置默认分支名
git config --global init.defaultBranch main

# 设置编辑器
git config --global core.editor "code --wait"
```
