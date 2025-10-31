---
title: FastAPI
description: Python ASGI Web 框架，基于 Starlette 和 Pydantic 构建
---

FastAPI 的性能来自两个核心依赖：Starlette 提供异步 ASGI 实现，Pydantic 处理数据验证。类型系统在运行时自动验证数据并生成 OpenAPI 文档，这消除了手写验证代码和文档维护工作。基于 ASGI 的异步机制让单进程并发处理大量 I/O 等待，在调用多个外部服务的场景下，同步框架需要数十个线程才能达到的吞吐量，FastAPI 单进程即可实现。

下面的最小示例展示 FastAPI 的核心机制：Pydantic 数据验证、依赖注入、异步并发和自动文档生成。场景简化为任务批处理——接收任务列表，并发执行，返回聚合结果。

## 安装与运行

```bash
pip install "fastapi[standard]"
```

将以下代码保存为 `main.py`：

```python
from fastapi import FastAPI, Depends
from pydantic import BaseModel, Field
import asyncio
import httpx
from typing import Annotated

app = FastAPI()

# Pydantic 模型定义请求结构和验证规则
class Task(BaseModel):
    id: int = Field(ge=1, description="任务 ID")
    data: str = Field(min_length=1, max_length=1000, description="任务数据")

class BatchRequest(BaseModel):
    tasks: list[Task] = Field(min_length=1, max_length=100)
    endpoint: str = Field(pattern=r"^https?://", description="处理端点 URL")

# 依赖注入：共享 HTTP 客户端实例
async def get_http_client():
    async with httpx.AsyncClient(timeout=10.0) as client:
        yield client

# 异步处理单个任务
async def process_task(
    client: httpx.AsyncClient,
    task: Task,
    endpoint: str
) -> dict:
    try:
        response = await client.post(
            endpoint,
            json={"id": task.id, "data": task.data}
        )
        return {"id": task.id, "status": "success", "result": response.json()}
    except Exception as e:
        return {"id": task.id, "status": "error", "error": str(e)}

@app.post("/batch")
async def batch_process(
    request: BatchRequest,
    client: Annotated[httpx.AsyncClient, Depends(get_http_client)]
):
    # asyncio.gather 并发执行所有任务
    results = await asyncio.gather(*[
        process_task(client, task, request.endpoint)
        for task in request.tasks
    ])

    success_count = sum(1 for r in results if r["status"] == "success")
    return {
        "total": len(results),
        "success": success_count,
        "failed": len(results) - success_count,
        "results": results
    }
```

运行服务：

```bash
uvicorn main:app --reload
```

访问 `http://localhost:8000/docs` 查看自动生成的交互式文档。文档直接从函数签名和 Pydantic 模型生成，包含每个字段的类型、约束和描述。修改模型定义，文档自动同步更新。

## 机制解析

这个 50 行示例整合了 FastAPI 的核心特性。Pydantic 模型 `Task` 和 `BatchRequest` 定义了数据结构和验证规则——`id` 必须大于等于 1，`data` 长度在 1 到 1000 字符之间，`tasks` 列表最多 100 个元素。传入不符合约束的数据返回 422 状态码，附带具体错误位置，无需手写 if 语句检查。

`get_http_client` 通过依赖注入提供共享的 HTTP 客户端。`Depends` 确保每个请求复用同一个客户端实例，避免重复创建连接。`Annotated` 类型标注让 IDE 提供准确的代码补全，同时保持依赖注入的运行时行为。

`asyncio.gather` 并发执行所有任务，等待时间取决于最慢的请求而非累加。处理 10 个任务时，同步方式需要 10 倍单任务时间，异步方式接近单任务时间。进程在等待 I/O 响应时不阻塞，可以处理其他传入请求。这种并发模型的内存和 CPU 开销远低于多线程方案。

类型系统在开发时提供静态检查，在运行时强制执行验证，在部署时生成准确文档。这三个功能共享同一个数据源——类型标注和 Pydantic 模型。长度限制防止内存耗尽，类型检查阻止注入攻击，模式验证确保数据符合预期格式。

完整 API 规格和高级用法见 [FastAPI 官方文档](https://fastapi.tiangolo.com/)。异步编程的底层机制在 [Starlette 文档](https://www.starlette.io/)，数据验证的详细规则在 [Pydantic 文档](https://docs.pydantic.dev/)。
