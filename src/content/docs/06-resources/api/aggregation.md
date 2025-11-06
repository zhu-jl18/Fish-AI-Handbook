---
title: 聚合管理
contributors:
  - glm
  - codex
  - MiniMax-AI
description: 多上游 API 聚合与调度策略
---

## 核心要点
- 聚合层需要同时处理 **路由、配额、平滑降级、记账**，而不仅仅是“把多个 Key 放在同一个接口”。
- 建议分离“公用 API 代理”与“内部计费逻辑”：前者负责协议与重试，后者负责账户、账单。
- 选品时优先关注维护活跃度、观测能力（日志、指标）、以及与自家认证系统的集成方式。

## 能力拆解

| 能力模块 | 说明 | 典型实现 |
| :------- | :--- | :------- |
| 路由策略 | 模型选择、版本切换、熔断 | 静态映射表、权重路由、A/B 测试 |
| 配额治理 | Key 额度、速率限制、多租户限额 | 令牌桶、Redis、Postgres 记录 |
| 计费统计 | 调用次数、token 消耗、账单 | Supabase、ClickHouse、BigQuery |
| 观测告警 | 请求日志、指标、异常告警 | OpenTelemetry、Prometheus、Grafana |
| 安全合规 | 密钥管理、审计、脱敏 | KMS、HashiCorp Vault、日志脱敏 |

## 参考架构

```
+---------+     HTTPS      +---------------+     HTTPS      +-----------------+
| Client  |--------------->| Aggregation    |-------------->| Provider Pool    |
+---------+                | Gateway        |               | (OpenAI/Claude…)|
      |                    +-------+-------+               +---------+-------+
      |                            |                                 |
      |                            v                                 v
      |                    +---------------+               +-----------------+
      |                    | Quota Service |<--------------| Billing Storage |
      |                    +---------------+               +-----------------+
      |                            |
      |                            v
      |                    +---------------+
      +--------------------| Metrics & Log |
                           +---------------+
```

- **Aggregation Gateway**：统一协议、封装重试，并将请求打标签（租户、模型、region）。
- **Quota Service**：负责配额扣减、速率限制，与聚合网关分层部署，避免耦合。
- **Metrics & Log**：选择 OpenTelemetry + Tempo/Loki 或平台日志，便于回溯问题。
- **Billing Storage**：若有付费场景，建议采用结构化存储，并定期归档。

## 推荐项目（自建优先）

| 项目 | 最新状态（2024 Q4） | 核心能力 | 注意事项 |
| :--- | :------------------ | :------- | :-------- |
| [BerriAI/litellm](https://github.com/BerriAI/litellm) | 持续迭代，新增内置速率限制与观察性 | OpenAI 兼容网关、模型别名、函数调用、限流、日志 | 建议搭配 Redis/MQ 做限额，默认内存限流并非分布式 |
| [songquanpeng/one-api](https://github.com/songquanpeng/one-api) | 2024 Q4 引入多租户配额与付费模块 | 多上游聚合、Dashboard、OpenAI 兼容接口 | 需自管数据库和 Redis，部署复杂度稍高 |
| [QuantumNous/new-api](https://github.com/QuantumNous/new-api) | 2024 Q2 后由社区维护 | 多上游 Key 轮询、白名单、基础监控 | 功能轻量，适合中小团队或自定义二次开发 |
| [tbphp/gpt-load](https://github.com/tbphp/gpt-load) | 2024 Q2 更新，面向负载均衡 | Key 轮询、故障转移、熔断 | 不包含计费与 Dashboard，可嵌入到现有系统 |

> 若不想自建，可考虑 **OpenRouter BYOK** 或 **Together AI API Gateway**，但仍需评估合规与成本。

## 辅助组件
- **CLIProxyAPI**：适用于需要 CLI 与 HTTP 混合调用的场景，Go 实现方便与现有代理整合。
- **cc-switch**：按请求特征动态切模型，可与 LiteLLM/OneAPI 联动实现蓝绿发布。
- **自定义 Cron**：每 5 分钟跑健康检查，验证每条上游链路，并把结果写入 Metrics。

## 运营建议
- **密钥治理**：使用 Vault/KMS 管理上游密钥，聚合层通过短期 Token 获取真实 Key。
- **限流策略**：针对租户、模型、HTTP 方法分别设定限额，避免单一模型拖垮整个系统。
- **异常回退**：配置主备模型与策略（如主失败→回退 mini 模型），并在响应中标记降级来源。
- **指标体系**：至少关注 `p95 延迟`、`错误率`、`限流命中率`、`token 消耗`，及时调整。
- **审计与报表**：对关键操作（Key 新增、配额修改）打审计日志；每日报送聚合层与上游的差异账单。
