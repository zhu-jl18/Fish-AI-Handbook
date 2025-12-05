---
title: 主流 Benchmark
description: 当前最具参考价值的核心评测
tab:
  label: 主流
  order: 10
contributors:
    - claude
    - codex
    - gemini
---

分数只是信号，不是能力。但如果是 Humanity's Last Exam 这种级别的信号，那确实代表能力。

| Benchmark | 测试内容 | 典型分数 / 说明 |
| --- | --- | --- |
| [Humanity's Last Exam](https://agi.safe.ai/) | 2,500 题跨 100+ 学科 | Gemini 3.0 Pro 37.5%；GPT-5 25.3%（2025.11）；目前最难通用考试 |
| [GPQA Diamond](https://github.com/idavidrein/gpqa) | 研究生级别科学问题 | Gemini 3.0 Pro 91.9%；GPT-5 87.3%（2025.11）；已超越人类专家 |
| [SWE-bench Verified](https://www.swebench.com) | 真实 GitHub issues | Gemini 3.0 Pro 76.2%；Claude 4.5 Sonnet 70.6%（2025.11）；最接近实战 |
| [LiveCodeBench](https://livecodebench.github.io) | 最新竞赛题（持续更新） | Gemini 3.0 Pro Elo 2439；防污染，测真实编程水平 |
| [MMLU-Pro](https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro) | 复杂推理选择题 | Gemini 3.0 Pro 90%+；比旧版 MMLU 更具区分度 |

## 核心解读

**SWE-bench Verified** 是目前最接近真实软件工程场景的测试，Gemini 3.0 Pro 刷新了记录达到 76.2%，意味着它能独立解决四分之三的真实 GitHub issues。

**Humanity's Last Exam** 是目前最严苛的通用考试，Gemini 3.0 Pro 的 37.5% 看起来不高，但相比 GPT-5 的 25.3% 已经是断层领先。

**LiveCodeBench** 持续从最新编程竞赛收集题目，避免了 HumanEval 的"背题现象"。Gemini 3.0 Pro 的 Elo 2439 说明它在未见过的难题上依然从容。

[LMArena](https://lmarena.ai)（原 LMSYS Chatbot Arena）用真人投票对战排名。Gemini 3.0 Pro 是首个突破 Elo 1500 大关的模型，在盲测中击败了所有对手。

---

使用 benchmark 需要注意：分数高不代表好用，但分数低一定不好用。关注那些难到让模型"汗流浃背"的新测试，忽略那些大家都能考满分的旧试卷。
