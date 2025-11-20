---
title: 核心原则与骨架
description: 单一目标、结构优先、模板顺序与常用技巧合集
contributors:
  - codex
  - gemini
---

其实 有点 out of date 了 这样。你 一定 见过 这样的提示词 “你是一个。。。。。。不拉不拉的”，诚然现在不需要这样了，但是它的核心设计思路仍然值得我们 借鉴学习。


## 关键信条
- **单一目标**：一次只做一件事，拒绝“顺便”。
- **分层职责**：System/Developer/User 分明，冲突以上层为准。
- **结构先行**：先定输出 Schema /表格/JSON，再填内容。
- **可验证**：给验收准则、错误码、空结果策略。
- **最小充分**：只注入当前任务必需事实，避免噪声。
- **拒识与来源**：无答案=空；需引用则标来源+信度。
- **过程解耦**：先思考/计划，再结论；可选自检清单。

## 提示词六要素（顺序）
1) 角色设定  
2) 任务定义  
3) 上下文事实（最小充分）  
4) 输出格式/Schema  
5) 约束条件（语气、长度、禁用项）  
6) 示例（正例+边界例）

顺序图：

```text
+--------+                             +-------+
|  User  |                             |  LLM  |
+--------+                             +-------+
    |                                      |
    | 1. Instruction                       |
    |------------------------------------->|
    |                                      |
    | 2. Constraints                       |
    |------------------------------------->|
    |                                      |
    | 3. Inputs                            |
    |------------------------------------->|
    |                                      |
    | 4. Few-shot                          |
    |------------------------------------->|
    |                                      |
    | 5. Tools Spec                        |
    |------------------------------------->|
    |                                      |
    | 6. Output Schema                     |
    |------------------------------------->|
    |                                      |
    |                              7. Plan |
    |<-------------------------------------|
    |                                      |
    |                           8. Execute |
    |<-------------------------------------|
    |                                      |
    |                        9. Self-Check |
    |<-------------------------------------|
    |                                      |
```

## 模板骨架（McKinsey 顺序 - 结论先行）
```md
Instruction: {task}
Constraints: 语言/长度/语气/禁用（输入侧限制）
Inputs: {vars_json}（注意 JSON 转义）
Few-shot: 正例 x1 + 边界例 x1
Tools Spec: 函数签名或 JSON Schema
Output Schema: 字段、类型、枚举、错误处理
Guardrails: 无答案=空结果；需引用则列来源+cred（输出侧兜底）
```

## 常用技巧
- **Few-shot 分层**：正例 + 边界例各 1-2 个即可。
- **显式思考 (CoT)**：阶段指令“先要点/计划，再结论”，不摊开长推理。
- **PER 模型**：Plan-Execute-Review 三段式，带自检。
- **风格卡**：术语、语气、禁用词统一。
- **结构化输出**：优先 JSON/表格（**面向程序/自动化接口时**）；字段强约束；声明空值策略。

## 综合示例：高情商拒绝信（日常场景）
```md
# Role
You are a Communications Expert specializing in professional business etiquette.

# Instruction
Draft a polite but firm email declining the invitation below.

# Constraints
- Tone: Professional, empathetic, but decisive.
- Length: Under 100 words.
- Format: Plain text email (Subject + Body).
- Do NOT propose a specific future time (avoid "maybe next month").

# Inputs
Invitation: "${sender_email_content}"

# Few-shot
Input: "Hey, want to grab coffee to discuss the partnership?"
Output:
Subject: Re: Partnership discussion
Hi [Name],
Thanks for reaching out! I appreciate the offer, but I'm currently fully committed to Q3 priorities and can't take on new partnership discussions right now.
I'll reach out if things change. Best of luck!

# Output Schema
Subject: [Email Subject]
Body: [Email Body]

# Guardrails
- Never apologize profusely (don't say "I'm so so sorry").
- Don't make up fake excuses.
```
