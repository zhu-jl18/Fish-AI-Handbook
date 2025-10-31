---
title: to-api
description: 2api github url and description
---

## Introduction

In short, 2API is to wrap some services into api interfaces through reverse engineering.
通过伪造请求头绕过限制，获取到响应后封装成openai等格式方便其他客户端调用，使其表现就像一个api接口一样。

## 2API List

| 项目名称      | 状态       | 链接 | 备注                    |
| ------------- | ---------- | ---- | ----------------------- |
| LMArena2api   | ✅ Good     |      | 上下文会被截断          |
| cerebras2api  | ✅ Good     |      | IP 经常失效             |
| gcli2api      | ✅ Good     |      |                         |
| pplx2api      | ⚠️ Not Good |      |                         |
| retool2api    | ⚠️ Not Good |      |                         |
| highlight2api | ⚠️ Not Good |      | 响应太慢 & 上下文被截断 |
| warp2api      | ⚠️ Not Good |      | 响应太慢 & 内联系统提示 |
| kiro2api      | ❌ Died     |      | 直接被封禁              |
| droid2api     | ❌ Died     |      | 直接被封禁              |
| qwen2api      | ❌ Died     |      | 已失效                  |
| deepinfra2api | ❌ Died     |      |                         |
| zai2api       | ❌ Died     |      | 已失效                  |

## 温馨提示

2API 常见问题：

| 问题类型       | 说明                                       |
| -------------- | ------------------------------------------ |
| 模型不透明     | 服务商可能更换或混用模型，真实来源难以验证 |
| 不支持工具调用 | 无法使用函数调用/工具                      |
| 上下文易被截断 | 长对话或长输入可能丢失信息                 |
| 系统提示不可控 | 常被追加在服务端提示之后，效果受限         |
| 稳定性较差     | 服务可能随时变更或失效                     |
