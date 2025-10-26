---
title: Ollama
description: 本地部署LLM
---

## Brief Intro

Ollama 是一个轻量级的本地模型运行工具，支持多种模型，
类似的软件有：
- LMstudio

##  An Easy Example 

helped by Grok

下载 [Ollama](https://ollama.com/download)，进入下载目录，打开终端：
```cmd
OllamaSetup.exe /DIR="D:/Ollama" # 换成你自己的路径
```
在环境变量`path`后追加`D:/Ollama`，然后重启终端：
```cmd
ollama version
```
如果显示版本信息，则说明安装成功。打开Ollama客户端，在设置中设置模型下载路径，随后下载模型：
```cmd
ollama pull qwen3-embedding
```
在cherry中设置`api_url`为`http://localhost:11434`，选择 qwen3-embedding 即可使用了。







