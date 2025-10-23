---
title: Git配置
description: Git 版本管理基础、VSCode 插件配置、多账号管理、GitHub 集成、Actions 自动化和团队协作实践。
---

## Why Git

这里我突然想到了Linus五天开发出Git并且开源的故事了，而GitHub GitLab均是其他团队以此的衍生产品，写代码最重要的是什么！————当然是**版本管理**了，你也不想让你的代码被AI `rm-rf`或者乱改一通从而哭爹喊娘吧，你也好奇多个成员怎么协作吧，那么git + github 就是不二之选。

## Install

GitHub 不仅是代码托管平台，更是现代开发者不可或缺的身份标识：
- **代码托管与版本控制**：免费的私有仓库托管，完整的 Git 版本管理功能
- **开发者身份认证**：GitHub 账号已成为开发者职业身份的证明
- **开源社区参与**：贡献开源项目、参与技术讨论、建立个人影响力
- **技术栈整合**：与众多开发工具和服务深度集成

### 必须使用 GitHub 登录的服务

许多现代开发服务都要求 GitHub 账号登录：

- **Deno Deploy**：Deno 的云部署平台
- **Vercel**：前端应用的快速部署平台
- **Netlify**：静态站点和无服务器函数部署
- **Railway**：全栈应用的云部署平台
- **Supabase**：开源的 Firebase 替代品
- **Render**：云应用部署平台
- **Koyeb**：云原生应用部署平台

## Git 基础命令

### 仓库初始化与克隆

```bash
# 初始化本地仓库
git init

# 克隆远程仓库
git clone https://github.com/username/repository.git

# 查看仓库状态
git status
```
### 文件操作基础

```bash
# 添加文件到暂存区
git add filename.txt
git add .  # 添加所有文件

# 提交更改
git commit -m "提交说明"

# 查看提交历史
git log --oneline
```
### 远程仓库操作

```bash
# 添加远程仓库
git remote add origin https://github.com/username/repository.git

# 推送本地提交到远程
git push -u origin main

# 拉取远程最新更改
git pull origin main
```
## Git 版本管理操作

### 分支管理

```bash
# 查看所有分支
git branch -a

# 创建新分支
git branch feature/new-feature

# 切换分支
git checkout feature/new-feature
git switch feature/new-feature  # Git 2.23+

# 创建并切换到新分支
git checkout -b feature/new-feature
git switch -c feature/new-feature  # Git 2.23+

# 删除分支
git branch -d feature/completed-feature
git branch -D feature/abandoned-feature  # 强制删除
```
### 合并与变基

```bash
# 合并分支（创建合并提交）
git checkout main
git merge feature/new-feature

# 变基
git checkout feature/new-feature
git rebase main

# 交互式变基
git rebase -i HEAD~3
```
### 冲突解决

当合并或变基时发生冲突：

```bash
# 查看冲突状态
git status

# 编辑冲突文件，解决冲突标记
# <<<<<<< HEAD
# 当前分支内容
# =======
# 合并分支内容
# >>>>>>> feature/branch

# 标记冲突已解决
git add resolved-file.txt

# 完成合并
git commit
```
### 版本回退

```bash
# 软回退（保留更改在暂存区）
git reset --soft HEAD~1

# 混合回退（保留更改在工作区）
git reset HEAD~1  # 或 --mixed

# 硬回退（完全删除更改）
git reset --hard HEAD~1

# 撤销特定提交
git revert commit-hash
```
### 标签管理

```bash
# 创建轻量标签
git tag v1.0.0

# 创建附注标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送标签到远程
git push origin v1.0.0
git push origin --tags  # 推送所有标签
```
## Git VSCode 插件推荐和配置

### 核心 Git 插件

#### GitLens

增强 Git 功能的核心插件：

```json
{
  "gitlens.currentLine.enabled": false,
  "gitlens.hovers.currentLine.over": "line",
  "gitlens.showWelcomeOnInstall": false,
  "gitlens.showWhatsNewAfterUpgrades": false
}
```
#### Git History

可视化提交历史和分支图：

```json
{
  "gitHistory.showFileHistory": true,
  "gitHistory.showFolderHistory": true
}
```
#### Git Graph

交互式分支可视化：

```json
{
  "git-graph.maxDepthOfRepoSearch": 10,
  "git-graph.showStatusBarItem": true
}
```
### AI 辅助编程

#### GitHub Copilot

AI 代码补全和建议：

```json
{
  "github.copilot.enable": {
    "*": true
  },
  "github.copilot.editor.enableAutoCompletions": true
}
```
### 配置建议

```json
{
  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  "git.autofetch": true,
  "git.defaultCloneDirectory": "D:\\Projects",
  "git.ignoreLegacyWarning": true
}
```
## Git Bash 使用指南

