---
title: AI 绘图教程
description: 入门到进阶，快速上手 AI 绘图（文生图）。
---

## 选择模型

常见模型：
- Stable Diffusion 系列（SD1.5/SDXL）
- Flux、Playground、DALL·E（云端）

本地推荐：Stable Diffusion + ComfyUI（或 Automatic1111）。

## 基本概念

- **Prompt（正向提示）**：你想要的元素与风格。
- **Negative Prompt（反向提示）**：你不想要的元素。
- **CFG / Guidance**：文本到图像的严格程度。
- **Steps**：采样步数，步数越高越精细但更慢。
- **Seed**：随机种子，可复现结果。

## 提示词结构模板

```
主体 + 场景 + 风格 + 镜头 + 光影 + 细节 + 画幅
```

例子：
```
A cyberpunk street at night, neon signs, rainy, reflective ground,
wide-angle lens, cinematic lighting, highly detailed, 4k, masterpiece
```

## 负面提示词模板

```
low quality, blurry, extra fingers, bad anatomy, watermark, jpeg artifacts
```

## 基础参数建议（SDXL）

- 分辨率：1024×1024 起
- Steps：25–40
- CFG：5–7
- Sampler：DPM++ 2M Karras（或 Euler a）

## 进阶：控制与修复

- ControlNet：姿态、线稿、深度图控制结构。
- Inpainting/Outpainting：局部修复与扩图。
- LoRA：风格/人物微调模型，少量样本快速收敛。

## 实操建议

- 先用低分辨率快速迭代，再放大重绘。
- 一次只改一两项，便于定位影响因素。
- 建立自己的提示词片段库，可复用。
