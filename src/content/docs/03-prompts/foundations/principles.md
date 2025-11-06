---
title: 核心原则
description: 单一目标、角色分离、结构优先、可验证与上下文最小充分
contributors:
  - codex
---

## 关键信条（必须遵守）

- 单一目标：一次只让模型做一件事，避免隐式多目标与耦合。
- 角色分离：System/Developer/User 分层；冲突以上层为准。
- 结构优先：先约束输出模式（JSON/表格/标签），再给内容素材。
- 可验证：输出可机判，附评分准则、错误码与空结果策略。
- 上下文最小充分：只注入当前任务必需事实，降低遗忘与干扰。
- 拒识与来源：无答案输出空；需引用则显式“来源-信度”字段。
- 过程-结果解耦：阶段化“先思考后结论”，而非泄露冗长思维链。
- 计划-执行-复核：三段式流程+自检清单，确保结果闭环。

## 基本构成（提示词六要素）

1) 角色设定  2) 任务定义  3) 上下文  4) 格式要求  5) 约束条件  6) 示例样本

UML（顺序图）：

  User -> LLM: Instruction
  User -> LLM: Constraints
  User -> LLM: Inputs (placeholders)
  User -> LLM: Few-shot
  User -> LLM: Tools Spec
  User -> LLM: Output Schema
  LLM  -> User: Plan
  LLM  -> User: Execute
  LLM  -> User: Self-Check
