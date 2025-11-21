---
title: 模型参数
description: Which params affects the outputs of the model.
contributors:
    - claude
    - codex
---

看这段 code：

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    reasoning={"effort": "medium"},
    input=[{"role": "user", "content": "Hello, how are you?"}],
    temperature=0.1,
    top_p=0.9,
    frequency_penalty=1.0,
    presence_penalty=0.9,
    max_output_tokens=2048,
    stream=False,
)
```

这些 params 是干嘛的？

## Token

Token 是 LLM 的基本处理单位，不是字符也不是单词。在输入进模型前，所有文本都会被 **tokenizer**（分词器）切分成 token 序列。常见的 tokenizer 有 BPE（Byte Pair Encoding）、WordPiece、SentencePiece 等，它们基于统计频率将文本拆分成子词单元。

**为什么会出现反直觉的结果？**

经典脑残测试："9.8 和 9.11 谁更大？" 模型经常回答 9.11 更大。不是模型傻，而是因为 tokenizer 的切分逻辑：

| 输入   | Tokenizer 输出 | 模型看到的     |
| ------ | -------------- | -------------- |
| "9.8"  | `[9, ., 8]`    | 三个独立 token |
| "9.11" | `[9, ., 11]`   | 三个独立 token |

模型在 transformer 的 self-attention 机制下处理这些 token 时，虽然能学到位置关系，但**数值大小的比较依赖训练数据中的模式**。如果训练时见过 "11 > 8" 的文本多，但见过 "9.11 < 9.8" 这种小数比较的样本少，模型就会基于局部 token（11 vs 8）做出错误判断。

这不是模型"傻"，而是 tokenization 丢失了"小数"的语义完整性。Token `11` 在词表里是个独立单元，模型无法天然理解它在这里是小数点后的两位数，而不是整数 11。

**实际影响**：

| 场景       | Tokenization 示例                                  | 潜在问题                     |
| ---------- | -------------------------------------------------- | ---------------------------- |
| 代码变量名 | `getUserId` → `[get, User, Id]`                    | 可能把驼峰拆散，影响代码理解 |
| 长数字     | `123456789` → `[123, 456, 789]` 或 `[12345, 6789]` | 数值计算能力下降             |
| 罕见词     | `pneumonoultramicroscopicsilicovolcanoconiosis`    | 拆成一堆碎片，失去单词整体性 |
| 中文       | "人工智能" → `[人工, 智能]` 或 `[人, 工, 智, 能]`  | 取决于 tokenizer 训练语料    |

粗略估算：1 token ≈ 0.75 英文单词 ≈ 1.5-2 个中文字。具体数字看 tokenizer 实现（GPT 用 tiktoken，Claude 用定制版 SentencePiece）。

## Input/Output && Context

**模型没有记忆**。每次调用都要把整个历史塞进去。你以为它"记住"了上文？bullshit，只是你的 client 帮你拼了个超长的 messages array 而已。

```python
# 第一次
messages = [{"role": "user", "content": "我叫张三"}]

