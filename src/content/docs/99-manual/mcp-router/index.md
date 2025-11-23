---
title: MCP Router 配置指南
description: MCP Router 的安装、多应用管理与常见问题解决
contributors:
  - claude
---

## MCP Router 是什么

MCP Router 是个桌面应用，用来统一管理 Model Context Protocol (MCP) 服务器。别把它想得太复杂，就是个控制面板，让你在一个地方管理所有 MCP 服务器，而不是在 Claude Desktop、Cursor、Windsurf 等每个应用的配置文件里瞎折腾。

MCP 协议是 Anthropic 搞的，让 AI 应用能调用外部工具。每个 MCP Server 提供一组工具（Tools）、资源（Resources）或提示词（Prompts）。比如 filesystem 服务器让 AI 读写文件，puppeteer 服务器让 AI 控制浏览器，context7 服务器提供代码库文档。

MCP Router 的核心价值是两点：第一，所有数据本地存储，请求日志、配置、认证信息都不出你的机器；第二，可以为不同应用配置不同的 MCP Server 访问权限。Claude Desktop 能用的服务器，Cursor 不一定需要，这就是隔离。

支持 Windows 和 macOS。Linux 用户可以试试 Wine 或者用 Python 版的 mcp-router（locomotive-agency 那个），但那是另一个项目，功能不完全一样。

## 安装 MCP Router

直接去 GitHub Release 页面下载：https://github.com/mcp-router/mcp-router/releases

下载对应系统的安装包，Windows 下载 `.exe`，macOS 下载 `.dmg`。安装完启动就能用，不需要额外依赖。注意 macOS 可能会提示"来自未知开发者"，去系统偏好设置 → 安全性与隐私里允许运行。

首次启动会让你选择数据存储位置，默认在用户目录下的 `.mcp-router/` 文件夹。这个位置很重要，后面导入导出配置都基于这个目录。备份配置就直接复制这个文件夹。

启动后界面很简单，左侧是已添加的 MCP Server 列表，右侧是详细配置和日志。顶部有"Add Server"按钮，用来添加新服务器。

## 添加和配置 MCP Server

MCP Server 有两种形式：本地进程和远程 HTTP/SSE 服务。本地进程就是在你机器上跑个命令启动服务器，远程服务就是连接一个 URL。大多数 MCP Server 都是本地进程，用 Node.js、Python 或其他语言写的。

**推荐的常用 MCP Server**：

**@modelcontextprotocol/server-filesystem** 是官方的文件系统服务器，让 AI 读写指定目录下的文件。需要 Node.js 18+。安装：

```bash
npm install -g @modelcontextprotocol/server-filesystem
```

添加到 MCP Router 时，选择"Local Server"，命令填 `npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/directory`。路径必须是绝对路径，别用 `~` 或相对路径，那会让服务器启动失败。

**@modelcontextprotocol/server-puppeteer** 是浏览器自动化服务器，基于 Puppeteer，让 AI 控制 Chrome 浏览器抓取网页、点击按钮、填表单。安装：

```bash
npm install -g @modelcontextprotocol/server-puppeteer
```

命令填 `npx -y @modelcontextprotocol/server-puppeteer`。注意这个服务器会下载 Chromium，首次启动可能要等几分钟。

**mcp-server-playwright** 是微软的 Playwright MCP 服务器，功能类似 Puppeteer 但更稳定，支持多浏览器。安装方式类似，命令是 `npx -y @automatalabs/mcp-server-playwright`。Playwright 和 Puppeteer 选一个就行，别两个都装，AI 会混淆。

**Context7** 提供代码库的最新文档，对写代码的 AI 很有用。需要先通过 MCP 协议获取库 ID，然后才能查文档。这个服务器有点特殊，配置时需要 API key，去 context7.dev 注册获取。命令类似 `npx -y @context7/mcp-server`，环境变量加上 `CONTEXT7_API_KEY=your_key`。

**手动配置连接**：MCP Router 支持三种连接方式：DXT（Desktop Extension，一种简化配置格式）、JSON（标准 MCP 配置）、Manual（手动填写命令和参数）。大部分情况用 Manual 就够了，填上命令、工作目录、环境变量即可。

工作目录默认是服务器所在目录，但有些服务器需要特定的工作目录（比如需要读取当前目录下的配置文件）。环境变量用来传递 API key、代理设置等，格式是 `KEY=value`，多个变量换行或用逗号分隔。

添加完服务器后，点击"Test Connection"测试连接。如果失败，日志会告诉你具体原因。常见错误包括命令路径错误、Node.js 版本不兼容、端口被占用等。

## 多应用管理与权限隔离

MCP Router 的杀手级功能是为不同 AI 应用配置不同的 MCP Server 访问权限。比如你只想让 Claude Desktop 访问文件系统服务器，不想让 Cursor 也能访问，这样可以避免误操作。

在 MCP Router 里，每个服务器都可以设置"Allowed Clients"。点击服务器的配置页面，有个"Client Permissions"区域，列出了所有检测到的 AI 应用。勾选允许访问的应用，取消勾选禁止访问的应用。

**应用检测机制**：MCP Router 会扫描常见 AI 应用的配置文件位置，自动检测 Claude Desktop、Cursor、Windsurf、Cline 等。如果你的应用没被检测到，可以手动添加，填上应用名称和配置文件路径。

