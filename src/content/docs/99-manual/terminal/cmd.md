---
title: Terminal - CMD
description: CMD 终端配置与增强
contributors:
  - claude
tab:
  label: CMD
  order: 10
---

CMD 是 Windows 最古老的命令行，功能有限但有时还得用。

## Clink（必装增强）

[Clink](https://github.com/chrisant996/clink) 让 CMD 拥有现代终端的体验：

```bash
winget install chrisant996.Clink
```

安装后 CMD 自动加载，提供：
- **Ctrl+R** 历史搜索
- Tab 自动补全
- 语法高亮
- 命令历史持久化

## oh-my-posh 美化

CMD 也可以用 oh-my-posh：

```bash
# 安装
winget install JanDeDobbeleer.OhMyPosh -s winget

# 配置 Clink 自动加载
# 在 %LocalAppData%\clink\ 创建 oh-my-posh.lua
```

oh-my-posh.lua 内容：
```lua
load(io.popen('oh-my-posh init cmd'):read("*a"))()
```

## 常用命令对照

| CMD | PowerShell/Linux | 功能 |
| --- | --- | --- |
| `dir` | `ls` | 列出目录 |
| `copy` | `cp` | 复制文件 |
| `move` | `mv` | 移动文件 |
| `del` | `rm` | 删除文件 |
| `cls` | `clear` | 清屏 |
| `type` | `cat` | 显示文件内容 |

## 什么时候用 CMD？

老实说，2025 年了，除非：
- 某些老旧脚本只兼容 CMD
- 系统恢复模式只有 CMD
- 某些工具强制打开 CMD

否则直接用 PowerShell 7。
