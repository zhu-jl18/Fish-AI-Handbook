# AI Agent 通用行为规则（Fish AI Handbook 适配版）

> 目的：统一多类 AI Agent 的协作与变更准则，确保改动可审计、可复现、可回滚。
> 适用范围：本仓库内与内容、路由/侧栏、构建预览、部署相关的自动化/半自动化任务。
> 上下文：项目架构、流程与命令细节请参见 README.md、CONTRIBUTING.md。

---

## 0. 全局原则

- 输出语言：简体中文、简洁直接，避免冗长前后缀。
- 外部链接：不生成/猜测 URL；仅使用用户提供或仓库内已存在链接。
- 命令说明：运行非平凡命令前用 1 句说明意图与影响。
- Git/PR：仅在用户明确要求时提交/推送/建 PR；遵守仓库提交规范。

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
  - 验收：构建通过、功能不回归

- 部署与 SEO
  - 允许：校对 Vercel 配置与收录策略（当前默认不收录）
  - 禁止：直接操纵账号/密钥、擅自更改收录策略
  - 验收：目标策略一致（robots、headers）并在文档留痕

注：路由与侧栏的写法、命名与层级、提交规范与分支策略以 CONTRIBUTING.md 为唯一事实源。

---

## 3. 网站内容变更--工作流与检查清单

### Astro 路由文件结构规范（强制约束）

**核心原则**：路由文件结构必须**镜像** Markdown 内容文件结构，确保一致性、可预测性与可扩展性。

| 层级 | Markdown 内容                      | Astro 路由                       | 说明                           |
| ---- | ---------------------------------- | -------------------------------- | ------------------------------ |
| 一级 | `<序号-别名>/index.md`             | `<别名>/index.astro`             | 章节首页                       |
| 二级 | `<序号-别名>/<子目录>/index.md`    | `<别名>/<子目录>/index.astro`    | **统一使用文件夹+index.astro** |
| 三级 | `<序号-别名>/<子目录>/<页面名>.md` | `<别名>/<子目录>/<页面名>.astro` | 平铺在父文件夹内               |

**禁止**：
- ❌ 二级页面使用平铺式 `.astro` 文件（如 `setup/codex.astro`）
- ❌ 三级页面使用文件夹+index.astro 结构（如 `setup/codex/git/index.astro`）

**原因**：
- 保持路由与内容结构完全对应，降低认知负担
- 二级页面未来如需添加三级子页面，无需重构路由文件
- AI Agent 可根据内容文件路径直接推断路由文件路径，避免误判

**示例**：

```
内容文件：src/content/docs/99-setup/codex/index.md
路由文件：src/pages/setup/codex/index.astro  ✓

内容文件：src/content/docs/99-setup/codex/index.md
路由文件：src/pages/setup/codex.astro  ✗（禁止）
```

---

新增顶级章节（一级）

1. 内容：`src/content/docs/<序号-别名>/index.md`（含 `title`）
2. 路由：`src/pages/<别名>/index.astro` 包裹 `ContentLayout`
3. 导航：在 `src/config/navigation.ts` 添加导航项，在 `src/scripts/docsMap.ts` 添加映射
4. 侧栏：在 `src/scripts/sidebars.ts` 注册路径选择与条目
5. 自检：预览无 404；运行：
   - `npm run preview:search`（含搜索索引的预览）
   - `npm run test:links`（仅站内）
   - `npm run test:e2e`（如有 E2E 变更）

新增二级/三级

1. 内容：
   - 二级：文件夹 + `index.md`（可含子页面）
   - 三级：单页 `.md` 文件（禁止使用"文件夹+index.md"）
2. 路由：
   - 二级：`<别名>/<子目录>/index.astro`（**必须使用文件夹+index.astro**）
   - 三级：`<别名>/<子目录>/<页面名>.astro`（平铺在父文件夹内）
3. 侧栏：二级 `items` 内挂三级链接
4. 自检：二/三级路由均可达；运行上述"自检命令"

修改/删除

- 修改：编辑对应 Markdown/astro
- 删除：同步删除 Markdown 与 astro，并从 `sidebars.ts` 移除条目

**结构调整与迁移（强制约束）**：

