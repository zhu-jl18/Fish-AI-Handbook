---
title: Scaling Laws
description: 大就是好吗？
contributors: [codex, kimi]
---

> **一句话版**：大模型不是玄学，是一门「算账学」：给定算力和钱，你是要**堆参数**、**喂数据**，还是**推理时多算一会儿**。Scaling laws 就是这门算账学的基础，而 Gemini 3 Pro、Qwen3‑Max、GLM‑4.6、MiniMax‑M2 正好是 2025 年这套理论在工程上的几种不同解法。

下文默认时间背景是 **2025 年 11 月**，信息尽量对齐最新公开资料。

---

## 1. Scaling Laws：大模型的「算账公式」

### 1.1 三个核心变量：N、D、C

在 GPT‑3 时代，OpenAI 的 Kaplan 等人系统性量了一件事：**语言模型的 cross‑entropy loss 随着模型规模、数据量和训练算力增长，呈现稳定的幂律下降**。([arXiv][1])

常见的非严格「口胡版」可以写成：

> **loss(N, D, C) ≈ L* + a·N^-α + b·D^-β + …**

* **N**：非 embedding 参数量（parameters）
* **D**：训练 token 数
* **C**：训练 FLOPs（大致可以用 `C ≈ 6 N D` 来估，6 这个系数来自 Transformer 前向 + 反向的 FLOPs 统计）([Adam Casson][2])

含义很简单：

* 模型更大（N↑）、数据更多（D↑）、算得更久（C↑）→ loss 按幂律往下掉；
* 在相当大的范围内，这种关系是「可预期」的，而不是玄学随机数。

**这就是 scaling laws 的本质：在 log–log 坐标系里，loss 基本是一条直线。**

---

### 1.2 Chinchilla：给定训练算力，怎么最划算？

Kaplan 之后，DeepMind 的 Chinchilla 论文把问题问得更现实：

> **在训练 FLOPs 固定的前提下，怎么选择 N 和 D 才「最省钱」？**([arXiv][3])

他们的结论是：

* 之前的 GPT‑3 / Gopher 一类模型，都 **参数太大、数据太少，严重欠训**；
* 对于给定的训练算力，**最优做法是「参数和 token 数大致等比扩展」**——模型翻倍的同时，数据量也翻倍；
* 在一样的训练 FLOPs 下，**70B + 4x 数据的 Chinchilla**，比 **280B + 少数据的 Gopher** 表现更好。

这件事的实际影响是：

* 行业不再盯着「参数数」吹，更关注 **compute‑optimal** 的训练策略；
* 大家意识到：**同样的算力，用来喂数据往往比盲目堆参数更划算**。

---

### 1.3 工业界：故意「违背」Chinchilla

然后就轮到工业界算自己的账了：

* 训练只发生一次，但 **推理会发生无数次**；
* 很多公司宁可在训练阶段「不完全 compute‑optimal」，也要在 **推理阶段省钱**。

一个典型例子是 **Llama 3 8B**：

* 只有 **8B 参数**，但预训练喂了 **15T+ tokens**，token/parameter 比例是 **约 1875:1**；([Hugging Face][4])
* 这显然远超 Chinchilla 给出的几十:1 的「理论最佳值」，属于刻意 **过训练小模型**。

为什么这么干还能被认为「合理」？

* 小模型推理便宜，用的人多；
* 你可以给它喂超多干净数据，让它在小算力设备上跑得又快又强；
* **train 时稍微亏一点 compute，换推理阶段长期巨额节省**，对产品是划算的。

所以比较好的说法是：

> **Chinchilla 没过时，它给了一个「训练 compute 最优」的参考点；
> 工业界只是为了推理成本，故意在这个点附近偏向「小模型 + 多数据」。**

---

### 1.4 过参数化 & 鲁棒性：为什么大家都爱「多放点参数」

还有一个经常被忽略的理论支撑：**为什么要大规模过参数化？**

Bubeck & Sellke 在 *A Universal Law of Robustness via Isoperimetry* 里证明了一个很有意思的结论：([arXiv][5])

> **想要既拟合数据、又对输入扰动足够鲁棒（平滑、没一丢丢噪声就爆炸），
> 需要的参数量要比「刚好插值数据」多出一个与数据维度 d 成比例的因子。**

翻译成人话：

