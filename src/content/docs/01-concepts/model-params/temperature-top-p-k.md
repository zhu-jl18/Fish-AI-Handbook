---
title: Model Parameters - Temperature+Top-P/K
description: Deep dive into sampling parameters - temperature, top-p, and top-k
contributors:
  - claude
  - codex
tab:
  label: Temperature+Top-P/K
  order: 20
---

## Temperature

Temperature 是 softmax 函数中的缩放参数，控制模型输出的随机性。公式如下：

$$P(x_i) = \frac{e^{z_i/T}}{\sum_j e^{z_j/T}}$$

其中 $T$ 是 temperature，$z_i$ 是第 $i$ 个候选 token 的 logit（模型输出的原始分数）。$T$ 越小，概率分布越陡峭（接近确定性）；$T$ 越大，概率分布越平缓（更随机）。注意无论 $T$ 如何变化，logit 最大的 token 概率永远最大，softmax 是单调函数。

假设模型预测下一个词时，4 个候选 token 的 logits 为：the=4.0、a=2.0、an=1.0、that=0.5。不同 temperature 下的概率分布对比：

| Temperature | P("the") | P("a") | P("an") | P("that") | 效果                       |
| ----------- | -------- | ------ | ------- | --------- | -------------------------- |
| 0.5         | 97.9%    | 1.8%   | 0.2%    | 0.1%      | 接近确定性，98% 输出 "the" |
| 1.0         | 82.3%    | 11.1%  | 4.1%    | 2.5%      | 原始分布，"the" 占主导     |
| 2.0         | 56.7%    | 20.9%  | 12.7%   | 9.8%      | 分布平缓，其他选项经常出现 |

### 为什么 temperature 影响随机性？

关键在于采样方式。$T \approx 0$ 时使用 greedy sampling（直接选概率最大的），每次都输出同一个词。$T > 0$ 时使用 random sampling（按概率随机抽取），概率分布相当于"转盘面积"：$T=0.5$ 时 "the" 占 98% 面积，转 100 次约 98 次中它；$T=2.0$ 时 "the" 只占 57% 面积，其他词（21%、13%、10%）经常被抽中。

举个例子，问模型 "The weather is ___"，运行 10 次：

```
T=0.5 → nice, nice, nice, nice, good, nice, nice, nice, nice, nice
T=2.0 → nice, good, terrible, nice, pleasant, awful, nice, wonderful, bad, nice
```

虽然 "nice" 概率最高，但 $T=2.0$ 时其他词概率也不低，随机采样让输出更多样。

### 实际使用建议

范围通常 0-2，部分模型 0-1：

| Temperature | 适用场景                              |
| ----------- | ------------------------------------- |
| 0           | 写代码/翻译/总结 → 要确定性，别瞎创造 |
| 0.7-1.2     | 写诗/brainstorming → 需要点创造力     |
| 1           | 通用对话 → 平衡确定性与多样性         |
| 2           | 基本别用 → 输出质量崩坏               |

---

## Top-P & Top-K

这两个是采样策略，在 temperature 调整概率分布后，进一步裁剪候选集。**Top-K** 只保留概率最高的 K 个 token；**Top-P**（nucleus sampling）按概率从高到低累加，达到 P 就截断后面的 token。

假设 temperature 处理后得到 5 个候选词及其概率：brilliant=40%、good=30%、nice=20%、okay=7%、bad=3%。

| 策略   | 参数  | 保留候选                    | 采样池                                                |
| ------ | ----- | --------------------------- | ----------------------------------------------------- |
| Top-K  | K=3   | brilliant, good, nice       | 只从这 3 个里抽（重新归一化后概率变为 44%, 33%, 22%） |
| Top-P  | P=0.9 | brilliant, good, nice, okay | 累积概率 40%+30%+20%+7%=97% > 90%，停止               |
| 无限制 | -     | 全部 5 个                   | bad (3%) 也有机会被抽中                               |

### Top-K 的问题

