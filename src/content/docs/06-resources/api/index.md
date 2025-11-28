---
title: API Key
description: API 代理、聚合与转换项目推荐
contributors:
  - claude
  - codex
  - glm
  - MiniMax-AI
---

API 网关的概念见 [Gateway](/concepts/developer/gateway)。本页只列项目推荐。

## 代理转发

解决跨境访问、负载均衡、Key 轮询等问题。

| 项目 | 作用 | 适用场景 |
| :--- | :--- | :--- |
| [gemini-anticut](https://github.com/lovingfish/gemini-anti-cut) | Gemini 反截断转发 | 提升长连接稳定性 |
| [proxy-interface](https://github.com/lovingfish/proxy-interface) | OpenAI 风格统一代理 | 已有前端，加一层轻量代理 |
| [ClewdR](https://github.com/Xerxes-2/clewdr) | Claude/Gemini 高性能代理 | 自托管，复用 OpenAI SDK |
| [api-proxy](https://github.com/OrzMiku/api-proxy) | 多家 API 统一路径 | Vercel/Cloudflare 部署 |
| [supabase-api-proxy](https://github.com/lovingfish/supabase-api-proxy) | Supabase Edge 代理 | 已有 Supabase 项目 |

## 聚合管理

多上游路由、配额、计费、监控。

| 项目 | 作用 | 适用场景 |
| :--- | :--- | :--- |
| [BerriAI/litellm](https://github.com/BerriAI/litellm) | OpenAI 兼容网关、限流、日志 | 生产级，支持 40+ 上游 |
| [songquanpeng/one-api](https://github.com/songquanpeng/one-api) | 多上游聚合、Dashboard、计费 | 需要管理后台和多租户 |
| [QuantumNous/new-api](https://github.com/QuantumNous/new-api) | Key 轮询、白名单、基础监控 | 中小团队，轻量需求 |
| [tbphp/gpt-load](https://github.com/tbphp/gpt-load) | Key 轮询、故障转移、熔断 | 嵌入现有系统 |

托管服务：[OpenRouter BYOK](https://openrouter.ai/docs/byok)、Together AI API Gateway

## 格式转换

不同厂商协议互转。

### OpenAI → Claude

| 项目 | 作用 | 备注 |
| :--- | :--- | :--- |
| [claude-code-proxy](https://github.com/1rgs/claude-code-proxy) | OpenAI 转 Claude Code | 轻量，适合 IDE 插件 |
| [claude-code-router](https://github.com/musistudio/claude-code-router) | 多 Claude 实例 + 负载均衡 | 内置 YAML 配置 |
| [Claude Proxy 集合](https://github.com/topics/claude-proxy) | 社区项目 | 需确认维护度 |

### Claude/Gemini/其他 → OpenAI

| 项目 | 作用 | 备注 |
| :--- | :--- | :--- |
| [BerriAI/litellm](https://github.com/BerriAI/litellm) | 40+ 上游统一成 OpenAI 格式 | 限流、日志、Azure AD |
| [songquanpeng/one-api](https://github.com/songquanpeng/one-api) | OpenAI 兼容网关 + 计费 | 需 MongoDB/MySQL |

## 组合方案

| 组合 | 说明 |
| :--- | :--- |
| LiteLLM + Cloudflare Workers | Cloudflare 入口鉴权，LiteLLM 转换路由 |
| OneAPI + Supabase | OneAPI 暴露接口，Supabase 存储计费 |
