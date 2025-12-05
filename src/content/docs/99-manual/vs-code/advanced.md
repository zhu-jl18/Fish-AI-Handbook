---
title: VS Code - Advanced
description: VS Code 进阶配置与远程开发
contributors:
  - claude
tab:
  label: Advanced
  order: 30
---

## 远程开发

VS Code 的杀手锏：在本地编辑，在远程运行。

### WSL 开发

安装 [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) 扩展后：

```bash
# 在 WSL 中打开当前目录
code .
```

VS Code 会自动连接 WSL，所有终端、文件操作都在 Linux 环境执行。

### SSH 远程开发

安装 [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) 扩展：

1. `Ctrl+Shift+P` → "Remote-SSH: Connect to Host"
2. 输入 `user@hostname`
3. VS Code 会在远程服务器安装 server 组件

配置 `~/.ssh/config` 后可直接选择主机名连接。

### Dev Containers

安装 [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 扩展：

在项目根目录添加 `.devcontainer/devcontainer.json`：

```json
{
  "name": "Python Dev",
  "image": "mcr.microsoft.com/devcontainers/python:3.11",
  "postCreateCommand": "pip install -r requirements.txt"
}
```

团队成员 clone 后一键进入统一开发环境。

### GitHub Codespaces

云端开发环境，免费额度每月 60 小时：
- 在 GitHub 仓库点击 "Code" → "Codespaces"
- 或 `Ctrl+Shift+P` → "Codespaces: Create New Codespace"

## 多项目工作区

`.code-workspace` 文件管理多个文件夹：

```json
{
  "folders": [
    { "path": "./frontend" },
    { "path": "./backend" },
    { "path": "./docs" }
  ],
  "settings": {
    "files.exclude": { "**/node_modules": true }
  }
}
```

保存后双击 `.code-workspace` 打开整个工作区。

## 性能优化

```json
{
  // 排除大目录
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/dist": true
  },
  // 禁用不需要的功能
  "editor.minimap.enabled": false,
  "breadcrumbs.enabled": false,
  // 限制搜索范围
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true
  }
}
```

遇到卡顿先检查：`Ctrl+Shift+P` → "Developer: Open Process Explorer"
