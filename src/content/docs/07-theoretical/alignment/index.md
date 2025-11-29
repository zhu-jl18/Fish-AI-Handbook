---
title: 2025对齐架构解析
description: 从 RLHF 到推理时对齐：基于公开资料梳理 Gemini 3 Pro、GPT‑5.1、DeepSeek V3/R1 等前沿模型的对齐与推理架构
contributors: [codex]
---

## 0. 对齐基础：我们到底在「对齐」什么？

在聊 Gemini 3 Pro、GPT‑5.1 这些前沿模型之前，先把一个容易混淆的问题说清楚：

> 大模型对齐（alignment）到底在对齐什么？

直白一点讲：**对齐 = 让模型的行为更符合人类想要的目标和约束**，而不是单纯「预测互联网上最常见的下一句」。

一般会拆成几类目标：

- **有用（Helpful）**：  
  能听懂指令、完成任务，而不是答非所问。
- **诚实（Honest / Truthful）**：  
  尽量减少胡编乱造（hallucination），在不确定时学会说「不知道」。
- **无害（Harmless / Safe）**：  
  遵守安全规范，不去教人做危险/违法的事。
- **一致性（Consistent / Aligned with spec）**：  
  能稳定遵守系统设定（system prompt / model spec），在长对话和复杂 Agent 里不跑偏。

### 0.1 经典对齐流水线：预训练 + SFT + RLHF

在 2023 年左右，主流的对齐「套路」大致是下面这套：

1. **预训练（Pre-training）**  
   - 大规模无监督/自监督学习：从互联网语料里学习「怎么像人一样说话」。
2. **SFT（Supervised Fine-tuning）监督微调**  
   - 用人工写的高质量「指令 → 回答」样本微调，让模型学会基本的指令跟随和格式。
3. **Reward Model（RM）奖励模型**  
   - 让标注员对多条候选回答打排序（偏好标注），再训练一个 RM 去预测「人更喜欢哪条」。
4. **RLHF（Reinforcement Learning from Human Feedback）强化学习**  
   - 典型做法是 PPO：在 RM 的评分下优化策略，让模型在保持和 SFT 模型相似的前提下，输出更符合人类偏好的回答。

这一套就是教科书里的「SFT + RM + PPO」，很多教材/博客讲的都是这个版本。

### 0.2 经典 RLHF 的痛点

这套老配方当然有用，但在大模型时代，问题也很明显：

- **训练成本高**：  
  PPO 需要额外维护 Critic / Value 网络，显存和计算成本都很大。
- **长推理链路的 credit assignment 很难**：  
  对一整段长 CoT 给一个总分，很难告诉模型「到底是中间哪一步有问题」。
- **过度依赖人类标注**：  
  标注员难以判断数学/代码/复杂推理是否真的正确，只能看整体感觉，容易把模型训练成「会说人话但不一定对」。

于是从 2023 之后，业界开始往两个方向演化：

1. **更高效/更稳定的训练时对齐算法**：  
   如 DPO、SimPO、GRPO、CISPO 等。
2. **更强的推理时对齐（Inference-time Alignment）**：  
   让模型在「回答前」有机会 **先思考、先读规范、先用工具验证**，而不是一上来就生成对用户可见的文本。

后面我们就按这个视角，拆开看 2025 年几家代表性的 SOTA 模型。

---

## 1. 2025：训练时对齐 + 推理时对齐的「双层架构」

先澄清一个容易被说过头的观点：

> 传统的 SFT + RM + RLHF 并没有「过时」，只是 **不再够用**。

现在更接近的共识是：

- **训练时对齐（Train-time Alignment）**  
  依然是主干：预训练 + SFT + 偏好优化 / RL，决定了模型「整体性格」和基础能力。
- **推理时对齐（Inference-time Alignment）**  
  作为新的一层：通过 thinking 模式、reasoning_effort、deliberative alignment、工具调用等机制，让模型在在线推理阶段 **有机会先想清楚、先读安全规范**，再生成最终回答。

从工程角度看，变化大致有三条线：

