---
title: Interface
description: 底层 HTTP 接口与 SDK 封装库。
contributors:
  - claude
  - gemini
---

## 底层接口 (API)

把话说明白点：**这就是 HTTP**。

别整那些虚头巴脑的。大模型 API 就是个服务器，收一个 JSON，吐一个 JSON。只要你会发 POST 请求，你就能写 AI 应用。别把事情搞复杂了。

业界现在基本都用 OpenAI 的格式。为啥？因为这玩意儿能用，而且没人想为每个模型都学一套新标准。

```text
+-------------+                                +-------------+
| 你的代码     |  HTTP POST /v1/chat/completions|  API 服务器  |
|             |------------------------------->|             |
|             |  Headers:                      |             |
|             |   Authorization: Bearer sk-... |             |
|             |                                |             |
|             |  Body:                         |             |
|             |   { "messages": [...] }        |             |
|             |<-------------------------------|             |
|             |  200 OK                        |             |
|             |  { "choices": [...] }          |             |
+-------------+                                +-------------+
```

### 标准之争

真正值得关注的格式就两种。其他的都是垃圾。

| 格式 | 端点 (Endpoint) | 认证头 | 评价 |
| :--- | :--- | :--- | :--- |
| **OpenAI 兼容** | `/v1/chat/completions` | `Authorization: Bearer <key>` | **事实标准**。就用这个。哪怕不是 OpenAI 的模型，只要支持这个格式就优先用。 |
| **Anthropic** | `/v1/messages` | `x-api-key: <key>` | 挺好，但不一样。除非你需要 Claude 的特有功能，否则别折腾。 |
| **私有垃圾格式** | `/*` | `看心情` | **躲远点**。如果一个厂商连 OpenAI 兼容接口都不提供，那是在浪费你的生命。 |

### 请求与响应格式

**请求格式**

```json
{
  "model": "gpt-4",
  "messages": [
    {"role": "system", "content": "你是个有用的助手。"},
    {"role": "user", "content": "解释量子纠缠"}
  ],
  "temperature": 0.7,
  "max_tokens": 500
}
```

**响应格式**

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-4",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "量子纠缠是..."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 100,
    "total_tokens": 120
  }
}
```

### 常见参数

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| `model` | string | 模型名称 (必填) |
| `messages` | array | 对话历史 (必填) |
| `temperature` | float | 随机性，0-2，默认 1 |
| `max_tokens` | int | 最大生成长度 |
| `stream` | bool | 是否流式返回 |
| `top_p` | float | 核采样阈值 |

### 流式响应 (SSE)

启用 `stream: true` 后，服务器使用 Server-Sent Events 逐块返回：

```text
data: {"choices":[{"delta":{"content":"量子"}}]}

data: {"choices":[{"delta":{"content":"纠缠"}}]}

data: [DONE]
```

每个 `data:` 行是一个独立的 JSON 块，需要逐行解析。

---

## 封装库 (SDK)

你*当然*可以手写原始 HTTP 请求。你还可以写汇编呢。但这不代表你应该这么做。

手动处理 HTTP 连接、重试、超时和类型检查纯属浪费脑细胞。用 SDK。官方的 Python 和 Node.js 库就够了。让它们去处理那些无聊的脏活，你专心写逻辑。

| 功能 | 裸写 HTTP | 使用 SDK |
| :--- | :--- | :--- |
| **代码量** | 巨大。满屏的样板代码。 | 极少。一行函数调用。 |
| **重试机制** | 你自己写循环。 | 内置 (通常)。 |
| **类型检查** | `Dict[str, Any]` 地狱。 | 自动补全爽歪歪。 |
| **流式响应** | 祝你解析 SSE 玩得开心。 | `for chunk in stream:` |

### Python 示例

别整花活。直接用标准库。

```python
from openai import OpenAI

# 这玩意儿能连任何兼容的提供商，不光是 OpenAI。
# 只要改个 base_url 就行。
client = OpenAI(
    base_url="https://api.deepseek.com",
    api_key="sk-..."
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "你是个有用的助手。"},
        {"role": "user", "content": "用一句话解释量子物理。"}
    ]
)

print(response.choices[0].message.content)
```

### Node.js 示例

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-...'
});

const response = await client.chat.completions.create({
  model: 'deepseek-chat',
  messages: [
    { role: 'system', content: '你是个有用的助手。' },
    { role: 'user', content: '用一句话解释量子物理。' }
  ]
});

console.log(response.choices[0].message.content);
```

### 流式响应

**Python**

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

**Node.js**

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

### 环境变量配置

别硬编码 API Key。用环境变量。

```bash
# .env
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.your-proxy.com
```

**Python**

```python
from openai import OpenAI
import os

# 自动从环境变量读取 OPENAI_API_KEY 和 OPENAI_BASE_URL
client = OpenAI()
```

**Node.js**

```javascript
import OpenAI from 'openai';

// 自动从 process.env.OPENAI_API_KEY 和 OPENAI_BASE_URL 读取
const client = new OpenAI();
```

### 官方库链接

| 语言 | 库名 | 链接 |
| :--- | :--- | :--- |
| Python | `openai` | [GitHub](https://github.com/openai/openai-python) |
| Node.js | `openai` | [GitHub](https://github.com/openai/openai-node) |
| Python | `anthropic` | [GitHub](https://github.com/anthropics/anthropic-sdk-python) |
| Node.js | `@anthropic-ai/sdk` | [GitHub](https://github.com/anthropics/anthropic-sdk-typescript) |
