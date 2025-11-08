---
title: 模型参数
description: Which params affects the outputs of the model.
---

看这段 code：

```python
response = openai.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "Hello, how are you?"}],
    temperature=0.1,
    thinking_enabled=True,
    top_k=0,
    top_p=0.9,
    frequency_penalty=1.0,
    presence_penalty=0.9,
    stream=True,
    max_tokens=6400
)
```

这些 params 是干嘛的？

## Token

LLM 的基本单位。不是字符，不是单词。

经典脑残测试："9.8 和 9.11 谁更大？" 模型会告诉你 9.11 更大，因为它看到的是 `[9, ., 11]` 三个 tokens，而 11 > 8。这不是模型傻，是你 tokenization 就这样。

1 token ≈ 0.75 英文单词 ≈ 1.5-2 个中文字。别纠结具体数字，call 一次 API 看 `usage` 字段就知道了。

## Input/Output 和那个该死的 Context

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

## Temperature

**控制随机性**。范围 0-2（有些家是 0-1）。

- `0`：deterministic，每次输出一样（除非 API 抽风）
- `1`：default，有点创造力
- `2`：瞎 JB 乱说

**我的建议**：
- 写代码/翻译/总结？**用 0**，别让它发挥"创造力"
- 写诗/brainstorming？0.7-1.2
- 你要是调到 2，那你基本可以关掉了

## Top-P & Top-K

Sampling 策略，和 temperature 配合用的。

- **Top-K**：只从概率最高的 K 个 tokens 里选
- **Top-P** (nucleus sampling)：累积概率达到 P 就截断

大部分时候你**不需要动**。OpenAI 默认 top_p=1, top_k 不开放。Anthropic 类似。

如果你真要调：top_p=0.9 + temperature=0.7 是个还算 reasonable 的组合。但说实话，**默认就行**。

## Frequency Penalty & Presence Penalty

都是为了防止模型重复废话。

- **Frequency Penalty**：出现过的 token 概率降低，出现次数越多降越多
- **Presence Penalty**：出现过的 token 概率降低，但不管出现几次都一样

范围一般 -2.0 到 2.0（OpenAI）。

**你需要调吗？** 99% 情况下不需要。默认是 0，够用了。除非你发现模型像个复读机，试试 0.5-1.0 的 frequency_penalty。

## Thinking/CoT/Reasoning

OpenAI o1/o3、Anthropic Claude 3.5 Sonnet (thinking mode) 支持。

简单说就是让模型先"思考"再回答。internally 用 RL (强化学习) 训出来的，不是传统 supervised learning。

```python
thinking_enabled=True
```

会看到模型先输出一堆 `<thinking>` block，然后才给最终答案。这玩意儿**很贵**，而且**很慢**，但确实在某些复杂推理任务上效果好。

日常聊天？别开。写代码？看情况。数学题/逻辑推理？可以试试。

## Streaming

```python
stream=True
```

是否流式返回。

- `False`：等模型全部生成完再返回，可能等很久
- `True`：一边生成一边吐给你，体验好

**坑点**：streaming 的时候有些 metadata（比如 `usage`）要等到 stream 结束才有。还有些傻逼 SDK 处理 stream 会截断/丢数据，测试好再上。

生产环境基本都用 streaming，除非你真的需要等完整 response（比如要 parse JSON output）。

## Max Tokens

生成的最大 token 数。**不是输入，是输出**。

设太小：回答被截断，用户骂街。
设太大：浪费钱，而且某些模型会开始胡说八道。

一般：
- 聊天：1024-2048 够了
- 写长文：4096-8192
- 生成代码：看复杂度，2048-4096

别设成 `max_tokens=100000`，你以为你在干嘛？

---

## TL;DR

- **Temperature=0**：确定性任务
- **Top-P/Top-K**：别动
- **Penalties**：别动
- **Streaming=True**：基本都该开
- **Max Tokens**：根据需求设，别太抠门也别太豪
- **Thinking**：贵且慢，需要再开

其他的，**read the fucking manual**。
