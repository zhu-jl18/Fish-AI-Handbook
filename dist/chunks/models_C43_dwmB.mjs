import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"闭源代表\">闭源（代表）</h2>\n<ul>\n<li>OpenAI：综合能力强，工具调用与多模态生态完善，代码与代理生态活跃。</li>\n<li>Anthropic：长上下文稳定、守法合规与安全性强；写作与推理可靠性高。</li>\n<li>Google Gemini：多模态原生强项，搜索/地图/文档生态联动潜力大。</li>\n</ul>\n<h2 id=\"开源代表\">开源（代表）</h2>\n<ul>\n<li>Llama 系：社区广、推理效率好，适合私有化与边缘部署。</li>\n<li>Qwen 通义：中文/多语优秀，系列覆盖文本/代码/视觉。</li>\n<li>Mistral：轻量高效，适合低成本与响应快的场景。</li>\n</ul>\n<h2 id=\"选择建议\">选择建议</h2>\n<ul>\n<li>代码密集：优先 Code 专项模型；</li>\n<li>中文写作/企业内部：可优先 Qwen/Llama 自建；</li>\n<li>多模态重度：Gemini/GPT-4o；</li>\n<li>长对话与制度要求严格：Anthropic。</li>\n</ul>";

				const frontmatter = {"title":"常见模型","description":"主流闭源/开源模型的擅长点与典型使用场景"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/llm/models.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 闭源（代表）\r\n\r\n- OpenAI：综合能力强，工具调用与多模态生态完善，代码与代理生态活跃。\r\n- Anthropic：长上下文稳定、守法合规与安全性强；写作与推理可靠性高。\r\n- Google Gemini：多模态原生强项，搜索/地图/文档生态联动潜力大。\r\n\r\n## 开源（代表）\r\n\r\n- Llama 系：社区广、推理效率好，适合私有化与边缘部署。\r\n- Qwen 通义：中文/多语优秀，系列覆盖文本/代码/视觉。\r\n- Mistral：轻量高效，适合低成本与响应快的场景。\r\n\r\n## 选择建议\r\n\r\n- 代码密集：优先 Code 专项模型；\r\n- 中文写作/企业内部：可优先 Qwen/Llama 自建；\r\n- 多模态重度：Gemini/GPT-4o；\r\n- 长对话与制度要求严格：Anthropic。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"闭源代表","text":"闭源（代表）"},{"depth":2,"slug":"开源代表","text":"开源（代表）"},{"depth":2,"slug":"选择建议","text":"选择建议"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
