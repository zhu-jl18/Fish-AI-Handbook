import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"为什么\">为什么</h2>\n<ul>\n<li>把能力送到用户常在的地方，减少打开新工具的摩擦</li>\n</ul>\n<h2 id=\"路径\">路径</h2>\n<ul>\n<li>Webhook 机器人：监听消息→调用模型→回复</li>\n<li>平台 SDK：更丰富能力（菜单、按钮、富文本）</li>\n</ul>\n<h2 id=\"注意\">注意</h2>\n<ul>\n<li>身份与配额：为每个用户/群组限流</li>\n<li>审计与敏感词：日志与过滤不可少</li>\n</ul>";

				const frontmatter = {"title":"聊天应用集成","description":"把模型接入微信/Telegram/Slack 等，服务真实用户"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/02-basic-usage/app-integration.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 为什么\r\n\r\n- 把能力送到用户常在的地方，减少打开新工具的摩擦\r\n\r\n## 路径\r\n\r\n- Webhook 机器人：监听消息→调用模型→回复\r\n- 平台 SDK：更丰富能力（菜单、按钮、富文本）\r\n\r\n## 注意\r\n\r\n- 身份与配额：为每个用户/群组限流\r\n- 审计与敏感词：日志与过滤不可少\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"为什么","text":"为什么"},{"depth":2,"slug":"路径","text":"路径"},{"depth":2,"slug":"注意","text":"注意"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
