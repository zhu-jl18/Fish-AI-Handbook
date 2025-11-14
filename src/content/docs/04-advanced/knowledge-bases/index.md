---
title: '知识库'
description: '面向RAG系统的整体作战图：先搞清楚原理，再落地低代码与开源方案，最后补齐理论弹药'
contributors:
  - codex
  - kimi
---


## Breif Intro

虽然大模型有着丰富的world knowledge，但是：
- 任何对话式AI如果需要回答最新或私有信息，必须外挂知识库；不要指望基座模型自己长脑子。

那如何链接到知识库呢，知识库是数据源，RAG是使用数据的方法，向量数据库是让数据可被检索的工具。

```text
用户问题 → 检索重排序 → 获取相关chunk → 
↓
LLM提示构建（系统prompt + 检索到的文档 + 用户问题） → 
↓
LLM生成答案（基于检索内容返回带引用的最终答案）
```

具体关系：
1. **知识库（KB）** = 存储层：文档、PDF、FAQ、数据库等静态数据
2. **RAG（检索增强生成）** = 架构层：检索+生成的完整流程，让LLM基于知识库回答问题  
3. **向量数据库** = 索引层：让知识库支持语义搜索的技术手段

RAG链路只做三件事：可靠的语义索引、可控的检索策略、稳定的提示注入；其余都是噪音。实际RAG中LLM的prompt长这样：
```text
系统：基于以下上下文回答问题，如果信息不足就说不知道
上下文：[从知识库检索到的3-5个相关片段]
用户问题：xxx
```

**补全后的完整交互流程表格：**

| 流程类型 | 步骤 | 说明 |
|---------|------|------|
| **数据准备流程**<br>(左→右) | 文档源 → Chunk/Embed | 原始文档被切分成chunk并生成向量嵌入 |
| | Chunk/Embed → 向量数据库 | 向量存储到数据库中 |
| | 向量数据库 → 检索重排序 | 根据查询向量做相似度检索和重排序 |
| **查询处理流程**<br>(下→上) | 用户 → Prompt Builder | 用户输入问题 |
| | Prompt Builder → Query Embeder | 问题被编码成查询向量 |
| | Query Embeder → 检索重排序 | 用查询向量在向量库中检索相关chunk |
| | Filter/Policy → 检索重排序 | 应用过滤策略（权限、时间等） |
| **LLM交互流程**<br>(缺失环节) | 检索重排序 → Prompt Builder | 将检索到的文档片段注入prompt |
| | Prompt Builder → LLM | 构建完整提示（系统指令+检索内容+用户问题） |
| | LLM → 答案生成 | LLM基于检索内容生成 grounded answer |
| | LLM → 用户 | 返回带引用的最终答案 |



## 适用场景

- 内部制度、合规、财报、工单知识密集且常更新的组织。
- 需要引用出处、可解释回答、并保留审计日志的客服与运营场景。
- 多语种或跨格式文档（PDF、HTML、SQL、音频转写）混合的内容团队。




## Learn More

 博客（概念与思路）

1. [Pinecone — Anatomy of a RAG System](https://www.pinecone.io/learn/rag/)：从向量视角拆RAG，图示清楚。
2. [Qdrant — Hybrid Search Best Practices](https://qdrant.tech/articles/hybrid-search-best-practices/)：讲透alpha/K调参，别再瞎试。
3. [Weaviate — Rerank Strategies](https://weaviate.io/blog/hybrid-search-reranking)：“向量+BM25+rerank”组合拳的实测数据。
4. [LlamaIndex — Data Agents](https://docs.llamaindex.ai/en/stable/examples/agent/agent_rag/)：从数据视角扩展RAG，适合复杂系统。

技术文档（实现细节）

- [LangChain Retrieval Cookbook](https://python.langchain.com/docs/use_cases/question_answering/)：官方多检索策略样例。
- [LlamaIndex Observability](https://docs.llamaindex.ai/en/stable/module_guides/observability/)：如何打Tracing与评估。
- [OpenAI Text-Embedding-3 Spec](https://platform.openai.com/docs/guides/embeddings)：参数、速率限制、批量策略。
- [Milvus Index Reference](https://milvus.io/docs/index.md) 与 [Qdrant Collections](https://qdrant.tech/documentation/collections/)：索引类型和过滤模型。
- [Azure AI Search Vector Workloads](https://learn.microsoft.com/azure/search/vector-search-overview)：托管方案细节，含ACL示例。

学习视频（上手实验）

1. [Pinecone RAG Masterclass (YouTube)](https://www.youtube.com/watch?v=Sus6kACWYbk)：1小时涵盖整条链路。
2. [Microsoft Build: Vector Search Deep Dive](https://www.youtube.com/watch?v=5H39G-2u2bU)：重点在混合检索和权限。
3. [Deeplearning.ai Short Course: Building RAG Agents](https://learn.deeplearning.ai/courses/building-rag-agents)（含视频+notebook）。
4. [Qdrant Live Workshop](https://www.youtube.com/watch?v=O4s-lHoPazs)：演示ef_search调参。
