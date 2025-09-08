import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"你会了解\">你会了解</h2>\n<ul>\n<li>模型分类：按开源/闭源、用途、上下文长度</li>\n<li>常见模型：各家擅长与适用场景</li>\n<li>排名怎么看：榜单≠唯一标准，如何结合自己需求解读</li>\n</ul>";

				const frontmatter = {"title":"大模型常识概览","description":"先把地图搞清楚：分类、代表模型与如何看排名"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/llm/index.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 你会了解\r\n\r\n- 模型分类：按开源/闭源、用途、上下文长度\r\n- 常见模型：各家擅长与适用场景\r\n- 排名怎么看：榜单≠唯一标准，如何结合自己需求解读\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"你会了解","text":"你会了解"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
