---
title: "我用 Windows Terminal 打造的终端工作流（超轻量）"
description: "从主题、字体到几个必备命令，记录一下我在 Windows 上的终端舒适化折腾。"
date: 2025-09-08
category: tools
tags: ["Windows", "Terminal", "效率"]
draft: false
cover: "/images/posts/windows-terminal-setup.png"
---

这篇记录下我在 Windows 上打造一个顺手的终端工作区的一些小实践，重点是：简单、轻量、花 30 分钟就能让人安心用很久的那种。

## 我用到的东西

- Windows Terminal（系统自带即可）
- PowerShell 7（pwsh）
- 字体：Cascadia Code / JetBrains Mono（开启连字更舒服）
- 主题：暗色 + 轻微蓝色高亮（保持和本站风格一致）

## 快捷键偏好

- Ctrl+Shift+T 新建标签
- Alt+数字 快速切换标签
- Ctrl+Shift+W 关闭标签

## 常用别名

```powershell
# path=null start=null
# 示例：在 $PROFILE 中添加
Set-Alias ll Get-ChildItem
Set-Alias g git
Set-Alias v code
```

## 小结

别追求“最强配置”，追求“最顺手”。能稳定用半年，就是好配置。

