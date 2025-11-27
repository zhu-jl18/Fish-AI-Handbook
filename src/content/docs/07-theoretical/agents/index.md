---
title: Agent 能力从何而来？
description: 从训练数据、轨迹学习到推理时算法，系统梳理大型模型如何获得 Agent 能力，并结合 Claude 系列官方文档与业界实践分析其在 Agent 场景中的优势
contributors: [codex]
---

## 学习笔记：现代 LLM 的 Agent 能力从何而来（2025-11）

> 心智模型：
> **没有什么 “Agent 魔法模型”**，只有：
>
> * 一个足够强的 **预训练语言模型**
> * 在 **工具调用 / 轨迹数据** 上做过 **SFT + 偏好 / RL 优化**
> * 外面再套一层 **靠谱的 runtime（工具、记忆、安全、监控）**
>   Agent 的好坏 = **模型上限 × 训练对不对路 × runtime 工程质量**

---

### 0. 先分清楚我们在说什么：什么叫 “Agent 能力”？

从工程角度，可以把能力分成三层，方便脑子里有个坐标系：

1. **纯对话模型（Chat-only LLM）**

   * 只做「看到上下文 → 续写 token」。
   * 不直接碰文件系统 / 网络 / 浏览器。
   * 能力是「解释、分析、写文档」，本质是**静态文字函数**。

2. **带工具调用的助手（Tool-augmented Assistant）**

   * 支持 function calling / tool use / code execution 等。
   * 能按 schema 吐 JSON，让外部程序去执行。
   * 典型流程：

     > 用户提问 → 模型提出用某个工具 → runtime 真执行 → 模型看结果再回答。

3. **Agent（Autonomous / Semi-autonomous Agent）**

   * 有显式 / 隐式的 **目标分解、计划、迭代与记忆机制**。
   * 能在几十到上百步的「思考 → 工具调用 → 观测 → 反思」循环里稳定工作。
   * runtime 允许一定程度的**自主决策**，用户不需要每一步确认。

**所谓 “Agent 能力” = 2 + 3 的综合表现：**

* **技能类**：

  * 工具调用是否稳（schema 不乱写、参数不乱造）。
  * 代码 / shell / SQL / HTTP 请求写得对不对。
* **行为类**：

  * 会不会规划、拆分任务、复盘错误。
  * 会不会在边界情况停下来问人，而不是瞎搞。
  * 是否遵守安全 / 合规规范。

---

### 1. Agent 能力从哪来？——四层训练视角

几乎所有主流厂商（OpenAI、Anthropic、Google、DeepSeek、智谱、MiniMax 等）现在做 Agent 型模型的路线，都可以抽象为 **四层堆叠**：

#### 1.1 预训练：把 “世界”和“工具说明书”喂进模型

* 训练目标：标准的自监督 LM（预测下一个 token）。
* 训练数据不只是网页文本，会刻意加：

  * 代码仓库（GitHub 等）。
  * API / SDK 文档。
  * shell 历史、终端日志。
  * 含工具调用的交互剧本、问答 / issue 线程。
* 结果：即使还没见过 function calling 格式，模型已经**对指令、命令、接口调用有统计规律的模糊概念**。

这一步决定的是 **“智力上限”**，包括语言理解、常识、编程能力等。

#### 1.2 监督微调（SFT）在工具 / 轨迹数据上

这里才真正开始教它 “怎么当个 Agent”。

* 数据形态：多是 ReAct 风格的轨迹：

  ```txt
  Thought: 我应该先查一下 XXX 当前价格。
  Action: web_search({"query": "XXX price"})
  Observation: ...
  Thought: 先检查时间和币种，然后……
  ```

  ReAct 框架本身来自 2023 年的工作：模型交替生成思考（thought）与行动（action），在环境里拿 observation 再继续推理。([arXiv][3])

* 训练方式：很土——**直接把整条轨迹当成 token 序列做交叉熵**（Teacher Forcing）。
  但好处是：

  * 每一步的 **thought / action 都是可监督的**。
  * 出错时可以精确知道是「想错了」还是「工具用错」。

