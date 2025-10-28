---
title: MOE
description: Mixture of Experts - 混合专家模型架构
---

Mixture of Experts (MOE) 是一种模型架构，通过引入多个"专家"网络并动态路由输入，在保持模型容量的同时显著降低计算成本。

## 核心原理

- **稀疏激活**：每次前向传播只激活部分专家，而非全部专家
- **动态路由**：根据输入特征，门控网络决定激活哪些专家
- **可扩展性**：可以通过增加专家数量来扩展模型能力，而不必线性增加计算量

## 意义

显著降低计算成本，同时保持模型能力。

### 经典论文

- [Switch Transformers](https://arxiv.org/abs/2101.03961) - Google 提出的 MOE Transformer
- [GShard](https://arxiv.org/abs/2006.16668) - 大规模 MOE 训练方法

### 扩展阅读

- [Mixtral 8x7B](https://mistral.ai/news/mixtral-of-experts/) - Mistral AI 的开源 MOE 模型
