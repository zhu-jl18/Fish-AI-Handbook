---
title: Subagents
description: Claude Code 中 Subagents 功能的技术原理与使用指南
---

Subagent 是 Claude Code 的并行执行机制，允许主 Agent 派生出多个子 Agent 同时处理不同的任务。这不是什么新鲜概念，就是把一个大任务拆成多个小任务并行跑，但实现细节决定了它能不能真正提升效率。

## 什么是 Subagent

Subagent 本质上是主 Agent 的一个独立执行上下文。当你需要同时处理多个相互独立的任务时，主 Agent 可以创建多个 Subagent，每个 Subagent 拿到自己的任务描述和上下文，独立执行，最后把结果返回给主 Agent。

这个设计的核心价值在于并行。如果你要同时审查 5 个文件，串行执行需要等每个文件审查完才能开始下一个，而 Subagent 可以让 5 个审查任务同时跑，总耗时接近单个任务的时间。

但并行不是免费的。每个 Subagent 都会消耗独立的 API 调用配额，如果你的任务本身就很快，创建 Subagent 的开销可能比串行执行还高。所以 Subagent 适合处理耗时较长、相互独立的任务，不适合快速的简单操作。

## 上下文传递机制

Subagent 的上下文传递是个关键问题。主 Agent 创建 Subagent 时，需要决定传递哪些上下文信息。

### 上下文隔离

每个 Subagent 拥有独立的上下文空间。主 Agent 的对话历史、工具调用记录、文件缓存等状态不会自动传递给 Subagent。这是有意为之的设计，避免 Subagent 之间互相干扰。

如果 Subagent 需要主 Agent 的某些上下文，必须显式传递。比如主 Agent 已经读取了项目的配置文件，Subagent 需要这个配置，主 Agent 要在创建 Subagent 时把配置内容作为参数传进去。

```bash
# 主 Agent 创建 Subagent 时传递上下文
> 创建 3 个 subagent，分别审查 auth.ts、db.ts、api.ts，使用项目配置 config.json
```

Claude Code 会把 `config.json` 的内容作为上下文传递给每个 Subagent，Subagent 可以直接使用这些信息，不需要重新读取文件。

### 上下文大小限制

Subagent 的上下文窗口和主 Agent 共享同一个模型的限制。如果你用的是 Claude Sonnet 4.5，上下文窗口是 200K tokens。主 Agent 和所有 Subagent 的上下文总和不能超过这个限制。

实际使用中，主 Agent 的上下文通常会占用一部分窗口，剩下的空间分配给 Subagent。如果你创建了 5 个 Subagent，每个 Subagent 能用的上下文大约是剩余窗口的 1/5。

这意味着 Subagent 不适合处理需要大量上下文的任务。如果单个任务需要读取几十个文件，Subagent 的上下文可能不够用，这时候串行执行反而更合适。

### 上下文同步

Subagent 执行完成后，结果会返回给主 Agent。主 Agent 可以选择把 Subagent 的结果合并到自己的上下文中，也可以只提取关键信息。

比如 5 个 Subagent 分别审查了 5 个文件，每个 Subagent 返回了一份详细的审查报告。主 Agent 可以把 5 份报告全部保存到上下文中，也可以只提取每份报告的问题列表，丢弃详细描述。

这个选择取决于后续任务的需求。如果你需要根据审查报告修改代码，完整的报告更有用。如果你只需要知道有哪些问题，问题列表就够了。

## 并行执行机制

Subagent 的并行执行是通过异步 API 调用实现的。主 Agent 创建多个 Subagent 时，会同时发起多个 API 请求，每个请求对应一个 Subagent 的任务。

### 并行度控制

Claude Code 不会无限制地并行执行 Subagent。实际的并行度受限于几个因素：

1. **API 速率限制**：Anthropic 的 API 有速率限制，每分钟最多发起一定数量的请求。如果你创建了 10 个 Subagent，但速率限制只允许同时处理 5 个请求,剩下的 5 个会排队等待。

2. **本地资源限制**：每个 Subagent 都会占用本地的内存和 CPU 资源。如果你的机器性能有限，创建太多 Subagent 可能导致系统卡顿。

