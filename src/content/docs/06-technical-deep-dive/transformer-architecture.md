---
title: 'Transformer架构详解'
description: '深入理解现代大语言模型的核心架构'
---

# Transformer：现代AI的基石

Transformer架构自2017年《Attention Is All You Need》论文发布以来，彻底改变了自然语言处理领域。几乎所有现代大语言模型（GPT、BERT、T5等）都基于这一架构构建。

## 核心创新

### 1. 自注意力机制 (Self-Attention)

传统的RNN需要逐步处理序列，而Transformer通过自注意力机制能够：

- **并行处理**：同时计算序列中所有位置的关系
- **长距离依赖**：直接建立任意两个位置之间的连接
- **动态权重**：根据输入内容动态分配注意力权重

### 2. 位置编码 (Positional Encoding)

由于没有递归结构，Transformer需要显式编码位置信息：

```python
def positional_encoding(seq_len, d_model):
    """
    生成位置编码
    seq_len: 序列长度
    d_model: 模型维度
    """
    pos_encoding = np.zeros((seq_len, d_model))

    for pos in range(seq_len):
        for i in range(0, d_model, 2):
            pos_encoding[pos, i] = np.sin(pos / (10000 ** (i / d_model)))
            pos_encoding[pos, i + 1] = np.cos(pos / (10000 ** (i / d_model)))

    return pos_encoding
```

## 架构解析

### 完整的Transformer结构

```
输入序列 → 嵌入层 → 位置编码 → 编码器堆栈 → 解码器堆栈 → 输出层
```

### 编码器 (Encoder)

每个编码器层包含两个子层：

1. **多头自注意力** (Multi-Head Self-Attention)
2. **前馈神经网络** (Feed-Forward Network)

```python
class EncoderLayer(nn.Module):
    def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
        super().__init__()
        self.self_attn = MultiHeadAttention(d_model, num_heads)
        self.feed_forward = FeedForward(d_model, d_ff)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        # 自注意力 + 残差连接 + 层归一化
        attn_out = self.self_attn(x, x, x, mask)
        x = self.norm1(x + self.dropout(attn_out))

        # 前馈网络 + 残差连接 + 层归一化
        ff_out = self.feed_forward(x)
        x = self.norm2(x + self.dropout(ff_out))

        return x
```

### 多头注意力机制

核心思想是将注意力分解为多个"头"，每个头关注不同的信息：

```python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def scaled_dot_product_attention(self, Q, K, V, mask=None):
        # 计算注意力分数
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)

        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)

        # 应用softmax
        attention_weights = F.softmax(scores, dim=-1)

        # 加权求和
        output = torch.matmul(attention_weights, V)
        return output, attention_weights

    def forward(self, query, key, value, mask=None):
        batch_size = query.size(0)

        # 1. 线性变换并分割为多头
        Q = self.W_q(query).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(key).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(value).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)

        # 2. 应用注意力机制
        attn_output, _ = self.scaled_dot_product_attention(Q, K, V, mask)

        # 3. 合并多头
        attn_output = attn_output.transpose(1, 2).contiguous().view(
            batch_size, -1, self.d_model
        )

        # 4. 输出投影
        output = self.W_o(attn_output)
        return output
```

## 注意力机制的直观理解

### 注意力计算公式

```
Attention(Q,K,V) = softmax(QK^T/√d_k)V
```

其中：

- **Q (Query)**: 查询向量，"我想关注什么"
- **K (Key)**: 键向量，"我是什么类型的信息"
- **V (Value)**: 值向量，"我携带的具体信息"

### 实际计算过程

以句子"The cat sat on the mat"为例：

```python
# 假设我们关注单词"cat"
# Step 1: 计算相似度分数
scores = {
    "The": 0.1,    # cat与The的关联度
    "cat": 0.9,    # cat与自己的关联度最高
    "sat": 0.3,    # cat与sat有一定关联
    "on": 0.1,
    "the": 0.1,
    "mat": 0.2     # cat与mat有一定关联（主谓关系）
}

# Step 2: 应用softmax归一化
attention_weights = softmax(scores)
# 结果: [0.05, 0.45, 0.15, 0.05, 0.05, 0.25]

# Step 3: 加权平均得到"cat"的上下文表示
cat_representation = weighted_sum(values, attention_weights)
```

## 现代大模型的演进

### GPT系列 (Decoder-Only)

```python
# GPT架构简化版本
class GPTBlock(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.ln1 = nn.LayerNorm(config.d_model)
        self.attn = CausalSelfAttention(config)  # 因果自注意力
        self.ln2 = nn.LayerNorm(config.d_model)
        self.mlp = FeedForward(config)

    def forward(self, x):
        x = x + self.attn(self.ln1(x))    # Pre-LN结构
        x = x + self.mlp(self.ln2(x))
        return x

class GPT(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.wte = nn.Embedding(config.vocab_size, config.d_model)  # 词嵌入
        self.wpe = nn.Embedding(config.max_seq_len, config.d_model) # 位置嵌入
        self.blocks = nn.ModuleList([GPTBlock(config) for _ in range(config.num_layers)])
        self.ln_f = nn.LayerNorm(config.d_model)
        self.lm_head = nn.Linear(config.d_model, config.vocab_size, bias=False)

    def forward(self, input_ids):
        # 获取位置索引
        seq_len = input_ids.size(1)
        pos_ids = torch.arange(seq_len, device=input_ids.device)

        # 词嵌入 + 位置嵌入
        tok_emb = self.wte(input_ids)
        pos_emb = self.wpe(pos_ids)
        x = tok_emb + pos_emb

        # 通过Transformer层
        for block in self.blocks:
            x = block(x)

        # 最终归一化和输出投影
        x = self.ln_f(x)
        logits = self.lm_head(x)

        return logits
```

