---
title: Model Parameters - Penalty 与输出控制
description: 重复抑制、长度限制与 Streaming 机制
contributors:
  - claude
  - codex
tab:
  label: Penalty+输出
  order: 30
hasMath: true
---

## Frequency Penalty & Presence Penalty

这两个参数用于抑制重复输出，通过降低已出现 token 的概率来实现。**Frequency Penalty** 根据 token 的出现次数累计惩罚，出现越多降得越狠；**Presence Penalty** 只要 token 出现过就惩罚，不管出现几次。范围通常为 -2.0 到 2.0（OpenAI），默认为 0（不惩罚）。

工作机制对比（假设原始概率为 $P_0$，token 已出现 $n$ 次）：

| 参数      | 惩罚公式                | 出现 1 次 | 出现 3 次 | 出现 10 次 | 特点                     |
| --------- | ----------------------- | --------- | --------- | ---------- | ------------------------ |
| Frequency | $P_0 - \alpha \times n$ | 降一点    | 降得多    | 降得非常多 | 累计惩罚，打击"高频词汇" |
| Presence  | $P_0 - \alpha$          | 降一点    | 降一点    | 降一点     | 固定惩罚，只管"出现过"   |

假设模型在写文章，候选词 "AI" 原始概率 30%，已在文中出现 5 次。penalty=1.0 时：

```
无惩罚         → P("AI") = 30% → 继续可能选 "AI"
Frequency=1.0  → P("AI") ≈ 30% - 5×惩罚系数 → 大幅下降，倾向选其他词（如 "technology"）
Presence=1.0   → P("AI") ≈ 30% - 1×惩罚系数 → 小幅下降，仍可能选 "AI"
```

### 典型场景对比

生成文本 "AI is powerful. AI is everywhere. AI will..."

| Penalty       | 输出效果                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------- |
| 无            | AI is powerful. AI is everywhere. AI will transform... AI enables... ← 无脑重复              |
| Frequency=1.0 | AI is powerful. This technology is everywhere. Machine learning will transform... ← 主动换词 |
| Presence=1.0  | AI is powerful. AI is everywhere. Technology will transform... ← 轻微克制，但还会重复        |

### 什么时候需要调？

| 场景            | 推荐值            | 原因                                 |
| --------------- | ----------------- | ------------------------------------ |
| 正常对话/写代码 | 0（默认）         | 适度重复是自然的，没必要干预         |
| 模型像复读机    | frequency=0.5-1.0 | 强制多样性，避免循环输出             |
| 写长文需要变化  | presence=0.5      | 温和提醒用过的词，不会太激进         |
| 任何场景        | < 1.5             | 太高会导致语义崩坏，为了不重复而瞎编 |

99% 情况下默认值（0）够用。只有当模型输出明显重复（"AI... AI... AI..."）时才需要 frequency=0.5-1.0。

---



## Streaming

控制 token 生成的返回方式。LLM 生成文本是**自回归过程**：每次预测一个 token，把它加到输入序列末尾，再预测下一个，循环直到遇到结束符或达到长度限制。Streaming 决定这些 token 是攒够再返回，还是生成一个发一个。

### 技术实现差异

| 模式           | 工作机制                                        | 网络行为                        | 用户体验                 |
| -------------- | ----------------------------------------------- | ------------------------------- | ------------------------ |
| `stream=False` | 模型生成完整序列 → 一次性返回全部 tokens        | 单个 HTTP 响应，可能等 10-60 秒 | 卡住无反馈，用户以为死了 |
| `stream=True`  | 每生成 1 个 token → 立即通过 SSE/WebSocket 推送 | 持续连接，逐块传输              | 逐字显示，像打字机       |

本质上 streaming 不改变生成逻辑，只改变传输时机。模型内部都是一个个 token 顺序生成，区别在于：非 streaming 要等所有 token 都生成完才发送；streaming 生成一个就推一个。

### 为什么生产环境必须开？

用户心理学。人类感知延迟的阈值是 100ms，超过 1 秒就觉得卡。生成 500 token 的回答可能要 5-10 秒，非 streaming 模式下用户盯着空白屏幕 10 秒会崩溃；streaming 模式下第一个 token 在 200ms 内出现，用户知道"在工作了"，愿意等。

### 代价与陷阱

| 问题                     | 原因                                                        | 解决方案                                     |
| ------------------------ | ----------------------------------------------------------- | -------------------------------------------- |
| `usage` 等 metadata 缺失 | 只有生成完才能统计 token 数，streaming 时要等最后一个 chunk | 监听 `done` 事件或最后的 chunk               |
| 连接中断数据丢失         | SSE 是单向流，断了不会重传                                  | 客户端实现重连 + 记录已接收位置              |
| SDK 处理 bug             | 有些 SDK 缓冲区处理有 bug，漏 token 或截断                  | 测试时对比 streaming/非 streaming 输出一致性 |

唯一需要 `stream=False` 的场景：输出必须是完整结构（如 JSON），你要先验证格式再处理。因为 streaming 模式下可能收到一半时 JSON 不完整。