3. **任务依赖关系**：如果某些 Subagent 的任务依赖其他 Subagent 的结果，它们不能真正并行执行。Claude Code 会自动检测依赖关系，按照拓扑顺序执行。

实际使用中，3-5 个 Subagent 是比较合理的并行度。超过这个数量，收益递减，甚至可能因为资源竞争导致性能下降。

### 执行顺序

Subagent 的执行顺序是不确定的。主 Agent 创建 Subagent 时,它们会同时开始执行，但完成的顺序取决于任务的复杂度和 API 响应速度。

如果你需要保证某个 Subagent 先完成，可以分批创建 Subagent。先创建第一批，等它们完成后再创建第二批。

```bash
# 分批执行
> 创建 subagent 审查 auth.ts，完成后创建 3 个 subagent 分别审查 db.ts、api.ts、utils.ts
```

这样可以确保 `auth.ts` 的审查结果在其他文件审查之前完成，如果后续任务依赖这个结果，就不会出问题。

### 错误处理

Subagent 执行失败时，主 Agent 可以选择重试、跳过或终止整个任务。

默认行为是跳过失败的 Subagent，继续执行其他 Subagent。比如 5 个 Subagent 中有 1 个失败了，剩下 4 个会继续执行，最后主 Agent 会收到 4 个成功的结果和 1 个失败的错误信息。

如果你需要所有 Subagent 都成功才能继续，可以在创建 Subagent 时指定严格模式。这样任何一个 Subagent 失败都会导致整个任务终止。

```bash
# 严格模式
> 创建 3 个 subagent 审查文件，任何一个失败就终止任务
```

## 主 Agent 的交互能力

Subagent 运行期间，主 Agent 的行为取决于你的交互方式。

### 阻塞模式

默认情况下，主 Agent 会等待所有 Subagent 完成后才响应你的下一个指令。这是阻塞模式，主 Agent 在等待期间不会处理新的输入。

这个模式适合你只需要等待结果的场景。比如你让主 Agent 创建 5 个 Subagent 审查文件，然后去喝杯咖啡，回来看结果。

### 非阻塞模式

如果你需要在 Subagent 运行期间继续和主 Agent 交互，可以使用非阻塞模式。主 Agent 会在后台等待 Subagent 完成，同时继续处理你的新指令。

```bash
# 非阻塞模式
> 创建 5 个 subagent 审查文件，后台运行
> 同时帮我生成测试用例
```

主 Agent 会同时处理两个任务：等待 Subagent 完成和生成测试用例。Subagent 完成后，主 Agent 会通知你结果。

非阻塞模式的问题是上下文管理变得复杂。如果你在 Subagent 运行期间修改了代码，Subagent 的结果可能基于旧版本的代码,导致不一致。所以非阻塞模式适合相互独立的任务，不适合有依赖关系的任务。

### 进度反馈

Subagent 运行期间，主 Agent 可以提供进度反馈。比如 5 个 Subagent 中已经完成了 3 个，主 Agent 会告诉你当前进度。

这个功能在处理大量 Subagent 时很有用。如果你创建了 20 个 Subagent，不知道它们什么时候完成，进度反馈可以让你心里有数。

```bash
# 查看进度
> 检查 subagent 进度
```

主 Agent 会返回每个 Subagent 的状态：运行中、已完成、失败。

## Subagent 与 Worktree 多实例的区别

Subagent 和在 worktree 中并行运行多个 Claude Code 实例看起来都能实现并行，但它们的适用场景完全不同。

### 资源隔离

Worktree 多实例是完全独立的 Claude Code 进程，每个实例有自己的配置、上下文、工具调用记录。它们之间没有任何共享,完全隔离。

Subagent 是同一个 Claude Code 进程内的并行任务，共享主 Agent 的配置和部分上下文。它们之间可以通过主 Agent 交换信息。

如果你需要完全独立的执行环境，比如同时测试不同的配置或分支，worktree 多实例更合适。如果你只是想并行处理同一个项目的不同部分，Subagent 更高效。

### 上下文共享

Worktree 多实例之间无法共享上下文。如果你在一个实例中读取了某个文件，另一个实例需要重新读取。

Subagent 可以通过主 Agent 共享上下文。主 Agent 读取的文件可以传递给所有 Subagent，避免重复读取。

