---
title: 代理 - 自建节点
description: VPS 选购与代理服务搭建
contributors:
  - claude
tab:
  label: 自建节点
  order: 20
---

自建节点 = 买 VPS + 部署代理服务。好处是独享、可控、便宜（长期）。

## VPS 选购

### 主流厂商

| 厂商 | 特点 | 价格参考 |
| --- | --- | --- |
| [Vultr](https://www.vultr.com/) | 按小时计费，可随时删除 | $5/月起 |
| [搬瓦工](https://bwh81.net/) | 线路优化选项多，对国内友好 | $49.99/年起 |
| [RackNerd](https://www.racknerd.com/) | 便宜，促销多 | $10/年起 |
| [DigitalOcean](https://www.digitalocean.com/) | 稳定，学生优惠 | $4/月起 |

### 选购要点

1. **位置**：日本、新加坡、香港对国内延迟低；美国便宜但延迟高
2. **带宽**：1Gbps 共享足够日常使用
3. **流量**：1TB/月 对个人绑绑有余
4. **IP**：检查 IP 是否被墙（买前测试）

### IP 被墙检测

```bash
# 测试 IP 是否可达
ping your-vps-ip

# 测试端口是否通
telnet your-vps-ip 22
```

或使用在线工具：[ping.pe](https://ping.pe/)

---

## 协议选择（2025）

| 协议 | 特点 | 推荐度 |
| --- | --- | --- |
| **VLESS + XTLS-Reality** | 最强伪装，难以检测 | ⭐⭐⭐⭐⭐ |
| **Hysteria2** | UDP 协议，速度快，适合视频 | ⭐⭐⭐⭐⭐ |
| **Trojan** | 伪装 HTTPS，稳定 | ⭐⭐⭐⭐ |
| **VMess + WS + TLS** | 经典方案，兼容性好 | ⭐⭐⭐ |
| **Shadowsocks** | 简单但易被检测 | ⭐⭐ |

**2025 推荐**：VLESS + Reality 或 Hysteria2。

---

## 一键脚本

### X-UI（推荐）

[x-ui](https://github.com/MHSanaei/3x-ui) - 带 Web 面板的管理工具。

```bash
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh)
```

特点：
- Web 面板管理节点
- 支持多用户、流量统计
- 自动证书申请
- 支持 VLESS/VMess/Trojan/Shadowsocks

### Hysteria2

```bash
bash <(curl -fsSL https://get.hy2.sh/)
```

配置简单，速度快，适合视频流媒体。

### Reality-EZPZ

```bash
bash <(curl -sL https://raw.githubusercontent.com/aleskxyz/reality-ezpz/master/reality-ezpz.sh)
```

一键部署 VLESS + Reality。

---

## 云服务器快速部署

Linux 服务器一键装 Mihomo（Clash 内核）：

```bash
git clone --branch master --depth 1 https://gh-proxy.com/https://github.com/nelvko/clash-for-linux-install.git \
  && cd clash-for-linux-install \
  && sudo bash install.sh
```

按提示填入订阅链接即可。

---

## 搭建教程资源

YouTube 上有大量详细教程，搜索关键词：
- "VLESS Reality 搭建 2025"
- "Hysteria2 一键脚本"
- "x-ui 面板教程"

推荐频道：
- 不良林
- 科技分享
- 老王分享

---

## 安全注意事项

1. **定期更新**：代理软件和系统都要更新
2. **强密码**：面板密码用随机生成
3. **证书**：用 Let's Encrypt 免费证书
4. **防火墙**：只开放必要端口
5. **备份**：配置文件定期备份