# 第二次，你要自己带上历史
messages = [
    {"role": "user", "content": "我叫张三"},
    {"role": "assistant", "content": "你好，张三"},
    {"role": "user", "content": "我叫什么？"}  # 如果不带历史，模型根本不知道你是谁
]
```

有个东西叫 **prompt caching**：如果你的 prefix messages 没变，某些 provider（Anthropic/OpenAI）会 cache 住，不重复计算，省钱省时间。但别指望所有家都支持。

Prompt caching 有硬性门槛：只有当前缀累计 ≥1024 tokens 时才会写入缓存，命中窗口通常 5-10 分钟。所以要想省钱，得把长指令、系统提示搬到消息数组的最前面，别把变量内容塞在前缀里。

## Temperature

Temperature 是 softmax 函数中的缩放参数，控制模型输出的随机性。公式如下：

$$P(x_i) = \frac{e^{z_i/T}}{\sum_j e^{z_j/T}}$$

其中 $T$ 是 temperature，$z_i$ 是第 $i$ 个候选 token 的 logit（模型输出的原始分数）。$T$ 越小，概率分布越陡峭（接近确定性）；$T$ 越大，概率分布越平缓（更随机）。注意无论 $T$ 如何变化，logit 最大的 token 概率永远最大，softmax 是单调函数。

假设模型预测下一个词时，4 个候选 token 的 logits 为：the=4.0、a=2.0、an=1.0、that=0.5。不同 temperature 下的概率分布对比：

| Temperature | P("the") | P("a") | P("an") | P("that") | 效果                       |
| ----------- | -------- | ------ | ------- | --------- | -------------------------- |
| 0.5         | 97.9%    | 1.8%   | 0.2%    | 0.1%      | 接近确定性，98% 输出 "the" |
| 1.0         | 82.3%    | 11.1%  | 4.1%    | 2.5%      | 原始分布，"the" 占主导     |
| 2.0         | 56.7%    | 20.9%  | 12.7%   | 9.8%      | 分布平缓，其他选项经常出现 |

**为什么 temperature 影响随机性？**关键在于采样方式。$T \approx 0$ 时使用 greedy sampling（直接选概率最大的），每次都输出同一个词。$T > 0$ 时使用 random sampling（按概率随机抽取），概率分布相当于"转盘面积"：$T=0.5$ 时 "the" 占 98% 面积，转 100 次约 98 次中它；$T=2.0$ 时 "the" 只占 57% 面积，其他词（21%、13%、10%）经常被抽中。

举个例子，问模型 "The weather is ___"，运行 10 次：

```
T=0.5 → nice, nice, nice, nice, good, nice, nice, nice, nice, nice
T=2.0 → nice, good, terrible, nice, pleasant, awful, nice, wonderful, bad, nice
```

虽然 "nice" 概率最高，但 $T=2.0$ 时其他词概率也不低，随机采样让输出更多样。

实际使用建议（范围通常 0-2，部分模型 0-1）：

| Temperature | 适用场景                              |
| ----------- | ------------------------------------- |
| 0           | 写代码/翻译/总结 → 要确定性，别瞎创造 |
| 0.7-1.2     | 写诗/brainstorming → 需要点创造力     |
| 1           | 通用对话 → 平衡确定性与多样性         |
| 2           | 基本别用 → 输出质量崩坏               |

## Top-P & Top-K

这两个是采样策略，在 temperature 调整概率分布后，进一步裁剪候选集。**Top-K** 只保留概率最高的 K 个 token；**Top-P**（nucleus sampling）按概率从高到低累加，达到 P 就截断后面的 token。

假设 temperature 处理后得到 5 个候选词及其概率：brilliant=40%、good=30%、nice=20%、okay=7%、bad=3%。

| 策略   | 参数  | 保留候选                    | 采样池                                                |
| ------ | ----- | --------------------------- | ----------------------------------------------------- |
| Top-K  | K=3   | brilliant, good, nice       | 只从这 3 个里抽（重新归一化后概率变为 44%, 33%, 22%） |
| Top-P  | P=0.9 | brilliant, good, nice, okay | 累积概率 40%+30%+20%+7%=97% > 90%，停止               |
| 无限制 | -     | 全部 5 个                   | bad (3%) 也有机会被抽中                               |

**Top-K 的问题**：固定数量太死板。如果最高概率是 95%，剩下 4 个加起来才 5%，硬要保留 K=5 个没意义；反之如果前 10 个概率都差不多，K=3 会错过好选项。

**Top-P 更聪明**：动态调整。概率集中时（95%+3%+1%+...）只保留 1-2 个；概率分散时（20%+18%+15%+...）保留更多。OpenAI 的 Chat/Responses API（参考 Azure OpenAI 2024-10-21 规范）只开放 top_p，不开放 top_k；Anthropic 的 Claude Sonnet 4.5 等模型依然提供 `top_k`，但被标记为“高阶用法”，不熟悉勿乱调。

举例说明差异。问模型 "Python is a ___ language"，候选概率分布为：programming=85%、scripting=8%、popular=4%、dynamic=2%、interpreted=1%。

```
Top-K=2  → 只能从 programming/scripting 里选 → 输出单调
Top-P=0.9 → programming 85% 未达标，加 scripting 93% > 90% → 保留这 2 个
Top-P=0.99 → 需要累加到 programming+scripting+popular+dynamic=99% → 保留 4 个
```

再看一个概率分散的场景。"The movie was ___"，候选为：great=25%、good=22%、amazing=20%、terrible=18%、okay=15%。

```
Top-K=2  → 只保留 great/good，丢掉 amazing/terrible → 限制太死
Top-P=0.9 → 25%+22%+20%+18%=85% 未达标，加 okay=100% → 保留全部 5 个
```

实际使用建议：

| 参数  | 推荐值               | 原因                                                         |
| ----- | -------------------- | ------------------------------------------------------------ |
| Top-P | 1.0（默认）          | 让 temperature 全权控制，符合 OpenAI“只调其一”的官方建议     |
| Top-K | Provider 决定        | OpenAI 不支持，Anthropic/部分开源推理模型支持，调之前先查文档 |
| 组合  | top_p=0.9 + temp=0.7 | 只有在模型/业务需要额外发散度时再联调，否则保持默认即可     |

99% 情况下用默认值就行，别瞎折腾。

## Frequency Penalty & Presence Penalty

这两个参数用于抑制重复输出，通过降低已出现 token 的概率来实现。**Frequency Penalty** 根据 token 的出现次数累计惩罚，出现越多降得越狠；**Presence Penalty** 只要 token 出现过就惩罚，不管出现几次。范围通常为 -2.0 到 2.0（OpenAI），默认为 0（不惩罚）。

工作机制对比（假设原始概率为 $P_0$，token 已出现 $n$ 次）：

| 参数      | 惩罚公式                | 出现 1 次 | 出现 3 次 | 出现 10 次 | 特点                     |
| --------- | ----------------------- | --------- | --------- | ---------- | ------------------------ |
| Frequency | $P_0 - \alpha \times n$ | 降一点    | 降得多    | 降得非常多 | 累计惩罚，打击"高频词汇" |
| Presence  | $P_0 - \alpha$          | 降一点    | 降一点    | 降一点     | 固定惩罚，只管"出现过"   |

假设模型在写文章，候选词 "AI" 原始概率 30%，已在文中出现 5 次。penalty=1.0 时：

```
无惩罚         → P("AI") = 30% → 继续可能选 "AI"
Frequency=1.0  → P("AI") ≈ 30% - 5×惩罚系数 → 大幅下降，倾向选其他词（如 "technology"）
Presence=1.0   → P("AI") ≈ 30% - 1×惩罚系数 → 小幅下降，仍可能选 "AI"
```

**典型场景对比**：

生成文本 "AI is powerful. AI is everywhere. AI will..."

| Penalty       | 输出效果                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------- |
| 无            | AI is powerful. AI is everywhere. AI will transform... AI enables... ← 无脑重复              |
| Frequency=1.0 | AI is powerful. This technology is everywhere. Machine learning will transform... ← 主动换词 |
| Presence=1.0  | AI is powerful. AI is everywhere. Technology will transform... ← 轻微克制，但还会重复        |

**什么时候需要调？**

| 场景            | 推荐值            | 原因                                 |
| --------------- | ----------------- | ------------------------------------ |
| 正常对话/写代码 | 0（默认）         | 适度重复是自然的，没必要干预         |
| 模型像复读机    | frequency=0.5-1.0 | 强制多样性，避免循环输出             |
| 写长文需要变化  | presence=0.5      | 温和提醒用过的词，不会太激进         |
| 任何场景        | < 1.5             | 太高会导致语义崩坏，为了不重复而瞎编 |

99% 情况下默认值（0）够用。只有当模型输出明显重复（"AI... AI... AI..."）时才需要 frequency=0.5-1.0。

## Thinking/CoT/Reasoning

Chain-of-Thought（CoT）是 2022 年 Google 论文（Wei et al., 2022）点燃的旧火：在 prompt 里加“逐步推理”示例，就能把模型的复杂任务拆回训练集中经常出现的小片段。换句话说，**CoT 不是让模型开窍，而是让它更容易匹配训练语料里的高概率序列**。

### CoT 本质：降维打击

| 没有 CoT                                    | 有 CoT                                                                            | 核心收益                           |
| ------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------- |
| 输入 "9.11 和 9.8 谁大？" → 直接输出 "9.11" | 输入同样问题 → "比较小数位：0.11 vs 0.8 → 9.8"                                    | 把稀有任务拆成常见模式             |
| 模型直接赌答案                              | 模型先拆解、再合成                                                                | 单步难度下降，错误率同步下降       |
| 几百 token 内必须给结论                    | 可以写出“计算-验证-总结”                    | 留出空间给自检、自我修正           |

### 2025 的推理模型怎么练

- **纯 RL 只是起点**：DeepSeek-R1-Zero 的确是“不给标注、直接 RL”——它把 DeepSeek-V3-Base 拿去跑 GRPO，AIME 2024 pass@1 从 15.6% 升到 71.0%，多数票可冲到 86.7%（DeepSeek《R1: Incentivizing Reasoning》2025.01）。  
  - 但真正商用的 **DeepSeek-R1** 不是“零样本 RL”，而是先用冷启动数据 + expert SFT，把格式、语言、可读性拉齐，再接着 RL，才拿到 79.8% pass@1、2,029 Codeforces Elo。
- **OpenAI 的思路**：o1 系列把“thinking tokens”藏在 Responses API 里，由 API 负责记账。官方数据（OpenAI《OpenAI o1-mini advancing cost-efficient reasoning》2024.09）：  
  - o1：AIME 74.4%，Codeforces 1673 Elo；  
  - o1-mini：AIME 70.0%，Codeforces 1650 Elo，价格更低。  
  reasoning.effort 决定“想多久”，`max_output_tokens` 决定止损线。
- **Claude Sonnet 4.5**：Anthropic 最新旗舰（2025.09）走“混合推理”路线，默认就可以思考更久，也允许显式开启 extended thinking。官方宣传给出 SWE-bench Verified 77.2%、OSWorld 61.4%，强调 200K context 与 64K 输出，让长链推理 + 电脑操作更稳。
- **GPT-5**：OpenAI 模型页（2025.10）把 GPT-5 定位成“旗舰 reasoning/agent 模型”，提供 400K 上下文、128K 输出上限，Responses/Realtime/Chat 端点统一支持 reasoning tokens，并鼓励配合 prompt caching 控制成本。

### 最新公开成绩速查

| 模型（发布日期）          | 训练策略概览                         | 公开成绩（AIME/Codeforces/SWE 等）                    | 来源摘要                            |
| ------------------------ | ------------------------------------ | ----------------------------------------------------- | ----------------------------------- |
| DeepSeek-R1-Zero (2025.01) | 纯 RL（无 SFT）、GRPO、自发推理链     | AIME 71.0%（pass@1）、86.7%（majority）               | DeepSeek arXiv 2501.12948           |
| DeepSeek-R1 (2025.01)      | 冷启动数据 + Expert SFT + RL         | AIME 79.8%、MATH-500 97.3%、Codeforces 2,029 Elo      | 同上                                |
| OpenAI o1 (2024.09)        | 大规模 SFT + RL + reasoning tokens   | AIME 74.4%、Codeforces 1673 Elo                       | OpenAI o1 mini 公告                 |
| OpenAI o1-mini (2024.09)   | 轻量蒸馏 + RL                        | AIME 70.0%、Codeforces 1650 Elo                       | OpenAI o1 mini 公告                 |
| Claude Sonnet 4.5 (2025.09)| 混合推理模式 + 可控 thinking         | SWE-bench Verified 77.2%、OSWorld 61.4                | Anthropic Claude Sonnet 4.5 页面    |
| GPT-5 (2024.10)            | 百万级 reasoning tokens + 400K ctx   | 官方未给具体竞赛分，但定位旗舰 reasoning/agent 模型   | OpenAI GPT-5 模型页                 |

### 启用 thinking 参数的最佳实践

1. **确定模型支持**：OpenAI 要用 Responses API + `reasoning={"effort": ...}`；Anthropic 要指定 `claude-sonnet-4-5` 并设置 `thinking` 字段；DeepSeek-R1 需要用他们的“thinking 模式”或直接读取完整输出。老模型（GPT-4o mini 之流）没有 thinking，就别填。
2. **给它空间**：reasoning tokens 也占上下文和钱。OpenAI 建议至少留 25k token buffer，再用 `max_output_tokens` 和 `max_reasoning_tokens` 双阈值兜底。
3. **配合自检**：高阶模型（o1、Sonnet 4.5、R1）都支持“self-check”或“thinking summary”。把“验证步骤”写进 system prompt，比盲目加 temperature 更能提高命中率。
4. **监控成本**：记录 `usage.output_tokens_details.reasoning_tokens`，若 reasoning 占比 >70% 但答案仍烂，说明 prompt 设计有问题，别怪模型。

总之，**thinking 参数本质是预算控制器**：它不会凭空创造智商，只是允许模型花更多 token 去搜索更靠谱的解。挑模型、写 prompt、设阈值，三者缺一不可。

## Streaming

控制 token 生成的返回方式。LLM 生成文本是**自回归过程**：每次预测一个 token，把它加到输入序列末尾，再预测下一个，循环直到遇到结束符或达到长度限制。Streaming 决定这些 token 是攒够再返回，还是生成一个发一个。

**技术实现差异**：

| 模式           | 工作机制                                        | 网络行为                        | 用户体验                 |
| -------------- | ----------------------------------------------- | ------------------------------- | ------------------------ |
| `stream=False` | 模型生成完整序列 → 一次性返回全部 tokens        | 单个 HTTP 响应，可能等 10-60 秒 | 卡住无反馈，用户以为死了 |
| `stream=True`  | 每生成 1 个 token → 立即通过 SSE/WebSocket 推送 | 持续连接，逐块传输              | 逐字显示，像打字机       |

本质上 streaming 不改变生成逻辑，只改变传输时机。模型内部都是一个个 token 顺序生成，区别在于：非 streaming 要等所有 token 都生成完才发送；streaming 生成一个就推一个。

**为什么生产环境必须开？**用户心理学。人类感知延迟的阈值是 100ms，超过 1 秒就觉得卡。生成 500 token 的回答可能要 5-10 秒，非 streaming 模式下用户盯着空白屏幕 10 秒会崩溃；streaming 模式下第一个 token 在 200ms 内出现，用户知道"在工作了"，愿意等。

**代价与陷阱**：

| 问题                     | 原因                                                        | 解决方案                                     |
| ------------------------ | ----------------------------------------------------------- | -------------------------------------------- |
| `usage` 等 metadata 缺失 | 只有生成完才能统计 token 数，streaming 时要等最后一个 chunk | 监听 `done` 事件或最后的 chunk               |
| 连接中断数据丢失         | SSE 是单向流，断了不会重传                                  | 客户端实现重连 + 记录已接收位置              |
| SDK 处理 bug             | 有些 SDK 缓冲区处理有 bug，漏 token 或截断                  | 测试时对比 streaming/非 streaming 输出一致性 |

唯一需要 `stream=False` 的场景：输出必须是完整结构（如 JSON），你要先验证格式再处理。因为 streaming 模式下可能收到一半时 JSON 不完整。

## Max Tokens

限制**输出**的最大 token 数，不是输入。技术上是生成循环的终止条件之一：每生成一个 token 检查 `已生成数 >= max_tokens`，满足就停止，不管句子说没说完。

**为什么需要这个参数？**模型生成没有"天然终点"。理论上它可以一直预测下一个 token，生成几万字的废话。工程上必须有硬上限防止：计费失控、推理资源被占死、生成质量崩坏（生成太长后模型容易 degrade，开始重复或跑题）。

设置策略（trade-off 在完整性、成本、质量之间）：

| 任务类型    | 推荐值         | 原因                                         |
| ----------- | -------------- | -------------------------------------------- |
| 聊天/问答   | 1024-2048      | 大部分回答在 500 tokens 内，留 buffer 防截断 |
| 写长文/报告 | 4096-8192      | 文章通常 2k-5k tokens，太小会被腰斩          |
| 生成代码    | 2048-4096      | 函数/类定义一般几百行，但留空间给注释和测试  |
| 翻译        | 输入长度 × 1.5 | 目标语言可能更啰嗦（如中译英）               |

**太小的后果**：回答被硬截断，模型不知道自己会被截断，它会尽力说完，但参数不允许。

**太大的后果**：质量下降，很多模型在生成 4k+ tokens 后开始出现重复、逻辑混乱、偏离主题。attention 机制对超长序列的建模能力有限，越往后生成，对前文的"记忆"越模糊。

别设 `max_tokens=100000`。就算模型支持 128k 上下文，也不意味着它能高质量生成 10 万 token 输出。实际中超过 1 万 token 的生成任务应该拆分成多轮对话，每轮生成一个章节。

---

## TL;DR

- **Temperature=0**：写代码/翻译；创意任务再往上调
- **Top-P=1**：遵循“只改一个采样参数”；top_k 先确认 provider 是否支持
- **Penalties 默认为 0**：只有复读机才上调，别一上来就 1.0
- **Streaming=True**：面向人类的 UI 必开，生成结构化 JSON 时再关
- **Max Output Tokens**：按任务粒度估算，别盲目打满上限
- **Thinking/Reasoning**：只在 GPT-5、Claude Sonnet 4.5、DeepSeek-R1 这类支持的模型上开，并监控 reasoning token 占比

其他的，**read the freaking manual**。

## 参考资料

1. OpenAI，《GPT-5 模型页》与《Reasoning 模型使用指南》，2025。
2. OpenAI，《Prompt Caching Guide》《Streaming API responses》，2024-2025。
3. Microsoft Azure，《Azure OpenAI Service REST API Reference（2024-10-21）》。
4. OpenAI，《OpenAI o1-mini advancing cost-efficient reasoning》，2024.09。
5. DeepSeek-AI，《DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning》，arXiv:2501.12948，2025.01。
6. Anthropic，《Claude Sonnet 4.5 产品页》，2025.09。
