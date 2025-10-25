---
title: n8n
description: n8n - 开源工作流自动化工具，无代码/低代码平台
---

## n8n

n8n 是一款功能强大的开源工作流自动化工具，可以帮助你连接各种应用和服务，实现自动化任务。

### 核心特点

- **开源免费**：完全开源，可自托管部署
- **可视化编辑**：拖拽式界面，无需编程基础
- **丰富集成**：支持 300+ 应用集成（包括 AI 服务）
- **灵活扩展**：支持自定义节点和代码执行

### AI 集成能力

n8n 可以轻松集成各种 AI 服务：

- OpenAI、Claude、Google Gemini 等 LLM
- Stable Diffusion、DALL-E 等图像生成
- Whisper 语音转文字
- 自定义 AI 工作流编排

### 快速开始

```bash
# Docker 部署
docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n

# npm 安装
npm install n8n -g
n8n start
```

访问 `http://localhost:5678` 开始使用。

### 资源链接

- [官方网站](https://n8n.io/)
- [文档中心](https://docs.n8n.io/)
- [GitHub](https://github.com/n8n-io/n8n)
- [社区工作流](https://n8n.io/workflows/)
