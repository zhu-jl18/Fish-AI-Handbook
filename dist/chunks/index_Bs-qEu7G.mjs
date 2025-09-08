import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"你会学到\">你会学到</h2>\n<ul>\n<li>Webchat 网页对话：最快上手的方式</li>\n<li>聊天应用集成：把模型接入微信/Telegram/Slack 等</li>\n<li>CLI 工具：把模型能力带到终端与脚本</li>\n<li>智能代码编辑器：在 IDE 中与 Agent 协作</li>\n</ul>";

				const frontmatter = {"title":"基础使用概览","description":"从网页对话到应用集成，再到CLI与智能编辑器"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/02-basic-usage/index.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 你会学到\r\n\r\n- Webchat 网页对话：最快上手的方式\r\n- 聊天应用集成：把模型接入微信/Telegram/Slack 等\r\n- CLI 工具：把模型能力带到终端与脚本\r\n- 智能代码编辑器：在 IDE 中与 Agent 协作\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"你会学到","text":"你会学到"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