- **禁止使用路径重定向**：必须完全删除旧文件夹和路由，重新构建新路由
- **原则**：确保完全一致性、简洁性和可维护性
- **操作要求**：
  1. 迁移内容须落在符合规范的三级单页 .md 结构（如适用），保留 frontmatter 并校正相对资源路径
  2. 删除所有旧路径（内容目录与 pages 路由）及侧栏的旧引用
  3. 更新站内链接与端到端测试，旧路径不得以 301/302/307 等方式重定向到新路径

详情步骤与代码示例：见 CONTRIBUTING.md。

---

## 3.1 三级结构陷阱与强制约束

⚠️ **容错性陷阱**：Astro 的 `getEntry('docs', '01-fish-talks/glossary/ai-concepts')` 可同时识别：

- `glossary/ai-concepts.md`（正确：单页）
- `glossary/ai-concepts/index.md`（错误：文件夹结构）

虽然构建不报错，但后者违反三级规范，会导致结构混乱与路径歧义。

**正确结构**：

```
01-fish-talks/
├── glossary/
│   ├── index.md         # 二级页面
│   ├── ai-concepts.md   # 三级：单页 ✓
│   └── model-params.md  # 三级：单页 ✓
```

**错误结构**（禁止）：

```
01-fish-talks/
├── glossary/
│   ├── ai-concepts/
│   │   └── index.md     # 三级：文件夹+index.md ✗
│   └── model-params/
│       └── index.md     # 三级：文件夹+index.md ✗
```

**原因**：三级已是叶子节点，不再有子层级，使用文件夹结构会破坏层级约定。

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
  - 结论必须包含：构建/预览/链接/E2E 的结果摘要；是否检查了交叉文档引用

示例片段（最小澄清）：

```text
请确认新章节排序号与别名（如 07-playground），我将据此创建内容与路由并接入侧栏。
```

---

## 6. 质量门禁（Definition of Done）

- 路由与侧栏一致、无死链与 404
- 构建/预览通过，无阻断性错误
- 命名/层级/编码（UTF‑8）符合约定（三级必须单页 .md，不得用文件夹+index.md）
- 新增内容标题、层级、侧栏展示正确
- 不产生外部未授权链接与新文件（除非授权）
- 必跑命令完成且通过：`build`、`preview:search`、`test:links`、`check:routes`、`type-check`、`test:e2e`（如适用）
- AI Agent 必须在提交/合并前实际运行并通过：`npm run check:routes` 与 `npm run type-check`
- 相关文档引用已同步

示例片段（自检清单）：

```text
[ ] /playground 可访问
[ ] 左侧栏显示 Playground 并高亮
[ ] npm run build 成功
[ ] 控制台无错误
```

---

## 7. 故障与排障速查

- 404：检查侧栏路径与 `src/pages/**` 是否齐全一致
- Header 高亮错位：应基于"别名"，与中文文案脱钩
- 构建失败：优先检查对象逗号缺失、字符串误含 `\n`
- 三级结构错误：发现 `path/sub/leaf/index.md`，应为 `path/sub/leaf.md`（三级禁止文件夹）
- Windows 终端：确保 UTF‑8

示例片段（排障步骤）：

```text
1) 打开 src/scripts/sidebars.ts，确认 /playground 路径与 items
2) 检查 pages/playground/index.astro 是否存在
3) npm run build 观察报错定位逗号或换行问题
```

---

## 8. 部署与 SEO 约定

- Vercel：Node 20；Build: `npm run build`；Output: `dist`
- 当前策略：默认不收录。
  - BaseLayout 注入 `<meta name="robots" content="noindex, nofollow, noarchive, noimageindex">`
  - `public/robots.txt` 为 `Disallow: /`
  - `vercel.json` 仅为 `/fonts/(.*)` 添加长缓存与 CORS 头，不控制收录

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

## 9. 升级与越权处理

- 超出权限或有不确定性：停止执行 → 提出澄清 → 待授权
- 涉及依赖/配置/结构性变更：先给出影响评估与回滚方案

示例片段（影响评估模板）：

```text
变更：升级 Astro 至 vX.Y
影响：构建脚本与 MDX 解析可能变化
回滚：锁定至当前版本并还原 lockfile
```

---
