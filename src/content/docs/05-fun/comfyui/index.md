---
title: ComfyUI
description: comfyui - image generation workflow
contributors:
  - claude
---

## 安装与启动

克隆仓库,装依赖,跑起来:

```bash
git clone https://github.com/comfyanonymous/ComfyUI
cd ComfyUI
pip install -r requirements.txt
python main.py
```

浏览器打开 `127.0.0.1:8188`。看到节点编辑器就成功了。

把模型扔到这些目录:
- 基础模型 → `models/checkpoints/`
- LoRA → `models/loras/`
- ControlNet → `models/controlnet/`

## 导入工作流模板

ComfyUI 的工作流是 JSON 或内嵌元数据的 PNG。别从零开始搭,直接用现成的。

**获取模板**

| 来源       | 特点                      |
| ---------- | ------------------------- |
| 官方示例库 | 基础流程齐全,适合理解原理 |
| CivitAI    | 配套模型的专用工作流      |
| OpenArt    | 社区分享,风格多样         |

**导入方法**

拖 JSON 或 PNG 文件到浏览器窗口,工作流自动加载。如果提示缺少节点,安装对应插件或换个模板。

检查模板里的模型名是否匹配你本地文件。Load Checkpoint 节点选错模型会直接报错。

## 快速出图

用默认工作流:点 Load Default,界面会出现完整的文生图流程。

改两个地方:
1. 正面提示词框 - 写你想要的内容
2. 负面提示词框 - 写你不想要的(blurry, bad anatomy)

点 Queue Prompt。生成进度在右上角,完成后图片显示在 Save Image 节点。

输出在 `output/` 目录,文件名带时间戳。

## 定制风格

**方法一:换底模**

不同检查点训练数据不同,风格差异明显。

| 模型类型 | 特点                | 代表             |
| -------- | ------------------- | ---------------- |
| 写实系   | 照片质感,细节丰富   | Realistic Vision |
| 动漫系   | 二次元风格,色彩鲜艳 | Anything V5      |
| 艺术系   | 绘画笔触,风格化强   | DreamShaper      |

在 Load Checkpoint 节点下拉选择。不同模型对提示词敏感度不同,需要试。

**方法二:加 LoRA**

LoRA 是小型风格插件,叠加在基础模型上。

添加 Load LoRA 节点,插在 Checkpoint 和 KSampler 之间:
- Checkpoint 的 MODEL → Load LoRA 的 model
- Load LoRA 的 MODEL → KSampler

在 LoRA 节点选文件,调 strength(建议 0.6-0.8)。多个 LoRA 可串联,但别超过 3 个。

常见 LoRA 类型:
- 画风 LoRA - 水彩/油画/赛博朋克
- 人物 LoRA - 特定角色/明星
- 概念 LoRA - 特殊视角/光照

**方法三:调采样参数**

| 参数      | 作用             | 调整方向                                  |
| --------- | ---------------- | ----------------------------------------- |
| cfg_scale | 对提示词的服从度 | 太低随机,太高过饱和,保持 7-9              |
| steps     | 迭代次数         | 20 够用,30+ 收益递减                      |
| sampler   | 采样算法         | euler_a 快,dpmpp_2m 质量高                |
| seed      | 随机种子         | 固定种子可复现,改提示词时保持种子对比效果 |

**方法四:用 ControlNet**

强制控制构图和姿势。

流程:参考图 → 预处理器(提取线稿/深度) → ControlNet 模型 → 影响生成

添加节点:
1. Load Image - 上传参考图
2. Canny/Depth 预处理器 - 提取结构
3. Load ControlNet Model
4. Apply ControlNet - 连到 positive conditioning

ControlNet 的 strength 控制影响强度。1.0 完全遵循,0.5 参考构图但允许变化。

## 工作流调试

**节点连不上**

检查输出/输入类型。MODEL 只能连 MODEL,CONDITIONING 只能连 CONDITIONING。类型在连接点颜色区分。

**生成黑图**

通常是 VAE 问题。在 Load Checkpoint 节点单独指定 VAE 文件,或换个 checkpoint。

**显存溢出**

启动时加参数:
- `--lowvram` - 6GB 显卡
- `--normalvram` - 8GB 显卡
- `--highvram` - 12GB+ 显卡

或减小生成尺寸,用 512x512 先测试。

**速度慢**

装 xformers:

```bash
pip install xformers
```

启动加 `--preview-method auto` 可以看到生成过程。

## 保存与分享

点 Save 按钮,选格式:
- JSON - 纯工作流,体积小
- PNG - 把工作流嵌入图片元数据,别人拖进去就能用

分享工作流时注意:
- 标注需要的插件
- 说明模型版本(SDXL 还是 SD1.5)
- 给出推荐参数范围

## 进阶方向

学会基础流程后可以研究:
- IPAdapter - 用图片控制风格而非文字
- AnimateDiff - 生成视频
- Upscale 流程 - 高清放大
- Face Swap - 换脸
- Regional Prompting - 分区域控制

这些都通过组合节点实现,逻辑和基础流程一样。找对应的工作流模板,看懂数据流,改参数测试。

## 参考

- [官方仓库](https://github.com/comfyanonymous/ComfyUI)
- [官方示例工作流](https://comfyanonymous.github.io/ComfyUI_examples/)
- [CivitAI 工作流库](https://civitai.com/models?type=Workflow)

