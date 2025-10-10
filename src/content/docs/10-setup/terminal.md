---
title: Terminal
description: 终端工具安装与配置指南
---

# Terminal 终端配置

本页面介绍如何安装和配置现代终端工具，提升开发体验。

## Windows Terminal

### 安装方式
1. **Microsoft Store**（推荐）
   - 打开 Microsoft Store
   - 搜索 "Windows Terminal"
   - 点击安装

2. **GitHub Release**
   - 访问 [Windows Terminal Releases](https://github.com/microsoft/terminal/releases)
   - 下载最新版本的 `.msixbundle` 文件
   - 双击安装

3. **命令行安装**
   ```powershell
   winget install Microsoft.WindowsTerminal
   ```

### 基础配置

#### 设置默认终端
1. 打开 Windows Terminal
2. 按 `Ctrl + ,` 打开设置
3. 在 "启动" 选项中设置默认配置文件为 PowerShell 7

#### 外观美化
- **主题**：One Half Dark
- **字体**：Cascadia Code（支持连字）
- **透明度**：95%
- **亚克力效果**：开启

### PowerShell 7 配置

#### 安装 PowerShell 7
```powershell
winget install Microsoft.PowerShell
```

#### 配置 Oh My Posh
1. 安装 Oh My Posh
   ```powershell
   winget install JanDeDobbeleer.OhMyPosh -s winget
   ```

2. 安装 Nerd 字体
   ```powershell
   oh-my-posh font install CascadiaCode
   ```

3. 编辑配置文件
   ```powershell
   notepad $PROFILE
   ```

4. 添加配置
   ```powershell
   oh-my-posh init pwsh | Invoke-Expression
   ```

## macOS Terminal

### iTerm2
推荐使用 iTerm2 替代原生终端

#### 安装
```bash
brew install --cask iterm2
```

#### 配置
1. **配色方案**：Dracula / Nord
2. **字体**：MesloLGS NF
3. **快捷键**：配置分屏快捷键

### Oh My Zsh
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Linux Terminal

### 终端模拟器选择
- **GNOME**：GNOME Terminal
- **KDE**：Konsole
- **轻量级**：Alacritty / Kitty

### Zsh + Oh My Zsh
```bash
# 安装 Zsh
sudo apt install zsh

# 设置为默认 Shell
chsh -s $(which zsh)

# 安装 Oh My Zsh
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## 通用配置建议

### 必装插件
1. **自动补全**：zsh-autosuggestions
2. **语法高亮**：zsh-syntax-highlighting
3. **快速跳转**：z / autojump
4. **Git 增强**：git plugin

### 常用别名
```bash
alias ll='ls -alh'
alias gs='git status'
alias gp='git pull'
alias gpu='git push'
alias cls='clear'
```

## VS Code 集成终端

### 设置默认终端
```json
{
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.defaultProfile.linux": "zsh"
}
```

### 字体配置
```json
{
  "terminal.integrated.fontFamily": "'Cascadia Code', 'MesloLGS NF', monospace",
  "terminal.integrated.fontSize": 14
}
```

## 故障排除

### Windows 执行策略问题
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 字体显示问题
- 确保安装了 Nerd Fonts
- 在终端设置中选择支持的字体

### 性能优化
- 关闭不必要的动画效果
- 限制历史记录大小
- 使用 GPU 加速渲染
