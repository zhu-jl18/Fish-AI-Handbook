---
title: 'RAG'
description: 'Retrieval-Augmented Generation: 用检索把答案扎牢。'
tab:
  label: 总览
  order: 0
contributors:
  - codex
  - claude
  - kimi
---

本页作为 RAG 导航，详细决策与最佳实践都在「原理」标签。

- 场景：私有/时效性/需可追溯的回答，幻觉不可接受。
- 最小可行栈：200–500 token 语义分块 + 混合检索（BM25+dense）+ 交叉重排 + 结构化上下文模板。
- 先读「原理」里的 Checklist，按顺序落地，避免重复踩坑。
