---
title: 云平台
description: 现代应用部署与托管平台指南
---

## 概述

本节介绍主流云平台,帮助开发者根据项目需求选择合适的部署方案。这些平台均提供零配置或低配置的部署体验,支持快速迭代和自动扩展。

---

## 平台对比

| 平台           | 支持环境                       | 核心特点                                         | 适用场景                             |
| -------------- | ------------------------------ | ------------------------------------------------ | ------------------------------------ |
| **Cloudflare** | Workers (JS/TS/Wasm)、Pages    | 全球边缘节点、免费 SSL/DDoS 防护、KV 存储        | 静态网站、边缘函数、CDN 加速         |
| **Vercel**     | Next.js、React、Vue 等前端框架 | Git 自动部署、全球边缘网络、零配置、Edge Runtime | 前端应用、全栈 Web、营销网站         |
| **Deno**       | Deno (原生 TS/JS)              | 原生 TypeScript、安全沙箱、Deno KV 数据库        | TypeScript 项目、边缘函数、API 服务  |
| **Supabase**   | PostgreSQL、RESTful/GraphQL    | 托管数据库、用户认证、实时订阅、对象存储         | 全栈应用、实时协作、关系型数据库项目 |
| **Render**     | 多语言、Docker                 | Web 服务、Cron 任务、托管数据库、零停机部署      | Web 服务、后台任务、微服务架构       |
| **Railway**    | 多语言、Docker                 | 可视化管理、内置数据库、按秒计费、自动扩展       | 快速原型、全栈应用、数据库托管       |
| **Koyeb**      | 多语言、Docker、GPU            | GPU/加速器支持、全球 50+ 节点、快速冷启动        | AI 应用、机器学习推理、高性能 API    |

---

## 延伸阅读

- [Cloudflare 官方文档](https://developers.cloudflare.com/)
- [Vercel 官方文档](https://vercel.com/docs)
- [Deno 官方手册](https://docs.deno.com/)
- [Supabase 官方文档](https://supabase.com/docs)
- [Render 官方文档](https://render.com/docs)
- [Railway 官方文档](https://docs.railway.app/)
- [Koyeb 官方文档](https://www.koyeb.com/docs)
