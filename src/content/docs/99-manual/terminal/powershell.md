---
title: Terminal - PowerShell 7
description: PowerShell 7 安装与配置
contributors:
  - claude
tab:
  label: PowerShell 7
  order: 20
---

PowerShell 7 是微软的现代 Shell，跨平台，功能强大。Windows 自带的是 PowerShell 5.1（老版本），必须手动安装 7。

## 安装

```bash
winget install Microsoft.PowerShell
```

安装后在 Windows Terminal 中会自动添加 PowerShell 7 配置项。

## oh-my-posh 美化

```bash
# 安装 oh-my-posh
winget install JanDeDobbeleer.OhMyPosh -s winget

# 编辑配置文件
notepad $PROFILE
```

在 `$PROFILE` 中添加：
```powershell
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/agnoster.omp.json" | Invoke-Expression
```

主题列表：`Get-PoshThemes` 或访问 [oh-my-posh 主题库](https://ohmyposh.dev/docs/themes)。

## 核心插件

### PSReadLine（自带，需配置）

```powershell
# 加入 $PROFILE
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
```

### posh-git（Git 状态显示）

```powershell
Install-Module posh-git -Scope CurrentUser
Import-Module posh-git  # 加入 $PROFILE
```

### Terminal-Icons（文件图标）

```powershell
Install-Module Terminal-Icons -Scope CurrentUser
Import-Module Terminal-Icons  # 加入 $PROFILE
```

## 完整 $PROFILE 示例

```powershell
# oh-my-posh
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/agnoster.omp.json" | Invoke-Expression

# 插件
Import-Module posh-git
Import-Module Terminal-Icons

# PSReadLine
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete

# 别名
Set-Alias -Name g -Value git
Set-Alias -Name c -Value code
```

配置文件位置：运行 `$PROFILE` 查看路径。
