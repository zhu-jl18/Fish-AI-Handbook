---
title: 格式转换
contributors:
  - glm
  - codex
description: 跨供应商 API 协议转换与实现方案
---

## 核心要点
- 明确调用方期待的协议（如 OpenAI Chat Completions、Anthropic Messages、Google Gemini）与上游真实协议之间的差异。
- 格式转换不仅改 HTTP 路径，还要处理流式传输、工具调用、引用字段，必要时补齐缺失字段。
- 建议优先选有活跃维护的开源项目或商业托管，避免自研重复劳动。

## 标准化流程

```
Client --OpenAI Spec--> Converter --Native Spec--> Upstream Provider
         |                                |
         |--Token Accounting / Tool Call--|
```

1. **请求解析**：将调用方请求解构成统一内部对象，补齐默认参数。
2. **协议映射**：根据目标上游（Claude、Gemini、Azure OpenAI 等）填充必需字段，处理模型名映射。
3. **响应封装**：把上游响应重新包装成调用方熟悉的格式，确保错误码语义一致。
4. **流式支持**：逐帧转译 SSE / chunk，保持事件顺序与结束标记。

## Claude 系接口（OpenAI → Claude）

| 项目 | 最新状态（2024 Q4） | 适用场景 | 备注 |
| :--- | :------------------ | :------- | :--- |
| [1rgs/claude-code-proxy](https://github.com/1rgs/claude-code-proxy) | 持续更新，新增函数调用字段映射 | 把 OpenAI `responses` API 转为 Claude Code | 轻量、易部署，适合 IDE 插件代理 |
| [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) | 2024 Q3 起支持多模型路由 | 多 Claude 实例 + 负载均衡 | 内置 YAML 配置，兼容 Nginx 前置 |
| [Claude Proxy 主题集合](https://github.com/topics/claude-proxy) | 社区维护 | 查找其他针对 Claude 的转换实现 | 需逐个确认维护度与 License |

## OpenAI 风格接口（Claude / Gemini / 其他 → OpenAI）

| 项目 | 最新状态（2024 Q4） | 适用场景 | 备注 |
| :--- | :------------------ | :------- | :--- |
| [BerriAI/litellm](https://github.com/BerriAI/litellm) | 活跃维护，支持 >40 种上游 | 统一成 OpenAI `chat/completions`/`responses`，支持函数调用 | 具备限流、日志、Azure AD 鉴权，可直接 Docker 部署 |
| [songquanpeng/one-api](https://github.com/songquanpeng/one-api) | 2024 Q4 发布 v0.5，新增队列与配额 | 自建 OpenAI 兼容网关，整合聚合管理与计费 | 内置管理后台，支持多租户，部署需 MongoDB/MySQL |
| [OpenRouter Format Bridge](https://openrouter.ai/docs/byok) | 商业托管，BYOK 需付费订阅 | 想把 OpenRouter 生态模型暴露为 OpenAI 兼容接口 | 负责模型选择与安全策略，但限于 OpenRouter 支持模型 |

## 组合式方案
- **LiteLLM + Cloudflare Workers**：Cloudflare 负责流量入口、鉴权；LiteLLM 执行协议转换与模型路由。
- **OneAPI + Supabase**：OneAPI 暴露 OpenAI 兼容接口，Supabase 存储计费与调用明细。
- **自研 Adapter**：当上游是自家模型或 SDK，仍可用上述流程，自研适配层时务必覆盖流式、工具调用、引用字段。

## 工程建议
- **测试矩阵**：对每种模型/上游组合建立回归用例，覆盖普通对话、工具调用、流式、错误分支。
- **模型命名**：维护一张映射表，说明 `gpt-4.1-mini` → `claude-3-5-sonnet` 等别名关系，方便文档同步。
- **超时与重试**：转换层可以记录每个上游的超时阈值，必要时局部重试或回落到备用模型。
- **监控**：输出调用计费、错误率、延迟指标到 Prometheus/Grafana，定位格式不兼容问题。
- **合规**：若使用商业托管（OpenRouter 等），注意遵循其 ToS 对于日志保留和敏感数据处理的要求。
