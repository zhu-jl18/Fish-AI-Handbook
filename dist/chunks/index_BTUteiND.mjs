import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>欢迎来到技术深入章节。</p>\n<p>在这里，我们将剥开现代 AI 应用的华丽外壳，一同探究其背后强大的技术引擎。本章内容专为那些不仅想知道“如何做”，更想理解“为什么”的读者准备。</p>\n<p>我们将一起探讨：</p>\n<ul>\n<li><strong>核心模型架构</strong>：如 Transformer 和注意力机制，它们是如何支撑起大语言模型的。</li>\n<li><strong>关键技术剖析</strong>：深入讲解 RAG、Agent 等高级技术的工作流程与内部机制。</li>\n<li><strong>生态系统工具</strong>：了解向量数据库、LLM 开发框架等在整个技术栈中所扮演的角色。</li>\n</ul>\n<p>理解这些底层原理，将帮助您更深刻地认识到当前 AI 技术的优势与局限，从而在应用开发中做出更明智的技术决策，并激发更具创新性的想法。</p>\n<p>准备好潜入技术的深海了吗？让我们开始吧。</p>";

				const frontmatter = {"title":"技术深入","description":"深入探索驱动现代 AI 应用的核心技术和底层原理。"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/06-technical-deep-dive/index.md";
				const url = undefined;
				function rawContent() {
					return "\r\n欢迎来到技术深入章节。\r\n\r\n在这里，我们将剥开现代 AI 应用的华丽外壳，一同探究其背后强大的技术引擎。本章内容专为那些不仅想知道“如何做”，更想理解“为什么”的读者准备。\r\n\r\n我们将一起探讨：\r\n\r\n-   **核心模型架构**：如 Transformer 和注意力机制，它们是如何支撑起大语言模型的。\r\n-   **关键技术剖析**：深入讲解 RAG、Agent 等高级技术的工作流程与内部机制。\r\n-   **生态系统工具**：了解向量数据库、LLM 开发框架等在整个技术栈中所扮演的角色。\r\n\r\n理解这些底层原理，将帮助您更深刻地认识到当前 AI 技术的优势与局限，从而在应用开发中做出更明智的技术决策，并激发更具创新性的想法。\r\n\r\n准备好潜入技术的深海了吗？让我们开始吧。\r\n";
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
