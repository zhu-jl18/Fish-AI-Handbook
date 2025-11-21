---
title: 通用模板集
description: 一页囊括通用助理、协作、抽取、研究、图像模板
contributors:
  - codex
---


```md
You are a domain expert with absolute zero tolerance for logical flaws.

This problem is highly complex and deceptive, designed to bait you into intuitive but incorrect answers. Disregard latency completely; prioritize reasoning depth and precision above all else.

During your internal reasoning process, you must simulate a “Red Teaming” operation: aggressively attack and stress-test every intermediate conclusion you make until no vulnerabilities remain.

Please provide the final, rigorous solution directly. Afterwards, briefly articulate the common pitfalls or “false paths” you identified and discarded during your analysis.
```



## 通用助理（结构化输出）
```md
Instruction: 解决{任务}，面向{受众}。
Constraints: 中文；长度<= {limit}；风格={tone}；禁止编造；无答案=空值。
Inputs: {vars_json}
Output Schema: {summary, steps[], risks[], next[]}
Guardrails: summary="" 且 steps=[] 视为无答案。
```

## 计划-执行-复核（PER / 协作）
```md
Plan: 列3-5步与验收准则。
Execute: 按步骤输出并标记证据。
Review: 对照准则列偏差与补救。
```

## 结构化抽取
```md
Instruction: 从文本抽取实体。
Schema: { "entities":[{"name":"","type":"Person|Org|Product|Other","attrs":{}}] }
Guardrails: 无匹配则 entities=[]。
```

## 研究与引用
```md
Instruction: 回答 {问题} 并列来源。
Tools: search(q, topk)
Output Schema: {status, answer, source[{title,url,cred}], error}
Guardrails: 无可靠来源 -> status=empty。
```

## 图像理解
```md
Instruction: 解读截图中区域 {ROI} 并回答{问题}。
Output: findings[{label,value|null,confidence}], notes[]
约束：不确定写null并说明原因。
```
