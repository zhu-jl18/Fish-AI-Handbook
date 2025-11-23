---
title: Developer
description: API、SDK 和代理转发。
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

## 代理转发 (Proxy)

在代码里硬编码 API Key 和 URL 是愚蠢的行为。别这么干。

当你上生产环境时，你需要**代理 (Proxy)**。它的核心作用就是**替换上游 API 的 base_url**。

简单说，就是找个中间人。你把请求发给中间人，中间人再发给 OpenAI（或者其他随便什么模型）。

```text
                                      +--> [OpenAI GPT-4]
                                      |
+-----------+      +-------------+    +--> [Anthropic Claude]
| 用户应用   |----->|  代理服务    |----|
+-----------+      +-------------+    +--> [本地 Llama 3]
(Base URL 指向代理)  (转发 & 路由)
```

### 为什么要用代理？

因为现实很骨感。网络会断，Key 会封，模型会换。

| 问题 | 没代理 (直连) | 有代理 (转发) |
| :--- | :--- | :--- |
| **网络不通** | 程序崩溃。用户骂娘。 | 代理在海外/专线，稳如老狗。 |
| **换模型** | 改代码。重新部署。 | 改代理配置。秒生效。 |
| **多账号轮询** | 自己写复杂的逻辑。 | 代理自动轮询 Key，防封号。 |

你只需要把 SDK 里的 `base_url` 改成代理的地址，其他的代码一行都不用动。这就是标准化的力量。

## 总结

1.  **API**: 就是 HTTP。简单点。
2.  **SDK**: 用它。别重复造轮子。
3.  **Proxy**: 生产环境必须用。改个 `base_url` 就能解决大麻烦。

行了，去写代码吧。