### Git Bash 简介

Git Bash 是 Windows 环境下完整的 Bash 模拟环境，提供：

- **Linux 风格命令行**：完整的 Bash shell 体验
- **Git 集成**：内置 Git 命令支持
- **SSH 客户端**：内置 OpenSSH 支持
- **包管理**：通过 pacman 安装额外工具

### 常用 Shell 命令

```bash
# 文件和目录操作
ls -la          # 详细列表显示
cd directory    # 切换目录
mkdir folder    # 创建目录
rm file.txt     # 删除文件
rm -rf folder   # 删除目录

# 文本处理
cat file.txt    # 显示文件内容
head -10 file.txt    # 显示前10行
tail -10 file.txt    # 显示后10行
grep "pattern" file.txt  # 搜索文本

# 权限管理
chmod +x script.sh    # 添加执行权限
chown user:group file.txt  # 更改所有者
```
### Git Bash 与 Windows 命令行的区别

| 操作       | Windows CMD     | Git Bash                   |
| ---------- | --------------- | -------------------------- |
| 路径分隔符 | `\`             | `/`                        |
| 根目录     | `C:\`           | `/c/`                      |
| 家目录     | `%USERPROFILE%` | `~` 或 `/c/Users/username` |
| 命令大小写 | 敏感            | 敏感                       |

### 实用技巧

```bash
# 命令历史
history        # 查看命令历史
!!            # 执行上一条命令
!10           # 执行历史第10条命令

# 快捷键
Ctrl+R        # 反向搜索历史命令
Ctrl+L        # 清屏
Ctrl+C        # 终止当前命令
Ctrl+D        # 退出或发送EOF

# 别名设置
echo "alias gs='git status'" >> ~/.bashrc
source ~/.bashrc
```
## 多 GitHub 账号管理

### SSH 密钥配置

#### 生成 SSH 密钥对

```bash
# 生成个人账号密钥
ssh-keygen -t ed25519 -C "personal@example.com" -f ~/.ssh/id_ed25519_personal

# 生成工作账号密钥
ssh-keygen -t ed25519 -C "work@company.com" -f ~/.ssh/id_ed25519_work
```
#### 配置 SSH 客户端

编辑 `~/.ssh/config` 文件：

```bash
# Personal GitHub account
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal

# Work GitHub account
Host work-github
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
```
### Git 配置管理

#### 全局配置

```bash
# 设置全局用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 查看配置
git config --global --list
```
#### 项目级配置

```bash
# 在项目目录中设置特定配置
cd /path/to/project
git config user.name "Work Name"
git config user.email "work.email@company.com"
```
#### 条件配置（推荐）

使用 `.gitconfig` 文件进行条件配置：

```bash
# 编辑全局 .gitconfig
git config --global --edit
```
添加条件配置：

```ini
[user]
    name = Personal Name
    email = personal@example.com

