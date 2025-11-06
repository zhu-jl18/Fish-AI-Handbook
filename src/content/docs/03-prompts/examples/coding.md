---
title: 编码与评审
description: 计划-实现-差异-测试的最小闭环
---

## 修复/实现模板
```md
Instruction: 在 {repo} 修复/实现 {issue}。
Constraints: 仅改相关文件；遵循现有风格；必要时新增最小测试。
Plan: 列改动点与验证方式（命令）。
Output:
- Patch 摘要（文件/函数）
- 验证命令与结果摘要
- 风险与回滚
```

## 代码评审模板
```md
Scope: {files}
Checks: 复杂度/命名/边界/错误处理/资源释放/并发。
Output Schema: {severity, finding, location, fix}
Guardrails: 无发现时返回空数组。
```

