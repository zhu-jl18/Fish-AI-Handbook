---
title: Cherry Studio
description: AI 对话客户端配置指南
---

# Cherry Studio 配置指南

Cherry Studio 是一款优秀的 AI 对话客户端，支持多种模型接入和丰富的功能配置。

## 安装

1. 访问 [Cherry Studio GitHub](https://github.com/kangfenmao/cherry-studio/releases)
2. 下载适合您系统的版本
3. 安装并启动应用

## 模型服务配置

### OpenAI 兼容接口

- **接口地址**: `https://api.openai.com/v1` 或自定义代理
- **API Key**: 输入您的 OpenAI API Key
- **模型列表**: gpt-4, gpt-3.5-turbo 等

### Claude API

- **接口地址**: `https://api.anthropic.com`
- **API Key**: 输入 Claude API Key
- **模型**: claude-3-opus, claude-3-sonnet 等

### 本地模型 (Ollama)

- **接口地址**: `http://localhost:11434/v1`
- **模型**: llama2, mistral, qwen 等

## 助手配置

### 创建自定义助手

1. 点击"助手"页面
2. 选择"新建助手"
3. 设置：
   - **名称**: 助手显示名称
   - **描述**: 功能说明
   - **系统提示词**: 定义助手行为
   - **模型**: 选择使用的 AI 模型
   - **参数**: 温度、Top-P 等

### 常用助手模板

- **编程助手**: 代码生成、Debug、代码审查
- **写作助手**: 文章润色、翻译、总结
- **学习助手**: 解释概念、生成练习题

## UI 增强设置

### 主题外观

- **暗色/亮色模式**: 支持自动跟随系统
- **字体大小**: 可调节对话字体
- **代码高亮**: 多种主题可选

### 快捷键

- `Ctrl/Cmd + N`: 新建对话
- `Ctrl/Cmd + ,`: 打开设置
- `Ctrl/Cmd + Enter`: 发送消息
- `Ctrl/Cmd + Shift + C`: 复制代码块

### 实用功能

- **Markdown 渲染**: 完整支持
- **代码块复制**: 一键复制
- **消息编辑**: 可编辑历史消息
- **导出功能**: 支持 Markdown/PDF

## 数据设置

### 数据存储

- **本地存储**: 所有对话保存在本地
- **数据路径**: `~/Documents/CherryStudio`
- **备份**: 支持导出/导入功能

### 隐私设置

- **本地运行**: 不上传用户数据
- **API Key 加密**: 本地加密存储
- **历史清理**: 可选择性删除

## 其他设置

### 代理配置

```json
{
  "proxy": {
    "enable": true,
    "url": "http://127.0.0.1:7890"
  }
}
```
### 语言设置

- 支持中文、英文、日文等多种语言

### 性能优化

- **流式输出**: 默认开启
- **历史限制**: 可设置最大保存数量
- **缓存管理**: 定期清理

## 常见问题

### 无法连接模型

- 检查 API Key 是否正确
- 确认网络连接（可能需要代理）
- 验证接口地址格式

### 响应速度慢

- 切换到较快的模型
- 使用本地模型
- 优化代理设置

### 乱码问题

- 确保使用 UTF-8 编码
- 检查字体设置

## 相关资源

- [Cherry Studio GitHub](https://github.com/kangfenmao/cherry-studio)
- [官方文档](https://github.com/kangfenmao/cherry-studio/wiki)
- [问题反馈](https://github.com/kangfenmao/cherry-studio/issues)
