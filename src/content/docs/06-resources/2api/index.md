---
title: to-api
description: 2api github url and description
---

## Introduction

In short, 2API is to wrap some services into api interfaces through reverse engineering.
通过伪造请求头绕过限制，获取到响应后封装成openai等格式方便其他客户端调用，使其表现就像一个api接口一样。

## 2API List

Good ones：

- [LMArena2api]()
- [cerebras2api]()
- [gcli2api]()

Not good ones：

- [pplx2api]()
- [retool2api]()
- [highlight2api]()
- [warp2api]()

Those died：

- [kiro2api]()
- [droid2api]()
- [qwen2api]()
- [deepinfra2api]()
- [zai2api]()

## 温馨提示

2API 常见问题：

- 模型不透明：服务商可能更换或混用模型，真实来源难以验证
- 不支持工具调用：无法使用函数调用/工具
- 上下文易被截断：长对话或长输入可能丢失信息
- 系统提示不可控：常被追加在服务端提示之后，效果受限
- 稳定性较差：服务可能随时变更或失效

Some examples:
- kiro2api: directly banned
- droid2api: directly banned
- zai2api: invalid
- qwen2api: invalid
- LMArena2api: context is cut off
- highlight2api: response too slow && context is cut off
- warp2api: response too slow and inline system prompt
- cerebras2api: frequently invalid with ip
