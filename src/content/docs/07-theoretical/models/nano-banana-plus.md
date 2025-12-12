---
title: Nano Banana / Nano Banana Pro 多模态图像模型笔记（融合版 · 2025‑12）
description: 以 Nano Banana / Nano Banana Pro 为主线，串起 Sparse MoE、多模态统一建模、T2I + Edit 数学目标，以及 Z‑Image / Seedream / GPT‑Image / Qwen‑Image 对比
hasMath: true
tab:
  label: Nano Banana +
  order: 10
---

> 写在最前面：
> - 以前那套「CLIP Text Encoder + U‑Net + VAE」的典型 latent diffusion 心智模型，**已经不够用来描述 Nano Banana / Nano Banana Pro** 了。
> - 现在的 Nano Banana 系列，本质都是挂在 **Gemini 多模态 Sparse MoE 大模型** 上的「图像输入 / 输出头」，属于 **LLM‑first、多模态统一建模**。
> - 竞品里：
>   - 闭源：Seedream（现在到 **4.5**）、GPT‑Image‑1 / GPT‑4o Image；
>   - 开源：Z‑Image (S3‑DiT)、Qwen‑Image 等。
> - 这份笔记 = 你原来那份“详细文档” + 我给你的“骨架版”**融合整理版**，未来可以继续在上面加你的实验和图。

---

## 0. 总览：一句话版本

**一句话 summary：**

> **Nano Banana** ≈ 基于 **Gemini 2.5 Flash Image** 的多模态图像模型；  
> **Nano Banana Pro** ≈ 基于 **Gemini 3 Pro Image** 的「工作室级」图像生成 / 编辑系统。  

它们的共同核心是：

- **骨干**：原生多模态、超长上下文的 **Sparse Mixture‑of‑Experts (MoE) Transformer**（Gemini 2.5 / 3 Pro）  
- **图像头**：挂在这颗多模态大脑上的 **image head**，统一处理 Text‑to‑Image / Image‑to‑Image / Edit / multi‑image composition。  

它们强的地方不是「单独一个扩散网络调得好」，而是：

> **先用一个很强的 LLM 多模态大脑搞清楚你要什么，再让图像头按统一的数学目标去「实现」这个计划。**

---

## 1. 角色 & 版本：Nano Banana 家族和它的对手们

### 1.1 官方映射关系

- **Nano Banana**  
  - 对应模型：**Gemini 2.5 Flash Image**（API: `gemini-2.5-flash-image`）  
  - 背后是 **Gemini 2.5 Flash**（思考模型 + 长上下文 + 多模态）。  

- **Nano Banana Pro**  
  - 对应模型：**Gemini 3 Pro Image**（API: `gemini-3-pro-image-preview`），Google 自己主页上直接写成 **Nano Banana Pro 🍌 – built on Gemini 3 Pro**。  
  - 背后是 **Gemini 3 Pro**：稀疏 MoE 多模态 Transformer，1M token context。  

**定位差异（非常粗略的）**：

- **Nano Banana**：  
  - 以 **Gemini 2.5 Flash** 为基座，强调 **高性能/cost‑efficient**，主打日常生图 / 编辑、高吞吐。  
- **Nano Banana Pro**：  
  - 以 **Gemini 3 Pro** 为基座，强调 **studio‑quality**：多角色、一致性、InfoGraphics、2K/4K、多参考图等。  

此外，2025‑11 之后：

- Google 在 Gemini app 里已经把 Pro 设为默认图像模型，老 Nano Banana 退到次要位置。  

---

### 1.2 Seedream：从 4.0 到 4.5

- **Seedream 4.0**  
  - ByteDance 的统一 T2I + Edit + multi‑image 架构，强项是海报、商业视觉、文字排版和多参考一致性。  
  - 在 Gemini 3 Pro Image 的 model card 中，**对标模型仍然是 “Seedream v4 / v4 4K”**。  

