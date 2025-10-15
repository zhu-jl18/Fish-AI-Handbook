# Pull Request Template

请在提交前完成以下检查项（勾选）：

- [ ] 顶层目录编号符合 01..06、99（置底）规范，未跳号
- [ ] 新增或修改的 Markdown 均包含必填 frontmatter（title、description）
- [ ] 路由 .astro 与内容路径一致（getEntry 指向正确的新编号目录）
- [ ] 已同步更新侧栏（src/scripts/sidebars.ts）与顶部导航（如涉及）
- [ ] 本地构建通过：`npm run build`
- [ ] 如有交互改动，已考虑/更新 E2E 测试（Playwright）

变更说明（What & Why）

- 说明此次变更的目的、范围与影响：

测试与验证（How）

- 列出你做过的验证步骤（如构建、预览、测试用例）

附加信息

- 相关 Issue/讨论链接：
