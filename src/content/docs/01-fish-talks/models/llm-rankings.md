---
title: 模型排行
description: Who is better?
contributors:
    - claude
---


能打榜不代表能干活，但连榜都上不去，别谈生产。

Benchmark 是统一试卷，分数只是信号，不是能力。厂商爱报 SOTA 因为数字好卖，但别被标题带着走。

优化 benchmark ≠ 解决用户问题。高分模型也可能慢、上下文不稳、动不动过度推理。



## 主流 Benchmarks

分数只是信号，不是能力。模型是用来干活的，不是用来拿奖的。

| Benchmark | 测试内容 | 典型分数 / 说明 |
| --- | --- | --- |
| [MMLU](https://github.com/hendrycks/test) / [MMLU‑Pro](https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro) | 57 个学科选择题；MMLU‑Pro 更难 | 顶级闭源 ≈ 85–90%（2025.11）；低于 70% 基本没用 |
| [GPQA Diamond](https://github.com/idavidrein/gpqa) | 研究生级别科学问题 | GPT‑5 87.3%；Claude 4.5 Sonnet 83.3%（2025.11）；比 MMLU 难得多 |
| [MATH](https://github.com/hendrycks/math) | 12,500 道竞赛级数学题 | 顶级模型 90%+（2025.11）；GPT‑4 ≈ 50%；区分度很高 |
| [GSM8K](https://github.com/openai/grade-school-math) | 8,500 道小学数学题 | 多数模型 90%+（2025.11）；主要看是否存在明显短板 |
| [HumanEval](https://github.com/openai/human-eval) | 164 道 Python 编程题 | 顶级闭源 90%+（2025.11）；样本量小，可能被训练集污染 |
| [LiveCodeBench](https://livecodebench.github.io) | 最新竞赛题（持续更新） | 防训练集污染，比 HumanEval 更能测真实水平（2025.11） |
| [SWE‑bench Verified](https://www.swebench.com) | 真实 GitHub issues | Claude 4.5 Sonnet 70.6%（2025‑09‑29）；GPT‑5 65.0%（2025‑08‑07）；最接近实战 |
| [IFEval](https://github.com/google-research/google-research/tree/master/instruction_following_eval) | 指令遵循 | 衡量"按要求做事"，厂商常作补充（2025.11） |
| [GAIA](https://huggingface.co/gaia-benchmark) | 466 道需要工具协作的问题 | Agent 能力测试；人类 92%，GPT‑4 只有 15%（2025.11） |
| [WebArena](https://webarena.dev) | 真实网站操作任务 | 最接近实际 agent 场景，通过率普遍个位数（2025.11） |
| [Humanity's Last Exam](https://agi.safe.ai/) | 2,500 题跨 100+ 学科 | 最严苛通用考试；最好约 25%（Grok 4 25.4%，GPT‑5 25.3%，2025.11） |

SWE‑bench Verified 是目前最接近真实软件工程场景的测试，500 个人工筛选的 GitHub issues，Claude 4.5 Sonnet 在 2025 年 9 月拿到 70.6%，是当前最高分。但这不等于实际写代码 70% 成功率，benchmark 分数和生产力是两码事。

LiveCodeBench 持续从最新编程竞赛收集题目（2024‑08 到 2025‑05 窗口），避免训练集污染。HumanEval 只有 164 题，样本量小且可能被"记住"，LiveCodeBench 更能测真实水平。

GPQA Diamond 是 198 道最难的研究生级科学问题，PhD 专家平均只有 65% 正确率。顶级模型能到 80%+ 说明在专业知识上已经接近或超过人类专家水平。

[LMArena](https://lmarena.ai)（原 LMSYS Chatbot Arena）用真人投票对战排名，Elo rating 机制。优点是真人评测、bias 少；缺点是用户可能偏好"好听的废话"，对话任务评测准确但 coding/reasoning 不太行。Elo 分差 50 分基本感觉不出来。

使用 benchmark 需要注意：训练集污染、样本量小导致统计方差大、分数不代表实际能力。



## 当前主流模型（2025.11）

截至 2025 年 11 月：SWE‑bench Verified 上 Claude 4.5 Sonnet 70.6% 领先；HLE 最高 Grok 4 25.4%，GPT‑5 25.3%，Gemini 2.5 Pro 21.6%。

编码实操个人推荐：Claude Sonnet 4.5 > GPT‑5 > DeepSeek‑R1。

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
