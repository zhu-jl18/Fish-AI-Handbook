---
title: 对话层级
description: 理解大语言模型对话中的System、Assistant和User三个层级角色。
---

一轮对话由三个不同层级组成：
- 系统提示（system prompts）
- 助手消息（assistant message）
- 用户提示（user prompts）

## System

**系统提示词 (System Prompts)** 是一种高层次的指令，用于在整个会话或任务期间，为 AI 模型设定一个持久的上下文、角色、行为准则和约束。与用户提示词驱动单次交互不同，系统提示词像是为 LLM注入的"底层逻辑"，持续影响着模型的每一次响应。
如"You are a helpful assistant"。

## User

**用户提示词 (User Prompts)** 是用户向 AI 模型发出的指令、问题或输入，是整个 AI 交互的起点。它定义了任务的边界、目标和约束，是决定模型输出质量最关键的变量。
如“请帮我解释一下这个概念，要求50字以内”

## Assistant 消息

**助手消息（Assistant Message）**不是当前的回复生成，而是历史回复的记录，它用于维持对话连贯性。在API调用中，结构如下：

```json
[
  { "role": "system", "content": "You are a helpful assistant" },
  { "role": "user", "content": "Hello" },
  { "role": "assistant", "content": "Hi! How can I help you?" },
  { "role": "user", "content": "What's the weather?" }
]
```
