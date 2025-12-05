---
title: Git - 工具与插件
description: Git 相关工具、VS Code 插件、CLI 增强
contributors:
  - claude
tab:
  label: 工具与插件
  order: 50
---

Git 生态系统中有大量提升效率的工具，从 CLI 增强到 VS Code 插件。

## CLI 工具

### lazygit（推荐）

终端中的 Git 图形界面，键盘驱动，极大提升效率。

```bash
winget install lazygit
```

功能：
- 可视化分支、提交、diff
- 交互式 rebase、cherry-pick
- 解决合并冲突
- 鼠标 + 键盘操作

```bash
# 在仓库目录运行
lazygit
```

### delta

让 `git diff` 输出更美观，支持语法高亮、行号、side-by-side。

```bash
winget install dandavison.delta
```

配置 `~/.gitconfig`：
```ini
[core]
    pager = delta

[interactive]
    diffFilter = delta --color-only

[delta]
    navigate = true
    side-by-side = true
    line-numbers = true
```

### onefetch

仓库信息一览，类似 neofetch 但针对 Git 仓库。

```bash
winget install onefetch
```

```bash
cd your-repo
onefetch
```

显示：语言分布、提交统计、贡献者、依赖信息等。

### git-worktree-runner (gtr)

CodeRabbit 2025 年发布的新工具，专为 AI 编程助手设计。

```bash
# 安装
npm install -g @coderabbitai/git-worktree-runner
# 或
brew install coderabbitai/tap/gtr
```

功能：
- 为每个分支自动创建隔离 worktree
- 自动复制配置、安装依赖
- 与 VS Code、Cursor、Aider 集成

```bash
# 创建 worktree 并打开编辑器
gtr create feature-branch

# 列出 worktree
gtr list

# 清理
gtr clean
```

**适用场景**：让 AI 助手在独立 worktree 中工作，不影响主分支。

---

## VS Code 插件

### GitLens（必装）

[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - Git 增强的王者。

功能：
- **行内 blame**：每行代码显示最后修改者
- **文件历史**：可视化文件变更时间线
- **分支对比**：比较不同分支的差异
- **搜索提交**：按作者、消息、文件搜索

### Git Graph

[Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) - 可视化分支图。

功能：
- 分支、合并可视化
- 右键快捷操作（checkout、merge、rebase）
- 比较任意两个提交

### Git History

[Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory) - 文件/行历史查看。

```
右键文件 → Git: View File History
```

### Git Blame

[Git Blame](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame) - 状态栏显示当前行作者。

比 GitLens 轻量，只做 blame 一件事。

---

## AI 代码审查工具

### CodeRabbit CLI

AI 驱动的代码审查，本地运行：

```bash
npm install -g coderabbit
```

```bash
# 审查暂存的更改
coderabbit review

# 审查特定提交
coderabbit review HEAD~3..HEAD

# 审查 PR（需要配置）
coderabbit review --pr 123
```

### Graphite

[Graphite](https://graphite.dev/) - 堆叠 PR 管理工具。

```bash
# 安装
npm install -g @withgraphite/graphite-cli

# 创建堆叠分支
gt branch create feature-a
gt branch create feature-b  # 基于 feature-a
gt submit  # 一键创建所有 PR
```

适合大型功能拆分成多个小 PR 的工作流。

---

## 其他实用工具

| 工具 | 用途 | 安装 |
| --- | --- | --- |
| [tig](https://github.com/jonas/tig) | 文本模式 Git 浏览器 | `winget install tig` |
| [git-absorb](https://github.com/tummychow/git-absorb) | 自动 fixup 提交 | `cargo install git-absorb` |
| [git-standup](https://github.com/kamranahmedse/git-standup) | 查看最近工作 | `npm install -g git-standup` |
| [git-extras](https://github.com/tj/git-extras) | 额外 Git 命令集 | `brew install git-extras` |

---

## 配置推荐

把常用工具整合到 Git 配置中：

```ini
# ~/.gitconfig
[alias]
    lg = log --graph --oneline --decorate --all
    st = status -sb
    co = checkout
    br = branch
    ci = commit
    last = log -1 HEAD
    unstage = reset HEAD --
    visual = !lazygit

[diff]
    colorMoved = default

[merge]
    conflictstyle = diff3
```

使用：
```bash
git lg      # 漂亮的日志
git visual  # 打开 lazygit
```
