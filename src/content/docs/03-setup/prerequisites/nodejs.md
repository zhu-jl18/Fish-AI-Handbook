---
title: 环境准备 · Node.js
description: Node.js 的安装与基础配置。
---

# Node.js 的安装与基础配置

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时，它允许你在服务器端运行 JavaScript 代码。本项目依赖 Node.js 环境来安装依赖和运行开发服务器。

## 1. 下载与安装 Node.js

推荐从 [Node.js 官方网站](https://nodejs.org/zh-cn/download/) 下载 LTS (长期支持) 版本。LTS 版本更稳定，适合大多数用户。

### Windows

1.  访问 [Node.js 下载页面](https://nodejs.org/zh-cn/download/)。
2.  下载 Windows Installer (.msi) 64-bit 版本。
3.  运行下载的 `.msi` 文件，按照安装向导的提示进行操作。通常，一路点击“Next”并接受默认设置即可。
4.  安装程序会自动配置环境变量。

### macOS

1.  访问 [Node.js 下载页面](https://nodejs.org/zh-cn/download/)。
2.  下载 macOS Installer (.pkg) 版本。
3.  运行下载的 `.pkg` 文件，按照安装向导的提示进行操作。
4.  安装程序会自动配置环境变量。

### Linux (使用包管理器)

对于 Linux 用户，推荐使用系统自带的包管理器进行安装。

**Debian/Ubuntu:**

```bash
sudo apt update
sudo apt install nodejs npm
```

**CentOS/Fedora:**

```bash
sudo yum install nodejs npm
# 或者对于较新的 Fedora 版本
sudo dnf install nodejs npm
```

**通过 NVM (Node Version Manager) 安装 (推荐高级用户)**

NVM 允许你在同一台机器上安装和管理多个 Node.js 版本，这对于开发多个项目时非常有用。

1.  安装 NVM：
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
    安装完成后，关闭并重新打开你的终端，或者运行 `source ~/.bashrc` (或 `~/.zshrc` 等，取决于你的 shell)。

2.  安装 Node.js LTS 版本：
    ```bash
    nvm install --lts
    nvm use --lts
    ```
    你也可以安装特定版本，例如 `nvm install 20`。

## 2. 验证安装

安装完成后，打开你的终端或命令提示符，运行以下命令来验证 Node.js 和 npm (Node.js 包管理器) 是否成功安装：

```bash
node -v
npm -v
```

如果安装成功，你将看到 Node.js 和 npm 的版本号输出。

## 3. 配置 npm 镜像 (可选)

在中国大陆地区，由于网络原因，直接从 npm 官方源下载包可能会很慢。你可以配置 npm 使用淘宝镜像，以加快下载速度。

```bash
npm config set registry https://registry.npmmirror.com
```

要验证是否配置成功，可以运行：

```bash
npm config get registry
```

如果输出 `https://registry.npmmirror.com/`，则表示配置成功。

现在，你的系统已经准备好运行 Node.js 项目了。
