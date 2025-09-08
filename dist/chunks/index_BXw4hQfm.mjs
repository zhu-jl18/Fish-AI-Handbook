import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>理论是基础，实践是目的。</p>\n<p>在本章节中，我们将通过一系列端到端的示例项目，向您展示如何将前面学到的概念和技术（如提示词工程、RAG、AI Agent）综合运用起来，解决真实世界的问题。</p>\n<p>每个示例都将包含：</p>\n<ul>\n<li><strong>项目背景</strong>：我们要解决什么问题？</li>\n<li><strong>技术选型</strong>：我们会用到哪些工具和技术？</li>\n<li><strong>实现步骤</strong>：提供关键步骤的代码和说明。</li>\n<li><strong>最终效果</strong>：展示项目完成后的成果。</li>\n</ul>\n<p>通过动手实践这些项目，您将能更深刻地理解 AI 的能力边界，并激发将 AI 融入自己工作流程的灵感。</p>\n<p>让我们开始动手构建吧！</p>";

				const frontmatter = {"title":"示例项目","description":"通过实际项目案例，学习如何将 AI 技术应用于真实场景。"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/05-demos/index.md";
				const url = undefined;
				function rawContent() {
					return "\r\n理论是基础，实践是目的。\r\n\r\n在本章节中，我们将通过一系列端到端的示例项目，向您展示如何将前面学到的概念和技术（如提示词工程、RAG、AI Agent）综合运用起来，解决真实世界的问题。\r\n\r\n每个示例都将包含：\r\n\r\n-   **项目背景**：我们要解决什么问题？\r\n-   **技术选型**：我们会用到哪些工具和技术？\r\n-   **实现步骤**：提供关键步骤的代码和说明。\r\n-   **最终效果**：展示项目完成后的成果。\r\n\r\n通过动手实践这些项目，您将能更深刻地理解 AI 的能力边界，并激发将 AI 融入自己工作流程的灵感。\r\n\r\n让我们开始动手构建吧！\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
