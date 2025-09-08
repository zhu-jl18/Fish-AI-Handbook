import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"这是什么\">这是什么</h2>\n<p>Silver Trivern（银三叉/银三人）是一个风格化的 AI 互动“酒馆”主题玩法，你可以把它理解为“AI 扮演者 + 场景 + 规则”的组合。用户在其中与不同角色的 AI 进行对话、探索剧情、完成任务。</p>\n<h2 id=\"如何开始\">如何开始</h2>\n<ol>\n<li>进入酒馆主页，选择场景与剧本。</li>\n<li>选定你的角色（或自定义角色设定）。</li>\n<li>阅读规则与安全须知，开始和酒馆里的角色互动。</li>\n</ol>\n<h2 id=\"常用指令\">常用指令</h2>\n<ul>\n<li><code>\\help</code> 查看可用命令</li>\n<li><code>\\reset</code> 重置当前会话</li>\n<li><code>\\role &#x3C;name></code> 切换到指定角色</li>\n<li><code>\\note &#x3C;text></code> 记录关键笔记（部分实现支持）</li>\n</ul>\n<h2 id=\"玩法建议\">玩法建议</h2>\n<ul>\n<li>尝试不同角色视角：同一场景，不同角色会有不同剧情走向。</li>\n<li>用“目标—行动—反馈”的循环推进剧情。</li>\n<li>记录线索，避免剧情跑偏。</li>\n</ul>\n<h2 id=\"安全与礼仪\">安全与礼仪</h2>\n<ul>\n<li>尊重其他参与者（如果是多人模式）。</li>\n<li>避免生成攻击性或不适宜内容。</li>\n<li>遵守平台规则。</li>\n</ul>";

				const frontmatter = {"title":"Silver Trivern 酒馆使用","description":"进入一个有趣的 AI 互动“酒馆”，学习玩法与礼仪。"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/07-fun/silver-trivern.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 这是什么\r\n\r\nSilver Trivern（银三叉/银三人）是一个风格化的 AI 互动“酒馆”主题玩法，你可以把它理解为“AI 扮演者 + 场景 + 规则”的组合。用户在其中与不同角色的 AI 进行对话、探索剧情、完成任务。\r\n\r\n## 如何开始\r\n\r\n1. 进入酒馆主页，选择场景与剧本。\r\n2. 选定你的角色（或自定义角色设定）。\r\n3. 阅读规则与安全须知，开始和酒馆里的角色互动。\r\n\r\n## 常用指令\r\n\r\n- `\\help` 查看可用命令\r\n- `\\reset` 重置当前会话\r\n- `\\role <name>` 切换到指定角色\r\n- `\\note <text>` 记录关键笔记（部分实现支持）\r\n\r\n## 玩法建议\r\n\r\n- 尝试不同角色视角：同一场景，不同角色会有不同剧情走向。\r\n- 用“目标—行动—反馈”的循环推进剧情。\r\n- 记录线索，避免剧情跑偏。\r\n\r\n## 安全与礼仪\r\n\r\n- 尊重其他参与者（如果是多人模式）。\r\n- 避免生成攻击性或不适宜内容。\r\n- 遵守平台规则。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"这是什么","text":"这是什么"},{"depth":2,"slug":"如何开始","text":"如何开始"},{"depth":2,"slug":"常用指令","text":"常用指令"},{"depth":2,"slug":"玩法建议","text":"玩法建议"},{"depth":2,"slug":"安全与礼仪","text":"安全与礼仪"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
