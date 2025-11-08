# CONTRIBUTING.md （开发维护贡献者手册）
# CONTRIBUTING.md （开发维护贡献者手册）

本指南面向维护者与贡献者，概述了本项目的目录规范、内容新增流程、路由与侧栏维护、提交流程与质量门禁等要求。

## 目录与排序规则

- 顶层严格递增：01-fish-talks、02-basic-usage、03-prompts、04-advanced、05-fun、06-resources、99-setup（置底）

- 顶层严格递增：01-fish-talks、02-basic-usage、03-prompts、04-advanced、05-fun、06-resources、99-setup（置底）
- 不允许跳号；新增一级目录按顺序加 1；Setup 固定使用 99-setup
- 已移除：tech（技术向）、demo（DEMO）。原“技术向”内容已合并到 06-resources 下的两个二级页面（2API、云平台）

## 内容结构与 Frontmatter


- 深度最多 3 级：
  - 一级/二级：文件夹 + index.md（可含子页面）
  - 三级：单页 `.md` 文件（**禁止**使用"文件夹+index.md"）

**正确示例**：

```
03-prompts/
├── index.md              # 一级 ✓
├── context/
│   ├── index.md          # 二级 ✓
│   ├── dialogue-levels.md  # 三级 ✓
│   └── request-body.md     # 三级 ✓
```

**错误示例**（勿模仿）：

```
03-prompts/
├── context/
│   ├── dialogue-levels/
│   │   └── index.md      # 三级用文件夹 ✗
```

```
03-prompts/
└── context.md     # 二级用单文件 ✗
```

  - 一级/二级：文件夹 + index.md（可含子页面）
  - 三级：单页 `.md` 文件（**禁止**使用"文件夹+index.md"）

**正确示例**：

```
03-prompts/
├── index.md              # 一级 ✓
├── context/
│   ├── index.md          # 二级 ✓
│   ├── dialogue-levels.md  # 三级 ✓
│   └── request-body.md     # 三级 ✓
```

**错误示例**（勿模仿）：

```
03-prompts/
├── context/
│   ├── dialogue-levels/
│   │   └── index.md      # 三级用文件夹 ✗
```

```
03-prompts/
└── context.md     # 二级用单文件 ✗
```

- 所有内容文件必须包含 frontmatter：


```yaml
---
title: 标题（必填）
description: 简短描述（必填，未填将导致构建失败）
---
```

## Astro 路由文件结构规范（强制约束）

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

## Astro 路由文件结构规范（强制约束）

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

## 新增内容的标准流程（示例）

1. 新增一级章节（假设 08-playground）

- 内容：`src/content/docs/08-playground/index.md`
- 路由：`src/pages/playground/index.astro` 读取 `getEntry('docs','08-playground')`
- 导航：在 `src/config/navigation.ts` 添加导航项 `{ key: 'playground', href: '/playground', label: '名称' }`
- 映射：在 `src/scripts/docsMap.ts` 添加 `playground: '08-playground'`
- 侧栏：在 `sidebars.ts` 中为 `/playground` 注册对应条目

1. 新增一级章节（假设 08-playground）

- 内容：`src/content/docs/08-playground/index.md`
- 路由：`src/pages/playground/index.astro` 读取 `getEntry('docs','08-playground')`
- 导航：在 `src/config/navigation.ts` 添加导航项 `{ key: 'playground', href: '/playground', label: '名称' }`
- 映射：在 `src/scripts/docsMap.ts` 添加 `playground: '08-playground'`
- 侧栏：在 `sidebars.ts` 中为 `/playground` 注册对应条目

2. 新增二级 + 三级页面（以 prompts 为例）

2. 新增二级 + 三级页面（以 prompts 为例）

- 内容：
  - `src/content/docs/03-prompts/best-practices/index.md`（二级）
  - `src/content/docs/03-prompts/best-practices/tracing.md`（三级）
  - `src/content/docs/03-prompts/best-practices/index.md`（二级）
  - `src/content/docs/03-prompts/best-practices/tracing.md`（三级）
