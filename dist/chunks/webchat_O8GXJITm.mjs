import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"为什么先用网页\">为什么先用网页</h2>\n<ul>\n<li>无需安装与密钥，一分钟体验不同模型</li>\n<li>适合练提示与确认需求</li>\n</ul>\n<h2 id=\"典型入口\">典型入口</h2>\n<ul>\n<li>ChatGPT、Claude、Gemini 官方网页</li>\n<li>聚合类客户端：支持多模型切换与文件上传</li>\n</ul>\n<h2 id=\"小贴士\">小贴士</h2>\n<ul>\n<li>先练“目标-约束-风格-验收标准”的完整提示</li>\n<li>复用“系统提示”让语气与格式稳定</li>\n</ul>";

				const frontmatter = {"title":"网页对话（Webchat）","description":"最快上手与模型交流的方式"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/02-basic-usage/webchat.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 为什么先用网页\r\n\r\n- 无需安装与密钥，一分钟体验不同模型\r\n- 适合练提示与确认需求\r\n\r\n## 典型入口\r\n\r\n- ChatGPT、Claude、Gemini 官方网页\r\n- 聚合类客户端：支持多模型切换与文件上传\r\n\r\n## 小贴士\r\n\r\n- 先练“目标-约束-风格-验收标准”的完整提示\r\n- 复用“系统提示”让语气与格式稳定\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"为什么先用网页","text":"为什么先用网页"},{"depth":2,"slug":"典型入口","text":"典型入口"},{"depth":2,"slug":"小贴士","text":"小贴士"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
