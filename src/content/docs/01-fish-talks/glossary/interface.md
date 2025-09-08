---
title: "接口"
description: "OpenAI / Gemini / Anthropic 与兼容接口的差异与 Base URL 配置"
---

# 为什么要懂“接口”

- 决定后续能否统一配置 Base URL/Key、无痛切换供应商。
- 影响流式/工具调用/多模态等能力的使用方式。

## OpenAI（Chat Completions / Responses）

- Base URL：`https://api.openai.com/v1`
- 常见路径：`/chat/completions`、（新）`/responses`
- 流式：SSE（`stream: true`），事件逐片返回。
- 工具调用：`tools`/`function_call`，生态丰富。

```bash
# cURL（Chat Completions）
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role":"user","content":"给出三条写作建议"}
    ],
    "stream": true
  }'
```

## Anthropic（Claude）

- Base URL：`https://api.anthropic.com/v1`
- 路径：`/messages`
- 流式：事件块推送（`anthropic-version` 头必填）。
- 工具调用：`tools` + `tool_use`/`tool_result`，消息结构与 OpenAI 不同。

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-20240620",
    "messages": [{"role":"user","content":"总结要点"}],
    "stream": true
  }'
```

## Google Gemini

- Base URL：`https://generativelanguage.googleapis.com/v1beta`
- 路径：`/models/{model}:generateContent`（JSON）；流式为 `streamGenerateContent`。
- 工具/函数：`toolConfig` 与 `functionDeclarations`/`functionCalls`。

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts":[{"text":"解释 RAG 用在什么场景"}]}]
  }'
```

## 其他兼容接口（OpenAI-Compatible）

- 常见 Base URL（仅示例，具体以官方为准）：
  - Together：`https://api.together.xyz/v1`
  - OpenRouter：`https://openrouter.ai/api/v1`
  - Groq：`https://api.groq.com/openai/v1`
  - DeepSeek：`https://api.deepseek.com/v1`
  - Azure OpenAI：形如 `https://{resource}.openai.azure.com/openai/deployments/{deployment}`（路径与签名不同）
- 价值：用一份 OpenAI 兼容客户端，在多家之间快速切换；记得核对模型名与工具调用是否完全兼容。

## Base URL 与环境变量示例

```ts
// 统一读取配置并创建简单客户端
const baseUrl = process.env.MODEL_BASE_URL || "https://api.openai.com/v1";
const apiKey  = process.env.MODEL_API_KEY  || "";

async function ask(prompt: string) {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.MODEL_NAME || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      stream: false,
    }),
  });
  return res.json();
}
```

`.env.example` 建议：

```bash
MODEL_BASE_URL=https://api.openai.com/v1
MODEL_API_KEY=sk-xxxxx
MODEL_NAME=gpt-4o-mini
```

## 小结：如何选择/切换

- 统一接口层：把 Base URL/Key/ModelName 都抽到配置。
- 不同家的“流式/工具/多模态”细节不同，适配在接口层做一次即可。
- 需要合规与稳定时，可选代理/网关统一出入口（见“其他常见术语 > 代理/反代”）。
