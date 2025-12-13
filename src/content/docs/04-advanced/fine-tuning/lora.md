---
title: LoRA 速查
description: 轻量微调的配置模板、显存预估与上线要点。
tab:
  label: LoRA
  order: 10
---

## 适用场景
- 数据量 1k–50k、目标风格统一（客服、结构化指令、代码习惯）。
- 目标底模 7B–14B；单卡 24GB 以内也能跑（QLoRA）。

## 最小可用配置（LLaMA-Factory 例）
```bash
deepspeed --num_gpus=1 train.py \
  --model_name_or_path meta-llama/Llama-3-8b-Instruct \
  --finetuning_type lora --lora_rank 64 --lora_alpha 32 \
  --load_in_4bit --bnb_4bit_compute_dtype bfloat16 \
  --dataset my-clean.jsonl --cutoff_len 4096 \
  --learning_rate 2e-4 --num_train_epochs 2 --per_device_train_batch_size 4 \
  --gradient_accumulation_steps 4 --warmup_ratio 0.05 \
  --logging_steps 20 --save_steps 200
```

显存估算（单卡）：
- 8B 底模 + QLoRA rank64：≈14–18GB
- 14B 底模 + QLoRA rank64：≈24–28GB

## 训练 checklist
- 数据：去重、截断；确保 instruction/response 对齐，别混入系统提示。
- 优先 `nf4` 量化 + `bfloat16` 计算；rank 32/64 足够，大于 128 多为浪费。
- 过拟合信号：loss 快速跌破 1 且格式错误增加，立刻减 epoch 或 lr。

## 导出与部署
- 推理侧保持 LoRA：最灵活；在 `Modelfile` 加 `ADAPTER <lora>` 即可。
- 需要纯权重：`merge_lora` 后再做 GPTQ/GGUF；记录 merge 脚本与种子。
- 服务化：首选 vLLM（吞吐高）；纯 CPU/边缘节点走 llama.cpp GGUF。