* 工具数据从哪来？

  * 少量 **人工写的高价值轨迹**：复杂排障、金融分析、重构大型项目等。
  * 大量 **模型自博弈 / 自训练**：这就是 Toolformer / DeepSeek-R1 / GLM-4.x/4.5V 等做的事情——让模型自己生成工具调用、自己跑测试、把成功轨迹回灌。([arXiv][8])
  * 精选 **线上日志**：真实用户和系统的交互，做脱敏、过滤和再标注后回灌。

**直观理解：**这一步是在教模型把 “我要做 X” 翻译成一串 **结构化操作**，而不仅仅是自然语言说明书。

#### 1.3 偏好优化 / 强化学习（RL / Preference Optimization）

SFT 之后，模型会干活，但**风格不稳定、习惯不好**（比如不检查就删库）。
所以要用偏好 / RL 把行为“收紧”。

* 做法：

  * 定义 **Reward / Preference**：

    * 任务成功（单测通过、环境达成目标、Agent benchmark 通过）。([Hugging Face][9])
    * 轨迹中是否遵守安全 / 规范（不执行危险命令、不泄露隐私等）。([Future of Life Institute][10])
  * 用各种替代 PPO 的新算法：

    * **DPO / SimPO**：把 “偏好” 直接变成监督学习目标，训练简单很多。([arXiv][11])
    * **GRPO**：在 RL 框架下做 group relative 更新，减轻 value 网络负担。([arXiv][12])
    * **CISPO（MiniMax 系列）**：在 importance sampling 上做剪枝，进一步提高 RL 效率（出现在 MiniMax-M1 相关工作中）。([arXiv][13])
* DeepSeek-R1 是目前最典型的 “**推理能力靠 RL 拉满**” 的例子：

  * 先用 RL 直接训出 R1-Zero，推理很强但语言很糙。
  * 再加冷启 CoT 数据 + 多阶段 SFT + RL，把可读性、稳定性补回来。([arXiv][4])

**你可以把这一步看成：在长轨迹上用奖励反复强调 “好习惯”** ——
先规划再动手、先查证再下判定、遇到危险 / 不确定就停手。

#### 1.4 推理阶段的 “外挂智力”：Test-time compute & Runtime

模型参数里已经有潜力，但要让它**看起来像个靠谱工程师**，还需要：

* **多路径推理 + 选择（Self-consistency / search + verifier）**
  Snell 等工作系统研究了：在一定总算力固定的前提下，多算几条路径、用 verifier 或投票来选，比单次输出强很多，有时甚至比 14× 大的模型还强。([arXiv][7])
* **Hybrid reasoning / Extended thinking**

  * 商业模型（Claude 3.7、Claude 4.x、部分 GPT / Gemini / DeepSeek 等）已经把 “多步推理 + 可控算力”产品化——你可以通过参数（如 Effort / extended thinking）控制思考深度，而不是每次都放大模型。([mymeet.ai][6])
* **Runtime 级别的调度：**

  * 谁负责重试 / 回滚？
  * 谁负责在多工具之间做路由？
  * 谁记录长期记忆 / 会话状态？

**Agent 的真实表现 = 模型参数 × 推理时策略 × runtime 质量**，不是只看参数量 / benchmark 分数。

---

### 2. 轨迹学习：从 ReAct 到大规模 Agent 数据

#### 2.1 ReAct：最小可用 Agent 单元

ReAct 的核心只有一句话：

> 让模型在每一步都先 “想”（Thought），再 “做”（Action），再根据 Observation 继续 “想”。([arXiv][3])

训练时好处：

* 每一步都可监督；
* 出错点可定位；
* 架构上自然可以扩展到 **多工具 / 子 Agent / 分层规划**。

更重要的是：**ReAct 的格式就是 token 序列**，直接喂给 LLM 即可，训练链路简单粗暴。

#### 2.2 Toolformer：模型自己教自己用工具

Toolformer 的点子也很简单：([arXiv][8])

* 拿一个已经不错的基座模型；
* 让它在大语料上尝试插入工具调用；
* 只保留那些“调用前后困惑度下降”的样本；
* 把这些自标注的调用数据再喂回去 SFT。

