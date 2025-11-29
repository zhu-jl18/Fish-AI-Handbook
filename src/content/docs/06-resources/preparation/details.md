---
title: Preparation - Details
description: Detailed guides for setting up tools to maximize free tier usage
contributors:
  - claude
tab:
  label: Details
  order: 10
---

## 虚拟信用卡

用于注册需要绑卡的服务（如 Google Cloud、AWS 等），但不想暴露真实卡号。

### 推荐服务

| 服务 | 特点 | 费用 |
|------|------|------|
| [Dupay](https://dupay.one) | 支持 USDT 充值，稳定 | 开卡费 + 月费 |
| [OneKey Card](https://card.onekey.so) | 加密货币友好 | 开卡费 |
| [Wise](https://wise.com) | 正规，需实名 | 低费率 |

### 使用技巧

1. **小额测试**：先充值小额测试是否能正常扣款
2. **及时取消**：试用期结束前记得取消订阅
3. **余额控制**：保持低余额避免意外扣费

---

## 接码平台

用于获取海外手机号验证码，注册 Google、Claude 等服务。

### 推荐平台

| 平台 | 价格 | 成功率 |
|------|------|--------|
| [SMS-Activate](https://sms-activate.org) | $0.1-0.5/次 | 高 |
| [5sim](https://5sim.net) | $0.05-0.3/次 | 中高 |
| [Tiger SMS](https://tiger-sms.com) | $0.1-0.4/次 | 中 |

### 注意事项

- 选择与目标服务匹配的国家号码
- Google 验证建议选择印度/印尼号码（便宜且成功率高）
- 接码后号码会被回收，不要用于需要二次验证的服务

---

## 临时邮箱

用于注册不重要的服务，避免垃圾邮件。

### 推荐服务

- [TempMail](https://temp-mail.org) - 简单好用
- [Guerrilla Mail](https://guerrillamail.com) - 支持自定义地址
- [10 Minute Mail](https://10minutemail.com) - 10分钟自动销毁

### 高级方案

使用 Gmail 的 `+` 别名功能：
```text
yourmail+service1@gmail.com
yourmail+service2@gmail.com
```
所有邮件都会发到 `yourmail@gmail.com`，方便追踪来源。

---

## 教育邮箱

获取学生优惠的关键。

### 获取方式

1. **在校学生**：使用学校官方邮箱
2. **校友邮箱**：部分学校提供终身邮箱
3. **第三方获取**：淘宝等平台（存在风险）

### 可获得的权益

| 服务 | 权益 |
|------|------|
| GitHub Student Pack | Copilot 免费 + 各种工具 |
| JetBrains | 全家桶免费 |
| Azure | $100 信用额度 |
| Notion | Pro 版免费 |

---

## 指纹浏览器

用于多账号管理，每个配置文件模拟独立设备。

### 推荐软件

| 软件 | 价格 | 特点 |
|------|------|------|
| [AdsPower](https://www.adspower.net) | 免费版可用 | 中文友好 |
| [Multilogin](https://multilogin.com) | 付费 | 老牌稳定 |
| [GoLogin](https://gologin.com) | 有免费版 | 功能全面 |

### 使用场景

- 管理多个 Google 账号（避免关联封号）
- 批量注册免费服务
- 薅羊毛必备工具

---

## 代理与 VPN

访问海外服务的基础设施。

### 选择建议

- **稳定性优先**：机场服务（自行搜索）
- **隐私优先**：自建 VPS + 协议
- **临时使用**：免费 VPN（速度较慢）

### 注意事项

1. 不要使用免费 VPN 登录重要账号
2. 选择支持 UDP 的节点（用于语音/视频）
3. 保持 IP 一致性，频繁切换可能触发风控
