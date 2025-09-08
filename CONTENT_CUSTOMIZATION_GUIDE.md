# AI Book 内容自定义指南

这份指南将教你如何自定义AI使用指南网站的内容，包括调整、删除和新增内容。

## 📁 项目结构理解

```
ai-book/
├── src/
│   ├── pages/           # 页面文件（主要编辑区域）
│   │   ├── index.astro  # 首页
│   │   ├── basic/       # 基础使用章节
│   │   ├── advanced/    # 进阶玩法章节
│   │   ├── api-key/     # API Key管理章节
│   │   ├── prompts/     # 提示词工程章节
│   │   └── fish-talks/  # Fish想说章节
│   ├── layouts/         # 页面布局模板
│   ├── components/      # 可复用组件
│   └── styles/          # 全局样式
├── public/              # 静态资源
└── astro.config.mjs     # Astro配置文件
```

## 🔧 开发环境准备

### 1. 启动开发服务器
```bash
cd ai-book
npm run dev
```
服务器启动后，访问 http://localhost:4321 （或显示的其他端口）

### 2. 实时预览
修改文件后保存，浏览器会自动刷新显示最新内容。

## ✏️ 修改现有内容

### 修改页面文本内容

**示例：修改首页标题**

1. 打开 `src/pages/index.astro`
2. 找到以下代码：
```astro
<h1>Fish写给朋友们的AI使用指南</h1>
```
3. 修改为你想要的标题：
```astro
<h1>你的自定义AI指南</h1>
```

**示例：修改章节内容**

1. 打开任意内容页面，如 `src/pages/basic/gui-tools/index.astro`
2. 找到你要修改的内容段落
3. 直接编辑Markdown格式的文本

### 修改导航菜单

**修改顶部导航：**

1. 打开 `src/components/Header.astro`
2. 找到导航链接部分：
```astro
<div class="nav-links">
  <a href="/fish-talks" class={currentPage === 'fish-talks' ? 'active' : ''}>Fish想说</a>
  <a href="/basic" class={currentPage === 'basic' ? 'active' : ''}>基础使用</a>
  <a href="/api-key" class={currentPage === 'api-key' ? 'active' : ''}>API KEY</a>
  <a href="/prompts" class={currentPage === 'prompts' ? 'active' : ''}>提示词</a>
  <a href="/advanced" class={currentPage === 'advanced' ? 'active' : ''}>进阶玩法</a>
</div>
```
3. 修改链接文本或添加/删除链接

**修改侧边栏导航：**

每个页面都有自己的侧边栏配置，在文件顶部的 `sidebarContent` 变量中：
```astro
const sidebarContent = `
  <a href="/basic/gui-tools" class="active">GUI工具概述</a>
  <a href="/basic/gui-tools/lobe-chat">Lobe Chat</a>
  <a href="/basic/gui-tools/open-webui">Open WebUI</a>
`;
```

## ➕ 添加新内容

### 1. 添加新页面

**创建新的内容页面：**

1. 在相应的目录下创建新的 `.astro` 文件
2. 使用模板结构：

```astro
---
import ContentLayout from '../../layouts/ContentLayout.astro';

const sidebarContent = `
  <a href="/your-section">章节首页</a>
  <a href="/your-section/new-page" class="active">新页面</a>
`;

const headings = [
  { id: 'introduction', text: '介绍', depth: 1 },
  { id: 'content', text: '主要内容', depth: 2 },
];
---

<ContentLayout 
  title="新页面标题"
  section="章节名称"
  currentPage="new-page"
  sidebarContent={sidebarContent}
  headings={headings}
>
  <h1 id="introduction">新页面标题</h1>
  
  <p>这里是你的内容...</p>
  
  <h2 id="content">主要内容</h2>
  <p>更多内容...</p>
</ContentLayout>

<style>
/* 自定义样式 */
.custom-class {
  color: #4a9eff;
}
</style>
```

### 2. 添加新章节

**完整的新章节创建步骤：**

1. **创建章节目录：**
```bash
mkdir src/pages/new-section
```

