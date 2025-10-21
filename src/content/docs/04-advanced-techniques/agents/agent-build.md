---
title: How to Build an Agent
description: 学习从零开始构建一个功能完整的 AI Agent 的完整流程与最佳实践
---

## 构建 Agent 的核心步骤

构建一个生产级 AI Agent 需要系统化的方法论，本指南将带你从零到一完成整个过程。

### 1. 明确目标与能力边界

**定义 Agent 的职责范围：**

- 核心任务：Agent 要解决什么问题？（如代码生成、数据分析、客服对话）
- 能力边界：明确 Agent 能做什么、不能做什么
- 成功标准：如何衡量 Agent 是否完成了任务？

**示例场景：**

```yaml
Agent 类型: 代码审查助手
核心任务: 自动审查 Pull Request 并提供改进建议
能力范围:
  - 检测代码质量问题（复杂度、重复代码）
  - 识别安全漏洞
  - 提供重构建议
能力边界:
  - 不做自动合并决策
  - 不修改生产环境配置
成功标准:
  - 90% 的问题检出率
  - < 5 秒响应延迟
```

### 2. 工具与技能集成

Agent 的能力来自于它能调用的工具集合。

**工具类型：**

- **信息检索**：搜索引擎、数据库查询、知识库检索
- **外部 API**：天气、股票、新闻等第三方服务
- **代码执行**：Python/JavaScript 解释器、Shell 命令
- **文件操作**：读写文件、版本控制操作
- **通信工具**：发送邮件、消息通知

**工具定义示例（Function Calling）：**

```json
{
  "name": "search_codebase",
  "description": "在代码库中搜索相关文件和函数",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "搜索关键词或语义描述"
      },
      "file_types": {
        "type": "array",
        "items": { "type": "string" },
        "description": "限制搜索的文件类型，如 ['.py', '.js']"
      }
    },
    "required": ["query"]
  }
}
```

### 3. 推理循环与控制流

Agent 不是简单的单次调用，而是一个循环推理过程。

**常见推理模式：**

#### ReAct (Reasoning + Acting)

交替进行推理与行动：

```
思考 → 行动 → 观察 → 思考 → 行动 → ...
```

#### Plan-Execute

先制定完整计划，再逐步执行：

```
规划阶段 → 执行步骤1 → 执行步骤2 → ... → 总结
```

#### Reflection

执行后自我反思与改进：

```
执行 → 评估结果 → 反思改进点 → 重新执行
```

**伪代码示例（ReAct）：**

```python
def agent_loop(task):
    context = []
    max_iterations = 10
    
    for i in range(max_iterations):
        # 思考下一步
        thought = llm.generate(f"任务: {task}\n历史: {context}\n下一步思考:")
        
        # 决定行动
        action = llm.function_call(thought)
        
        # 执行工具
        observation = execute_tool(action)
        
        # 更新上下文
        context.append({"thought": thought, "action": action, "result": observation})
        
        # 判断是否完成
        if is_task_complete(observation):
            return generate_final_answer(context)
    
    return "任务超时或未完成"
```

### 4. 记忆与状态管理

Agent 需要记住对话历史和任务上下文。

**记忆类型：**

- **短期记忆**：当前会话的上下文窗口
- **长期记忆**：跨会话的持久化存储（向量数据库、KV 存储）
- **工作记忆**：任务执行过程中的临时变量

**实现方案：**

```python
class AgentMemory:
    def __init__(self):
        self.short_term = []  # 当前对话历史
        self.long_term_db = VectorStore()  # 长期知识库
        self.working_memory = {}  # 任务变量
    
    def add_message(self, role, content):
        self.short_term.append({"role": role, "content": content})
        # 窗口管理：超过限制时压缩或存档
        if len(self.short_term) > MAX_CONTEXT:
            self.compress_history()
    
    def retrieve_relevant(self, query):
        return self.long_term_db.search(query, top_k=3)
```

### 5. 安全与控制

生产环境的 Agent 必须有安全保障。

**关键措施：**

