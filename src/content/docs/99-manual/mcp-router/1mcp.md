---
title: MCP Router - 1MCP Agent
description: 1MCP Agent 终端聚合工具
contributors:
  - claude
tab:
  label: 1MCP Agent
  order: 20
---

[1MCP Agent](https://github.com/1mcp-app/agent) 是一个终端工具，将多个 MCP 服务器聚合在一个统一端点后面。

## 为什么用 1MCP？

问题：AI 助手需要连接多个 MCP 服务器，管理数十个独立连接复杂且不可靠。

解决方案：1MCP 作为统一代理/多路复用器，一个连接代替多个。

## 特点

- **统一接口**：单一端点聚合多个 MCP 服务器
- **OAuth 2.1**：生产就绪的安全性
- **热重载**：修改配置无需重启
- **Tags 支持**：按标签过滤和组织服务器

## 安装

```bash
npm install -g @1mcp/agent
# 或使用 npx
npx -y @1mcp/agent --help
```

## 配置文件

创建 `mcp.json`：

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"],
      "tags": ["context7", "docs"],
      "disabled": false
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
      "tags": ["files"],
      "disabled": false
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"],
      "tags": ["browser", "web"],
      "disabled": false
    }
  }
}
```

## 启动代理

```bash
npx -y @1mcp/agent --config mcp.json --port 3000
```

代理运行后，AI 客户端连接到 `http://localhost:3000` 即可使用所有聚合的工具。

## 与 AI 应用集成

在 Claude Desktop 等应用中配置：

```json
{
  "mcpServers": {
    "1mcp": {
      "url": "http://localhost:3000"
    }
  }
}
```

一个连接，访问所有 MCP 服务器。

## 相比 MCP Router

| 特性 | MCP Router (GUI) | 1MCP Agent |
| --- | --- | --- |
| 界面 | 图形界面 | 终端 |
| 配置方式 | 分发到各客户端配置文件 | 统一代理端点 |
| 热重载 | 需重启客户端 | 支持 |
| Tags 过滤 | 不支持 | 支持 |
| 适用场景 | 可视化管理、快速配置 | 多服务器聚合、生产部署 |

注：MCP Router 另有 RouterMCP 网关版本，提供统一端点路由能力，详见其 GitHub 文档。

详细文档：[docs.1mcp.app/zh](https://docs.1mcp.app/zh)