2. **创建章节首页：**
创建 `src/pages/new-section/index.astro`：
```astro
---
import ContentLayout from '../../layouts/ContentLayout.astro';

const sidebarContent = `
  <a href="/new-section" class="active">章节概述</a>
  <a href="/new-section/topic1">主题1</a>
  <a href="/new-section/topic2">主题2</a>
`;

const headings = [
  { id: 'introduction', text: '章节介绍', depth: 1 },
  { id: 'topics', text: '主要主题', depth: 2 },
];
---

<ContentLayout 
  title="新章节"
  section="新章节"
  currentPage="new-section"
  sidebarContent={sidebarContent}
  headings={headings}
>
  <h1 id="introduction">新章节介绍</h1>
  
  <p>这是一个新增的章节，涵盖以下主题：</p>
  
  <h2 id="topics">主要主题</h2>
  <ul>
    <li><a href="/new-section/topic1">主题1</a></li>
    <li><a href="/new-section/topic2">主题2</a></li>
  </ul>
</ContentLayout>
```

3. **创建子页面：**
创建 `src/pages/new-section/topic1.astro` 等子页面

4. **更新导航：**
在 `src/components/Header.astro` 中添加新章节链接

5. **更新首页：**
在 `src/pages/index.astro` 中添加新章节的快捷入口

## ❌ 删除内容

### 1. 删除页面

**删除单个页面：**
1. 直接删除对应的 `.astro` 文件
2. 更新相关的导航链接和侧边栏

**删除整个章节：**
1. 删除整个章节目录
2. 从 `Header.astro` 中删除导航链接
3. 从首页删除相关入口

### 2. 删除导航项

在 `src/components/Header.astro` 中删除不需要的链接：
```astro
<!-- 删除这行 -->
<a href="/unwanted-section">不需要的章节</a>
```

## 🎨 样式自定义

### 1. 全局样式修改

在 `src/layouts/BaseLayout.astro` 中修改全局样式：
```css
<style is:global>
  /* 修改主色调 */
  :root {
    --primary-color: #your-color;
    --secondary-color: #your-secondary-color;
  }
  
  /* 修改背景色 */
  body {
    background-color: #your-background;
    color: #your-text-color;
  }
</style>
```

### 2. 组件样式修改

每个页面都可以有自己的 `<style>` 块：
```astro
<style>
.custom-box {
  background-color: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
}

.highlight-text {
  color: #4a9eff;
  font-weight: bold;
}
</style>
```

## 🔧 高级自定义

### 1. 自定义组件

创建可复用的组件 `src/components/CustomBox.astro`：
```astro
---
const { title, type = "info" } = Astro.props;
---

<div class={`custom-box ${type}`}>
  <h4>{title}</h4>
  <slot />
</div>

<style>
.custom-box {
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.custom-box.info {
  background-color: #1e293b;
  border-left: 4px solid #4a9eff;
}

.custom-box.warning {
  background-color: #2d1b1b;
  border-left: 4px solid #f87171;
}
</style>
```

在页面中使用：
```astro
---
import CustomBox from '../../components/CustomBox.astro';
---

<CustomBox title="提示" type="info">
  这是一个自定义的信息框。
</CustomBox>
```

### 2. 动态内容

使用Astro的JavaScript功能：
```astro
---
// 动态生成内容
const tools = [
  { name: "工具1", description: "工具1的描述" },
  { name: "工具2", description: "工具2的描述" }
];
---

{tools.map(tool => (
  <div class="tool-card">
    <h3>{tool.name}</h3>
    <p>{tool.description}</p>
  </div>
))}
```

## 📝 内容编写最佳实践

### 1. Markdown格式

支持完整的Markdown语法：
```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*
`行内代码`

- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2

> 引用文本

```代码块```
```

### 2. 代码示例

使用语法高亮的代码块：
```astro
<div class="code-example">
  <pre><code class="language-python">
def hello_world():
    print("Hello, World!")
  </code></pre>
</div>
```

