---
title: 通用模板集
description: 可直接复制的高频任务模板
---

## 通用助理（结构化输出）
```md
Instruction: 解决{任务}，面向{受众}。
Constraints: 中文输出；长度<= {limit}；风格={tone}；禁止编造；无法回答则空结果。
Inputs: {vars_json}
Few-shot: {好例} / {边界例}
Output Schema:
{
  "summary": "string",
  "steps": ["string"],
  "risks": ["string"],
  "next": ["string"]
}
Guardrails: 空结果=summary="" 且 steps=[]
```

## 计划-执行-复核（PER）
```md
Phase=Plan: 列3-5步计划与验收准则。
Phase=Execute: 逐步产出并标注证据。
Phase=Review: 对照准则列差异与补偿措施。
```

## 风格卡（示例）
```md
术语：统一使用“结构化输出”“自检清单”。
语气：简洁、专业、无夸饰。
禁用词：显而易见、极其、非常。
格式：标题层级<=3，列表优先。
```