这意味着 Subagent 在处理需要共享上下文的任务时更高效。比如多个任务都需要项目配置文件，Subagent 只需要读取一次，worktree 多实例需要读取多次。

### 协调成本

Worktree 多实例需要手动协调。你要自己决定每个实例做什么，然后手动合并结果。

Subagent 由主 Agent 自动协调。你只需要告诉主 Agent 要做什么，主 Agent 会自动创建 Subagent、分配任务、合并结果。

如果任务的协调逻辑很复杂，手动协调可能更灵活。如果任务的协调逻辑很简单，Subagent 的自动协调更省事。

### 适用场景对比

| 场景                     | Subagent | Worktree 多实例 |
| ------------------------ | -------- | --------------- |
| 并行审查多个文件         | ✓        | ✓               |
| 测试不同配置             | ✗        | ✓               |
| 同时处理多个分支         | ✗        | ✓               |
| 需要共享上下文的并行任务 | ✓        | ✗               |
| 自动协调和合并结果       | ✓        | ✗               |
| 完全独立的执行环境       | ✗        | ✓               |

简单来说，Subagent 适合同一个项目内的并行任务，worktree 多实例适合需要完全隔离的并行任务。

## 使用建议

### 什么时候用 Subagent

1. **批量处理独立任务**：审查多个文件、生成多个测试、重构多个模块等。
2. **任务耗时较长**：单个任务需要几十秒甚至几分钟，并行能显著减少总耗时。
3. **任务之间有共享上下文**：多个任务需要相同的配置或依赖信息。

### 什么时候不用 Subagent

1. **任务很快**：单个任务只需要几秒钟，创建 Subagent 的开销比串行执行还高。
2. **任务有强依赖关系**：后一个任务依赖前一个任务的结果，无法真正并行。
3. **上下文需求很大**：单个任务需要大量上下文，Subagent 的上下文窗口不够用。

### 最佳实践

1. **控制并行度**：3-5 个 Subagent 是合理的并行度，不要创建太多。
2. **明确任务边界**：每个 Subagent 的任务要清晰独立，避免相互依赖。
3. **传递必要上下文**：只传递 Subagent 真正需要的上下文，避免浪费窗口空间。
4. **处理失败情况**：考虑 Subagent 失败的情况，决定是重试、跳过还是终止。
5. **验证结果一致性**：Subagent 的结果可能基于不同的时间点，确保它们的一致性。

## 实际案例

### 批量代码审查

你有 10 个文件需要审查，每个文件的审查需要 30 秒。串行执行需要 5 分钟，用 5 个 Subagent 并行执行只需要 1 分钟。

```bash
> 创建 5 个 subagent，分别审查 auth.ts、db.ts、api.ts、utils.ts、config.ts
```

主 Agent 会创建 5 个 Subagent，每个 Subagent 审查一个文件。所有 Subagent 同时开始执行，大约 30 秒后全部完成。主 Agent 收到 5 份审查报告，合并后返回给你。

### 多模块重构

你需要重构 3 个模块，每个模块的重构逻辑相似但独立。用 3 个 Subagent 并行处理，每个 Subagent 负责一个模块。

```bash
> 创建 3 个 subagent，分别重构 auth 模块、database 模块、api 模块，使用统一的重构规则
```

主 Agent 会把重构规则传递给每个 Subagent，Subagent 独立执行重构。完成后主 Agent 检查 3 个模块的重构结果，确保它们的接口兼容。

### 测试生成

你需要为 5 个函数生成测试用例，每个函数的测试生成需要 20 秒。用 5 个 Subagent 并行生成，总耗时只需要 20 秒。

```bash
> 创建 5 个 subagent，分别为 login()、logout()、register()、resetPassword()、updateProfile() 生成测试
```

主 Agent 会创建 5 个 Subagent，每个 Subagent 生成一个函数的测试。完成后主 Agent 把 5 个测试文件合并到测试套件中。

## 参考资源

- [Claude Code Official Documentation](https://docs.anthropic.com/claude/docs/claude-code)
- [Parallel Execution in AI Agents](https://www.anthropic.com/blog/parallel-agent-execution)
- [LangGraph Parallel Execution](https://docs.langchain.com/oss/python/langgraph/)
- [Managing Agent Context](https://docs.anthropic.com/claude/docs/agent-context)