- 路由：
  - `src/pages/prompts/best-practices/index.astro`（**二级必须使用文件夹+index.astro**）
  - `src/pages/prompts/best-practices/tracing.astro`（三级平铺在父文件夹内）
  - `src/pages/prompts/best-practices/index.astro`（**二级必须使用文件夹+index.astro**）
  - `src/pages/prompts/best-practices/tracing.astro`（三级平铺在父文件夹内）
- 侧栏：向 `PROMPTS_SIDEBAR` 添加二级与三级链接

3. 修改/删除内容

3. 修改/删除内容

- 修改：编辑对应 Markdown/astro
- 删除：删除 Markdown 与 astro 页面，并从 `sidebars.ts` 移除对应链接，防止死链

4. 结构调整与迁移（强制规范）

**禁止使用路径重定向**，进行内容结构调整时必须遵循以下原则：

- **完全删除旧路径**：同步删除旧的内容目录（`src/content/docs/**`）和路由文件（`src/pages/**`）
- **重新构建新路由**：按新结构创建内容和路由，确保符合三级规范（三级必须使用单页 .md）
- **更新所有引用**：修改侧栏配置、站内链接、测试用例中的路径引用
- **禁止重定向**：不得在 `vercel.json`、`astro.config.mjs` 或其他配置文件中添加 301/302/307 等重定向规则
- **质量保证**：确保完全一致性、简洁性和可维护性，避免路径歧义和维护负担

4. 结构调整与迁移（强制规范）

**禁止使用路径重定向**，进行内容结构调整时必须遵循以下原则：

- **完全删除旧路径**：同步删除旧的内容目录（`src/content/docs/**`）和路由文件（`src/pages/**`）
- **重新构建新路由**：按新结构创建内容和路由，确保符合三级规范（三级必须使用单页 .md）
- **更新所有引用**：修改侧栏配置、站内链接、测试用例中的路径引用
- **禁止重定向**：不得在 `vercel.json`、`astro.config.mjs` 或其他配置文件中添加 301/302/307 等重定向规则
- **质量保证**：确保完全一致性、简洁性和可维护性，避免路径歧义和维护负担

## 特殊约定


- 06-resources（二级）：
  - 2API：仅罗列原技术向/2API 的条目
  - 云平台：仅罗列原“部署平台”的条目
- 99-setup：
  - 将“环境准备”拆分为二级直达页（Terminal、VS Code、Node.js、GitHub、VPN）
  - Cherry Studio 合并为单页 `setup/cherrystudio`

## 自定义 Markdown 扩展语法

本项目使用 `remark-directive` 插件扩展了标准 Markdown 语法，支持以下自定义指令：

### Spoiler（文本遮罩）

用于隐藏敏感信息或剧透内容，点击后显示。

**行内语法**：

```markdown
联系方式 :spoiler[866811662]
```

**块级语法（容器）**：

```markdown
:::spoiler
这是一段被隐藏的内容
可以包含多行文本
:::
```

**块级语法（叶子节点）**：

```markdown
::spoiler[单行隐藏内容]
```

**渲染效果**：

- 默认状态：显示为灰色遮罩，提示"点击查看"或"点击查看隐藏内容"
- 点击后：显示真实内容，带有淡入动画效果
- 支持键盘访问（Tab + Enter/Space）

**适用场景**：

- 隐藏联系方式、邀请码等敏感信息
- 隐藏剧透内容或答案
- 需要用户主动确认才显示的内容

**技术实现**：

- 插件：`remark-directive` + 自定义处理器 `src/plugins/remark-spoiler-directive.js`
- 样式：`src/styles/global.css` 中的 `.spoiler` 相关类
- 交互：`public/scripts/spoiler.js` 处理点击事件

## 自定义 Markdown 扩展语法

