---
title: 上下文与状态管理
description: Your context window is not a trash can.
contributors:
  - codex
  - gemini
---

## Context Window 不是垃圾桶

现在的模型厂商都在吹嘘 "Infinite Context" (无限上下文) —— 100k, 200k, 1M tokens。
**Don't fall for the marketing hype.**

技术上它们确实能读进去，但从 **Attention Mechanism (注意力机制)** 的角度看，上下文越长，信噪比 (Signal-to-Noise Ratio) 就越低。模型就像人一样，你给它一本 500 页的书，问它第 3 页脚注里的一个拼写错误，它大概率会由幻觉 (Hallucination) 填补空白。

**Effective Context Engineering is about Context Hygiene.** (高效的上下文工程在于上下文卫生)。

你必须像管理内存 (RAM) 一样管理你的 Context。当内存泄露 (Memory Leak) 或堆满了垃圾对象时，你需要 GC (Garbage Collection)。

在对话中，手动 GC 的方式主要有两种：**状态传递 (The Baton Pass)** 和 **熔断机制 (The Circuit Breaker)**。

## 策略一：状态传递 (The Baton Pass)

这是最重要、但最少人用的技巧。

### 场景
当你完成了一个阶段的任务（比如"需求分析"），准备进入下一个阶段（比如"代码实现"）时。

### 错误做法
在同一个聊天窗口里一直聊下去。
此时 Context 里充满了你们讨论需求的反复拉锯、修改、废弃的草稿。当你让模型 "开始写代码" 时，它的注意力会被前面 50 轮的废话分散。

### 正确做法：The Summary Transfer

1.  **Freeze State (冻结状态)**：
    在当前的对话结尾，要求模型总结当前达成的共识。
    > "停。我们已经确定了需求。现在，请把我们需要实现的所有功能点、技术栈选择、以及核心约束，总结成一个清晰的列表。不要废话，只列干货。"

2.  **Copy & Switch (复制与切换)**：
    复制这段总结。

3.  **New Thread (新进程)**：
    开启一个新的 Chat。

4.  **Inject State (注入状态)**：
    把总结作为 System Prompt 或第一条 User Message 发送过去。
    > "你是一个高级工程师。这是我们刚才确定的需求规格：[粘贴总结]。现在，基于这个规格，我们开始编写核心模块 X..."

### Why it works?
你手动做了一次 "Attention Masking"。你把之前 10k token 的噪音压缩成了 500 token 的纯净信号 (Pure Signal)。模型现在的注意力 100% 集中在"如何实现"上，而不是"刚才用户是不是说过不要用 React？哦不对那是三小时前说的"。

## 策略二：熔断机制 (The Circuit Breaker)

当你发现模型开始胡说八道时，**Stop. Just stop.**

### 场景
你指出了代码里的一个 Bug，模型说 "Ah, I apologize, fixed it here."
你一跑，Bug 还在。
你再说 "还是不对"，模型又说 "My apologies, here is the corrected version."
循环三次以上。

### 错误做法
继续在这个对话里纠缠 (Debate)。
这时候模型的 Context 里已经充满了 "错误代码 -> 错误修复 -> 再次错误" 的 Pattern。LLM 本质上是基于概率预测下一个 token 的，当上下文里全是错误的 pattern 时，它预测出正确代码的概率会指数级下降。这就叫 **Hallucination Explosion (幻觉爆炸)**。

### 正确做法：Fail Fast

1.  **Cut the loss (止损)**：
    一旦发现模型陷入 "Apology Loop" (道歉循环)，立刻停止对话。不要试图纠正它，它已经在这个 Context 里“醉”了。

2.  **Analyze (分析)**：
    自己分析一下为什么它错了。是不是没给够信息？是不是问题太复杂需要拆解？

3.  **Restart (重启)**：
    **开启一个新对话**。
    把原始问题重新包装一下，把刚才它犯错的点作为"负面约束"加进去。
    > "写一个函数解决 X 问题。注意，不要使用 Y 方法，因为会导致 Z 错误（我刚才试过了）。"

**A fresh context is smarter than a confused long-context.**

## 技术层面的上下文：System, User, Assistant

对于开发者来说，直接操作 API 时，你需要理解这三个角色。

### System (The Kernel)
这是上帝视角。它的权重通常最高。
不要把 System Prompt 写成一篇论文。**Keep it static, keep it high-level.**
-   ✅ "你是资深 Python 工程师，只输出代码，不输出废话。"
-   ❌ (把整个项目文档塞在这里)

### User (The Input)
这是你的指令。
User Prompt 应该包含 **Task-Specific Context**。
如果你的任务需要文档 A，就在这次 User Prompt 里把文档 A 贴进去。不要指望它记得 10 轮对话前贴过的文档 A。

### Assistant (The Output/History)
这是模型的回复。
在 API 调用中，你可以伪造 Assistant 的回复来做 Few-Shot Learning。
比如你想让它输出 JSON，你可以伪造一轮对话：
-   User: "分析这个..."
-   Assistant: `{"status": "processing"}` (人为注入的开头，引导它按这个格式继续)

## 总结

Prompt Engineering 不止是写作文，它是**管理信息流**。

1.  **Keep it clean.** 觉得上下文脏了，就洗掉 (Restart)。
2.  **Summarize & Carry over.** 像接力赛一样传递信息，不要背着所有历史包袱跑。
3.  **Fail fast.** 遇到死循环直接拔网线（开新帖），别跟醉汉讲道理。

Remember: **Garbage In, Garbage Out.** Even with AI.