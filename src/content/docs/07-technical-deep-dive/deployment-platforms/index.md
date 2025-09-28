---
title: 技术向 · 部署平台
description: ""
---

# 部署平台

## 1. 边缘函数

在 CDN 边缘节点运行的轻量级函数，用于处理请求路由、身份验证、A/B 测试等逻辑。

**主要用途**
- API 路由与代理
- 请求重写与重定向
- 身份验证与授权
- 地理位置分流

**技术特点**
- 延迟 < 50ms，全球分布
- 支持 JavaScript/TypeScript
- 128MB 内存，100ms 执行时间限制
- 自动扩缩容，按使用计费

**主流平台**
- Cloudflare Workers: 免费 10万次/天
- Vercel Edge Functions: 免费 50万次/月
- Netlify Edge Functions: 免费 3万次/月

## 2. 待定
