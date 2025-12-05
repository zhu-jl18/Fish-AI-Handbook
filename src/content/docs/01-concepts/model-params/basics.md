---
title: Model Parameters - Token 基础
description: Tokenization 原理与上下文机制
contributors:
  - claude
  - codex
tab:
  label: Token 基础
  order: 10
---

## Token

开始之前，先了解下一个最基础的概念：Tokenization。模型眼里没有单词，只有 Token。无论是经典的 BPE（Byte-Pair Encoding）、BERT 用的 WordPiece，还是 Google 的 SentencePiece，它们的核心目标都是把文本切分成一种既能高效表示、又能处理未登录词（OOV, Out-of-Vocabulary）的中间单元。

说白了，LLM 的生成过程，就是在每个时间步，根据已经生成的 Token 序列，预测下一个最可能的 Token。这是一个概率游戏，而我们接下来要讲的所有参数，都是用来控制这个概率游戏的规则的。

Token 是 LLM 的基本处理单位，不是字符也不是单词。在输入进模型前，所有文本都会被 **tokenizer**（分词器）切分成 token 序列。常见的 tokenizer 有 BPE（Byte Pair Encoding）、WordPiece、SentencePiece 等，它们基于统计频率将文本拆分成子词单元。

### 为什么会出现反直觉的结果？

经典脑残测试："9.8 和 9.11 谁更大？" 模型经常回答 9.11 更大。不是模型傻，而是因为 tokenizer 的切分逻辑：

| 输入   | Tokenizer 输出 | 模型看到的     |
| ------ | -------------- | -------------- |
| "9.8"  | `[9, ., 8]`    | 三个独立 token |
| "9.11" | `[9, ., 11]`   | 三个独立 token |

模型在 transformer 的 self-attention 机制下处理这些 token 时，虽然能学到位置关系，但**数值大小的比较依赖训练数据中的模式**。如果训练时见过 "11 > 8" 的文本多，但见过 "9.11 < 9.8" 这种小数比较的样本少，模型就会基于局部 token（11 vs 8）做出错误判断。

这不是模型"傻"，而是 tokenization 丢失了"小数"的语义完整性。Token `11` 在词表里是个独立单元，模型无法天然理解它在这里是小数点后的两位数，而不是整数 11。

### 实际影响

| 场景       | Tokenization 示例                                  | 潜在问题                     |
| ---------- | -------------------------------------------------- | ---------------------------- |
| 代码变量名 | `getUserId` → `[get, User, Id]`                    | 可能把驼峰拆散，影响代码理解 |
| 长数字     | `123456789` → `[123, 456, 789]` 或 `[12345, 6789]` | 数值计算能力下降             |
| 罕见词     | `pneumonoultramicroscopicsilicovolcanoconiosis`    | 拆成一堆碎片，失去单词整体性 |
| 中文       | "人工智能" → `[人工, 智能]` 或 `[人, 工, 智, 能]`  | 取决于 tokenizer 训练语料    |

粗略估算：1 token ≈ 0.75 英文单词 ≈ 1.5-2 个中文字。具体数字看 tokenizer 实现（GPT 用 tiktoken，Claude 用定制版 SentencePiece）。

---

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

### Prompt Caching

有个东西叫 **prompt caching**：如果你的 prefix messages 没变，某些 provider（Anthropic/OpenAI）会 cache 住，不重复计算，省钱省时间。但别指望所有家都支持。

Prompt caching 有硬性门槛：只有当前缀累计 ≥1024 tokens 时才会写入缓存，命中窗口通常 5-10 分钟。所以要想省钱，得把长指令、系统提示搬到消息数组的最前面，别把变量内容塞在前缀里。
