---
title: CC Switch
description: Claude Code 多模型供应商切换工具
contributors:
  - claude
---

以 Claude Code 为例，教你高效配置 AI 编程工具接入多个模型供应商。

## 为什么需要切换供应商？

Claude Code 默认只用 Anthropic API，但你可能想：
- 用更便宜的第三方 API（OpenRouter、DeepSeek）
- 接入其他模型（Gemini、GLM、Qwen）
- 在不同模型间切换以获得最佳效果

## 切换方式对比

| 类型 | 代表工具 | 特点 |
| --- | --- | --- |
| **冷切换** | CC Switch、Claude Code Switch | 修改环境变量，需重启进程 |
| **热切换** | CCR、Claude Code Hub | 代理转发，运行中可切换 |

---

## 直接配置法（settings.json）

最简单的方式：直接修改 Claude Code 配置文件。

### 配置文件位置

```
Windows: %APPDATA%\claude-code\settings.json
macOS/Linux: ~/.config/claude-code/settings.json
```

### 配置示例

```json
{
  "apiProvider": "openrouter",
  "apiBaseUrl": "https://openrouter.ai/api/v1",
  "apiKey": "sk-or-v1-xxx",
  "model": "anthropic/claude-sonnet-4"
}
```

### 常用供应商配置

**OpenRouter**
```json
{
  "apiBaseUrl": "https://openrouter.ai/api/v1",
  "apiKey": "sk-or-v1-xxx"
}
```

**DeepSeek**
```json
{
  "apiBaseUrl": "https://api.deepseek.com/v1",
  "apiKey": "sk-xxx"
}
```

**本地 Ollama**
```json
{
  "apiBaseUrl": "http://localhost:11434/v1",
  "apiKey": "ollama"
}
```

**环境变量方式**
```bash
export ANTHROPIC_BASE_URL="https://api.example.com/v1"
export ANTHROPIC_API_KEY="sk-xxx"
```

---

## 快速导航

| 标签 | 内容 |
| --- | --- |
| **CC Switch** | 冷切换工具，桌面应用，多账号管理 |
| **CCR** | 热切换代理，运行中切换模型，支持插件 |
| **Connect** | 工具串联与高级配置 |
