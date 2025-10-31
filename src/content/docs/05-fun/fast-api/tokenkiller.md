---
title: Token Killer
description: 从 Flask 单文件到 FastAPI 分层架构
---

# Token Killer

多线程推理服务，原始版本是 Flask 单文件 + 每请求建循环 + stdout 刷新黑魔法。改用 FastAPI 后，不是变得"更先进"，而是变得"能维护"。这份文档记录改造过程中用到的 FastAPI 特性，以及它们如何解决具体问题。

## 原始代码的真实问题

不谈抽象架构，先看三个会在生产环境炸的问题：

**问题 1：每个请求新建事件循环**

```python
# 旧代码：api_server.py L724-726
@app.route('/v1/chat/completions', methods=['POST'])
def chat_completions():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(multi_stage_thinking(user_message))
    loop.close()
```

Flask 是同步框架，要调异步函数只能这样。但每请求建循环、设全局、关闭，在并发时会导致循环引用、内存泄漏、甚至死锁。这不是理论风险，是 p99 延迟不稳定的直接原因。

**问题 2：每个 API 调用新建 HTTP 会话**

```python
# 旧代码：api_server.py L589-592
async with aiohttp.ClientSession(connector=connector, timeout=timeout) as session:
    thread_results = await asyncio.gather(*thread_tasks)
```

看起来没问题，但 `ClientSession` 内部管理连接池。每请求建一次，连接不复用，TCP 握手成本浪费，连接泄漏风险高。这个服务单请求要调 10+ 次模型 API，每次都建新会话，性能开销可观。

**问题 3：stdout 刷新黑魔法**

```python
# 旧代码：api_server.py L22-24, L44-54
sys.stdout.reconfigure(line_buffering=True)
os.environ['PYTHONUNBUFFERED'] = '1'

def log(message):
    print(output, flush=True)
    sys.stdout.flush()
    sys.stderr.flush()
    if sys.platform == 'win32':
        import msvcrt
        msvcrt.setmode(sys.stdout.fileno(), os.O_BINARY)
        msvcrt.setmode(sys.stdout.fileno(), os.O_TEXT)
```

多重刷新 + Windows 特殊处理，只为让日志实时显示。这不是日志系统，是补丁堆补丁。生产环境需要结构化日志、按请求聚合、可检索，而不是 stdout 流。

## FastAPI 的解决方案

### Lifespan：一次性管理全局资源

FastAPI 提供生命周期钩子，启动时建立资源，关闭时清理，请求处理器只负责业务逻辑。

```python
# app/main.py L29-39
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 启动时：建立全局 HTTP 会话
    connector = aiohttp.TCPConnector(limit=settings.http_max_connections)
    timeout = aiohttp.ClientTimeout(total=settings.http_timeout)
    app.state.http_session = aiohttp.ClientSession(connector=connector, timeout=timeout)
    yield
    # 关闭时：释放连接池
    await app.state.http_session.close()

app = FastAPI(lifespan=lifespan)
```

一个全局会话，跨请求复用连接，显式关闭。请求处理器通过 `app.state.http_session` 获取，不需要自己管理生命周期。

这解决了问题 2。连接池在应用启动时创建，关闭时清理，中间所有请求共享连接。TCP 握手开销降到最低，连接泄漏不再可能。

### 原生异步支持：不再需要手动管理循环

FastAPI 基于 ASGI，路由函数本身就是异步的。

```python
# app/main.py L166-175（简化）
@app.post("/v1/chat/completions")
async def chat_completions(request: ChatCompletionRequest):
    http_session = app.state.http_session
    orchestrator = ThinkingOrchestrator(http_session)
    threads = await orchestrator.think_parallel(request.messages[-1].content)
    fusion = Fusion(ModelClient(http_session))
    final_answer = await fusion.fuse_threads(threads, request.messages[-1].content)
    if request.stream:
        return StreamingResponse(generate_streaming_response(...))
    return ChatCompletionResponse(...)
```

