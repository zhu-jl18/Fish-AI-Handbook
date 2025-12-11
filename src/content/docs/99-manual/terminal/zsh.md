---
title: Terminal - Zsh
description: Zsh 安装到美化的一站式流程（oh-my-zsh、powerlevel10k、插件）
contributors:
  - claude
tab:
  label: Zsh
  order: 32
---

## 1. 安装与默认 Shell 设置

| 平台 | 安装命令 | 设为默认 |
| --- | --- | --- |
| macOS（自带） | `brew install zsh`（可升级） | `chsh -s /bin/zsh` |
| Ubuntu / Debian | `sudo apt install zsh` | `chsh -s /usr/bin/zsh` |
| Arch / Manjaro | `sudo pacman -S zsh` | `chsh -s /usr/bin/zsh` |
| Windows | 在 WSL/ MSYS2 里安装，再在 Windows Terminal 里绑定配置 | `wsl -d Ubuntu -- chsh -s /usr/bin/zsh` |

> `chsh` 后需重新登陆 Shell 才会生效。

---

## 2. Oh My Zsh + Powerlevel10k

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 主题：powerlevel10k
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k
sed -i'' -e 's/^ZSH_THEME=.*/ZSH_THEME="powerlevel10k\/powerlevel10k"/' ~/.zshrc
```

重新打开终端会触发 P10K 的向导，按提示选择图标、颜色、信息密度即可。

---

## 3. 常用插件

```bash
# 自动建议
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# 语法高亮
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# fzf-tab（Tab 直接弹出 fzf）
git clone https://github.com/Aloxaf/fzf-tab ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/fzf-tab
```

在 `.zshrc` 中启用：

```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting fzf-tab)
source $ZSH/oh-my-zsh.sh
```

---

## 4. 快速提升体验的小贴士

1. **历史记录高亮**：`HIST_STAMPS="yyyy-mm-dd"` 让历史命令附带时间戳。
2. **目录跳转**：安装 `zoxide` 或 `autojump`，并在 `.zshrc` 里 `eval "$(zoxide init zsh)"`。
3. **按需加载**：对慢命令添加 `zinit` 或 `antidote` 的懒加载，提高启动速度。
4. **跨平台同步**：把 `.zshrc`、`p10k.zsh` 放进 Git dotfiles，Windows Terminal / iTerm2 / Kitty 都能共享同一份配置。

完成以上步骤后，“Zsh” 标签即可独立展示完整流程，方便和 CMD、PowerShell 等标签对照。