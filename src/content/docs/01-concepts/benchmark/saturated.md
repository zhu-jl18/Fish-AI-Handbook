---
title: 被刷烂的 Benchmark
description: 已饱和或污染严重的测试，仅供参考
tab:
  label: 被刷烂的
  order: 20
contributors:
    - claude
    - codex
    - gemini
---

这些测试要么已经饱和（大家分都太高），要么针对特定领域，仅作参考。

| Benchmark | 测试内容 | 典型分数 / 说明 |
| --- | --- | --- |
| [MATH](https://github.com/hendrycks/math) | 竞赛级数学题 | 顶级模型普遍 95%+；Gemini 3.0 Pro 甚至拿了满分（AIME 100% w/ code） |
| [GSM8K](https://github.com/openai/grade-school-math) | 小学数学题 | 分数已饱和，仅用于检测模型是否存在明显短板 |
| [HumanEval](https://github.com/openai/human-eval) | Python 基础编程 | 样本量小且污染严重，建议看 LiveCodeBench |
| [IFEval](https://github.com/google-research/google-research/tree/master/instruction_following_eval) | 指令遵循 | 衡量"听话程度"，Gemini 3.0 Pro 表现优异 |
| [GAIA](https://huggingface.co/gaia-benchmark) | Agent 工具协作 | Gemini 3.0 Pro 85.4% (τ2-bench)；Agent 能力大幅提升 |
| [WebArena](https://webarena.dev) | 网页操作 Agent | Gemini 3.0 Pro 登顶 WebDev Arena (Score 1487) |

## 为什么"烂"？

**MATH / GSM8K**：分数已饱和，区分度为零。顶级模型基本刷满分，没法判断谁更强。

**HumanEval**：样本量只有 164 题，且题目早已在各种训练集里泡过无数遍。分数高可能只是"背过答案"。

**IFEval / GAIA / WebArena**：这些不是真的"烂"，而是针对特定能力（指令遵循、工具使用、网页操作）。作为专项参考可以，但不能代表综合能力。

---

这些 Benchmark 的分数仍然有意义——如果一个模型连这些"送分题"都考砸了，那确实有问题。但如果只是用来对比顶级模型，意义不大。
