# 🐟 Fish写给朋友们的AI使用指南

> 一个简洁、友好的 AI 使用指南网站，旨在帮助朋友们更好地理解和使用人工智能工具。

## 📖 关于本项目

这是一个基于 [Astro.js](https://astro.build/) 框架构建的静态网站，提供清晰易懂的 AI 使用指导和实用信息。无论你是 AI 新手还是有一定经验的用户，都能在这里找到有价值的内容。

### ✨ 特性

- 📚 **系统化的知识结构** - 从基础到进阶，循序渐进
- 🎯 **实用性导向** - 注重实际应用场景和案例
- 🚀 **高性能** - 基于 Astro 的静态网站，加载速度极快
- 📱 **响应式设计** - 完美适配各种设备屏幕
- 🔍 **易于导航** - 清晰的内容组织和导航结构

## 🛠️ 技术栈

- **框架**: [Astro.js](https://astro.build/) - 现代化的静态网站生成器
- **内容管理**: Markdown 文件 + Astro Content Collections
- **样式**: CSS/SCSS
- **部署**: 静态托管（支持 Vercel、Netlify、GitHub Pages 等）

## 🚀 快速开始

### 前置要求

- Node.js 18.0.0 或更高版本
- npm 或 pnpm 包管理器

### 安装步骤

1. **克隆项目**
   ```bash
   git clone [your-repository-url]
   cd "AI BOOK"
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```
   
   访问 `http://localhost:4321` 查看网站

## 📦 可用脚本

| 命令 | 描述 |
| --- | --- |
| `npm run dev` | 启动开发服务器（支持热重载） |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 本地预览构建后的网站 |
| `npm start` | 同 `npm run dev` |

## 📁 项目结构

```
AI BOOK/
├── src/
│   ├── content/         # Markdown 内容文件
│   │   └── docs/       # 文档内容
│   ├── layouts/        # 页面布局组件
│   ├── pages/          # 页面路由
│   └── styles/         # 全局样式
├── dist/               # 构建输出目录
├── astro.config.mjs    # Astro 配置文件
├── package.json        # 项目依赖和脚本
└── README.md          # 本文件
```

## ✏️ 内容编写

### 添加新内容

1. 在 `src/content/docs/` 目录下创建新的 Markdown 文件
2. 使用标准 Markdown 语法编写内容
3. 文件会自动被 Astro 处理并生成对应的页面

### Markdown 文件格式

```markdown
---
title: 页面标题
description: 页面描述
date: 2025-01-15
---

# 标题

内容...
```

## 🚢 部署

### 构建生产版本

```bash
npm run build
```

构建完成后，静态文件将生成在 `dist/` 目录中。

### 部署选项

本项目可以部署到任何支持静态网站托管的平台：

- **Vercel**: 一键部署，自动 CI/CD
- **Netlify**: 拖拽 dist 文件夹即可部署
- **GitHub Pages**: 使用 GitHub Actions 自动部署
- **Cloudflare Pages**: 快速全球 CDN 分发

## 🤝 贡献指南

欢迎贡献内容和改进建议！

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 内容贡献规范

- 保持内容简洁明了，避免过于技术化的表述
- 使用实际案例来说明概念
- 检查拼写和语法错误
- 确保所有链接有效

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👤 作者

**Fish**

- 为朋友们编写的 AI 使用指南
- 致力于让 AI 技术更加平易近人

## 🙏 致谢

- 感谢所有为本项目贡献内容的朋友们
- 感谢 [Astro](https://astro.build/) 团队提供的优秀框架
- 感谢所有提供反馈和建议的读者

## 📮 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 提交 [Issue](../../issues)
- 发送邮件至 [your-email@example.com]

---

<p align="center">
  用 ❤️ 制作，为了让 AI 更好地服务每一个人
</p>