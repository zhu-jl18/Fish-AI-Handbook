# 🐟 Fish写给朋友们的AI使用指南（中文 README + 萌新部署指南）

> 基于原作者 README 扩展，保留原文不变；本文件面向萌新，提供从零到部署的详细步骤与排错建议。

- 原文地址：`README.md`
- 在线站点：https://fish-ai-book.vercel.app

## 项目简介

这是一个基于 Astro.js 的静态网站，内容以 Markdown 为主，适合用来写 AI 使用指南与知识库。特点：
- 结构清晰：`src/content` 管内容，`src/pages` 管路由
- 上手简单：npm 安装依赖即可本地跑
- 易于部署：Vercel/Netlify/GitHub Pages/Cloudflare Pages 均支持

## 环境要求

- Node.js ≥ 18（推荐 20 LTS）
- npm（随 Node 自带）
- Git（用于拉取源码与推送仓库）

在 Windows PowerShell 中检查版本：

```powershell
node -v
npm -v
git --version
```

若 Node 版本低于 18，请到 https://nodejs.org/ 下载并安装 LTS 版本。

## 本地运行（Windows / PowerShell）

1) 克隆项目

```powershell
# 建议先 fork 一份到自己的 GitHub 账号
# 将 <your-name> 替换为你的 GitHub 用户名

git clone https://github.com/zhu-jl18/Fish-AI-Handbook.git
cd "Fish-AI-Handbook"  # 若你的文件夹名是 "AI BOOK"，请使用：cd "AI BOOK"
```

2) 安装依赖

```powershell
npm install
```

3) 启动开发服务器

```powershell
npm run dev
```

启动成功后，浏览器访问：http://localhost:4321

4) 构建生产版本与本地预览

```powershell
npm run build
npm run preview  # 预览 dist 目录的构建结果
```

## 目录结构速览

```
src/
  content/      # Markdown 内容（docs、posts）
  layouts/      # Astro 布局组件
  pages/        # 路由页面（.astro/.md）
  styles/       # 全局样式
public/         # 静态资源（原样拷贝到 dist）
astro.config.mjs
package.json
```

## 一键部署（强烈推荐）

本项目是静态站点（`output: 'static'`），构建产物在 `dist/`。常见平台参数基本一致：
- Install command：`npm install`
- Build command：`npm run build`
- Output / Publish / Build output：`dist`
- Node 版本：18/20（推荐 20 LTS）

### 方案 A：Vercel（最省心）

1) 将仓库推送到 GitHub（若还没推）
2) 打开 https://vercel.com 并登录（GitHub 账号一键登录）
3) New Project → Import Git Repository → 选择你的仓库
4) Framework 识别为 Astro（自动）
5) 保持默认：
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6) Deploy → 等待构建完成，即可获得域名
7) 自定义域名：Settings → Domains 绑定你的域名

Tips：仓库根的 `astro.config.mjs` 中已设置 `site`。若你使用自定义域名，建议将其改为你的站点 URL（不改也可以正常部署）。

### 方案 B：Netlify（拖拽或连 Git）

方法一（连 Git）：
1) 登录 https://app.netlify.com → Add new site → Import an existing project
2) 选 GitHub 仓库 → Basic build settings：
   - Build command: `npm run build`
   - Publish directory: `dist`
3) Deploy site → 完成后可设置自定义域名

方法二（拖拽）：
1) 本地执行 `npm run build`
2) 将 `dist/` 文件夹拖到 Netlify 的 Deploys 页面 → 立即上线

可选：在 Netlify Site settings → Environment → Environment variables 设置 `NODE_VERSION=20`。

### 方案 C：Cloudflare Pages（CDN 速度快）

1) 登录 https://pages.cloudflare.com/
2) Create a project → Connect to Git → 选择仓库
3) Build settings：
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 20（在 Build settings 或 Pages → Settings → Environment variables 配置）
4) Save and deploy → 完成后可绑定自定义域名（支持免费通配证书）

### 方案 D：GitHub Pages（GitHub 原生）

思路：用 GitHub Actions 在云端构建，再把 `dist` 推到 `gh-pages` 分支。

1) 启用 Pages：在仓库 Settings → Pages → Source 选 `Deploy from a branch`，Branch 选择 `gh-pages`（先保存，稍后工作流会创建分支）
2) 添加工作流文件：在仓库新建 `.github/workflows/deploy.yml`，内容如下：

```yaml
name: Deploy Astro to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: gh-pages
```

3) 推送到 main 后，Actions 会自动构建并发布到 `gh-pages` 分支
4) 访问 Settings → Pages 查看你的站点 URL

## 常见问题与排错（FAQ）

- 端口被占用（4321）：
  - 解决：`npm run dev -- --port 4322`
- `astro: command not found` 或 `无法识别 astro`：
  - 解决：确保在项目根目录执行 `npm install`，不要全局安装；之后 `npm run dev`
- Node 版本过低或 ESM 错误（如 ERR_MODULE_NOT_FOUND）：
  - 解决：升级到 Node 18/20 LTS；升级后重新打开终端并 `node -v` 校验
- 国内安装慢（`npm install` 卡住）：
  - 解决（可选）：`npm config set registry https://registry.npmmirror.com`，再执行 `npm install`
- 构建后页面 404：
  - 检查平台发布目录是否为 `dist`
  - GitHub Pages 下路由前缀问题可通过自定义域名或在 `astro.config.mjs` 设置 `base`（本项目默认使用根路径，无前缀）

## 内容编写指南

- 新增文档：在 `src/content/docs/` 或 `src/content/posts/` 下添加 Markdown 文件
- 基本 Frontmatter：

```markdown
---
title: 页面标题
description: 页面描述
date: 2025-01-15
---

# 正文标题

正文内容……
```

- 图片请放 `public/` 并以绝对路径 `/images/xxx.png` 引用
- 页面布局可参考 `src/layouts/` 与 `src/pages/`

## 脚本与配置

- 开发：`npm run dev`
- 构建：`npm run build`
- 预览：`npm run preview`
- 代码格式化：`npm run format`
- 站点配置：`astro.config.mjs`（`site`、`title` 等）

## 许可证与致谢

- 本项目采用 MIT 许可证（详见原仓库）
- 感谢 Astro 团队与所有贡献者

---

若你是第一次部署静态网站，推荐使用 Vercel，一般 2～3 分钟即可上线；遇到问题按 FAQ 排查或提 Issue。祝你部署顺利！
