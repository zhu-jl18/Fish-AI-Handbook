---
title: Advance
description: Hooks、Skills、Subagent 的组合打法，一次搞清楚角色与边界。
---

Claude Code 的高级能力就是三件事：在入口挂“约束”（Hook）、把提示模板化（Skill）、在重任务上做并行拆分（Subagent）。顺序别搞反。

```
User Cmd
  |
[Pre Hooks] --> [Skill/Prompt] --> {Subagent Pool} --> [Post/Error Hooks]
```

## Hook：把“必须做的检查”写死
- 三类：`pre` 拦阻、`post` 收尾、`error` 通知/回滚。
- 原则：快速、可见、幂等；关键检查设 `failOnError=true`，收尾类用 `false`。
- 建议时长：单个 hook < 10s；慢任务改成条件执行（例如仅对 `CLAUDE_TASK_TYPE=migration` 跑备份）。 

最小配置：
```json
{
  "name": "lint+test",
  "type": "pre-execution",
  "command": "npm run lint && npm test -- --passWithNoTests",
  "failOnError": true,
  "timeout": 120000
}
```

## Skill：把任务写成模板
- 作用：固化“输入约束 + 输出格式 + 目标文件”，减少临场胡说。
- 形态：JSON/YAML 均可；通过 `parameters` 做占位，以便多次复用。
- 场景：代码审查、重构、测试生成最受益；写一次 prompt，把“文件范围”和“需要的证据”写清楚。

示例（参数化审查）：
```json
{
  "name": "api-review",
  "description": "REST/安全/版本/日志 四要素审查",
  "prompt": "按 {{focus}} 检查，列出问题->证据->修复建议三栏",
  "parameters": {
    "focus": { "type": "string", "required": true }
  },
  "context": { "include": ["*.controller.ts"], "exclude": ["*.test.ts"] }
}
```

## Subagent：只在“慢且独立”的任务上并行
- 适用：批量审查/生成测试/多模块重构；不适用：秒级任务、强依赖链任务。
- 并行度：3–5 足够；超过 5 常被速率或 I/O 拖垮。
- 上下文：共享模型窗口，先声明“每个 agent 只抓 X 个文件”；避免写同一文件的副作用，必要时在 hook 里加锁/幂等。
- 失败策略：默认跳过失败任务，严苛流程改成“任意失败即停”。

用法提示：
```bash
> 创建 4 个 subagent 并行审查 auth/db/api/utils，只要有失败就停
```

## 组合套路（推荐顺序）
1) Pre Hook 快速校验（lint/test/git clean）。  
2) Skill 固定提示与输出格式。  
3) 需要吞吐量时再拆成 Subagent；完成后 Post Hook 归档报告或推送提醒。  
4) Error Hook 兜底通知，别让失败悄无声息。 
