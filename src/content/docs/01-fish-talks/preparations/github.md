---
title: "GitHub"
description: "代码托管、协作与自动化的中心"
---

## 官方地址

- `https://github.com/`

## 安装与配置（小白版）

1. 安装 Git：`https://git-scm.com/downloads`
2. 生成 SSH Key（PowerShell 可粘贴）：

```powershell
ssh-keygen -t ed25519 -C "you@example.com"
cat $env:USERPROFILE\.ssh\id_ed25519.pub
```

3. 复制公钥到 GitHub → Settings → SSH and GPG keys → New SSH key。
4. 设置用户名与邮箱：

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## 基本流程

```bash
# 克隆
git clone git@github.com:owner/repo.git
# 创建分支
git checkout -b feature/your-topic
# 提交并推送
git add . && git commit -m "feat: your change" && git push -u origin HEAD
```

> PR、Code Review 与 Actions 自动化是团队协作的关键。
