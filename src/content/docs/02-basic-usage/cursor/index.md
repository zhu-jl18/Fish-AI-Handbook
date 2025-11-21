---
title: Cursor
description: 把 AI 写码、终端操作和上下文管理集中在同一 IDE，替代分裂的 Coding/Codex 流程。
---

Cursor 适合“主力 IDE + 轻量 CLI 自动化”的场景，避免在不同工具间来回切换。旧的 Coding/Codex 章节合并于此，直接按下列套路使用。

## 为什么用 Cursor
- 全域上下文：Git 历史、打开文件、终端输出都能被引用；避免 CLI 和 IDE 各说各话。
- 一键多模态：Slash 命令、行内补全、侧边 Chat / Composer 三种交互，写代码、改描述、跑命令一站式。
- 稳定 Diff：改动以 patch 方式落盘，能随时用内置 diff / git diff 复核，降低“悄悄改坏”的风险。
- 模型路由：同一界面自由切换 Claude / GPT / 本地 LLM，减少配置成本。

## 快速起步（3 步）
1) 装好 Cursor 并登录你常用的模型账号；在 `Settings -> AI` 选默认模型（稳定选 Claude 3.5 Sonnet，便宜选 Haiku）。  
2) 打开目标仓库，开启 `Auto Run Tests` 旁的确认开关，避免模型擅自执行危险命令。  
3) 先跑一次 `/explain file` 熟悉输出格式，再用 `/edit` 给出“目标 + 约束 + 验收命令”。

## 高效用法
- 行内补全：像 Copilot 一样按 `Tab` 接收，小修改优先用它而不是大段对话。
- `/edit`：精确到选区，要求“只改选区、给出 diff 理由”，别让模型重写整文件。
- Chat/Composer：长任务/多文件修改用侧边对话，要求“列计划 → 等你确认 → 再执行”。  
- 终端协同：在内置终端运行 `npm test` 等结果会自动进入上下文，比截图/复制可靠。
- Snippet 固化：把常用提示写成 Snippet（如“生成表格：列=问题|证据|修复”），减少口述。

## 何时换回 CLA 定 CLAUDE CODE
- 需要大范围扫描/并行审查/强 Hook（lint+test 强制）时，用 Claude Code 更可控。  
- 需要 IDE 内即刻修改、小批量补全时，用 Cursor；不必切 CLI。  
- 模型额度受限时，优先在 Cursor 里做 diff 级修改，把长篇生成留给 CLI。

## 最佳实践清单
- 每个请求讲清楚：`目的 + 文件范围 + 不可动接口 + 验收命令`。  
- 禁用自动保存，先看 diff 再接受；批量改动分批应用，避免一次性改坏。  
- 长对话定期 `/clear` 或开新线程，防止上下文污染。  
- 危险命令（删除、迁移、重置）强行加“请先复述再执行”提示。  
- 合并后跑 `npm test / lint / type-check`；在 Cursor 终端执行，输出会自动进入后续对话上下文。