本项目使用 `remark-directive` 插件扩展了标准 Markdown 语法，支持以下自定义指令：

### Spoiler（文本遮罩）

用于隐藏敏感信息或剧透内容，点击后显示。

**行内语法**：

```markdown
联系方式 :spoiler[866811662]
```

**块级语法（容器）**：

```markdown
:::spoiler
这是一段被隐藏的内容
可以包含多行文本
:::
```

**块级语法（叶子节点）**：

```markdown
::spoiler[单行隐藏内容]
```

**渲染效果**：

- 默认状态：显示为灰色遮罩，提示"点击查看"或"点击查看隐藏内容"
- 点击后：显示真实内容，带有淡入动画效果
- 支持键盘访问（Tab + Enter/Space）

**适用场景**：

- 隐藏联系方式、邀请码等敏感信息
- 隐藏剧透内容或答案
- 需要用户主动确认才显示的内容

**技术实现**：

- 插件：`remark-directive` + 自定义处理器 `src/plugins/remark-spoiler-directive.js`
- 样式：`src/styles/global.css` 中的 `.spoiler` 相关类
- 交互：`public/scripts/spoiler.js` 处理点击事件

## 命名规范


- 目录与文件：kebab-case（如 `best-practices`）
- 组件：PascalCase；脚本：camelCase
- 顶层目录：`NN-alias` 两位数字 + 别名（如 `03-prompts`）

## 开发与验证


- 安装与开发：


```bash
npm install
npm run dev   # 默认 4321（Playwright 测试会复用 4321）
```

- 构建与预览与链接检测：


- 构建与预览与链接检测：

```bash
npm run build
npm run preview
npm run test:links  # 站内死链/断链扫描（基于 dist/）
npm run lint:markdown  # 校验 Markdown 代码块闭合与语法
npm run test:links  # 站内死链/断链扫描（基于 dist/）
npm run lint:markdown  # 校验 Markdown 代码块闭合与语法
```


- 格式化：


```bash
npm run format
```


- 端到端测试（Playwright）：


```bash
npm run test:e2e
npm run test:e2e:headed
```

必跑校验（加强版）

- 构建：`npm run build`
- Markdown 代码块：`npm run lint:markdown`
- 预览（含搜索索引）：`npm run preview:search`
- 站内链接：`npm run test:links`
- 类型检查：`npm run type-check`
- 路由结构检查：`npm run check:routes`


命令说明（关键两项）：

- 路由结构检查（check:routes）：校验一级/二级/三级内容与路由一一镜像，禁止二级平铺 .astro，禁止三级“文件夹+index”；发现不一致将以非 0 退出码失败，并定位缺失/多余/非法路径。
- 类型检查（type-check）：基于 astro check，覆盖 .astro（前置脚本/模板/props）、相关 TS/JS 以及 Content Collections；要求 0 errors / 0 warnings。提示级 hints（如 is:inline）为信息提示，不阻塞提交。

- 端到端测试：`npm run test:e2e`（如有 E2E 场景变更，需新增/更新用例）

## 与 AI 协作

- 本仓库面向多类 AI Agent，通用行为与边界请见 AGENTS.md。
- 使用 AI 工具前，请在对话开头明确要求其严格遵循 AGENTS.md，并告知本文件是流程与实现的唯一事实源。
- 流程细节（目录/层级/路由/侧栏/提交规范）以本文件为准。

必跑校验（加强版）

- 构建：`npm run build`
- Markdown 代码块：`npm run lint:markdown`
- 预览（含搜索索引）：`npm run preview:search`
- 站内链接：`npm run test:links`
- 类型检查：`npm run type-check`
- 路由结构检查：`npm run check:routes`


命令说明（关键两项）：

