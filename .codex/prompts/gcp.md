---
description: "按 CONTRIBUTING 的 Git 规范完成一次 add/commit/push"
---

/gcp：遵循仓库贡献流程进行阶段性提交并推送。

步骤：
1) `git status -sb` 查看变更与当前分支，若在 `main` 立刻切到基于 `origin/main` 的功能分支（例：`feature/<desc>`）。
2) 根据 Conventional Commits（见 CONTRIBUTING §6.1/6.2）选择 `type` 与必填 `scope`，标题模版：`<type>(<scope>): <imperative summary>`，主题不超 72 字符，`type` 小写，可用 `+` 组合，不要滥用 `wip`，破坏性变更用 `!` 并在正文写 `BREAKING CHANGE:`。
3) 变更非单一 markdown 时，推送前按 CONTRIBUTING §5.3 跑必须校验；至少执行 `npm run build` 与 `npm run test:links`，必要时补全其他脚本。
4) `git add -A` 全量暂存。
5) `git commit -m "<type>(<scope>): <summary>"`（必要时补正文/脚注）。
6) `git push origin <current-branch>`，保持远程分支同名，禁止直推 `main`。
