---
title: Automation
description: CI/CD、Hooks、Actions 与自动化工作流。
contributors:
  - claude
---

## 自动化是什么

代码写完了，然后呢？测试、构建、部署、通知——这些破事每次都手动搞？

不。让机器干。

自动化就是：**当某件事发生时，自动触发另一件事**。

```text
事件 (Event) --> 触发器 (Trigger) --> 动作 (Action)
```

就这么简单。所有自动化工具都是这个模式的变体。

## 核心概念

| 概念 | 本质 | 例子 |
|:---|:---|:---|
| **Hook** | 事件钩子，某事发生时触发回调 | Git Hook、Webhook、Claude Code Hook |
| **CI** | 持续集成，代码提交后自动测试 | GitHub Actions、GitLab CI |
| **CD** | 持续部署，测试通过后自动发布 | Vercel、Netlify、AWS CodePipeline |
| **Workflow** | 多步骤自动化流程 | GitHub Actions Workflow |

## Git Hooks

Git 内置的钩子机制。在特定 Git 操作前后执行脚本。

```text
git commit --> pre-commit hook --> 检查代码格式
                                   |
                                   +--> 格式不对？阻止提交
```

常用 Hook：

| Hook | 触发时机 | 用途 |
|:---|:---|:---|
| `pre-commit` | commit 前 | 代码格式检查、lint |
| `pre-push` | push 前 | 运行测试 |
| `commit-msg` | 写 commit message 后 | 检查 message 格式 |
| `post-merge` | merge 后 | 自动安装依赖 |

Hook 脚本放在 `.git/hooks/` 目录。想跨团队共享？用 [Husky](https://github.com/typicode/husky)。

```bash
# 安装 husky
npm install husky -D
npx husky init

# 添加 pre-commit hook
echo "npm run lint" > .husky/pre-commit
```

## Webhook

HTTP 回调。当事件发生时，向指定 URL 发 POST 请求。

```text
GitHub 仓库 --> 有人 push --> POST 请求 --> 你的服务器 --> 触发部署
```

和 Git Hook 的区别：
- Git Hook：本地执行，在你机器上跑
- Webhook：远程通知，通过网络发请求

GitHub、GitLab、Discord、Slack 都支持 Webhook。

## GitHub Actions

GitHub 的 CI/CD 服务。免费、强大、和 GitHub 深度集成。

核心概念：

| 概念 | 说明 |
|:---|:---|
| **Workflow** | 自动化流程，定义在 `.github/workflows/*.yml` |
| **Event** | 触发条件（push、PR、定时、手动） |
| **Job** | 一组步骤，跑在同一个 runner 上 |
| **Step** | 单个任务（运行命令或调用 Action） |
| **Action** | 可复用的步骤（别人写好的，直接用） |
| **Runner** | 执行 Job 的机器（GitHub 提供或自建） |

### 实际例子：本站的 CI

这个网站用的就是 GitHub Actions。看 `.github/workflows/check-routes-typecheck.yml`：

```yaml
name: check:routes and type-check

on:
  pull_request:
    branches: [main, master]

jobs:
  validate:
    name: Validate route structure and types
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install minimal deps for Astro check (no-save)
        run: |
          npm i --no-save astro@^5 @astrojs/check@^0.9 @astrojs/mdx@^4 @astrojs/sitemap@^3 typescript@^5

      - name: check:routes
        run: node scripts/check-route-structure.js

      - name: type-check (astro check)
        run: npx astro check
```

这玩意儿干了什么：
1. 有人提 PR 到 main/master 时触发
2. 在 Ubuntu 机器上跑，最多 15 分钟
3. 拉代码、装 Node（带缓存）、装最小依赖
4. 跑路由结构检查（确保内容和路由一一对应）
5. 跑类型检查（Astro + TypeScript）

任何一步挂了？PR 合不进去。就这么简单。

配套的还有 PR 模板（`.github/PULL_REQUEST_TEMPLATE.md`），提醒提交者跑完所有检查：

```markdown
## 质量检查

- [ ] `npm run build` - 构建成功
- [ ] `npm run format` - 代码格式化
- [ ] `npm run check:routes` - 路由结构验证
- [ ] `npm run type-check` - 类型检查通过
- [ ] `npm run test:links` - 站内链接检查
- [ ] `npm run test:e2e` - E2E 测试
```

CI 自动跑一部分，剩下的靠人工勾选。信任但验证。

## CI/CD 流水线

CI（持续集成）和 CD（持续部署）是一套完整的自动化流程。

```text
代码提交 --> 自动测试 --> 自动构建 --> 自动部署
   |           |            |            |
   v           v            v            v
  Push      CI 阶段      Build       CD 阶段
```

典型流水线：

```yaml
name: CI/CD

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test

  build:
    needs: test  # 测试通过才构建
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build

  deploy:
    needs: build  # 构建通过才部署
    runs-on: ubuntu-latest
    steps:
      - run: echo "部署到生产环境"
```

## Claude Code Hooks

Claude Code 的自动化机制。当特定事件发生时，自动执行 Agent 任务。

触发事件：
- 发送消息时
- Agent 执行完成时
- 新会话创建时
- 保存文件时

用途示例：
- 保存代码文件时，自动运行测试
- 更新翻译文件时，同步其他语言
- 手动触发拼写检查

和 Git Hook 的区别：
- Git Hook：Git 操作触发，跑脚本
- Claude Code Hook：IDE 事件触发，跑 Agent

## 其他自动化工具

| 工具 | 用途 |
|:---|:---|
| [pre-commit](https://pre-commit.com/) | 多语言 Git Hook 管理 |
| [lint-staged](https://github.com/lint-staged/lint-staged) | 只对暂存文件跑 lint |
| [Renovate](https://github.com/renovatebot/renovate) | 自动更新依赖 |
| [Dependabot](https://github.com/dependabot) | GitHub 原生依赖更新 |
| [semantic-release](https://github.com/semantic-release/semantic-release) | 自动版本号和发布 |
| [Changesets](https://github.com/changesets/changesets) | Monorepo 版本管理 |

## 选择建议

| 场景 | 推荐 |
|:---|:---|
| 本地代码检查 | Git Hook + Husky + lint-staged |
| 自动测试 | GitHub Actions |
| 自动部署 | Vercel / Netlify（静态站）或 GitHub Actions |
| 依赖更新 | Renovate 或 Dependabot |
| IDE 自动化 | Claude Code Hooks |

## 总结

- **Hook**：事件触发回调
- **CI**：提交后自动测试
- **CD**：测试后自动部署
- **Workflow**：多步骤流程编排

自动化的目的：**让机器干重复的活，你专注写代码**。

别手动跑测试。别手动部署。别手动检查格式。

写好配置，让机器伺候你。