效果：几乎不要人手，就能得到 **海量、覆盖广的工具调用监督信号**，补上人工轨迹成本太高的问题。

#### 2.3 轨迹数据的三大来源（2025 版）

综合现在的公开实践（DeepSeek、GLM 系列、MiniMax 等）：([arXiv][4])

1. **高价值人工脚本 / 轨迹**

   * 用在生产环境排障、金融风控、代码大重构这类错误代价高的任务上。
   * 更像 “示范样本 / 模板”。

2. **自博弈 / 沙盒 RL**

   * DeepSeek-R1：在数学和推理任务上大规模 RL。([arXiv][4])
   * GLM-4.5V：在多模态推理 / GUI Agent 上做可扩展 RL。([arXiv][14])
   * MiniMax：把 test‑time compute 和 RL 结合，强调在 Agent benchmark 上的端到端表现。([Hugging Face][9])

3. **生产日志回灌**

   * 在隐私 / 合规前提下，对真实用户与 Agent 系统的交互做采样，过滤掉低质量和高风险样本后回灌。
   * 各家都在做，Anthropic / OpenAI 等都公开承认消费者产品会用聊天记录优化模型，但企业 API 默认不上训练。([Business Insider][15])

**关键点**：
轨迹数据不是简单的 “多轮对话”，而是**带目标和环境反馈的决策序列**。
模型就是在这些决策序列上学会：什么时候该叫工具，什么时候该老老实实回答。

---

### 3. 推理时算法：同一个模型，聪明和蠢差别有多大？

#### 3.1 Test-time compute：多动脑，不一定要变大脑

Snell 等人的结论非常朴素：([arXiv][7])

* 在算力预算固定的前提下，“少量参数 + 多推理时间”有时比 “大模型 + 单次输出”效果好。
* 多路径推理主要有两种模式：

  1. **采样多条思维链 / 轨迹 + verifier / 投票选择**；
  2. **在测试时更新模型的输出分布（例如 search + reranking）**。

这与商业模型的一个趋势对应起来：

* DeepSeek-R1 把大量推理工作交给 RL + test-time search。([arXiv][4])
* Claude 3.7 / 4.x、部分 GPT / Gemini 模型提供 **扩展思考 / Effort 参数**，把 “让它多想一会儿” 变成一个可调开关。([mymeet.ai][6])

工程上，你要记住的结论只有一句：

> 遇到难任务，优先考虑 “**让同一个模型多算一会儿 + 验证**”，而不是一味堆更大的模型。

#### 3.2 搜索、反思与校验

典型实用套路：

* **Self-consistency**：
  给同一问题采样 N 条推理链，再投票 / 用 verifier 选一条。
* **Tree / graph search**：
  在工具调用 /动作空间上展开搜索树，对明显失败的分支做剪枝。
* **Reflection / self-critique**：
  让模型先写答案 A，再换个角色当审稿人，指出问题，然后再改写成答案 B。

这些在公开论文和框架里都不是新鲜事，但在 **DeepSeek-R1、GLM-4.5V、MiniMax-M2 等推理 / Agent 型模型的训练与使用流程里都被大量用到**，已经变成行业常规武器。([arXiv][4])

---

### 4. 安全与对齐：Agent 真能 “动手” 之后的问题

当 Agent 能执行 shell / 修改代码 / 访问企业 API 时，**安全问题从 “说错话” 升级为 “动错手”**。

#### 4.1 Model spec / Constitution：行为规范书

* OpenAI、Anthropic、Google 等都开始公开自己的 **Model Spec / Constitution**：
  本质上是一份给模型看的 **行为规范文档**（哪些必须拒绝、哪些需要谨慎、如何处理冲突价值）。([The Verge][16])
* 这些规范不只是挂在网站上，而是：

  * 用作 **训练数据的一部分**（Constitutional AI：模型自我批改回复，再督导学习）。
  * 用作 **评测基准**：比如 Anthropic 的工作会 stress‑test 不同模型的 spec，检查在哪些价值权衡上出现行为差异。([Alignment Science Blog][17])

#### 4.2 Runtime 级安全：别把所有安全寄托在模型上

