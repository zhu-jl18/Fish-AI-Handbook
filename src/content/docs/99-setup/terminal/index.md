---
title: Terminal
description: 终端工具安装与配置全指南
---

本页根据我的使用体验来，介绍如何安装和配置终端工具，提升玩 AI 的体验。

## Brief Intro

终端有三个组成部分：
[终端外壳] + [内核shell] + [shell插件]，以最常见默认的cmd终端来说，它就是默认的外壳+cmd shell且无插件，这样非常地 ugly 而且也 inconvenient，那么自然要对这三个 分别配置以进行优化和美化了。

这里介绍一下其他的终端软件，我基本都试过了，被我排除了：WezTerm、Rio、Alacritty、Kitty 等等。

## General Use

首先如果是玩Linux的自然不用我来教了，这里就默认都是Windows系统了，那么只推荐一个就是微软官方的 [**Windows Terminal**](https://github.com/microsoft/terminal) (配置和集成都十分地方便)，安装形式我只推荐命令行安装(因为其他安装方式真的会有bug)：
```bash
winget install Microsoft.WindowsTerminal
```
接下来安装 **powershell7**(原始的PowerShell实在太老旧了，并且cmd也太古老了，很多命令都不支持)：
```bash
winget install Microsoft.PowerShell
```

<img src="https://static.woshipm.com/views/woshipm_api_def_20251028173629_3603.png" alt="Windows Terminal" width="80%" >


终端美化分为两部分，一部分是对wt的美化，一部分是对集成的pwsh7的美化。对于wt，有可视化的配置选项，也可以直接抄我的json：
```json
{}
```

对于pwsh7的美化，自然是要接入**oh-my-posh**了，先安装：
```bash
winget install JanDeDobbeleer.OhMyPosh -s winget
```

然后让oh-my-posh接管pwsh7:
```bash
notepad $PROFILE
```

配置 oh-my-posh：
```bash
oh-my-posh init pwsh | Invoke-Expression
```

此外，我们需要一些插件来优化命令输入等，我推荐 [Clink](https://github.com/mridgers/clink)。

同理，对于**Git Bash**、**CMD**配置的整体流程差不多，详情参考文档。

## For SSH

Undoubtedly是这个:**Terminus**,Github Student Pack 免费领取会员，很方便后续连接自己的小服务器。使用上也很简单，几乎完全地图形化界面：

![Terminus示意图](https://framerusercontent.com/images/IY7Mj6NepFUVq2cPqystF8ZjAFo.png)

## WSL Specified

这个本质上是个Linux系统，我推荐 `Fish Shell` + `oh-my-posh`的组合，由于Linux环境下配置实在是太简单了，直接参照官方文档复制如下命令即可：
```bash
# 安装 Fish Shell
sudo apt update
sudo apt install fish
#安装 oh-my-posh：
sudo wget https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/oh-my-posh-linux-amd64 -O /usr/local/bin/oh-my-posh
sudo chmod +x /usr/local/bin/oh-my-posh
#安装后可直接在 fish 配置文件中加入自动初始化的命令：
oh-my-posh init fish | source
```
如需进一步美化和设置主题，参考 [oh-my-posh 官方文档](https://ohmyposh.dev/)。

## 其他碎碎念

一些常见的小技巧，配置代理：
```plaintext
http_proxy: http://127.0.0.1:7890
https_proxy: https://127.0.0.1:7890
```
临时导入环境变量：
```bash
set $VAR_NAME="your-value"
```
