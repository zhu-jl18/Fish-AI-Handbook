---
title: SFT 快速指引
description: 全参或混合精度 SFT 的决策、配置与上线检查。
tab:
  label: SFT
  order: 20
---

## 何时选择全参
- 数据量 ≥50k 且覆盖多域/多格式，需要模型内部表征整体迁移。
- 目标是替换原有系统 prompt，不想依赖外部 LoRA 适配。

## 配置基线（vLLM 友好）
```bash
accelerate launch train.py \
  --model_name_or_path meta-llama/Llama-3-8b-Instruct \
  --bf16 --gradient_checkpointing \
  --dataset my-multi-domain.jsonl --cutoff_len 4096 \
  --learning_rate 1e-4 --weight_decay 0.1 \
  --num_train_epochs 1 --per_device_train_batch_size 2 \
  --gradient_accumulation_steps 8 --warmup_ratio 0.1 \
  --lr_scheduler_type cosine --save_steps 500
```

显存预估（8B，bf16）：单卡 48GB 或多卡 24GB×2；14B 请准备 80GB 以上或 ZeRO-3。

## 质量与安全
- 校验格式：少量高质量 eval（覆盖所有模板），不通过不准 merge。
- 安全：插入拒答/合规样本，必要时在 SFT 后做 DPO/GRPO 补偿。
- 监控漂移：上线前后抽样对比基线模型，追踪 hallucination、toxicity。

## 交付
- 推理优先 vLLM；若要导 GGUF，务必评估精度回退（Q4/Q5 与原模型对比）。
- 记录版本：模型权重哈希、超参、数据 commit，存到 `MODEL_CARD.md`。
