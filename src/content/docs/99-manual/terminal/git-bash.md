---
title: Terminal - Git Bash
description: Git Bash 配置与美化
contributors:
  - claude
tab:
  label: Git Bash
  order: 30
---

Git Bash 是 Git for Windows 自带的 Bash 环境，轻量且兼容 Linux 命令。

## 安装

安装 [Git for Windows](https://git-scm.com/download/win) 时自动包含 Git Bash：

```bash
winget install Git.Git
```

## oh-my-posh 美化

```bash
# 安装 oh-my-posh（如果还没装）
winget install JanDeDobbeleer.OhMyPosh -s winget

# 编辑 ~/.bashrc
notepad ~/.bashrc
```

在 `.bashrc` 中添加：
```bash
eval "$(oh-my-posh init bash --config ~/AppData/Local/Programs/oh-my-posh/themes/agnoster.omp.json)"
```

## 常用配置

在 `~/.bashrc` 中添加：

```bash
# 别名
alias ll='ls -la'
alias g='git'
alias gs='git status'
alias gp='git push'
alias gl='git pull'

# 代理（如需）
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890

# 默认编辑器
export EDITOR=code
```

## Windows Terminal 集成

Git Bash 需要手动添加到 Windows Terminal。打开设置 → 添加新配置文件：

```json
{
    "name": "Git Bash",
    "commandline": "C:\\Program Files\\Git\\bin\\bash.exe --login -i",
    "icon": "C:\\Program Files\\Git\\mingw64\\share\\git\\git-for-windows.ico",
    "startingDirectory": "%USERPROFILE%"
}
```

## 什么时候用 Git Bash？

- 习惯 Bash 语法但不想装 WSL
- 需要轻量级 Linux 命令环境
- 配合 Git 操作（虽然 PowerShell 也能用）

局限：不是完整 Linux 环境，某些 Linux 工具无法运行。需要完整 Linux 环境用 WSL 2。