### 3. 交互式元素

添加可点击的展开/折叠内容：
```astro
<details>
  <summary>点击展开详细信息</summary>
  <p>这里是详细内容...</p>
</details>
```

## 🚀 部署更新

### 1. 构建静态文件
```bash
npm run build
```

### 2. 预览构建结果
```bash
npm run preview
```

### 3. 部署到Vercel（如已配置）
```bash
git add .
git commit -m "更新内容"
git push
```

## 💡 常用模板

### 信息框模板
```astro
<div class="info-box">
  <h4>💡 提示</h4>
  <p>这里是提示内容</p>
</div>
```

### 对比表格模板
```astro
<table>
  <thead>
    <tr>
      <th>特性</th>
      <th>选项A</th>
      <th>选项B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>价格</td>
      <td>$10</td>
      <td>$20</td>
    </tr>
  </tbody>
</table>
```

### 步骤指南模板
```astro
<div class="step-guide">
  <div class="step">
    <h4>步骤 1</h4>
    <p>第一步的描述</p>
  </div>
  <div class="step">
    <h4>步骤 2</h4>
    <p>第二步的描述</p>
  </div>
</div>
```

## ⚠️ 注意事项

1. **文件命名**：使用小写字母和连字符，如 `my-new-page.astro`
2. **路径引用**：注意相对路径的正确性
3. **实时预览**：保存文件后检查浏览器中的效果
4. **样式冲突**：避免CSS类名冲突，使用唯一的类名
5. **导航一致性**：添加新页面后记得更新所有相关的导航

这份指南应该能帮助你轻松自定义AI使用指南网站的各种内容。有任何问题都可以参考项目中现有的页面作为模板！
# 项目总览与使用教程（总览 + 起步）

> 本节为概览与上手指南，补充现有的内容定制说明，便于首次克隆项目或交接同学快速了解技术栈、目录、开发与发布方式。

## 项目简介

- 基于 Astro 4 的静态站点，主题为“AI/大模型应用指南”。
- 文件即路由：`src/pages` 下的 `.astro` 文件会自动映射成页面路径。
- 三栏信息架构：头部导航、左侧分区目录、右侧页面目录（TOC）。
- 代码体验：全局代码高亮与一键复制按钮（`src/scripts/copy-code.js`）。

## 技术栈

- 框架：Astro 4（`ai-book/package.json` 中 `astro: ^4.0.0`）
- 语言：TypeScript/JavaScript + Astro 模板语法
- 样式：原生 CSS（全局样式位于 `src/styles/global.css`）
- 构建：静态导出（`astro.config.mjs` 中 `output: 'static'`）
- 资源：在 `BaseLayout.astro` 中统一注入 `<head>`、全局样式与脚本

## 目录结构（关键路径）

- `ai-book/src/pages`：页面文件（文件即路由）
  - `index.astro`：首页
  - `basic/`、`advanced/`、`api-key/`、`prompts/`、`fish-talks/`：各板块首页与子页
- `ai-book/src/layouts`：布局模板
  - `BaseLayout.astro`：站点基础 HTML 框架
  - `ContentLayout.astro`：深色主题，Header + 左侧栏 + 右侧 TOC 三栏布局
  - `ContentPageLayout.astro`：浅色主题，内置侧栏 + TOC 的简洁布局
- `ai-book/src/components`：通用组件（`Header`、`LeftSidebar`、`RightSidebar`）
- `ai-book/src/styles/global.css`：全局样式与代码高亮样式
- `ai-book/src/scripts/copy-code.js`：为所有 `pre > code` 添加“Copy”按钮
- `ai-book/astro.config.mjs`：Astro 配置（站点信息、构建输出模式）

## 环境要求

- Node.js 18+
- 包管理器：npm（建议 `npm ci` 保持依赖锁一致）

## 快速开始

- 安装依赖：在 `ai-book` 目录执行 `npm ci`（或 `npm install`）
- 启动开发：`npm run dev`（默认 `http://localhost:4321`，保存即热更新）
- 生产构建：`npm run build`（产物输出到 `ai-book/dist/`）
- 本地预览：`npm run preview`