* 老一代统计学觉得：n 个样本，用 O(n) 个参数就够了；
* 现代深度网络如果想在高维空间里 **「又准又稳」**，往往需要远多于 n 的参数；
* **过参数化不是副作用，而是想要鲁棒性时的必选项之一**（至少在这个理论框架下是这样）。

这也解释了一个直觉：

* 大模型往往 **更稳、更不怕一点噪声**，不是因为魔法，而是因为参数真的多很多。

---

## 2. 涌现能力：到底是「突然开窍」，还是指标幻觉？

### 2.1 「涌现能力」的提出

Wei 等人在 2022 年的 *Emergent Abilities of Large Language Models* 提出了一个现在耳熟能详的概念：([arXiv][6])

> 某种能力在小模型上完全不会，在大到某个规模后突然出现，
> 而且无法通过小模型的 scaling 曲线外推得到 —— 这叫「涌现」。

典型例子：

* 小模型在某些推理基准（比如复杂算术、某些逻辑题）上接近随机；
* 模型规模一旦跨过某个门槛，准确率突然从「啥都不会」跳到「能用」。

听起来很像游戏里升到某级突然解锁新技能。

---

### 2.2 「涌现是幻觉？」的反驳

2023 年 Schaeffer 等人在 *Are Emergent Abilities of Large Language Models a Mirage?* 中提出了一个很刺耳的观点：([arXiv][7])

> 很多所谓的「涌现」，其实是 **指标设计得太粗糙** 造成的幻觉。

他们做了几件事：

* 证明如果你用 **0/1 式的硬指标（比如是否完全解对）**，曲线很容易看起来「突然跳变」；
* 换成 **更连续的指标**（如 Brier score 或 log loss），很多任务的表现其实是 **平滑上升**；
* 还可以通过「刻意挑选指标」人为制造各种「看起来突然开窍」的现象。

一个比较平衡的结论是：

* **底层能力总体上是随规模平滑提升的**；
* 但人类关心的很多任务有「可用 vs 不可用」阈值，一旦过线体感会非常「突然」；
* 这更像是「产品可用性阈值」而不是严格意义上的物理涌现定律。

---

## 3. 新维度：Test‑time Compute Scaling（推理时多算一会儿）

2018–2023 年，大家基本都在玩 **预训练 scaling**：堆参数、堆数据、堆算力。
2024–2025 年一个明显趋势是：**推理时也要开始算账了。**

### 3.1 概念：test‑time compute 是什么？

Snell 等人在 2024 年的 *Scaling LLM Test‑Time Compute Optimally can be More Effective than Scaling Model Parameters* 里系统性讨论了这件事：([arXiv][8])

* 给定一个 **额外的推理算力预算**，
* 是 **把模型变大** 更划算，还是用小一点的模型 **多算几次 / 用 verifier 精炼** 更划算？
* 他们在数学推理任务上发现：

  * 适当地用 verifier + search，可以在 **相同 FLOPs 下干翻 14x 更大的模型**。

直觉：

> 「同一颗脑子，想久一点、反复检查，比直接换一个更大的脑子，有时更划算。」

### 3.2 工程版例子：o1 / o3 / DeepSeek‑R1

几条典型路线：

1. **OpenAI o1：RL + 自发 CoT**

   * o1 通过强化学习，让模型在回答前自动生成内部推理链（think first, answer later），属于典型的 test‑time compute scaling。([OpenAI][9])

2. **OpenAI o3：多档推理深度**

   * o3 在 ARC‑AGI 基准上的高算力模式能到 ~87.5%，低算力模式只有七十多。([ARC Prize][10])
   * 从「低」到「高」的推理等级，本质就是 **用更多 test‑time compute 换精度**。

3. **DeepSeek‑R1：纯 RL 激励推理**

   * DeepSeek‑R1 通过大规模强化学习把推理能力硬打出来，
   * 在 AIME 这类数学竞赛题上，成绩接近甚至匹配 o1 级别，
   * 展示了「**可以用 RL + test‑time CoT 复刻 reasoning 型闭源模型**」。([arXiv][11])

综合起来，现在你可以把 scaling 空间理解成三维：

1. **预训练 compute**（N、D、C）
2. **后训练 compute**（RLHF、DPO、RL‑reasoning 等）
3. **推理时 compute**（CoT、多样本、verifier、多轮 agent 等）

