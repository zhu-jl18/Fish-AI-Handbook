---
title: 云服务器
description: 在云服务器 Linux 环境部署 clash/mihomo 代理软件
contributors:
  - claude
---

## clash-for-linux-install

云服务器上跑代理软件，别整那些花里胡哨的。这个脚本就是干这个的，基于 mihomo（clash 的继任者），一键装完就能用。

你需要 root 或者 sudo 权限，shell 得是 bash、zsh 或 fish。别用什么奇怪的 shell，会出问题。

先克隆仓库。下面这条命令用了 gh-proxy 加速，如果挂了就换别的镜像或者直接用 GitHub 原地址：

```bash
git clone --branch master --depth 1 https://gh-proxy.com/https://github.com/nelvko/clash-for-linux-install.git \
  && cd clash-for-linux-install \
  && sudo bash install.sh
```

安装脚本会问你要订阅链接。没有订阅？那你得先搞个机场，这脚本不负责给你变出节点来。有本地配置文件的话可以用，但默认就是走远程订阅，别自己瞎折腾。

装完之后，所有命令都以 `clash` 开头，Tab 补全支持得很好。开代理就 `clashon`，关就 `clashoff`，简单粗暴：

```bash
clashon   # 开启代理，同时设置系统代理
clashoff  # 关闭代理
```

想看 Web 控制台就 `clashui`，会告诉你内网和公网地址。默认端口 9090，记得在防火墙放行。密钥可以用 `clashsecret` 改，暴露到公网的话定期换一下：

```bash
clashui              # 显示控制台地址
clashsecret 666      # 设置密钥为 666
clashsecret          # 查看当前密钥
```

更新订阅用 `clashupdate`，它会记住上次成功的链接，下次直接跑就行。想定时更新就加个 `auto` 参数，会写到 crontab 里：

```bash
clashupdate https://your-subscription-url  # 手动更新
clashupdate auto                           # 设置定时更新
clashupdate log                            # 查看更新日志
```

Tun 模式能劫持所有流量，包括 Docker 容器的。但这玩意儿有坑，开之前确保你知道自己在干什么，别把 SSH 连接搞断了：

```bash
clashtun on   # 开启 Tun 模式
clashtun      # 查看状态
```

配置文件别直接改 `config.yaml`，那是订阅下载的原始文件，更新订阅会被覆盖。要改就改 `mixin.yaml`，这是持久化配置，会和订阅配置合并成 `runtime.yaml` 给内核用：

```bash
clashmixin -e  # 编辑 mixin 配置
clashmixin -r  # 查看运行时配置
```

卸载就跑 `sudo bash uninstall.sh`，会清理干净。

这脚本支持多架构（x86_64、arm64 等），适配主流 Linux 发行版（CentOS 7.6+、Debian 12、Ubuntu 24.04.1 LTS）。遇到问题先看 Wiki 和 Issues，别上来就问"为什么不能用"，日志贴出来再说话。

仓库地址：https://github.com/nelvko/clash-for-linux-install

