---
title: 模型排行
description: Who is better?
contributors:
    - claude
---


刷榜没有意义，用户占比说明一切。但是如果你连榜都打不上去，那直接就是垃圾了。

Benchmark 本质是标准化测试，给所有模型做同一套题看谁分高。厂商喜欢刷 SOTA 的原因：市场要数字，投资人看 PPT，媒体要标题。"某 benchmark 全球第一"比"实际场景更稳定"好传播得多。同时尽管打榜分数不能说明一切，但是已经是最好的评价标准了。

需要注意：针对 benchmark 优化和解决真实问题是两码事。譬如最新的 Qwen3-Max-Thinking 在 AIME/HMMT 数学测试拿满分，SWE-Bench 69.6 分第一梯队，看起来很强。实际用下来？推理慢、context 不稳定、简单任务 overthinking，拉完了！

来看Sonnet-4.5:

![Sonnet-4.5](https://p.sda1.dev/28/c1d9c269057bcefe2309d25481abfed4/image.png)


## 核心 Benchmarks

Benchmark 不是没用，而是提醒你：分数只是参考，不能迷信。模型是用来干活的，不是用来拿奖的。业界公认的标准测试集：

| Benchmark                                            | 测试内容                   | 权威度 | 说明                                                                    |
| ---------------------------------------------------- | -------------------------- | ------ | ----------------------------------------------------------------------- |
| [MMLU](https://github.com/hendrycks/test)            | 57 个学科选择题，15,908 道 | 极高   | 知识广度测试。GPT-5 约 90%，Claude Sonnet 4.5 约 89%。低于 70% 基本没用 |
| [GPQA Diamond](https://github.com/idavidrein/gpqa)   | 研究生级别科学问题         | 极高   | 专家级知识测试。GPT-5 87.3%，Claude Sonnet 4.5 83.3%。比 MMLU 难得多    |
| [HumanEval](https://github.com/openai/human-eval)    | 164 道 Python 编程题       | 极高   | 代码生成基准。样本量小但是厂商必测。GPT-5 约 93%                        |
| [MATH](https://github.com/hendrycks/math)            | 12,500 道竞赛级数学题      | 极高   | 数学推理能力。o1 能到 90%+，GPT-4 只有 50%。区分度很高                  |
| [SWE-Bench Verified](https://www.swebench.com)       | 真实 GitHub issues         | 极高   | 真实软件工程能力。Claude Sonnet 4.5 77.2%，GPT-5 72.8%。这个最接近实战  |
| [GSM8K](https://github.com/openai/grade-school-math) | 8,500 道小学数学题         | 高     | 基础推理能力。现在的模型基本都 90%+，主要看有没有明显短板               |


我要额外鞭尸一下这类榜单：

[Humanity's Last Exam](https://agi.safe.ai/) (HLE) 是 2025 年最重要的新 benchmark，2,500 道跨学科专家级问题，号称"人类的最后一次考试"。

截至 2025.11，最新成绩：

| 模型              | 准确率 | Calibration Error |
| ----------------- | ------ | ----------------- |
| Grok 4            | 25.4%  | -                 |
| GPT-5             | 25.3%  | 50.0%             |
| Gemini 2.5 Pro    | 21.6%  | 72.0%             |
| GPT-5-mini        | 19.4%  | 65.0%             |
| DeepSeek-R1-0528  | 14.0%  | 78.0%             |
| Claude 4.5 Sonnet | 13.7%  | 65.0%             |
| Claude 4.1 Opus   | 11.5%  | 71.0%             |
| o1                | 8.0%   | 83.0%             |
| GPT-4o            | 2.7%   | 89.0%             |

这个榜单有两点很有意思：

第一，所有模型的准确率都很低，最好的也就 25% 左右。说明这个测试确实难，没被训练集污染。

第二，注意 Calibration Error 这一列。这是测试模型"知不知道自己不知道"的能力。GPT-4o 准确率最低（2.7%）但 Calibration Error 最高（89%），意思是它不会但还很自信，典型的一本正经胡说八道。GPT-5 准确率高（25.3%）且 Calibration Error 低（50%），说明它答不出来的时候至少知道自己答不出来。

那么问题来了，它的题目长什么样呢？
[Humanity's Last Exam](https://agi.safe.ai/)、



一些针对特定能力的测试，如Agent 和代码专项，厂商也会选择性地报告：

| Benchmark                                        | 测试内容                 | 说明                                                |
| ------------------------------------------------ | ------------------------ | --------------------------------------------------- |
| [GAIA](https://huggingface.co/gaia-benchmark)    | 466 道需要工具协作的问题 | Agent 能力测试。人类 92%，GPT-4 只有 15%，差距明显  |
| [WebArena](https://webarena.dev)                 | 真实网站操作任务         | 最接近实际 agent 场景，通过率普遍个位数             |
| [LiveCodeBench](https://livecodebench.github.io) | 最新竞赛题（持续更新）   | 防训练集污染的代码测试，比 HumanEval 更能测真实水平 |

使用 benchmark 需要注意：训练集污染（HumanEval 可能被"记住"了）、样本量小（164 道题统计方差大）、不代表实际能力（SWE-Bench 30% 不等于实际写代码 30% 成功率）。



LMArena：真人投票对战，用 Elo rating 排名。优点是真人评测、bias 少；缺点是用户可能偏好"好听的废话"，对话任务评测准确但 coding/reasoning 不太行。Elo 分差 50 分基本感觉不出来。






截至 2025 年 11 月，主流模型：

- **GPT-5** (OpenAI, 2025.08)：MMLU 90.1%，GPQA 87.3%，SWE-Bench 72.8%，HLE 25.3%
- **Claude 4.5 Sonnet** (Anthropic, 2025.09)：SWE-Bench 77.2% 最强，GPQA 83.3%，HLE 13.7%
- **Gemini 2.5 Pro** (Google)：HLE 21.6%，整体均衡
- **Grok 4** (xAI)：HLE 25.4% 目前最高

Coding 场景个人排序：Claude Sonnet 4.5 > GPT-5 > DeepSeek-R1。



模型是工具，不是信仰。选对的，不选贵的。


---

更新日期：2025.11  
数据来源：各厂商官方发布
