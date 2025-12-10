---
title: Nano Banana 理论笔记（2025‑11 更新版）
description: Nano Banana / Nano Banana Pro 架构与原理（纯理论，不含实操）
tab:
  label: Nano Banana +
  order: 10
---

先把结论摆在前面：
你原来那套 `CLIP + U‑Net + VAE` 的「典型 latent diffusion」思路，现在已经不适合拿来描述 **Nano Banana** 以及新的 **Nano Banana Pro** 了。

这两货本质上都是挂在 **Gemini 系列多模态 MoE 大模型** 上的一组图像输入 / 输出头，而不是一颗独立的扩散模型。

下面是按你提的 6 个点重新整理的纯理论版。

---

## 1. Nano Banana / Nano Banana Pro 到底是什么，为什么这么猛？

**官方对应关系：**

* **Nano Banana** = Gemini 2.5 Flash Image（API 型号 `gemini-2.5-flash-image`）([Google AI for Developers][1])
* **Nano Banana Pro** = Gemini 3 Pro Image（API 型号 `gemini-3-pro-image-preview`）([Google AI for Developers][1])

二者都是「**LLM 优先的多模态系统 + 图像头**」，而不是传统意义上的「CLIP 编码器 + UNet 扩散解码器」堆栈。

**共同点（高层视角）：**

* 背后是 **稀疏 MoE Transformer**：

  * Gemini 3 Pro 明确写死是 **Sparse Mixture-of-Experts Transformer**，按 token 走路由，只有少数 expert 被激活，从而把「总参数量」和「每 token 计算量」解耦。([Google Cloud Storage][2])
  * Gemini 2.5 继续沿用这套路线，只是偏「性能 / 成本」优化的 Flash 变体。([Google AI for Developers][1])
* **原生多模态**：同一骨干模型直接吃文本、图像、音频、视频（取决于变体），在一条 token 序列里混合推理，而不是「语言模型 + 外挂视觉模块」。
* **超长上下文 + 后训练**：

  * 上游 Gemini 2.5 / 3 Pro 支持最高 ~1M token 上下文，方便长文档、多图、时间序列混合推理。([Google AI for Developers][1])
  * 训练流程包含：大规模多模态预训练 + 指令微调 + 人类偏好 / Critic 反馈的强化学习。

**差异（粗暴一句话版）：**

* **Nano Banana（2.5 Flash Image）**：

  * 基座是 **Gemini 2.5 Flash**：追求高吞吐、低延迟，「打量大、跑得快」。([Google AI for Developers][1])
  * 图像模型侧重「**够快 + 质量在线**」，作为通用图片生/编主力，适合走量和交互频繁的场景。([Google DeepMind][3])

* **Nano Banana Pro（3 Pro Image）**：

  * 基座升级为 **Gemini 3 Pro**：更强的推理、agent 能力和多模态理解。([Google AI for Developers][1])
  * 定位是「**工作室级图像生成 / 编辑**」：强调多语言文本渲染、复杂信息可视化、多图混合、4K 级别控制。([blog.google][4])

从官方 benchmark 看，Nano Banana 负责在同等质量下把延迟打到最低，而 Nano Banana Pro 在几乎所有「图像编辑 / 文生图 / 文本渲染」的 Elo 分数上把 GPT‑Image 1、Qwen‑Image 等一票对手压在下风，只是推理更重一点。([Google DeepMind][5])

---

## 2. 架构与原理：从「纯扩散」到「LLM 驱动的图像头」

### 2.1 骨干：稀疏 MoE Transformer

Gemini 1.5 / 2.5 / 3 Pro 一脉相承，骨干都是 **Sparse MoE Transformer**：

* 输入 token（文本、图像 patch token、音频 token 等）通过一个 **路由网络** 选择少数 expert FFN 层。
* 总参数量可以巨大，但每个 token 只经过几个 expert，所以计算成本可控。
* 这类结构来源于 Google 一长串 MoE 论文（Switch Transformer 等），核心目标就是「**容量上去、延迟别爆炸**」。

对图像生成的影响很直接：
你可以把 Nano Banana / Pro 理解成：

> 「一个巨大的多模态 MoE LLM，在推理链末尾不是吐出文本，而是吐出一串代表图像的 token。」

也就是说，**图像生成只是 LLM 输出空间中的一种特殊“语言”**。

### 2.2 多模态 token 化与图像头（原理层面）

