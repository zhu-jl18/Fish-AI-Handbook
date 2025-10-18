# AI Agent 通用行为规则（Fish AI Handbook 适配版）

> 目的：统一多类 AI Agent 的协作与变更准则，确保改动可审计、可复现、可回滚。
> 适用范围：本仓库内与内容、路由/侧栏、构建预览、部署相关的自动化/半自动化任务。
> 上下文：项目架构、流程与命令细节请参见 README.md、CONTRIBUTING.md。

---

## 0. 全局原则

- 输出语言：简体中文、简洁直接，避免冗长前后缀。
- 安全合规：仅做防御性/维护性工作；不编写或优化攻击性代码；不涉及凭据发现/抓取。
- 外部链接：不生成/猜测 URL；仅使用用户提供或仓库内已存在链接。
- 工具优先级：文件操作优先使用 Glob/Grep/Read/Edit/Write；Bash 仅用于真实终端命令。
- 任务管理：全程用 TodoWrite 管理任务；同一时间仅 1 项 in_progress；完成即标记 completed。
- 文件策略：优先编辑既有文件；非明确要求不新建文件。
- 代码引用：定位时使用 `file_path:line_number` 格式。
- 命令说明：运行非平凡命令前用 1 句说明意图与影响。
- Git/PR：仅在用户明确要求时提交/推送/建 PR；遵守仓库提交规范。
- 最小输出：回答仅含完成任务所需信息。

示例片段：

```text
[说明意图] 安装依赖并构建以验证改动可通过。
[命令] npm install && npm run build
```

---

## 1. 项目上下文引用

- 架构与目录、命令与流程、命名与层级等细节不在本规则重复描述。
- 请在需要时查阅：README.md（速查与架构速览）、CONTRIBUTING.md（唯一流程与规范事实源）。

---

## 2. 变更范围与操作边界（按任务声明）

- 工具默认“全栈可为”，但必须尊重“任务声明的范围”。复合任务需一次性覆盖涉及的所有范围；越界改动先澄清。
- 下列为“常见范围”的允许/禁止与验收标准；代码风格与目录层级以 CONTRIBUTING.md 为准。

- 内容（Markdown/MDX）
  - 允许：编辑 `src/content/docs/**`；补全 frontmatter（title、description）；修正内链与锚点
  - 禁止：未声明情况下改动路由、侧栏、全局布局/样式
  - 验收：渲染正常、无死链（`npm run test:links`）、格式化通过

- 路由与布局（.astro）
  - 允许：在 `src/pages/**` 新建/修改 `.astro`，包裹 `ContentLayout`；同步更新 `getEntry` 路径
  - 禁止：破坏全局布局/组件接口；随意改动全局样式与脚本
  - 验收：预览无 404/报错；导航高亮正确；与侧栏一一对应

- 样式与组件（components/layouts）
  - 允许：局部样式微调、复用现有变量/约定；小范围组件增强
  - 禁止：大范围视觉重构、移除通用能力、引入新设计体系（未获授权）
  - 验收：风格一致、无回归；构建通过

- 侧栏与导航（`src/scripts/sidebars.ts`）
  - 允许：维护路径选择与 `SIDEBAR` 常量；保证与路由一一对应
  - 禁止：加入与路由不对应条目、跳号或破坏排序约定
  - 验收：结构正确、链接可达、无死链

- 构建与脚本（`package.json`/scripts）
  - 允许：运行 `npm run build/preview/test:links/format`；必要时对脚本做最小改进（需说明）
  - 禁止：无授权修改 lockfile、随意变更依赖与构建配置
  - 验收：`build` 通过；链接检查通过（仅站内）

- 配置与依赖（`astro.config.mjs`、依赖项）
  - 允许：仅在需求明确且给出影响评估与回滚方案后调整
  - 禁止：私自升级/替换核心依赖、引入新依赖
  - 验收：构建通过、功能不回归、CHANGELOG 记录

- 部署与 SEO
  - 允许：校对 Vercel 配置与收录策略（当前默认不收录）
  - 禁止：直接操纵账号/密钥、擅自更改收录策略
  - 验收：目标策略一致（robots、headers）并在文档留痕

注：路由与侧栏的写法、命名与层级、提交规范与分支策略以 CONTRIBUTING.md 为唯一事实源。

---

## 3. 工作流与检查清单

新增顶级章节（一级）

1. 内容：`src/content/docs/<序号-别名>/index.md`（含 `title`）
2. 路由：`src/pages/<别名>/index.astro` 包裹 `ContentLayout`
3. 侧栏：在 `src/scripts/sidebars.ts` 注册路径选择与条目
4. 自检：预览无 404；运行：
   - `npm run preview:search`（含搜索索引的预览）
   - `npm run test:links`（仅站内）
   - `npm run test:e2e`（如有 E2E 变更）

新增二级/三级

1. 内容：二级 `index.md` 与三级 `*.md`
2. 路由：为二/三级各建 `.astro` 并读取对应 docs entry
3. 侧栏：二级 `items` 内挂三级链接
4. 自检：二/三级路由均可达；运行上述“自检命令”

