---
title: '知识库的原理'
description: '拆开RAG链路的每个齿轮：概念、机制、流程、参数和风险'
contributors:
  - codex
  - claude
  - kimi
---

## 快速结论

- RAG的价值只来自“可靠检索 + 受控生成”，任何跳过检索的设计都是自欺欺人。
- 语义索引=向量嵌入 + 近似检索算法 + 元数据过滤；三者任何一环出错都会导致幻觉。。

## 核心概念

- **Chunk**：语义最小单元。优先结构化切分（标题、表格、函数），再用Token窗口补齐，避免碎片。
- **Embedding**：将Chunk映射到高维空间。
- **向量数据库**：负责相似度检索+过滤。
- **Reranker**：二次精排，可以把噪声文档踢出去。
- **Prompt Builder**：把检索结果按模板注入LLM，保证引用格式和长度控制。

## 工作机制（ASCII UML）

```text
User -> QueryEmbedder: encode(query, dim=1024)
QueryEmbedder -> VectorDB: search(k=12, ef_search=64, filter=ACL)
VectorDB --> Reranker: candidates (score, payload)
Reranker -> PromptBuilder: rerank_top_k=5
PromptBuilder -> LLM: context + instructions
LLM --> User: answer + citations
LLM -> FeedbackStore: log(latency, recall)
```

### 系统架构可视化

```text
┌─────────────────────────────────────────────────────────────────────┐
│                         RAG System Pipeline                         │
└─────────────────────────────────────────────────────────────────────┘

    [User Query]
         │
         ▼
    ┌─────────────────┐
    │ Query Embedder  │  (encode: dim=1024)
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │   Vector DB     │  (HNSW: k=12, ef_search=64)
    │  ┌───────────┐  │
    │  │ Embeddings│  │  ◄─── [ACL Filter]
    │  │   Index   │  │
    │  └───────────┘  │
    └────────┬────────┘
             │ (12 candidates + scores)
             ▼
    ┌─────────────────┐
    │    Reranker     │  (CrossEncoder: top_k=5)
    └────────┬────────┘
             │ (精排后5个最佳匹配)
             ▼
    ┌─────────────────┐
    │ Prompt Builder  │  (注入context + instructions)
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │      LLM        │  (生成 + 引用)
    └────────┬────────┘
             │
             ├─────────────────┐
             │                 │
             ▼                 ▼
    [User: Answer +     [FeedbackStore]
     Citations]          (latency, recall)
```

## RAG流程拆解

| 阶段 | 目标 | 必备操作 | 
| --- | --- | --- | --- |
| 采集/清洗 | 输入干净 | OCR、HTML剥壳、正则、去重 | 
| 切分/标注 | 建语义单元 | 结构化切分、Token窗口、源路径元数据 | 
| 嵌入 | 建语义索引 | 模型统一、批量化、缓存 |
| 检索 | 高召回低延迟 | 语义检索、相似度检索、混合检索 | 
| 重排序 | 提升精度 | CrossEncoder rerank、规则打分 | 
| 生成 | 控制输出 | 模板约束、引用格式、拒答策略 |
