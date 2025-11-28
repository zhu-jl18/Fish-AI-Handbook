---
title: 核心概念
description: 重要概念简介，后续章节详细展开。
contributors: [codex, claude]
---

这些概念后面会详细讲。这里先过一遍。

## Prompt Engineering

大多数人理解的 Prompt Engineering：字符串拼接。猜哪个词效果好。

这不是工程，这是玄学。

**真正的 Prompt Engineering**：

- 把 Prompt 当函数，有输入输出签名
- 建评估集，用指标衡量效果
- 用优化器自动搜索最佳 Prompt

代表工具：DSPy。

基本结构：

| 角色 | 说明 |
|:---|:---|
| System | 系统指令，定义行为 |
| User | 用户输入 |
| Assistant | 模型输出 |

📖 详见 [提示词](/prompts)

## Context Engineering

Prompt Engineering 管的是怎么写指令。Context Engineering 管的是模型能看到什么。

- 记忆管理
- 工具调用
- 文档检索

模型只能处理它看到的东西。Context Engineering 决定它看到什么。

📖 详见 [RAG](/advanced/rag)、[MCP](/advanced/mcp)

## Hallucination

模型编造事实。

表现：
- **事实捏造**：问中国男足奥运夺冠阵容，它能编出来
- **指令违背**：让它别解释，它说"好的"然后继续解释
- **引用伪造**：论文综述里的参考文献，作者、标题、页码都是假的

原因：模型不知道答案时不会闭嘴，它选择自信地编。

对策：**默认它在撒谎，核实后再信**。

## Grounding

把模型输出锚定到可验证的来源。

没有来源的输出 = 不可信。

实现方式：
- 搜索增强（Web Search）
- 知识库检索（RAG）
- 引用标注

📖 详见 [RAG](/advanced/rag)

## RAG

Retrieval-Augmented Generation。检索增强生成。

原理：先查，再答。

```text
用户问题 --> 检索相关文档 --> 把文档塞进 Prompt --> 模型基于文档回答
```

不是魔法，就是搜索引擎 + 文本生成器。

📖 详见 [RAG](/advanced/rag)

## MCP

Model Context Protocol。模型上下文协议。

解决的问题：每个人都在写自己的胶水代码连接 LLM 和工具。

MCP 是标准化方案。AI 界的 USB-C。

用它，或者继续维护你的意大利面代码。

📖 详见 [MCP](/advanced/mcp)