- **Seedream 4.5（最新）**  
  - 官方定位为一次 **refinement‑focused upgrade**，在 4.0 基础上做全面强化：  
    - 更强的 **主体锁定 / 一致性**；  
    - 更好的 **多图编辑**；  
    - 更锐利的 **文本排版 / dense text rendering**；  
    - 更丰富的 **世界知识 + 空间理解**。  
  - 日文长文「ゼロからわかる！Seedream 4.5」里，还直接把 Seedream 4.5 和 Nano Banana Pro 对比：  
    - Seedream 4.5 更偏 **艺术感/电影感光影、高一致性、参照忠实**；  
    - Nano Banana Pro 更偏 **写实、人物、肌肤、信息图、文字密集场景**。  

> 对于本笔记：  
> - 说到 Google 官方 benchmark → 仍然以 Seedream v4 为参照物；  
> - 但在「真实生态」里，**你需要意识到现在实际在场的是 4.5**，它在一致性 / 文本方面又往前走了一小步。

---

### 1.3 其他重要玩家：Z‑Image / GPT‑Image / Qwen‑Image

- **Z‑Image**（阿里 / 通义）：  
  - 6B 参数的开源基座。  
  - 架构：**Scalable Single‑Stream Diffusion Transformer（S3‑DiT）**。  
  - 目标：用相对小的规模 + 单流架构 + 蒸馏，做出接近 Nano Banana Pro / Seedream 的图像质量，支持本地/小型部署。  

- **GPT‑Image‑1 / GPT‑4o Image**（OpenAI）：  
  - GPT‑4o 本身就是原生多模态 LLM，图像生成被集成到同一个模型中；  
  - GPT‑Image‑1 对外暴露的 text+image → image 模型，支持生成 + 编辑 + inpainting。  

- **Qwen‑Image**：  
  - 「Qwen2.5‑VL（语义头） + MMDiT 风格 diffusion UNet（图像头）」的典型 **VL + Diffusion** 管线，中文/多语言文本渲染非常强。  

---

## 2. 骨干：Gemini 多模态 Sparse MoE（以 Nano Banana 为视角）

这一节只回答一个问题：

> **Nano Banana / Pro 的“脑子”到底长什么样？**

### 2.1 Gemini 2.5 / 3 Pro：多模态 + 长上下文 + Sparse MoE

来自 Gemini 2.5 Technical Report + Gemini 3 Pro Model Card：  

- **多模态**：Gemini 2.5 / 3 Pro 都是原生支持 text / image / audio / video 的多模态 Transformer。  
- **长上下文**：  
  - 2.5 把 context 推到百万级别；  
  - 3 Pro 在产品文档里明确写的是 **1M token context，可以输出 64K token**。  
- **Sparse MoE Transformer**：  
  - 采用稀疏专家混合结构，对每个 token 使用路由器选择 Top‑K 个 expert FFN；  
  - 让「总参数量」和「每 token 计算量」解耦——**总容量超大，但每个 token 的算力成本不爆炸**。

> 这些性质都会“透过”到 Nano Banana / Pro：  
> - 它们可以吃很多图 / 很长上下文；  
> - 可以在同一个序列里处理文本 + 图像 + 其它模态；  
> - 不同 token 会被路由到不同 expert，天然适合做多模态。

---

### 2.2 单模态 MoE 的小公式（先把路由搞清楚）

在普通 Transformer 的一层里，前馈层是一个 FFN：

\[
\text{FFN}(x) = W_2 \sigma(W_1 x)
\]

MoE 把它换成 **多 expert + router** 的形式：

- 有 \(E\) 个 expert：\(e_i(x)\)，每个是一个 FFN；  
- Router 产生 gating：

\[
g(x) = \text{softmax}(W_g x) \in \mathbb{R}^E
\]

- 只对 Top‑K 个 expert 做前向：

\[
\text{MoE}(x) = \sum_{i\in \text{TopK}(g(x))} g_i(x)\, e_i(x)
\]

再加上负载均衡/正则项，防止所有 token 都挤到同一个 expert。

---

