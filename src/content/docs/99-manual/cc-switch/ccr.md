---
title: CC Switch - CCR
description: Claude Code Router 热切换代理
contributors:
  - claude
tab:
  label: CCR
  order: 20
---

[Claude Code Router (CCR)](https://github.com/musistudio/claude-code-router) 是一个代理转发服务，支持**运行中热切换模型**。

## 为什么用 CCR？

- **热切换**：不重启 Claude Code 即可换模型
- **子路由**：不同任务用不同模型
- **插件系统**：支持 Qwen CLI、2API 等
- **Web UI**：可视化配置

## 安装

```bash
npm install -g @musistudio/claude-code-router@latest
```

## 使用

```bash
ccr start   # 启动代理服务
ccr ui      # 打开配置界面
ccr code    # 启动 Claude Code（已配置环境变量）
```

## 配置供应商

在 Web UI 中添加供应商，填入：
- Name、API Base URL、API Key
- 支持的模型列表
- Transformer（可选，用于格式转换）

## 热切换 vs 冷切换

| 特性 | 热切换 (CCR) | 冷切换 (CC Switch) |
| --- | --- | --- |
| 切换方式 | UI 点击，即时生效 | 修改配置，重启进程 |
| 复杂度 | 需运行代理服务 | 简单直接 |
| 适用场景 | 频繁切换、调试 | 固定使用一个供应商 |

## 插件：接入 Qwen Code

CCR 支持通过插件接入 Qwen Code 免费模型。

1. 导入 [qwen-cli.js](https://gist.github.com/musistudio/f5a67841ced39912fd99e42200d5ca8b) 插件
2. 运行 `qwen` 登录生成凭证
3. 添加供应商，Transformer 选 `qwen-cli`

详细配置见 [CCR 官方文档](https://github.com/musistudio/claude-code-router)。
