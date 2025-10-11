---
title: Cloudflare
description: "全球领先的边缘计算平台，提供 Workers、Pages 和 R2 存储等服务"
---

# Cloudflare 平台概述

Cloudflare 是全球最大的边缘计算网络之一，拥有超过 300 个数据中心，为开发者提供高性能、低延迟的云服务。

## 核心服务

### 1. Cloudflare Workers

**什么是 Workers**
- 在 Cloudflare 边缘网络运行的 JavaScript/WebAssembly 函数
- 基于 V8 引擎，支持现代 Web 标准 API
- 冷启动时间 < 1ms，全球延迟 < 50ms

**主要用途**
- **API 代理与路由**：转发请求到后端服务，处理跨域问题
- **身份验证**：JWT 验证、API 密钥检查、用户权限控制
- **请求处理**：数据转换、缓存策略、A/B 测试
- **边缘计算**：图片处理、文本分析、实时数据聚合

**典型用例**
```js
// AI API 代理示例
export default {
  async fetch(request) {
    const url = new URL(request.url)
    if (url.pathname.startsWith('/api/chat')) {
      return fetch('https://api.openai.com/v1/chat/completions', {
        method: request.method,
        headers: {
          'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: request.body
      })
    }
    return new Response('Not Found', { status: 404 })
  }
}
```

**技术限制**
- CPU 时间：10ms（免费）/ 50ms（付费）
- 内存：128MB
- 请求大小：100MB
- 免费额度：10万次请求/天

### 2. Cloudflare Pages

**什么是 Pages**
- 静态网站托管服务，支持前端框架自动构建
- 与 Git 仓库集成，支持预览分支和自动部署
- 内置 Functions 功能，可运行全栈应用

**主要用途**
- **静态网站托管**：React、Vue、Astro 等框架应用
- **JAMstack 应用**：结合 API 和预构建标记的现代 Web 应用
- **文档站点**：技术文档、博客、营销页面
- **全栈应用**：通过 Pages Functions 提供后端 API

**典型用例**
- AI 聊天界面部署
- 文档网站（如本项目）
- 企业官网与落地页
- 开发者工具的 Web 界面

**技术特点**
- 支持 20+ 前端框架
- 自动 HTTPS 和 CDN 加速
- 分支预览和回滚功能
- 免费额度：500 次构建/月，100GB 带宽/月

### 3. Cloudflare R2 存储

**什么是 R2**
- 兼容 S3 API 的对象存储服务
- 零出站费用，只收取存储和操作费用
- 全球分布式存储，自动数据复制

**主要用途**
- **静态资源存储**：图片、视频、文档文件
- **数据备份**：数据库备份、日志归档
- **CDN 源站**：作为 Cloudflare CDN 的源服务器
- **大文件分发**：软件包、模型文件、数据集

**典型用例**
```js
// 上传文件到 R2
const object = await env.MY_BUCKET.put('file.txt', 'Hello World!', {
  httpMetadata: {
    contentType: 'text/plain',
  },
})

// 读取文件
const object = await env.MY_BUCKET.get('file.txt')
const text = await object.text()
```

**成本优势**
- 存储：$0.015/GB/月
- Class A 操作：$4.50/百万次
- Class B 操作：$0.36/百万次
- **零出站费用**（相比 AWS S3 节省 90%+）

## 集成优势

### 统一生态系统
- Workers、Pages、R2 无缝集成
- 统一的开发者控制台和 CLI 工具
- 共享环境变量和密钥管理

### 性能优化
- 全球边缘网络，就近服务用户
- 智能路由和负载均衡
- 自动缓存和压缩优化

### 开发体验
- 本地开发工具 Wrangler CLI
- 实时日志和性能监控
- 简单的部署和版本管理

## Wrangler CLI 配置与使用

### 安装与初始化

**全局安装 Wrangler**
```bash
npm install -g wrangler
# 或使用 yarn
yarn global add wrangler
```

**登录 Cloudflare 账户**
```bash
wrangler login
# 会打开浏览器进行 OAuth 授权
```

**验证登录状态**
```bash
wrangler whoami
```

### Workers 项目配置

**创建新 Worker 项目**
```bash
# 使用模板创建
wrangler generate my-worker
cd my-worker

# 或手动初始化
mkdir my-worker && cd my-worker
wrangler init
```

