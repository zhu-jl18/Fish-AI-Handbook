---
title: 结构化抽取
description: 以 JSON Schema 约束信息抽取
contributors:
  - codex
---

## 模板（含 Schema）
```md
Instruction: 从文本中抽取实体与属性。
Constraints: 严格遵守 JSON Schema；无则空数组。
Input: {text}
Schema:
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "entities": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {"type": "string"},
          "type": {"enum": ["Person","Org","Product","Other"]},
          "attrs": {"type": "object"}
        },
        "required": ["name","type"]
      }
    }
  },
  "required": ["entities"]
}
Output: 严格 JSON
Guardrails: 无匹配返回 {"entities": []}
```
