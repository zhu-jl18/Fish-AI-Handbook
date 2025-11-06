---
title: 代理转发
contributors:
  - claude
  - codex
description: 面向跨区域访问的 API 代理转发方案与选型
---

## 核心要点
- 先明确要跨过的地域与被转发的上游 API，再决定代理落地区域与带宽冗余。
- 就近选择支持自定义域名、可控出站 IP 的边缘平台，后续排查与合规会轻松得多。
- 把鉴权、速率限制、日志收集放在代理层处理，才能支撑后续的聚合、计费与告警。

## 使用前判断
1. **合规性**：确认目标服务允许通过第三方代理访问；对 Gemini、Claude 等服务需遵守各自 ToS 的地域条款。
2. **网络要求**：明确调用方所在地、上游 API 所在地以及必须遵守的出口 IP 白名单。
3. **运行特性**：评估调用量、请求峰值及时延预算，提前决定是否需要多 Region 热备。
4. **运维能力**：团队是否能持续维护日志、证书、密钥轮换；若没有，把关键功能委托给托管平台。

## Gemini 专用通道（2024 Q4 状态）

| 方案 | 适用场景 | 最新观察 | 注意事项 |
| :--- | :------- | :------- | :-------- |
| Cloudflare Workers + AI Gateway | 面向大陆调用 Gemini Pro/Text，主打快速部署 | 2024 Q4 仍可稳定出境，Workers Paid 版提供固定出口 IP 槽位 | 建议搭配 Durable Objects 做配额统计，免费套餐可能触发速率限制 |
| Supabase Edge Functions | 需要数据库和 KV，一体化维护 | 北京、上海地区访问稳定，内置 Secrets Manager 便于轮换凭据 | 默认 60 秒超时，Gemini 长回答需拆分或走任务轮询 |
| Vercel Edge Functions | 仅做轻量转发，兼顾多环境 | 自 2024 Q3 起默认开启数据驻留；可在 dashboard 固定 Region 到美国东部 | 出站 IP 每次部署可能变化，若需白名单请购买自定义出站 |
| Deno Deploy | 低延迟、观测简单 | 2024 Q4 支持自动 HTTPS 与 KV，部署一步完成 | 中国大陆链路时延略高，建议配合 CDN 或落地多实例 |
| OpenRouter BYOK | 想直接复用现成 Gemini 接入 | 平台在 2024 Q4 新增 BYOK（自带 Key）模式，可做权宜方案 | 需遵守 OpenRouter 限流策略，适合中小流量 |

## 通用转发架构

```
+---------+      HTTPS      +--------------+      HTTPS      +--------------+
| Client  | --------------> | Edge Proxy    | --------------> | Upstream LLM |
+---------+                 +--------------+                 +--------------+
      |                           |   ^                              |
      |                           v   |                              |
      |                    +----------------+                +--------------+
      |                    | Metrics / Logs |<---------------| Alerting Hub |
      |                    +----------------+                +--------------+
```

- **Edge Proxy**：统一鉴权、限流、重试，并为后续聚合预留中间层能力。
- **Metrics / Logs**：使用平台自带日志（如 Workers Logpush、Supabase Logs）或接入 Grafana Loki，便于溯源。
- **Alerting Hub**：最简单可以是 Slack / 飞书 Webhook，先保证限额、错误率有人看。

## 推荐实现

### Cloudflare Workers（最通用）
- 支持 TypeScript/JavaScript，结合 AI Gateway 可以按模型类型拆配额。
- `fetch` 原生支持 H3/HTTP2，上游 Gemini、OpenAI、Groq 均可无痛转发。
- 可通过 `CF-Connecting-IP` 获取真实调用者 IP，方便做灰度或黑名单。

### Supabase Edge Functions（数据库原生）
- 与 Supabase Postgres、Auth、Storage 集成，适合需要记录调用明细、做账单的团队。
- 2024 Q4 起默认支持 Deno KV，可做轻量缓存、签名校验。
- 需要自行处理 60 秒执行限制：长文本建议拆成 SSE 流或回调。

### Vercel Edge + KV（前后端同源）
- Node/Edge Runtime 双模，前端页面与代理共享一套部署流水线。
- KV / Edge Config 可以保存上游密钥，不落盘，提升安全性。
- 注意固定 Region，避免 Vercel 自动多 Region 触发上游风控。

### Deno Deploy（运维门槛低）
- 单文件即可部署，版本回滚方便，内置 Observability。
- 若对 IP 稳定性有强要求，可搭配 Deno Subhosting 获取固定 IP。

## 运营建议
- **密钥管理**：统一把上游 Key 放入 Secrets Manager，并自动轮换。Workers 使用 `wrangler secret`, Supabase 使用 `supabase secrets`。
- **超时治理**：给所有外部请求设定 10~15 秒超时，避免代理实例占满连接池。
- **重试策略**：短暂性 429/5xx 可指数退避重试，5 次仍失败则记录告警。
- **健康检查**：搭配 Cron 触发的自检流程，每 5 分钟模拟调用一次，提前发现证书、DNS 问题。
- **日志保留**：至少保留 14 天原始日志以供审计，敏感字段在写入前做掩码。