其中第 3 维，是 2024–2025 年才真正被系统玩起来的。

---

## 4. 现代架构里的另一个主角：MoE & 激活参数

说完「算多大」「算多久」，还差一个问题：**每一步到底算多少参数？**

这就轮到 **Mixture‑of‑Experts（MoE）** 出场了。

* Dense 模型：每一步都把所有层、所有通道算一遍——很贵；
* MoE：在某些层中放一堆「专家」，每个 token **只路由到少数几个专家**，

  * **总参数很大**（容量很强），
  * 但 **每次前向只激活其中一小部分参数**（激活参数量要小得多）。

所以现在看一个模型的规模，要区分：

* **总参数量**：理论最大知识容量；
* **激活参数量**：一次推理真正参与计算的那块——决定大部分推理成本。

接下来我们就用几款 2025 年的代表模型，串一下前面的理论。

---

## 5. 几个 2025 年底的 SOTA 模型：各自代表哪种「解法」

### 5.1 Gemini 3 Pro：多模态 + 深度 reasoning 的闭源路线

**定位：** Google DeepMind 最新一代旗舰闭源模型，用于 Gemini App / 搜索 / Antigravity 等全家桶。([Axios][12])

**关键规格（按官方文档和开发者指南）：**([Google Cloud Documentation][13])

* **型号**：`gemini-3-pro-preview`
* **上下文**：

  * 约 **1M token 输入 / 64K 输出** 的上下文窗口
* **模态**：文本、图片、音频、视频、PDF、代码仓库等多模态输入；
* **知识截止**：约 2025‑01；
* **推理控制**：支持 `thinking_level` 等参数，显式调节推理深度，某种意义上是把 **test‑time compute 变成一个产品参数**。

可以把它看成是：

> Dense 大模型 + 很长的上下文 + 深度 test‑time reasoning + 扎实的多模态工程。

在 scaling 视角下，Gemini 3 Pro 做了两件事：

1. **N / D / C：继续在「大模型 + 大数据」线上卷**；
2. **Test‑time：给你一个「推理档位」旋钮，让你在「贵但更准」和「便宜但够用」之间自己选。**

---

### 5.2 GLM‑4.6：355B / 32B 激活的开源 MoE 代表

**开发方：** 智谱 AI（Zhipu / Z.AI）
**状态：** 权重开源（在 Hugging Face 和自家平台都能拿到），可商用。([Z.ai][14])

**核心规格：**

* **架构**：MoE
* **参数规模**：

  * 总参数约 **355–357B**，
  * 每次推理激活约 **32B 参数**；([Z.ai][14])
* **上下文**：从 4.5 的 128K 提升到 **200K token**；([Z.ai][14])
* **定位**：更强的代码能力、更强推理、更复杂 agent 工程（多步工具调用、长任务）。

它很典型地体现了 MoE 的 trade‑off：

> **「看起来是 355B 的怪物，实际上每步只算 32B」** ——
> 也就是用 **大容量（总参数）+ 小激活参数量**，在「能力」和「推理成本」之间拿一个中间值。

在 scaling laws 视角下，可以认为：

* N 的一部分拿去做「一堆专家」的容量；
* 每次前向只消费其中一条「子网络」的算力；
* 让「预训练能用更多参数扩展 capacity」，但部署时又不像 dense 355B 那么离谱。

---

### 5.3 MiniMax‑M2：230B / 10B 激活，专攻 coding & agent

**开发方：** MiniMax
**状态：** 权重开源（Apache‑2.0），可自由二次开发 / 商用。([NVIDIA Build][15])

**核心规格（来自模型卡与各平台介绍）：**([NVIDIA Build][15])

* **架构**：MoE
* **规模**：

  * 总参数 **230B**
  * 每次推理 **10B 激活参数**
* **上下文**：

  * 大约 **204K 输入 / 131K 输出** 的超长上下文窗口
* **场景**：

  * 强调 **code + agentic workflows**：

    * 编译–运行–调试循环
    * 浏览器检索 + 引用
    * 多工具管线

它基本代表了一条极端路线：

> **「我不是通用最强，但我要在「10B 激活 + MoE」的预算里，把编码 / agent 体验打到极致。」**

这就是典型的 **场景特化 scaling**：

* 数据分布：更多 code / tool‑use 相关数据；
* 后训练：更聚焦在对话式编程、agent 任务；
* 推理：10B 激活意味着你可以在同一预算上跑更多并发、更长链路。

