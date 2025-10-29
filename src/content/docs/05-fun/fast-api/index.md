---
title: FastAPI
description: 基于 Python 的现代高性能 Web 框架，专为构建 RESTful API 而设计
---

# FastAPI

FastAPI 是 Python Web 框架，基于异步 I/O 构建，擅长处理高并发 API 请求。它的类型系统在运行时自动验证数据，生成交互式文档，这让 AI 应用开发省去大量手写验证和文档维护工作。对于需要并发调用多个 AI 服务的场景——比如长文本切分后分发到不同模型处理——FastAPI 的异步机制可以让单进程同时等待数十个外部 API 响应，而传统同步框架需要启动数十个线程才能达到同样效果。

假设你遇到这样的需求：接收用户的长文本，按段落切分，然后并发调用多个 AI API（可能是不同的模型服务）分别处理每个分块，最后汇总结果返回。这个场景正好展示 FastAPI 的核心优势。

## 从最简单的 API 开始

安装 FastAPI 和 ASGI 服务器：

```bash
pip install "fastapi[standard]"
```

创建 `main.py`，定义基础端点：

```python
from fastapi import FastAPI

app = FastAPI()

@app.post("/process/")
async def process_text(text: str):
    return {"received": text[:50] + "..."}
```

运行服务：

```bash
uvicorn main:app --reload
```

访问 `http://localhost:8000/docs` 可以看到自动生成的 API 文档，直接在浏览器里测试接口。这个文档不是额外配置的——FastAPI 根据函数签名自动生成 OpenAPI 规范，`/docs` 提供 Swagger UI，`/redoc` 提供另一种视图。

## 添加数据验证

直接在函数参数里写 `text: str` 只做了类型标注，运行时不会强制检查。用 Pydantic 模型定义请求结构后，FastAPI 会在数据到达业务逻辑前验证所有字段：

```python
from pydantic import BaseModel, Field

class TextRequest(BaseModel):
    text: str = Field(min_length=10, description="待处理的文本")
    chunk_size: int = Field(default=500, gt=0, description="每个分块的字符数")
    api_urls: list[str] = Field(min_items=1, description="AI API 地址列表")

@app.post("/process/")
async def process_text(request: TextRequest):
    return {"chunks": len(request.text) // request.chunk_size}
```

现在如果传入空文本或负数 `chunk_size`，返回 422 状态码，附带具体错误位置。这不是手写的 if-else 检查，是类型系统强制执行的契约。文档也会自动更新，显示每个字段的约束条件。

## 切分文本

实现切分逻辑，保持简单：

```python
def split_text(text: str, chunk_size: int) -> list[str]:
    chunks = []
    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i + chunk_size])
    return chunks
```

实际项目中可能需要按句子或段落边界切分，避免截断单词。这里聚焦 API 部分，切分算法可以后续优化。

## 并发调用 AI API

同步调用多个外部 API 会累加等待时间——如果每个 API 响应需要 2 秒，调用 5 个 API 就是 10 秒。异步并发让这些等待同时进行，总时间接近最慢的那个请求：

```python
import asyncio
import httpx

async def call_ai_api(client: httpx.AsyncClient, url: str, text: str) -> dict:
    response = await client.post(url, json={"text": text}, timeout=10.0)
    return {"url": url, "result": response.json()}

@app.post("/process/")
async def process_text(request: TextRequest):
    chunks = split_text(request.text, request.chunk_size)

    async with httpx.AsyncClient() as client:
        # 为每个分块分配一个 API，循环使用
        tasks = [
            call_ai_api(client, request.api_urls[i % len(request.api_urls)], chunk)
            for i, chunk in enumerate(chunks)
        ]
        results = await asyncio.gather(*tasks)

    return {"chunks_processed": len(results), "results": results}
```

`asyncio.gather` 并发执行所有任务，在所有任务完成后返回结果列表。如果有 10 个分块和 3 个 API，会同时发出 10 个请求，每个请求指向对应的 API（按索引取模分配）。等待响应时进程不阻塞，可以处理其他请求。

## 处理错误和超时

单个 API 失败不应该导致整个请求失败。用 `return_exceptions=True` 让 `gather` 捕获异常而不是立即抛出：

```python
async def call_ai_api(client: httpx.AsyncClient, url: str, text: str) -> dict:
    try:
        response = await client.post(url, json={"text": text}, timeout=10.0)
        response.raise_for_status()
        return {"url": url, "success": True, "result": response.json()}
    except Exception as e:
        return {"url": url, "success": False, "error": str(e)}

@app.post("/process/")
async def process_text(request: TextRequest):
    chunks = split_text(request.text, request.chunk_size)

    async with httpx.AsyncClient() as client:
        tasks = [
            call_ai_api(client, request.api_urls[i % len(request.api_urls)], chunk)
            for i, chunk in enumerate(chunks)
        ]
        results = await asyncio.gather(*tasks, return_exceptions=False)

    successful = [r for r in results if r.get("success")]
    failed = [r for r in results if not r.get("success")]

    return {
        "total": len(results),
        "successful": len(successful),
        "failed": len(failed),
        "results": results
    }
```