[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work

[includeIf "gitdir:~/personal/"]
    path = ~/.gitconfig-personal
```
创建工作配置 `~/.gitconfig-work`：

```ini
[user]
    name = Work Name
    email = work@company.com
```
### 不同项目的账号切换

```bash
# 个人项目使用个人账号
git clone git@github-personal:username/repo.git ~/personal/project

# 工作项目使用工作账号
git clone git@work-github:organization/repo.git ~/work/project
```
### 常见问题解决

#### SSH 连接测试

```bash
# 测试个人账号连接
ssh -T git@github-personal

# 测试工作账号连接
ssh -T git@work-github
```
#### 权限问题排查

```bash
# 检查 SSH 代理状态
ssh-add -l

# 添加密钥到代理
ssh-add ~/.ssh/id_ed25519_personal
ssh-add ~/.ssh/id_ed25519_work
```
## GitHub Actions 基础介绍

### Actions 概念和工作原理

GitHub Actions 是 GitHub 提供的 CI/CD 平台：

- **事件驱动**：响应仓库事件自动触发
- **工作流定义**：使用 YAML 文件定义自动化流程
- **市场丰富**：数千个预建 Actions 可直接使用
- **多平台支持**：Linux、Windows、macOS

### 工作流文件结构

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
```
### 常用工作流示例

#### Node.js 项目 CI

```yaml
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm run build --if-present
      - run: npm test
```
#### 自动部署

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        run: |
          npm i -g vercel
          vercel --prod --yes
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```
### 市场热门 Actions

- **actions/checkout**：检出代码
- **actions/setup-node**：设置 Node.js 环境
- **actions/setup-python**：设置 Python 环境
- **codecov/codecov-action**：代码覆盖率报告
- **docker/build-push-action**：构建和推送 Docker 镜像

## 团队协作实例

### 项目成员管理和权限设置

#### 仓库权限配置

1. **组织级别权限**：
   - Owner：完全控制权
   - Member：默认成员权限
   - Billing Manager：账单管理

2. **仓库级别权限**：
   - Admin：完全控制
   - Write：读写权限
   - Read：只读权限
   - Triage：问题管理和标签权限

#### 邀请协作者

```bash
# 通过 GitHub 界面邀请协作者
# Settings → Collaborators → Add people
```
### Pull Request 工作流程

#### 标准 PR 流程

**标准 Pull Request 工作流程：**

1. **开发者Fork仓库** → **克隆到本地**
2. **克隆到本地** → **创建功能分支**
3. **创建功能分支** → **开发与提交**
4. **开发与提交** → **推送到Fork仓库**
5. **推送到Fork仓库** → **创建Pull Request**
6. **创建Pull Request** → **代码审查**
   - 如果**需要修改** → **根据反馈修改** → 回到步骤3
   - 如果**通过审查** → **合并到主分支**
7. **合并到主分支** → **删除功能分支**

#### PR 创建步骤

1. **创建功能分支**：

   ```bash
   git checkout -b feature/add-github-docs
   ```

2. **开发和提交**：

   ```bash
   git add .
   git commit -m "docs: add comprehensive GitHub guide"
   git push origin feature/add-github-docs
   ```

3. **创建 PR**：
   - 在 GitHub 上点击 "Compare & pull request"
   - 填写 PR 描述和相关信息
   - 请求审查

### 主分支保护规则设置

#### 保护规则配置

在仓库 Settings → Branches 中配置：

1. **Require pull request reviews before merging**
   - Required approving reviews: 1-2
   - Dismiss stale pull request approvals when new commits are pushed

2. **Require status checks to pass before merging**
   - Require branches to be up to date before merging
   - Status checks: CI, tests, linting

3. **Include administrators**
   - 保护规则对管理员也生效

4. **Restrict pushes that create matching branches**
   - 限制直接推送到主分支

#### 示例配置

```yaml
# .github/protected-branches.yml
main:
  required_status_checks:
    strict: true
    contexts:
      - continuous-integration/travis-ci
  required_pull_request_reviews:
    required_approving_review_count: 1
    dismiss_stale_reviews: true
  restrictions: null
  enforce_admins: true
```
### 代码审查流程

#### 审查要点

1. **功能完整性**：
   - 代码是否实现了预期功能
   - 是否有足够的测试覆盖

2. **代码质量**：
   - 代码风格是否符合项目规范
   - 是否有潜在的性能问题
   - 安全性检查

3. **文档和注释**：
   - 是否更新了相关文档
   - 复杂逻辑是否有足够注释

#### 审查意见类型

- **Approval**：批准合并
- **Request changes**：要求修改
- **Comment**：一般性意见

### 快速开发中的 Pull 策略

#### Git Flow 工作流

**Git Flow 工作流程：**

**主分支流程：**

- **main分支** → **创建release分支** → **测试通过后合并到main** → **打标签发布**
- **main分支** → **创建hotfix分支** → **测试通过后合并到main** → **打标签发布**

**开发分支流程：**

1. **开发新功能** → **创建feature分支**
2. **创建feature分支** → **开发完成**
3. **开发完成** → **合并到develop分支**
4. **合并到develop分支** → **develop分支测试**
5. **develop分支测试** → **创建release分支**

#### 常用分支策略

1. **main**：生产就绪代码
2. **develop**：开发主分支
3. **feature/\***：功能开发分支
4. **release/\***：发布准备分支
5. **hotfix/\***：紧急修复分支

#### 快速开发实践

```bash
# 创建功能分支
git checkout -b feature/new-docs

# 频繁提交小更改
git add -p  # 交互式暂存
git commit -m "feat: add GitHub basics section"

# 保持分支同步
git fetch origin
git rebase origin/develop

# 推送并创建 PR
git push origin feature/new-docs
```
### 协作最佳实践

#### 提交信息规范

```bash
# 格式: type: description
git commit -m "docs: add GitHub Actions workflow examples"

# 类型:
# feat: 新功能
# fix: 修复bug
# docs: 文档更新
# style: 代码风格调整
# refactor: 代码重构
# test: 测试相关
# chore: 构建工具或辅助工具的变动
```
#### 冲突避免策略

1. **小步提交**：减少冲突可能性
2. **及时同步**：经常拉取主分支更新
3. **明确职责**：避免多人修改同一文件
4. **代码审查**：在合并前发现潜在冲突

#### 沟通协作

- **Issues**：问题跟踪和功能请求
- **Discussions**：技术讨论和决策记录
- **Projects**：项目管理看板
- **Wiki**：项目文档和指南

这个指南涵盖了从基础设置到高级协作的完整 GitHub 和 Git 使用流程，希望能帮助你快速上手并高效协作开发。
