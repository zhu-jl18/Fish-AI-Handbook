---
title: '完整的RAG聊天机器人项目'
description: '从零构建一个支持知识库问答的聊天机器人'
---

# 项目概览

本项目演示如何构建一个完整的 RAG（检索增强生成）聊天机器人，支持：

- 文档上传和索引
- 向量检索
- 智能问答
- Web界面

## 技术栈

- **后端**: Python + FastAPI
- **向量数据库**: ChromaDB
- **嵌入模型**: OpenAI text-embedding-ada-002
- **语言模型**: GPT-4o-mini
- **前端**: React + TypeScript
- **样式**: Tailwind CSS

## 项目结构

```
rag-chatbot/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── services/
│   │   └── api/
│   ├── requirements.txt
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── hooks/
│   ├── package.json
│   └── vite.config.ts
└── docs/
    └── sample_documents/
```

## 后端实现

### 1. 依赖安装

```bash
cd backend
pip install -r requirements.txt
```

**requirements.txt**:

```txt
fastapi==0.104.1
uvicorn==0.24.0
chromadb==0.4.15
openai==1.3.7
langchain==0.0.350
python-multipart==0.0.6
```

### 2. 核心服务代码

**backend/app/services/rag_service.py**:

```python
import chromadb
from openai import OpenAI
from typing import List, Dict
import uuid
from langchain.text_splitter import RecursiveCharacterTextSplitter

class RAGService:
    def __init__(self, openai_api_key: str):
        self.client = OpenAI(api_key=openai_api_key)
        self.chroma_client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.chroma_client.get_or_create_collection(
            name="documents"
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )

    def add_document(self, content: str, filename: str) -> Dict:
        """添加文档到知识库"""
        # 文档分割
        chunks = self.text_splitter.split_text(content)

        # 生成嵌入
        embeddings = []
        documents = []
        metadatas = []
        ids = []

        for i, chunk in enumerate(chunks):
            response = self.client.embeddings.create(
                model="text-embedding-ada-002",
                input=chunk
            )

            embeddings.append(response.data[0].embedding)
            documents.append(chunk)
            metadatas.append({
                "filename": filename,
                "chunk_index": i
            })
            ids.append(f"{filename}_{i}_{uuid.uuid4()}")

        # 存储到向量数据库
        self.collection.add(
            embeddings=embeddings,
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )

        return {
            "message": f"成功添加文档 {filename}",
            "chunks_count": len(chunks)
        }

    def query(self, question: str, top_k: int = 3) -> Dict:
        """处理用户问题"""
        # 生成问题嵌入
        response = self.client.embeddings.create(
            model="text-embedding-ada-002",
            input=question
        )
        query_embedding = response.data[0].embedding

        # 检索相关文档
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )

        # 构建上下文
        context = "\n\n".join(results['documents'][0])

        # 生成回答
        prompt = f"""
基于以下上下文信息回答用户问题。如果上下文中没有相关信息，请说明无法从提供的文档中找到答案。

上下文：
{context}

问题：{question}

回答：
"""

        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=500
        )

        return {
            "answer": response.choices[0].message.content,
            "sources": [
                f"{meta['filename']} (块 {meta['chunk_index']})"
                for meta in results['metadatas'][0]
            ]
        }
```

### 3. API路由

**backend/app/api/chat.py**:

```python
from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from app.services.rag_service import RAGService
import os

router = APIRouter()
rag_service = RAGService(openai_api_key=os.getenv("OPENAI_API_KEY"))

class QueryRequest(BaseModel):
    question: str

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    """上传文档到知识库"""
    try:
        content = await file.read()
        text_content = content.decode('utf-8')

        result = rag_service.add_document(
            content=text_content,
            filename=file.filename
        )

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/query")
async def query_knowledge_base(request: QueryRequest):
    """查询知识库"""
    try:
        result = rag_service.query(request.question)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

## 前端实现

### 1. 主要组件

**frontend/src/components/ChatInterface.tsx**:

```typescript
import React, { useState } from 'react';
import { Upload, Send, FileText } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  sources?: string[];
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content: `✅ ${result.message}，共分割为 ${result.chunks_count} 个片段`
      }]);
    } catch (error) {
      console.error('上传失败:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      const result = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: result.answer,
        sources: result.sources
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('查询失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      {/* 标题 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">RAG 聊天机器人</h1>
        <p className="text-gray-600">上传文档，然后与您的知识库对话</p>
      </div>

      {/* 文件上传 */}
      <div className="mb-4">
        <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400">
          <Upload className="w-5 h-5 mr-2" />
          <span>点击上传文档 (支持 .txt 文件)</span>
          <input
            type="file"
            className="hidden"
            accept=".txt"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p>{message.content}</p>

              {message.sources && message.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-300">
                  <p className="text-xs font-medium">来源：</p>
                  {message.sources.map((source, index) => (
                    <p key={index} className="text-xs flex items-center mt-1">
                      <FileText className="w-3 h-3 mr-1" />
                      {source}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 px-4 py-2 rounded-lg">
              <p>正在思考中...</p>
            </div>
          </div>
        )}
      </div>

      {/* 输入框 */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="输入您的问题..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
```

## 部署指南

### 1. 本地开发

```bash
# 启动后端
cd backend
python -m uvicorn main:app --reload --port 8000

# 启动前端
cd frontend
npm install
npm run dev
```

### 2. Docker 部署

**Dockerfile**:

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend/ .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**docker-compose.yml**:

```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - '8000:8000'
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      - ./chroma_db:/app/chroma_db

  frontend:
    image: node:18-alpine
    working_dir: /app
    ports:
      - '3000:3000'
    volumes:
      - ./frontend:/app
    command: npm run dev
```

## 使用说明

1. **配置环境变量**: 设置 `OPENAI_API_KEY`
2. **上传文档**: 点击上传按钮，选择 .txt 文档
3. **开始对话**: 在输入框中提问，系统会基于上传的文档回答

## 扩展功能

- 支持更多文档格式（PDF、Word、Markdown）
- 添加用户认证和多租户支持
- 实现对话历史存储
- 集成更多向量数据库（Pinecone、Weaviate）
- 添加文档管理界面

<!-- 图片预留位置 -->
<!-- ![RAG聊天机器人界面](./images/rag-chatbot-ui.png) -->
<!-- *RAG聊天机器人的Web界面* -->

<!-- ![文档上传流程](./images/document-upload.png) -->
<!-- *文档上传和处理流程* -->