`timeout=10.0` 确保单个请求不会无限等待。如果某个 API 响应慢或挂掉，10 秒后抛出超时异常，被 `try-except` 捕获，记录为失败但不影响其他请求。

## 核心特性

通过这个例子接触到的 FastAPI 特性：

**自动验证**：`Field` 定义的约束在运行时检查，错误请求直接返回 422，不需要手写 if 语句。这也防止了常见漏洞——长度限制避免内存耗尽，类型检查阻止注入攻击。

**异步并发**：`async/await` 让单个进程处理大量 I/O 等待。传统同步框架中，10 个并发请求需要 10 个线程，内存和 CPU 开销远高于异步模型。FastAPI 基于 ASGI，原生支持异步，不像 Flask 需要额外配置。

**自动文档**：访问 `/docs` 即可测试 API。文档与代码同步，因为它们共享同一个数据源——函数签名和 Pydantic 模型。修改字段约束，文档自动更新。

**类型安全**：IDE 会根据类型提示提供代码补全和错误检查。声明 `request.text` 是字符串后，IDE 知道它有 `.split()` 方法但没有 `.append()`。这减少了开发时的猜测。

## 扩展思路

这个例子展示了并发调用外部 API。FastAPI 在其他 AI 场景中同样适用：

**流式返回**：如果希望处理完一个分块就立即返回，而不是等所有分块完成，可以用 `StreamingResponse`。LLM 生成文本时常用这种模式——逐 token 输出，用户不需要等待完整响应：

```python
from fastapi.responses import StreamingResponse

async def generate_stream(chunks, api_urls):
    for i, chunk in enumerate(chunks):
        result = await call_ai_api(client, api_urls[i % len(api_urls)], chunk)
        yield f"data: {json.dumps(result)}\n\n"

@app.post("/stream/")
async def process_stream(request: TextRequest):
    chunks = split_text(request.text, request.chunk_size)
    return StreamingResponse(
        generate_stream(chunks, request.api_urls),
        media_type="text/event-stream"
    )
```

**加载本地模型**：如果不调用外部 API，而是在本地运行模型，用生命周期事件在启动时加载模型，避免每次请求都从磁盘读取：

```python
from contextlib import asynccontextmanager

models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时加载
    models["classifier"] = load_model("model.pkl")
    yield
    # 关闭时清理
    models.clear()

app = FastAPI(lifespan=lifespan)

@app.post("/predict/")
async def predict(request: TextRequest):
    model = models["classifier"]
    predictions = [model.predict(chunk) for chunk in split_text(request.text, 100)]
    return {"predictions": predictions}
```

**WebSocket 双向通信**：对话式 AI 应用中，用户发送消息，模型生成响应的同时可能查询外部工具。每个中间步骤通过 WebSocket 推送更新，而不是等所有步骤完成：

```python
from fastapi import WebSocket

@app.websocket("/chat/")
async def chat(websocket: WebSocket):
    await websocket.accept()
    while True:
        message = await websocket.receive_text()
        # 模拟多步处理
        await websocket.send_text(f"步骤 1: 理解问题")
        await websocket.send_text(f"步骤 2: 检索知识库")
        result = await process_message(message)
        await websocket.send_text(f"结果: {result}")
```

**批处理优化**：GPU 推理时，批量处理多个输入比单个处理高效。收集一段时间内的请求凑成批次，用后台任务定期处理：

```python
from collections import deque

request_queue = deque()

async def batch_processor():
    while True:
        if len(request_queue) >= 32:  # 批次大小
            batch = [request_queue.popleft() for _ in range(32)]
            results = model.predict_batch(batch)
            # 将结果写回对应请求
        await asyncio.sleep(0.01)

@app.on_event("startup")
async def start_processor():
    asyncio.create_task(batch_processor())
```

这些模式的共同点是利用异步处理 I/O 等待（网络请求、数据库查询、文件读写），而不是 CPU 计算。如果任务是 CPU 密集型（图像处理、数值计算），异步没有帮助，应该用同步函数配合多进程。

## 部署和安全

开发时用 `uvicorn main:app --reload`，生产环境需要固定 worker 数量：

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

worker 数量通常设为 `(2 × CPU核心数) + 1`。Docker 部署时固定依赖版本，使用非 root 用户：

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
USER 1000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

输入验证已经通过 Pydantic 强制执行。如果 API 需要认证，用 OAuth2 或 JWT：

```python
from fastapi.security import OAuth2PasswordBearer
from jose import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    return User(**payload)

@app.post("/process/")
async def process_text(
    request: TextRequest,
    user: User = Depends(get_current_user)
):
    # 只有认证用户可以访问
    ...
```

前后端分离项目需要配置 CORS。生产环境明确指定允许的域名，不要用通配符：

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://example.com"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)
```

关闭调试模式避免泄露内部状态。`FastAPI(debug=True)` 会在错误时暴露堆栈跟踪，生产环境设为 `False`，用 Sentry 或 ELK 追踪错误。

完整 API 规格和高级用法见 [FastAPI 官方文档](https://fastapi.tiangolo.com/)。异步编程的底层机制在 [Starlette 文档](https://www.starlette.io/)，数据验证的详细规则在 [Pydantic 文档](https://docs.pydantic.dev/)。
