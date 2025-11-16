---
title: Context
description: 上下文工程：最小充分信息与分层注入
contributors:
  - codex
---

## 核心要点
- 分层：System/Developer/User；冲突高层优先。
- 组成：指令 + 事实 + 示例 + 输出 Schema + 工具契约 + 状态摘要。
- 原则：只放“最小充分”信息，避免历史噪声。
- 长对话：滚动摘要 + 重申约束；准则置顶。

## 快速拼装流程
1. 写 System：角色、语气、禁止事项、输出 Schema。
2. 写任务：清晰目标和边界（时效、范围、粒度）。
3. 注入事实：必需资料分点列出，标注来源。
4. Few-shot：1 正例 + 1 边界例（可选）。
5. 工具/格式：函数签名或 JSON Schema，声明空结果策略。

```
User Input --> [任务定义] --> [必要事实/示例] --> [工具/Schema] --> LLM
                                    ^                           |
                             滚动摘要/新约束  -------------------+
```

## 继续阅读
- [对话层级与请求体](/prompts/context/dialogue-levels)：角色边界、API 示例、避坑合辑。