工程上靠谱的做法：

* **最小权限 + 白名单工具**

  * 只开放有限目录 / 数据库 / 域名。
  * 用工具级权限系统控制 “这个 Agent 能用哪些工具、在什么模式下用”（Claude Agent SDK 里是标准功能）。([Claude Console][18])
* **沙盒执行**

  * 代码 / shell 在隔离环境里运行，失败可以丢弃，成功才 merge。
  * GUI / browser Agent 用虚拟会话，不直接操作生产账户。([arXiv][14])
* **轨迹审计与回滚**

  * 所有工具调用、文件 diff、API 请求都记录下来。
  * 需要时可以一键回滚到上一个稳定状态。

简单地说：

> 模型负责 “*想*” 和 “*提议*”，
> runtime 负责 “*执行*” 和 “*兜底*”。

---

### 5. Claude 系列的 Agent 能力（2025-11 状态）

下面只讲和 Agent 直接相关的部分，不讲营销。

#### 5.1 模型代际与 “Hybrid reasoning”

截至 2025-11，和 Agent 最相关的 Claude 型号大致是：

* **Claude 3.7 Sonnet**：

  * 引入 “Hybrid reasoning / Extended thinking” 概念，允许在一个模型里切换快速回复和深度推理模式。([mymeet.ai][6])
* **Claude 4 系列（Opus 4 / Sonnet 4）与 4.5 增强版**：

  * 官方系统卡和发布文档里明确强调：

    * **长链路编码、Agent 工作流、Computer Use** 是主打场景。([Anthropic][1])
    * 做了专门的 **Agentic safety 评测**（比如在长时间自动化编码/计算机操作上的安全行为）。([Anthropic][1])

**重点**：
Claude 新一代模型不是简单 “参数变大”，而是明显朝 **“内建 test‑time compute 控制 + Agent 任务强化”** 的方向在走。

#### 5.2 Tool use：严格 schema、丰富官方工具

官方 Tool use 文档的几个关键点：([Claude Docs][5])

* 支持 **严格 schema 校验（strict: true + Structured Outputs）**，生产环境里可以基本消除参数缺失 / 类型错误这类低级问题。
* 区分：

  * **Client tools**：在你自己系统执行（自定义工具 + official 的 bash / code execution / text editor / memory 工具等）。([Claude Docs][5])
  * **Server tools**：在 Anthropic 服务器执行（web search / web fetch 等），你只描述需求，Claude 直接调用。
* 官方还提供了不少 “现成工具模板”和 cookbook，用来组合出简单 Agent（calculator、客服、JSON 抽取等）。

这也是为什么很多人感觉 **Claude 工具调用成功率高**——因为 schema 校验和 tool use 系统提示都做得比较激进。

#### 5.3 Model Context Protocol（MCP）与生态

MCP 是 Anthropic 牵头的一个开放协议，做一件事：

> 统一 AI 应用和“外部世界”之间的数据 / 工具接口。([Anthropic][19])

特点：

* 用统一规格描述 **server / resources / tools**；
* 适合 IDE、终端、浏览器、内部系统等不同宿主共享一套工具；
* 社区已经有 MCP 服务器仓库、客户端列表、教程等。

在 Claude 生态里：

* Claude 本身只需要 “看见 MCP 工具列表 + 描述”，就能通过 MCP 路由访问文件系统、Git 仓库、数据库、HTTP API 等；([Anthropic][19])
* 对开发者来说，多数时候只维护 MCP server，一套工具可以给多个宿主（Claude Web、Claude Code、内部系统）复用。

#### 5.4 Claude Agent SDK：把 Claude 当 “Agent 内核” 用

从 2025 年 9 月开始，Claude Code SDK 正式升级成 **Claude Agent SDK**，核心定位很明确：([Claude Console][2])

> SDK = Claude Code 内部 Agent harness + 标准化接口
> → 你可以拿来直接搭自己的生产 Agent

核心功能：

* **上下文管理**：自动压缩 / 滚动上下文，防止 Agent 把窗口打爆。
* **工具系统**：

  * 内置文件 / 代码执行 / Web 搜索 / MCP 扩展等工具。([Claude Docs][5])
  * 明确的 **权限模型**（allowedTools / disallowedTools / permissionMode）。
