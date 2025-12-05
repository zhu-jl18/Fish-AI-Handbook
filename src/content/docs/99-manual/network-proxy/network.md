---
title: 代理 - 网络概念
description: IDC、三网优化、内网穿透、回国线路
contributors:
  - claude
tab:
  label: 网络概念
  order: 40
---

理解网络概念，选择更好的节点和线路。

## IP 类型

### 机房 IP (IDC IP)

数据中心分配的 IP，特点：
- 大量网站/服务托管在机房
- 容易被识别为"非住宅 IP"
- 部分服务（ChatGPT、Netflix）对机房 IP 有限制

**标识**：通常 ASN 属于 AWS、GCP、Vultr 等云厂商。

### 住宅 IP (Residential IP)

家庭宽带分配的 IP，特点：
- 被认为是"真实用户"
- 风控更宽松
- 解锁能力强

### 原生 IP vs 广播 IP

| 类型 | 说明 | 解锁能力 |
| --- | --- | --- |
| **原生 IP** | IP 归属地与服务器物理位置一致 | 强，适合流媒体 |
| **广播 IP** | IP 归属地与物理位置不同（机房买的 IP 段） | 弱 |

**检测方法**：`ping ip` 延迟与 IP 归属地是否匹配。

---

## 三网优化

国内三大运营商：电信、联通、移动，国际出口线路不同。

### 常见优化线路

| 线路 | 说明 | 适用运营商 |
| --- | --- | --- |
| **CN2 GT** | 中国电信优化线路，中端 | 电信 |
| **CN2 GIA** | 电信高端线路，延迟低、稳定 | 电信优先 |
| **9929** | 联通 A 网优化 | 联通 |
| **AS4837** | 联通普通线路 | 联通 |
| **CMI** | 移动国际出口 | 移动 |

**购买 VPS 时注意**：
- 搬瓦工 CN2 GIA 线路对电信最友好
- 三网优化 = 电信、联通、移动都有专门优化

### 测速方法

```bash
# 测试延迟
ping your-vps-ip

# 路由追踪（看经过哪些节点）
tracert your-vps-ip       # Windows
traceroute your-vps-ip    # Linux/Mac
```

---

## 内网穿透

家里设备没有公网 IP，但想从外面访问？用内网穿透。

### FRP

[FRP](https://github.com/fatedier/frp) - 最流行的内网穿透工具。

原理：
```
外网 → FRP 服务端（有公网 IP）→ FRP 客户端（家里）→ 内网服务
```

需要一台有公网 IP 的服务器做中转。

### Cloudflare Tunnel

免费，不需要公网 IP：

```bash
# 安装 cloudflared
winget install cloudflare.cloudflared

# 登录
cloudflared tunnel login

# 创建隧道
cloudflared tunnel create my-tunnel

# 运行
cloudflared tunnel run my-tunnel
```

你的服务通过 Cloudflare 网络暴露到公网。

### Zerotier / Tailscale

组建虚拟局域网，设备之间直连：

```bash
# Tailscale
winget install Tailscale.Tailscale
tailscale up
```

设备加入同一个网络，互相可以直接访问。

---

## 回国线路

在海外访问国内网站（视频、音乐）需要"回国线路"。

### 为什么需要？

- B 站、网易云、QQ 音乐等有地区限制
- 海外直连国内网站速度慢
- 游戏加速（降低延迟）

### 解决方案

1. **回国机场**：专门提供回国节点的服务
2. **自建回国节点**：国内服务器 + 代理
3. **Cloudflare WARP**：部分场景可用

### 配置示例

在分流规则中，国内网站走回国节点：

```yaml
rules:
  - DOMAIN-SUFFIX,bilibili.com,回国节点
  - DOMAIN-SUFFIX,163.com,回国节点
  - GEOIP,CN,回国节点
```

---

## 实用检测工具

| 工具 | 用途 |
| --- | --- |
| [ping.pe](https://ping.pe/) | 全球 ping 测试 |
| [ipinfo.io](https://ipinfo.io/) | IP 信息查询 |
| [bgp.he.net](https://bgp.he.net/) | ASN 查询 |
| [ip111.cn](https://ip111.cn/) | 综合检测 |
| [ip.sb](https://ip.sb/) | 当前出口 IP |
