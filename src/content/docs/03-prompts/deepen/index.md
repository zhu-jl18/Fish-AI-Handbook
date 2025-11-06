---
title: 深入拓展
description: 深入强化提示词思路的高级框架与外部资源
---

## 高级框架速览

- **CRISPE**：强调 Context、Role、Intent、Style、Process、Examples 的全链路拆解，适合需要精细控制语气与流程的任务。
- **RAIL**：通过 Response、Action、Input、Limitation 清晰约束输出，可与 JSON Schema 结合防止非法结果。
- **SCQA**：Situation、Complication、Question、Answer 的金字塔结构，保持叙事逻辑与焦点。
- **PER（Plan-Execute-Review）**：计划-执行-复核三段式，适用于长任务与代码协作，避免一步到位漂移。
- **Dual Loop Prompting**：先生成自检准则、再产出答案、最后对照准则复核；常见于高可信度研究任务。

## 官方教程

- [Anthropic 提示词交互教程](https://github.com/anthropics/prompt-eng-interactive-tutorial) - Anthropic 官方提供的提示词工程交互式教程
