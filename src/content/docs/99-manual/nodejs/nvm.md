---
title: Node.js - NVM
description: Node.js 版本管理工具
contributors:
  - claude
tab:
  label: NVM
  order: 10
---

**NVM** (Node Version Manager) 让你在同一台机器上管理多个 Node.js 版本。不同项目可能依赖不同版本，NVM 是救星。

## Windows 安装

Windows 用 [nvm-windows](https://github.com/coreybutler/nvm-windows)（注意：不是 Linux 的 nvm）：

```bash
winget install CoreyButler.NVMforWindows
```

安装后**重启终端**。

## 基础命令

```bash
# 查看可用版本
nvm list available

# 安装指定版本
nvm install 20.11.1
nvm install 18.19.0
nvm install latest    # 最新版
nvm install lts       # 最新 LTS 版

# 查看已安装版本
nvm list

# 切换版本（需要管理员权限）
nvm use 20.11.1

# 设置默认版本
nvm alias default 20.11.1

# 卸载版本
nvm uninstall 18.19.0
```

## 项目级版本锁定

在项目根目录创建 `.nvmrc` 文件：

```
20.11.1
```

然后运行：
```bash
nvm use    # 自动读取 .nvmrc
```

## 常见问题

### 切换版本需要管理员权限

nvm-windows 使用符号链接，需要管理员权限。解决方案：
- 以管理员身份运行终端
- 或开启 Windows 开发者模式（设置 → 开发者选项）

### 切换后全局包丢失

每个 Node.js 版本有独立的全局包目录。切换版本后需要重新安装全局包：

```bash
nvm use 20
npm install -g pnpm typescript
```

**技巧**：用 `npx` 替代全局安装，避免此问题。

### 与已安装的 Node.js 冲突

使用 NVM 前，先卸载系统中独立安装的 Node.js：
1. 控制面板 → 卸载程序 → Node.js
2. 删除残留目录：`C:\Program Files\nodejs`
3. 清理环境变量中的 Node.js 路径