1. **算法上：从 PPO 向 GRPO / CISPO / SimPO 演进**  
   - **GRPO**：Group Relative Policy Optimization，用 group 内平均 reward 做 baseline，不用单独的 Critic，大幅省显存。  
   - **CISPO**：Clipped Importance Sampling Policy Optimization，裁剪重要性采样权重，专门为长 CoT RL 提升稳定性。  
   - **SimPO / DPO 一类偏好优化**：不用在线 RL，通过对比学习直接从偏好数据学策略。
2. **数据与奖励：从「结果对齐」到「过程对齐」**  
   - Process Reward Model（PRM）对中间推理步骤打分，而不仅看最后答案；  
   - 各种 verifier / judge 模型用来自动评估代码、数学、Agent 轨迹的正确性。
3. **架构与推理：引入 System 2 / Thinking 模式**  
   - 模型可以在「内部」展开较长的思考（不直接展示给用户）；  
   - 在 Agent 场景下，显式支持 `Thought → Tool → Observation → Thought` 的交替结构。

下面我们按厂商拆开讲。

---

## 2. Google Gemini 3 Pro：Thinking Level 与 Thought Signatures

> **说明**：本节分为「已公开」和「推测」两类，方便你在写博客时区分。

### 2.1 Thinking Level & Thought Signatures

- **【已公开】Thinking Level / Deep Thinking 模式**  
  - Gemini 3 暴露了 `thinking_level` 等参数，开发者可以控制模型是否进入「深度思考模式」，让模型在内部耗费更多 token 做推理，然后再给用户可见的答案。  
  - 这是典型的 **推理时对齐 + test-time compute scaling**：难题多想几步，简单问题少想甚至直接跳过内部思考。

- **【已公开】Thought Signatures（思维签名）**  
  - 官方文档里明确提到 Thought Signature：是模型内部推理过程的 **加密表示**，不会以自然语言形式暴露给用户。  
  - 在某些调用模式（尤其是工具/函数调用）下，服务端要求你把上一轮的 Thought Signature 回传，以便模型在后续轮次中 **延续之前的推理状态**。  
  - 这相当于在「上下文」之外，再多了一条隐形的、专门为推理服务的状态通道。

- **【推测】内部可能使用多路径推理与自一致性**  
  - 从学术界已经公开的 Self‑Consistency、Tree‑of‑Thought 等方法看，多路径采样 + 投票/Verifier 是提升推理质量的常见套路。  
  - 很多技术分析推测 Gemini 3 在内部使用了类似思想（例如对多个推理路径做对比/筛选），但具体结构（有没有专门的「Consensus Module」）目前并 **没有官方文档证实**。

### 2.2 代码与沙盒执行

- **【已公开】Python 沙盒执行（Code Execution）**  
  - Gemini 提供了安全隔离的 Python 沙盒，模型可以生成代码、执行、收集 stdout/stderr，再据此修正自己的推理或代码。  
  - 这在产品层面已经可以直接体验到：你让它写个小程序，它会自动跑给你看。

- **【推测】训练时可能利用执行结果作为 Reward 信号**  
  - 研究界已有大量工作用「代码是否跑通 / 单测是否通过」作为 RL 奖励信号。  
  - 但 Google 并没有公开说明 Gemini 3 的 RL 管线是不是直接用线上沙盒结果做 reward，更多是业内根据论文套路做的合理猜测。

---

## 3. OpenAI GPT‑5.1：自适应推理与审慎对齐传统

GPT‑5.1 本身的系统卡还没完全公开，但可以从 OpenAI 的几篇文章里读出一些线索。

### 3.1 已公开：Adaptive Reasoning（自适应推理）

- GPT‑5.1 支持 **自适应的 reasoning_effort**：  
  - 对于简单问题（如算术、常识问答）尽量减少内部推理，直接给出答案；  
  - 对于复杂问题（系统设计、长链路推理）则会花更多 token 先在内部「想一想」。