官方没有公开 Nano Banana / Pro 图像头的具体实现细节，只说它们是基于各自的 Gemini 基座模型。([Google DeepMind][6])

那从公开信息和业界共识，大致可以做这样的、**标明为推断的** 描述：

1. **输入侧**：

   * 文本 → 标准 BPE / SentencePiece token。
   * 图像 → 通过专用视觉编码器映射成一串视觉 token（可以是 VAE latents 或离散 codebook token，类似 LDM / MaskGIT / Imagen 一类做法）。([arXiv][7])

2. **骨干推理**：

   * 所有 token 在同一 Transformer 里跑 self‑attention / cross‑modality attention。
   * 这一步完成「**理解 / 推理 / 规划**」，包括：解析你的指令、查找世界知识、规划布局 / 角色 / 文字内容。

3. **输出侧（图像头）**：

   * 模型输出一串视觉 token，再由解码器（VAE / diffusion / AR‑decoder 等）还原到像素空间。
   * 第三方对 GPT‑4o 的分析（GPT‑ImgEval）表明，其图像头很可能是「**自回归 + 扩散混合**」结构，而不是传统的纯 DALL‑E 风格 VQ‑VAE 自回归。([arXiv][8])
   * Nano Banana / Pro 很可能走的是类似路线：强 LLM 负责所有高层结构与语义，图像头只做高维连续空间里的细节填充。但这一点 Google 没有官方确认，只能当**合理猜测**看待。

对比你原笔记里的那张表：

> CLIP Text Encoder → U‑Net/DiT → VAE Decoder

这更接近 **Stable Diffusion / Imagen / Qwen‑Image 这一代扩散模型** 的典型结构，而不是现在 Gemini 系列的实现思路。([arXiv][7])

### 2.3 训练目标与强化学习

从 Gemini 1.5、2.5、3 Pro 的技术报告和 model card 能看出来，大致有三层训练：

1. **多模态大规模预训练**

   * 数据：网页文本、代码、图像、音频、视频等大杂烩，辅以合规抓取、去重、质量 / 安全过滤和合约数据。
   * 目标：标准自回归负对数似然，跨模态预测下一个 token。

2. **指令微调（SFT / instruction tuning）**

   * 数据：多模态指令‑响应对（问答、讲解、图像生成指令、编辑指令等）。
   * 目标：在真实指令分布下学会「**听得懂人话**」。

3. **基于人类偏好与 Critic 的强化学习**

   * Gemini 3 Pro 明确写了：利用多步推理、定理证明等数据+强化学习，优化模型在复杂任务上的决策序列。([Google Cloud Storage][2])
   * Gemini 3 Pro Image 的 model card 也写了：在预训练之后，又做了基于人类与 critic 反馈的 RL 和安全评估。([Google DeepMind][6])

**重要点：**

> 对 Nano Banana / Pro 来说，图像生成这件事，不是一个独立训练的扩散网络，而是「挂在 LLM 这一整套 RL 过的推理系统」的末端输出形式之一。

这就是它们在指令跟随、复合意图理解上明显超过传统扩散模型的根本原因之一。

---

## 3. Nano Banana Pro 相比 Nano Banana 的升级点

从官方开发者文档 + model card + Google 博客，可以归纳成几类比较硬的升级。([Google AI for Developers][1])

### 3.1 基座模型：2.5 Flash → 3 Pro

* **Nano Banana**：依托 **Gemini 2.5 Flash**，主打 price‑performance 和低延迟；
* **Nano Banana Pro**：依托 **Gemini 3 Pro**，这是「下一代」稀疏 MoE，多模态推理比 2.5 系列有明显提升，特别是在长上下文、多模态推理和 agent 场景。([Google Cloud Storage][2])

简单说：Pro 的「脑子」比老款好一代。

### 3.2 能力标配：Thinking + Search Grounding

开发者文档里直接给了一个很关键但常被忽略的差异：([Google AI for Developers][1])

* **Gemini 3 Pro Image (`gemini-3-pro-image-preview`)**：

  * 支持 **Thinking**（可配置思考模式）
  * 支持 **Search Grounding**（搜索结果作为额外输入）

* **Gemini 2.5 Flash Image (`gemini-2.5-flash-image`)**：

  * **不支持 Thinking / Search Grounding**

这意味着：