- **权限控制**：限制 Agent 可访问的资源和操作范围
- **审计日志**：记录所有工具调用和决策过程
- **人类确认**：高风险操作需要人工审批
- **错误恢复**：异常处理与回滚机制
- **输出过滤**：防止敏感信息泄露

**示例：工具权限包装器**

```python
class SecureTool:
    def __init__(self, tool_func, permissions):
        self.func = tool_func
        self.permissions = permissions
    
    def execute(self, user, *args):
        # 权限检查
        if not self.has_permission(user, self.permissions):
            raise PermissionError(f"用户 {user} 无权执行此操作")
        
        # 审计日志
        log_audit(user, self.func.__name__, args)
        
        # 执行工具
        try:
            result = self.func(*args)
            return result
        except Exception as e:
            log_error(user, self.func.__name__, e)
            raise
```

### 6. 评估与观测

持续监控 Agent 的表现并优化。

**评估维度：**

- **任务成功率**：Agent 是否正确完成了任务？
- **效率**：平均执行时间、工具调用次数
- **成本**：Token 消耗、API 调用费用
- **用户满意度**：人工反馈与评分

**可观测性工具：**

- **LangSmith**：LangChain 官方的 Trace 与调试平台
- **LangFuse**：开源 Agent 可观测平台
- **Weights & Biases**：实验跟踪与对比
- **自建日志系统**：基于 ELK、Grafana 等

### 7. 部署与运行时

将 Agent 从原型推向生产。

**部署选项：**

- **API 服务**：FastAPI + Docker 容器化部署
- **Serverless**：AWS Lambda、Vercel Functions（适合间歇性任务）
- **长期运行**：Kubernetes + 消息队列（适合持续监听任务）

**模型选型建议：**

| 场景             | 推荐模型                          | 原因                       |
| ---------------- | --------------------------------- | -------------------------- |
| 快速原型         | GPT-4o / Claude 3.5 Sonnet        | 能力强、开发效率高         |
| 生产环境         | GPT-4o-mini / Claude 3.5 Haiku    | 成本与性能平衡             |
| 本地部署         | Llama 3.1 / Qwen 2.5              | 可私有化、无外部依赖       |
| 复杂推理         | Claude 3.5 Sonnet / o1-mini       | 推理能力强                 |
| 高并发低延迟     | GPT-4o-mini / Gemini Flash        | 响应快、成本低             |

---

## 完整示例：代码审查 Agent

将上述概念整合为一个完整的代码审查 Agent：

```python
from langchain.agents import initialize_agent, Tool
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory

# 1. 定义工具
tools = [
    Tool(
        name="SearchCodebase",
        func=search_codebase,
        description="搜索代码库中的文件和函数"
    ),
    Tool(
        name="RunLinter",
        func=run_linter,
        description="运行代码质量检查工具"
    ),
    Tool(
        name="CheckSecurity",
        func=check_security,
        description="扫描安全漏洞"
    ),
]

# 2. 初始化 LLM
llm = ChatOpenAI(model="gpt-4o", temperature=0)

# 3. 添加记忆
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# 4. 创建 Agent
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent="chat-conversational-react-description",
    memory=memory,
    verbose=True,
    max_iterations=5
)

# 5. 执行任务
result = agent.run(
    "请审查 PR #123，检查代码质量和安全问题，并给出改进建议"
)

print(result)
```

---

## 最佳实践总结

1. **从简单开始**：先实现单任务 Agent，再扩展为多任务
2. **工具优先**：Agent 的能力取决于工具质量，优先打磨工具集
3. **人类在环**：初期让人工审核关键决策，逐步放开
4. **可观测优先**：从第一天就加入日志与 Trace，而不是事后补救
5. **成本控制**：使用缓存、选择合适模型、限制最大迭代次数
6. **安全第一**：权限控制、审计日志、错误处理缺一不可

---

## 进阶阅读

- [LangChain Agents 文档](https://python.langchain.com/docs/modules/agents/)
- [LangGraph 教程](https://langchain-ai.github.io/langgraph/)
- [AutoGPT 源码](https://github.com/Significant-Gravitas/AutoGPT)
- [ReAct 论文](https://arxiv.org/abs/2210.03629)
