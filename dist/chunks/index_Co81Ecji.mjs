import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>欢迎来到“好玩的”章节！</p>\n<p>在这里，我们抛开严肃的技术深挖，转而聚焦那些能让你在闲暇时尽情玩耍、探索 AI 无限可能的趣味内容。无论你是想破解大模型的“隐藏潜力”，还是尝试用 AI 创作艺术作品，这里都有适合你的教程和指南。</p>\n<p>本章节包括：</p>\n<ul>\n<li><strong>大模型破限教程</strong>：教你如何安全地“解锁”大模型的更多能力。</li>\n<li><strong>Silver Trivern 酒馆使用</strong>：介绍这个独特的 AI 互动社区及其玩法。</li>\n<li><strong>AI 绘图教程</strong>：一步步指导你用 AI 生成惊艳的图像。</li>\n</ul>\n<p>准备好开启一段轻松的 AI 冒险了吗？</p>";

				const frontmatter = {"title":"好玩的","description":"探索一些有趣的 AI 玩法和教程，释放你的创意。"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/07-fun/index.md";
				const url = undefined;
				function rawContent() {
					return "\r\n欢迎来到“好玩的”章节！\r\n\r\n在这里，我们抛开严肃的技术深挖，转而聚焦那些能让你在闲暇时尽情玩耍、探索 AI 无限可能的趣味内容。无论你是想破解大模型的“隐藏潜力”，还是尝试用 AI 创作艺术作品，这里都有适合你的教程和指南。\r\n\r\n本章节包括：\r\n- **大模型破限教程**：教你如何安全地“解锁”大模型的更多能力。\r\n- **Silver Trivern 酒馆使用**：介绍这个独特的 AI 互动社区及其玩法。\r\n- **AI 绘图教程**：一步步指导你用 AI 生成惊艳的图像。\r\n\r\n准备好开启一段轻松的 AI 冒险了吗？\r\n";
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
