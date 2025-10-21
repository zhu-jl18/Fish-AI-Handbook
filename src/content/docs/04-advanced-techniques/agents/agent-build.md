---
title: 如何构建 Agent
description: Agent 构建的完整工程实践指南，涵盖架构设计、工具集成、状态管理与生产部署
---

## 技术栈选择

**推荐框架：**

- **LangGraph**（推荐）：低层编排框架，支持持久化状态、人类审批、断点续执行
- **LangChain AgentExecutor**（已弃用）：迁移至 LangGraph
- **AutoGPT/AutoGen**：高度自动化场景，但可控性差

**核心能力对比：**

| 能力         | LangGraph    | AgentExecutor | 自研   |
| ------------ | ------------ | ------------- | ------ |
| 持久化状态   | ✅           | ❌            | 需实现 |
| 人类在环审批 | ✅           | ❌            | 需实现 |
| 可视化调试   | ✅（Studio） | ❌            | 需实现 |
| 自定义控制流 | ✅           | ⚠️ 受限       | ✅     |
| 生产级部署   | ✅（Cloud）  | ❌            | 需实现 |

---

## 架构设计

### 1. 核心组件

```python
# 最简 LangGraph Agent
from langgraph.prebuilt import create_react_agent
from langchain_anthropic import ChatAnthropic

def search_tool(query: str) -> str:
    """搜索代码库"""
    return f"搜索结果: {query}"

agent = create_react_agent(
    model=ChatAnthropic(model="claude-sonnet-4-5-20250929"),
    tools=[search_tool],
    prompt="你是代码审查助手"
)

# 流式执行
for event in agent.stream(
    {"messages": [{"role": "user", "content": "审查 PR #123"}]},
    stream_mode="values"
):
    print(event["messages"][-1])
```

### 2. 状态管理（StateGraph）

LangGraph 的核心是状态图：

```python
from langgraph.graph import StateGraph, MessagesState
from langgraph.checkpoint.memory import MemorySaver

# 定义状态
class AgentState(MessagesState):
    code_context: str
    findings: list[dict]

# 构建图
workflow = StateGraph(AgentState)

def analyze_code(state: AgentState):
    # 分析代码
    return {"findings": [...]}

def generate_report(state: AgentState):
    # 生成报告
    return {"messages": [...]}

workflow.add_node("analyze", analyze_code)
workflow.add_node("report", generate_report)
workflow.add_edge("analyze", "report")
workflow.set_entry_point("analyze")

# 持久化（自动保存/恢复状态）
memory = MemorySaver()
app = workflow.compile(checkpointer=memory)
```

### 3. 控制流模式

**条件分支：**

```python
def should_continue(state: AgentState) -> str:
    if len(state["findings"]) > 10:
        return "prioritize"  # 问题太多，先筛选
    return "report"

workflow.add_conditional_edges(
    "analyze",
    should_continue,
    {"prioritize": "filter", "report": "report"}
)
```

**并行执行：**

```python
workflow.add_node("security_check", check_security)
workflow.add_node("quality_check", check_quality)
workflow.add_edge("analyze", "security_check")
workflow.add_edge("analyze", "quality_check")
```

**人类审批（Human-in-the-Loop）：**

```python
from langgraph.checkpoint import interrupt

def risky_operation(state: AgentState):
    if state["findings"].has_critical:
        # 暂停执行，等待人工确认
        interrupt("发现严重问题，需人工审核")
    return deploy_fix(state)

workflow.add_node("deploy", risky_operation)
```

---

## 工具集成

### Function Calling 标准

主流模型（GPT-4o、Claude Sonnet 4.5、Gemini 2.5 Pro）均支持工具调用：

```python
from langchain_core.tools import tool

@tool
def execute_code(code: str, language: str = "python") -> str:
    """执行代码并返回结果

    Args:
        code: 要执行的代码
        language: 编程语言（python/javascript）
    """
    # 沙箱执行
    result = sandbox.run(code, language)
    return result
```

### MCP（Model Context Protocol）

Anthropic 2024 年底推出的工具标准，支持跨工具复用：

```python
# MCP 服务器定义
from mcp import Server, Tool

server = Server("code-tools")

@server.tool()
def search_symbols(query: str) -> list[dict]:
    """搜索代码符号"""
    return ast_analyzer.search(query)

# Agent 连接 MCP
agent.add_mcp_server("http://localhost:8080")
```

