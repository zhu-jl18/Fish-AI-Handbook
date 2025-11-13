---
title: 代理转发
contributors:
  - claude
  - codex
description: 面向 Gemini 与多家 AI 服务的中转代理与参考实现
---

## 使用场景与原理

在中国大陆调用 Gemini 以及各种 LLM / API 服务时，常见问题是：官方端点无法直连、单节点被打满、同一个出口 IP 或上游 Key 很快触发限额。通用的解决思路是：在海外放一层中转代理，再通过多节点与多上游把流量打散。

```
+--------+      +-----------------+      +-------------+
| Client | ---> | Overseas Proxy  | ---> | Upstream AI |
|  China |      | (Gemini / 多家) |      | Gemini 等   |
+--------+      +-----------------+      +-------------+
```

| 问题 | 处理思路 |
| :--- | :------- |
| 无法直连 Gemini | 在境外部署中转代理节点，由节点向 Google 官方接口发起请求，入口只暴露自有域名与路径 |
| 单节点易过载 | 同一路径后挂多台代理实例，结合健康检查与负载均衡，把流量摊到多个节点 |
| 同 IP / Key 限额 | 为不同代理实例配置不同出口 IP 与上游 Key，按策略轮询或分组转发，降低单 IP / Key 被打满或封禁的风险 |

在这个架构下，文档将代理拆成两类：一类是只服务 Gemini 的跨境入口通道；另一类是支持 Gemini 和多家服务商（OpenAI 兼容协议、Groq、Cerebras、OpenRouter 等）的通用多上游代理。

## Gemini 专用通道（跨境入口）

这里的「Gemini 专用通道」就是一条只处理 Gemini 流量的出站通道：本机（运行你的前端 / 后端 / 聚合服务的那台机器）把请求发给部署在境外的 Gemini 转发代理，由该代理再与 Google Gemini 官方 API 通信。

```
+--------+      +-----------------------+      +--------------------+
| 本机   | ---> | Gemini 转发代理 (海外) | ---> | Google Generative  |
| 应用   |      |                       |      | Language / Vertex  |
+--------+      +-----------------------+      +--------------------+
```

本节只关注这条最简单的链路：如何把本机发出的 Gemini 请求安全地送到境外代理。多节点、多 IP、多上游的部署与调度会在后续的「聚合管理平台」章节中单独说明。

### Gemini 代理类型示例

| 类型 | 说明 | 参考实现 |
| :--- | :--- | :------- |
| 直连转发（解锁地区限制） | 将国内请求转发到海外的 Gemini 官方接口 | 待补充（任意支持 Gemini 的 HTTP 代理） |
| 反截断转发 | 在转发链路上增加抗截断处理，提升长连接稳定性 | [gemini-anticut](https://github.com/lovingfish/gemini-anti-cut) |

## 通用多上游代理（支持 Gemini / OpenAI 等）

通用多上游代理本身不区分地域，职责是：把 `/openai`、`/gemini` 等路径映射到不同的上游服务商，并在代理层做 Header 清洗、错误包装与简单的限流统计。它既可以直接给客户端用，也可以作为「Gemini 专用通道」里的海外代理节点使用。

### 可选实现一览

| 项目 | 能力 / 入口示例 | 推荐场景 |
| :--- | :--------------- | :------- |
| [proxy-interface](https://github.com/lovingfish/proxy-interface) | 提供 OpenAI 风格 AI 代理接口，例如 `/openai` 统一转发到上游模型 API | 需要统一管理多家 AI API，但已有一套自有前端或网关，希望加一层轻量 AI 代理 |
| [ClewdR](https://github.com/Xerxes-2/clewdr) | Claude / Gemini 等模型代理，暴露 `v1/chat/completions` 等 OpenAI 兼容端点 | 自托管高性能 AI 代理，复用现有 OpenAI SDK / 前端，并集中管理模型配置与密钥 |
| [api-proxy](https://github.com/OrzMiku/api-proxy) | 通过环境变量配置 OpenAI / Gemini / Anthropic 等，统一暴露 `/openai/**`、`/gemini/**` 等路径 | 在 Vercel 或 Cloudflare 上用一组环境变量挂多家 AI API，前端只对接统一路径 |
| [supabase-api-proxy](https://github.com/lovingfish/supabase-api-proxy) | 在 Supabase Edge 中将 OpenAI、Claude、Gemini 等集中到 `/api/{service}/{path}` 路径下 | 已有 Supabase 项目，希望在 Edge Functions 内统一代理 LLM / HTTP 服务并复用日志与鉴权 |

这些实现都可以作为「海外中转代理」部署在不同 Region：你可以根据现有基础设施选一个或组合几个，在它们前面再叠一层自己的入口网关，就得到了完整的跨境与多上游代理链路。

## 实现要点（结合参考仓库）

| 维度 | 推荐做法 | 参考实现 |
| :--- | :------- | :------- |
| 路由设计 | 用统一前缀 + 服务别名映射到不同上游，例如 `/api/openai/...`、`/api/gemini/...` | api-proxy、supabase-api-proxy |
| Header 处理 | 转发前清理 IP / CDN 相关头，避免把真实来源和平台细节暴露给上游 | supabase-api-proxy |
| 错误处理 | 在代理层统一把错误包装成 JSON 返回，并附带类型与状态码 | supabase-api-proxy |
| 配置方式 | 上游地址和 Key 统一放在环境变量或配置文件里集中管理 | api-proxy、ClewdR |
| 管理与观测 | 使用部署平台日志或简单 Dashboard 查看当前路由与状态 | ClewdR Dashboard、api-proxy 仪表盘、Supabase Logs |
