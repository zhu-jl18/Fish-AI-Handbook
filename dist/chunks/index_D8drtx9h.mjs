import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"模型与平台\">模型与平台</h2>\n<ul>\n<li>OpenAI / Anthropic / Google AI Studio</li>\n<li>Ollama（本地推理）</li>\n<li>Kaggle / Hugging Face（数据与模型）</li>\n</ul>\n<h2 id=\"开发与框架\">开发与框架</h2>\n<ul>\n<li>LangChain / LlamaIndex</li>\n<li>Vercel AI SDK</li>\n<li>MCP 生态（服务端、客户端示例）</li>\n</ul>\n<h2 id=\"向量数据库\">向量数据库</h2>\n<ul>\n<li>Chroma / FAISS / Qdrant / Weaviate / Pinecone</li>\n</ul>\n<h2 id=\"绘图与多模态\">绘图与多模态</h2>\n<ul>\n<li>ComfyUI / Automatic1111</li>\n<li>ControlNet 模型集合</li>\n<li>图片放大与修复：ESRGAN / Real-ESRGAN</li>\n</ul>\n<h2 id=\"学习资料\">学习资料</h2>\n<ul>\n<li>Transformers 原理讲解（Attention, Positional Encoding）</li>\n<li>RAG 实战与评测</li>\n<li>Agent 框架与工作流设计</li>\n</ul>\n<blockquote>\n<p>持续更新中，你也可以把自己的私藏链接提给我，一起完善这个清单。</p>\n</blockquote>";

				const frontmatter = {"title":"资源合集","description":"常用网站、工具、素材与学习资源的精选合集。"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/08-resources/index.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 模型与平台\r\n\r\n- OpenAI / Anthropic / Google AI Studio\r\n- Ollama（本地推理）\r\n- Kaggle / Hugging Face（数据与模型）\r\n\r\n## 开发与框架\r\n\r\n- LangChain / LlamaIndex\r\n- Vercel AI SDK\r\n- MCP 生态（服务端、客户端示例）\r\n\r\n## 向量数据库\r\n\r\n- Chroma / FAISS / Qdrant / Weaviate / Pinecone\r\n\r\n## 绘图与多模态\r\n\r\n- ComfyUI / Automatic1111\r\n- ControlNet 模型集合\r\n- 图片放大与修复：ESRGAN / Real-ESRGAN\r\n\r\n## 学习资料\r\n\r\n- Transformers 原理讲解（Attention, Positional Encoding）\r\n- RAG 实战与评测\r\n- Agent 框架与工作流设计\r\n\r\n> 持续更新中，你也可以把自己的私藏链接提给我，一起完善这个清单。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"模型与平台","text":"模型与平台"},{"depth":2,"slug":"开发与框架","text":"开发与框架"},{"depth":2,"slug":"向量数据库","text":"向量数据库"},{"depth":2,"slug":"绘图与多模态","text":"绘图与多模态"},{"depth":2,"slug":"学习资料","text":"学习资料"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
