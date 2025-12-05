---
title: Node.js - npm & npx
description: 包管理与命令执行
contributors:
  - claude
tab:
  label: npm & npx
  order: 20
---

## npm 是什么？

**npm** (Node Package Manager) = 包管理器 + 全球最大的代码库。

安装 Node.js 时自动安装 npm。

## npm 核心命令

### 项目依赖管理

```bash
# 初始化项目（创建 package.json）
npm init -y

# 安装依赖（写入 dependencies）
npm install axios
npm i axios          # 简写

# 安装开发依赖（写入 devDependencies）
npm install -D typescript
npm i -D typescript  # 简写

# 安装 package.json 中的所有依赖
npm install
npm i

# 卸载依赖
npm uninstall axios
```

### 全局包管理

```bash
# 全局安装
npm install -g pnpm
npm i -g typescript

# 查看全局包
npm list -g --depth=0

# 卸载全局包
npm uninstall -g pnpm

# 查看全局包安装位置
npm root -g
```

### 运行脚本

`package.json` 中的 `scripts` 字段定义可执行命令：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest"
  }
}
```

```bash
npm run dev
npm run build
npm test      # test/start/stop 可省略 run
```

---

## npx 是什么？

**npx** = 包执行器，npm v5.2+ 自带。

**核心价值**：不全局安装，直接运行。

### 典型场景

```bash
# 创建项目（脚手架工具）
npx create-react-app my-app
npx create-vite my-app
npx create-next-app my-app

# 一次性工具
npx cowsay "Hello"
npx kill-port 3000
npx http-server

# 运行特定版本
npx node@18 -v
npx typescript@5.0 --version
```

### npx vs npm install -g

| 场景 | npm install -g | npx |
| --- | --- | --- |
| 经常用的工具 | ✅ 适合 | 每次下载慢 |
| 脚手架（用一次） | 占磁盘空间 | ✅ 用完即走 |
| 版本冲突 | 只能一个版本 | ✅ 可指定版本 |
| MCP 服务器 | 需要维护 | ✅ 自动最新 |

**MCP 配置常见 npx**：
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-filesystem", "/path"]
    }
  }
}
```

`-y` 参数：自动确认安装，不用手动输入 yes。

---

## npm vs pnpm vs yarn

| 包管理器 | 特点 |
| --- | --- |
| **npm** | 官方自带，最稳定 |
| **pnpm** | 速度快，节省磁盘（硬链接） |
| **yarn** | Facebook 出品，曾经更快，现在差不多 |

新手用 npm 足够。追求速度用 pnpm：

```bash
npm install -g pnpm
pnpm install
pnpm add axios
pnpm dev
```
