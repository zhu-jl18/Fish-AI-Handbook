---
title: Terminal - WSL 2
description: WSL 2 终端配置与美化
contributors:
  - claude
tab:
  label: WSL 2
  order: 40
---

WSL 2（Windows Subsystem for Linux）是 Windows 上的完整 Linux 环境，性能接近原生。

## 安装

```powershell
# 管理员权限运行
wsl --install
```

默认安装 Ubuntu。安装其他发行版：
```powershell
wsl --install -d Debian
wsl --list --online  # 查看可用发行版
```

## 推荐 Shell：Fish

Fish Shell 开箱即用，语法高亮、自动补全都自带：

```bash
sudo apt update
sudo apt install fish

# 设为默认 Shell
chsh -s /usr/bin/fish
```

### Fish 插件管理：Fisher

```bash
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
```

推荐插件：
```bash
fisher install PatrickF1/fzf.fish       # 模糊搜索
fisher install jethrokuan/z             # 目录跳转
fisher install jorgebucaran/autopair.fish  # 括号配对
```

## oh-my-posh 美化

```bash
# 安装
sudo wget https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/posh-linux-amd64 -O /usr/local/bin/oh-my-posh
sudo chmod +x /usr/local/bin/oh-my-posh

# Fish 配置（~/.config/fish/config.fish）
oh-my-posh init fish | source
```

## Windows Terminal 集成

WSL 安装后自动添加到 Windows Terminal。配置优化：

```json
{
    "name": "Ubuntu",
    "source": "Windows.Terminal.Wsl",
    "startingDirectory": "~",
    "colorScheme": "One Half Dark"
}
```

## 常见问题

### 文件权限问题

WSL 访问 Windows 文件时权限可能混乱。在 `/etc/wsl.conf` 添加：
```ini
[automount]
options = "metadata,umask=22,fmask=11"
```

### 网络代理

```bash
# ~/.config/fish/config.fish 或 ~/.bashrc
export http_proxy=http://$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):7890
export https_proxy=$http_proxy
```

### 与 Windows 互操作

```bash
# 在 WSL 中打开 Windows 资源管理器
explorer.exe .

# 在 WSL 中运行 Windows 程序
code .  # 打开 VS Code
```
