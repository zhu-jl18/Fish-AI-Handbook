import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h1 id=\"为什么要懂代理\">为什么要懂代理</h1>\n<ul>\n<li><strong>连通性</strong>：部分模型/服务需要跨境访问；没有稳定代理，再好的提示也白搭。</li>\n<li><strong>统一出入口</strong>：把多家 API 的密钥与路由隐藏在代理后面，前端或第三方只接触代理地址，安全可控。</li>\n<li><strong>成本与配额</strong>：可在代理层做限流、配额、缓存与降级，避免单点过载。</li>\n</ul>\n<h2 id=\"常见类型\">常见类型</h2>\n<ul>\n<li><strong>HTTP/HTTPS 正向代理</strong>：客户端经代理访问公网，常见于开发机与企业网络。</li>\n<li><strong>反向代理（见下文）</strong>：代理位于服务端前面，对外只暴露自己的域名。</li>\n</ul>\n<h2 id=\"代理在-ai-应用中的用法\">代理在 AI 应用中的用法</h2>\n<ul>\n<li>统一 <code>POST /chat</code> 接口，内部再路由到 OpenAI/Claude/本地模型。</li>\n<li>注入组织级 headers（比如 <code>X-Org-Id</code>），做审计与风控。</li>\n<li>观察 token 用量与错误码，自动切换备用模型（故障转移）。</li>\n</ul>\n<blockquote>\n<p>结论：代理=“连接模型世界的网关”。稳定的网关，等于 50% 的可用性保障。</p>\n</blockquote>";

				const frontmatter = {"title":"代理","description":"代理用于网络连通、鉴权聚合与访问控制，是稳定使用大模型的基础设施"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/glossary/proxy.md";
				const url = undefined;
				function rawContent() {
					return "\r\n# 为什么要懂代理\r\n\r\n- **连通性**：部分模型/服务需要跨境访问；没有稳定代理，再好的提示也白搭。\r\n- **统一出入口**：把多家 API 的密钥与路由隐藏在代理后面，前端或第三方只接触代理地址，安全可控。\r\n- **成本与配额**：可在代理层做限流、配额、缓存与降级，避免单点过载。\r\n\r\n## 常见类型\r\n\r\n- **HTTP/HTTPS 正向代理**：客户端经代理访问公网，常见于开发机与企业网络。\r\n- **反向代理（见下文）**：代理位于服务端前面，对外只暴露自己的域名。\r\n\r\n## 代理在 AI 应用中的用法\r\n\r\n- 统一 `POST /chat` 接口，内部再路由到 OpenAI/Claude/本地模型。\r\n- 注入组织级 headers（比如 `X-Org-Id`），做审计与风控。\r\n- 观察 token 用量与错误码，自动切换备用模型（故障转移）。\r\n\r\n> 结论：代理=“连接模型世界的网关”。稳定的网关，等于 50% 的可用性保障。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"为什么要懂代理","text":"为什么要懂代理"},{"depth":2,"slug":"常见类型","text":"常见类型"},{"depth":2,"slug":"代理在-ai-应用中的用法","text":"代理在 AI 应用中的用法"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