* Nano Banana Pro 可以在图像生成前先走一段「纯推理 token」，把复杂要求拆解成结构化计划，再让图像头去落实；
* 同时还能实时查搜索，把 infographics / 数据图做得更接近当前世界状态（例如天气、比分、股价等）。([blog.google][4])

Nano Banana 原版更多是「靠基础多模态理解 + 训练时的偏好优化」，没有那么重的在线 reasoning+grounding 链。

### 3.3 Benchmark 维度的实证提升

Gemini 3 Pro Image 的 model card 给出了和 Nano Banana（2.5 Flash Image）、GPT‑Image 1、Flux Pro 等的 Elo 对比：([Google DeepMind][6])

* **已有能力**（文本渲染、风格化、多轮编辑、角色编辑、物体环境编辑、通用 T2I）：

  * Nano Banana Pro 在所有这些项上 Elo 评分都比 Nano Banana 更高，也普遍优于 GPT‑Image 1 / Flux Pro。
* **新增能力**（多角色编辑、图表编辑、文本编辑、教育事实性、多输入、infographics、涂鸦编辑、视觉设计）：

  * Pro 在这些指标上对 Nano Banana 是「代际差」，在 infographics / 多角色 / 文本编辑上的优势尤为夸张。

博客里提到的一些具体工程向升级：([blog.google][4])

* 可同时融合 **最多 14 张参考图**，在一个场景中维持 **最多 5 个角色的一致性**；
* 支持 **2K / 4K 输出**，可控纵横比；
* 高级编辑：局部遮罩、视角 / 焦点 / 光照 / 色彩分级、昼夜切换等。

这些都是典型「**image‑as‑UI 工具**」需求，对底层推理和记忆提出的要求远高于简单 T2I。

---

## 4. 为什么指令跟随、意图理解、一致性这么好？

传统扩散管线里的「语言理解」通常是 CLIP / 文本编码器侧的事，和图像生成网络本身关系并不大。LDM 只在 denoising 过程中通过 cross‑attention “看一眼”文本 embedding。([arXiv][7])

Nano Banana / Pro 的逻辑则完全反过来：**一切先当「语言 + 多模态推理问题」来解，再变成图像问题**。

可以拆开看：

### 4.1 LLM‑first 的架构优势

1. **语义齐活再画图**

   * 文本、上下文图片、甚至你丢进去的表格 / 文档，都先统一变成 token，在 MoE Transformer 里做推理。
   * 模型先解决「我到底要表达什么」「有哪些约束」「哪些需要查知识」「怎样拆成图像元素」这些问题，再交给输出头。

2. **多轮对话天然一致性**

   * 同一上下文里，角色设定 / 风格 / 文本规范都作为 token 留在上下文里，被下一次调用复用。
   * Nano Banana Pro 还可以开 Thinking，额外挤出一段内部“草稿思考”，对多轮编辑特别重要。([Google AI for Developers][1])

3. **RL 优化的「工具使用」习惯迁移到图像任务**

   * Gemini 3 Pro 在工具使用、代码生成、复杂推理上是明确做过 RL 的。([Google Cloud Storage][2])
   * 图像任务本质上也是一种「输出工具调用」（生成 / 编辑指令）的形式，这种 RL 习惯会自然迁移过来。

直观的后果是：
**模型在「想清楚要干什么」之后再画图，而不是边去噪边瞎猜语义。**

### 4.2 长上下文和世界知识

* 上游 Gemini 模型可以吃非常长的上下文（到 1M 级别 token），且可以混合文本、代码、图像、音频、视频。
* 对 Nano Banana Pro 来说，再加上 search grounding，相当于在画图之前顺手做了一次「RAG + 视觉规划」。([blog.google][4])

这直接解释了它在：

* 带 **长说明文字** 的 infographics
* 需要 **事实一致性** 的教育可视化
* 多轮细节修正的设计稿

这些任务上，对比传统扩散模型的明显优势。

### 4.3 字体 / 文本渲染的一致性

Pro 的 model card 和官方页面给了一个很直白的 heatmap：在多语言单行文本渲染的错误率上，Gemini 3 Pro Image 明显低于 GPT‑Image 1 和 Flux 系列。([Google DeepMind][5])

底层原因大概有两点：

1. **训练数据里专门堆了多语种文本渲染案例**（这一点可以从 Qwen‑Image 的技术报告看到类似设计，大概率是大家都在做的事）。([arXiv][9])
2. LLM 本身已经对这些语言的文字习惯、长度分布、常见布局有很强 prior，再把这些先想好，再交给视觉解码器去「实现」。

