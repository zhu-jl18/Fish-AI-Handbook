---
title: "CLI 工具"
description: "把模型能力带到终端与脚本"
---

## 为什么

- 直接嵌入现有工作流与自动化脚本

## 常见能力

- 从文件/管道读取输入
- 流式输出，便于边看边处理
- 与系统命令组合：`cat | grep | jq`

## 示例片段

```bash
# 假设有 ai 命令
ai -m gpt-4o-mini "总结本目录代码结构" | tee summary.md
```
