---
title: MCP Router
description: AI 应用 MCP 配置统一管理
contributors:
  - claude
---

顾名思义，这部分介绍如何管理不同 AI 应用的 MCP 配置。

> 注：章节名 "MCP Router" 恰好与下面介绍的一款工具同名，纯属巧合。

## 痛点

每个 AI 应用都有自己的 MCP 配置文件：

| 应用 | 配置文件位置 |
| --- | --- |
| Claude Desktop | `claude_desktop_config.json` |
| Cursor | `.cursor/mcp.json` |
| Cline | `.cline/mcp_settings.json` |
| Windsurf | ... |

手动维护多份配置 = 痛苦。改一个 MCP Server，要改 N 个文件。

## 解决方案

使用 MCP 配置管理工具，统一配置、一键分发。

## 快速导航

| 标签 | 工具 | 类型 | 特点 |
| --- | --- | --- | --- |
| **MCP Router** | [MCP Router](https://github.com/nicepkg/mcp-router) | GUI | 图形界面，可视化配置分发 |
| **1MCP Agent** | [1MCP](https://github.com/1mcp-app/agent) | 终端 | 聚合代理，统一端点 |
| **Solution** | - | - | 我的配置方案（待补充） |

## MCP 配置基础

标准 MCP 配置 JSON 格式：

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name"],
      "env": {
        "API_KEY": "your-key"
      }
    }
  }
}
```

常用命令类型：
- `npx`：Node.js 包（最常用）
- `uvx`：Python 包
- `docker`：Docker 容器
