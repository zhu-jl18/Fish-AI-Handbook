---
title: Benchmark
description: Who is better?
contributors:
    - claude
    - codex
    - gemini
---


## My Ranking

综合模型能力以及日常使用体验

<img src="https://p.sda1.dev/28/3ef33475959f6e0d989edeecc3c97211/image.png" >



能打榜不代表能干活，但连榜都上不去，别谈生产。

Benchmark 是统一试卷，分数只是信号，不是能力。厂商爱报 SOTA 因为数字好卖，但别被标题带着走。

优化 benchmark ≠ 解决用户问题。高分模型可能只是对数据集过拟合了，点名 Grok 和 Qwen 。



## 主流 Benchmarks (Core)

分数只是信号，不是能力。但如果是 Humanity's Last Exam 这种级别的信号，那确实代表能力。

| Benchmark | 测试内容 | 典型分数 / 说明 |
| --- | --- | --- |
| [Humanity's Last Exam](https://agi.safe.ai/) | 2,500 题跨 100+ 学科 | Gemini 3.0 Pro 37.5%；GPT-5 25.3%（2025.11）；目前最难通用考试 |
| [GPQA Diamond](https://github.com/idavidrein/gpqa) | 研究生级别科学问题 | Gemini 3.0 Pro 91.9%；GPT-5 87.3%（2025.11）；已超越人类专家 |
| [SWE-bench Verified](https://www.swebench.com) | 真实 GitHub issues | Gemini 3.0 Pro 76.2%；Claude 4.5 Sonnet 70.6%（2025.11）；最接近实战 |
| [LiveCodeBench](https://livecodebench.github.io) | 最新竞赛题（持续更新） | Gemini 3.0 Pro Elo 2439；防污染，测真实编程水平 |
| [MMLU-Pro](https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro) | 复杂推理选择题 | Gemini 3.0 Pro 90%+；比旧版 MMLU 更具区分度 |

## 参考 Benchmarks (Additionals)

这些测试要么已经饱和（大家分都太高），要么针对特定领域，仅作参考。

| Benchmark | 测试内容 | 典型分数 / 说明 |
| --- | --- | --- |
| [MATH](https://github.com/hendrycks/math) | 竞赛级数学题 | 顶级模型普遍 95%+；Gemini 3.0 Pro 甚至拿了满分（AIME 100% w/ code） |
| [GSM8K](https://github.com/openai/grade-school-math) | 小学数学题 | 分数已饱和，仅用于检测模型是否存在明显短板 |
| [HumanEval](https://github.com/openai/human-eval) | Python 基础编程 | 样本量小且污染严重，建议看 LiveCodeBench |
| [IFEval](https://github.com/google-research/google-research/tree/master/instruction_following_eval) | 指令遵循 | 衡量"听话程度"，Gemini 3.0 Pro 表现优异 |
| [GAIA](https://huggingface.co/gaia-benchmark) | Agent 工具协作 | Gemini 3.0 Pro 85.4% (τ2-bench)；Agent 能力大幅提升 |
| [WebArena](https://webarena.dev) | 网页操作 Agent | Gemini 3.0 Pro 登顶 WebDev Arena (Score 1487) |

SWE-bench Verified 是目前最接近真实软件工程场景的测试，Gemini 3.0 Pro 刷新了记录达到 76.2%，意味着它能独立解决四分之三的真实 GitHub issues。

Humanity's  Last Exam 是目前最严苛的通用考试，Gemini 3.0 Pro 的 37.5% 看起来不高，但相比 GPT-5 的 25.3% 已经是断层领先。

LiveCodeBench 持续从最新编程竞赛收集题目，避免了 HumanEval 的"背题现象"。Gemini 3.0 Pro 的 Elo 2439 说明它在未见过的难题上依然从容。

[LMArena](https://lmarena.ai)（原 LMSYS Chatbot Arena）用真人投票对战排名。Gemini 3.0 Pro 是首个突破 Elo 1500 大关的模型，在盲测中击败了所有对手。

使用 benchmark 需要注意：分数高不代表好用，但分数低一定不好用。关注那些难到让模型"汗流浃背"的新测试，忽略那些大家都能考满分的旧试卷。




<!-- 预留：个人模型排名与实际使用体验 -->
<!-- 可在此处补充：
- 不同场景下的模型选择建议（对话、编码、推理、长文本等）
- 实际使用中的稳定性、速度、成本对比
- 特定任务的最佳实践
-->



## 推荐资源

<!-- 预留：测评博主与数据集推荐 -->
<!-- 可在此处补充：
- 值得关注的 LLM 测评博主/频道
- 高质量的开源测评数据集
- 实用的模型对比工具
-->



模型是工具，不是信仰。选对的，不选贵的。


---

更新日期：2025.11  
数据来源：各厂商官方发布
