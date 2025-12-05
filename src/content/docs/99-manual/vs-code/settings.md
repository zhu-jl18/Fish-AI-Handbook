---
title: VS Code - Settings
description: VS Code 基础配置指南
contributors:
  - claude
tab:
  label: Settings
  order: 10
---

## 配置方式

两种配置方式：
1. **UI 界面**：`Ctrl+,` 打开 Settings
2. **JSON 文件**：`Ctrl+Shift+P` → "Open Settings (JSON)"

## 用户设置 vs 工作区设置

| 类型 | 位置 | 作用范围 |
| --- | --- | --- |
| 用户设置 | `%APPDATA%\Code\User\settings.json` | 全局生效 |
| 工作区设置 | `.vscode/settings.json` | 仅当前项目 |

工作区设置会覆盖用户设置，适合项目特定配置。

## 推荐配置

```json
{
  // 编辑器
  "editor.fontSize": 14,
  "editor.fontFamily": "'JetBrains Mono', 'Fira Code', Consolas",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.minimap.enabled": false,
  "editor.wordWrap": "on",
  "editor.cursorBlinking": "smooth",
  "editor.smoothScrolling": true,
  
  // 文件
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  
  // 终端
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.fontSize": 13,
  
  // 主题
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "material-icon-theme"
}
```

## 快捷键配置

编辑 `keybindings.json`（`Ctrl+K Ctrl+S` → 右上角打开 JSON）：

```json
[
  { "key": "ctrl+d", "command": "editor.action.deleteLines" },
  { "key": "alt+up", "command": "editor.action.moveLinesUpAction" },
  { "key": "alt+down", "command": "editor.action.moveLinesDownAction" }
]
```

## 同步设置

登录 GitHub/Microsoft 账号后，开启 Settings Sync：
- `Ctrl+Shift+P` → "Turn on Settings Sync"
- 选择同步项：设置、快捷键、扩展、UI 状态
