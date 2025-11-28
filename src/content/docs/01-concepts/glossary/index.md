---
title: 术语速查
description: 常见术语的简明定义。
contributors: [codex, claude]
---

这里的术语本教程不会深入讲。知道是什么就够了。

## 模型训练

**Pre-training** - 用海量数据训练基础能力。所有大模型的起点。

**Fine-tuning** - 在预训练模型上用特定数据继续训练。让通用模型变专用。

**SFT** - Supervised Fine-Tuning。用人工标注的问答对训练模型。

**RLHF** - Reinforcement Learning from Human Feedback。让人给模型打分，用反馈优化模型。ChatGPT 的核心技术之一。

**LoRA** - Low-Rank Adaptation。只训练一小部分参数的微调方法。省显存，穷人首选。

**Alignment** - 让模型行为符合人类意图。防止它说有害的话。

## 模型部署

**Quantization** - 把模型权重从高精度压缩到低精度。省显存，但损失精度。

**FP32 / FP16 / BF16** - 浮点精度格式。数字越小，精度越低，推理越快。

**FP8 / INT8 / INT4** - 更激进的低精度格式。模型服务商标的精度直接影响输出质量。

**Inference** - 模型处理请求的过程。你问它问题，它给你答案。

**Latency** - 从发请求到收到第一个 token 的时间。

**Throughput** - 单位时间处理的 token 数。

## 基础概念

**Token** - 模型处理文本的基本单位。不是字，不是词，是模型自己切的碎片。中文约 1.5-2 字符 = 1 token。

**Embedding** - 把文本转成数字向量。让计算机能处理语义。

**Vector Database** - 存储和检索向量的数据库。RAG 的核心组件。

**Context Window** - 模型一次能看到的最大 token 数。超了就截断。

**Long Context** - 支持大上下文窗口。从 4K 到 128K 甚至 1M tokens。

## 模型能力

**Multimodal** - 能处理多种输入：文本、图片、音频、视频。

**Vision** - 理解图片的能力。看图说话、分析图表。

**Function Calling** - 模型识别何时需要调用工具，并生成调用参数。MCP 的前身。

**Reasoning** - 逻辑推理、数学计算、多步思考。o1、DeepSeek-R1 的卖点。

**Chain of Thought** - 让模型一步一步思考。提升复杂问题的解决能力。

## 评估指标

**Perplexity** - 模型预测下一个 token 的不确定性。越低越好，但不直接反映实际效果。

**BLEU / ROUGE** - 评估生成文本质量的传统指标。主要用于翻译和摘要。

**ELO Rating** - 借鉴国际象棋的评分系统。模型对战排名。Chatbot Arena 用的就是这个。
