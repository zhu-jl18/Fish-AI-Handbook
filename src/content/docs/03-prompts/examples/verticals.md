---
title: 场景模板
description: 编码/评审、数据抽取、研究与引用、图像理解一页打包
contributors:
  - codex
---

## 代码改动/评审
```md
Instruction: 在 {repo} 完成 {issue}。
Constraints: 只改相关文件；保持风格；必要时最小化新增测试。
Output: 改动摘要、验证命令与结果、剩余风险。
```

## 协作范式（串行两步）
```md
Step1=Plan: 目标、输入需求、验收准则。
Step2=Do: 执行并自检；列出偏差与下一步。
```

## 数据/信息抽取
```md
Instruction: 从文本抽取结构化信息。
Schema: {entities:[{name,type,attrs}], facts:[{key,value,source}]}
Guardrails: 无匹配返回空数组。
```

## 研究与引用
```md
Instruction: 回答 {问题} 并列来源。
Tools: search(q, topk) 或 fetch_content(url)
Output: {status, answer, source[{title,url,cred}], error}
Guardrails: 无可靠来源 -> status=empty。
```

## 图像理解
```md
Instruction: 解读截图/ROI={x,y,w,h}，回答 {问题}。
Output: findings[{label,value|null,confidence}], notes[]
约束：不确定写null并说明原因。
```
