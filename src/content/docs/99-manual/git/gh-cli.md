---
title: Git - gh CLI
description: GitHub CLI 与 AI 编程助手集成
contributors:
  - claude
tab:
  label: gh CLI
  order: 30
---

**gh** 是 GitHub 官方命令行工具。对 AI 编程助手极其重要，因为它让 AI 可以：
- 自动创建 PR
- 拉取 Issue 内容
- 读取 Review 意见并修复
- 管理 workflow

## 安装

```bash
winget install GitHub.cli
```

验证：
```bash
gh --version
```

## 认证

```bash
gh auth login
```

选择 GitHub.com → HTTPS → 浏览器授权。

认证状态：
```bash
gh auth status
```

## AI 编程助手的核心用法

### 拉取 Issue 信息

AI 助手可以用这些命令获取上下文：

```bash
# 列出 issue
gh issue list

# 查看特定 issue 详情
gh issue view 123

# 查看 issue 评论
gh issue view 123 --comments
```

### 创建 PR

AI 助手修复代码后自动创建 PR：

```bash
# 创建 PR（交互式）
gh pr create

# 一行命令创建
gh pr create --title "Fix: resolve issue #123" --body "Fixes #123"

# 从当前分支创建，自动填充
gh pr create --fill
```

### 读取 Review 意见

AI 助手读取 review 并修复：

```bash
# 查看 PR 详情
gh pr view 456

# 查看 review 评论
gh pr view 456 --comments

# 查看 diff
gh pr diff 456
```

### 其他常用命令

```bash
# 查看自己待处理的 PR
gh pr status

# checkout 某个 PR 到本地
gh pr checkout 456

# 合并 PR
gh pr merge 456

# 运行 workflow
gh workflow run build.yml
```

---

## Claude Code / Cursor 集成

现代 AI 编程助手（Claude Code、Cursor、Cline）可以直接调用 gh CLI。

### 典型工作流

1. **AI 读取 Issue**
   ```
   用户：帮我修复 issue #123
   AI：gh issue view 123 → 获取问题描述
   ```

2. **AI 修改代码**
   ```
   AI：分析问题 → 修改相关文件
   ```

3. **AI 创建 PR**
   ```
   AI：git commit → git push → gh pr create
   ```

4. **AI 处理 Review**
   ```
   用户：reviewer 说需要修改
   AI：gh pr view --comments → 读取意见 → 修改 → push
   ```

### 权限配置

确保 gh 有足够权限：

```bash
gh auth refresh -s repo,workflow
```

---

## 常用 alias

在 `~/.gitconfig` 或 shell 配置中添加：

```bash
alias ghi='gh issue'
alias ghp='gh pr'
alias ghil='gh issue list'
alias ghpl='gh pr list'
```

## gh 扩展

gh 支持社区扩展：

```bash
# 安装 copilot 扩展
gh extension install github/gh-copilot

# 安装 dash 扩展（仪表盘）
gh extension install dlvhdr/gh-dash

# 列出已安装扩展
gh extension list
```
