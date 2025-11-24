---
title: 'RAG'
description: 'Retrieval-Augmented Generation: The only way to make LLMs useful for private data.'
contributors:
  - codex
  - claude
  - kimi
---

## The Gist

LLMs are frozen in time. They don't know your private data, and they hallucinate.
**RAG (Retrieval-Augmented Generation)** fixes this by injecting relevant facts into the prompt before the LLM generates an answer.

If you skip retrieval, you're just guessing.

## The Stack

Don't overcomplicate it. You need four things:

1.  **Chunking**: Split text into semantic units. Don't just slice by character count; respect sentence/paragraph boundaries.
2.  **Embedding**: Convert chunks into vectors. Use a decent model (e.g., OpenAI `text-embedding-3`, BGE).
3.  **Vector DB**: Store vectors for similarity search (Milvus, Qdrant, Pinecone).
4.  **Reranking**: The secret sauce. Vector search gets you the top 100 candidates; a Cross-Encoder reranker (like BGE-Reranker) picks the actual top 5.

## The Flow

```text
User Query -> [Embed] -> Vector Search -> [Rerank] -> Top K Chunks
                                                           |
                                                           v
System Prompt + <Context>Top K Chunks</Context> + User Query -> LLM -> Answer
```

## Tools (Don't Reinvent the Wheel)

Unless you're building a specialized engine, use existing tools.

-   **[Dify](https://github.com/langgenius/dify)**: The standard. Web UI, supports everything, easy to hand off to non-techies.
-   **[RAGFlow](https://github.com/infiniflow/ragflow)**: Use this if your data is messy (scanned PDFs, complex tables). It has a better parser.
-   **[Cherry Studio](https://github.com/Kangfenmao/Cherry-Studio)**: Good for local desktop use.

## Resources

-   **[Pinecone — Anatomy of a RAG System](https://www.pinecone.io/learn/rag/)**: The basics.
-   **[Qdrant — Hybrid Search](https://qdrant.tech/articles/hybrid-search-best-practices/)**: Why you need sparse vectors + dense vectors.
-   **[Weaviate — Rerank Strategies](https://weaviate.io/blog/hybrid-search-reranking)**: Why reranking matters.
