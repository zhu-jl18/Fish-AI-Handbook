---
title: 代理 - 客户端对比
description: Clash / V2RayN / SingBox 对比与使用
contributors:
  - claude
tab:
  label: 客户端对比
  order: 10
---

日常使用代理，需要客户端配合订阅链接。主流客户端分三大派系。

## Clash 系（推荐新手）

Clash 是曾经最流行的代理内核，2023 年原作者删库，社区分叉出多个版本。

### Clash Verge Rev（推荐）

[Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev) - 基于 Mihomo 内核，UI 现代。

```bash
winget install ClashVergeRev.ClashVergeRev
```

特点：
- 支持 TUN 模式（全局代理）
- 规则分流可视化配置
- 自动更新订阅
- 跨平台（Windows/macOS/Linux）

### Clash for Windows（已停更）

曾经的王者，2023 年 11 月停止开发。遗留版本还能用，但不推荐新用户。

### Mihomo（内核）

[Mihomo](https://github.com/MetaCubeX/mihomo)（原 Clash.Meta）是 Clash 的社区接班人，多数新客户端基于它。

---

## V2RayN（最强全能）

[V2RayN](https://github.com/2dust/v2rayN) - Windows 上功能最全的客户端。

```bash
winget install 2dust.v2rayN
```

特点：
- 支持几乎所有协议（VMess/VLESS/Trojan/SS/SSR/Hysteria2 等）
- 可切换多种内核（v2ray-core、Xray-core、sing-box）
- 手动配置灵活
- 适合进阶用户

### 核心选择

| 内核 | 特点 |
| --- | --- |
| v2ray-core | 原版，稳定但更新慢 |
| Xray-core | 社区版，支持 VLESS/XTLS |
| sing-box | 新一代内核，性能强 |

---

## SingBox（新势力）

[sing-box](https://github.com/SagerNet/sing-box) - 新一代代理内核，性能出色。

特点：
- Go 语言编写，跨平台
- 支持 Hysteria2、TUIC 等新协议
- 配置格式统一，可移植性强
- 多端一致体验

客户端：
- **Windows**：sing-box GUI 或用 V2RayN 切换内核
- **Android**：SFA (sing-box for Android)
- **iOS**：Shadowrocket（需购买）、Stash

---

## TUN 模式 vs 系统代理

| 模式 | 原理 | 适用场景 |
| --- | --- | --- |
| **系统代理** | 只代理支持代理设置的应用 | 日常浏览器使用 |
| **TUN 模式** | 虚拟网卡，全局流量代理 | 游戏、命令行、不支持代理的应用 |

TUN 模式需要管理员权限，会代理所有流量（可通过规则分流）。

**使用 AI 编程工具时建议开 TUN**，因为：
- 命令行工具（git、npm）不走系统代理
- IDE 内置终端需要全局代理
- API 调用需要稳定连接

---

## 我的推荐

| 用户类型 | 推荐客户端 |
| --- | --- |
| 新手 | Clash Verge Rev |
| 需要最新协议 | V2RayN + Xray-core |
| 追求性能 | V2RayN + sing-box |
| 移动端 | Shadowrocket (iOS) / SFA (Android) |

## 订阅转换

不同客户端订阅格式不同，需要转换：

- [订阅转换](https://sub.xeton.dev/) - 在线转换工具
- [subconverter](https://github.com/tindy2013/subconverter) - 自建转换服务
