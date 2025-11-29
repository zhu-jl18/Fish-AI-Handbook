---
title: CCR - GLM 配置
description: 使用 Claude Code Router 接入 GLM 模型的示例配置与注意事项。
tab:
  label: GLM
  order: 20
---

## Why GLM with CCR

GLM 系列模型（尤其是 `glm-4.6` 等版本）在中文代码解释、中文注释生成方面体验很好，适合和 CCR 搭配：

- CCR 负责统一路由和 UI 入口
- GLM 负责代码补全 / 重构 / 解释

## 基础配置示例

以下示例假设你已经在某个供应商（如智谱 open.bigmodel.cn 等）拿到了 GLM 的 API key。

```json
{
  "name": "glm-4.6",
  "api_base_url": "https://open.bigmodel.cn/api/paas/v4/chat/completions",
  "api_key": "sk-your-key",
  "models": ["glm-4.6"],
  "transformer": {
    "use": []
  }
}
```

> 实际的 base_url / 模型名称请以官方文档为准，这里只是示意。

## 使用建议

- 搭配 `qwen3-coder-plus` 等模型做「双路协作」：
  - GLM 负责中文解释 / 代码点评
  - Qwen 负责代码生成 / 重构
- 如果你主要写中文项目，可以考虑把 GLM 配置成 Claude Code 里的默认模型之一。
