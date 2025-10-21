---
title: 模型参数详解
description: Temperature、Top-P、Top-K等参数如何影响AI输出
---

## 模型参数是什么

想象你在调节收音机的旋钮...模型参数就像这些旋钮，  
调整它们可以改变AI的"性格"和输出风格。

---

## Temperature

**作用：** 控制输出的随机性与创造性

- **值范围：** 0.0 ~ 2.0
- **低温（0.0 ~ 0.3）：** 输出稳定、确定，适合编程、翻译
- **中温（0.5 ~ 0.7）：** 平衡创造性与稳定性，日常对话
- **高温（0.8 ~ 1.0+）：** 输出多样、有创意，适合写作、头脑风暴

**示例：**

```python
# 编程任务 - 要求精确
response = ai.generate

# 创意写作 - 要求新颖
response = ai.generate
```text
**工作原理：**  
AI生成每个词时会计算所有可能词的概率分布。Temperature决定如何从这个分布中采样：

- Temperature = 0: 总是选概率最高的词（完全确定）
- Temperature = 1: 按原始概率分布采样
- Temperature > 1: 增加低概率词的机会（更随机）

---

## Top-P

**作用：** 从累积概率达到P的词中选择

- **值范围：** 0.0 ~ 1.0
- **推荐值：** 0.9 ~ 0.95
- **与Temperature的关系：** 通常只用其中一个

**工作原理：**  
AI生成每个词时会计算所有可能词的概率，  
Top-P=0.9 表示只从概率总和达到90%的候选词中选择。

**示例：**  
假设AI要生成下一个词，概率分布如下：

- "是" 40%
- "对" 30%
- "好" 20%
- "嗯" 5%
- 其他词 5%

如果 Top-P=0.9，则：

- 累积："是"(40%) + "对"(30%) + "好"(20%) = 90%
- AI只会从这3个词中选择，其他词被排除

---

## Top-K

**作用：** 只从概率最高的K个词中选择

- **值范围：** 正整数（如 10, 40, 100）
- **推荐值：** 40 ~ 50
- **特点：** 比Top-P更直接粗暴

**工作原理：**  
直接截取概率最高的K个词，其他全部忽略。

**与Top-P的区别：**

- **Top-K:** 固定数量，可能包含概率很低的词
- **Top-P:** 动态数量，只包含高概率词

**使用建议：**  
大多数情况下，Top-P比Top-K更好用，因为它更灵活。

---

## Token

**作用：** AI处理文本的最小单位，也是计费单位

### 什么是Token？

Token是AI"读"和"写"的基本单位：

- **不是字符，也不完全是词**
- **1个Token ≈ 0.75个英文单词**
- **1个Token ≈ 1-2个中文字符**

**示例：**

```text
"Hello, world!" ≈ 4 tokens
- "Hello" → 1 token
- "," → 1 token
- " world" → 1 token
- "!" → 1 token

"你好，世界！" ≈ 5-6 tokens
- "你" → 1 token
- "好" → 1 token
- "，" → 1 token
- "世" → 1 token
- "界" → 1 token
- "！" → 1 token
```text
### 为什么重要？

1. **决定上下文长度**
   - GPT-4: 128K tokens ≈ 10万字
   - 超出限制会被截断

2. **决定费用**
   - 输入和输出分别计费
   - 例：GPT-4o-mini
     - 输入：$0.15 / 1M tokens
     - 输出：$0.60 / 1M tokens

3. **影响响应速度**
   - Token越多，处理时间越长

### 如何估算Token数量？

**在线工具：**

