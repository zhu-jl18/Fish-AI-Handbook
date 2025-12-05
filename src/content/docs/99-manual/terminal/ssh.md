---
title: Terminal - SSH
description: SSH 客户端与远程连接
contributors:
  - claude
tab:
  label: SSH
  order: 50
---

SSH 连接远程服务器是日常操作。Windows 自带 OpenSSH，但图形化工具更方便管理多台服务器。

## 推荐工具：Termius

[Termius](https://termius.com/) 是目前最好用的跨平台 SSH 客户端：

- 图形化管理多台服务器
- 支持 SFTP 文件传输
- 多端同步（桌面、手机）
- **GitHub Student Pack 免费领取会员**

![Termius 界面](https://framerusercontent.com/images/IY7Mj6NepFUVq2cPqystF8ZjAFo.png)

## Windows 原生 SSH

Windows 10/11 自带 OpenSSH：

```powershell
# 检查是否安装
ssh -V

# 连接服务器
ssh user@hostname -p 22

# 使用密钥登录
ssh -i ~/.ssh/id_rsa user@hostname
```

### 生成密钥对

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

密钥存放位置：`~/.ssh/id_ed25519`（私钥）和 `~/.ssh/id_ed25519.pub`（公钥）。

### 配置文件简化连接

编辑 `~/.ssh/config`：

```
Host myserver
    HostName 192.168.1.100
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa

Host github
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_key
```

之后直接 `ssh myserver` 即可连接。

## 代理跳板

通过跳板机连接内网服务器：

```
Host internal
    HostName 10.0.0.5
    User admin
    ProxyJump jumphost
```

## 常见问题

### 连接超时

```powershell
# 在 ~/.ssh/config 添加心跳
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

### 权限问题

Windows 上 SSH 密钥权限问题：
```powershell
icacls ~/.ssh/id_rsa /inheritance:r /grant:r "$env:USERNAME:R"
```

### 首次连接指纹确认

```
The authenticity of host 'xxx' can't be established.
Are you sure you want to continue connecting (yes/no)?
```

输入 `yes` 即可，会将指纹存入 `~/.ssh/known_hosts`。
