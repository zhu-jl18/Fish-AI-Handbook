const id = "07-fun/ai-drawing.md";
						const collection = "docs";
						const slug = "07-fun/ai-drawing";
						const body = "\r\n## 选择模型\r\n\r\n常见模型：\r\n- Stable Diffusion 系列（SD1.5/SDXL）\r\n- Flux、Playground、DALL·E（云端）\r\n\r\n本地推荐：Stable Diffusion + ComfyUI（或 Automatic1111）。\r\n\r\n## 基本概念\r\n\r\n- **Prompt（正向提示）**：你想要的元素与风格。\r\n- **Negative Prompt（反向提示）**：你不想要的元素。\r\n- **CFG / Guidance**：文本到图像的严格程度。\r\n- **Steps**：采样步数，步数越高越精细但更慢。\r\n- **Seed**：随机种子，可复现结果。\r\n\r\n## 提示词结构模板\r\n\r\n```\r\n主体 + 场景 + 风格 + 镜头 + 光影 + 细节 + 画幅\r\n```\r\n\r\n例子：\r\n```\r\nA cyberpunk street at night, neon signs, rainy, reflective ground,\r\nwide-angle lens, cinematic lighting, highly detailed, 4k, masterpiece\r\n```\r\n\r\n## 负面提示词模板\r\n\r\n```\r\nlow quality, blurry, extra fingers, bad anatomy, watermark, jpeg artifacts\r\n```\r\n\r\n## 基础参数建议（SDXL）\r\n\r\n- 分辨率：1024×1024 起\r\n- Steps：25–40\r\n- CFG：5–7\r\n- Sampler：DPM++ 2M Karras（或 Euler a）\r\n\r\n## 进阶：控制与修复\r\n\r\n- ControlNet：姿态、线稿、深度图控制结构。\r\n- Inpainting/Outpainting：局部修复与扩图。\r\n- LoRA：风格/人物微调模型，少量样本快速收敛。\r\n\r\n## 实操建议\r\n\r\n- 先用低分辨率快速迭代，再放大重绘。\r\n- 一次只改一两项，便于定位影响因素。\r\n- 建立自己的提示词片段库，可复用。\r\n";
						const data = {title:"AI 绘图教程",description:"入门到进阶，快速上手 AI 绘图（文生图）。"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/07-fun/ai-drawing.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