* **Session & 错误管理**：

  * 自动处理对话 / 任务会话、错误重试、超时等。
* **监控与成本管理**：

  * 内建 usage / cost 统计，方便在生产里控成本。

#### 5.5 Agent Skills 与 Subagents：知识与角色的分解

* **Agent Skills**：

  * 可以理解成「Claude 的外置专业说明书」，存放在 `.claude/skills` 中，由 `SKILL.md` 描述。
  * Claude 只在需要时按 Skill 的描述按需加载，类似 “渐进披露” 的知识系统，适合存大部头的规范 / 培训资料。([Claude][20])
* **Subagents**：

  * 由主 Agent 协调的一组 **专用子 Agent**，各自有独立的 system prompt、工具和上下文。([Claude Console][21])
  * 用来做：

    * 任务分工（一个写代码，一个写文档，一个跑测试）。
    * 上下文隔离（避免一个任务的噪声污染另一个任务）。

**组合起来，你得到的是：**

* Claude 模型 → 推理和语言核心；
* MCP & Tool use → 连到一堆外部系统；
* Agent SDK → 负责权限、记忆、错误处理；
* Skills / Subagents → 拆知识和角色；

这是目前业界最工程化、落地率最高的一套 Agent 架构之一。

---

### 6. 其他厂商的 Agent 型模型：对照一下思路

简单对比几个典型：

1. **DeepSeek-R1（推理 + RL 的极端玩法）**

   * 核心卖点：**大规模 RL 直接优化推理能力**，甚至在没有 SFT 的前提下让推理行为自然涌现，然后再用 SFT+RL+蒸馏把可读性和稳定性补回来。([arXiv][4])
   * 明确区分 “推理能力” 和 “语言质量”，用流水线方式分别优化。

2. **GLM-4 / 4.5 / 4.5V（多模态 + GUI Agent）**

   * GLM-4 加强 Agent 能力是公开宣传点之一；4.5V 工作展示了在多模态 / GUI 环境下通过可扩展 RL 强化 Agent 行为。([GitHub][22])

3. **MiniMax-M2 / M1（Agent-first + MoE + CISPO）**

   * MiniMax-M2 明确定位为 “为 coding & agent workflows 优化的 230B MoE 模型（仅 10B 激活）”，强项包括 Terminal-Bench、BrowseComp 之类真实 Agent benchmark。([Hugging Face][9])
   * MiniMax-M1 相关工作提出 CISPO 等新 RL 算法，重点在**提高 RL 效率、适配 test‑time compute scaling**。([arXiv][13])

可以看到，**所有人都在同一条路上做不同 trade‑off：**

* 有的强化 RL（DeepSeek、GLM）
* 有的强化 MoE / test‑time compute（MiniMax）
* 有的强化工具 / runtime / 安全生态（Anthropic）

---

### 7. 如果你要自己搞一个 Agent 型系统 / 模型：实战 Checklist

不拐弯，给一个能直接用的路线。

#### 7.1 只做工程编排（不训模型）

1. **选模型**

   * 需要：长上下文 + 强代码 / 工具能力 + 支持严格 tool use 的 API。
   * 当前商用：Claude 4.x / 4.5、部分 GPT / Gemini / DeepSeek / MiniMax-M2 等都可以，根据预算选。

2. **设计工具层**

   * 明确 “Agent 真正可以做什么”：

     * 文件 / Git 操作、HTTP 调用、数据库、搜索、CI/CD、内部服务……
   * 统一封装成：

     * 明确描述（description）+ JSON schema；
     * 最好用 MCP 或类似协议做一层抽象，便于跨宿主复用。([Anthropic][19])

3. **设计权限与沙盒**

   * 把 “危险工具” 分成单独的 tool，强制二次确认；
   * 文件 / DB 全部走白名单路径；
   * 代码执行、浏览器操作放到隔离环境。

