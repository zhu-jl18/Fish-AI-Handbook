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
- 支持多种输出格式（JSON、Markdown、纯文本）
- 可配置的模型选择和参数调整

## 实用工具

### 1. OpenAI CLI
```bash
# 安装
npm install -g @openai/api

# 使用
openai api chat_completions.create -m gpt-4o-mini -g user "Hello"
```

### 2. Ollama (本地模型)
```bash
# 安装
curl -fsSL https://ollama.ai/install.sh | sh

# 运行模型
ollama run llama3.2

# 在脚本中使用
echo "解释什么是量子计算" | ollama run llama3.2
```

### 3. Hugging Face CLI
```bash
# 安装
pip install huggingface-hub

# 使用
huggingface-cli whoami
```

## 实际应用场景

### 1. 代码审查
```bash
# 检查代码质量
git diff | ai -m gpt-4o "请检查这些代码变更，指出潜在问题"

# 生成提交信息
git diff --staged | ai -m claude-3.5-sonnet "生成一个简洁的提交信息"
```

### 2. 文档处理
```bash
# 总结文档
cat report.pdf | ai "总结这份文档的要点"

# 提取关键信息
cat meeting_notes.txt | ai "提取会议中的行动项和截止日期"
```

### 3. 日志分析
```bash
# 分析错误日志
tail -100 error.log | ai "分析这些错误日志，找出主要问题"

# 生成统计报告
cat access.log | ai "生成访问统计报告" > stats.md
```

## 示例片段

```bash
# 假设有 ai 命令
ai -m gpt-4o-mini "总结本目录代码结构" | tee summary.md
```
