---
title: Fast API
description: Fast API - 现代、快速的 Python Web 框架，用于构建 API
---

## Fast API

Fast API 是一个现代、快速（高性能）的 Python Web 框架，专为构建 API 而设计。它基于标准 Python 类型提示，提供自动数据验证、序列化和文档生成。

### 核心特点

- **高性能**：基于 Starlette 和 Pydantic，性能媲美 NodeJS 和 Go
- **快速开发**：自动生成交互式 API 文档（Swagger UI / ReDoc）
- **类型安全**：利用 Python 类型提示进行自动验证和补全
- **现代异步**：原生支持 async/await 异步编程
- **易于学习**：直观的设计，优秀的开发体验

### AI 应用场景

Fast API 特别适合构建 AI 相关的 API 服务：

- LLM 推理服务包装
- AI 模型部署与调用接口
- 流式响应支持（SSE）
- WebSocket 实时交互
- 后台任务队列（训练/推理）

### 快速开始

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

```bash
# 安装
pip install fastapi uvicorn[standard]

# 运行
uvicorn main:app --reload
```

访问 `http://127.0.0.1:8000/docs` 查看自动生成的交互式文档。

### 资源链接

- [官方网站](https://fastapi.tiangolo.com/)
- [中文文档](https://fastapi.tiangolo.com/zh/)
- [GitHub](https://github.com/tiangolo/fastapi)
- [教程](https://fastapi.tiangolo.com/tutorial/)
