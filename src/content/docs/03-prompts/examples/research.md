---
title: 研究与引用
description: 可验证输出与来源标注
contributors:
  - codex
---

## 研究模板
```md
Instruction: 回答 {问题} 并标注来源与信度。
Constraints: 不编造；无可靠来源则空结果。
Tools: search(q, topk)
Output Schema:
{
  "status": "ok|empty|error",
  "answer": "string",
  "source": [{"title": "string", "url": "string", "cred": "A|B|C"}],
  "error": {"code": "string", "message": "string"}
}
Guardrails: status=empty 时 answer="" source=[]
```
