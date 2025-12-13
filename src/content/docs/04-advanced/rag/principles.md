---
title: 原理
description: RAG 体系的核心决策、关键组件与落地检查表（结合最新实践）。
tab:
  label: 原理
  order: 10
contributors:
  - codex
---

## 结论先行
- 可靠度靠检索链，不是模型大小；默认用“混合检索 + 交叉重排 + 结构化上下文”，否则等于让模型瞎编。citeturn0search8
- 分块太大/太小都会害死召回，保持 200–500 tokens，并尊重语义边界。citeturn0search0
- 生产评测要同时看召回与答案质量；仅自动化 Judge 不够，要有人审抽检。citeturn0academia12

## 流程（ASCII）
```
User Q
  │
  ├─► 混合检索 (BM25 + Dense)
  │        │
  │        └─► 交叉重排 (top50→top5)
  │                 │
  └─────────────────▼
        上下文构建 (去重/截断/编号)
                    │
                    ▼
              LLM 生成
```

## 关键决策与最新实践
1) **分块**
- 语义优先：句/段切分，技术文档保留标题层级；长度 200–500 tokens。
- 防漂移：索引前先去重、归一化空白/编码；长表格分区。

2) **检索**
- 稠密：`text-embedding-3-large` / `bge-m3`；中英混合选 bge-m3（多粒度+稀疏向量）。citeturn0search2
- 混合：BM25 + 稠密向量分数归一化求和；对术语/长尾词特别有效。citeturn0search8
- 多路查询：multi-query / step-back 提升覆盖，多跳问题可接 LevelRAG/GraphRAG 思路。citeturn0search7turn0academia15

3) **重排**
- 交叉编码器是质量兜底：bge-reranker-large / jina-reranker-v2 指令化模型在中文问答上明显优于老款。citeturn0search3
- 延迟敏感：采用 listwise/双塔蒸馏版重排以减轻瓶颈。citeturn0search5
- 设阈值：得分 <0.3 直接拒答，避免硬编。

4) **上下文构建**
- 去重：MinHash 或 embedding 相似度 >0.9 删重复。
- 模板：系统指令（角色/安全/格式）→ `<context>`（编号片段）→ 用户问题；按重要度裁剪，留出生成预算。

5) **生成**
- 推理栈：vLLM/TGI；小模型或边缘走 llama.cpp+GGUF。温度 ≤0.5，top_p 0.9。
- 性能：预填充 + KV cache 复用（HyperRAG）可把吞吐拉高 2–3 倍。citeturn0academia13

## 质量与观测（上线门槛）
- 检索：Recall@K / Hit@K，nDCG@5 ≥0.7 作为最低线。
- 答案：相关性、完整性、可引用性、幻觉率；使用 RA-nWG@K 等稀有知识度量补齐盲点。citeturn0academia12
- 观测：采样日志+OpenTelemetry，记录 query、检索结果、重排分、上下文、答案，便于回溯。

## 常见坑与对策
- 只用稠密检索 → 混合检索 + 术语词表扩展。
- 重排成为瓶颈 → listwise/蒸馏小模型 + 预排剪枝。
- 上下文被截断 → 片段编号+按分数裁剪；必要时多轮检索。
- 数据泄漏 → 索引前脱敏；回答前敏感词过滤/拒答策略。

## 迭代路线（落地顺序）
- v0：混合检索 + 交叉重排 + 上下文模板，先拿到可追溯答案。
- v1：multi-query/step-back + 质量面板（nDCG、Hit@K、LLM Judge）。
- v2：性能优化（KV cache 复用、批推理）+ 持续评测回归；需要时做风格对齐（DPO/RLAIF）。
