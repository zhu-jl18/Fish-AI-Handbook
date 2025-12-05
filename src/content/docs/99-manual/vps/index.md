---
title: VPS 小鸡
description: VPS 云服务器入门与配置
contributors:
  - claude
---

记录我学习使用 VPS（云服务器/小鸡）的过程，以及收集的优质教程。

## 什么是 VPS？

**VPS** (Virtual Private Server) = 虚拟专用服务器，俗称"小鸡"。

你可以用它来：
- 搭建代理节点（见 [Network Proxy](/manual/network-proxy)）
- 部署 AI 应用（Ollama、Open WebUI）
- 运行自动化服务（n8n、定时任务）
- 搭建个人网站/博客

## 快速导航

| 标签 | 内容 |
| --- | --- |
| **初始化** | 一键清理云厂商监控、安全设置、SSH 配置 |
| **管理面板** | 1Panel 安装、Docker 管理、应用商店 |
| **AI 部署** | Ollama、Open WebUI、n8n 等 AI 应用部署 |
| **资源** | 我收集的优质教程链接（待补充） |

## 购买建议

参考 [Network Proxy - 自建节点](/manual/network-proxy) 中的 VPS 选购部分。

常见厂商：Vultr、搬瓦工、RackNerd、DigitalOcean

## 连接方式

```bash
# SSH 连接
ssh root@your-vps-ip

# 使用密钥连接
ssh -i ~/.ssh/id_ed25519 root@your-vps-ip
```

推荐使用 [Terminus](https://termius.com/) 或 VS Code Remote SSH 管理服务器。