- 这在产品上已经显性暴露出来：  
  - 有的接口可以选择「开启/关闭思考」，或者调节不同等级的 reasoning_effort；  
  - 在「Thinking」类模型里，可以看到一个简化版本的思考过程（可视化的 CoT 片段）。

### 3.2 高概率延续：Deliberative Alignment 传统（标记为推测）

- OpenAI 在 o1 系列上提出 **Deliberative Alignment（审慎对齐）**：  
  - 把安全规范/Model Spec 写成文本，显式作为输入的一部分；  
  - 让模型在回答前先「读规范→就规范进行内部推理→再生成最终答复」。  
- gpt‑oss 模型卡里也明确说，后训练流程与 o4‑mini 类似：经历了 **高算力 RL 阶段**，目的包括让模型学会在回答前先做 CoT 推理与工具调用。  
- 从时间线和技术路径上看，**业界普遍认为 GPT‑5/5.1 延续了这条对齐路线**，只是在具体实现（使用多大的 PRM、怎么控制 test‑time compute）上还没有公开细节。

在博客里更稳妥的表达是：

> GPT‑5.1 很大概率继承了 o‑series 的 deliberative alignment 思路：在推理时显式考虑安全规范，并通过 Process Reward Model / Verifier 这类工具来优化推理过程，而不仅仅是优化最终答案。

### 3.3 关于「MCTS」的类比（请在文中明确是比喻）

你原文里把 GPT‑5.1 的推理过程类比为「AlphaGo 一样的 MCTS 搜索」，这在直觉上很形象，但需要注意：

- **目前没有官方证据** 表示 GPT‑5.1 内部使用了严格意义上的 MCTS。  
- 更合理的说法是：  
  - 它在困难任务上会投入更多 test‑time compute；  
  - 有可能进行多样化采样 + 验证/筛选；  
  - 这一行为模式 **可以类比** AlphaGo 用更多模拟来搜索更优走法。

---

## 4. DeepSeek V3 / R1：GRPO 与「纯 RL」推理

DeepSeek 这条线因为技术报告写得非常细，所以可以相对大胆地讲。

### 4.1 DeepSeek V3：GRPO + 高效 MoE + MLA

- DeepSeek‑V3 技术报告公开了完整架构：  
  - 671B 参数的 MoE（约 37B 激活）；  
  - Multi-Head Latent Attention (MLA)、多 token 预测等一系列高效设计；  
  - RL 阶段使用 **GRPO** 作为主要优化算法。
- **GRPO（Group Relative Policy Optimization）** 的关键点在于：  
  - 对同一条 prompt 采样一组回答（例如 16/32/64 条）；  
  - 用组内 reward 的平均值/分布做 baseline，而不是训练一个单独的 Critic；  
  - 通过排序和分段函数构造 advantage，再配合 KL 正则控制策略漂移。  
- 这样做的结果是：  
  - 省掉了规模接近 Policy 的 Critic 网络，**显存占用显著降低**；  
  - 在大规模 RL 训练中，显著减轻了工程复杂度。

### 4.2 DeepSeek-R1：RL 驱动推理涌现

- R1 系列在训练策略上更「激进」：  
  - R1‑Zero 几乎是「不靠 SFT，直接从预训练模型用 RL 打造推理能力」；  
  - 在大规模 RL 之后，模型自发涌现出反思、验证等行为，但语言可读性和稳定性一般。  
  - R1 在此基础上补充了 SFT/对齐阶段，让模型在保持强推理能力的同时，更可控、更易用。
- 对齐视角下，DeepSeek 的贡献主要在两点：  
  1. 用 GRPO 等工程化算法，把「高强度 RL」这件事变成了在工业场景可控的事情；  
  2. 展示了「**弱 SFT + 强 RL** 也可以走出一条推理能力很强的路线」，拓宽了传统「重 SFT、轻 RLHF」的范式。

---

## 5. MiniMax M1 / M2：CISPO 与交错式 Agent 推理

MiniMax 的路线比较独特：从一开始就把**软件工程 / Agent 场景**当成第一公民，而不是附带能力。

