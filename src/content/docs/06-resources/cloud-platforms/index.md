---
title: 云平台
description: 现代应用部署与托管平台指南
contributors:
  - codex
---

## 概述

本节介绍主流云平台,帮助开发者根据项目需求选择合适的部署方案。这些平台均提供零配置或低配置的部署体验,支持快速迭代和自动扩展。

---

## 平台对比

| 平台                    | 支持环境                                    | 核心特点                                                         | 适用场景                              |
| ----------------------- | ------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------- |
| **Cloudflare**          | Workers (JS/TS/Wasm、Node.js 兼容)、Pages   | 全球边缘网络、原生 Node.js 标准库、Workers Observability、KV/R2  | 边缘函数、低延迟 API、全球静态站点    |
| **Vercel**              | Next.js、React、Vue 等前端框架              | Git 自动部署、Edge Runtime、AI Cloud、AI SDK                     | 前端应用、全栈 Web、AI Agent/营销体验 |
| **Netlify**             | Next.js、Astro、Vue、React 等前端框架       | Git 自动部署、AI Gateway、Agent Runners、Edge Functions/存储     | 多端营销站、企业站点、AI 工作流       |
| **Deno**                | Deno (原生 TS/JS)、Deploy V2                | 原生 TypeScript、安全沙箱、npm 兼容增强、Deno KV/Queues          | TypeScript 服务、全栈 API、边缘部署   |
| **Supabase**            | PostgreSQL、RESTful/GraphQL、Edge Functions | 托管 Postgres、多区域只读副本、实时/对象存储、安全事件通知       | 全栈应用、协作工具、关系型数据库项目  |
| **Render**              | 多语言、Docker、Blueprints                  | 全托管 Web/Worker、全球 CDN、私网、零停机部署、Blueprints IaC    | 微服务、后台任务、长期生产环境        |
| **Railway**             | 多语言、Docker、Railway Functions           | 可视化管理、Railway Functions、Metal 区域、内置数据库、按秒计费  | 快速原型、生产级全栈、数据库托管      |
| **Koyeb**               | 多语言、Docker、Serverless GPU              | Serverless GPU(H100/A100)、Autoscaling、Scale-to-zero、私网加速  | AI 推理、批处理、全球高性能 API       |
| **Hugging Face Spaces** | Gradio、Streamlit、Static、Docker           | 免费 CPU Basic、ZeroGPU 免费 GPU、Spaces Secrets、GitHub Actions | AI 演示、推理 API、轻量前端/Key 管理  |
| **Beam Cloud**          | Python/Docker 容器、GPU                     | 免费额度、秒级启动、Checkpoint/Snapshot、GitHub 集成             | GPU 推理、批处理、容器化 API          |
| **Modal**               | Python Runtime、函数、容器/GPU              | 免费额度、Web Endpoints、Cron 调度、代码即部署                   | Python 推理、工作流编排、事件驱动 API |

---

## Official Docs

- [Cloudflare 官方文档](https://developers.cloudflare.com/)
- [Vercel 官方文档](https://vercel.com/docs)
- [Netlify 官方文档](https://docs.netlify.com/)
- [Deno 官方手册](https://docs.deno.com/)
- [Supabase 官方文档](https://supabase.com/docs)
- [Render 官方文档](https://render.com/docs)
- [Railway 官方文档](https://docs.railway.app/)
- [Koyeb 官方文档](https://www.koyeb.com/docs)
