import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"为什么\">为什么</h2>\n<ul>\n<li>直接嵌入现有工作流与自动化脚本</li>\n</ul>\n<h2 id=\"常见能力\">常见能力</h2>\n<ul>\n<li>从文件/管道读取输入</li>\n<li>流式输出，便于边看边处理</li>\n<li>与系统命令组合：<code>cat | grep | jq</code></li>\n</ul>\n<h2 id=\"示例片段\">示例片段</h2>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"bash\"><code><span class=\"line\"><span style=\"color:#6A737D\"># 假设有 ai 命令</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">ai</span><span style=\"color:#79B8FF\"> -m</span><span style=\"color:#9ECBFF\"> gpt-4o-mini</span><span style=\"color:#9ECBFF\"> \"总结本目录代码结构\"</span><span style=\"color:#F97583\"> |</span><span style=\"color:#B392F0\"> tee</span><span style=\"color:#9ECBFF\"> summary.md</span></span>\n<span class=\"line\"></span></code></pre>";

				const frontmatter = {"title":"CLI 工具","description":"把模型能力带到终端与脚本"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/02-basic-usage/cli.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 为什么\r\n\r\n- 直接嵌入现有工作流与自动化脚本\r\n\r\n## 常见能力\r\n\r\n- 从文件/管道读取输入\r\n- 流式输出，便于边看边处理\r\n- 与系统命令组合：`cat | grep | jq`\r\n\r\n## 示例片段\r\n\r\n```bash\r\n# 假设有 ai 命令\r\nai -m gpt-4o-mini \"总结本目录代码结构\" | tee summary.md\r\n```\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"为什么","text":"为什么"},{"depth":2,"slug":"常见能力","text":"常见能力"},{"depth":2,"slug":"示例片段","text":"示例片段"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
