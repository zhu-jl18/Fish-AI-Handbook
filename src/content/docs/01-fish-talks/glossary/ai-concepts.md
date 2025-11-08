---
title: AI Concepts
description: brief introduction to some important concepts
---

简单的过一遍基础概念而已

## Prompt Engineering

- system prompt
- user prompt
- assistant response

## Context Engineering

不同于上边Prompt Engineering，上下文工程是当今Agent的核心技术。

- 智能搜索：以 claude code为代表
- RAG：以augment为代表

## Hallucination

First of all I will give an example of hallucination.

```
虚构不存在的东西
```

这是任何模型都无法避免的，也是在使用中需要着重注意的。

### Search

web_search:
- 使用搜索引擎进行搜索

没太搞懂这个概念。

### Grounding

Grounding is the process of linking the model's output to the real world.

```
例如，如果模型回答“今天天气怎么样？”，我们需要将模型回答“今天天气晴朗”与实际天气情况进行链接。
```

grounding 指的是将模型的抽象知识与真实世界、可验证的外部数据源（如知识库或文档）建立联系的过程，这有助于模型生成更准确、事实性的输出。

它能显著减少模型的“幻觉”（即生成虚假信息），提升响应可靠性，尤其在医疗、金融等高风险领域。 研究表明，grounding 可提高模型在复杂任务中的表现，但并非完美解决所有问题。

## MCP

A good video to clarify the difference between MCP and Function Calling: [MCP 与 Function Calling 到底什么关系，以及为什么我认为大部分人的观点都是错误的](https://www.bilibili.com/video/BV15YJTzkENC/?share_source=copy_web&vd_source=b0665997e327e80accab2d35772a5a00)

## RAG

[RAG 工作机制详解——一个高质量知识库背后的技术全流程](https://www.bilibili.com/video/BV1JLN2z4EZQ/?share_source=copy_web&vd_source=b0665997e327e80accab2d35772a5a00)
- Embedding