### 2.3 多模态里的 Sparse MoE：LIMoE / VL‑MoE 视角

Google 的 **LIMoE（Language‑Image MoE）** 和 **VL‑MoE** 非常像 Gemini/Gemini‑Image 的精神前辈：  

关键点：

- 输入同时包含 **文本 token** 和 **图像 patch token**；
- Self‑attention 是共享的，所有模态互相看；  
- FFN 替换成 MoE，router 只看 token 表示决定走哪个 expert；  
- 训练后自然出现：
  - 有的 expert 几乎只处理图像；
  - 有的专门处理文本；
  - 有的专门负责 text‑image cross‑modal 信号。

VL‑MoE 更往前走一步：  

- 统一用 **Masked Data Modeling (MDM)** 做预训练：  
  - 做文本 mask（MLM）、图像 mask（MIM）、图文联合 mask；  
- MoE 层在 unified 任务下学会「谁负责图」「谁负责字」「谁负责交互」。

> nano 版 mental model：
> - **Gemini 3 Pro = 超大号 LIMoE / VL‑MoE，多模态 / 多任务统一**  
> - **Nano Banana / Pro = 在这个 backbone 上接一个图像输出头**

---

### 2.4 把 Nano Banana / Pro 放上这张图

结合官方 model card + 产品页：  

可以这么理解：

- **Backbone**：  
  - Nano Banana：Gemini 2.5 Flash（多模态 + MoE + 长上下文）；  
  - Nano Banana Pro：Gemini 3 Pro（更强的 reasoning + agent 能力）。

- **Input**：  
  - 文本 → Token；  
  - 源图 / 参考图 → VAE latent + patch token + 视觉 encoder 特征；  
  - 蒙版 / 标注 → 额外 token 或 embedding。  

- **Backbone 处理**：  
  - 所有 token 进入同一条 **Sparse MoE 多模态 Transformer**；  
  - 不同 token 被路由到不同专家（语言、视觉、跨模态等）。  

- **Output**：  
  - 主输出：图像 latent / 图像 token 序列，接解码器 → 图像；  
  - 辅助输出：可能还有「内部 reasoning token」（Thinking 模式）、工具调用、搜索请求等等。

> Nano Banana 的「厉害」不是来自某一个神奇的 U‑Net，而是来自：
> - **多模态 MoE 大脑**；  
> - 上面挂一个「图像头」作为输出形式之一。

---

## 3. 统一建模：为什么一个模型能同时做 T2I / I2I / Edit？

这一节从数学视角把任务统一起来。

### 3.1 统一成一个条件分布

设训练数据分布 \(\mathcal{D}\) 中每个样本包含：

- 源图像：\(x_{\text{src}}\)  
- 目标图像：\(x_0\)  
- 文本指令：\(t\)  
- 蒙版：\(m \in \{0,1\}^{H\times W}\)，1 = 允许修改区域  

想要学习的目标是：

\[
p_\theta(x_0 \mid x_{\text{src}}, t, m)
\]

不同任务对应不同配置：

- **Text‑to‑Image**：
  - 把 \(x_{\text{src}}\) 视作某个固定 dummy 图，或直接忽略；
  - 令 \(m \equiv 1\)（整张图都可编辑）。

- **Image‑to‑Image**：
  - \(x_{\text{src}}\) 为真实图像；
  - \(m\) 接近全 1（但可以对某些区域设 0 表示「锁住」）。

- **局部 Edit / Inpainting**：
  - \(x_{\text{src}}\) 为原始图像；
  - \(m\) 在局部区域为 1，其余为 0。

> 对 Nano Banana / Pro 这种统一架构来说：
> - **输入管线**：都是「文本 + 源图 + 蒙版」→ token；
> - **训练目标**：永远是「在这些条件下生成一张图」，只是条件不同。

Seedream 4.0 / Z‑Image‑Edit 论文都明确说了：它们在 **一个架构内统一 T2I + Edit + multi‑image**，只是 condition 稍微不同。  