---

## 5. 和 Qwen‑Image、GPT 图像系列相比，技术路线有什么不一样？

### 5.1 Qwen‑Image：典型「VL 模型 + Diffusion Head」

根据 Qwen‑Image 技术报告 + HF model card：([arXiv][9])

* 语义部分：使用 **Qwen2.5‑VL**（多模态 LLM），负责理解复杂文本 / 图像输入。
* 生成部分：使用 **MMDiT 风格的扩散 UNet / Transformer**，在 VAE latent 空间里做扩散。
* 关键设计：

  * 构建了一条针对「复杂文本渲染」的专门数据流水线 + 课程式训练（从非文本 → 简单文字 → 段落级描述）。
  * 对编辑任务做了 multi‑task 训练：T2I、Text+Image→Image、Image→Image 重构，并通过「双编码」机制（VL 语义编码 + VAE 重构编码）平衡语义一致性与视觉保真度。

**总结一下：**

> Qwen‑Image 还是 **「Diffusion 第一，LLM 辅助」**。
> Nano Banana / Pro 则是 **「LLM 第一，图像头辅助」**。

两种路线都能做复杂文字，但在指令复合度、多轮对话、agent 场景里，LLM‑first 的组合更自然。

### 5.2 GPT 系列（GPT‑Image‑1 / GPT‑4o Image）

官方 model card 对 GPT‑Image‑1 的描述和 Google 很像：([OpenAI Platform][10])

* 是一个 **「原生多模态 LLM」**，既能理解文本 / 图像，也能直接生成图像；
* 能利用世界知识、支持图像编辑、多图参考、文本渲染等。

GPT‑4o 的图像生成部分官方没公开架构，但 **GPT‑ImgEval** 这篇技术报告做了比较认真的反向工程：([arXiv][8])

* 利用大量 GPT‑4o 生成图像的数据训练分类器，推断其内部结构；
* 证据指向：**一个自回归主干 + 一个 diffusion 式图像头的混合结构**，而不是完全 VQ‑VAE / MaskGIT 那种 VAR 架构。

如果把三家粗暴对比一下：

| 系列                   | 语义骨干                     | 图像头类型（公开 + 推断）           | 典型优势                      |
| -------------------- | ------------------------ | ------------------------ | ------------------------- |
| Qwen‑Image           | Qwen2.5‑VL               | MMDiT + VAE 的扩散          | 中文文字渲染、一致的精细编辑            |
| GPT‑Image‑1 / GPT‑4o | GPT‑4o / 派生多模态 LLM       | AR + Diffusion 混合（第三方推断） | 文本 + 视觉的组合能力，复杂风格         |
| Nano Banana / Pro    | Gemini 2.5 Flash / 3 Pro | 未公开，极大概率 LLM 驱动的视觉头      | 多轮编辑、infographics、推理驱动的图像 |

注意：**Google 没有公开 Nano Banana / Pro 图像头的具体形式**，所以任何精确到「是不是 latent diffusion」的说法都只能当猜测。

---

## 6. 更底层一点：为什么在评测里能压过竞品？

不是一句「工程做得好」就能糊过去，至少有几个实打实的结构性优势：

### 6.1 容量 / 计算的 MoE 优势

* 稀疏 MoE 让 Gemini 3 Pro 这类模型在「**总容量**」上可以堆得比密集 Transformer 大得多，但单 token FLOPs 仍然可控。
* 对图像任务来说，这意味着：

  * 可以给文本 / 代码 / 视觉高层抽象分到专门的 expert；
  * 在复杂多模态指令下仍保持低延迟，不会像巨大密集模型那样推理时间爆炸。

Qwen‑Image / GPT‑4o 也都在用大模型，但在 MoE 使用策略、路由算法上，Google 是至少有一整套自己的 stack 的，这点从 Gemini 1.5/2.5/3 的技术报告能看出来。

### 6.2 多模态统一表示 vs 模块化管线

* Nano Banana / Pro：文本 / 图像 / 其它模态基本在同一个 token 空间里流动（即便输入 / 输出有专门编码器 / 头）。
* 典型扩散管线（包括很多开源 LDM）则是：文本编码器 + 图像扩散网络 + VAE，语义与视觉的耦合主要靠 cross‑attention 和数据分布。([arXiv][7])