4. **Agent 逻辑 / 流程**

   * 不要幻想一个 prompt 搞定一切，至少拆出：

     * 主 Agent（负责规划 / 路由 / 总结）。
     * 若干 Subagents（代码、数据分析、客服等）。([Claude Console][21])
   * 使用类似 Claude Agent SDK 这种已有框架会省很多体力（上下文管理、session、重试都帮你包了）。([Claude Console][2])

5. **监控与评测**

   * 定义可自动检测的指标：

     * 任务成功率（每种任务维护一套测试集 / 基准）。
     * 工具失败率 / 重试次数。
     * 危险操作拒绝率。
   * 真正上线前在 sandbox 跑一轮 Agent benchmark（如 SWE-bench / Terminal-Bench / BrowseComp 等同类评测，或你自建的一套）。([Hugging Face][9])

#### 7.2 想在模型层面做二次训练（“自家 Agent 模型”）

在前面四层结构基础上，你能做的增量是：

1. **构造你自己领域的高质量轨迹**

   * 用小团队手写一批关键任务（比如你公司最重要的几十个内部流程），写成 ReAct 轨迹。
   * 把线上最成功的一批真实调用清洗出来，加入训练集。

2. **做一次工具 / 轨迹 SFT**

   * 把这些轨迹混入通用工具数据（可以按 task/领域做合适的 sampling ratio）。
   * 监控：

     * 工具调用 schema 合规率；
     * 对你业务关键任务的成功率。

3. **小规模偏好 / RL 以任务完成度为核心奖励**

   * 不建议从空白 PPO 开始，直接用 DPO / SimPO / GRPO 这些相对容易调的法子。([arXiv][11])
   * 奖励设计尽量简单粗暴：

     * 成功任务 +1；
     * 重度违规 / 危险行为 −1；
     * 其它细节用规则 / 静态分析补。

4. **务必把 runtime 和训练解耦**

   * “模型负责学会好习惯”，
   * “runtime 负责兜安全底线”，
   * 不要指望通过训练完全消除风险。

---

### 8. 总结

* **没有单独的 Agent 架构**，只有：

  * 更强的基础模型（代码 / 推理 / 长上下文）；
  * 更多、更好的 **工具 / 轨迹数据**；
  * 合理的 **偏好 / RL 优化**；
  * 再加一层靠谱的 **runtime（工具、权限、记忆、安全）**。
* 2025 年的变化主要在：

  * **测试时算力 / Hybrid reasoning 被产品化**（Extended thinking、Effort 等）。([arXiv][7])
  * 出现了一批 **为 Agent 场景特化的模型**：DeepSeek-R1、GLM-4.5V、MiniMax-M2 等，用 RL + test‑time compute 把推理和 Agent benchmark 针对性拉上去。([arXiv][4])
  * Claude 这一侧则在 **Tool use/MCP、安全规范、Agent SDK/Skills/Subagents** 上往前走了一大步，把 “可想” 变成了更容易 “可做”。([Claude Docs][5])

**实话实说**：
如果你关心的是工程落地，这篇笔记该记住的只有一句：

> 强 Agent = 好模型 + 好数据 + 好算法 + 好 runtime
> 四条腿都要粗，少一条都会翻车。

---

## 参考资料（部分）

> 下面只列关键阅读材料，都是英文 / 官方或一线论文。

1. Yao et al., **ReAct: Synergizing Reasoning and Acting in Language Models**, 2023. ([arXiv][3])
2. Schick et al., **Toolformer: Language Models Can Teach Themselves to Use Tools**, 2023. ([arXiv][8])
3. Snell et al., **Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters**, 2024. ([arXiv][7])
4. DeepSeek-AI, **DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning**, 2025. ([arXiv][4])
5. GLM-V Team, **GLM-4.5V and GLM-4.1V-Thinking: Towards Versatile Multimodal Reasoning with Scalable Reinforcement Learning**, 2025. ([arXiv][14])
6. MiniMaxAI, **MiniMax-M2: A Model Built for AI Coding & Agentic Workflows**, site + model card, 2025. ([Hugging Face][9])
7. Anthropic Docs, **Tool use with Claude** & **Agent SDK overview** & **Agent Skills / Subagents**, 2024–2025. ([Claude Docs][5])
8. Anthropic, **Introducing the Model Context Protocol (MCP)** + MCP specification. ([Anthropic][19])
9. Anthropic, **Claude 4 System Card** & announcement, 2025. ([Anthropic][1])
10. Policy / 对齐相关：OpenAI Model Spec、Anthropic Constitutional AI、Stress-testing Model Specs。([The Verge][16])

