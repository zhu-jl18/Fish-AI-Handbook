---
title: VS Code - Zed
description: 面向 VS Code 用户的 Zed 上手指南
contributors:
  - claude
  - orchids
tab:
  label: Zed
  order: 40
---

## 为什么看 Zed？

- 原生 Rust + WebGPU 渲染，滚动和搜索体验比 Electron 更顺滑。
- 继承 VS Code 的按键哲学，官方 Keymap 覆盖大部分快捷键。
- 内置多 AI 提示面板、实时协作和多人语音房间，适合 pair programming。
- 项目体量小，冷启动 < 2s，适合写 Markdown、脚本或评审 PR。

## 安装与同步

1. 前往 [zed.dev](https://zed.dev) 下载（macOS / Linux，Windows 版在开发中）。
2. 初次启动使用 GitHub 登录，可同步设置、Keymap 和配色。
3. 打开 `Settings → Editor → Keymap`，选择 **VS Code**，保留肌肉记忆。
4. 将常用项目加入 `Favorites`，顶部命令面板 `Cmd+K` 快速切换。

## 推荐配置

```json
{
  "theme": "Tokyo Night",
  "auto_save": "on_focus_change",
  "code_actions_on_save": true,
  "terminal.integrated.font_size": 13,
  "default_shell": "zsh"
}
```

- `Code Actions on Save` 等价于 VS Code 的 `editor.codeActionsOnSave`。
- 终端配置与系统 Shell 同步，建议搭配 Starship 或 oh-my-posh。

## 常用命令

| 操作 | 快捷键 | 说明 |
| --- | --- | --- |
| 命令面板 | `Cmd+K` | 同 VS Code `Cmd+Shift+P`，可运行任意 action |
| 多光标 | `Cmd+D` | 连续选择下一个匹配项 |
| 面包屑导航 | `Cmd+Ctrl+\` | 展示当前文件符号树 |
| 内置 Copilot | `Cmd+Ctrl+I` | 打开 AI 面板，支持 GPT-4o、Claude | 

## 集成 VS Code 工作流

- **任务**：`Cmd+Shift+B` 触发 `tasks.json`，可直接复用 VS Code 的任务定义。
- **调试**：Zed 通过 `debug_adapters` 连接 `lldb`, `node` 等，沿用 `.vscode/launch.json`。
- **扩展**：暂不支持 VS Code Marketplace，可通过 `Scripts` 面板编写 `Zed Extension`（Rust）。

## 协作与 AI

- `Cmd+Shift+P → Share Workspace` 创建房间并生成邀请链接。
- 聊天面板支持 Markdown + 代码块，权限沿用 GitHub 团队。
- AI 面板可绑定 OpenAI/Anthropic API Key，命令面板输入 `Configure Assistant`。
- 对比 VS Code：无需额外安装 Copilot 扩展，响应更快但暂不支持 inline comment。

## 何时回到 VS Code？

- 需要特定语言扩展（如 C# / Java）或定制调试器。
- 依赖 Remote Containers / Dev Containers 场景。
- 必须运行 IDE 级别的 UI 测试或 GUI 插件。

Zed 更像极致轻巧的“第二编辑器”，与 VS Code 互补：VS Code 负责重度项目，Zed 负责专注写作与 Code Review。