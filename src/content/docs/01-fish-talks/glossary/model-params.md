---
title: 模型参数
description: Which params affects the outputs of the model.
---

Here we go from the code below:

```python
response = openai.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Hello, how are you?"}],
    temperature=0.5,
    top_p=0.9,
    frequency_penalty=0.0,
    presence_penalty=0.0,
    stream=False,
    max_tokens=100,
    n=1,
    stop=None,
    timeout=None,
    api_key=None,
    api_base=None,
```

I will explain the basic model parameters one by one.

## Token

## Context

## CoT

## Temperature

## Top-P && Top-K

## Frequency/Presence Penalty

## Streaming Output