你可以直接把这份笔记存起来，当 2025 年版的 Agent 心智底座；以后看到新模型 / 新框架，就往这四层（模型 / 数据 / 算法 / runtime）里对号入座就行了。

[1]: https://www-cdn.anthropic.com/4263b940cabb546aa0e3283f35b686f4f3b2ff47.pdf?utm_source=chatgpt.com "Claude 4 System Card"
[2]: https://platform.claude.com/docs/en/agent-sdk/overview?utm_source=chatgpt.com "Agent SDK overview - Claude Docs"
[3]: https://arxiv.org/abs/2210.03629?utm_source=chatgpt.com "ReAct: Synergizing Reasoning and Acting in Language Models"
[4]: https://arxiv.org/abs/2501.12948 "[2501.12948] DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"
[5]: https://docs.anthropic.com/en/docs/tool-use?utm_source=chatgpt.com "Tool use with Claude - Claude Docs"
[6]: https://mymeet.ai/blog/claude-3-7-sonnet?utm_source=chatgpt.com "Claude 3.7 Sonnet: The Ultimate Guide to Anthropic's Most ..."
[7]: https://arxiv.org/abs/2408.03314 "[2408.03314] Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters"
[8]: https://arxiv.org/abs/2302.04761?utm_source=chatgpt.com "Toolformer: Language Models Can Teach Themselves to Use ..."
[9]: https://huggingface.co/MiniMaxAI/MiniMax-M2 "MiniMaxAI/MiniMax-M2 · Hugging Face"
[10]: https://futureoflife.org/wp-content/uploads/2025/07/Indicator-Behavior_Specification_Transparency.pdf?utm_source=chatgpt.com "Anthropic Constitutional AI"
[11]: https://arxiv.org/pdf/2405.14734?utm_source=chatgpt.com "SimPO: Simple Preference Optimization with a Reference ..."
[12]: https://arxiv.org/abs/2503.21819?utm_source=chatgpt.com "Optimizing Safe and Aligned Language Generation: A Multi ..."
[13]: https://arxiv.org/abs/2506.13585?utm_source=chatgpt.com "MiniMax-M1: Scaling Test-Time Compute Efficiently with ..."
[14]: https://arxiv.org/abs/2507.01006 "[2507.01006] GLM-4.5V and GLM-4.1V-Thinking: Towards Versatile Multimodal Reasoning with Scalable Reinforcement Learning"
[15]: https://www.businessinsider.com/anthropic-uses-chats-train-claude-opt-out-data-privacy-2025-8?utm_source=chatgpt.com "Anthropic will start training its AI on your chats unless you opt out. Here's how."
[16]: https://www.theverge.com/openai/611375/openai-chatgpt-model-spec-controversial-topics?utm_source=chatgpt.com "OpenAI is rethinking how AI models handle controversial topics"
[17]: https://alignment.anthropic.com/2025/stress-testing-model-specs/?utm_source=chatgpt.com "Stress-testing model specs reveals character differences ..."
[18]: https://platform.claude.com/docs/ja/agent-sdk/overview?utm_source=chatgpt.com "Agent SDK 概要 - Claude Docs"
[19]: https://www.anthropic.com/news/model-context-protocol?utm_source=chatgpt.com "Introducing the Model Context Protocol \ Anthropic"
[20]: https://claude.com/blog/skills?utm_source=chatgpt.com "Introducing Agent Skills | Claude"
[21]: https://platform.claude.com/docs/en/agent-sdk/subagents?utm_source=chatgpt.com "Subagents in the SDK - Claude Docs"
[22]: https://github.com/zai-org/GLM-4 "GitHub - zai-org/GLM-4: GLM-4 series: Open Multilingual Multimodal Chat LMs | 开源多语言多模态对话模型"