固定数量太死板。如果最高概率是 95%，剩下 4 个加起来才 5%，硬要保留 K=5 个没意义；反之如果前 10 个概率都差不多，K=3 会错过好选项。

### Top-P 更聪明

动态调整。概率集中时（95%+3%+1%+...）只保留 1-2 个；概率分散时（20%+18%+15%+...）保留更多。OpenAI 的 Chat/Responses API（参考 Azure OpenAI 2024-10-21 规范）只开放 top_p，不开放 top_k；Anthropic 的 Claude Sonnet 4.5 等模型依然提供 `top_k`，但被标记为"高阶用法"，不熟悉勿乱调。

### 差异示例

**场景 1**：问模型 "Python is a ___ language"，候选概率分布为：programming=85%、scripting=8%、popular=4%、dynamic=2%、interpreted=1%。

```
Top-K=2  → 只能从 programming/scripting 里选 → 输出单调
Top-P=0.9 → programming 85% 未达标，加 scripting 93% > 90% → 保留这 2 个
Top-P=0.99 → 需要累加到 programming+scripting+popular+dynamic=99% → 保留 4 个
```

**场景 2**：概率分散场景。"The movie was ___"，候选为：great=25%、good=22%、amazing=20%、terrible=18%、okay=15%。

```
Top-K=2  → 只保留 great/good，丢掉 amazing/terrible → 限制太死
Top-P=0.9 → 25%+22%+20%+18%=85% 未达标，加 okay=100% → 保留全部 5 个
```

### 实际使用建议

| 参数  | 推荐值               | 原因                                                         |
| ----- | -------------------- | ------------------------------------------------------------ |
| Top-P | 1.0（默认）          | 让 temperature 全权控制，符合 OpenAI"只调其一"的官方建议     |
| Top-K | Provider 决定        | OpenAI 不支持，Anthropic/部分开源推理模型支持，调之前先查文档 |
| 组合  | top_p=0.9 + temp=0.7 | 只有在模型/业务需要额外发散度时再联调，否则保持默认即可     |

99% 情况下用默认值就行，别瞎折腾。

---

## 三者关系

采样流程：**Temperature → Top-P/Top-K → Random Sampling**

1. **Temperature** 先调整概率分布的形状（陡峭 vs 平缓）
2. **Top-P/Top-K** 再裁剪候选集（留哪些 token）
3. **Random Sampling** 最后按概率随机抽取

### 参数组合的实际效果

假设原始 logits：amazing=5.0、good=4.0、nice=3.0、okay=1.0、bad=0.5

| Temperature | Top-P | Top-K | 保留候选                | 最终效果                           |
| ----------- | ----- | ----- | ----------------------- | ---------------------------------- |
| 0.5         | 1.0   | -     | amazing (99%+)          | 几乎总是输出 amazing，极度确定性   |
| 1.0         | 0.9   | -     | amazing, good, nice     | 从前 3 个里选，平衡确定性与多样性  |
| 1.5         | 0.9   | -     | amazing, good, nice     | 概率更平缓，但候选集相同           |
| 1.0         | 1.0   | 3     | amazing, good, nice     | 与 top_p=0.9 类似，但阈值是固定数量 |
| 2.0         | 1.0   | -     | 全部 5 个               | 高随机性，可能输出 bad             |

### 调参陷阱

- **同时调多个参数**：temperature + top_p + top_k 一起调 → 效果难以预测，debugging 地狱
- **为了"随机"而调高**：temperature=2.0 + top_p=1.0 → 输出质量崩坏，为了不重复而瞎编
- **误解 top_k 作用**：以为 top_k 能提高质量 → 实际只是硬性截断，不如 top_p 智能

### 推荐策略

1. **先调 temperature**：0 = 确定性，0.7-1.2 = 创意，基本够用
2. **top_p 默认 1.0**：除非有明确需求（如强制多样性），否则别动
3. **top_k 别碰**：除非你的 provider 文档明确推荐，或者你在做研究

**记住**：模型输出质量 90% 靠 prompt 设计，9% 靠选对模型，1% 靠调参。别本末倒置。