**配置文件路径**：不同应用的配置文件位置不一样。Claude Desktop 的配置在 `~/Library/Application Support/Claude/` (macOS) 或 `%APPDATA%\Claude\` (Windows)，文件名是 `claude_desktop_config.json`。Cursor 的配置在 `~/.cursor/` 下，Windsurf 在 `~/.windsurf/` 下。

MCP Router 会自动修改这些配置文件，把允许的服务器写进去，禁止的服务器从里面删掉。这就是权限隔离的原理。你也可以手动编辑配置文件，但 MCP Router 启动时会覆盖你的修改，所以别跟它对着干。

**典型权限隔离场景**：文件系统服务器只给 Claude Desktop 用，因为它的安全策略最严格；浏览器自动化服务器给所有应用用，因为它不涉及本地文件；代码文档服务器只给 Cursor 和 VSCode 用，因为 Claude Desktop 不需要。

**导出和导入配置**：MCP Router 支持导出配置到 JSON 文件，方便在多台机器间同步。点击"Settings" → "Export Configuration"，保存 JSON 文件。在另一台机器上点击"Import Configuration"，选择文件即可。导入时会覆盖现有配置，小心操作。

## 已知问题与解决方案

**MCP 超时问题**：JavaScript/TypeScript 的 MCP 客户端 SDK 有个 60 秒的硬性超时限制，这是 modelcontextprotocol/typescript-sdk 的 bug。如果你的 MCP Server 执行时间超过 60 秒（比如长时间的浏览器操作或大文件处理），会收到"Request timed out"错误。

这个问题在 2025 年 1 月的 Pull Request #849 里被修复了，但需要 MCP Server 或客户端应用升级 SDK 版本。修复方法是在调用工具时设置 `resetTimeoutOnProgress: true` 选项，让服务器发送进度通知时重置超时计时器。

如果你用的 MCP Router 或 AI 应用还没升级 SDK，临时解决办法是把长时间操作拆成多个短操作，或者在 MCP Server 代码里定期发送进度通知。但这都是折腾，最好的办法是催促应用开发者更新 SDK。

检查你的 MCP Router 版本：在"About"页面看版本号，2025 年 2 月后的版本应该已经包含修复。如果没有，去 GitHub Release 下载最新版。

**Codex MCP Server 兼容性问题**：OpenAI 的 Codex CLI 对 MCP 协议的支持有问题，主要是几个方面：第一，Codex 不读取 config.toml 里定义的 MCP 服务器（Issue #3441）；第二，同一个配置在 Claude Code CLI 里能用但 Codex 里不行（Issue #3324）；第三，SSE 服务器如果不支持 OAuth 会握手失败（Issue #5588）；第四，HTTP MCP 服务器加载后显示不出工具列表（Issue #4707）。

这些问题在 2025 年 1 月还没完全修复，OpenAI 团队在处理但进度慢。如果你要用 Codex 访问 MCP 服务器，建议用本地进程方式而不是 HTTP/SSE 方式，同时避免需要 OAuth 的服务器。或者干脆别用 Codex，换成 Claude Code CLI 或其他更成熟的 MCP 客户端。

MCP Router 本身不能解决 Codex 的兼容性问题，因为这是 Codex 的 bug。你唯一能做的就是在 MCP Router 里禁用 Codex 对有问题的服务器的访问，避免日志里一堆报错。

**端口冲突问题**：有些 MCP Server 会启动 HTTP 服务监听固定端口（比如 Puppeteer 的调试端口 9222），如果已经有程序占用这个端口，服务器启动失败。解决办法是在环境变量里设置 `PORT=9223` 改成其他端口，或者关掉占用端口的程序。

检查端口占用：Windows 用 `netstat -ano | findstr :9222`，macOS/Linux 用 `lsof -i :9222`。找到占用端口的进程 PID，用任务管理器或 `kill` 命令关掉。

**路径问题**：MCP Server 的命令路径必须是绝对路径或者在 PATH 环境变量里。如果你用 `npx` 启动服务器，确保 Node.js 的 bin 目录在 PATH 里。Windows 上注意路径分隔符是反斜杠，但在 JSON 配置里要写成双反斜杠 `C:\\path\\to\\file` 或者用正斜杠 `C:/path/to/file`。

**日志调试**：MCP Router 的日志在界面右侧，显示服务器的 stdout 和 stderr。如果服务器启动失败或工具调用出错，先看日志。日志太多可以用搜索功能过滤关键词。

日志默认保存在 `.mcp-router/logs/` 目录下，按日期分文件。调试时可以直接打开日志文件，用 `tail -f` 实时查看（macOS/Linux）或者用 PowerShell 的 `Get-Content -Wait`（Windows）。

**MCP Router 无法启动**：如果 MCP Router 启动后立即崩溃或无响应，可能是数据目录损坏或配置文件格式错误。备份 `.mcp-router/` 目录后删掉它，重新启动 MCP Router 会创建新的干净配置。

**服务器列表为空**：首次启动或导入配置失败时，服务器列表可能是空的。检查导入的 JSON 文件格式是否正确，或者手动添加一个测试服务器验证功能是否正常。

## 更新和维护

MCP Router 目前（2025 年 2 月）更新频率较高，GitHub Release 页面每隔几周就有新版本。应用不会自动更新，需要手动下载新版本安装。安装新版本会保留原有配置，不用担心数据丢失。

MCP Server 的更新取决于各自的维护者。用 npm 安装的服务器可以用 `npm update -g @modelcontextprotocol/server-filesystem` 更新，用 uvx 或其他工具安装的查对应文档。

定期检查 MCP Router 和 MCP Server 的版本，尤其是遇到 bug 时。很多问题在新版本里已经修复，别抱着旧版本不放。

项目仓库在 https://github.com/mcp-router/mcp-router，遇到问题先看 Issues 和 Wiki，别上来就问"为什么不能用"，日志贴出来再说话。
