---
title: 图像理解
description: 多模态提示——框选/要素/不确定性处理
---

## 截图/界面理解模板
```md
Instruction: 解读截图中标注区域的 UI 信息，回答 {问题}。
Inputs:
- image: <上传图像>
- ROI: {x,y,w,h} 或 文字描述（例：“右上角表格区域”）
Constraints: 明确列字段含义/单位/范围；不确定则输出 null 并说明原因。
Output Schema:
{
  "findings": [{"label": "string", "value": "string|null", "confidence": 0-1}],
  "notes": ["string"]
}
```

## 文档表格抽取模板
```md
Instruction: 从图片中抽取表格数据。
Constraints: 指明列含义/单位/异常处理策略；空缺填 null。
Output: CSV（含表头）
```