---

### 5.4 Qwen3‑Max / Qwen3‑Max‑Thinking：1T+ 级 MoE、262K 上下文

**开发方：** 阿里巴巴 / 通义千问团队 Qwen
**状态：** API 闭源，少数变体有 open‑weights；整体对标 GPT‑5 / Claude‑4 等闭源前沿。([qwen.ai][16])

**关键点：**

* **规模**：

  * 官方公开为 **1T+ 参数** 的 MoE 级别（trillion‑parameter MoE），是目前公开信息中参数最多的一档之一；([qwen.ai][16])
* **上下文**：

  * 官方与第三方资料普遍给出 **约 256K–262K token 上下文**（输入约 258K，输出 32K–65K 视平台而定）。([Venturebeat][17])
* **思维模式**：

  * Qwen3 系列支持在「**thinking 模式**」和「**non‑thinking 模式**」之间切换；([Hugging Face][18])
  * Max‑Thinking 版本在 AIME25 等数学 / 竞赛类推理基准上做到接近甚至 100% 的准确率。([DEV Community][19])

Qwen3‑Max 是非常典型的「**把三维 scaling 一起拉满**」：

1. **预训练**：1T+ 参数 + 数十万级上下文 + 海量 pretraining tokens（官方博客提到 36T 级别预训练数据）。([DEV Community][19])
2. **后训练**：thinking 版本通过强化推理、显式 `<think>` tracing，把 reasoning 训练成产品能力。([qwen.ai][16])
3. **test‑time compute**：thinking 模式下自动拉长推理链条，相当于给每个困难问题多砸一部分算力。

---

### 5.5 Llama 3：小模型长训路线的代表

虽然你问题里没直接点名 Llama 3，但它非常适合拿来辅助理解 scaling 策略。

* **Llama 3 8B**：

  * 参数：8B
  * 预训练数据：**15T+ tokens**（官方模型卡）([Hugging Face][4])
* **Llama 3 最大版本**：405B dense 模型，支持到 128K 上下文（技术报告）。([arXiv][20])

它的意义主要在于：

* 给小模型塞了极大量的干净数据，让它在边缘设备 / 中小企业的推理场景里非常有性价比；
* 佐证了前文说的「**工业界为了推理成本，主动偏离 Chinchilla 点，选择小模型长训**」。([GitHub][21])

---

## 6. 怎么用这些理论来「选模型 / 设计模型」？

如果你不是在写论文，而是真要落地产品，可以把脑子里的问题改成这几个：

### 6.1 先问：**我在意的是训练成本、推理成本，还是极致效果？**

* **训练只做一次，推理会做很多次**：

  * 如果你是云服务商 / 大模型平台，推理成本几乎永远更重要；
  * 如果你是做内部模型（只给几个关键服务用），可以更忠于 compute‑optimal 训练。

**原则：**

* 对内用的小模型，可以更接近 Chinchilla 建议的 compute‑optimal 点；([arXiv][3])
* 面向海量请求的 API 型模型，通常会：

  * **MoE 化**（GLM‑4.6、MiniMax‑M2、Qwen3‑Max）；
  * 或者保持相对「小」但喂超多数据（Llama 3 8B）。

### 6.2 再问：**我更需要「广谱能力」还是「某类任务极致」？**

* 如果你要做「通用助手」：

  * 比如 Gemini 3 Pro / Qwen3‑Max 这类「全家桶」，会追求多模态 + 长上下文 + agent 能力的整体最优；
* 如果你要做「强 code / 强 agent」：

  * MiniMax‑M2、GLM‑4.6、Qwen3‑Coder 这类专向训练的模型往往更合适。([Z.ai][14])

**Scaling 视角下：**

* 场景特化 = 在 loss 中给某些任务更大的权重 + 专门的数据分布 + 对应的对齐过程；
* 同样的 N、D、C，对不同任务的「相对能力」可以差非常多。

### 6.3 最后问：**我愿意为「多想一会儿」付多少钱？**

以 ARC‑AGI 上的 o3 为例：([ARC Prize][10])

* 同一个模型，从「低 compute」到「高 compute」，
* 性能可以从 70% 出头拉到 ~87.5%，
* 相当于在 test‑time compute 上加了一个 100x+ 的倍率。

