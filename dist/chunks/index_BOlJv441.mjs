import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>欢迎来到提示词工程的世界！</p>\n<p>在本章节中，我们将深入探讨如何与大语言模型（LLM）进行高效沟通的艺术和科学。一个精心设计的提示词，是引导模型产生准确、相关、高质量输出的关键。</p>\n<p>无论您是刚刚接触 AI 的新手，还是希望提升自己 AI 技能的开发者，这里都有您需要的内容。</p>\n<p>我们将从<strong>基础概念</strong>讲起，逐步深入到<strong>高级技巧</strong>和<strong>实用范式</strong>，帮助您：</p>\n<ul>\n<li>理解构建优秀提示词的核心原则。</li>\n<li>学习并掌握如“思维链”、“少样本学习”等高级技术。</li>\n<li>获取一系列即用型的提示词模板，以应对各种常见任务。</li>\n</ul>\n<p>让我们一起开始这段激动人心的学习之旅，解锁与 AI 协作的无限可能。</p>";

				const frontmatter = {"title":"提示词工程","description":"学习如何构建有效的提示词，释放大语言模型的全部潜力。"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/03-prompts/index.md";
				const url = undefined;
				function rawContent() {
					return "\r\n欢迎来到提示词工程的世界！\r\n\r\n在本章节中，我们将深入探讨如何与大语言模型（LLM）进行高效沟通的艺术和科学。一个精心设计的提示词，是引导模型产生准确、相关、高质量输出的关键。\r\n\r\n无论您是刚刚接触 AI 的新手，还是希望提升自己 AI 技能的开发者，这里都有您需要的内容。\r\n\r\n我们将从**基础概念**讲起，逐步深入到**高级技巧**和**实用范式**，帮助您：\r\n\r\n-   理解构建优秀提示词的核心原则。\r\n-   学习并掌握如“思维链”、“少样本学习”等高级技术。\r\n-   获取一系列即用型的提示词模板，以应对各种常见任务。\r\n\r\n让我们一起开始这段激动人心的学习之旅，解锁与 AI 协作的无限可能。\r\n";
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
