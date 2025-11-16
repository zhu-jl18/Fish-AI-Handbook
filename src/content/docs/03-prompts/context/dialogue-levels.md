---
title: 对话层级与请求体
description: System/User/Assistant 职责、API 请求示例与避坑合辑
contributors:
  - codex
---

## 层级速览
- System：全局规则与禁止事项，覆盖语气、输出格式、工具限制。
- User：当前任务与必要上下文，问题越具体越好。
- Assistant（历史）：先前回复的记录，主要用于连续性或滚动摘要。

## 写法示例
```json
[
  { "role": "system", "content": "你是安全审计助手，只输出JSON，未知写null。" },
  { "role": "user", "content": "审查以下代码，列出安全风险。" },
  { "role": "assistant", "content": "上一轮的审计摘要..." },
  { "role": "user", "content": "继续审查新文件 X" }
]
```

## 请求体示例（最小充分）
```json
{
  "model": "gpt-4.1",
  "messages": [
    { "role": "system", "content": "你是严谨的中文技术写作者，只输出JSON，无答案写空值。" },
    { "role": "user", "content": "总结附件要点，限200字。" }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "search",
        "description": "检索可信来源",
        "parameters": { "type": "object", "properties": { "q": { "type": "string" } }, "required": ["q"] }
      }
    }
  ],
  "response_format": {
    "type": "json_schema",
    "json_schema": {
      "name": "summary",
      "schema": {
        "type": "object",
        "properties": {
          "summary": { "type": "string" },
          "sources": { "type": "array", "items": { "type": "string" } }
        },
        "required": ["summary", "sources"]
      }
    }
  },
  "temperature": 0.2,
  "max_tokens": 400
}
```

## 避坑与收束
- 窗口有限：长对话用滚动摘要；重要准则置顶，而非埋在历史里。
- 近因偏置：先复述硬约束和验收标准再执行。
- 噪声放大：避免口语化串修；大改动“新话题重启”。
- 工具签名：参数声明要可执行；禁用项写在 system。

## 最小充分清单
- messages 按 system→user→assistant 排序。
- 只放当前任务必需事实；可放链接，内容用工具拉取。
- response_format/Schema 优先；温度低于 0.3 处理抽取/测试。
