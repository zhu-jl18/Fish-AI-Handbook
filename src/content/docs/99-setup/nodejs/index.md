---
title: Node.js 环境配置
description: Nodejs安装配置与使用指南。
---

## Why node.js and npm

**Node.js**是一个runtime,它让 JavaScript 脱离浏览器,从而用于后端服务与命令行等场景。

而**npm** (Node Package Manager) 是 Node.js 的官方包管理器,也是全球最大的软件注册表。它为开发者提供了:
- **海量代码库**:数百万个可重用代码包(Package),覆盖各类功能需求。
- **标准化依赖管理**:通过 `package.json` 文件,实现项目依赖的声明式管理与版本锁定。
- **自动化工作流**:利用 `scripts` 字段,定义和执行构建、测试、部署等项目生命周期任务。

此外,你一定注意到了在配置mcp的时候经常见到的**npx**,它是 npm v5.2+ 自带的包执行器。它允许开发者在不进行全局安装的情况下,直接运行 npm 仓库中的包。核心优势在于:
- **环境纯净**:避免因全局安装工具而造成的环境污染和版本冲突。
- **版本最新**:自动拉取最新版本的包来执行,确保工具链的时效性。
- **零成本试用**:方便地执行一次性命令或脚手架工具,无需长期占用磁盘空间。


## Install
安装我建议全量安装,不要只安装便携版,更进一步地如果你有开发需要我建议直接安装**nvm**进行版本管理,这里以只安装nodejs为例子:

从[Node.js 官网](https://nodejs.org/)下载安装包,运行 `.msi` 安装程序,确保勾选以下关键选项:
- **Add to PATH**:将 `node` 和 `npm` 命令添加到系统环境变量中。
- **npm package manager**:安装 npm。注意`ADD TO PATH`,然后验证:
```bash
# 验证 Node.js 版本
node -v
# > v20.11.1 或更高版本

# 验证 npm 版本
npm -v
# > 10.2.4 或更高版本
```

多讲一点,比如你`npm -g install @openai/codex@latest`
那么你会在npm在user层面的安装目录下有一个`codex.cmd`和`codex.exe`。


## Quick Ref
For `npm`,管理包:
```bash
npm -g list
npm -g install $package_name
npm -g uninstall $package_name
```
测试验证
```bash
npm run build
npm run dev
npm run preview
npm run test
```

For `npx`:
```bash
# npx 方式:直接运行,一步到位
npx create-react-app my-app
```

## 常见问题与解决方案

- `command not found` (命令未找到)
  - 原因:Node.js或者npm 的安装路径未被正确添加到系统的 `PATH` 环境变量中。
  - 解决方案:重新启动终端或计算机。如果问题依旧,请手动将 Node.js 安装目录 (通常是 `C:\Program Files\nodejs\`) 添加到系统环境变量 `Path` 中。

- `EPERM: operation not permitted` (权限问题)
  - 原因:在执行 `npm install -g` 等全局操作时,当前用户没有足够的权限。
  - 解决方案:以管理员身份运行您的终端 (例如,右键点击 Windows Terminal 并选择"以管理员身份运行")。

- `npm ERR! network` (网络问题)
  - 原因:网络连接不稳定或无法访问官方 npm 仓库 `https://registry.npmjs.org`。
  - 解决方案 (中国大陆用户):配置代理或者VPN开启TUN模式,或者选择npm镜像源。
