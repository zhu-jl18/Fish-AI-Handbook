---
title: 模型参数
description: Which params affects the outputs of the model.
---

Here we go from the code below:

```python
response = openai.chat.completions.create(
    model="gpt-5-pro",
    messages=[{"role": "user", "content": "Hello, how are you?"}],
    temperature=0.1,
    thinking_enabled=True,
    top_k=0,
    top_p=0.9,
    frequency_penalty=1.0,
    presence_penalty=0.9,
    stream=True,
    max_tokens=6400
```

I will explain the basic model parameters one by one.

## Token

The basic unit of the model's input and output.

一个经典的： “9.8和9.11谁更大”

## Input and Output

模型并不会记住你的内容，每次都会把历史记录都塞过去，从而根据历史记录和当前输入来生成输出。

有一个概念叫作缓存命中，如果缓存命中，则不会进行上下文注入。

## CoT

CoT is the short for Chain of Thought. It is a technique that allows the model to think step by step. 它主要由强化学习来实现，而不是传统的监督学习。

## Temperature

This parameter controls the creativity and randomness of the model's output. 除非你要涩涩，否则我强烈建议设置为0。

## Top-P && Top-K

默认即可

## Frequency/Presence Penalty

默认即可

## Streaming Output

如果需要实时输出，则设置为True。流式输出的一个问题是可能会截断。
