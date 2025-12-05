---
title: 模型参数
description: Which params affects the outputs of the model.
contributors:
    - claude
    - codex
hasMath: true
---

想要像我一样熟练调教大模型，那么你需要懂：用户层调用模型时可设置的生成参数。

先看这段 code：

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    reasoning={"effort": "medium"},
    input=[{"role": "user", "content": "Hello, how are you?"}],
    temperature=0.1,
    top_p=0.9,
    frequency_penalty=1.0,
    presence_penalty=0.9,
    max_output_tokens=2048,
    stream=False,
)
```

这些 params 都是干嘛的？

## 快速导航

| 标签 | 内容 |
| --- | --- |
| **Token 基础** | Tokenization 原理、上下文机制、Prompt Caching |
| **Temperature+Top-P/K** | 采样策略：控制输出的随机性与多样性 |
| **Penalty+输出** | 重复抑制、Max Tokens 限制、Streaming 机制 |
| **Thinking/CoT** | Chain-of-Thought 推理、2025 推理模型对比 |

---

## TL;DR

- **Temperature=0**：写代码/翻译；创意任务再往上调
- **Top-P=1**：遵循"只改一个采样参数"；top_k 先确认 provider 是否支持
- **Penalties 默认为 0**：只有复读机才上调，别一上来就 1.0
- **Streaming=True**：面向人类的 UI 必开，生成结构化 JSON 时再关
- **Max Output Tokens**：按任务粒度估算，别盲目打满上限
- **Thinking/Reasoning**：只在 GPT-5、Claude Sonnet 4.5、DeepSeek-R1 这类支持的模型上开，并监控 reasoning token 占比

其他的，**read the freaking manual**。

---

## 参考资料

1. OpenAI，《GPT-5 模型页》与《Reasoning 模型使用指南》，2025。
2. OpenAI，《Prompt Caching Guide》《Streaming API responses》，2024-2025。
3. Microsoft Azure，《Azure OpenAI Service REST API Reference（2024-10-21）》。
4. OpenAI，《OpenAI o1-mini advancing cost-efficient reasoning》，2024.09。
5. DeepSeek-AI，《DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning》，arXiv:2501.12948，2025.01。
6. Anthropic，《Claude Sonnet 4.5 产品页》，2025.09。
