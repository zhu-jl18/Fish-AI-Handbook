---
title: Cherry Studio
description: 跨平台 AI 桌面客户端使用指南
---

Cherry Studio 是一个基于 Electron 的跨平台 AI 桌面客户端，支持 Windows、macOS 和 Linux。它的核心思路很简单：把各种 LLM 服务商的模型聚合到一个界面里，让你不用在浏览器里开一堆标签页。这不是什么革命性的想法，但至少实现得还算靠谱。

## 技术栈

Cherry Studio 采用的是标准的 Electron 技术栈，没什么特别的。具体来说就是 Electron + React + TypeScript，外加一堆现代前端工具链。数据库用的是 libSQL（SQLite 的一个分支），状态管理从 Redux 迁移到了 Zustand，这个决定还算明智，至少减少了不少样板代码。

构建工具用的是 electron-vite，打包用 electron-builder。Node 版本要求 22 以上，这个要求有点高，但考虑到要用一些新特性，也能理解。整个项目采用 Yarn Workspaces 管理 monorepo，这对于一个复杂的桌面应用来说是合理的选择。

值得一提的是 MCP（Model Context Protocol）的深度集成。这是 Anthropic 推出的协议，Cherry Studio 把它做成了一等公民，而不是后期补丁。这个决定在架构上是对的，虽然增加了复杂度，但确实提供了更强的扩展能力。

代码质量方面，项目用了 Biome 做格式化和 lint，用 Vitest 做测试，用 Playwright 做 E2E 测试。这些工具选择都很现代，说明团队还是在意代码质量的。不过从 GitHub 上看，测试覆盖率并不高，这是大多数开源项目的通病。

## 与同类产品对比

市面上的 AI 客户端不少，LobeChat、Chatbox、NextChat 等等。它们各有特点，也各有问题。下面是一个简单的对比，基于实际使用体验和技术架构：

| 特性 | Cherry Studio | LobeChat | Chatbox | NextChat |
|------|--------------|----------|---------|----------|
| 技术栈 | Electron + React | Next.js (Web) | Tauri + React | Next.js (Web) |
| 部署方式 | 桌面客户端 | Web / Docker / 桌面 | 桌面客户端 | Web / Docker |
| 本地运行 | ✓ 完全本地 | ✓ 可本地部署 | ✓ 完全本地 | ✓ 可本地部署 |
| 知识库 | ✓ 本地 RAG | ✓ 支持 | ✗ 不支持 | ✗ 不支持 |
| MCP 协议 | ✓ 深度集成 | ✗ 不支持 | ✗ 不支持 | ✗ 不支持 |
| 多模型对比 | ✓ 一问多答 | ✓ 支持 | ✗ 不支持 | ✓ 支持 |
| 自定义主题 | ✓ CSS 完全自定义 | ✓ 主题系统 | ✓ 基础主题 | ✓ 基础主题 |
| 插件系统 | ✓ 小程序 + MCP | ✓ 插件市场 | ✗ 不支持 | ✗ 不支持 |
| 移动端支持 | ✗ 规划中 | ✓ PWA | ✗ 不支持 | ✓ PWA |
| 启动速度 | 中等（Electron） | 快（Web） | 快（Tauri） | 快（Web） |
| 内存占用 | 高（Electron） | 低（浏览器） | 低（Tauri） | 低（浏览器） |
| 离线使用 | ✓ 完全支持 | ✗ 需要网络 | ✓ 完全支持 | ✗ 需要网络 |
| 数据同步 | WebDAV | 云端 / 本地 | 本地 | 云端 / 本地 |
| 开源协议 | AGPL-3.0 | MIT | GPL-3.0 | MIT |
| 活跃度 | 高（每日更新） | 高（每日更新） | 中等 | 中等 |
| 社区规模 | 35k+ stars | 50k+ stars | 20k+ stars | 15k+ stars |

## 优势与劣势

Cherry Studio 的优势在于功能完整性和本地化。知识库、MCP、Agent 这些进阶功能都做得比较扎实，不是简单的功能堆砌。如果你需要一个功能强大的本地 AI 客户端，而且愿意接受 Electron 的性能开销，Cherry Studio 是个不错的选择。

劣势也很明显。首先是 Electron 的老问题：启动慢、内存占用高。一个简单的 AI 客户端占用几百 MB 内存，这在 2025 年还是让人难以接受。其次是功能复杂度。Cherry Studio 的功能很多，但大部分用户可能只用到 20%。这种设计哲学和 Unix 的"做好一件事"理念背道而驰。

LobeChat 的优势是轻量和灵活。基于 Next.js 的 Web 应用，可以部署在任何地方，也可以打包成桌面应用。界面设计更现代，用户体验更流畅。但它的劣势是依赖网络，离线使用受限。而且 Web 应用的文件系统访问能力有限，某些功能实现起来比较麻烦。

Chatbox 用 Tauri 而不是 Electron，这是个明智的选择。Tauri 的性能和内存占用都比 Electron 好得多。但 Chatbox 的功能相对简单，更适合轻量级使用。如果你只是需要一个简单的 AI 对话工具，Chatbox 可能更合适。

NextChat 的定位是 Web 优先，桌面客户端只是附带的。它的优势是部署简单，一键部署到 Vercel 就能用。但功能相对基础，更适合个人使用而不是专业场景。

## 使用建议

如果你是个人用户，只是偶尔用用 AI 对话，LobeChat 或 NextChat 就够了。它们轻量、快速、易用，不需要安装任何东西。如果你需要完全本地运行，不想依赖网络，Chatbox 是个好选择。

如果你是专业用户，需要处理大量文档、构建知识库、使用 MCP 工具，Cherry Studio 更适合。它的功能完整性和扩展能力是其他工具比不了的。但要做好心理准备，接受 Electron 的性能开销和功能复杂度。

如果你是开发者，想要自己定制和扩展，Cherry Studio 和 LobeChat 都是不错的选择。它们都是开源的，代码质量也还可以。Cherry Studio 的 AGPL-3.0 协议意味着你的修改也必须开源，LobeChat 的 MIT 协议更宽松。

最后说一句，不要被功能列表迷惑。大多数人用 AI 客户端，90% 的时间都在做最基础的对话。那些花里胡哨的功能，看起来很酷，但实际使用频率很低。选择工具的时候，先想清楚自己真正需要什么，而不是什么功能最多。
