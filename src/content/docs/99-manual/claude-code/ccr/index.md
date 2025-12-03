---
title: CCR
description: Claude Code Router 插件的安装与配置全指南。
---

CCR是用来管理和接入不同渠道模型的一个good choice，尽管有很多这样的轮子，我还是会推荐它，它的优势在于：

- 支持热切换
- 细分的子路由
- 不同OpenAI接口的支持
- 作为代理可以接入其他管理工具

作者是[musistudio](https://github.com/musistudio)，CCR的GitHub仓库是[Claude Code Router](https://github.com/musistudio/claude-code-router)。

## Quick Start

安装 很简单，可以`npm` 也可以`docker`，它的本质是一个代理，这里我推荐`npm`安装方式：

```bash
npm install -g @musistudio/claude-code-router@latest
```

使用方法：

```bash
ccr start # 启动ccr服务
ccr ui   # 打开ccr ui 界面
```

打开UI界面之后 配置即可，如果已有配置，那么

```bash
ccr code # 启动Claude Code
```



## 碎碎念

这篇教程已经够喂饭了。

建议搭配其他思考模型使用，如gemini-2.5-pro或者glm-4.6。当然也有其他接入qwen-code的方式，放在其他章节讲解了。
