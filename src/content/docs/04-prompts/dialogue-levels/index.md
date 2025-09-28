---
title: 对话层级
description: 对话层级占位。
---

  正确的三层结构（基于OpenAI API）

  1. System Role（系统角色）

  定义：
  - 设置AI助手的整体行为和指导原则
  - 提供高级指令和上下文设置

  作用：
  - 定义AI的身份和响应方式（如"You are a helpful assistant"）
  - 设置回答问题的风格和限制
  - 通常在对话开始时设置一次

  2. User Role（用户角色）

  定义：
  - 代表人类用户的输入消息
  - 用户提出的查询、问题或命令

  作用：
  - 提供具体的请求或评论供助手响应
  - 每次交互中用户想要AI完成的任务
  - 相当于用户的"发言"

  3. Assistant Role（助手角色）

  正确定义：
  - 存储AI模型之前的响应内容
  - 维护对话历史和上下文
  - 记录AI在对话中的所有回复

  作用：
  - 保存AI的历史回答以维持对话连贯性
  - 提供对话上下文，让AI了解之前说过什么
  - 确保对话的一致性和相关性

  关键认知纠正

  Assistant角色不是当前的回复生成，而是：
  - 历史回复的记录
  - 对话上下文的维护
  - 之前响应的存储

  在API调用中，结构如下：
  [
    {"role": "system", "content": "You are a helpful assistant"},
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi! How can I help you?"},
    {"role": "user", "content": "What's the weather?"}
  ]

  这里assistant消息是为了让AI知道它之前已经回复过什么，以保持对话的连贯性。