**配置文件 `wrangler.toml`**
```toml
name = "my-worker"
main = "src/index.js"
compatibility_date = "2024-01-01"

# 环境变量
[vars]
ENVIRONMENT = "production"

# KV 存储绑定
[[kv_namespaces]]
binding = "MY_KV"
id = "your-kv-namespace-id"

# R2 存储绑定
[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "my-r2-bucket"

# D1 数据库绑定
[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "your-database-id"
```

### 常用开发命令

**本地开发**
```bash
# 启动本地开发服务器
wrangler dev
# 指定端口
wrangler dev --port 8080
# 启用远程模式（使用真实的 KV/R2 等资源）
wrangler dev --remote
```

**部署相关**
```bash
# 部署到 Cloudflare
wrangler deploy

# 部署到特定环境
wrangler deploy --env production

# 查看部署状态
wrangler deployments list
```

**日志与调试**
```bash
# 实时查看日志
wrangler tail

# 查看特定时间段的日志
wrangler tail --since 1h

# 过滤日志
wrangler tail --search "error"
```


### 资源管理命令

**KV 存储操作**
```bash
# 创建 KV 命名空间
wrangler kv:namespace create "MY_KV"

# 上传键值对
wrangler kv:key put --binding=MY_KV "key1" "value1"

# 获取值
wrangler kv:key get --binding=MY_KV "key1"

# 列出所有键
wrangler kv:key list --binding=MY_KV
```

**R2 存储操作**
```bash
# 创建 R2 存储桶
wrangler r2 bucket create my-bucket

# 上传文件
wrangler r2 object put my-bucket/file.txt --file ./local-file.txt

# 下载文件
wrangler r2 object get my-bucket/file.txt --file ./downloaded-file.txt

# 列出对象
wrangler r2 object list my-bucket
```

**D1 数据库操作**
```bash
# 创建数据库
wrangler d1 create my-database

# 执行 SQL
wrangler d1 execute my-database --command "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)"

# 从文件执行 SQL
wrangler d1 execute my-database --file ./schema.sql
```

### 环境管理

**多环境配置**
```toml
# wrangler.toml
name = "my-worker"
main = "src/index.js"

# 开发环境
[env.development]
name = "my-worker-dev"
vars = { ENVIRONMENT = "development" }

# 生产环境
[env.production]
name = "my-worker-prod"
vars = { ENVIRONMENT = "production" }
```

**部署到不同环境**
```bash
# 部署到开发环境
wrangler deploy --env development

# 部署到生产环境
wrangler deploy --env production
```

### 最佳实践

**1. 密钥管理**
```bash
# 设置密钥（不会出现在代码中）
wrangler secret put API_KEY
# 输入密钥值

# 在代码中使用
export default {
  async fetch(request, env) {
    const apiKey = env.API_KEY
    // 使用 apiKey
  }
}
```

**2. 本地测试配置**
```bash
# 创建 .dev.vars 文件用于本地开发
echo "API_KEY=your-local-api-key" > .dev.vars
```

**3. CI/CD 集成**
```yaml
# GitHub Actions 示例
name: Deploy Worker
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

### 故障排除

**常见问题**
- **认证失败**：运行 `wrangler login` 重新登录
- **部署超时**：检查网络连接，或使用 `--compatibility-date` 参数
- **资源绑定错误**：确认 `wrangler.toml` 中的 ID 正确
- **本地开发问题**：使用 `wrangler dev --remote` 连接真实资源

## 实际应用场景

### AI 应用部署
```
前端（Pages）→ API 层（Workers）→ 存储（R2）
    ↓              ↓                ↓
React 聊天界面   OpenAI 代理      模型文件存储
```

### 全栈 Web 应用
- 前端：Pages 托管 React/Vue 应用
- 后端：Workers 提供 API 服务
- 存储：R2 存储用户上传文件
- 数据库：集成 D1（SQLite）或外部数据库

### 内容分发网络
- R2 作为源站存储静态资源
- Workers 处理动态内容和个性化
- Pages 托管管理后台界面

> **总结**：Cloudflare 提供了完整的边缘计算解决方案，特别适合需要全球低延迟访问的 AI 应用和现代 Web 应用。其零出站费用的 R2 存储和高性能的 Workers 使其成为成本效益最高的云平台之一。
