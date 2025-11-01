---
title: Git 配置
description: Windows + WSL2 双环境 Git 配置、GitHub 访问方案、多账号认证管理
contributors:
  - claude
  - codex
---

## Windows + WSL2 双环境配置

Windows 和 WSL2 各有一套 Git，但可以共享配置和凭据。别想着只装一个，那会让你在两个环境间切换时抓狂。

在 Windows 上装 Git for Windows，在 WSL2 里用包管理器装 Git。Ubuntu/Debian 系用 `sudo apt-get install git`，其他发行版自己查包管理器。然后让它们共享 `.gitconfig` 和 SSH 密钥。Windows 的用户目录是 `C:\Users\YourName`，WSL2 里对应 `/mnt/c/Users/YourName`。

**2024 年后推荐方案**：直接在 WSL2 里用 Git Credential Manager (GCM)。Git for Windows 2.14+ 自带 GCM，WSL2 可以直接调用 Windows 的 GCM。在 WSL2 里跑：

```bash
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
```

这样 HTTPS 认证就能共享了，GitHub、Azure DevOps、Bitbucket 都支持。GCM 会把凭据存在 Windows Credential Manager 里，WSL2 和 Windows 共用一套。

SSH 密钥共享有两种办法。第一种是在 WSL2 的 `~/.ssh/config` 里直接指向 Windows 的密钥：

```
Host github.com
    HostName github.com
    User git
    IdentityFile /mnt/c/Users/YourName/.ssh/id_ed25519
```

权限问题？WSL2 里跑 `chmod 600 /mnt/c/Users/YourName/.ssh/id_ed25519`。如果还报错，说明 WSL2 的文件系统权限机制和 Windows 的 NTFS 不兼容，把密钥复制到 WSL2 的 `~/.ssh/` 下：

```bash
cp /mnt/c/Users/YourName/.ssh/id_ed25519* ~/.ssh/
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

别用软链接，那玩意儿在 WSL2 和 Windows 之间不靠谱。

全局配置共享可以用 `includeIf`，但没必要。WSL2 和 Windows 各自配置一遍更清晰，反正就几行：

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

## GitHub 访问问题解决

GitHub 在某些网络环境下访问困难，SSH 和 HTTPS 都可能遇到问题。2021 年后 GitHub 禁用了密码认证，HTTPS 必须用 Personal Access Token (PAT) 或 OAuth。SSH 方式更简单，但某些企业网络会封 22 端口。

生成密钥用 Ed25519，别用老掉牙的 RSA：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

公钥（`~/.ssh/id_ed25519.pub`）添加到 GitHub Settings → SSH and GPG keys。测试连接：

```bash
ssh -T git@github.com
```

如果 22 端口被封，GitHub 提供 443 端口的 SSH 服务。在 `~/.ssh/config` 里加：

```
Host github.com
    HostName ssh.github.com
    Port 443
    User git
    IdentityFile ~/.ssh/id_ed25519
```

HTTPS 方式需要 PAT。在 GitHub Settings → Developer settings → Personal access tokens → Tokens (classic) 生成一个，权限勾选 `repo` 和 `workflow`。克隆时用 `git clone https://github.com/username/repo.git`，第一次推送会要求输入用户名和密码，密码填 PAT。Git Credential Manager 会记住它。

**代理方案**：如果你有稳定的代理，配置 Git 走代理最省事。假设代理在 `127.0.0.1:7890`：

```bash
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890
```

SSH 走代理需要 `ProxyCommand`，在 `~/.ssh/config` 里加：

```
Host github.com
    HostName github.com
    User git
    ProxyCommand nc -X 5 -x 127.0.0.1:7890 %h %p
```

Windows 上用 `connect.exe` 替代 `nc`：

```
ProxyCommand "C:/Program Files/Git/mingw64/bin/connect.exe" -S 127.0.0.1:7890 %h %p
```

**镜像加速**：GitHub 镜像站不稳定，随时可能失效。2024-2025 年还活着的镜像站包括 `gh-proxy.com`、`ghp.ci`、`github.akams.cn` 等，但它们只能用来下载 release 包或 zip 文件，不能用于 `git clone`。下载单个文件或压缩包时把 `github.com` 替换成镜像域名：

```
https://gh-proxy.com/https://github.com/username/repo/archive/refs/heads/main.zip
```

别指望镜像站长期可用，它们的存活时间通常以月计。2024 年后很多镜像站被封，剩下的也不稳定。

**Steam Community 302**：这是个开源的 GitHub 访问工具，通过修改 hosts 文件和本地代理加速。2025 年 2 月更新到 Ver.13.0.07_fix，支持 Windows/Linux/macOS。原理是把 GitHub 的域名解析到 CDN 节点，同时提供本地反向代理。但 hosts 方案的问题是 IP 会失效，需要定期更新。而且 2023 年后 GitHub 加强了 CDN 防护，这个方法效果不如以前。

**为什么不推荐 SSH 方式了**：这是个误解。GitHub 没有禁止 SSH 连接，只是禁用了 HTTPS 的密码认证。SSH 方式依然是推荐的认证方式，尤其是对于多账号管理。上面说的 22 端口被封是网络环境问题，不是 GitHub 的限制。

如果你在国内，最靠谱的还是自己搭梯子或者用企业 VPN。镜像站和 hosts 方案都是临时措施，别当主力方案。

## 多账号认证管理

一台电脑上用多个 GitHub 账号很常见，比如个人账号和公司账号。SSH 方式最简单，HTTPS 方式需要手动切换 PAT。

为每个账号生成独立的密钥：

```bash
ssh-keygen -t ed25519 -C "personal@example.com" -f ~/.ssh/id_ed25519_personal
ssh-keygen -t ed25519 -C "work@example.com" -f ~/.ssh/id_ed25519_work
```

把对应的公钥（`.pub` 文件）分别添加到两个 GitHub 账号的 SSH keys 里。然后在 `~/.ssh/config` 里配置不同的 Host：

```
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal

Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
```

克隆时用对应的 Host：

```bash
git clone git@github-personal:username/personal-repo.git
git clone git@github-work:company/work-repo.git
```

已有仓库修改 remote URL：

```bash
git remote set-url origin git@github-work:company/work-repo.git
```

测试连接：

```bash
ssh -T git@github-personal
ssh -T git@github-work
```

全局配置（`~/.gitconfig`）设置默认账号：

```ini
[user]
    name = Personal Name
    email = personal@example.com
```

在特定仓库里覆盖配置：

```bash
cd /path/to/work-repo
git config user.name "Work Name"
git config user.email "work@example.com"
```

检查当前仓库的配置：

```bash
git config user.name
git config user.email
```

**目录级别的条件配置**：如果你的工作项目都在 `~/work/` 目录下，可以用条件配置自动切换。在 `~/.gitconfig` 里加：

```ini
[user]
    name = Personal Name
    email = personal@example.com

[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
```

创建 `~/.gitconfig-work`：

```ini
[user]
    name = Work Name
    email = work@example.com
```

这样在 `~/work/` 下的所有仓库自动用工作账号，其他地方用个人账号。`gitdir` 路径必须以 `/` 结尾，否则不生效。Windows 上路径用 `C:/Users/YourName/work/` 格式，别用反斜杠。

HTTPS 方式麻烦一些，因为 Git Credential Manager 默认只记住一个账号的 PAT。每次切换账号需要手动清除凭据或者在仓库级别配置不同的 credential helper。但这都是折腾，直接用 SSH 省事。
