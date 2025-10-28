---
title: Ollama
description: using Ollama to deploy LLM on your local machine
---

## Brief Intro

Ollama 是一个轻量级的本地模型运行工具，支持多种模型，
类似的软件有：

- LMstudio

本地部署模型主要在于数据的隐私性。

## Easy Examples

> This part ishelped by Grok

First of all, 下载 [Ollama Installer](https://ollama.com/download)，进入下载目录，打开终端：

```cmd
OllamaSetup.exe /DIR="D:/Ollama" # 换成你自己的路径
```

在环境变量`path`后追加`D:/Ollama`

```cmd
ollama version
```

打开Ollama客户端，设置模型下载路径，随后下载模型：

```cmd
ollama pull qwen3-embedding-latest
```

接下来就可以调用这个模型了，在cherry中设置 `api_url` 为 `http://localhost:11434`，选择 `qwen3-embedding-latest` 即可在知识库或者搜索中设置嵌入此模型进行使用了。

For more usage, we can use codebase index in kilocode together with qdrant. 在 kilocode 中嵌入模型设置和 cherry 类似，只需要在 docker 中运行 qdrant即可，复制如下 docker compose 文件：

```yaml
services:
  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - '6333:6333'
    volumes:
      - qdrant_data:/qdrant/storage
```

随后设置 kilocode 中 qdrant 的连接信息即可使用。
