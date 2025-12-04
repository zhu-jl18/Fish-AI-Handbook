---
title: Git - 多账号配置
description: 多账号凭证管理与 SSH 密钥配置
contributors:
  - claude
tab:
  label: 多账号配置
  order: 10
---

一台电脑多个 Git 账号是常态：个人账号 + 公司账号，GitHub + GitLab。

## Windows 凭证弹窗

Push 时弹出"选择账号"窗口？这是 **Git Credential Manager (GCM)** 在工作。

GCM 默认行为：
- 首次认证时弹出浏览器授权
- 凭证存储在 Windows Credential Manager
- 多账号时会弹窗让你选择

查看已存凭证：
```bash
# 查看 Windows Credential Manager
cmdkey /list | findstr github
```

清除特定凭证（强制重新登录）：
```bash
cmdkey /delete:git:https://github.com
```

---

## SSH 多账号配置（推荐）

SSH 方式更清晰，每个账号一对密钥。

### 1. 生成多对密钥

```bash
# 个人账号
ssh-keygen -t ed25519 -C "personal@email.com" -f ~/.ssh/id_personal

# 公司账号
ssh-keygen -t ed25519 -C "work@company.com" -f ~/.ssh/id_work
```

### 2. 添加公钥到 GitHub

分别把 `~/.ssh/id_personal.pub` 和 `~/.ssh/id_work.pub` 添加到对应 GitHub 账号的 SSH keys。

### 3. 配置 SSH config

编辑 `~/.ssh/config`：

```
# 个人账号
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_personal

# 公司账号
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_work
```

### 4. 使用不同 Host 克隆

```bash
# 个人项目
git clone git@github-personal:myname/personal-repo.git

# 公司项目
git clone git@github-work:company/work-repo.git
```

### 5. 已有仓库修改 remote

```bash
git remote set-url origin git@github-work:company/repo.git
```

测试连接：
```bash
ssh -T git@github-personal   # Hi personal-user!
ssh -T git@github-work       # Hi work-user!
```

---

## 目录级自动切换用户

不想每个仓库手动配置？用 `includeIf` 按目录自动切换。

### 全局配置 `~/.gitconfig`

```ini
[user]
    name = Personal Name
    email = personal@email.com

[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work

[includeIf "gitdir:C:/Projects/Company/"]
    path = ~/.gitconfig-work
```

### 工作配置 `~/.gitconfig-work`

```ini
[user]
    name = Work Name
    email = work@company.com
```

**注意**：
- `gitdir` 路径必须以 `/` 结尾
- Windows 用 `C:/` 格式，不要用反斜杠

验证：
```bash
cd ~/work/some-repo
git config user.email    # 应该显示 work@company.com
```

---

## 仓库级配置

也可以在单个仓库内覆盖配置：

```bash
cd /path/to/repo
git config user.name "Specific Name"
git config user.email "specific@email.com"
```

配置存在 `.git/config` 中，优先级高于全局。
