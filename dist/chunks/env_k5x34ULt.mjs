import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h1 id=\"为什么要用环境变量\">为什么要用环境变量</h1>\n<ul>\n<li><strong>安全</strong>：API Key 等敏感信息不应硬编码在仓库；放在系统环境或密钥管理器里更安全。</li>\n<li><strong>多环境</strong>：本地/测试/生产用不同变量即可切换，无需改代码。</li>\n<li><strong>自动化</strong>：CI/CD 中通过变量注入构建与部署配置。</li>\n</ul>\n<h2 id=\"常见做法\">常见做法</h2>\n<ul>\n<li><code>.env</code> 文件 + <code>.gitignore</code> 忽略；生产改用平台密钥管理（如 Vercel/Netlify/云厂商 KMS）。</li>\n<li>使用 <code>process.env.VAR_NAME</code>（Node）或平台提供的注入机制读取。</li>\n<li>结合 Schema 校验（如 <code>zod</code>）在启动时校验缺失或格式错误。</li>\n</ul>\n<h2 id=\"最佳实践\">最佳实践</h2>\n<ul>\n<li>变量名语义化：<code>MODEL_API_KEY</code>、<code>VECTOR_DB_URL</code>。</li>\n<li>提供 <code>.env.example</code> 方便他人起步。</li>\n<li>避免在客户端暴露敏感变量，前端改走后端代理。</li>\n</ul>";

				const frontmatter = {"title":"环境变量","description":"环境变量是部署和本地开发时存放密钥与配置的标准方式"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/glossary/env.md";
				const url = undefined;
				function rawContent() {
					return "\r\n# 为什么要用环境变量\r\n\r\n- **安全**：API Key 等敏感信息不应硬编码在仓库；放在系统环境或密钥管理器里更安全。\r\n- **多环境**：本地/测试/生产用不同变量即可切换，无需改代码。\r\n- **自动化**：CI/CD 中通过变量注入构建与部署配置。\r\n\r\n## 常见做法\r\n\r\n- `.env` 文件 + `.gitignore` 忽略；生产改用平台密钥管理（如 Vercel/Netlify/云厂商 KMS）。\r\n- 使用 `process.env.VAR_NAME`（Node）或平台提供的注入机制读取。\r\n- 结合 Schema 校验（如 `zod`）在启动时校验缺失或格式错误。\r\n\r\n## 最佳实践\r\n\r\n- 变量名语义化：`MODEL_API_KEY`、`VECTOR_DB_URL`。\r\n- 提供 `.env.example` 方便他人起步。\r\n- 避免在客户端暴露敏感变量，前端改走后端代理。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"为什么要用环境变量","text":"为什么要用环境变量"},{"depth":2,"slug":"常见做法","text":"常见做法"},{"depth":2,"slug":"最佳实践","text":"最佳实践"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
