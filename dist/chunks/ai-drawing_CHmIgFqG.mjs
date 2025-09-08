import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"选择模型\">选择模型</h2>\n<p>常见模型：</p>\n<ul>\n<li>Stable Diffusion 系列（SD1.5/SDXL）</li>\n<li>Flux、Playground、DALL·E（云端）</li>\n</ul>\n<p>本地推荐：Stable Diffusion + ComfyUI（或 Automatic1111）。</p>\n<h2 id=\"基本概念\">基本概念</h2>\n<ul>\n<li><strong>Prompt（正向提示）</strong>：你想要的元素与风格。</li>\n<li><strong>Negative Prompt（反向提示）</strong>：你不想要的元素。</li>\n<li><strong>CFG / Guidance</strong>：文本到图像的严格程度。</li>\n<li><strong>Steps</strong>：采样步数，步数越高越精细但更慢。</li>\n<li><strong>Seed</strong>：随机种子，可复现结果。</li>\n</ul>\n<h2 id=\"提示词结构模板\">提示词结构模板</h2>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"plaintext\"><code><span class=\"line\"><span>主体 + 场景 + 风格 + 镜头 + 光影 + 细节 + 画幅</span></span>\n<span class=\"line\"><span></span></span></code></pre>\n<p>例子：</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"plaintext\"><code><span class=\"line\"><span>A cyberpunk street at night, neon signs, rainy, reflective ground,</span></span>\n<span class=\"line\"><span>wide-angle lens, cinematic lighting, highly detailed, 4k, masterpiece</span></span>\n<span class=\"line\"><span></span></span></code></pre>\n<h2 id=\"负面提示词模板\">负面提示词模板</h2>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"plaintext\"><code><span class=\"line\"><span>low quality, blurry, extra fingers, bad anatomy, watermark, jpeg artifacts</span></span>\n<span class=\"line\"><span></span></span></code></pre>\n<h2 id=\"基础参数建议sdxl\">基础参数建议（SDXL）</h2>\n<ul>\n<li>分辨率：1024×1024 起</li>\n<li>Steps：25–40</li>\n<li>CFG：5–7</li>\n<li>Sampler：DPM++ 2M Karras（或 Euler a）</li>\n</ul>\n<h2 id=\"进阶控制与修复\">进阶：控制与修复</h2>\n<ul>\n<li>ControlNet：姿态、线稿、深度图控制结构。</li>\n<li>Inpainting/Outpainting：局部修复与扩图。</li>\n<li>LoRA：风格/人物微调模型，少量样本快速收敛。</li>\n</ul>\n<h2 id=\"实操建议\">实操建议</h2>\n<ul>\n<li>先用低分辨率快速迭代，再放大重绘。</li>\n<li>一次只改一两项，便于定位影响因素。</li>\n<li>建立自己的提示词片段库，可复用。</li>\n</ul>";

				const frontmatter = {"title":"AI 绘图教程","description":"入门到进阶，快速上手 AI 绘图（文生图）。"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/07-fun/ai-drawing.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 选择模型\r\n\r\n常见模型：\r\n- Stable Diffusion 系列（SD1.5/SDXL）\r\n- Flux、Playground、DALL·E（云端）\r\n\r\n本地推荐：Stable Diffusion + ComfyUI（或 Automatic1111）。\r\n\r\n## 基本概念\r\n\r\n- **Prompt（正向提示）**：你想要的元素与风格。\r\n- **Negative Prompt（反向提示）**：你不想要的元素。\r\n- **CFG / Guidance**：文本到图像的严格程度。\r\n- **Steps**：采样步数，步数越高越精细但更慢。\r\n- **Seed**：随机种子，可复现结果。\r\n\r\n## 提示词结构模板\r\n\r\n```\r\n主体 + 场景 + 风格 + 镜头 + 光影 + 细节 + 画幅\r\n```\r\n\r\n例子：\r\n```\r\nA cyberpunk street at night, neon signs, rainy, reflective ground,\r\nwide-angle lens, cinematic lighting, highly detailed, 4k, masterpiece\r\n```\r\n\r\n## 负面提示词模板\r\n\r\n```\r\nlow quality, blurry, extra fingers, bad anatomy, watermark, jpeg artifacts\r\n```\r\n\r\n## 基础参数建议（SDXL）\r\n\r\n- 分辨率：1024×1024 起\r\n- Steps：25–40\r\n- CFG：5–7\r\n- Sampler：DPM++ 2M Karras（或 Euler a）\r\n\r\n## 进阶：控制与修复\r\n\r\n- ControlNet：姿态、线稿、深度图控制结构。\r\n- Inpainting/Outpainting：局部修复与扩图。\r\n- LoRA：风格/人物微调模型，少量样本快速收敛。\r\n\r\n## 实操建议\r\n\r\n- 先用低分辨率快速迭代，再放大重绘。\r\n- 一次只改一两项，便于定位影响因素。\r\n- 建立自己的提示词片段库，可复用。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"选择模型","text":"选择模型"},{"depth":2,"slug":"基本概念","text":"基本概念"},{"depth":2,"slug":"提示词结构模板","text":"提示词结构模板"},{"depth":2,"slug":"负面提示词模板","text":"负面提示词模板"},{"depth":2,"slug":"基础参数建议sdxl","text":"基础参数建议（SDXL）"},{"depth":2,"slug":"进阶控制与修复","text":"进阶：控制与修复"},{"depth":2,"slug":"实操建议","text":"实操建议"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