- 路由结构检查（check:routes）：校验一级/二级/三级内容与路由一一镜像，禁止二级平铺 .astro，禁止三级“文件夹+index”；发现不一致将以非 0 退出码失败，并定位缺失/多余/非法路径。
- 类型检查（type-check）：基于 astro check，覆盖 .astro（前置脚本/模板/props）、相关 TS/JS 以及 Content Collections；要求 0 errors / 0 warnings。提示级 hints（如 is:inline）为信息提示，不阻塞提交。

- 端到端测试：`npm run test:e2e`（如有 E2E 场景变更，需新增/更新用例）

## 与 AI 协作

- 本仓库面向多类 AI Agent，通用行为与边界请见 AGENTS.md。
- 使用 AI 工具前，请在对话开头明确要求其严格遵循 AGENTS.md，并告知本文件是流程与实现的唯一事实源。
- 流程细节（目录/层级/路由/侧栏/提交规范）以本文件为准。

## 提交信息与分支

### Commit Message 规范

本项目遵循 **Conventional Commits** 规范，使用英文编写提交信息。

#### 提交类型（Type）

常见的提交类型包括：

- **init**: 初始化
- **release**: 发布新版本（在用户指定这是网站的某个新版本时）
- **style**: 代码风格修改（不影响代码运行的变动）
- **feat**: 添加新功能（如增加一个评论系统）
- **ui/ux**: 涉及到网站 UI 和 UX 的改动
- **fix**: 修复 bug
- **docs**: 对文档进行修改（专门指开发维护文档）
- **refactor**: 代码重构或者网站内容结构调整（既不是新增功能，也不是修改 bug 的代码变动）
- **perf**: 提高性能的代码修改
- **dx**: 优化开发体验
- **workflow**: 工作流变动（如增添新的 actions 或者 ci 配置文件，或者定义新的工作流规范）
- **types**: 类型声明修改
- **wip**: 工作正在进行中（由用户指明）
- **test**: 测试用例添加及修改
- **build**: 影响构建系统或外部依赖关系的更改
- **chore**: 其它不涉及源码以及测试的修改
- **deps**: 依赖项修改

#### 格式要求

```
[type][optional scope]: [description in English]

[optional body]

[optional footer]
```

**规则**：

- 使用英文编写所有 commit message
- 主题行不应超过 72 个字符
- 正文应在 72 个字符处换行
- 在主题行中使用祈使句和现在时（如 "add" 而非 "added"）
- 主题行结尾不要加句号
- 用空白行将主题与正文分开
- 使用正文解释做了什么和为什么，而不是如何做
- 如果提交引入了破坏性更改，在类型/范围后面加上感叹号（如 `feat!:`）
- 破坏性更改须在提交正文的末尾描述，以 "BREAKING CHANGE:" 开头

#### Scope（范围）使用规范

Scope 是可选的括号内容，用于说明改动影响的具体模块或领域。

**使用规则**：

- **单模块改动**：必须加 scope
  - 示例：`feat(search): add keyboard shortcuts`
  - 示例：`fix(sidebar): resolve collapse animation`
  - 示例：`docs(prompts): add advanced examples`

- **跨模块/全局改动**：不加 scope
  - 示例：`refactor: restructure entire content hierarchy`
  - 示例：`docs: establish commit conventions`

- **Merge commits**：不加 scope
  - 示例：`chore: merge PR #54 - content improvements`

**常见 scope 示例**：

- 功能模块：`search`, `sidebar`, `header`, `footer`, `toc`
- 内容章节：`prompts`, `setup`, `resources`, `glossary`
- 技术领域：`routing`, `navigation`, `ui`, `style`, `seo`
- 基础设施：`deps`, `build`, `ci`, `config`

#### 多类型提交

**特别注意**：如果主题符合多个提交类型，请用 `+` 连接，如 `docs+fix:`。一般不同时超过 3 个类型，尽量以一个主要类型为准。

**示例**：同时修复 bug 并增加开发维护文档时使用 `docs+fix:`。注意：如果是单纯 fix 后顺带更新文档，则不属于此类范围。

#### 提交信息示例

