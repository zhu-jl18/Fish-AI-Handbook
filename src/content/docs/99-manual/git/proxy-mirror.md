---
title: Git - 代理与镜像
description: 中国大陆 GitHub 访问问题解决方案
contributors:
  - claude
tab:
  label: 代理与镜像
  order: 20
---

中国大陆访问 GitHub 的三大坑：DNS 污染、连接重置、速度慢。

## Git 代理配置

如果你有稳定代理（假设 `127.0.0.1:7890`）：

### HTTPS 代理

```bash
# 设置代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 只对 GitHub 设置代理
git config --global http.https://github.com.proxy http://127.0.0.1:7890

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### SSH 代理

编辑 `~/.ssh/config`：

```text
Host github.com
    HostName github.com
    User git
    # SOCKS5 代理
    ProxyCommand nc -X 5 -x 127.0.0.1:7890 %h %p
```

Windows 上用 `connect.exe`（Git for Windows 自带）：

```text
Host github.com
    HostName github.com
    User git
    ProxyCommand "C:/Program Files/Git/mingw64/bin/connect.exe" -S 127.0.0.1:7890 %h %p
```

---

## Steam Community 302

[Watt Toolkit](https://steampp.net/)（原 Steam++ / Steam Community 302）是国内最流行的 GitHub 加速工具。

### 工作原理

- 修改 hosts 文件，将 GitHub 域名解析到可用 IP
- 提供本地反向代理
- 自动更新 IP 列表

### HTTPS vs SSH

**关键问题**：开启 Watt Toolkit 的 GitHub 加速后，**只能用 HTTPS**，SSH 可能不通。

原因：
- Watt Toolkit 通过 hosts + 本地代理劫持 HTTPS 流量
- SSH 走 22 端口，不经过 HTTP 代理
- 部分 IP 对 SSH 端口有限制

**解决方案**：
1. 需要 SSH 时关闭 GitHub 加速
2. 或配置 SSH 走 443 端口（见下文）

### GitHub SSH 走 443 端口

GitHub 提供 443 端口的 SSH 服务：

```text
Host github.com
    HostName ssh.github.com
    Port 443
    User git
    IdentityFile ~/.ssh/id_ed25519
```

这样即使 22 端口被封也能用 SSH。

---

## 镜像加速

镜像站适合下载 release/zip，**不能用于 `git clone`**。

### 2025 年还活着的镜像

| 镜像 | 用法 |
| --- | --- |
| gh-proxy.com | `https://gh-proxy.com/https://github.com/...` |
| ghp.ci | `https://ghp.ci/https://github.com/...` |
| ghproxy.net | `https://ghproxy.net/https://github.com/...` |

示例：下载 release
```text
https://gh-proxy.com/https://github.com/user/repo/releases/download/v1.0/file.zip
```

**警告**：镜像站随时可能挂，别当主力方案。

### 克隆加速

如果只是想快速克隆，用 shallow clone：

```bash
git clone --depth 1 https://github.com/user/repo.git
```

只拉最新一个 commit，速度快很多。需要完整历史时再：

```bash
git fetch --unshallow
```

---

## 最靠谱的方案

1. **自己搭梯子** - 最稳定
2. **企业 VPN** - 公司提供的话用起来
3. **Watt Toolkit** - 免费但需要容忍 HTTPS only
4. **云开发环境** - GitHub Codespaces、Gitpod 在云端访问

别指望 hosts 和镜像站长期可用，2023 年后 GitHub 加强了 CDN 防护，这些方法效果都不如以前。
