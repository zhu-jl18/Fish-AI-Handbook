---
title: '示例1：构建个人文档问答机器人'
description: '学习如何使用 RAG 技术，让 AI 模型能够回答关于您私有文档的问题。'
---

## 1. 项目背景

我们常常需要从大量的个人或内部文档（如产品手册、会议记录、学习笔记）中快速查找信息。传统的关键词搜索效率低下，而通用的大语言模型又没有这些私有知识。

本项目旨在构建一个智能问答机器人，它可以理解并回答任何关于我们提供的特定文档集的问题。这背后的核心技术就是**检索增强生成 (Retrieval-Augmented Generation, RAG)**。

## 2. 技术选型

- **编程语言**: Python
- **核心框架**: LangChain / LlamaIndex (两者都是流行的 LLM 应用开发框架，提供了 RAG 的完整实现)
- **LLM**: OpenAI GPT-3.5/4 或任何本地开源模型
- **嵌入模型 (Embedding Model)**: `text-embedding-ada-002` 或开源的 `bge-large-zh` 等
- **向量数据库 (Vector Database)**: ChromaDB / FAISS (轻量级的本地向量数据库，适合快速原型开发)

## 3. 实现步骤

我们将整个流程分解为以下几个关键步骤：

### 步骤一：文档加载 (Loading)

首先，我们需要读取我们的私有文档。这些文档可以是 `.txt`, `.pdf`, `.md` 等多种格式。

```python
# 示例使用 LangChain
from langchain_community.document_loaders import PyPDFLoader

# 加载一份 PDF 文档
loader = PyPDFLoader("my_document.pdf")
pages = loader.load_and_split()

print(f"文档被加载并分割成了 {len(pages)} 页。")
```

### 步骤二：文档分割 (Splitting)

为了让模型能更好地处理，长文档需要被分割成更小的、语义完整的块 (Chunks)。

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

# 定义分割器
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

# 分割文档
chunks = text_splitter.split_documents(pages)

print(f"文档被进一步分割成了 {len(chunks)} 个小块。")
```

### 步骤三：嵌入与存储 (Embedding & Storing)

接下来，我们需要将这些文本块“向量化”，即将它们转换为计算机能够理解的数字表示（嵌入向量）。然后，我们将这些向量存储到一个向量数据库中，以便后续进行快速的相似性搜索。

```python
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# 初始化嵌入模型
embeddings = OpenAIEmbeddings()

# 创建向量数据库，并将文档块嵌入后存入
# persist_directory 参数会将数据库保存到本地磁盘
vector_store = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

print("文档嵌入已创建并存入向量数据库。")
```

### 步骤四：检索 (Retrieving)

当用户提出问题时，我们首先将用户的问题也进行嵌入，然后在向量数据库中检索与问题最相关的文档块。

```python
# 将向量数据库转换为一个“检索器”
retriever = vector_store.as_retriever(search_kwargs={"k": 5}) # 返回最相关的5个块

query = "文档中提到了哪些关于未来计划的内容？"
relevant_chunks = retriever.invoke(query)

print(f"检索到了 {len(relevant_chunks)} 个相关的文档块。")
```

### 步骤五：生成 (Generating)

最后，我们将原始问题和检索到的相关文档块一起组合成一个新的提示词，并将其发送给大语言模型（LLM）来生成最终的、基于上下文的答案。

```python
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnablePassthrough
from langchain.schema.output_parser import StrOutputParser

# 定义 LLM
llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)

# 定义提示词模板
template = """
你是一个问答助手。请根据以下提供的上下文来回答用户的问题。
如果你在上下文中找不到答案，就说你不知道。

上下文:
{context}

问题:
{question}
"""
prompt = PromptTemplate.from_template(template)

# 构建 RAG 链 (Chain)
rag_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

# 发起调用
question = "文档中关于2025年的市场策略是什么？"
answer = rag_chain.invoke(question)

print("AI 的回答：", answer)
```

## 4. 最终效果

通过以上步骤，我们就拥有了一个可以基于我们提供的 `my_document.pdf` 内容进行智能问答的机器人。它可以准确地回答文档内的具体细节，而不会胡编乱造，因为它的答案总是被检索到的上下文所“锚定”。

这个项目是体验 RAG 强大功能的绝佳起点。
