---
title: Terminal - Fish
description: Fish Shell 极速上手，含 Fisher 插件、主题与跨平台技巧
contributors:
  - claude
tab:
  label: Fish
  order: 33
---

## 1. 安装

| 平台 | 安装命令 |
| --- | --- |
| Ubuntu / Debian | `sudo apt install fish` |
| Fedora / RHEL | `sudo dnf install fish` |
| Arch / Manjaro | `sudo pacman -S fish` |
| macOS | `brew install fish` |
| Windows | 在 WSL 内执行上述命令或使用 MSYS2 `pacman -S fish` |

设为默认 Shell：`chsh -s /usr/bin/fish`（macOS 用 `/opt/homebrew/bin/fish`）。

---

## 2. Fisher 插件管理器

```bash
curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher
```

常用插件：

```bash
fisher install oh-my-fish/theme-agnoster  # 主题
fisher install PatrickF1/fzf.fish         # Ctrl+R/ Ctrl+T 模糊搜索
fisher install jethrokuan/z               # 目录跳转
fisher install jorgebucaran/autopair.fish # 自动补全括号
fisher install IlanCosman/tide@v6         # 轻量主题引擎
```

---

## 3. 配置片段示例

编辑 `~/.config/fish/config.fish`：

```bash
set -gx EDITOR nvim
set -gx PATH $HOME/.local/bin $PATH

# 代理（可选）
set -gx http_proxy http://127.0.0.1:7890
set -gx https_proxy $http_proxy

# oh-my-posh 主题
oh-my-posh init fish --config "$HOME/.poshthemes/agnoster.omp.json" | source

# fzf 键位
set -gx FZF_DEFAULT_OPTS "--height 60% --layout=reverse --border"
```

---

## 4. 配合 Windows Terminal / Kitty 的技巧

1. **剪贴板互通**：`fish_add_path /mnt/c/Windows/System32/clip.exe` 后即可 `command | clip.exe`。
2. **代理自动检测**：在 `config.fish` 中读取 `~/AppData/Local/Clash/proxy_port`，进入 WSL 即同步代理。
3. **按键映射**：使用 `fish_key_reader` 查键码，再用 `bind` 自定义，比如 `bind \cr history-search-backward`。
4. **配色同步**：将 Windows Terminal 配色 JSON 复制为 `~/.config/kitty/current-theme.conf`，实现多端同色。

Fish 标签聚焦“开箱即用 + 插件化”体验，可与 Plugins、WSL 2 标签互补。