- [OpenAI Tokenizer](https://platform.openai.com/tokenizer)
- 输入文本即可查看token数

**经验公式：**

- 英文：字数 ÷ 0.75
- 中文：字数 × 1.5

---

## Max Tokens

**作用：** 限制AI单次回复的最大长度

- **默认值：** 通常几百到几千
- **注意：** 这是输出长度，不包括输入

**建议设置：**

- **简短回复：** 100-500
- **文章生成：** 2000-4000
- **代码生成：** 根据需要，通常1000-2000

**注意事项：**

- **不是越大越好**
- 太大可能导致：
  - 浪费token
  - AI开始"胡说八道"（填充内容）
  - 响应变慢

**示例：**

```python
# 要求简短回答
response = ai.generate

# 要求详细文章
response = ai.generate
```text
---

## 其他常见参数

### Frequency Penalty

**作用：** 减少重复内容

- **范围：** -2.0 ~ 2.0
- **推荐：** 0.0 ~ 0.5
- **工作原理：** 根据词已出现的次数降低其概率

**什么时候用：**

- AI老是重复同样的话
- 需要更多样化的表达

### Presence Penalty

**作用：** 鼓励谈论新话题

- **范围：** -2.0 ~ 2.0
- **推荐：** 0.0 ~ 0.5
- **工作原理：** 只要词出现过就降低概率（不管出现几次）

**与Frequency Penalty的区别：**

- **Frequency:** 出现越多，惩罚越重
- **Presence:** 只要出现过就惩罚，不管次数

### Stop Sequences

**作用：** 遇到特定字符串就停止生成

- **常用于：** 结构化输出
- **示例：** `["###", "---", "\n\n\n"]`

**使用场景：**

```python
# 生成对话，遇到分隔符就停止
response = ai.generate
```text
---

## 参数组合建议

### 编程/翻译（要求精确）

```json
{
  "temperature": 0.2,
  "top_p": 0.95,
  "max_tokens": 2000,
  "frequency_penalty": 0.0
}
```text
### 日常对话（平衡）

```json
{
  "temperature": 0.7,
  "top_p": 0.9,
  "max_tokens": 1000,
  "presence_penalty": 0.2
}
```text
### 创意写作（发散思维）

```json
{
  "temperature": 0.9,
  "top_p": 0.95,
  "frequency_penalty": 0.5,
  "presence_penalty": 0.3,
  "max_tokens": 3000
}
```text
### 事实查询（严格）

```json
{
  "temperature": 0.0,
  "top_p": 1.0,
  "max_tokens": 500
}
```text
---

## 实战技巧

### 技巧1：Temperature与Top-P不要同时设高

**错误：**

```json
{
  "temperature": 1.0,
  "top_p": 1.0
}
```text
结果：输出太随机，质量下降

**正确：**

```json
{
  "temperature": 0.8,
  "top_p": 0.9
}
```text
### 技巧2：使用Token预估控制成本

```python
# 估算成本
input_tokens = len * 1.5  # 中文
output_tokens = 2000  # 预期输出

cost = (input_tokens * 0.15 + output_tokens * 0.60) / 1_000_000
print
```text
### 技巧3：根据任务动态调整

```python
def get_params:
    if task_type == "coding":
        return {"temperature": 0.2, "max_tokens": 2000}
    elif task_type == "creative":
        return {"temperature": 0.9, "max_tokens": 3000}
    elif task_type == "chat":
        return {"temperature": 0.7, "max_tokens": 1000}
```text
---

## 进阶理解

### Temperature的数学原理

Temperature通过Softmax函数调整概率分布：

```text
P = exp / Σ exp
```text
- T越小，高分词的优势越明显（确定性强）
- T越大，各个词的概率趋于平均（随机性强）

### Token化的影响

**为什么要分Token？**

1. **效率：** 比字符级处理快得多
2. **语义：** 保留词的完整性
3. **通用：** 可以处理任何语言

**但也有问题：**

- 中文需要更多Token
- 特殊词可能被拆分（如专有名词）
- 不同模型的Tokenizer不同

---

## 相关阅读

- **[AI概念 →](/fish-talks/glossary/ai-concepts)** - 理解Context、Agent等概念
- **[提示词 - 实用技巧 →](/prompts/practical-tips)** - 学会写好提示词
- **[基础用法 →](/basic-usage)** - 在不同工具中如何设置这些参数

---

## 记住这些就够了

1. **Temperature控制随机性** - 低温稳定，高温创意
2. **Token决定长度和成本** - 中文约1.5倍字数
3. **Max Tokens别设太大** - 够用就行
4. **Top-P一般比Top-K好用** - 更灵活
5. **编程用低温，写作用高温** - 根据任务调整

遇到不懂的随时回来查，不用死记硬背！
