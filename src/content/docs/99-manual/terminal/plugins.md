---
title: Terminal - Plugins
description: Shell 通用的 Git 信息、美化与历史增强插件清单
contributors:
  - claude
tab:
  label: Plugins
  order: 30
---

## 1. Git 信息快照：onefetch（one-fetch）

`onefetch` 会用彩色 ASCII 图展示当前仓库的语言占比、提交数、贡献者等关键信息：

```bash
# Windows（Scoop）
scoop install main/onefetch

# macOS 或 Linux
brew install onefetch
# 或 cargo install onefetch
```

在任意 Git 仓库根目录执行：

```bash
onefetch --ascii-art cat --number-of-authors 5
```

> Windows Terminal 里建议把它绑定到别名，例如 `alias of="onefetch --ascii-art neon"`，一键查看仓库健康度。

---

## 2. 历史搜索插件：fzf

[fzf](https://github.com/junegunn/fzf) 是命令行模糊搜索器，可接管历史记录、文件、Git 对象搜索。

```bash
# PowerShell 7
winget install junegunn.fzf
Add-Content $PROFILE "Invoke-Expression (fzf --powershell)"

# Bash / Zsh
brew install fzf && /opt/homebrew/opt/fzf/install
# Windows Git Bash（或 MSYS）
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf && ~/.fzf/install --key-bindings --completion
```

常用快捷键：

| 快捷键 | 功能 |
| --- | --- |
| `Ctrl+R` | 历史命令模糊搜索 |
| `Ctrl+T` | 在当前目录搜索文件并插入路径 |
| `Alt+C` | 快速跳转目录 |

fzf 还能与 Git 结合：

```bash
# 搜索历史提交并复制哈希
fzf --height 60% --preview 'git show --color=always {1}' <<< "$(git log --oneline)"
```

---

## 3. auto-complete：git-completion.bash

`git-completion.bash` 提供动态补全分支名、tag、远程、子命令。

```bash
curl -o ~/.git-completion.bash https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash
```

把下面片段加进 `~/.bashrc`（或 `~/.config/fish/config.fish` 里通过 `bass` 引用）：

```bash
if [ -f ~/.git-completion.bash ]; then
  . ~/.git-completion.bash
fi
```

Zsh 用户可以使用 `autoload -Uz compinit && compinit` 后，将 `git/completion/git-completion.zsh` 软链接到 `~/.zsh/_git`，体验一致的补全。

---

## 4. 组合拳建议

- **onefetch + fzf**：先用 fzf 找到目标分支 / commit，再用 onefetch 确认仓库状态。
- **git-completion + oh-my-posh**：补全过程配合 posh-git/Starship，提示信息实时刷新。
- **历史增强**：配合 `zoxide` 或 `atuin`，让 `Ctrl+R` 搜索结果按使用频率排序。

把这些插件抽象成"Plugins" 标签后，无论当前 shell 是 PowerShell、Bash、Zsh 还是 Fish，都可以复用这一套配置。