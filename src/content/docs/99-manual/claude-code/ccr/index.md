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

## Settings Ref

这里我只教如何接入qwencode，从而免费使用qwen3-coder-plus

首先打开ccr的ui管理界面，导入自定义路由路径，他在你的json文件里长这样：

```json
 "transformers": [
    {
      "name": "qwen-cli",
      "path": "C:\\Users\\Travis\\.claude-code-router\\plugins\\qwen-cli.js",
      "options": {}
    }
  ],
```

这里我们要导入[`qwen-cli.js`](https://gist.github.com/musistudio/f5a67841ced39912fd99e42200d5ca8b)
然后你要做什么呢？确保你下载安装了qwen code，在终端里输入qwen进行登录，它会自动生成一个认证文件
`oauth_creds.json`这个插件会自动寻找这个认证文件，完成它的工作，你只需要添加供应商，然后在Transformer里选择`qwen-cli`，再填写模型名字和api_base_url即可，参考配置：

```json
{
  "name": "✅qwen-cli",
  "api_base_url": "https://portal.qwen.ai/v1/chat/completions",
  "api_key": "sk-xxx",
  "models": ["qwen3-coder-plus"],
  "transformer": {
    "use": ["qwen-cli"]
  }
}
```

## 碎碎念

这篇教程已经够喂饭了。

建议搭配其他思考模型使用，如gemini-2.5-pro或者glm-4.6。当然也有其他接入qwen-code的方式，放在其他章节讲解了。
