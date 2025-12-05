---
title: Model Parameters - Thinking/Reasoning
description: 推理参数配置与使用指南
contributors:
  - claude
  - codex
tab:
  label: Thinking/Reasoning
  order: 40
---

## 什么是 Thinking 参数？

2024 年起，顶级模型（OpenAI o1 系列、Claude Sonnet 4.5、DeepSeek-R1）开始支持"显式推理"——模型可以花更多 token 去"思考"，再给出最终答案。这个过程由 **thinking/reasoning 参数** 控制。

**本质**：thinking 参数是预算控制器。它不会凭空创造智商，只是允许模型花更多 token 去搜索更靠谱的解。

---

## 各家 API 怎么配置？

### OpenAI（o1 系列、GPT-5）

```python
response = client.responses.create(
    model="gpt-5",
    reasoning={"effort": "medium"},  # low / medium / high
    max_output_tokens=4096,
    # 可选：max_reasoning_tokens=25000  # 限制思考 token 上限
)
```

| 参数 | 说明 |
| --- | --- |
| `reasoning.effort` | 推理程度：`low`（快但浅）、`medium`（平衡）、`high`（深但慢+贵） |
| `max_reasoning_tokens` | 思考 token 上限，防止无限思考烧钱 |

### Anthropic（Claude Sonnet 4.5）

```python
response = client.messages.create(
    model="claude-sonnet-4-5-20250514",
    max_tokens=8000,
    thinking={
        "type": "enabled",
        "budget_tokens": 5000  # 思考预算
    },
    messages=[...]
)
```

| 参数 | 说明 |
| --- | --- |
| `thinking.type` | `enabled` 开启，`disabled` 关闭 |
| `thinking.budget_tokens` | 思考 token 预算，超过会被截断 |

### DeepSeek（R1 系列）

DeepSeek-R1 默认输出包含 `<think>...</think>` 标签的推理过程。可以通过 API 参数控制是否返回推理部分。

---

## 什么时候该开？

| 场景 | 建议 | 原因 |
| --- | --- | --- |
| 简单问答 | **关闭** | 浪费 token，回答速度变慢 |
| 数学/逻辑题 | **开启（medium/high）** | 复杂推理需要多步验证 |
| 代码调试 | **开启（medium）** | 帮助模型追踪逻辑链条 |
| 创意写作 | **关闭或 low** | 推理模式反而会压制创造力 |
| 多步规划 | **开启（high）** | Agent 场景需要长链推理 |

**经验法则**：如果任务有"正确答案"且需要多步骤，就开；如果是开放式任务，不开。

---

## 成本与延迟

Thinking tokens 会**同时增加成本和延迟**：

| 模式 | 延迟 | 成本 | 适用场景 |
| --- | --- | --- | --- |
| 无推理 | 快（1-5s） | 低 | 日常对话、简单任务 |
| low effort | 中（3-10s） | 中 | 需要一点推理的任务 |
| high effort | 慢（10-60s） | 高 | 复杂数学、代码审查 |

**监控技巧**：检查 API 返回的 `usage.output_tokens_details.reasoning_tokens`。如果 reasoning 占比 >70% 但答案仍然不对，说明 prompt 设计有问题，不是推理程度不够。

---

## 配置陷阱

1. **给它空间**：如果开了 thinking 但 `max_output_tokens` 设得太小，模型会在思考完之前就被截断。OpenAI 建议至少留 25k buffer。

2. **别和低 temperature 冲突**：推理模型通常内部已经调过采样参数，再手动设 `temperature=0` 可能导致输出质量下降。看文档，有些模型不支持同时设置。

3. **老模型没有这个参数**：GPT-4o mini、Claude 3 Haiku 这些没有 thinking 字段，别填，会报错。

4. **成本可能爆炸**：`high effort` + 复杂问题 = 一次调用花掉几美元。先用 `low/medium` 测试，确认有效再升级。

---

## TL;DR

- **Thinking 参数 = 推理预算控制器**
- 简单任务关闭，复杂推理任务开启
- 注意监控 reasoning token 占比和成本
- 给足 `max_output_tokens`，别把模型截断在思考中途
