---
title: 环境准备 · Node.js
description: Node.js 的核心作用、npm/npx 生态系统详解，以及为什么 AI 编程工具选择 npm 作为默认安装手段。
---

## Node.js 的核心作用

### JavaScript 运行时革命

Node.js 是服务器端 JavaScript 运行时环境，本质上解决了 **"JavaScript 只能在浏览器中运行"** 的历史局限性。它让 JavaScript 成为真正的全栈开发语言：

- **服务端运行**：JavaScript 代码可在服务器、桌面应用、嵌入式设备中运行
- **高性能引擎**：基于 Chrome V8 引擎，接近原生应用性能
- **事件驱动架构**：非阻塞 I/O 模型，天然支持高并发场景

### 现代开发的基础设施

Node.js 已成为现代软件开发的核心基础设施：

```bash
# 前端生态：React/Vue/Angular 都需要 Node.js
npm install -g create-react-app
npx create-react-app my-app

# 后端框架：Express/Fastify/Koa 等
npm install express
node server.js

# 构建工具：Webpack/Vite/Rollup 等
npm run build
npm run dev
```

## npm：包管理革命

### npm 的核心价值

npm是 Node.js 生态系统的核心，解决了软件开发中的依赖管理难题：

- **海量包源**：超过 200 万个开源包，涵盖几乎所有开发需求
- **标准化管理**：统一的依赖声明、版本控制、安装流程
- **自动化脚本**：package.json 中的 scripts 字段定义项目生命周期

### package.json：项目蓝图

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "webpack --mode=production",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "jest": "^29.5.0"
  }
}
```

### 依赖管理机制

```bash
# 安装生产依赖（运行时需要）
npm install express

# 安装开发依赖（仅开发时需要）
npm install --save-dev nodemon

# 全局安装工具（系统级别）
npm install -g typescript

# 查看依赖树
npm list
npm list --depth=0
```

## npx：零安装执行工具

### npx 的创新价值

npx 解决了全局安装的痛点，让开发者可以直接运行包而无需预先安装：

```bash
# 无需全局安装，直接运行
npx create-react-app my-app
npx http-server
npx cowsay "Hello World"

# 对比传统方式
npm install -g create-react-app  # 先全局安装
create-react-app my-app          # 再使用
```

### 临时执行的优势

- **即时可用**：无需永久占用磁盘空间
- **版本灵活**：自动使用最新或指定版本
- **环境隔离**：不污染全局命名空间

## 为什么 AI 编程工具选择 npm

### 生态系统霸主地位

AI 编程工具（如 Cursor、Claude Code、v0 等）选择 npm 的原因：

1. **包管理标准化**：npm 是 JavaScript 生态的事实标准
2. **工具链成熟**：几乎所有前端/全栈工具都基于 npm
3. **跨平台一致性**：Windows/macOS/Linux 都有 npm 支持

### AI 工具的依赖需求

```bash
# AI 工具典型依赖
npm install -g @anthropic/claude-cli  # AI 助手 CLI
npm install -g vercel                 # 部署工具
npm install -g typescript             # 类型检查
npm install -g eslint                 # 代码质量
npm install -g prettier               # 代码格式化
```

### 统一工作流优势

```bash
# AI 编程工具的标准工作流
npm init -y                    # 初始化项目
npm install react vue express   # 安装框架
npm run dev                    # 启动开发服务器
npm run build                  # 构建生产版本
npm run deploy                 # 一键部署
```

## Windows 平台安装指南

### 官方安装程序（推荐）

#### 安装步骤

1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 Windows 版本（推荐 LTS 版）
3. 双击 `.msi` 文件，勾选以下选项：
   - Add to PATH
   - Install npm package manager
   - Install tools for native modules

#### 验证安装

```bash
# 验证 Node.js
node --version
# 输出：v20.10.0

# 验证 npm
npm --version
# 输出：10.2.4

# 验证 npx
npx --version
# 输出：10.2.4
```

### 包管理器安装（可选）

#### 使用 winget

```bash
# 安装 LTS 版本
winget install OpenJS.NodeJS.LTS

# 验证安装
node --version
npm --version
```

#### 使用 Chocolatey

```bash
# 安装 Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force
iex.DownloadString)

# 安装 Node.js
choco install nodejs-lts
```

## 核心命令速查

### Node.js 运行时

```bash
# 运行 JS 文件
node script.js

# 交互式 REPL
node

# 执行代码片段
node -e "console.log"
node -p "Math.PI"
```

### npm 包管理

```bash
# 项目初始化
npm init -y

# 依赖管理
npm install package-name    # 安装依赖
npm uninstall package-name  # 卸载依赖
npm update                  # 更新依赖

# 脚本运行
npm run                     # 查看可用脚本
npm run start              # 运行 start 脚本
npm run dev               # 运行开发脚本
```

### npx 工具执行

```bash
# 创建项目脚手架
npx create-react-app my-app
npx create-next-app my-app
npx create-express-app my-app

# 运行一次性命令
npx http-server
npx serve build
npx cowsay "Coding!"
```

## 故障排除

### 常见问题

#### PATH 问题

```bash
# 检查 Node.js 是否在 PATH 中
where node
where npm

# 如果找不到，手动添加
set PATH=%PATH%;C:\Program Files\nodejs
```

#### 权限问题

```bash
# 使用管理员权限运行终端
# 或配置本地包目录
npm config set prefix "%USERPROFILE%\npm-global"
```

#### 镜像源优化（中国用户）

```bash
# 使用淘宝镜像加速
npm config set registry https://registry.npmmirror.com

# 恢复官方镜像
npm config set registry https://registry.npmjs.org
```

## 最佳实践

### 项目配置建议

1. **锁定版本**：使用 `package-lock.json` 锁定依赖版本
2. **语义化脚本**：在 package.json 中定义清晰的脚本命令
3. **开发工具链**：安装 ESLint、Prettier 等代码质量工具

### AI 编程环境优化

1. **全局工具安装**：预装常用的 AI 开发工具链
2. **项目模板**：创建标准化的项目模板
3. **自动化脚本**：编写一键环境搭建脚本

这份指南聚焦于 Node.js 生态系统的核心价值和 AI 编程工具的选择逻辑，帮助开发者理解现代 JavaScript 开发的基础设施。