---

### 3.2 Latent Diffusion 视角下的统一训练目标

虽然 Google 没公开 Nano Banana / Pro 的图像头细节，但大多数工业图像系统（Seedream、Z‑Image、Qwen‑Image 等）都使用 **latent diffusion** 或其变种。  

在 latent diffusion 框架中：

1. **用 VAE 编码图像**：

   \[
   z_0 = \text{enc}(x_0), \quad z_{\text{src}} = \text{enc}(x_{\text{src}})
   \]

2. **前向扩散**：

   \[
   z_t = \sqrt{\alpha_t}\, z_0 + \sqrt{1-\alpha_t}\,\epsilon,\quad \epsilon\sim\mathcal{N}(0,I)
   \]

3. **构造“混合 latent”**（统一 Edit / T2I）：

   \[
   \tilde{z}_t = m \odot z_t + (1 - m)\odot z_{\text{ctx}}
   \]

   - \(z_{\text{ctx}}\)：通常取 \(z_{\text{src}}\)，也可以叠加别的参考 latent。

4. **训练噪声预测网络 \(\epsilon_\theta\)**：

   \[
   \mathcal{L}_{\text{diff}}(\theta) 
   = \mathbb{E}_{(x_0, x_{\text{src}}, t, m),\, t,\, \epsilon}
   \Big[\big\|\epsilon - \epsilon_\theta(\tilde{z}_t, t, m, \text{cond}(t, x_{\text{src}}))\big\|_2^2\Big]
   \]

   - \(\text{cond}(t, x_{\text{src}})\)：来自 Gemini / GPT / Qwen‑VL 那类 LLM 的条件 embedding（语义 / 世界知识 / 编辑意图）。

**直觉：**

- 在 \(m=1\) 区域，latent 被加噪 + 再预测噪声 → 真正发生「编辑」；  
- 在 \(m=0\) 区域，latent 更偏向 \(z_{\text{ctx}}\)（源图 / 参考图），训练时会鼓励模型「别乱动」。

---

### 3.3 Identity / Consistency Loss：未编辑区域要「真的不动」

为了让编辑真正稳定，很多模型会加一个 identity / reconstruction loss：

设 \(x_\theta\) 是当前 step 解码出来的图像（或最终结果），定义：

\[
\mathcal{L}_{\text{id}}(\theta) 
= \mathbb{E}\Big[\big\|(1-m)\odot\big(x_\theta - x_{\text{src}}\big)\big\|_1\Big]
\]

再加上感知损失 / CLIP 对齐等：

\[
\mathcal{L}(\theta) 
= \mathcal{L}_{\text{diff}} 
+ \lambda_{\text{id}} \mathcal{L}_{\text{id}} 
+ \lambda_{\text{perc}} \mathcal{L}_{\text{perc}}
+ \lambda_{\text{CLIP}} \mathcal{L}_{\text{CLIP}}
+ \cdots
\]

- \(\mathcal{L}_{\text{perc}}\)：VGG / DINO / 自家视觉 backbone 之类的 perceptual loss；  
- \(\mathcal{L}_{\text{CLIP}}\)：文本‑图像对齐 reward。  

Z‑Image / Seedream 系列论文都明确提到类似的「编辑样本构建 + 多种 loss 混合」设计。  

> 对 Nano Banana / Pro：  
> - 合理猜测它们的图像头也有类似设计，只是细节闭源；  
> - 重点在于：**一个统一的 diffusion/生成目标 + 不同条件，就能自然统一 T2I / I2I / Edit**。

---

### 3.4 Autoregressive / 混合框架（类 GPT‑4o）

另一条路线是 GPT‑4o / 部分 Janus 的做法：  

- 把图像离散成 patch‑token 序列；  
- 文本 token 走自回归 LM loss；  
- 图像 token 结合 diffusion‑like 目标或 masked modeling；  
- 整体形式：

  \[
  \mathcal{L}(\theta) 
  = \mathbb{E}\big[-\log p_\theta(\text{text tokens} \mid \text{context})\big]
  + \lambda \cdot \mathcal{L}_{\text{image}}(\theta)
  \]

