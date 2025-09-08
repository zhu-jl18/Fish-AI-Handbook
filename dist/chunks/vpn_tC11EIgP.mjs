import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"为什么需要\">为什么需要</h2>\n<ul>\n<li>访问模型供应商控制台、API 端点与依赖下载需要稳定国际出口。</li>\n<li>没有连通，任何提示词与架构都无法落地。</li>\n</ul>\n<h2 id=\"提示\">提示</h2>\n<ul>\n<li>选择合规可信的服务商。客户端示例：Clash/Clash Verge/Surge/Shadowrocket（按平台自选）。</li>\n<li>为系统与命令行配置代理（HTTP/HTTPS/SOCKS）。</li>\n</ul>\n<h2 id=\"常用检查命令可粘贴\">常用检查命令（可粘贴）</h2>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"bash\"><code><span class=\"line\"><span style=\"color:#6A737D\"># 查看出口IP</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">curl</span><span style=\"color:#9ECBFF\"> ifconfig.me</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\"># DNS/延迟定位</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">testdns.google</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">ping</span><span style=\"color:#9ECBFF\"> api.openai.com</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">tracert</span><span style=\"color:#9ECBFF\"> api.anthropic.com</span></span>\n<span class=\"line\"></span></code></pre>\n<blockquote>\n<p>Windows 用户也可在“Internet 选项”中设置系统代理；包管理器（npm、git、curl）可单独配置代理。</p>\n</blockquote>";

				const frontmatter = {"title":"VPN/代理","description":"稳定连通国外模型与生态依赖的前提"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/preparations/vpn.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 为什么需要\r\n\r\n- 访问模型供应商控制台、API 端点与依赖下载需要稳定国际出口。\r\n- 没有连通，任何提示词与架构都无法落地。\r\n\r\n## 提示\r\n\r\n- 选择合规可信的服务商。客户端示例：Clash/Clash Verge/Surge/Shadowrocket（按平台自选）。\r\n- 为系统与命令行配置代理（HTTP/HTTPS/SOCKS）。\r\n\r\n## 常用检查命令（可粘贴）\r\n\r\n```bash\r\n# 查看出口IP\r\ncurl ifconfig.me\r\n# DNS/延迟定位\r\ntestdns.google\r\nping api.openai.com\r\ntracert api.anthropic.com\r\n```\r\n\r\n> Windows 用户也可在“Internet 选项”中设置系统代理；包管理器（npm、git、curl）可单独配置代理。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"为什么需要","text":"为什么需要"},{"depth":2,"slug":"提示","text":"提示"},{"depth":2,"slug":"常用检查命令可粘贴","text":"常用检查命令（可粘贴）"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
