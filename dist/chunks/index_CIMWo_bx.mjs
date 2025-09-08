import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"为什么这些概念重要\">为什么这些概念重要</h2>\n<ul>\n<li><strong>工程化落地</strong>：Agent、Workflow 让模型从“对话框”升级为可编排的系统。</li>\n<li><strong>人与模型协作</strong>：Vibe Coding 等人机共创模式，决定你写代码/写文档的速度与质量。</li>\n<li><strong>可维护性</strong>：标准化流程与可观测性，使团队能长期演进而不失控。</li>\n</ul>";

				const frontmatter = {"title":"进阶概念概览","description":"当你准备把 AI 从demo做成系统时，需要理解的关键理念"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/advanced-concepts/index.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 为什么这些概念重要\r\n\r\n- **工程化落地**：Agent、Workflow 让模型从“对话框”升级为可编排的系统。\r\n- **人与模型协作**：Vibe Coding 等人机共创模式，决定你写代码/写文档的速度与质量。\r\n- **可维护性**：标准化流程与可观测性，使团队能长期演进而不失控。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"为什么这些概念重要","text":"为什么这些概念重要"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
