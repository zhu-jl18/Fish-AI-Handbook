---
title: MCP Router - GUI 工具
description: MCP Router 图形界面配置工具
contributors:
  - claude
tab:
  label: MCP Router
  order: 10
---

[MCP Router](https://github.com/nicepkg/mcp-router) 是一个 GUI 工具，用于可视化管理 MCP 配置。

## 特点

- **图形界面**：拖拽配置，无需手写 JSON
- **Client Permissions**：一键分发配置到多个 AI 应用
- **三种配置方式**：Manual / JSON / DXT

## 安装

从 [GitHub Releases](https://github.com/nicepkg/mcp-router/releases) 下载。

## Client Permissions

核心功能：集中管理不同 AI 客户端的访问权限。

配置每个 MCP Server 时，底部的 **"Client Permissions"** 区域列出了检测到的本地 AI 应用（Claude Desktop, Cursor, Cline 等）。

- **勾选应用**：该 MCP Server 自动注入到对应应用的配置文件
- **取消勾选**：从对应应用的配置中移除

## 三种配置格式

### Manual（手动配置）
在界面中逐项填写 Server Name, Command, Arguments, Environment。

### JSON
直接粘贴标准 MCP JSON 配置：

```json
{
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp@latest"],
  "env": {
    "CONTEXT7_API_KEY": "sk_..."
  }
}
```

### DXT
单行字符串格式，适合快速分享：

```
npx -y exa-mcp-server
```

## 注意事项

- 配置变更后需重启对应 AI 客户端生效
- 部分客户端检测依赖默认安装路径
- 如需统一代理端点或热重载，可考虑 **1MCP Agent**（终端工具）
