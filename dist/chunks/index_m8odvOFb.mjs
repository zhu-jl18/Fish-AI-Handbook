import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"为什么读这一部分\">为什么读这一部分</h2>\n<ul>\n<li>把“会问模型”提升为“会做系统”：需要数据检索、知识管理、工具编排与多智能体协作。</li>\n<li>聚焦“何时用/怎么选/有哪些坑”，少形而上，多可落地的建议。</li>\n</ul>";

				const frontmatter = {"title":"工程化进阶：RAG、向量与多智能体","description":"把大模型从Demo做成系统时必须掌握的工程化能力概览"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/04-advanced-techniques/index.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 为什么读这一部分\r\n\r\n- 把“会问模型”提升为“会做系统”：需要数据检索、知识管理、工具编排与多智能体协作。\r\n- 聚焦“何时用/怎么选/有哪些坑”，少形而上，多可落地的建议。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"为什么读这一部分","text":"为什么读这一部分"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