### 5.1 MiniMax-M1：Lightning Attention + CISPO（已公开）

- M1 论文提出两块核心设计：  
  - **Lightning Attention**：面向长上下文和复杂工具调用优化的注意力机制；  
  - **CISPO（Clipped Importance Sampling Policy Optimization）**：  
    - 不是「Constructive Identity Preference Optimization」，而是一个 **裁剪重要性采样权重的策略优化算法**；  
    - 重点是解决长 CoT RL 中，off‑policy / replay 造成的重要性权重爆炸问题；  
    - 相比 PPO/GRPO，CISPO 更适合在有大量 replay / 轨迹重用时保持训练稳定。
- M1 的 RL 数据里包含了大量：  
  - 带 **sandbox 执行** 的代码任务；  
  - 多步工具调用 + 搜索任务；  
  - 长轨迹 Agent 场景。  
  这使得 M1 在真实软件工程和多工具 Agent 上有比较强的对齐表现。

### 5.2 MiniMax-M2：面向 Agent 的开源模型

- M2 可以看作是把 M1 的训练经验迁移到一个 **8B 级开源模型** 上，主打：  
  - 高 TPS、低成本；  
  - 原生支持工具使用、搜索、代码执行；  
  - 对长任务和多轮对话友好。
- 在 Agent 轨迹层面，M2 的训练数据/示例基本都遵循下面的模式：

```text
Thought -> Action (Tool Call) -> Observation -> Next Thought -> ...
```

这是我们可以称为 **Interleaved Thinking（交错式思维）** 的范式：模型不是先一次性想完所有步骤，而是在执行过程中边做边想、边观察边修正。

> 注意：「Interleaved Thinking」更像是对 Agent 轨迹模式的命名，而 **不是** CISPO 的正式定义。

---

## 6. GLM‑4.6：多阶段后训练 + Agent 能力强化

### 6.1 GLM-4.5/4.6 的已公开信息

* GLM‑4.5 技术报告公开了多阶段训练流程：

  * 大规模预训练 + 指令微调；
  * 大量代码、数学、Agent 相关数据；
  * RLHF / 偏好优化用于进一步提升对齐和安全性。
* 在此基础上，GLM‑4.6 的主要变化包括：

  * 上下文扩展到 200K；
  * 更强调 Agent 能力（多工具调用、多 Agent 协作等）；
  * token 使用效率提升（同等任务更省 token）。

### 6.2 偏好优化与风格对齐（偏保守地说）

对 GLM‑4.6 对齐细节，官方没有给出像 DeepSeek 那样的数学定义，但从公开材料和产品表现看，大致可以推断：

* 继续使用 RLHF / preference optimization 来强化：

  * 工具使用、检索增强任务；
  * 角色扮演、风格控制、情绪表达等场景。
* 很可能在训练过程中多次迭代「采样日志 → 过滤 → 再训练」这样的闭环，而不是强意义上的「实时在线学习」。

在博客里可以这样描述比较稳妥：

> GLM‑4.6 更像是在 GLM‑4.5 的 RLHF / 偏好优化框架上，持续迭代 post‑training，而不是通过用户点赞/重试直接做在线更新。

---

## 7. 总结：如果你现在要抄一套 2025 年的对齐技术栈

最后给一个工程视角的「抄作业清单」，方便你落地自己的模型：

1. **算法层：从 PPO 进化到更高效的偏好优化 / RL**

   * 追求简单 + 稳定 → 用 **SimPO / DPO** 一类离线偏好优化，减少在线 RL 工作量。
   * 追求极限推理能力 → 考虑 **GRPO / CISPO**，节省 Critic 显存、提高 replay 利用率，适合大规模 RL。
2. **数据与奖励：从 Outcome 到 Process**

   * 不只采集「哪条回答更好」，还要采集「哪一段推理更好」：

     * 用 PRM 对中间 CoT 步骤打分；
     * 用 verifier / judge 模型自动评估数学、代码、Agent 轨迹。
   * 在代码和数学任务中，尽量让「执行结果」「单测通过率」参与到 reward 中。
