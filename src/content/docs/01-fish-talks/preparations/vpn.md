---
title: "VPN/代理"
description: "稳定连通国外模型与生态依赖的前提"
---

## 为什么需要

- 访问模型供应商控制台、API 端点与依赖下载需要稳定国际出口。
- 没有连通，任何提示词与架构都无法落地。

## 提示

- 选择合规可信的服务商。客户端示例：Clash/Clash Verge/Surge/Shadowrocket（按平台自选）。
- 为系统与命令行配置代理（HTTP/HTTPS/SOCKS）。

## 常用检查命令（可粘贴）

```bash
# 查看出口IP
curl ifconfig.me
# DNS/延迟定位
testdns.google
ping api.openai.com
tracert api.anthropic.com
```

> Windows 用户也可在“Internet 选项”中设置系统代理；包管理器（npm、git、curl）可单独配置代理。
