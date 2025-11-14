---
title: 云平台
description: 现代应用部署与托管平台指南
contributors:
  - codex
  - claude
---

# Intro

白嫖的东西太多了,怎么部署和管理呐,自然离不开免费的云服务器了。
本节介绍主流云平台,这些平台均提供零配置或低配置的部署体验,支持快速迭代和自动扩展。


通常会用它们的边缘函数功能（轻量级服务端代码，自动路由全球节点，响应快速），多用JavaScript与TypeScript，可以一键复制粘贴部署运行，也支持本地 cli 部署。 例如，很多的 轻量级2api和代理转发，再比如LibreTV这种项目。

此外还会利用传统云部署环境（容器级别，固定的数据中心区域，需要冷启动），可用 Docker 支持任何 runtime，也有特定的 Python/Node 等环境，部署也很方便，可以通过镜像 或 git 仓库一键部署。例如 grok2api 和 gpt-load这类，如果你要使用astro部署一个静态网站等等，这也是不二之选。

对于特殊的需求，如模型部署和微调，也会有免费的云平台~  


## 云平台对比

| 平台                    | 部署类型      | 支持环境                                    | 核心特点                                                         | 典型用例                                        |
| ----------------------- | ------------- | ------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| **Cloudflare**          | 边缘函数      | Workers (JS/TS/Wasm)、Pages                 | 全球边缘网络、零冷启动、KV/R2 存储、一键部署                      | JS/TS 轻量 2API、代理转发、低延迟 API、静态站点 |
| **Vercel**              | 边缘+传统     | Next.js、React、Vue 等前端框架              | Git 自动部署、Edge Runtime、Serverless Functions、AI SDK         | Astro 静态网站、前端应用、全栈 Web               |
| **Netlify**             | 边缘+传统     | Next.js、Astro、Vue、React 等前端框架       | Git 自动部署、Edge Functions、表单/身份验证、CDN                 | 静态站点、营销页面、JAMstack 应用                |
| **Deno**                | 边缘函数      | Deno (原生 TS/JS)、Deploy V2                | 原生 TypeScript、安全沙箱、全球边缘、Deno KV/Queues              | TS 轻量 2API、边缘 API、CLI 一键部署             |
| **Supabase**            | 传统云        | PostgreSQL、RESTful/GraphQL、Edge Functions | 托管 Postgres、实时订阅、对象存储、身份验证、GitHub 集成          | 全栈应用、数据驱动项目、协作工具                 |
| **Render**              | 传统云        | 多语言、Docker、Blueprints                  | 容器化部署、全球 CDN、私网、零停机部署、Blueprints IaC            | Docker 容器 2API、微服务、长期生产环境           |
| **Railway**             | 传统云        | 多语言、Docker、Railway Functions           | 可视化管理、Docker/Git 一键部署、内置数据库、按秒计费             | grok2api/gpt-load 类项目、快速原型、数据库托管   |
| **Koyeb**               | 传统云+GPU    | 多语言、Docker、Serverless GPU              | Serverless GPU(H100/A100)、Autoscaling、Scale-to-zero、全球加速  | 容器化 2API、AI 推理服务、高性能 API             |
| **Hugging Face Spaces** | GPU 特化      | Gradio、Streamlit、Static、Docker           | 免费 CPU Basic、ZeroGPU 免费 GPU、Spaces Secrets、GitHub Actions | AI 模型演示、推理 API、模型部署测试              |
| **Beam Cloud**          | GPU 特化      | Python/Docker 容器、GPU                     | 免费 GPU 额度、秒级启动、Checkpoint/Snapshot、GitHub 集成         | 模型部署、GPU 推理、批处理任务                   |
| **Modal**               | GPU 特化      | Python Runtime、函数、容器/GPU              | 免费额度、Web Endpoints、Cron 调度、代码即部署                   | Python 模型微调、工作流编排、事件驱动 API        |



交给 ai，轻松实现几个不同平台的部署代码转换。有一些需要注意：
- cf会透传真实ip，解决方法是绑定子域名然后去设置关闭  -->
- render/supabase 等需要保活
- vercel等需要混淆代码


## Practice

经典项目：
- [LibreTV]()
- [cloud mail]()
- [gemini-anti-cut]()
- [api-proxy]()

## Official Docs

- [Cloudflare 官方文档](https://developers.cloudflare.com/)
- [Vercel 官方文档](https://vercel.com/docs)
- [Netlify 官方文档](https://docs.netlify.com/)
- [Deno 官方手册](https://docs.deno.com/)
- [Supabase 官方文档](https://supabase.com/docs)
- [Render 官方文档](https://render.com/docs)
- [Railway 官方文档](https://docs.railway.app/)
- [Koyeb 官方文档](https://www.koyeb.com/docs)
