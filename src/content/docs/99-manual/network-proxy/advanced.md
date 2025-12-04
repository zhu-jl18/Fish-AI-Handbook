---
title: 代理 - 进阶技术
description: 链式代理、落地节点、中转技术
contributors:
  - claude
tab:
  label: 进阶技术
  order: 30
---

进阶玩法：链式代理、中转、落地节点，解决速度和隐私问题。

## 链式代理（Proxy Chain）

流量经过多个代理节点再到达目标，增加隐私性或绕过限制。

```
你 → 节点A → 节点B → 目标网站
```

### 应用场景

1. **增加匿名性**：多层代理难以追踪
2. **家宽入口**：国内家宽 IP → 国外落地
3. **解锁限制**：某些服务只认特定地区 IP

### Clash 配置链式代理

```yaml
proxies:
  - name: "节点A-中转"
    type: vmess
    server: node-a.com
    ...
  - name: "节点B-落地"
    type: trojan
    server: node-b.com
    ...

proxy-groups:
  - name: "链式代理"
    type: relay
    proxies:
      - "节点A-中转"
      - "节点B-落地"
```

`relay` 类型实现链式代理，流量依次经过列表中的节点。

---

## 落地节点 vs 中转节点

| 类型 | 作用 | 位置 |
| --- | --- | --- |
| **中转节点** | 加速、隐藏入口 IP | 通常在国内或低延迟地区 |
| **落地节点** | 最终出口，决定你的"IP 归属" | 通常在目标地区（美国、日本等） |

```
你 → 中转（国内优化线路）→ 落地（美国）→ 目标网站
```

### 为什么需要中转？

1. **速度**：国内直连海外节点慢，中转走优化线路
2. **稳定**：中转服务器带宽大、线路稳定
3. **隐藏**：暴露的是中转 IP，不是落地 IP

---

## 家宽中转

家宽（家庭宽带）IP 被认为"更干净"，某些服务（ChatGPT、Netflix）对机房 IP 有限制。

### 原理

```
你 → 你的家宽服务器 → 海外落地
```

把家里的电脑/NAS 当中转，流量从家宽 IP 出去。

### 实现方式

1. **公网 IP**：家宽有公网 IP，直接内网穿透
2. **无公网 IP**：用 FRP/Zerotier 内网穿透

配合 DDNS（动态域名）解决 IP 变化问题。

---

## 分流规则

不是所有流量都需要走代理，分流可以：
- 国内网站直连
- 国外网站走代理
- 特定网站走特定节点

### Clash 分流示例

```yaml
rules:
  # 国内直连
  - GEOIP,CN,DIRECT
  
  # AI 服务走美国节点
  - DOMAIN-SUFFIX,openai.com,美国节点
  - DOMAIN-SUFFIX,anthropic.com,美国节点
  
  # 流媒体走解锁节点
  - DOMAIN-SUFFIX,netflix.com,流媒体解锁
  
  # 默认走代理
  - MATCH,代理组
```

### 规则集

不用手写规则，用现成的规则集：

```yaml
rule-providers:
  reject:
    type: http
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/reject.txt"
    interval: 86400
  direct:
    type: http
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/direct.txt"
    interval: 86400
```

推荐规则集：[Loyalsoldier/clash-rules](https://github.com/Loyalsoldier/clash-rules)

---

## 负载均衡

多个节点轮流使用，避免单点故障：

```yaml
proxy-groups:
  - name: "负载均衡"
    type: load-balance
    strategy: round-robin  # 或 consistent-hashing
    proxies:
      - 节点1
      - 节点2
      - 节点3
```

### 自动选择最快节点

```yaml
proxy-groups:
  - name: "自动选择"
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 300
    proxies:
      - 节点1
      - 节点2
      - 节点3
```

每 5 分钟测速，自动切换到最快节点。