## 内容与路由

- 新建页面：在 `src/pages/<section>/your-page.astro` 新增文件，即可通过 `/section/your-page` 访问。
- 示例：
  - `src/pages/basic/index.astro`：使用 `ContentLayout.astro`，通过 `headings` 数组驱动右侧 TOC，通过 `sidebarContent` HTML 字符串定义左侧导航。
  - `src/pages/api-key/index.astro`：使用 `ContentPageLayout.astro`，在 props 中传入 `title/section/currentPage/sidebarContent/headings`。

## 自定义与修改内容

- 修改站点标题/描述
  - `ai-book/astro.config.mjs`：`site`、`title`
  - `ai-book/src/layouts/BaseLayout.astro`：`<title>`、`<meta name="description">`、字体等
- 修改头部导航
  - 文件：`src/components/Header.astro`
  - 调整 `<a href>` 项与文案；在页面中通过 `<Header currentPage="...">` 控制当前高亮
- 修改左侧栏（分区内导航）
  - 使用 `ContentLayout.astro` 时，在页面中通过 `sidebarContent`（HTML 字符串）传入链接列表
  - 示例：`const sidebarContent = \`<a href="/basic/gui-tools" class=\"active\">GUI 工具</a><a href=\"/basic/cli-tools\">CLI 工具</a>\`;`
- 修改右侧目录（TOC）
  - 在页面中传入 `headings` 数组（`{ id, text, depth }`），由 `RightSidebar.astro` 渲染
- 新增板块
  - 在 `src/pages` 下新建文件夹（如 `new-section`），建立 `new-section/index.astro` 作为板块首页
  - 在 `Header.astro` 中添加顶栏入口（如 `<a href="/new-section">新板块</a>`）
- 删除页面/板块
  - 删除对应 `.astro` 文件/文件夹
  - 同步清理 `Header.astro` 菜单项及其他页面的 `sidebarContent` 链接
- 首页入口与文案
  - 文件：`src/pages/index.astro`，修改主标题、副标题与板块链接按钮

## 两套内容页布局的选择建议

- `ContentLayout.astro`（深色三栏）：适合教程/手册类，左侧分区导航 + 右侧 TOC；支持 Header 固定。
- `ContentPageLayout.astro`（浅色简洁）：适合说明/文档类，内置侧栏 + TOC，更轻量。
- 二者 props 接口相近：`{ title, section, currentPage, sidebarContent, headings }`。同一分区建议统一布局风格。

## 样式定制

- 全局样式：`src/styles/global.css`
  - 主题变量：`--bg-color`、`--text-color`、`--link-color` 等
  - 代码块复制按钮样式：`.code-copy-button`
- 页面级样式：各 `.astro` 页面底部 `<style>` 中按需覆盖
- 字体与 `<head>`：`BaseLayout.astro` 中统一管理（可替换或移除 Google Fonts）

## 配置项

- `ai-book/astro.config.mjs`
  - `site`：站点地址（用于生成 canonical、RSS 等）
  - `title`：默认标题
  - `output: 'static'`：静态构建输出
- `ai-book/src/env.d.ts`：Astro 类型引用

## 构建与部署

- 本地构建：`npm run build`
- 本地预览：`npm run preview`
- 部署：将 `ai-book/dist` 作为静态目录部署到 Vercel/Netlify/GitHub Pages/自建 CDN 即可
  - Vercel：项目根目录选择 `ai-book`，构建命令 `npm run build`，输出目录 `dist`

## 写作与内容规范

- 文件命名：短横线小写（如 `my-new-page.astro`）
- 链接一致性：`href` 与实际路由保持一致
- TOC 生效：正文标题中的 `id` 与 `headings` 中的 `id` 对齐
- 实时预览：建议 `npm run dev` 下边改边看，及时校验导航与目录

> 提示：更细的内容定制、样式示例与组件扩展，详见本文件其余章节和各页面示例代码。
