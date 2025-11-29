---
title: Free Tier - Details
description: Detailed information about free tier limits and how to maximize usage
contributors:
  - claude
tab:
  label: Details
  order: 10
---

## 免费额度详解

本页面详细说明各免费渠道的使用限制和最大化利用技巧。

### Google AI Studio 详细限制

| 模型 | RPM (每分钟请求) | TPM (每分钟 Token) | RPD (每日请求) |
|------|------------------|-------------------|----------------|
| Gemini 1.5 Flash | 15 | 1,000,000 | 1,500 |
| Gemini 1.5 Pro | 2 | 32,000 | 50 |
| Gemini 1.0 Pro | 15 | 32,000 | 1,500 |

#### 规避 429 错误的技巧

1. **多账号轮询**：使用 2-3 个 Google 账号分散请求
2. **请求间隔**：在代码中添加适当延迟
3. **缓存策略**：对相似请求进行缓存

```python
import time
from functools import lru_cache

@lru_cache(maxsize=1000)
def cached_completion(prompt_hash):
    # 缓存相同 prompt 的结果
    pass

def rate_limited_request():
    time.sleep(4)  # 15 RPM = 每 4 秒一个请求
    return make_api_call()
```

### 心流 iFlow 使用指南

#### 支持的模型

- DeepSeek V3
- Qwen 2.5 系列
- GLM-4 系列
- 其他国产开源模型

#### API 调用示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-iflow-api-key",
    base_url="https://api.iflow.cn/v1"
)

response = client.chat.completions.create(
    model="deepseek-v3",
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)
```

### 公益站点使用须知

#### AnyRouter

- **优势**：聚合多家免费渠道
- **限制**：每日请求上限，高峰期可能排队
- **推荐用途**：日常轻度使用、测试和学习

#### ZoneAPI

- **优势**：稳定性较好
- **限制**：部分模型有上下文长度限制
- **推荐用途**：翻译、摘要等短文本任务

### 免费资源组合策略

```
日常对话 → Gemini 1.5 Flash (Google AI Studio)
代码辅助 → DeepSeek V3 (心流 iFlow)
长文本 → Gemini 1.5 Pro (限额用完切换)
备用 → 公益站点
```

---

> ⚠️ **注意**：免费服务可能随时调整限额，建议关注官方公告。
