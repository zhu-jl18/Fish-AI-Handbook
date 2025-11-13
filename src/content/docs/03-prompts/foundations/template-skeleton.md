---
title: 模板骨架
description: 推荐顺序与字段约束，覆盖工具契约与错误处理
contributors:
  - codex
---

## 推荐顺序（McKinsey金字塔）

1) Instruction（任务定义）
2) Constraints（边界与风格：长度、语气、引用、拒绝策略）
3) Inputs Placeholders（变量/占位符及转义规范）
4) Few-shot Examples（小而精，含1-2个边界样例）
5) Tools/Functions Spec（严格契约/JSON Schema）
6) Output Schema（字段、类型、枚举、示例、错误处理）
7) Guardrails（不得编造、必须标注来源、无答案输出空结果）

## 骨架示例（可直接复制）

```md
Instruction:
- 你的任务：{task}

Constraints:
- 语言：简体中文；长度<= {limit}
- 语气：{tone}；术语：遵循风格卡
- 禁止：编造来源/越权工具调用

Inputs:
- vars: {vars_json}
- 转义规范：所有 JSON 字段使用双引号

Few-shot:
- 正例：{x1}
- 边界：{x2}

Tools Spec:
---```json
{ "name": "search", "schema": {"q": "string", "topk": "integer"} }
---```

Output Schema:
---```json
{
  "status": "ok|empty|error",
  "summary": "string",
  "data": [],
  "source": [{"title": "string", "cred": "A|B|C"}],
  "error": {"code": "string", "message": "string"}
}
---```

Guardrails:
- 无答案：status=empty，data=[]
- 需引用：必须填充 source 并给出 cred（信度）
```
