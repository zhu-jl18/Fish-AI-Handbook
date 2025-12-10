---
title: 部署与微调
description: 使用 Ollama / PyTorch 等在本地与远程部署开源模型（以中小模型为主），覆盖模型选型、量化、LoRA/SFT、推理服务化
---

> 概览标签：快速上手与常用命令；模型规模与选型请参见 Theoretical / Scaling Laws 下的 Small Models 标签。

## 为什么用 Ollama / 轻量框架跑小模型？
- 一行命令拉模型，部署最快（Ollama）；
- 适配 GGUF/原生权重，可用于本地与远程服务器；
- 配合 5B–30B 量级模型，单机或轻量云主机即可落地；
- 可与 PyTorch/`llama.cpp`/vLLM 组合，方便做 LoRA、SFT 与推理服务化。

## 快速开始（Ollama）

```bash
# 安装（macOS/Linux）
curl -fsSL https://ollama.com/install.sh | sh

# 拉取并测试一个 7B 量级模型（示例：qwen2.5-7b-instruct）
ollama pull qwen2.5:7b
ollama run qwen2.5:7b "用 50 字总结这段文本"
```

- Windows：使用官方安装器，完成后在终端验证 `ollama -v`。
- 远程部署：在云主机安装后，开放 11434 端口或通过反代/内网穿透；客户端设置 `OLLAMA_HOST=http://<server>:11434` 即可。

## 常见操作
- 查看本地模型：`ollama list`
- 删除模型：`ollama rm <name>`
- 生成自定义 Modelfile：使用 `FROM <base>` + `PARAMETER num_ctx` + `SYSTEM ""` 组合。
- 量化：优先使用官方或社区提供的 GGUF，便于在低显存上运行。

## LoRA / SFT & 远程训练（占位速记）
- 训练框架：PyTorch + PEFT / LLaMA-Factory / Axolotl；多卡或 Modal、ModelScope、模力方舟、GCP A2/TPU 均可。
- 数据：对话/指令数据先做清洗与长度裁剪；小模型优先 4K–8K 上下文。
- 训练配置：QLoRA（nf4/qlora），微调 rank 32/64，学习率 2e-4 起调；SFT 时长控制在 1–3 epoch 避免过拟合。
- 导出：合并权重或保持 LoRA 形式；若走 Ollama，自定义 Modelfile `FROM <base>` + `ADAPTER <lora>`。
- 推理：低显存用 GGUF（Q4_K_M / Q5_K_M），高并发可切换 vLLM + PagedAttention。

更多模型选型、量化规格、硬件建议见 Theoretical / Scaling Laws → Small Models；LoRA/SFT 细节可在后续标签补充。