Edit / multi‑image 通过在输入序列里加入源图 token、mask token、参考图 token 来体现。

Gemini 3 Pro Image 可能也采用类似「统一序列 + image head」的设计，只是 Google 未公开图像头具体是 diffusion 还是 AR，我们最多只能把这一套当作 **参考心智模型**。  

---

## 4. Nano Banana / Pro：为什么指令遵循 & 一致性这么强？

这一节从「LLM‑first + MoE」角度整理一下直觉。

### 4.1 LLM‑first：先想清楚再画图

传统 Stable Diffusion / LDM 管线：

- 文本理解靠 CLIP / 文本编码器；  
- 图像网络（U‑Net / DiT）在去噪时通过 cross‑attention“看一眼”文本 embedding。  

**Nano Banana / Pro 的流程则更像：**

1. **Gemini 大脑先干这些事：**
    - 理解长指令中的约束、角色、场景、风格、禁止事项；  
    - 结合上下文多轮对话、参考图片、文档等；  
    - 如开启 **Thinking / Search Grounding**，还会先走一段 internal reasoning + 查资料。  

2. **把这些理解结果压成一套 condition embedding / 控制信号**，包含：
   - 哪些元素必须固定（主角 identity / logo / 品牌颜色）；  
   - 哪些可以变化（背景 / pose / 表情 / 时间/天气等）。

3. **图像头负责在这个条件下生成 latent / 图像 token**，而不是自己“猜语义”。

> 结果：  
> - 指令遵循能力 ≈ LLM 的指令理解 + RLHF/RLAIF；  
> - 图像头更像是「执行器」，而不是「一边读 prompt 一边去噪的大脑」。

---

### 4.2 长上下文 + 世界知识 + Search Grounding

- Gemini 2.5 / 3 Pro 都是长上下文多模态思考模型（百万级别 context）。  
- Gemini 3 Pro Image（Nano Banana Pro）明确支持：  
  - **Thinking 模式**；  
  - **Search Grounding**（生成前可查询网络/知识）。  

这对以下场景特别关键：

- 长文档 / 多页 PPT / 多图组成一张信息图；  
- 需要事实正确的教育插画、有数字的图表；  
- 多轮修修改改的 UI/广告设计稿。

传统扩散模型在这方面基本没法正面硬刚，只能靠 prompt hack + 人类辅助。

---

### 4.3 一致性：多参考 / 蒙版 / MoE 专家三件套

**多参考图 + 蒙版**：

- 产品侧：Nano Banana Pro 支持多参考图（Google AI Studio 页面写着“consistent heroes, up to multiple subjects and images”）。  
- 技术侧（类比 Z‑Image / Seedream / GPT‑4o）：
  - 所有参考图 encode 成 latent / token（加特殊位置/模态标记）；  
  - 蒙版 \(m\) 告知「哪些区域可被大改」。

**训练目标里维护“一致性”**：

- 前面 diffusion + identity loss 已经说明了一种标准做法：  
  - \(\mathcal{L}_{\text{id}}\) 强迫未编辑区域还原源图；  
  - perceptual / CLIP loss 强迫编辑区域满足文本。  

**Sparse MoE 提供「身份 / 排版专家」**：

- 在长期训练中，不同 expert 会自发专精不同类型 token：  
  - 人脸 / 身体 / identity；  
  - 文本排版 / 标志 / UI；  
  - 背景 / 材质 / 光照。  
- Router 在看到对应 patch 时，更偏向路由到这些 expert → 形成 **角色一致性 / LOGO 稳定** 的内在能力。

> 所以 Nano Banana Pro 在官方页面才敢用“locked‑in identity across infinite variations”“consistent heroes”等说法。  

---

## 5. Z‑Image 的 S3‑DiT vs Nano Banana Pro（结构一一对比）

