---
title: VS Code - LazyVim
description: 在 VS Code 工作流中引入 LazyVim 的实践
contributors:
  - claude
  - orchids
tab:
  label: LazyVim
  order: 50
---

## LazyVim 是什么？

- 基于 Neovim 0.9+ 的发行版，预置 Lazy.nvim 插件管理器和按需加载策略。
- 默认提供 LSP、Treesitter、Mason、DAP、格式化、测试等 IDE 级能力。
- 主打“即装即用 + 可渐进定制”，非常适合想要键盘驱动编程但又不想从零搭建的人。

## 安装步骤

```bash
# macOS
brew install neovim

# Windows (Scoop)
scoop install main/neovim-nightly

# Linux
sudo pacman -S neovim  # 或 apt, dnf 等

# 初始化 LazyVim
git clone https://github.com/LazyVim/starter ~/.config/nvim
nvim
```

首次启动会自动安装依赖，等待 Lazy.nvim 同步完成即可。

## 面向 VS Code 用户的对照

| 需求 | VS Code 做法 | LazyVim 对应 |
| --- | --- | --- |
| GUI 菜单 | Command Palette (`Ctrl+Shift+P`) | `Space` `f` `f` → 搜索文件 |
| 终端 | `Ctrl+`` | `Space` `t` `n` 打开浮动终端 |
| GitLens | Timeline、Blame | `Space` `g` `g` (Lazygit) / `Space` `g` `b` (Blame) |
| Settings Sync | 云端同步 | dotfiles + lazy-lock.json + `:Lazy sync` |

## 常用快捷键

- `Space e`：诊断列表
- `Space s f`：全局搜索（telescope live grep）
- `Space c a`：Code Action（LSP）
- `Space l f`：格式化当前缓冲区
- `Space q`：快速退出所有窗口

若想保留 VS Code 的 `Ctrl+P / Ctrl+Shift+P` 方案，可在 `lua/config/keymaps.lua` 中新增：

```lua
vim.keymap.set("n", "<C-p>", require("telescope.builtin").find_files)
vim.keymap.set("n", "<C-S-p>", require("telescope.builtin").commands)
```

## 与 VS Code 协同

1. **VSCode Neovim 扩展**：在 VS Code 内安装 [VSCode Neovim](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim)，指向同一份 LazyVim 配置，可享受 VS Code 调试器 + LazyVim 编辑体验。
2. **任务与调试**：继续使用 `.vscode/tasks.json` 和 `launch.json`，LazyVim 负责编辑，VS Code 负责运行和断点。
3. **统一插件**：通过 `~/dotfiles` 管理 `lazy-lock.json`，同时在 VS Code 中启用 `settings sync`，不同机器保持一致。

## 推荐插件堆叠

- `folke/which-key.nvim`：记忆所有 `Space` 前缀。
- `nvim-neotest/neotest`：测试面板，映射到 `Space t`。
- `zbirenbaum/copilot.lua` + `copilot-cmp`：以 Neovim 方式调用 Copilot。
- `stevearc/conform.nvim`：更细粒度的格式化控制，和 VS Code `editor.codeActionsOnSave` 行为一致。

## 常见问题

- **启动慢**：运行 `:Lazy profile` 查看耗时插件，禁用不需要的语言栈。
- **中文输入光标错位**：开启 `set ttimeoutlen=0` 或使用 GUI（Neovide、Goneovim）。
- **LSP 报错**：执行 `:Mason` 检查 server 是否安装，并确认 `:checkhealth` 通过。

把 LazyVim 当成“键盘模式”的第二套工作流：需要大量插件、GUI 和调试时回到 VS Code，需要纯指令 + Tmux + 远程 SSH 时切到 LazyVim。