修改/删除

- 修改：编辑对应 Markdown/astro
- 删除：同步删除 Markdown 与 astro，并从 `sidebars.ts` 移除条目

详情步骤与代码示例：见 CONTRIBUTING.md。

---

## 4. 变更与提交

- 小步提交：聚焦“为什么”；提交前请本地构建与检查链接
- 不提交：`dist/`、`.astro/`、工具本地数据
- 仅在用户要求时使用 git/PR

提交前缀与分支策略：以 CONTRIBUTING.md 为准。

---

## 5. 响应与沟通规范

- 默认短答：1-3 句/要点；命令前说明意图
- 不确定先澄清，最小化试错
- 执行结果透明：列出变更点与验证结论
  - 结论必须包含：构建/预览/链接/E2E 的结果摘要；CHANGELOG 是否已更新；是否检查了交叉文档引用

示例片段（最小澄清）：

```text
请确认新章节排序号与别名（如 07-playground），我将据此创建内容与路由并接入侧栏。
```

---

## 6. 工具与命令策略

- 文件/内容：
  - 搜索文件：Glob（如 `**/*.astro`）
  - 搜索内容：Grep（如 `getEntry\('docs'`）
  - 读写：Read/Edit/Write
- Bash：仅用于 `npm`、`git`、`gh` 等真实终端命令
- 禁止用 Bash 代替 find/grep/cat/head/tail/sed/awk/echo
- 并行：互不依赖才并行；否则顺序执行

示例片段（构建命令解释 + 执行）：

```text
说明：安装依赖并进行生产构建，验证改动可通过。
命令：npm install && npm run build
```

---

## 7. 质量门禁（Definition of Done）

- 路由与侧栏一致、无死链与 404
- 构建/预览通过，无阻断性错误
- 命名/层级/编码（UTF‑8）符合约定
- 新增内容标题、层级、侧栏展示正确
- 不产生外部未授权链接与新文件（除非授权）
- 必跑命令完成且通过：`build`、`preview:search`、`test:links`、`test:e2e`（如适用）
- CHANGELOG.md 已更新，相关文档引用已同步

示例片段（自检清单）：

```text
[ ] /playground 可访问
[ ] 左侧栏显示 Playground 并高亮
[ ] npm run build 成功
[ ] 控制台无错误
```

---

## 8. 故障与排障速查

- 404：检查侧栏路径与 `src/pages/**` 是否齐全一致
- Header 高亮错位：应基于“别名”，与中文文案脱钩
- 构建失败：优先检查对象逗号缺失、字符串误含 `\n`
- Windows 终端：确保 UTF‑8

示例片段（排障步骤）：

```text
1) 打开 src/scripts/sidebars.ts，确认 /playground 路径与 items
2) 检查 pages/playground/index.astro 是否存在
3) npm run build 观察报错定位逗号或换行问题
```

---

## 9. 部署与 SEO 约定

- Vercel：Node 20；Build: `npm run build`；Output: `dist`
- 当前策略：默认不收录。
  - BaseLayout 注入 `<meta name="robots" content="noindex, nofollow, noarchive, noimageindex">`
  - `public/robots.txt` 为 `Disallow: /`
  - `vercel.json` 仅为 `/fonts/(.*)` 添加长缓存与 CORS 头，不控制收录
- 如需允许收录：
  - 移除 BaseLayout 中的 robots meta
  - 将 `public/robots.txt` 改为允许（或删除该文件）
  - 按需在 `vercel.json` 增加/移除全站 `X-Robots-Tag` 头

示例片段（部署核对清单）：

```text
[ ] Framework: Astro（自动识别）
[ ] Install: npm install
[ ] Build: npm run build
[ ] Output: dist
[ ] Node: 20
[ ] Robots 策略符合预期（不收录/可收录）
```

---

## 10. 升级与越权处理

- 超出权限或有不确定性：停止执行 → 提出澄清 → 待授权
- 涉及依赖/配置/结构性变更：先给出影响评估与回滚方案

示例片段（影响评估模板）：

```text
变更：升级 Astro 至 vX.Y
影响：构建脚本与 MDX 解析可能变化
回滚：锁定至当前版本并还原 lockfile
```

---

## 11. 执行模板（实操）

1. 用 TodoWrite 建立 3-5 步任务，标记第 1 步为 in_progress
2. 实施并逐步完成任务，完成即标记 completed
3. 收尾：列出改动点/验证结果/下一步建议

示例片段（最小执行步骤）：

```text
- 创建 docs 与 pages 对应目录与文件
- 接入 sidebars.ts 的路径选择与 SIDEBAR
- 构建并验证无 404
```

---

## 附：不同AI助手的专属md均会被引导指向AGENTS.md

- WARP.md（AI终端代码助手Warp）
- CLAUDE.md（AI CLI工具 Claude Code）
- CURSOR.md（AI 编辑器 Cursor）
