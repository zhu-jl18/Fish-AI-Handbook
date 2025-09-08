import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h1 id=\"为什么要懂反向代理\">为什么要懂反向代理</h1>\n<ul>\n<li><strong>隐藏后端细节</strong>：多个服务与模型供应商在后面切换，外部用户只看到同一个域名。</li>\n<li><strong>安全与配额</strong>：在边缘层做鉴权、限流、WAF 与审计，降低泄露与滥用风险。</li>\n<li><strong>性能</strong>：做 CDN/缓存与连接复用，显著提升长流式响应的稳定性。</li>\n</ul>\n<h2 id=\"常见能力\">常见能力</h2>\n<ul>\n<li>路由与重试：按路径/权重/健康检查路由；失败自动重试与熔断。</li>\n<li>缓存：对热门提示/结果短期缓存，降低 token 成本。</li>\n<li>观测：日志、指标、追踪三件套，定位慢请求与错误热点。</li>\n</ul>\n<blockquote>\n<p>结论：有了反代，你可以在不改客户端的情况下“无感”切换模型与供应商。</p>\n</blockquote>";

				const frontmatter = {"title":"反代","description":"反向代理位于服务端前，对外统一域名，负责转发、鉴权、缓存与负载均衡"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/glossary/reverse-proxy.md";
				const url = undefined;
				function rawContent() {
					return "\r\n# 为什么要懂反向代理\r\n\r\n- **隐藏后端细节**：多个服务与模型供应商在后面切换，外部用户只看到同一个域名。\r\n- **安全与配额**：在边缘层做鉴权、限流、WAF 与审计，降低泄露与滥用风险。\r\n- **性能**：做 CDN/缓存与连接复用，显著提升长流式响应的稳定性。\r\n\r\n## 常见能力\r\n\r\n- 路由与重试：按路径/权重/健康检查路由；失败自动重试与熔断。\r\n- 缓存：对热门提示/结果短期缓存，降低 token 成本。\r\n- 观测：日志、指标、追踪三件套，定位慢请求与错误热点。\r\n\r\n> 结论：有了反代，你可以在不改客户端的情况下“无感”切换模型与供应商。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"为什么要懂反向代理","text":"为什么要懂反向代理"},{"depth":2,"slug":"常见能力","text":"常见能力"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
