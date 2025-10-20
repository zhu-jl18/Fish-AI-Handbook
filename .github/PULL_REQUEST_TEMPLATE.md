# Pull Request

## ✅ 核心检查（所有 PR 必需）

- [ ] 本地构建通过：`npm run build`
- [ ] 代码格式化：`npm run format`
- [ ] CHANGELOG.md 已更新（[Unreleased] 节）

## 📄 内容变更检查（如涉及，请勾选）

<details>
<summary>仅当新增/修改文档内容时展开</summary>

- [ ] 目录编号符合 01-06、99 规范，未跳号
- [ ] Markdown 包含必填 frontmatter（title、description）
- [ ] 路由 .astro 与内容路径一致
- [ ] 已更新侧栏配置（src/scripts/sidebars.ts）
- [ ] 站内链接检查通过：`npm run test:links`

</details>

## 🎨 UI/交互变更检查（如涉及，请勾选）

<details>
<summary>仅当涉及视觉或交互改动时展开</summary>

- [ ] 已附上前后对比截图（见下方模板）
- [ ] E2E 测试通过：`npm run test:e2e`（如有相关测试）

</details>

---

## 变更说明

**目的与影响：**
<!-- 说明此次变更的 What & Why -->

**验证步骤：**
<!-- 列出你执行的验证命令和结果 -->

---

## 视觉对比（UI 变更时填写）

<details>
<summary>点击展开：前后对比截图</summary>

| Before                          | After                          |
| ------------------------------- | ------------------------------ |
| <!-- 拖入变更前截图 --> | <!-- 拖入变更后截图 --> |

**关键变化说明：**
<!-- 简述主要差异点 -->

</details>

---

## 附加信息

<!-- 相关 Issue 或讨论链接 -->