3. **推理时对齐：给模型「思考时间」和「读规范的机会」**

   * 暴露 `thinking_level` / `reasoning_effort` 等接口，让模型在复杂任务上有更多 test‑time compute；
   * 结合类似 Thought Signatures / 内部 state 的机制，在多轮对话与工具调用间保持一致的推理状态；
   * 参考 deliberative alignment，让模型在回答前显式考虑安全规范 / Model Spec，而不是靠一堆硬规则拦截输出。
4. **Agent 训练：交错式思维 + 工具闭环**

   * 用 `Thought → Tool → Observation → Thought` 这种轨迹去做 SFT / RL / 偏好优化；
   * 在长链路任务上，故意构造需要多次工具调用、反思与修正的任务，让模型习惯「边做边想」而不是只会一条直线 CoT。

最后用一句话收尾：

> 2025 年的对齐，不再只是「训一个不会说坏话的模型」，而是 **在训练时和推理时两层，同时教模型「怎么想」和「守什么规则」**。



---

## 参考来源（给你整理成博客引用用）

> 下面这一节是给你查证和加链接用的，不一定要原样贴进博客，可以按你自己的引用风格改写。

1. **DeepSeek‑V3 Technical Report** (2024), DeepSeek AI.  
   描述了 DeepSeek‑V3 的 MoE 架构、MLA、多 token 预测以及在 RL 阶段使用 GRPO 等细节。  

2. **DeepSeek‑R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning** (2025), DeepSeek AI.  
   介绍了 R1‑Zero 及 R1 的纯 RL / 强 RL 训练范式，以及在数学与推理任务上的表现。  

3. **MiniMax‑M1: A Model for Agentic Software Engineering** (2024), MiniMax.  
   提出 Lightning Attention 与 CISPO（Clipped Importance Sampling Policy Optimization），并详细讨论在软件工程 / Agent 场景上的 RL 设计。  

4. **OpenAI – Deliberative Alignment of Language Models**（2024, blog & paper）.  
   系统性介绍了 deliberative alignment 概念：让模型在回答前显式阅读 Model Spec 并围绕其进行推理，用于提升安全性与越狱鲁棒性。  

5. **OpenAI – Let’s Verify Step by Step** (Lightman et al., 2023).  
   提出了 PRM800K 和 Process Reward Model，用逐步验证来提升 CoT 推理质量，是后续 reasoning RL 和 PRM 研究的重要基础。  

6. **Rafailov et al. – Direct Preference Optimization: Your Language Model is Secretly a Reward Model** (NeurIPS 2023).  
   提出 DPO，将偏好优化转化为对数几率目标上的直接优化，避免在线 RL。  

7. **Meng et al. – SimPO: Simple Preference Optimization with a Reference-Free Reward** (2024).  
   提出 SimPO，在不需要 reference 模型的情况下实现简单但有效的偏好优化。  

8. **Wang et al. – Self‑Consistency Improves Chain‑of‑Thought Reasoning in Language Models** (ICLR 2023).  
   证明了通过多样化采样 + 投票（self‑consistency）可以显著提升 CoT 推理质量，为后来的多路径推理/共识机制提供了重要启发。  

9. **Google Gemini 3 / Gemini API 文档**（2024–2025）  
   包括关于 Thinking Level、Thought Signatures、Code Execution 等接口与概念的描述，是理解 Gemini 3 推理时对齐的主要官方资料来源。  

10. **OpenAI – GPT‑5.1 系列产品说明 / Dev Day 文档**（2025）  
    介绍了 GPT‑5.1 的 adaptive reasoning 模式、reasoning_effort 接口，以及和 o‑series 一脉相承的推理能力优化方向。  

11. **Zhipu AI – GLM‑4.5 / GLM‑4.6 技术白皮书与博客**（2024–2025）  
    公开了 GLM‑4.5/4.6 的多阶段训练策略、RLHF / 偏好优化框架，以及 200K 上下文和 Agent 能力增强的相关细节。  

