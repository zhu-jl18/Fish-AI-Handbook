---
title: "Windows Terminal"
description: "统一的命令行入口，方便使用各类 CLI 工具（如模型SDK、部署脚本）"
---

## 为什么需要它

- 许多模型相关能力通过命令行提供（如 SDK、脚手架、部署/日志/调试工具）。
- 统一的终端让你在同一个界面管理多标签/多任务，提高效率。

## 官方地址

- Microsoft Store：`https://aka.ms/terminal`
- GitHub Releases：`https://github.com/microsoft/terminal`

## 安装步骤（小白版）

1. 打开 Microsoft Store，搜索“Windows Terminal”，点击安装。
2. 同时安装 PowerShell 7（建议）：`https://aka.ms/PowerShell`
3. 安装 Git（带 Git Bash 与凭证管理）：`https://git-scm.com/download/win`
4. 安装 Nerd Font 字体（可选，美观对齐）：`https://www.nerdfonts.com/`

## 基本配置

- 打开设置 → 外观：选择已安装的 Nerd Font。
- 启动方式改为“默认打开 PowerShell 7”。
- 常用快捷键：

```text
Ctrl+Shift+T  新建标签
Ctrl+Shift+W  关闭标签
Alt+Shift+D   分屏
Ctrl+Shift+F  搜索
```

## 验证命令（可直接粘贴）

```powershell
pwsh -v
$PSVersionTable.PSVersion
winget --version
where git
```

> 看到版本号即说明安装成功；若失败，优先用 Microsoft Store/winget 重新安装。