> 思路：**“如果我用 Z‑Image S3‑DiT 做一个平民版 Nano Banana Pro，会差在哪？”**

### 5.1 高层对比

- **Z‑Image**（开源，阿里）：  
  - 6B 参数，单流 Diffusion Transformer（S3‑DiT）；  
  - 所有模态 token（文本、图像 latent、参考 embedding）拼成一个序列；  
  - 目标：高质量 + 高效率 + 可在 <16GB 显存上跑（Turbo 版）。  

- **Nano Banana Pro**（闭源，Google）：  
  - 基座：超大 Sparse MoE 多模态 LLM（Gemini 3 Pro）；  
  - 图像只是众多输出能力之一；  
  - 面向云 TPUs，主打 studio‑level control + infographics + agent 工作流。

### 5.2 结构对照表

| 维度           | Z‑Image (S3‑DiT)                                                  | Nano Banana Pro (Gemini 3 Pro Image)                                      |
|----------------|-------------------------------------------------------------------|----------------------------------------------------------------------------|
| 主干结构       | **Single‑Stream Diffusion Transformer**：decoder‑only DiT，所有输入拼一条 token 流。 | **Sparse MoE 多模态 Transformer**（Gemini 3 Pro），image head 挂在其上。 |
| 参数规模       | ~6B（+ Turbo 蒸馏）                       | 未公开，但大幅高于 6B，有效容量数百 B 级的 MoE 背骨干（推断+model card）。 |
| 模态支持       | text + image 为主（专注图像生成/编辑）                          | text / image / audio / video 原生多模态，图像只是众多能力之一。 |
| 文本处理       | 外挂文本 encoder（如 Qwen‑VL 轻量版）→ 只作为条件            | 由 Gemini 3 Pro 自带的大语言模块处理，拥有强推理和世界知识。 |
| 一致性 & 编辑 | S3‑DiT 单流结构 + 编辑专用 Z‑Image‑Edit；强调文本渲染 & 准确编辑。 | 利用多模态 MoE + Think + Search + 更大编辑数据 + RLHF，在多角色 / 多图 / infographics benchmark 上领先。 |
| 部署重点       | 追求「在消费硬件上也能跑」，适合企业自建 / 本地部署              | 完全云服务导向，与 Google 生态（Docs / Slides / Ads / Photos）深度集成。 |

> 粗暴归纳：  
> - **Z‑Image = 高效开源小钢炮**  
> - **Nano Banana Pro = 巨型多模态大脑带一个顶配图像外设**

---

## 6. 路线对比：Qwen‑Image / GPT‑Image / Seedream 4.5 vs Nano Banana Pro

### 6.1 「Diffusion‑first」vs 「LLM‑first」标签（人为划分）

**Diffusion‑first 系列**（图像网络为主，LLM 辅助）：

- **Qwen‑Image**：Qwen2.5‑VL + MMDiT Diffusion Head。  
- 很多 Stable Diffusion / FLUX / Hunyuan‑Image 等。

特点：

- VL 模块负责理解指令 + 多模态输入；  
- 图像网络主导 denoising / 解码。

**LLM‑first 系列**（LLM 先规划，图像头执行）：

- **Nano Banana / Pro（Gemini 2.5 Flash Image / 3 Pro Image）**；  
- **GPT‑Image‑1 / GPT‑4o Image**。  

特点：

- 多模态 LLM 先统一理解 / 推理 / 规划；  
- 图像 head 是众多输出之一（类似“我们把图像也当一种语言输出”）。

> Nano Banana Pro 非常典型地落在 **LLM‑first + Sparse MoE + 多模态** 这一区间。

---

### 6.2 Seedream 4.5 的位置

- 架构仍然是 **统一的 diffusion transformer + VAE**，偏 Diffusion‑first；  
- 但 4.5 明确强调：
  - **更强的一致性**（尤其多图编辑、参照忠实）；  
  - **更好的 dense text 排版**；  
  - **更牢的空间理解**（布局 & 比例自然）。  

