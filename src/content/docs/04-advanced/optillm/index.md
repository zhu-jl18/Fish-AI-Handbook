---
title: 'OptILLM'
description: '推理时优化代理：无需训练即可提升 LLM 推理准确性的透明代理系统。'
---

## 什么是 OptILLM？

OptILLM 是一个 OpenAI API 兼容的优化推理代理（Optimizing Inference Proxy）。它的设计目标很明确：在不修改模型本身的前提下，通过推理时（inference-time）的优化技术，显著提升大语言模型在编程、逻辑和数学等推理任务上的准确性。

这个系统作为透明代理运行在客户端应用和 LLM 提供商之间。客户端发出的请求经过 OptILLM 拦截后，会被应用各种优化策略处理，最终返回经过增强的响应。对客户端而言，只需要将 API 的 base_url 指向 OptILLM 即可，无需改动代码逻辑。

## 为什么是高级技术？

传统提升模型能力的方式往往需要重新训练或微调模型，成本高且周期长。OptILLM 采用的推理时优化完全绕过了这个过程，在模型已经训练完成、参数固定的情况下，通过改变推理过程本身来提升输出质量。根据官方数据，这种方法可以在推理任务上获得 2 到 10 倍的准确性提升。

OptILLM 的架构基于 Flask 构建的代理服务器，实现了请求路由、优化策略选择和响应处理的完整流程。它支持多个 LLM 提供商（OpenAI、Azure OpenAI、Cerebras 等），并通过 LiteLLM 实现统一接入。这种设计使得同一套优化技术可以应用于不同的底层模型，具有很强的通用性。

更重要的是，OptILLM 提供了标准化的安全框架。它基于 OAuth 2.1 等成熟的授权机制，确保所有优化操作都在可控范围内进行。这对于需要在生产环境中部署 AI Agent 的场景尤为重要。

## 核心能力

OptILLM 实现了 20 多种推理时优化技术，这些技术可以分为五类。Planning-Based 方法如 CePO、PlanSearch 和 MCTS 会先生成结构化的计划，再逐步执行以解决问题。Sampling-Based 方法如 Best of N、Mixture of Agents 和 Self-Consistency 通过生成多个候选答案，然后选择或组合最优结果。Reasoning-Based 方法如 Chain-of-Thought with Reflection 和 R* Algorithm 采用多步推理并加入反思和修正机制。Solver-Based 方法直接调用形式化工具如 Z3 定理证明器来处理逻辑推理。Decoding-Based 方法则在生成 token 的过程中修改解码策略，包括 CoT Decoding、Entropy Decoding 和 ThinkDeeper。

这些优化技术可以通过三种方式指定：在模型名前加前缀（如 `moa-gpt-4o-mini`），在 API 请求的 `extra_body` 参数中指定，或者在提示词中使用标签（如 `<optillm_approach>re2</optillm_approach>`）。多个技术可以用 `&` 串行组合或用 `|` 并行组合，提供了灵活的优化策略配置能力。

插件系统是 OptILLM 的另一个重要组成部分。插件可以在请求前预处理（如匿名化 PII、从 URL 添加上下文），增强模型能力（如执行代码、结构化 JSON 输出），或在响应后处理（如管理记忆、去匿名化）。典型的插件包括 System Prompt Learning（SPL）让模型通过经验学习问题解决策略，Chain-of-Code（CoC）结合推理链和代码执行与模拟，Memory 管理无界的对话历史上下文，Deep Research 实现 Test-Time Diffusion Deep Researcher 以生成全面的研究报告，以及 Proxy 提供跨多个 LLM 提供商的负载均衡和故障转移。

OptILLM 还包含本地推理系统，支持直接运行 HuggingFace 模型和 LoRA 适配器，以及专门的解码策略如 CoT Decoding 和 Entropy Decoding。这使得 OptILLM 可以在无需外部 API 调用的情况下完成推理优化。

## 应用场景

OptILLM 适用于需要高质量推理能力的场景。在 AI 辅助开发中，它能让 AI Copilot 更准确地理解代码逻辑并生成可靠的实现。在企业自动化中，它可以提升 AI Agent 处理复杂业务流程的能力。在需要严格逻辑推理的数学、科学或工程问题求解中，OptILLM 的 Solver-Based 和 Reasoning-Based 技术能显著提高答案的正确性。

总之，OptILLM 为构建更强大、更可靠的 AI 应用提供了一个即插即用的推理增强层。它不要求改变底层模型，不需要额外的训练成本，只需要在推理时应用正确的优化策略，就能获得显著的性能提升。

## 参考文献

[1] codelion/optillm, GitHub Repository, https://github.com/codelion/optillm
