---
title: Git - 多平台
description: GitHub / GitLab / Gitee 多远程配置
contributors:
  - claude
tab:
  label: 多平台
  order: 40
---

同一个项目可能需要推送到多个平台：GitHub 主仓库、GitLab 私有备份、Gitee 国内加速。

## 平台差异

| 平台 | SSH Host | 特点 |
| --- | --- | --- |
| GitHub | github.com | 最大开源社区，AI 工具集成最好 |
| GitLab | gitlab.com | 私有仓库友好，CI/CD 强大 |
| Gitee | gitee.com | 国内访问快，适合镜像 |

## 添加多个 remote

```bash
# 查看当前 remote
git remote -v

# 添加 GitLab remote
git remote add gitlab git@gitlab.com:username/repo.git

# 添加 Gitee remote
git remote add gitee git@gitee.com:username/repo.git
```

现在 `git remote -v` 应该显示：
```
origin  git@github.com:username/repo.git (fetch)
origin  git@github.com:username/repo.git (push)
gitlab  git@gitlab.com:username/repo.git (fetch)
gitlab  git@gitlab.com:username/repo.git (push)
gitee   git@gitee.com:username/repo.git (fetch)
gitee   git@gitee.com:username/repo.git (push)
```

## 推送到多个平台

### 方式 1：分别推送

```bash
git push origin main
git push gitlab main
git push gitee main
```

### 方式 2：一次推送到多个

给 origin 添加多个 push URL：

```bash
git remote set-url --add --push origin git@github.com:username/repo.git
git remote set-url --add --push origin git@gitlab.com:username/repo.git
git remote set-url --add --push origin git@gitee.com:username/repo.git
```

现在 `git push origin main` 会同时推送到三个平台。

验证：
```bash
git remote -v
# origin  git@github.com:... (fetch)
# origin  git@github.com:... (push)
# origin  git@gitlab.com:... (push)
# origin  git@gitee.com:... (push)
```

### 方式 3：创建 all remote

```bash
git remote add all git@github.com:username/repo.git
git remote set-url --add --push all git@github.com:username/repo.git
git remote set-url --add --push all git@gitlab.com:username/repo.git
git remote set-url --add --push all git@gitee.com:username/repo.git

git push all main
```

---

## SSH 多平台密钥配置

不同平台可能用不同账号，配置 `~/.ssh/config`：

```
# GitHub
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_github

# GitLab
Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_gitlab

# Gitee
Host gitee.com
    HostName gitee.com
    User git
    IdentityFile ~/.ssh/id_gitee
```

分别把公钥添加到各平台。

---

## 从其他平台迁移

### GitHub → GitLab/Gitee

```bash
# 克隆 GitHub 仓库
git clone --mirror git@github.com:username/repo.git
cd repo.git

# 推送到新平台
git remote add gitee git@gitee.com:username/repo.git
git push gitee --mirror
```

### 保持同步

用 GitHub Actions 自动同步到 Gitee（纯 Git 命令，无第三方依赖）：

```yaml
# .github/workflows/sync-gitee.yml
name: Sync to Gitee
on:
  push:
    branches: [main]
  workflow_dispatch:  # 支持手动触发

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 必须：获取完整历史用于镜像

      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.GITEE_SSH_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan gitee.com >> ~/.ssh/known_hosts

      - name: Mirror to Gitee
        run: |
          git remote add gitee git@gitee.com:username/repo.git || true
          git push gitee --mirror --force
```

**配置说明**：
1. **生成 SSH 密钥**：`ssh-keygen -t ed25519 -C "github-actions"`
2. **Gitee 添加公钥**：设置 → SSH 公钥 → 添加 `id_ed25519.pub`
3. **GitHub 添加私钥**：仓库 Settings → Secrets → 新建 `GITEE_SSH_KEY`，粘贴私钥内容
4. **fetch-depth: 0**：必须设置，否则只能推送浅克隆，镜像会失败

---

## 常见问题

### push rejected

```
! [rejected] main -> main (fetch first)
```

平台上有本地没有的提交。先 pull：
```bash
git pull origin main --rebase
git push origin main
```

### 不同平台分支名不同

有些老项目在 GitLab 用 `master`，GitHub 用 `main`：

```bash
git push gitlab main:master
```
