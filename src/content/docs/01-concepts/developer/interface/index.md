---
title: Interface
description: API 协议与 SDK 封装。
contributors:
  - claude
---

## API 是什么

HTTP。就这么简单。

大模型 API 就是个服务器。你发 JSON，它回 JSON。会发 POST 请求就能写 AI 应用。

```text
你的代码 --POST JSON--> API 服务器 --JSON--> 你的代码
```

## 为什么要理解这些

真实案例：

> 用户在第三方服务 `api.011070.xyz` 创建了 Key，然后填到 Chatbox 里，但 API 地址填的是 `api.openai.com`。
>
> 结果：连接失败。
>
> 师傅的回复：**"你这相当于拿着你家钥匙开邻居的门了"**。

这就是为什么你需要理解 API 的基本概念：

| 概念 | 类比 | 说明 |
|:---|:---|:---|
| **Base URL** | 哪扇门 | 服务地址，请求发到哪 |
| **API Key** | 钥匙 | 身份凭证，证明你有权限 |
| **协议格式** | 锁的型号 | OpenAI 格式、Anthropic 格式等 |

钥匙和门必须配套。A 服务的 Key 用不了 B 服务的接口。

## 协议标准

业界事实标准：OpenAI 格式。为什么？因为能用，而且没人想为每个模型学一套新协议。

| 格式 | 端点 | 认证 |
|:---|:---|:---|
| **OpenAI** | `/v1/chat/completions` | `Authorization: Bearer <key>` |
| **Anthropic** | `/v1/messages` | `x-api-key: <key>` |

OpenAI 格式是首选。哪怕用的不是 OpenAI 的模型，只要支持这个格式就优先用。

## 请求格式

```json
{
  "model": "gpt-4",
  "messages": [
    {"role": "system", "content": "你是助手"},
    {"role": "user", "content": "你好"}
  ],
  "temperature": 0.7,
  "max_tokens": 500
}
```

核心字段：

| 字段 | 说明 |
|:---|:---|
| `model` | 模型名（必填） |
| `messages` | 对话历史（必填） |
| `temperature` | 随机性，0-2 |
| `max_tokens` | 最大输出长度 |
| `stream` | 是否流式返回 |

## 响应格式

```json
{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "你好！"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 5,
    "total_tokens": 15
  }
}
```

关键信息在 `choices[0].message.content`。`usage` 告诉你花了多少 token。

## 流式响应

`stream: true` 时，服务器用 SSE 逐块返回：

```text
data: {"choices":[{"delta":{"content":"你"}}]}
data: {"choices":[{"delta":{"content":"好"}}]}
data: [DONE]
```

每行一个 JSON，逐行解析。适合实时显示生成过程。

---

## SDK

你可以手写 HTTP 请求。你也可以写汇编。但没必要。

SDK 封装了 HTTP 细节：连接管理、重试、超时、类型检查。用它。

| 对比 | 裸写 HTTP | 用 SDK |
|:---|:---|:---|
| 代码量 | 多 | 少 |
| 重试 | 自己写 | 内置 |
| 类型 | `Dict[str, Any]` | 自动补全 |
| 流式 | 手动解析 SSE | `for chunk in stream` |

## Python

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.deepseek.com",  # 换成任何兼容的服务
    api_key="sk-..."
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "你好"}]
)

print(response.choices[0].message.content)
```

流式：

```python
stream = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "讲个笑话"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

## Node.js

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-...'
});

const response = await client.chat.completions.create({
  model: 'deepseek-chat',
  messages: [{ role: 'user', content: '你好' }]
});

console.log(response.choices[0].message.content);
```

流式：

```javascript
const stream = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: '讲个笑话' }],
  stream: true
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
```

## 环境变量

别硬编码 Key。

```bash
# .env
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.your-proxy.com
```

SDK 自动读取这些变量：

```python
client = OpenAI()  # 自动从环境变量读取
```

```javascript
const client = new OpenAI();  // 同上
```

## 官方 SDK

| 语言 | 库 |
|:---|:---|
| Python | [openai](https://github.com/openai/openai-python) |
| Node.js | [openai](https://github.com/openai/openai-node) |
| Python | [anthropic](https://github.com/anthropics/anthropic-sdk-python) |
| Node.js | [@anthropic-ai/sdk](https://github.com/anthropics/anthropic-sdk-typescript) |

## 总结

- **API**：HTTP + JSON，OpenAI 格式是标准
- **SDK**：封装 HTTP，省心省力
- **环境变量**：别硬编码 Key

会用 SDK 调 API 就够了。协议转换、代理转发这些，看 [Gateway](/concepts/developer/gateway)。
