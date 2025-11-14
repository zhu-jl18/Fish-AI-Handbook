---
title: 'MCP'
description: 'Model Context Protocol 原理与实用服务器配置'
contributors:
  - codex
  - minimax
---

## 要点速览
- MCP 只是 JSON-RPC（或 stdio）加 SSE 的组合：握手、调用、资源推送三段式，没有隐藏状态机。
- 安全边界在服务器：工具清单、资源、提示模板都由服务器声明，客户端只负责路由请求和展示结果。
- 下面 5 个服务器覆盖大部分实用场景：文档拉取（Context7）、代码检索（AceMCP）、浏览器操控（Playwright）、知识库抓取（DeepWiki）、通用检索（DuckDuckGo）。
- 所有示例均兼容 Claude Desktop / Cursor / VS Code MCP，保持 JSON 配置可复制即可用。

## 协议分层与数据流

MCP 会话由一次握手和多次工具调用组成；事件流用 SSE 推送。

```
+-----------+      SSE / stdio JSON-RPC      +-------------+
| AI Client |<------------------------------>| MCP Server  |
+-----------+                                +-------------+
     | init(capabilities)                           ^
     |--------------------------------------------->|
     | tool/resource invocation                     |
     |<---------------------------------------------|
     | resource.event (optional)                    |
```

1. init：客户端发送 `initialize`，服务器返回 tools/resources/prompts 与权限要求。
2. call：客户端按 schema 调用工具，服务器返回结构化结果或报错。
3. event：服务器可主动在 SSE 管道推资源更新，客户端是否订阅由配置决定。

## 重点服务器

### Context7 —— 实时官方文档
- **定位**：从官方文档、API 参考和 changelog 拉取最新文本，按版本和框架路由。
- **安装**：
  ```bash
  # Claude Code CLI
  claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key YOUR_KEY

  # 直接起本地进程
  npx -y @upstash/context7-mcp --api-key YOUR_KEY
  ```
- **配置**：
  ```json
  {
    "mcpServers": {
      "context7": {
        "command": "npx",
        "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_KEY"]
      }
    }
  }
  ```
- **使用要点**：
  - API Key 在 Upstash 控制台生成，最小化只读权限。
  - 提示词中显式写 `use context7`，客户端才会注入资料。
  - 支持 `--framework nextjs --version 14.2` 等参数锁定版本。
  - 远程模式（SSE）：`https://mcp.context7.com/mcp`，写入客户端的 remote 配置即可。

### AceMCP —— 代码语义检索
- **定位**：本地代码库向量索引 + 自然语言查询，服务端内置增量索引、.gitignore 支持和多编码 fallback。
- **安装**：
  ```bash
  uv tool install acemcp   # 全局安装
  # 或
  uvx acemcp               # 即时运行
  ```
- **配置**：
  ```json
  {
    "mcpServers": {
      "acemcp": {
        "command": "uvx",
        "args": ["acemcp"]
      }
    }
  }
  ```
- **使用要点**：
  - 默认工具 `search_context`，参数为 `project_path` 和自然语言问题。
  - 首次访问会写 `~/.acemcp/settings.toml`，在里面配置 `EXCLUDE_PATTERNS`、`TEXT_EXTENSIONS`、`BASE_URL` 等。
  - `--web-port 8888` 打开管理面板，可手动触发索引与查看日志。
  - 日志输出到 `~/.acemcp/log/acemcp.log`，不要放到 stdout，否则会破坏 MCP 协议。

### Playwright MCP —— 浏览器自动化
- **定位**：调用 Playwright 的可访问性树完成导航、交互、断言，比截图式方案稳定。
- **安装**：
  ```bash
  npx @playwright/mcp@latest --help
  ```
  首次运行会提示安装浏览器，Node.js ≥ 18。
- **配置**：
  ```json
  {
    "mcpServers": {
      "playwright": {
        "command": "npx",
        "args": ["@playwright/mcp@latest"]
      }
    }
  }
  ```