日文那篇对比文里给的“简单分工”其实很好记：

- **Art 稍微超现实 / 氛围光影 / 高艺术感 → Seedream 4.5**  
- **更写实 / 人脸 / 肤色 / 信息图 / 文字重场景 → Nano Banana Pro**  

---

### 6.3 小对比表

| 模型系列          | 高层路线            | 强项                                                         |
|-------------------|---------------------|--------------------------------------------------------------|
| Nano Banana / Pro | LLM‑first + Sparse MoE 多模态 | 写实人物、多角色、多图一致性、信息图、长文本指令、多轮编辑     |
| Seedream 4.5      | Diffusion‑first 统一架构       | 艺术氛围光影、参照忠实度、多图编辑一致性、电影感色彩         |
| GPT‑Image‑1 / 4o  | LLM‑first 多模态             | 世界知识丰富、风格多样、与 ChatGPT 生态深度整合              |
| Z‑Image           | 单流 Diffusion Transformer | 高质量 + 高效率，开源 6B、小显卡可跑、bilingual 文本渲染强   |
| Qwen‑Image        | VL + Diffusion Head         | 中文 & 多语言文本渲染，复杂文本编辑、多场景组合              |

---

## 7. 为什么 Nano Banana Pro 在 benchmark 里能「压一头」？

来自 Gemini 3 Pro Image 的 model card：  

- 在下列维度的 Elo 人类偏好评估中，Nano Banana Pro 大多领先：  
  - Text rendering / stylization；  
  - General Image Editing / Object & Environment Editing；  
  - Character editing / multi‑character editing；  
  - Infographics、教育事实类可视化、多图组合等。  

**结构性原因总结一下：**

1. **MoE 带来的超大容量**  
   - 很多 expert 可以专精某类视觉/语言技能（人脸、排版、材质、风格等）；  
   - 对复杂指令的分解能力更强，训练时也可以塞进更多异构任务。

2. **多模态统一表示**  
   - 文本 + 图像 + 历史对话 + 工具使用都在同一 token 空间流动；  
   - “同一角色/品牌/风格/语境”这些约束可以在 token 级不断重复出现，被模型牢牢记住。

3. **强化学习 + 人类偏好直接用在图像任务上**  
   - model card 明确提到：用人类偏好 / critic feedback 做 RL / 安全优化。  
   - 评测也用 Elo / 人类偏好 → 训练目标和评测目标直接对齐。

4. **Search Grounding + Thinkable 模式的加成**  
   - 特别是 infographics / 教育 / 事实相关图片：  
     - 先 think → 再查 → 再画，比单纯「prompt→扩散」稳很多。  

---

## 8. 时间有效性 & 版本备注（2025‑12 状态）

截至 **2025‑12‑10**，这份笔记参考了：