---

## 记忆系统

### 短期记忆（上下文窗口）

```python
from langgraph.checkpoint.memory import MemorySaver

# 自动管理对话历史
checkpointer = MemorySaver()
app = workflow.compile(checkpointer=checkpointer)

# 跨会话恢复
config = {"configurable": {"thread_id": "pr-123"}}
app.invoke(input, config=config)  # 自动加载历史
```

### 长期记忆（向量数据库）

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

# 存储历史决策
vectorstore = Chroma(
    collection_name="agent_memory",
    embedding_function=OpenAIEmbeddings()
)

def retrieve_context(query: str) -> str:
    docs = vectorstore.similarity_search(query, k=3)
    return "\n".join([d.page_content for d in docs])
```

---

## 观测与调试

### LangSmith（官方推荐）

```python
import os
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = "..."
os.environ["LANGCHAIN_PROJECT"] = "code-reviewer"

# 自动上传 Trace，可视化每一步决策
```

### LangGraph Studio

```bash
pip install langgraph-studio
langgraph dev  # 启动本地调试服务器
```

访问 `http://localhost:8000` 可视化调试状态图、查看检查点。

---

## 生产部署

### 模型选择（2025年10月）

| 场景     | 推荐模型                       | 原因                   |
| -------- | ------------------------------ | ---------------------- |
| 极致推理 | o1 / Claude Sonnet 4.5         | 复杂多步推理           |
| 生产均衡 | GPT-4o / Claude Sonnet 4.5     | 性能成本最优           |
| 高吞吐   | GPT-4o-mini / Gemini 2.5 Flash | 低延迟高性价比         |
| 本地部署 | Llama 3.3 70B / Qwen 2.5 72B   | 私有化部署             |
| 代码专用 | Claude Sonnet 4.5 / GPT-4o     | 200K 上下文 + 工具调用 |

### 部署方案

**LangGraph Cloud（推荐）：**

```bash
langgraph deploy  # 一键部署到 LangSmith 平台
```

自动提供：持久化存储、断点恢复、流式输出、监控告警。

**自托管：**

```python
# FastAPI 包装
from fastapi import FastAPI
from langgraph.graph import StateGraph

app = FastAPI()
agent_graph = compile_agent()

@app.post("/invoke")
async def run_agent(request: dict):
    config = {"configurable": {"thread_id": request["session_id"]}}
    result = await agent_graph.ainvoke(request["input"], config)
    return result
```

---

## 安全与治理

### 1. 权限控制

```python
class SecureAgent:
    def __init__(self, allowed_tools: set[str]):
        self.allowed = allowed_tools

    def validate_tool(self, tool_name: str):
        if tool_name not in self.allowed:
            raise PermissionError(f"工具 {tool_name} 未授权")
```

### 2. 输出过滤

```python
from presidio_analyzer import AnalyzerEngine

analyzer = AnalyzerEngine()

def sanitize_output(text: str) -> str:
    results = analyzer.analyze(text, language="en")
    # 移除 PII（邮箱、电话、密钥）
    return redact_pii(text, results)
```

### 3. 审计日志

```python
import structlog

log = structlog.get_logger()

def audit_tool_call(tool: str, args: dict, result: any):
    log.info(
        "tool_executed",
        tool=tool,
        args=args,
        result_type=type(result).__name__
    )
```

---

## 最佳实践

1. **用 LangGraph 而非 AgentExecutor**：AgentExecutor 已弃用
2. **状态优先设计**：定义清晰的 `State` 类型，所有节点基于状态转换
3. **工具幂等性**：工具执行失败可重试，避免副作用
4. **流式输出**：用 `stream_mode="updates"` 提供实时反馈
5. **检查点策略**：长任务每步保存检查点，支持断点续执行
6. **成本控制**：用 GPT-4o-mini 做规划，Claude Sonnet 4.5 做复杂推理

---

## 参考资源

- [LangGraph 文档](https://docs.langchain.com/oss/python/langgraph/)
- [LangGraph Studio](https://langchain-ai.github.io/langgraph/concepts/langgraph_studio/)
- [MCP 协议规范](https://modelcontextprotocol.io/)
- [Claude 工具使用指南](https://docs.anthropic.com/en/docs/agents-and-tools)
