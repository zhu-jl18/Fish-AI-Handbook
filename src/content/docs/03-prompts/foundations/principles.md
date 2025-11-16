---
title: 核心原则与骨架
description: 单一目标、结构优先、模板顺序与常用技巧合集
contributors:
  - codex
---

## 关键信条
- 单一目标：一次只做一件事，拒绝“顺便”。
- 分层职责：System/Developer/User 分明，冲突以上层为准。
- 结构先行：先定输出 Schema /表格/JSON，再填内容。
- 可验证：给验收准则、错误码、空结果策略。
- 最小充分：只注入当前任务必需事实，避免噪声。
- 拒识与来源：无答案=空；需引用则标来源+信度。
- 过程解耦：先思考/计划，再结论；可选自检清单。

## 提示词六要素（顺序）
1) 角色设定  
2) 任务定义  
3) 上下文事实（最小充分）  
4) 输出格式/Schema  
5) 约束条件（语气、长度、禁用项）  
6) 示例（正例+边界例）

顺序图：

  User -> LLM: Instruction
  User -> LLM: Constraints
  User -> LLM: Inputs
  User -> LLM: Few-shot
  User -> LLM: Tools Spec
  User -> LLM: Output Schema
  LLM  -> User: Plan
  LLM  -> User: Execute
  LLM  -> User: Self-Check

## 模板骨架（McKinsey 顺序）
```md
Instruction: {task}
Constraints: 语言/长度/语气/禁用/拒识策略
Inputs: {vars_json}（转义规则）
Few-shot: 正例x1 + 边界例x1
Tools Spec: 函数签名或 JSON Schema
Output Schema: 字段、类型、枚举、错误处理
Guardrails: 无答案=空结果；需引用则列来源+cred
```

## 常用技巧
- Few-shot 分层：正常样例+边界样例各 1-2 个即可。
- 显式思考：阶段指令“先要点/计划，再结论”，不摊开长推理。
- PER：Plan-Execute-Review 三段式，带自检。
- 风格卡：术语、语气、禁用词统一。
- 结构化输出：优先 JSON/表格；字段强约束；声明空值策略。