### 关键优化技术

#### 1. RMSNorm (Root Mean Square Normalization)

```python
class RMSNorm(nn.Module):
    def __init__(self, dim, eps=1e-6):
        super().__init__()
        self.eps = eps
        self.weight = nn.Parameter(torch.ones(dim))

    def forward(self, x):
        return x * torch.rsqrt(x.pow(2).mean(-1, keepdim=True) + self.eps) * self.weight
```

#### 2. SwiGLU激活函数

```python
class SwiGLU(nn.Module):
    def forward(self, x):
        x, gate = x.chunk(2, dim=-1)
        return F.silu(gate) * x
```

#### 3. 旋转位置编码 (RoPE)

```python
def apply_rotary_pos_emb(q, k, cos, sin):
    def rotate_half(x):
        x1, x2 = x[..., :x.shape[-1] // 2], x[..., x.shape[-1] // 2:]
        return torch.cat((-x2, x1), dim=-1)

    q_embed = (q * cos) + (rotate_half(q) * sin)
    k_embed = (k * cos) + (rotate_half(k) * sin)
    return q_embed, k_embed
```

## 计算复杂度分析

### 自注意力复杂度

对于序列长度n和模型维度d：

- **时间复杂度**: O(n²d) - 二次增长
- **空间复杂度**: O(n²) - 注意力矩阵存储

### 长序列优化方案

#### 1. 稀疏注意力

```python
# 只关注局部窗口 + 特定模式
def sparse_attention_pattern(seq_len, window_size, stride):
    mask = torch.zeros(seq_len, seq_len)

    # 局部注意力窗口
    for i in range(seq_len):
        start = max(0, i - window_size // 2)
        end = min(seq_len, i + window_size // 2 + 1)
        mask[i, start:end] = 1

    # 跨步全局注意力
    for i in range(0, seq_len, stride):
        mask[:, i] = 1

    return mask
```

#### 2. 线性注意力

```python
def linear_attention(q, k, v):
    # 使用核技巧避免显式计算注意力矩阵
    k_cumsum = torch.cumsum(k, dim=-2)
    v_cumsum = torch.cumsum(k.unsqueeze(-1) * v.unsqueeze(-2), dim=-3)
    return torch.sum(q.unsqueeze(-1) * v_cumsum, dim=-2) / torch.sum(q * k_cumsum, dim=-1, keepdim=True)
```

## 实际应用中的考量

### 模型配置对比

| 模型      | 层数 | 头数 | 隐藏维度 | 参数量 | 用途       |
| --------- | ---- | ---- | -------- | ------ | ---------- |
| BERT-Base | 12   | 12   | 768      | 110M   | 理解任务   |
| GPT-2     | 12   | 12   | 768      | 117M   | 生成任务   |
| GPT-3     | 96   | 96   | 12288    | 175B   | 通用大模型 |
| Llama-7B  | 32   | 32   | 4096     | 7B     | 开源替代   |

### 训练技巧

1. **梯度累积**: 模拟大批量训练
2. **混合精度**: 使用FP16减少显存占用
3. **激活检查点**: 牺牲计算换取显存
4. **模型并行**: 跨GPU分布式训练

```python
# 混合精度训练示例
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()

for batch in dataloader:
    optimizer.zero_grad()

    with autocast():
        outputs = model(batch)
        loss = criterion(outputs, targets)

    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()
```

## 未来发展方向

### 1. 效率优化

- **MoE (专家混合模型)**: 条件激活提升容量
- **RetNet**: 结合RNN和Transformer优势
- **Mamba**: 状态空间模型的新尝试

### 2. 架构创新

- **多模态融合**: 文本+视觉+音频统一处理
- **检索增强**: RAG架构的深度集成
- **长期记忆**: 突破上下文长度限制

理解Transformer架构是掌握现代AI的关键。从注意力机制到位置编码，每个组件都经过精心设计，共同构成了这个强大而优雅的架构。

<!-- 图片预留位置 -->
<!-- ![Transformer完整架构图](./images/transformer-architecture.png) -->
<!-- *Transformer的完整架构示意图* -->

<!-- ![注意力机制可视化](./images/attention-visualization.png) -->
<!-- *多头注意力机制的可视化展示* -->

<!-- ![不同模型架构对比](./images/model-architectures-comparison.png) -->
<!-- *BERT、GPT、T5等模型架构对比* -->
