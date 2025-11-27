---
title: Practice
description: 现成的流水线模板，直接抄到命令行就能跑。
---

## 场景 1：安全修复流水线
1) 开局声明边界：`> 目标：修复 login 500，约束：不动接口签名；验收：npm test auth --runInBand。`
2) Pre Hook：`git diff --quiet` + `npm run lint`，失败即停。
3) Skill：`bugfix-plan`（输出“假设-风险-行动”三栏）让 AI 先列计划再改代码。
4) 执行顺序：计划确认 -> 小步修改 -> 自动跑测试 -> 生成变更摘要。
5) Post Hook：生成 `report.md` 汇总“问题→修改→验证”三列，方便 PR 贴上去。

<!-- 图片占位：安全修复流水线流程图 -->
<img src="" width="95%">
<!-- 图说：流程图展示：声明边界 → Pre Hook → bugfix-plan Skill → 执行 → 生成report.md的完整流水线 -->

## 场景 2：并行代码审查
```bash
claude
> 创建 4 个 subagent，审查 auth.ts/db.ts/api.ts/ui.ts；规则：每个文件至少给 3 个问题+证据
```
- Pre Hook：`npm run lint -- --max-warnings 0`；避免一堆低级错误浪费审查额度。
- 结果聚合：让主 Agent 输出表格 `文件 | 问题 | 证据 | 影响 | 修复建议`。
- 若有失败的 subagent：要求主 Agent 标记“未完成”并保留待查文件名，别假装完成。

<!-- 图片占位：并行代码审查架构图 -->
<img src="" width="95%">
<!-- 图说：架构图展示1个主Agent和4个subagent(auth.ts/db.ts/api.ts/ui.ts)并行审查的工作方式 -->

## 场景 3：重构 + 自动补测
1) Skill：`refactor-guarded`，要求“先找重复/长函数/嵌套 > 提出拆解方案 > 执行并给 diff 汇总”。
2) Subagent：按模块拆 3–5 个 agent 并行重构。
3) Post Hook：运行 `npm test -- --passWithNoTests`，并把覆盖率阈值写进配置避免误伤。
4) 产出格式：单列表格 `文件 | before -> after | 风险 | 需要的人工复核点`，方便人工最后确认。

<!-- 图片占位：重构+自动补测工作流程图 -->
<img src="" width="95%">
<!-- 图说：refactor-guarded → 并行subagent → 测试覆盖率检查 → 产出表格的完整流程 -->

## 快速自检清单
- 入口有 Pre Hook，出口有 Post/Error Hook，避免“改了但没测”。
- 每步输出要求“证据+命令+下一步”，阻止模型讲故事。
- 并行任务用固定文件列表，别让多个 subagent 改同一文件。
- 关键命令（build/test/deploy）写死在 prompt 里，让模型调用，不要靠你手动补刀。

<!-- 图片占位：快速自检清单可视化图表 -->
<img src="" width="85%">
<!-- 图说：将4条检查清单项可视化为带checkbox的清单图表，强调每步验证的重要性 --> 
