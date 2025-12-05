---
title: VS Code - Extensions
description: VS Code 必装扩展推荐
contributors:
  - claude
tab:
  label: Extensions
  order: 20
---

## 必装扩展

### 通用开发

| 扩展 | 说明 |
| --- | --- |
| [Chinese (Simplified)](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans) | 中文语言包 |
| [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) | 文件图标主题 |
| [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme) | 深色主题 |
| [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) | 行内显示错误信息 |

### Git 相关

| 扩展 | 说明 |
| --- | --- |
| [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) | Git 增强，行内 blame、历史对比 |
| [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) | 可视化 Git 分支图 |
| [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory) | 查看文件/行历史 |

### Markdown 写作

| 扩展 | 说明 |
| --- | --- |
| [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) | 快捷键、TOC、预览增强 |
| [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced) | 高级预览、导出 PDF |
| [Paste Image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image) | 粘贴图片自动保存 |

### AI 辅助

| 扩展 | 说明 |
| --- | --- |
| [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) | AI 代码补全 |
| [Codeium](https://marketplace.visualstudio.com/items?itemName=Codeium.codeium) | 免费 AI 补全替代品 |
| [Continue](https://marketplace.visualstudio.com/items?itemName=Continue.continue) | 开源 AI 编程助手 |

## 按语言安装

### Web 开发
- ESLint、Prettier、Live Server、Auto Rename Tag

### Python
- Python、Pylance、Jupyter、Black Formatter

### TypeScript
- TypeScript Importer、Pretty TypeScript Errors

## 扩展管理技巧

```bash
# 导出已安装扩展列表
code --list-extensions > extensions.txt

# 批量安装
cat extensions.txt | xargs -L 1 code --install-extension
```

禁用不常用扩展可显著提升启动速度。
