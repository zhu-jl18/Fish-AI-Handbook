---
title: Developer
description: 开发者接入指南：接口、网关与工具。
contributors:
  - claude
  - gemini
---

## 开发者接入

掌握基础概念后，你可以开始写代码构建更定制化的东西——比如用 Claude Code 的 SDK 定制复杂的工作流或 Agent。

与大模型交互的核心知识：

| 主题 | 内容 | 适用场景 |
| :--- | :--- | :--- |
| **[Interface](/concepts/developer/interface)** | API 协议与 SDK | 理解底层协议、日常开发 |
| **[Gateway](/concepts/developer/gateway)** | 代理、路由、转换、聚合 | 生产环境、多模型管理 |

## Interface

API 就是 HTTP。大模型服务收一个 JSON，吐一个 JSON。

业界事实标准是 OpenAI 格式（`/v1/chat/completions`）。SDK 封装了 HTTP 细节，让你专注业务逻辑。

详见 [Interface](/concepts/developer/interface)。

## Gateway

直连上游 API 会遇到网络、Key 管理、协议差异等问题。网关是你的应用和上游之间的中间层，解决这些问题。

核心能力：代理转发、路由分发、协议转换、聚合管理。

详见 [Gateway](/concepts/developer/gateway)。

## 下一步

- 想了解具体项目和部署方案？看 [资源合集 - API Key](/resources/api)
- 想动手写代码？从 [Interface](/concepts/developer/interface) 的 SDK 示例开始
