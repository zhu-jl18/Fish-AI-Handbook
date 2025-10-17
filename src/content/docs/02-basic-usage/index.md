---
title: 基础使用
description: 基础用法总览：WebChat、IDE、CLI、APP、Mobile 以及 Cherry Studio、Claude Code、Codex 的使用向导航与导读。
---

本页聚焦"使用"而非"配置"。对应工具的安装与环境配置请前往"配置指南（/setup/\*）"。

## AI 工具使用场景概览

```mermaid
graph TB
    A[AI 使用场景] --> B[网页端]
    A --> C[桌面端]
    A --> D[移动端]
    A --> E[开发工具]
    
    B --> B1[WebChat<br/>ChatGPT/Claude等]
    
    C --> C1[Cherry Studio<br/>多模型聚合]
    C --> C2[Claude Code<br/>AI编程助手]
    C --> C3[Codex<br/>本地大模型]
    
    D --> D1[官方App]
    D --> D2[第三方客户端]
    
    E --> E1[VS Code插件]
    E --> E2[Cursor]
    E --> E3[命令行工具]
    
    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style B fill:#10b981,stroke:#059669,color:#fff
    style C fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style D fill:#f59e0b,stroke:#d97706,color:#fff
    style E fill:#ef4444,stroke:#dc2626,color:#fff
```

推荐阅读顺序：

- WebChat：/basic-usage/webchat
- AI IDE：/basic-usage/editor-agent
- Mobile：/basic-usage/mobile-apps
- Cherry Studio（使用向）：/basic-usage/cherrystudio
- Claude Code（使用向）：/basic-usage/claude-code
- Codex（使用向）：/basic-usage/codex
- Others：/basic-usage/others
