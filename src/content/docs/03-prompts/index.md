---
title: 提示词工程
description: Prompt Engineering 不是魔法，是逻辑与状态管理的艺术
contributors:
  - codex
  - gemini
---

## Talk is cheap, show me the prompt.

我们要澄清一个误区：**Prompt Engineering 不是在那念咒语 (casting spells)。**

市面上有太多所谓的 "God Mode Prompt" 或者 "超级咒语"，试图让你相信只要复制粘贴一段神秘文字，LLM 就能瞬间从人工智障变成爱因斯坦。

**That's bullshit.**

Prompt Engineering 的本质非常无聊，它只有两件事：
1.  **Instruction Design (指令设计)**：你能否用人话（逻辑清晰的语言）把任务描述清楚。
2.  **Context Management (状态管理)**：你能否控制模型"看到了什么"，而不是任由由于对话产生的垃圾信息填满它的窗口。

大部分人的问题不在于不知道怎么写 "You are a helpful assistant"，而在于他们既写不清楚逻辑，又任由上下文变成一堆垃圾堆 (Garbage dump)。

## The Core Equation

如果非要给个公式，Prompt Engineering 是这样的：

$$ \text{Output} = f(\text{Instruction}, \text{Context}) $$

-   **Instruction** 是你的代码逻辑。如果你的逻辑是混乱的，GPT-5 也救不了你。
-   **Context** 是你的内存 (RAM)。如果你往内存里塞满了过期的、错误的变量，程序崩溃是迟早的事。

这一章我们不谈玄学，只谈工程。

## 学习路线

如果你想真正掌握这门手艺，按这个顺序看：

1.  [**Foundations (基础)**](/prompts/foundations)
    <br/>先学会怎么写一个合格的单次请求。如果你连单轮对话都写不明白，就别想搞复杂的 Agent 了。
    <br/>*Key: Task, Constraints, Schema.*

2.  [**Context & State (上下文与状态)**](/prompts/context)
    <br/>**这是目前最被低估的一环。** 学会何时 "Kill the process"（开启新对话），学会如何在不同对话间传递状态 (The Baton Pass)。
    <br/>*Key: State Transfer, Circuit Breaker, Clean Context.*

3.  [**Examples (实战模板)**](/prompts/examples)
    <br/>一些能用的 Copy-paste 模板，但别只做 "Copy-cat"，要看懂背后的逻辑。

4.  [**Deepen (进阶)**](/prompts/deepen)
    <br/>当简单的 Prompt 搞不定时，你需要更复杂的框架 (CoT, ReAct, etc.)。

## 最后给新手的建议

**Stop treating LLMs like a magic 8-ball.**

把它们当成一个刚刚入职、极其聪明但完全没有背景知识的实习生。
如果你给实习生发个任务说 "帮我搞定这个"，被炒鱿鱼的是你。
你得告诉他：背景是什么，限制是什么，输出要成什么样。

Make it clear, make it concise.
