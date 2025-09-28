# 🐟 Fish写给朋友们的AI使用指南

> 本项目由两位作者共同维护，面向朋友与朋友的朋友开放使用。以实践为主，强调可靠与可维护。

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

| 命令              | 描述                         |
| ----------------- | ---------------------------- |
| `npm run dev`     | 启动开发服务器（支持热重载） |
| `npm run build`   | 构建生产版本                 |
| `npm run preview` | 本地预览构建后的网站         |
| `npm start`       | 同 `npm run dev`             |

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
## 📑 内容组织与路由规范（强约束）

面向“最多三级”的明确约束：
- 顶级（一级）为大章节目录，目录名以两位编号起头（如 `03-setup`），包含 `index.md`
- 二级一律为“文件夹 + index.md”（即便暂时没有子页也必须使用目录形式，便于后续扩展）
- 三级为具体内容页，可为单个 `.md`，或在需要再聚合时也可使用“文件夹 + index.md`
- 严禁出现第四级目录

命名与路径规则：
- 内容文件位于 `src/content/docs/<一级>/<二级>/[<三级>.md|index.md]`
- 页面路由位于 `src/pages/<一级去编号>/<二级>/[<三级>.astro|index.astro]`
- 页面读取内容必须使用 `getEntry('docs', '<一级>/<二级>/index')`；三级页使用 `getEntry('docs', '<一级>/<二级>/<三级>')`
- 统一使用连字符（kebab-case）命名英文路径；中文标题在 frontmatter 的 `title` 中给出

新增内容的步骤：
1. 在 `src/content/docs/<一级>/<二级>/index.md` 创建/编辑内容（三级则创建 `<三级>.md`）
2. 在 `src/pages/<一级去编号>/<二级>/index.astro`（或 `<三级>.astro`）读取内容
3. 在 `src/scripts/sidebars.ts` 中注册到对应侧边栏
4. 确认本地 `npm run dev` 页面可渲染，无“文档未找到或渲染失败”提示

风格统一：
- 每个二级都应有“概览/引导”的 `index.md`
- 标题、描述写在 frontmatter；正文首屏尽量给出“本页覆盖内容/适用对象/产出”的提示


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

想要一步一步的详细部署步骤（Vercel / Netlify / GitHub Pages / Cloudflare Pages）和常见问题排查，请参考：

- 《README.zh-CN.md》：更详细的面向萌新的部署指南

## 🤝 协作与贡献原则（受邀制）

本项目由两位维护者共同维护，面向朋友与朋友的朋友开放阅读与协作。外部 PR / Issue 默认不开放，采取受邀制。

协作流程：
1. 先通过维护者私聊沟通意图与范围
2. 认领具体页面或问题
3. 按“内容组织与路由规范”提交变更（PR）
4. 由维护者评审合入

内容规范补充：
- 二级一律“文件夹 + index.md”；不新增第四层
- 导航顺序与编号保持一致
- 文字风格友好、克制，避免夸张或营销用语
- 引用需注明来源，图片遵循版权与署名规范
- 提交前自测：本地构建与页面渲染无错误

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

- 优先通过维护者私聊/微信群沟通（受邀协作）
- Issue 默认仅对受邀协作者开放；公开反馈请先经维护者确认
- 不公开邮箱；如需邮件沟通，将在私聊中提供

---

<p align="center">
  用 ❤️ 制作，为了让 AI 更好地服务每一个人
</p>