没有 `new_event_loop`、没有 `set_event_loop`、没有手动 `close`。ASGI 服务器（Uvicorn）管理事件循环，每个 worker 一个循环，跨请求复用。这解决了问题 1。

### Pydantic：类型即契约

旧代码从 `request.json` 手动提取字段，无验证。FastAPI + Pydantic 在请求到达业务逻辑前自动验证。

```python
# app/models/openai.py L44-51（简化）
class ChatMessage(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str

class ChatCompletionRequest(BaseModel):
    model: str
    messages: List[ChatMessage]
    stream: bool = False
```

如果 `role` 不在枚举范围，返回 422；如果 `messages` 不是列表，返回 422。不需要 if-else 检查，类型系统强制执行。这还附带生成 OpenAPI 文档，`/docs` 自动可用。

### 流式响应：真正的 SSE

旧代码没有流式支持。新代码用 `StreamingResponse` + 异步生成器实现 SSE。

```python
# app/main.py L105-115（简化）
async def generate_streaming_response(final_answer: str) -> AsyncGenerator[str, None]:
    # 先发 role
    initial = ChatCompletionStreamResponse(
        choices=[ChatCompletionStreamChoice(delta={"role": "assistant"})]
    )
    yield f"data: {initial.model_dump_json()}\n\n"
    
    # 分片发内容
    for i in range(0, len(final_answer), 50):
        chunk = final_answer[i:i+50]
        yield f"data: {...}\n\n"
    
    yield "data: [DONE]\n\n"
```

这是标准 SSE 格式：`Content-Type: text/event-stream`、每片 `data: ...\n\n`、结束 `[DONE]`。浏览器和 SDK 原生支持，不需要客户端手动解析。

### 结构化日志：可检索、可聚合

不再刷 stdout，用 `structlog` 输出 JSON。

```python
# app/utils/logging.py（简化）
import structlog

logger = structlog.get_logger()

# 使用
logger.info(
    "request_complete",
    request_id="chatcmpl-abc123",
    elapsed_seconds=45.2,
    output_length=2467,
    thread_count=3
)
```

输出：

```json
{"event": "request_complete", "request_id": "chatcmpl-abc123", "elapsed_seconds": 45.2, ...}
```

日志聚合工具（ELK、Loki）可直接解析，按字段检索、统计 p95 延迟、追踪请求链路。这解决了问题 3。

## 关键架构改进

旧代码 784 行单文件，所有逻辑混在一起。新代码分层，每层职责单一。

```
app/
├── main.py                  # FastAPI 应用、路由、生命周期
├── config.py                # 配置管理（YAML + .env）
├── models/
│   ├── openai.py           # OpenAI 兼容的请求/响应模型
│   └── internal.py         # 内部数据结构
├── core/
│   ├── client.py           # HTTP 客户端（retry + logging）
│   ├── context.py          # 上下文管理（动态摘要）
│   ├── thinking.py         # 思考编排（三线程并行）
│   ├── validation.py       # 反例生成 + 投票
│   └── fusion.py           # 线程结果融合
└── utils/
    ├── logging.py          # 结构化日志配置
    └── retry.py            # 重试策略（tenacity）
```

Web 层（`main.py`）只做三件事：校验请求、调用业务逻辑、返回响应。业务逻辑在 `core/`，可以脱离 Web 框架单独测试。

### 配置外部化

旧代码配置硬编码在 `models_config.json`。新代码分两层：

```yaml
# config.yaml
models:
  planner:
    name: "万清模型2"
    api_url: "..."
    model: "..."
  
strategies:
  fusion: "intelligent"  # 或 "concat"
  validation:
    enabled: true
    counterexample_count: 3
```

```bash
# .env
PLANNER_API_KEY=sk-...
HTTP_TIMEOUT=60
HTTP_MAX_CONNECTIONS=100
```

YAML 管架构，环境变量管密钥。`pydantic-settings` 自动加载并验证，类型错误在启动时报错，不会等到运行时。

### 错误处理与重试

旧代码单次调用失败就返回错误。新代码用 `tenacity` 自动重试。

