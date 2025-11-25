---
title: MCP Router 配置指南
description: Why Choosing MCP Router
contributors: [gemini]
---


## 多应用权限管理 (Client Permissions)

MCP Router 的核心功能之一是集中管理不同 AI 客户端的访问权限。

在配置每个 MCP Server 时，底部的 **"Client Permissions"** 区域列出了检测到的本地 AI 应用（如 Claude Desktop, Cursor, Windsurf, Cline 等）。

*   **勾选应用**: 该 MCP Server 会自动注入到对应应用的配置文件中。
*   **取消勾选**: 该 MCP Server 会从对应应用的配置中移除。

这使得你可以在一个地方（MCP Router）统一管理所有 AI 助手的工具库，而无需手动编辑每个应用的 json 配置文件。


## 三种配置方式

MCP Router 支持三种灵活的配置格式，满足不同场景需求：

### 1. Manual（手动配置）
最直观的方式，适合初次配置。在界面中逐项填写 Server Name, Command, Arguments, Environment 等字段。

### 2. JSON
适合从文档或他人分享中快速导入。直接粘贴标准的 MCP JSON 配置对象。

**示例：Context7 JSON 配置**
```json
{
  "command": "npx",
  "args": ["-y", "@upstash/context7-mcp@latest"],
  "env": {
    "CONTEXT7_API_KEY": "sk_..."
  }
}
```

### 3. DXT
极致简化的单行字符串格式，适合快速分享。

**示例：Exa Search DXT 配置**
```
npx -y exa-mcp-server
```

---

## MCP 服务类型

MCP Server 根据运行方式分为 **Local（本地）** 和 **Remote（远程）** 两大类。

### Local Server (本地运行)
由 MCP Router 在本地启动和管理进程。

*   **npx (Node.js)**: 最常用的方式。无需预先安装，通过 `npx` 动态下载并运行 Node.js 编写的 MCP Server。
*   **uvx (Python)**: 推荐用于 Python 编写的 MCP Server。`uvx` 是 `uv` 包管理器的工具，能快速创建隔离环境并运行工具，无需处理复杂的 Python 依赖。
*   **docker**: 将 MCP Server 运行在 Docker 容器中。提供最强的隔离性，适合需要复杂系统依赖的服务。

### Remote Server (远程连接)
连接到已经运行在其他地方（本地其他端口或远程服务器）的 MCP 服务。

*   **HTTP**: 标准的 HTTP/HTTPS 连接。需要提供 URL 和可选的 Headers (如 API Key)。
*   **SSE (Server-Sent Events)**: 基于 SSE 的流式连接，适用于需要服务器主动推送数据的场景。

---

## 常用 MCP Server 推荐

### 1. Serena (AI 编程助手)
强大的 AI 编程工具箱，提供代码检索和编辑能力。

*   **Type:** `Local Server`
*   **Command:** `uvx`
*   **Arguments:** `--from git+https://github.com/oraios/serena serena start-mcp-server`
*   **说明:** 使用 `uvx` 直接从 GitHub 源码运行，确保使用最新版本。

### 2. Context7 (文档增强)
为 AI 提供准确的库文档和 API 参考，减少幻觉。

*   **获取 Key:** [Context7 Dashboard](https://context7.com/dashboard)
*   **Type:** `Local Server`
*   **Command:** `npx`
*   **Arguments:** `-y @upstash/context7-mcp@latest`
*   **Environment:** `CONTEXT7_API_KEY=your_key_here`

### 3. Shrimp Task Manager (任务管理)
专为 AI Agent 设计的智能任务管理系统，支持任务拆解和进度追踪。

*   **Type:** `Local Server`
*   **Command:** `npx`
*   **Arguments:** `-y mcp-shrimp-task-manager`
*   **Environment:** `OPENAI_API_KEY=your_openai_key` (通常需要 LLM 能力)

### 4. Exa Search (AI 搜索)
专为 AI 优化的搜索引擎，提供高质量的搜索结果。

*   **获取 Key:** [Exa Dashboard](https://dashboard.exa.ai/)
*   **Type:** `Local Server`
*   **Command:** `npx`
*   **Arguments:** `-y exa-mcp-server`
*   **Environment:** `EXA_API_KEY=your_exa_key`

---