```
feat(sidebar): add sidebar collapse functionality

Enhance user experience by adding sidebar collapse/expand
interaction with state persistence.

Implementation details:
- Use localStorage to persist collapse state
- Add smooth expand/collapse animation
```

```
fix: resolve mobile navigation menu click issue

Navigation menu items fail to redirect correctly on small
screen devices. The issue was caused by prevented event
bubbling and has been fixed.
```

```
docs+dx: improve contribution guide and dev scripts

- Add commit message conventions to CONTRIBUTING.md
- Optimize npm scripts with new check:routes command
```

### 分支与工作流
  - 保护分支：`main`（禁止直接提交，默认仅超级管理员可 push）
  - 创建分支：从远程 `main` 新建并切换
    - 示例：`git fetch origin && git checkout -b feature/<短描述> origin/main`
  - 提交与推送：本地小步提交，推送远程同名分支
  - 合并方式：一律通过 PR 合入 `main`，禁止直接在 `main` 提交
  - 合并前：确保 `npm run build`、`npm run test:links` 通过

### CI 校验（PR 自动）

- 触发：向 `main` 或 `master` 提交 PR 时，GitHub Actions 会自动运行以下校验：
  - 路由结构：`node scripts/check-route-structure.js`（等价于 `npm run check:routes`）
  - 类型检查：`astro check`（等价于 `npm run type-check`）
- 任一失败将导致 CI 标红，阻止合并；建议在本地先运行 `npm run check:routes` 与 `npm run type-check` 保证通过。
- 说明：AI/Copilot Review 属“建议性”检查；CI 属“强制性”门禁；人工 Review 在 CI 通过后进行最终把关。


## 变更登记与交叉维护

- 使用清晰的提交信息与 PR 描述记录变更（包含 Why/What/How 与验证结果摘要）
- 自查并同步相关文档引用：README.md、AGENTS.md、CONTRIBUTING.md、WARP/CLAUDE/CURSOR.md
- 提交信息建议包含 Why/What/How 与验证结果摘要

## PR 检查清单（见 .github/PULL_REQUEST_TEMPLATE.md）


- 顶层编号是否按顺序（01..06、99）且未跳号
- 新增页面是否包含必填 frontmatter `title`、`description`
- 路由 `.astro` 与内容路径一致（getEntry）
- 侧栏/导航是否同步更新
- 构建是否通过、无 404 与死链

## 结构反模式（禁止）

- ❌ 二级使用"名字.md"（如 `03-prompts/best-practices.md`）
- ❌ 三级使用"文件夹+index.md"（如 `glossary/ai-concepts/index.md`）
- ❌ 超过三级深度（如 `prompts/context/levels/basic/index.md`）
- ❌ 二级路径与三级路径重复（如同时存在 `01-fish-talks/model-params/` 和 `01-fish-talks/glossary/model-params/`）

**原因**：

- Astro 的 `getEntry` 对两种结构都能识别，不会报错
- 但"文件夹+index.md"用于三级会破坏层级约定，导致后续维护混乱

## 结构反模式（禁止）

- ❌ 二级使用"名字.md"（如 `03-prompts/best-practices.md`）
- ❌ 三级使用"文件夹+index.md"（如 `glossary/ai-concepts/index.md`）
- ❌ 超过三级深度（如 `prompts/context/levels/basic/index.md`）
- ❌ 二级路径与三级路径重复（如同时存在 `01-fish-talks/model-params/` 和 `01-fish-talks/glossary/model-params/`）

**原因**：

- Astro 的 `getEntry` 对两种结构都能识别，不会报错
- 但"文件夹+index.md"用于三级会破坏层级约定，导致后续维护混乱

## 常见问题


- 构建报错 description 必填：为该内容文件补充 frontmatter `description`
- 页面 404：请同时检查内容文件、路由文件与侧栏条目是否一一对应
- Header 高亮错位：使用别名匹配，不与中文文案直接绑定