统一表示带来的好处：

* 同一个「符号空间」里同时看到文本指令、历史对话、参考图像的语义；
* 一致性 / 约束（比如「同一角色」「同一品牌规范」）更容易在 token 级别统一，而不是靠大量 negative prompt 或手工约束。

### 6.3 强化学习 + 人类偏好在多模态上的扩展

* Gemini 3 Pro 明确说明自己在推理任务上使用了强化学习（包括复杂数学、定理证明等数据）。([Google Cloud Storage][2])
* Gemini 3 Pro Image 的训练描述里也写得很白：多轮人类评估 + 安全 / 质量向的 RL。([Google DeepMind][6])

简化理解就是：
**它不是单纯优化图像 log‑likelihood，而是直接优化「人类更喜欢哪张图」这样的 reward。**

当 benchmark 也用 Elo / 人类偏好打分时，这种训练目标和评测目标是高度对齐的，这是优势也是设计上的「刻意」。

### 6.4 搜索 Grounding 和长上下文对 infographics 的增益

* Nano Banana Pro 支持 Search Grounding + Thinking，结合 1M 级别上下文，天然适合「从现实数据 → 信息设计 → 图像」这种 pipeline。([Google AI for Developers][1])
* 这在 benchmark 的 infographics / factual education 类子任务里体现为可观的 Elo 优势。([Google DeepMind][6])

这一块是大部分纯扩散模型根本没设计过的战场：
它们最多是「靠 prompt 把数据 embed 进去」，而不是系统性处理「搜数据 → 校验 → 决定怎么可视化」。

### 6.5 评测与训练闭环

从 Gemini 3 Pro / 3 Pro Image 的 model card 可以看出来，Google 很认真地在做一个闭环：([Google DeepMind][6])

* 内部 / 外部 benchmark（推理、多模态、agent、图像编辑 / T2I）；
* 自动化评估 + 人类评估 + Red‑teaming；
* 将这些指标直接反馈到训练 / RL 阶段。

结果就是：
**Nano Banana / Pro 并不是「随机在图像质量上赢了」，而是围绕「实用的图像生成 / 编辑」这条线上系统性调优的产物。**

---

## 7. 时间有效性说明

* 本笔记基于截至 **2025‑11‑27** 时公开的官方文档与论文：

  * Gemini 1.5 技术报告（多模态 MoE / 长上下文）；
  * Gemini 2.5 技术报告与 API 文档；([arXiv][11])
  * **Gemini 3 Pro Model Card** 与 **Gemini 3 Pro Image Model Card**；([Google Cloud Storage][2])
  * Google 日本官方博客《Nano Banana Pro を発表》；([blog.google][4])
  * DeepMind Nano Banana / Nano Banana Pro 官方页面；([Google DeepMind][3])
  * Qwen‑Image Technical Report；([arXiv][9])
  * OpenAI GPT‑Image‑1 模型文档与 GPT‑4o Image Generation 官方博客；([OpenAI Platform][10])
  * GPT‑ImgEval 对 GPT‑4o 图像架构的技术分析。([arXiv][8])

* 注意：Google / OpenAI 对具体图像头架构仍未公开，涉及这部分的内容我都显式标了「推断」，你可以视作合理假设而不是官方事实。

---

## 参考资料（可直接复制）

> 以下只列**技术文档 / 论文 / 官方页面**，尽量避开营销向内容。

1. **Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context**
   Technical Report, Google DeepMind, 2024. 

   ```text
   https://arxiv.org/abs/2403.05530
   ```

2. **Gemini 2.5 Technical Report**
   Technical Report, Google DeepMind, 2025. ([arXiv][11])

   ```text
   https://arxiv.org/abs/2507.06261
   ```

3. **[Gemini 3 Pro] External Model Card – November 18, 2025**
   Google DeepMind. ([Google Cloud Storage][2])

   ```text
   https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf
   ```

4. **[Gemini 3 Pro Image] External Model Card – November 20, 2025**
   （Nano Banana Pro）Google DeepMind. ([Google DeepMind][6])

   ```text
   https://deepmind.google/models/model-cards/gemini-3-pro-image/
   ```

5. **Gemini 2.5 Flash Image (Nano Banana) – Model Card / Model Page**
   Google DeepMind. ([Google DeepMind][3])

   ```text
   https://deepmind.google/models/gemini-image/flash
   ```

