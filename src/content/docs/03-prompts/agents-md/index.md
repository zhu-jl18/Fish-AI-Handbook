---
title: AGENTS.MD
description: 遵循 AGENTS.md 协议，让 AI 更好地与你协作
contributors: [gemini]
---

https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools

[How to write a great agents.md: Lessons from over 2,500 repositories](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)

[ClaudeForge](https://mp.weixin.qq.com/s?__biz=MzkzODk3MTIwMQ==&mid=2247487986&idx=1&sn=441afe854fad2e3836bac6e4f4d26350&chksm=c335e88b20daaf356c189797b54160812ac412c7e931fee5696c034d67ebe8d0da228885e241&mpshare=1&scene=1&srcid=11278dZjhijJJC6g5bXlsKZw&sharer_shareinfo=483d5fe98bc52c04495274db07c3a42b&sharer_shareinfo_first=483d5fe98bc52c04495274db07c3a42b#rd)

[Giga AI](https://gigamind.dev/)


# AGENTS.MD

> [!NOTE]
> 本章节正在建设中...

AGENTS.md 是一个用于定义 AI Agent 行为规范的协议文件。通过在项目中添加此文件，你可以明确告知 AI 助手（如 Cursor, Windsurf, Copilot 等）应该遵循的编码规范、项目结构和最佳实践。

## 为什么需要 AGENTS.md?

- **统一上下文**：确保所有 AI 助手对项目有相同的理解。
- **减少幻觉**：明确的规则限制了 AI 的自由发挥，降低出错率。
- **提高效率**：无需每次对话都重复相同的指令。

## 如何使用

在项目根目录下创建一个名为 `AGENTS.md` 的文件，并在其中编写你的规则。

```markdown
# Project Context

This is a Next.js project using Tailwind CSS.

# Coding Standards

- Use functional components.
- Use TypeScript for all files.
```