同样的思想正在被别的团队用：

* DeepSeek‑R1 用 RL + 长 CoT，在数学推理上接近 / 对齐 o1。([arXiv][11])
* Snell 的工作说明，**在部分任务上，小模型 + 多推理，有时比直接换大模型更划算**。([arXiv][8])

工程上就变成一句话：

> **「难题」可以通过 test‑time scaling 解决，而不是一上来就换一颗更贵的大脑。**

---

## 7. 小结：2025 版 Scaling Laws 心智模型

把上面的东西收拢成几个可用的 bullet，方便你在文章结尾当 TL;DR：

1. **Scaling laws 的底层结论没变**：

   * loss 随 N / D / C 近似幂律下降，是可以算账的，而不是玄学。([arXiv][1])

2. **Chinchilla 改变了大家看问题的方式**：

   * 在给定训练 FLOPs 下，**参数和数据应该等比扩展**；
   * 但产品落地时，经常会为了便宜推理，刻意选择「小模型 + 大数据」偏离 compute‑optimal 点。([arXiv][3])

3. **过参数化不是纯浪费**：

   * Bubeck 的「鲁棒性定律」说明：想要又拟合又鲁棒，需要显著过参数化；
   * 这也是现代大模型「参数远多于样本数」的一个严肃理由。([arXiv][5])

4. **涌现更像「指标 / 阈值」问题，而不是魔法开窍**：

   * 总体能力在 scale 上是平滑的；
   * 我们用的某些 0/1 指标会让曲线看起来像「突然开悟」。([arXiv][6])

5. **Test‑time compute 是 2024–2025 年真正新的 scaling 维度**：

   * o1 / o3 / DeepSeek‑R1 / 各种 verifier + search 证明：

     * 用更多推理算力，可以在某些任务上超越简单堆参数；([OpenAI][9])

6. **MoE + 小激活参数是当下主流工程解法**：

   * GLM‑4.6（355B / 32B）、MiniMax‑M2（230B / 10B）、Qwen3‑Max（1T+ / 十几二十 B 激活），
   * 都是在「容量爆炸」和「推理成本」之间做出的折中。([Z.ai][14])

7. **如果你要写给读者看的文章，可以反复强调一句话**：

> **Scaling laws 是工程师拿来算账、规划路线的工具，
> 而不是「看到大模型就上头」的信仰。**

---

## 参考资料（带链接，方便你直接复制）

> *下面只列出文中实际提到或隐含引用的核心资料，不是全网综述。*

### 理论与 Scaling Laws

