---
title: AI Concepts
description: brief introduction to some important concepts
contributors: [codex,gemini] 
---

简单的过一遍基础概念而已

## Prompt Engineering

绝大多数人理解的 Prompt Engineering，其实只是**字符串拼接 (String Concatenation)**。你只是在把单词凑在一起，试图用“咒语”让模型听话。如果你只是在盲目地猜哪个词效果更好，请别侮辱“工程”这两个字。

**真正的 Prompt Engineering (2025 Edition)**：

它是系统化的、程序化的，是以 **DSPy** 为代表的**自动化优化**。

- **它是编程，不是写作**：把 Prompt 视为具有输入输出签名的函数模块，而不是一段散文。
- **它是数据驱动的**：建立评估集 (Evaluation Set)，用具体的指标 (Metrics) 来衡量效果，而不是靠“感觉不错”。
- **它是自动化的**：使用优化器 (Optimizers) 自动搜索和迭代最佳 Prompt，而不是让人类充当拼写检查员。

简而言之：**Stop guessing, start programming.**

- **System Prompt**: 系统的“上帝视角”指令。
- **User Prompt**: 你实际想要完成的任务。
- **Assistant Response**: 模型吐出来的结果。

## Context Engineering

Prompt engineering is for script kiddies. Context engineering is for system architects. It's about managing the entire state—memory, tools, documents—so the model isn't brain-dead.

- **Smart Search**: Giving the model actual eyes instead of letting it hallucinate.
- **RAG**: Stuffing the answer into the prompt so the model doesn't have to guess.

## Hallucination

**定义：机器的谵妄，一本正经的胡说八道。**

别被 AI 的自信骗了。所谓的“幻觉”，就是大语言模型（LLM）在事实真空中裸奔，用概率堆砌出的谎言。它不是在“思考”，它只是在“填空”。当它不知道答案时，它不会闭嘴，而是选择自信地编造。

表现形式：

1.  事实捏造 (Fact Fabrication)：
       例子：问它“2024年奥运会中国队足球夺冠阵容”，它能给你列出一份看起来毫无破绽的名单，尽管中国男足根本没进奥运会。
       本质：模型把不相关的记忆碎片强行拼凑，产出逻辑自洽但违背现实的垃圾。

2.  指令依从性幻觉 (Instruction Following Hallucination)：
       例子：你要求“不要输出任何解释”，它嘴上答应“好的”，反手就给你输出了一大段解释。
       本质：对齐（Alignment）失败，模型在讨好人类和遵循指令之间精神分裂。

3.  引用伪造 (Citation Fabrication)：
       例子：让它写论文综述，它会凭空捏造出作者、标题甚至页码都对得上的参考文献。
       本质：它学到了学术引用的格式（Syntax），却完全不在乎引用的内容（Semantics）是否存在。

记住： 在你核实之前，默认它在撒谎。

### Search

- 使用搜索引擎进行搜索
**Web Search**: The only way to fix a model that thinks it's 2021. If your model can't search, it's just a fancy autocomplete.

### Grounding

Grounding is the process of linking the model's output to the real world.
Tying the model's hallucinations to reality. If it can't point to a source, it's lying. G

```
例如，如果模型回答“今天天气怎么样？”，我们需要将模型回答“今天天气晴朗”与实际天气情况进行链接。
```

It's about accountability. Google's Vertex AI pushes this hard—linking generation to verifiable data sources (Google Search, Maps, or your own data). If you can't verify it, it's garbage.

## MCP

**Model Context Protocol**. Finally, a standard. Before this, everyone wrote their own garbage glue code to connect LLMs to tools. It's the USB-C for AI. Use it or enjoy maintaining your spaghetti code.

[MCP vs Function Calling](https://www.bilibili.com/video/BV15YJTzkENC/?share_source=copy_web&vd_source=b0665997e327e80accab2d35772a5a00)

## RAG

**Retrieval-Augmented Generation**. The concept is simple: Look up the answer *before* you try to answer. It's not magic, it's a search engine attached to a text generator.

[RAG Workflow Explained](https://www.bilibili.com/video/BV1JLN2z4EZQ/?share_source=copy_web&vd_source=b0665997e327e80accab2d35772a5a00)
