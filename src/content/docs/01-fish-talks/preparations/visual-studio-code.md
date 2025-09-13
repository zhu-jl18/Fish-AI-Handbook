---
title: 'Visual Studio Code'
description: '轻量但强大的编辑器，是 AI 编程与文档撰写的工作台'
---

## 官方地址

- 下载：`https://code.visualstudio.com/`
- 市场：`https://marketplace.visualstudio.com/vscode`

## 安装（小白版）

1. 访问官网下载适配你系统的安装包并安装。
2. 首次启动后，登录账号以同步设置（可选）。

## 推荐扩展（可粘贴到终端安装）

```bash
code --install-extension ms-ceintl.vscode-language-pack-zh-hans
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension yzhang.markdown-all-in-one
code --install-extension eamodio.gitlens
code --install-extension usernamehw.errorlens
code --install-extension rangav.vscode-thunder-client
```

> Windows 如提示 `code` 未识别：在 VS Code 中按 F1 → 输入“Shell Command: Install 'code' command in PATH”。

## 基本设置建议

- 统一格式化：开启“保存时格式化”、选择 Prettier 为默认格式化器。
- 终端集成：`Ctrl+~` 打开内置终端，直接运行脚本与 git。
- 同步设置：启用 Settings Sync，在多设备保持一致体验。