6. **Nano Banana Pro を発表（Gemini 3 Pro Image 公告博客）**
   Google Japan Blog, 2025‑11‑20. ([blog.google][4])

   ```text
   https://blog.google/intl/ja-jp/company-news/technology/nano-banana-pro/
   ```

7. **Gemini models – Gemini API Docs（包含 2.5 Flash Image / 3 Pro Image 配置）**
   Google AI for Developers. ([Google AI for Developers][1])

   ```text
   https://ai.google.dev/gemini-api/docs/models
   ```

8. **Qwen‑Image Technical Report**
   Chenfei Wu et al., 2025. ([arXiv][9])

   ```text
   https://arxiv.org/abs/2508.02324
   ```

9. **High‑Resolution Image Synthesis with Latent Diffusion Models**
   Robin Rombach et al., 2022. （LDM 经典论文）([arXiv][7])

   ```text
   https://arxiv.org/abs/2112.10752
   ```

10. **Denoising Diffusion Probabilistic Models**
    Jonathan Ho et al., 2020. （扩散模型基础）([arXiv][12])

    ```text
    https://arxiv.org/abs/2006.11239
    ```

11. **MaskGIT: Masked Generative Image Transformer**
    Chang et al., 2022. （离散 token 图像生成代表）([arXiv][13])

    ```text
    https://arxiv.org/abs/2202.04200
    ```

12. **GPT‑ImgEval: A Comprehensive Benchmark for Diagnosing GPT‑4o in Image Generation**
    Zhiyuan Yan et al., 2025.（对 GPT‑4o 图像架构的第三方技术分析）([arXiv][8])

    ```text
    https://arxiv.org/abs/2504.02782
    ```

13. **Model – GPT‑Image‑1**
    OpenAI API 官方模型文档. ([OpenAI Platform][10])

    ```text
    https://platform.openai.com/docs/models/gpt-image-1
    ```

14. **Introducing 4o Image Generation**
    OpenAI Official Blog, 2025. ([OpenAI][14])

    ```text
    https://openai.com/index/introducing-4o-image-generation/
    ```

---

如果你之后想专门写「实战章节」（prompt 结构、多轮编辑 workflow、如何利用 Thinking / search grounding 拉满 infographics 等），可以直接在这份理论骨架上往下挂经验就行，不用再纠结底层是不是 U‑Net 了。

[1]: https://ai.google.dev/gemini-api/docs/models "Gemini models  |  Gemini API  |  Google AI for Developers"
[2]: https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf "[Gemini 3 Pro] External Model Card - November 18, 2025 - v5"
[3]: https://deepmind.google/models/gemini-image/flash/ "
      Gemini 2.5 Flash Image (Nano Banana) - 
        Google DeepMind
      
    "
[4]: https://blog.google/intl/ja-jp/company-news/technology/nano-banana-pro/ "Nano Banana Pro: Gemini 3 Pro Image model from Google DeepMind"
[5]: https://deepmind.google/models/gemini-image/pro "
      Gemini 3 Pro Image (Nano Banana Pro) - 
        Google DeepMind
      
    "
[6]: https://deepmind.google/models/model-cards/gemini-3-pro-image/ "[Gemini 3 Pro Image] External Model Card - 20 November 2025 v2"
[7]: https://arxiv.org/abs/2112.10752?utm_source=chatgpt.com "High-Resolution Image Synthesis with Latent Diffusion Models"
[8]: https://arxiv.org/abs/2504.02782 "[2504.02782] GPT-ImgEval: A Comprehensive Benchmark for Diagnosing GPT4o in Image Generation"
[9]: https://arxiv.org/abs/2508.02324 "[2508.02324] Qwen-Image Technical Report"
[10]: https://platform.openai.com/docs/models/gpt-image-1?utm_source=chatgpt.com "Model - OpenAI API"
[11]: https://arxiv.org/abs/2507.06261?utm_source=chatgpt.com "[2507.06261] Gemini 2.5: Pushing the Frontier with ..."
[12]: https://arxiv.org/abs/2006.11239?utm_source=chatgpt.com "Denoising Diffusion Probabilistic Models"
[13]: https://arxiv.org/abs/2202.04200?utm_source=chatgpt.com "[2202.04200] MaskGIT: Masked Generative Image Transformer"
[14]: https://openai.com/index/introducing-4o-image-generation/?utm_source=chatgpt.com "Introducing 4o Image Generation - OpenAI"
