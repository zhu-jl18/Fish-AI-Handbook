---
title:  反模式
description: 不再用笨蛋的套路限制 2025 年的推理模型。
contributors:
  - codex
  - gemini
---

rember: 模型很聪明，你的任务是把你的需求完整清晰的传递给她


**Key Takeaways**

- 推理模型（OpenAI o1、Gemini 3 Pro、DeepSeek-R 等）需要的是商业目标 + 约束，而不是“第一步写标题、第二步列大纲”的流水线指令。
- 高智商模型仍然受限于上下文信噪比与 schema 精度，粗暴堆砌资料或让它靠猜式输出只会放大幻觉。
- Positive instruction + 样例锚点 = 安全带，能让模型稳定落在你想要的分布，而不是徘徊在“别提粉色大象”的边缘。

## Prompt 战略蓝图

把自己当成 Prompt Architect，而不是 ChatGPT 保姆。工作流如下：

```text
User -> PromptArchitect: Business goal + Success metrics
PromptArchitect -> ReasoningModel: Goal + Constraints + Curated context + Schema
ReasoningModel -> PromptArchitect: Internal reasoning (optional trace)
PromptArchitect -> User: Audited deliverable + next action
```

核心拆解：

1. **Goal**：用一句话定义“为什么要算/写这件事”。
2. **Constraints**：列出硬性限制（技术栈、字数、守则）。
3. **Context Capsule**：只给完成任务所需的最小充分集，附来源标签。
4. **Output Contract**：用 schema 或 one-shot 把输出锁死。

## 四大反模式 + 纠偏脚本

### 1. 认知微操（强制 CoT）

- **触发原因**：沿用 GPT-3.5 时代“Let's think step by step”习惯，假设模型没有内置推理。
- **症状**：模型按顺序复述你给的步骤，给出逻辑看似严谨、实则贴合格式的废话。
- **最佳实践**：描述结果要求 + 验收口径，让模型自主规划内部推理。如果需要追踪链路，用 `expose_reasoning=true`（视供应商能力）或要求“提供失败 case 的 sanity check”。

```text
💀 Old: "First analyze A, then compute B, list risks."
⚡️ New: "Diagnose root cause of latency (p95 < 250ms). Show: {metric_delta, critical_path, rollback_plan}."
```

### 2. 上下文大乱炖（Context Dumping）

- **触发原因**：看到 1M-token 窗口就把 repo、会议记录、Slack 贴图全塞进来。
- **症状**：模型引用过期 API、混合多版本事实，回答“又对又错”。Token 费用暴涨。
- **最佳实践**：把资料拆成 `Facts`, `Constraints`, `Examples` 三层。
  - `Facts`：最新、可验证的原始数据。
  - `Constraints`：policy、SLO、格式限定。
  - `Examples`：对准输出的黄金样例。

```text
💀 Dump: "Here is EVERYTHING from the repo..."
⚡️ Capsule: "Facts v2024.12: auth.ts, lines 40-120. Constraints: only OAuth2. Example: login_flow.json"
```

### 3. 粉色大象悖论（Negative Instruction）

- **触发原因**：安全恐惧导致 Prompt 写成“不要做 X、不要做 Y”。
- **症状**：模型更频繁地提到你禁止的概念；合规风险无法真正降低。
- **最佳实践**：改写成正向目标 + 可量化指标，并给出替代表达方式。

```text
💀 "Do NOT mention competitors."
⚡️ "Describe launch impact strictly in terms of first-party metrics (ARR, churn)."
```

### 4. 零样本幻觉（Zero-Shot Fallacy）

- **触发原因**：迷信模型“应该懂我的 style guide”。
- **症状**：JSON key 顺序错乱、TypeScript 类型不合 lint 规则、写出“差不多得了”的答案。
- **最佳实践**：提供 one-shot 或 schema，必要时加 `validator` 函数（工具调用）。

```text
Schema:
{
  "type": "object",
  "required": ["summary", "actions"],
  "properties": {
    "summary": {"type": "string", "maxLength": 200},
    "actions": {"type": "array", "items": {"type": "string"}}
  }
}
```

### 5. 格式凭感觉（Schema by Vibes）

- **触发原因**：只说“give me JSON”或“输出 Markdown”，让模型靠猜字段。
- **症状**：每次输出长得不一样，后续自动化脚本崩溃。
- **最佳实践**：把 schema 当 API 合同写清楚，声明字段顺序、数据类型、可选性；若需要多模态，分 channel（text/json）返回。

## Cheat Sheet：反模式 -> 修复

| 场景 | 💀 2023 版 | ⚡️ 2025 Geek 版 |
| :--- | :--- | :--- |
| 推理 | "Let's think step by step" | "Goal: cut p95 latency <250ms. Deliver analysis + rollback." |
| 给资料 | "Here is everything" | "Context Capsule = {Facts, Constraints, Examples}" |
| 规避风险 | "Do not mention competitors" | "Only cite first-party metrics" |
| 定格式 | "Output JSON" | `schema + strict validator hook` |
| 人设 | "You are a helpful assistant" | "You are Staff Engineer owning reliability review" |

## Launch Checklist

- [ ] 结果是否被精确约束，而不是过程被微操？
- [ ] Context Capsule 是否只含必要来源并标注版本？
- [ ] 是否全部用正向陈述 + 指标，而非“别做 X”？
- [ ] 是否提供至少一个黄金样例或 schema？
- [ ] 是否声明验收方式（tests、validator、工具调用）？

做到这些，你写的 Prompt 不再像家长里短，而像一份简洁的技术需求文档。别再拿 2023 的土味咒语，让 2025 的推理模型替你背锅。要么当 Architect，要么被自己的微操反噬。
