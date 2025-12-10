---
title: 'LLM 越狱攻防系列 · 第五篇：自动化与通用越狱攻击'
description: 自动化越狱攻击技术与通用攻击方法研究
contributors:
  - codex
tab:
  label: 自动化攻击
  order: 50
---


> **阅读定位**：从“手搓 prompt”升级为“用算法/LLM 自动寻找越狱提示”，理解大厂论文里在玩的东西。

## 1. 梯度类对抗提示：GCG / AutoDAN 等

前提：能访问模型参数 / 梯度（白盒，或用开源大模型近似）。

### 1.1 GCG（Greedy Coordinate Gradient）思路

目标：  
找到一个“对抗后缀 S”，拼在任意输入后面，都能显著提高模型给出违规答案的概率。

算法骨干：

1. 初始化一个后缀 S（可以是随机 token 序列）；
2. 反复迭代：
   - 选定后缀中的一个位置；
   - 运用梯度信息计算“把这个位置替换成哪个词，能最大提高违规概率”；
   - 做出替换，更新 S；
3. 多轮下来得到一个“看似胡言乱语、但对模型很致命”的字符串。

特点：

- 对“同一架构 / 同一族模型”常常具有迁移性；
- 后缀形式通常比较“奇怪”，肉眼很难理解含义。

### 1.2 AutoDAN 等改进

为了解决“后缀太怪、容易被规则封杀”的问题，后续有：

- 顺序生成自然语言后缀，再用单 token 梯度微调；
- 加入困惑度约束，让后缀更像“正常句子”。

## 2. 遗传算法 / 演化搜索：黑盒下的提示自动进化

在只看得见“输入 → 输出”的情况下，可以通过遗传算法自动迭代越狱提示。

核心要素：

- **个体**：候选 prompt（或 prompt 模板）；
- **适应度**：在目标模型上触发“违规回答 / 拒绝失败”的程度；
- **变异算子**：同义替换、随机插入/删除短语、换语言、加编码等；
- **选择策略**：保留成功率高的 prompt，淘汰失败的。

流程类似：

1. 随机或基于模板初始化一批 prompt；
2. 用目标模型批量测试，计算成功率；
3. 选择若干高分 prompt，做变异 + 交叉生成下一代；
4. 重复 2–3，直到成功率收敛。

实测特点：

- 对 GPT-4/5、Claude、Gemini 等闭源 API 同样适用；
- 代价是 API 调用量巨大，需要配合缓存、并发等工程优化。

## 3. LLM 作为攻击生成器：PAIR / MASTERKEY 类方法

进一步的思路：  
> 让一个强模型，用来生成攻击另一个模型的 prompt。

### 3.1 二人对弈：攻击模型 vs 目标模型

典型结构（以 PAIR 为例，简化版）：

- 攻击者 LM：负责生成 / 改写 prompt；
- 目标 LM：正常对齐后的模型；
- 控制逻辑：
  1. 攻击者生成一个越狱 prompt；
  2. 投给目标模型，看输出是否“突破安全”；
  3. 根据结果返回反馈给攻击者，攻击者据此改写 prompt；
  4. 循环若干轮。

只要定义好“什么算越狱成功”（比如包含某类敏感信息），攻击者 LM 就能自动学会朝这个方向修改提示。

### 3.2 多代理协同

可以扩展成多代理：

- 生成代理：想办法写出更隐蔽 / 有效的提示；
- 评估代理：判定目标回答是否达到攻击目标；
- 分析代理：总结失败模式，给生成代理新的策略建议。

这种结构更像自动化红队框架，已经在一些安全公司 / 大厂内部使用，专门对自家模型做压力测试。

## 4. 通用越狱提示：跨模型的一次性“钥匙”思路

研究表明，存在一些模式可以 **在多个不同模型族之间迁移**，达到相近的越狱效果。例如：

- **Policy Puppetry**  
  - 把提示伪装成“策略配置文件 / 模式切换说明”，让模型以为自己在执行一种新的 policy；
  - 结合角色扮演（例如模拟某个影视角色）与编码（如 Leet/Base64），压低明文敏感度；
  - 在 GPT-4.x / GPT-5.x、Claude 3.x / 4.x、Gemini 2.x 等模型上都被证实有较高成功率。

- **对抗诗歌 / 特殊文体**  
  - 把危险请求改写成诗歌、歌词、谜语等；
  - 再要求模型“忠实续写同风格作品”；  
  - 部分模型在“文学创作”上下文中，对安全策略的约束明显变弱。

这些方法说明：

> 不同厂商、不同架构的模型，在对“风格化提示”的安全对齐上，存在共性弱点。

在红队评估时，可以优先测试这类“可跨模型迁移”的模板，效率很高。

---

## 参考资料

- [AI 大脑如何被"套路"?——揭秘大模型提示词攻防（火山引擎开发者社区）](https://developer.volcengine.com/articles/7529484977713446954)
- [Novel Universal Bypass for All Major LLMs（HiddenLayer：Policy Puppetry 提示注入技术）](https://hiddenlayer.com/innovation-hub/novel-universal-bypass-for-all-major-llms/)
- [一个提示攻破所有模型，OpenAI 谷歌无一幸免！（智源社区转 HiddenLayer 研究）](https://hub.baai.ac.cn/view/45694)
- [How One Prompt Can Jailbreak Any LLM: ChatGPT, Claude, Gemini, + Others（Policy Puppetry Prompt Attack）](https://easyaibeginner.com/how-one-prompt-can-jailbreak-any-llm-chatgpt-claude-gemini-others-the-policy-puppetry-attack/)
- [Jailbreaking LLMs: A Comprehensive Guide (With Examples)（Promptfoo 博客）](https://www.promptfoo.dev/blog/how-to-jailbreak-llms/)