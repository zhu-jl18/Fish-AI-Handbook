---
title: "Node.js"
description: "前后端脚手架与大量 LLM SDK 的共同运行时"
---

## 官方地址

- Node.js：`https://nodejs.org/`
- Volta：`https://volta.sh/`（便捷的版本管理）
- nvm-windows：`https://github.com/coreybutler/nvm-windows`

## 安装（小白版）

- 最简单：去 Node.js 官网下载 LTS 安装包，下一步到完成。
- 想要多版本管理（推荐其一）：

```powershell
# 方案A：Volta（推荐、简单稳定）
Invoke-WebRequest https://get.volta.sh -UseBasicParsing | pwsh
volta install node@lts

# 方案B：nvm-windows
winget install CoreyButler.NVMforWindows
nvm install lts
nvm use lts
```

## 验证（可粘贴）

```bash
node -v
npm -v
npx -v
```

## 包管理与脚手架

- 初学用 npm 即可；需要更快可用 pnpm：

```bash
npm i -g pnpm
pnpm -v
```

- 常见脚手架：`npm create astro@latest`、`npm create vite@latest`。

## 小提示

- 使用 `.env` 与 `dotenv` 读取环境变量；Windows 下可用 `cross-env` 兼容设置。