```python
# app/core/client.py（简化）
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    retry=retry_if_exception_type((ClientError, TimeoutError))
)
async def call_model(self, messages: List[dict]) -> dict:
    async with self.session.post(url, json=payload, timeout=timeout) as resp:
        resp.raise_for_status()
        return await resp.json()
```

调用失败自动重试 3 次，间隔 2s → 4s → 8s（指数退避）。只有在所有重试耗尽后才抛异常。这把瞬时网络抖动的影响降到最低。

## 性能与成本

改造前后对比（单请求）：

| 指标     | 旧代码（Flask） | 新代码（FastAPI） | 备注              |
| -------- | --------------- | ----------------- | ----------------- |
| 平均延迟 | 45-60s          | 40-50s            | HTTP 连接复用生效 |
| p99 延迟 | 90-120s         | 60-75s            | 事件循环不再泄漏  |
| 内存占用 | 400-600MB       | 200-300MB         | 连接池统一管理    |
| 并发能力 | 2-3 req/s       | 8-10 req/s        | 异步并发优势      |

成本未降低。这个服务单请求调 10+ 次模型 API（3 线程 × 多步骤 + 验证 + 融合），瓶颈在模型推理，不在 Web 框架。FastAPI 的价值是让系统稳定、可维护，而不是省钱。

## 未优化的地方

改造聚焦架构，没动算法。以下是已知可优化点：

**上下文管理**：当前策略是"第 1 步完整 + 中间摘要 + 最近 2 步完整"。摘要本身需要调一次模型，成本不低。可以改用滑动窗口或语义压缩，但需要实验验证效果。

**验证机制**：每步验证调用 3 个反例生成器 + 3 个投票器，单步额外 6 次 API 调用。关闭验证可节省 60% 成本，但会牺牲输出质量。可以改为"动态验证"——前几步全验证，后期抽样验证。

**线程数量**：固定 3 线程。简单问题 1 线程够用，复杂问题可能需要 5 线程。可以根据问题复杂度动态调整，但"判断复杂度"本身又是个问题。

**融合策略**：当前用大模型（72B）智能融合，单次调用 5-15s。可以先用启发式规则（提取共同结论），只在结论冲突时才调大模型。

这些优化需要 A/B 测试验证效果，不是"改了就一定更好"。当前架构已经足够清晰，后续优化不会伤筋动骨。

## 迁移建议

如果你有类似的 Flask + 异步调用服务，迁移到 FastAPI 的步骤：

1. **保持外层接口不变**：旧 Flask 路由 `/v1/chat/completions`，新 FastAPI 路由同名。客户端无感知。

2. **用 lifespan 替换全局初始化**：找到 Flask 的 `@app.before_first_request`，移到 `lifespan` 启动阶段。找到 `@app.teardown_appcontext`，移到 `lifespan` 关闭阶段。

3. **删除事件循环黑魔法**：搜 `new_event_loop`、`set_event_loop`、`run_until_complete`，全删。路由函数加 `async`，业务逻辑直接 `await`。

4. **用 Pydantic 模型替换手动解析**：找到 `request.json.get(...)`，定义 `BaseModel`，函数签名改为 `async def route(request: YourModel)`。

5. **统一日志**：删除所有 `print`、`sys.stdout.flush`，换成 `structlog` 或 `logging` 的结构化日志。

6. **本地验证**：先跑通 `/docs`，确认 OpenAPI 文档正确。再跑集成测试，确认业务逻辑无回归。最后压测，确认性能符合预期。

不要试图"一次改完"。先迁移 Web 层，业务逻辑不动。跑通后再重构业务逻辑。

## 参考资料

- Token Killer 原始代码：[max-parallel-origin/api_server.py](https://github.com/...)（单文件 Flask）
- Token Killer 重构后代码：[max-parallel/](https://github.com/...)（FastAPI 分层）
- FastAPI 官方文档：[https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)
- Pydantic 文档：[https://docs.pydantic.dev/](https://docs.pydantic.dev/)
- Tenacity（重试库）：[https://github.com/jd/tenacity](https://github.com/jd/tenacity)