- **使用要点**：
  - 通过 `--caps=pdf`、`--caps=testing`、`--caps=tracing` 精简工具面。
  - 环境变量 `PLAYWRIGHT_BROWSERS_PATH=0` 可以强制使用本地缓存。
  - 默认输出无截图，若模型需要视觉，可改用 `browser_screenshot` 工具生成 PNG。
  - 调试时用 `PWDEBUG=console` 观察播放链路。

### DeepWiki MCP —— 结构化知识库
- **定位**：从 deepwiki.com 拉取整理后的 Markdown，适合检索框架演进、架构经验。
- **现状**：
  - 社区版 `regenrek/deepwiki-mcp` 因官方封禁已无法获取数据，仅适合法规允许的离线演示。
  - 官方维护了远程 MCP：`https://mcp.deepwiki.com/mcp`（HTTP）与 `https://mcp.deepwiki.com/sse`（SSE）。
- **接入**：
  ```json
  {
    "mcpServers": {
      "deepwiki": {
        "type": "sse",
        "url": "https://mcp.deepwiki.com/sse"
      }
    }
  }
  ```
  Claude Desktop ≥ 0.7 与 Cursor 均支持上述 remote 配置；无须本地进程。
- **使用要点**：
  - 工具 `deepwiki_fetch` 支持 `mode=aggregate|pages` 与 `maxDepth`，查询前尽量指定确切 slug（如 `tailwindlabs/tailwindcss`）。
  - 远程端限流；如果报 429，等待 60s 再试，别乱开并发。
  - 旧的 `npx deepwiki-mcp` 可作备用，但要在 `.env` 设置 `DEEPWIKI_MAX_CONCURRENCY`、`DEEPWIKI_REQUEST_TIMEOUT` 才能稳定；并且默认只接受 deepwiki.com 域名。

### DuckDuckGo MCP —— 无密钥搜索
- **定位**：使用 DuckDuckGo Search API + 内容抓取，覆盖即时新闻与网页正文。
- **安装**：
  ```bash
  uv pip install duckduckgo-mcp-server
  # 或
  pip install duckduckgo-mcp-server
  ```
- **配置**：
  ```json
  {
    "mcpServers": {
      "duckduckgo": {
        "command": "uvx",
        "args": ["duckduckgo-mcp-server"]
      }
    }
  }
  ```
- **使用要点**：
  - 提供两个工具：`search`（可选 `max_results`）和 `fetch_content`。
  - 默认限流：搜索 30 RPM、抓取 20 RPM，客户端重试前先看错误信息。
  - 如果想在沙箱中运行，设定 `HTTP_PROXY`/`HTTPS_PROXY` 环境变量即可。

## 客户端配置示例

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_KEY"]
    },
    "acemcp": {
      "command": "uvx",
      "args": ["acemcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "deepwiki": {
      "type": "sse",
      "url": "https://mcp.deepwiki.com/sse"
    },
    "duckduckgo": {
      "command": "uvx",
      "args": ["duckduckgo-mcp-server"]
    }
  }
}
```

Cursor、Claude Desktop、VS Code MCP 均接受以上结构；如果客户端不支持 `type` 字段，就需要改用本地进程（例如把 DeepWiki 改成 `command: "npx", args: ["-y", "deepwiki-mcp"]` 并自行承担失效风险）。

## 选型与补充
- 查官方文档 → Context7：版本锁定 + 自动缓存，最适合框架/Cloud SDK。
- 查项目代码 → AceMCP：增量索引，支持多仓并行。
- 控制网页 → Playwright：结构化 A11y 树，适合流程回归与端到端测试。
- 查 Wiki 与案例 → DeepWiki：优先接入官方远程端，社区版仅供 fallback。
- 查通用网页 → DuckDuckGo：无需密钥，覆盖搜索 + 正文抓取。

每次新增服务器都重复同一套路：定义能力、校验调用、限制输出体积。保持这些约束，MCP 客户端就能稳定运行。