* Kaplan et al., *Scaling Laws for Neural Language Models*, 2020.
  [https://arxiv.org/abs/2001.08361](https://arxiv.org/abs/2001.08361) ([arXiv][1])

* Hoffmann et al., *Training Compute-Optimal Large Language Models (Chinchilla)*, 2022.
  [https://arxiv.org/abs/2203.15556](https://arxiv.org/abs/2203.15556) ([arXiv][3])

* Sébastien Bubeck & Mark Sellke, *A Universal Law of Robustness via Isoperimetry*, NeurIPS 2021.
  [https://arxiv.org/abs/2105.12806](https://arxiv.org/abs/2105.12806) ([arXiv][5])

* Snell et al., *Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters*, 2024.
  [https://arxiv.org/abs/2408.03314](https://arxiv.org/abs/2408.03314) ([arXiv][8])

* Adam Casson, *Transformer FLOPs*（介绍 `C ≈ 6 N D` 的近似公式）
  [https://www.adamcasson.com/posts/transformer-flops](https://www.adamcasson.com/posts/transformer-flops) ([Adam Casson][2])

### 涌现能力与其争论

* Wei et al., *Emergent Abilities of Large Language Models*, 2022.
  [https://arxiv.org/abs/2206.07682](https://arxiv.org/abs/2206.07682) ([arXiv][6])

* Schaeffer et al., *Are Emergent Abilities of Large Language Models a Mirage?*, NeurIPS 2023 Outstanding Paper.
  [https://arxiv.org/abs/2304.15004](https://arxiv.org/abs/2304.15004) ([arXiv][7])

### 代表模型文档 / 博客

**Gemini 3 Pro**

* Google Cloud, *Gemini 3 Pro – Vertex AI 文档*（1M / 64K 上下文等规格）
  [https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-pro](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-pro) ([Google Cloud Documentation][13])

* Google AI, *Gemini 3 Developer Guide*
  [https://ai.google.dev/gemini-api/docs/gemini-3](https://ai.google.dev/gemini-api/docs/gemini-3) ([Google AI for Developers][22])

**GLM‑4.6**

* Zhipu AI, *GLM‑4.6: Advanced Agentic, Reasoning and Coding Capabilities*（官方博客）
  [https://z.ai/blog/glm-4.6](https://z.ai/blog/glm-4.6) ([Z.ai][14])

* Hugging Face, *zai-org/GLM-4.6*（模型卡，200K 上下文 & MoE 描述）
  [https://huggingface.co/zai-org/GLM-4.6](https://huggingface.co/zai-org/GLM-4.6) ([Hugging Face][23])

**MiniMax‑M2**

* NVIDIA NIM Model Card, *minimaxai/minimax-m2*
  [https://build.nvidia.com/minimaxai/minimax-m2/modelcard](https://build.nvidia.com/minimaxai/minimax-m2/modelcard) ([NVIDIA Build][15])

* Hugging Face, *unsloth/MiniMax-M2*（230B 总参 / 10B 激活等）
  [https://huggingface.co/unsloth/MiniMax-M2](https://huggingface.co/unsloth/MiniMax-M2) ([Hugging Face][24])

**Qwen3‑Max 系列**

* Alibaba Cloud / Qwen 团队，*Qwen3-Max: Just Scale it*（官方博客）
  [https://www.alibabacloud.com/blog/qwen3-max-just-scale-it_602621](https://www.alibabacloud.com/blog/qwen3-max-just-scale-it_602621) ([alibabacloud.com][25])

* Reuters, *Alibaba launches Qwen3-Max AI model with more than 1 trillion parameters*
  [https://www.reuters.com/world/china/alibaba-launches-qwen3-max-ai-model-with-more-than-trillion-parameters-2025-09-24/](https://www.reuters.com/world/china/alibaba-launches-qwen3-max-ai-model-with-more-than-trillion-parameters-2025-09-24/) ([Reuters][26])

* Digital Applied, *Qwen Models Guide: 600M to 1 Trillion Parameters*（提到 1T+、262K 上下文、active params 等）
  [https://www.digitalapplied.com/blog/qwen-models-complete-guide](https://www.digitalapplied.com/blog/qwen-models-complete-guide) ([digitalapplied.com][27])

**Llama 3**

* Meta, *Meta-Llama-3-8B* 模型卡（15T+ tokens 预训练）
  [https://huggingface.co/meta-llama/Meta-Llama-3-8B](https://huggingface.co/meta-llama/Meta-Llama-3-8B) ([Hugging Face][4])

* Grattafiori et al., *The Llama 3 Herd of Models*（技术报告）
  [https://arxiv.org/abs/2407.21783](https://arxiv.org/abs/2407.21783) ([arXiv][20])

### 推理模型与 Test‑time Compute 案例

* OpenAI, *Learning to reason with LLMs*（o1 技术介绍：RL + chain-of-thought）
  [https://openai.com/index/learning-to-reason-with-llms/](https://openai.com/index/learning-to-reason-with-llms/) ([OpenAI][9])

* ARC Prize, *Analyzing o3 and o4-mini with ARC-AGI*（o3 在高算力模式下 ~87.5%）
  [https://arcprize.org/blog/analyzing-o3-with-arc-agi](https://arcprize.org/blog/analyzing-o3-with-arc-agi) ([ARC Prize][10])

* DeepSeek, *DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning*
  [https://arxiv.org/abs/2501.12948](https://arxiv.org/abs/2501.12948) ([arXiv][11])

* Charlie Snell et al., *Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters*
  [https://arxiv.org/abs/2408.03314](https://arxiv.org/abs/2408.03314) ([arXiv][8])

---

如果你愿意，我也可以帮你再写一个「极简版」：比如 1500 字以内、只保留核心图景（3 维 scaling + 4 个代表模型），用来发公众号 / 知乎专栏，用这篇长文做「扩展阅读」。

[1]: https://arxiv.org/abs/2001.08361?utm_source=chatgpt.com "Scaling Laws for Neural Language Models"
[2]: https://www.adamcasson.com/posts/transformer-flops?utm_source=chatgpt.com "Transformer FLOPs - Adam Casson"
[3]: https://arxiv.org/abs/2203.15556?utm_source=chatgpt.com "Training Compute-Optimal Large Language Models"
[4]: https://huggingface.co/meta-llama/Meta-Llama-3-8B?utm_source=chatgpt.com "Meta-Llama-3-8B - Hugging Face"
[5]: https://arxiv.org/abs/2105.12806?utm_source=chatgpt.com "A Universal Law of Robustness via Isoperimetry"
[6]: https://arxiv.org/abs/2206.07682?utm_source=chatgpt.com "[2206.07682] Emergent Abilities of Large Language Models"
[7]: https://arxiv.org/abs/2304.15004?utm_source=chatgpt.com "Are Emergent Abilities of Large Language Models a Mirage?"
[8]: https://arxiv.org/abs/2408.03314?utm_source=chatgpt.com "Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters"
[9]: https://openai.com/index/learning-to-reason-with-llms/?utm_source=chatgpt.com "Learning to reason with LLMs - OpenAI"
[10]: https://arcprize.org/blog/analyzing-o3-with-arc-agi?utm_source=chatgpt.com "Analyzing o3 and o4-mini with ARC-AGI"
[11]: https://arxiv.org/html/2501.12948?utm_source=chatgpt.com "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via ..."
[12]: https://www.axios.com/2025/11/18/google-rolls-out-gemini-3-pro-to-power-search-and-app?utm_source=chatgpt.com "Google rolls out Gemini 3 Pro to power search and app"
[13]: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-pro?utm_source=chatgpt.com "Gemini 3 Pro | Generative AI on Vertex AI | Google Cloud Documentation"
[14]: https://z.ai/blog/glm-4.6?utm_source=chatgpt.com "GLM-4.6: Advanced Agentic, Reasoning and Coding Capabilities"
[15]: https://build.nvidia.com/minimaxai/minimax-m2/modelcard?utm_source=chatgpt.com "minimax-m2 Model by Minimaxai | NVIDIA NIM"
[16]: https://qwen.ai/research/?utm_source=chatgpt.com "Qwen"
[17]: https://venturebeat.com/ai/qwen3-max-arrives-in-preview-with-1-trillion-parameters-blazing-fast?utm_source=chatgpt.com "Qwen3-Max arrives in preview with 1 trillion parameters, blazing fast ..."
[18]: https://huggingface.co/Qwen/Qwen3-235B-A22B?utm_source=chatgpt.com "Qwen/Qwen3-235B-A22B · Hugging Face"
[19]: https://dev.to/czmilo/qwen3-max-2025-complete-release-analysis-in-depth-review-of-alibabas-most-powerful-ai-model-3j7l?utm_source=chatgpt.com "Qwen3-Max 2025 Complete Release Analysis: In-Depth Review of Alibaba's ..."
[20]: https://arxiv.org/abs/2407.21783?utm_source=chatgpt.com "[2407.21783] The Llama 3 Herd of Models - arXiv.org"
[21]: https://github.com/meta-llama/llama3/blob/main/MODEL_CARD.md?utm_source=chatgpt.com "llama3/MODEL_CARD.md at main · meta-llama/llama3 · GitHub"
[22]: https://ai.google.dev/gemini-api/docs/gemini-3?utm_source=chatgpt.com "Gemini 3 Developer Guide | Gemini API | Google AI for Developers"
[23]: https://huggingface.co/zai-org/GLM-4.6?utm_source=chatgpt.com "zai-org/GLM-4.6 · Hugging Face"
[24]: https://huggingface.co/unsloth/MiniMax-M2?utm_source=chatgpt.com "unsloth/MiniMax-M2 · Hugging Face"
[25]: https://www.alibabacloud.com/blog/qwen3-max-just-scale-it_602621?utm_source=chatgpt.com "Qwen3-Max: Just Scale it - Alibaba Cloud Community"
[26]: https://www.reuters.com/world/china/alibaba-launches-qwen3-max-ai-model-with-more-than-trillion-parameters-2025-09-24/?utm_source=chatgpt.com "Alibaba launches Qwen3-Max AI model with more than 1 trillion parameters"
[27]: https://www.digitalapplied.com/blog/qwen-models-complete-guide?utm_source=chatgpt.com "Qwen Models Guide: 600M to 1 Trillion Parameters"
