import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"怎么看榜单\">怎么看榜单</h2>\n<ul>\n<li>榜单衡量的是“在该测法下”的相对表现；不要盲目把分数等同于你的业务效果。</li>\n<li>结合你的数据类型（中文/多模态/长上下文）与成本/时延需求做二次筛选。</li>\n</ul>\n<h2 id=\"lmarena-接入\">LMArena 接入</h2>\n<ul>\n<li>方案A：在页面内嵌 IFrame（快速但受跨域与样式限制）。</li>\n<li>方案B：服务端抓取榜单数据，生成静态表格（稳定、可控）。</li>\n</ul>\n<blockquote>\n<p>我会按后续你的偏好选择 A 或 B，并提供开关。</p>\n</blockquote>";

				const frontmatter = {"title":"大模型排名","description":"接入 LMArena 排名并教你如何解读榜单"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/llm/rankings.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 怎么看榜单\r\n\r\n- 榜单衡量的是“在该测法下”的相对表现；不要盲目把分数等同于你的业务效果。\r\n- 结合你的数据类型（中文/多模态/长上下文）与成本/时延需求做二次筛选。\r\n\r\n## LMArena 接入\r\n\r\n- 方案A：在页面内嵌 IFrame（快速但受跨域与样式限制）。\r\n- 方案B：服务端抓取榜单数据，生成静态表格（稳定、可控）。\r\n\r\n> 我会按后续你的偏好选择 A 或 B，并提供开关。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"怎么看榜单","text":"怎么看榜单"},{"depth":2,"slug":"lmarena-接入","text":"LMArena 接入"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
