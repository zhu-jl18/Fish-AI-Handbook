---
title: 'API'
description: 'API 是服务之间的调用契约，是把大模型接入到产品中的第一步'
---

# 为什么要懂 API

- **把模型接入真实应用**：不掌握 API，就只能在网页聊天；会用 API 才能做自动化、批处理、私有化与生产化。
- **控制成本与体验**：API 级别能精细控制参数、超时、重试、流式、并发与缓存，直接影响费用和用户体验。
- **拼装能力**：API 让你把模型与数据库、向量检索、队列、存储、监控拼在一起，做真正的 AI 系统。

## 常见形态

- REST/JSON（最主流）：`POST /v1/chat/completions`，简单、通用。
- SSE 流式：在响应头 `text/event-stream` 下逐片推送，适合长文本与实时性。
- WebSocket：需要双向通信时使用，如协同编辑、语音/多模态流。

## 关键参数（以对话接口为例）

- `model`：选择具体模型与上下文长度。
- `messages`：系统/用户/助手 角色组成的对话历史。
- `temperature`、`top_p`：控制随机性与多样性。
- `stream`：是否启用流式返回。
- `tools`/`function_call`：工具调用（函数/检索/执行器）。

## 健壮性与成本

- **超时与重试**：为长文本设置更大的超时；对可重入请求做指数退避重试。
- **幂等与缓存**：请求指纹+结果缓存可降本提速（注意脱敏）。
- **日志与审计**：记录提示、响应、耗时、token 用量，便于回放与优化。

## 最小示例（伪代码）

```ts
const res = await fetch('/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: '你是助理' },
      { role: 'user', content: '帮我总结这段文本' },
    ],
    temperature: 0.2,
    stream: true,
  }),
})
```

> 结论：会 API，你才能把“会用模型”升级为“会做 AI 应用”。