- **Gemini 2.5 Technical Report**（v5，2025‑10 更新）：[arXiv:2507.06261](https://arxiv.org/abs/2507.06261)
- **Gemini 3 Pro Model Card**（2025‑11 v6）：[PDF](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf)
- **Gemini 3 Pro Image Model Card**（2025‑11 v2）：[PDF](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Image-Model-Card.pdf)
- **Z‑Image 论文 & GitHub & 官方 blog**：[arXiv:2511.22699](https://arxiv.org/abs/2511.22699)，[GitHub](https://github.com/Tongyi-MAI/Z-Image)，[Blog](https://tongyi-mai.github.io/Z-Image-blog/)
- **Seedream 4.0 / 4.5 官方与第三方文档**：[Seedream 4.5](https://seed.bytedance.com/en/seedream4_5)，[BytePlus](https://www.byteplus.com/en/product/Seedream)
- **Qwen‑Image Technical Report**：[arXiv:2508.02324](https://arxiv.org/abs/2508.02324)，[PDF](https://qianwen-res.oss-cn-beijing.aliyuncs.com/Qwen-Image/Qwen_Image.pdf)，[Blog](https://qwenlm.github.io/blog/qwen-image/)
- **GPT‑ImgEval（GPT‑4o 图像架构分析）**：[arXiv:2504.02782](https://arxiv.org/abs/2504.02782)，[GitHub](https://github.com/picotrex/gpt-imgeval)
- **OpenAI GPT‑Image‑1 官方文档 & GPT‑4o Image 官方博客**：[Image generation API (gpt-image-1)](https://openai.com/index/image-generation-api)，[Introducing 4o Image Generation](https://openai.com/index/introducing-4o-image-generation/)，[System Card Addendum](https://openai.com/index/gpt-4o-image-generation-system-card-addendum)

需要不断留意的地方：

- Google / OpenAI 迟早会公布更多图像头细节，到时需要回头校正本笔记里所有「推断」部分；  
- Seedream 4.5 之后是否会有 5.0 / 新架构；  
- Z‑Image 后续可能继续加视频 / 3D / 控制分支，影响“统一建模”的具体实现细节。

---

## 9. 推荐阅读 & TODO（给未来的你）

### 9.1 推荐阅读（精简清单）

- **LIMoE: Learning Multiple Modalities with One Sparse MoE Model**（Google Blog + Paper）：[Google Research Blog](https://research.google/blog/limoe-learning-multiple-modalities-with-one-sparse-mixture-of-experts-model/)，[arXiv:2206.02770](https://arxiv.org/abs/2206.02770)
- **Scaling Vision‑Language Models with Sparse MoE (VL‑MoE)**：[ACL Anthology](https://aclanthology.org/2023.findings-emnlp.758/)
- **Gemini 2.5 Technical Report**；Gemini 3 Pro Model Card & Gemini 3 Pro Image Model Card：[arXiv:2507.06261](https://arxiv.org/abs/2507.06261)，[3 Pro PDF](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf)，[3 Pro Image PDF](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Image-Model-Card.pdf)
- **Z‑Image: An Efficient Image Generation Foundation Model with S3‑DiT**（论文 + blog + GitHub）：[arXiv:2511.22699](https://arxiv.org/abs/2511.22699)，[GitHub](https://github.com/Tongyi-MAI/Z-Image)，[Blog](https://tongyi-mai.github.io/Z-Image-blog/)
- **Seedream 4.5 官方页面 & 技术解读**：[Seedream 4.5](https://seed.bytedance.com/en/seedream4_5)，[BytePlus](https://www.byteplus.com/en/product/Seedream)
- **Qwen‑Image Technical Report**；**GPT‑ImgEval**（理解 GPT‑4o 图像头）：[Qwen arXiv:2508.02324](https://arxiv.org/abs/2508.02324)，[GPT‑ImgEval arXiv:2504.02782](https://arxiv.org/abs/2504.02782)

### 9.2 给未来自己的 TODO 灵感

你之后可以在这份笔记上继续加：

1. **画你自己的结构图**：  
   - 输入（文本 / 多参考图 / 蒙版） → Gemini 多模态 Sparse MoE → image head → 解码；  
   - 标出「哪些层可能是 MoE」「哪些 token 可能去哪类 expert」。

2. **把第 3 节的损失函数变成你自己的实验版本**：  
   - 显式加 CLIP / VLM reward；  
   - 对不同区域的权重做 ablation。

3. **写一节完全基于实战的「Nano Banana Pro prompt patterns」**：  
   - 分：角色一致性、多图信息图、局部编辑、语言混合（中英 + 特殊符号）等。

4. **做一个 mini benchmark：Nano Banana Pro vs Seedream 4.5 vs Z‑Image‑Turbo**：  
   - 选几个你在乎的指标：  
     - 文本渲染、角色一致、复杂光影、编辑保真度等；  
   - 用自己的审美 / use case 做一轮对比，把结论 append 到本笔记。

> 到这里，这个「融合版」就可以当你的总纲了：  
> - 上面部分讲 **概念 / 架构 / 数学目标**；  
> - 下面留白位专门记 **实战经验 / prompt 模板 / 对比实验**。
