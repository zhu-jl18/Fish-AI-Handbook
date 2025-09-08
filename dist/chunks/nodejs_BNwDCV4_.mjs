import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"官方地址\">官方地址</h2>\n<ul>\n<li>Node.js：<code>https://nodejs.org/</code></li>\n<li>Volta：<code>https://volta.sh/</code>（便捷的版本管理）</li>\n<li>nvm-windows：<code>https://github.com/coreybutler/nvm-windows</code></li>\n</ul>\n<h2 id=\"安装小白版\">安装（小白版）</h2>\n<ul>\n<li>最简单：去 Node.js 官网下载 LTS 安装包，下一步到完成。</li>\n<li>想要多版本管理（推荐其一）：</li>\n</ul>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"powershell\"><code><span class=\"line\"><span style=\"color:#6A737D\"># 方案A：Volta（推荐、简单稳定）</span></span>\n<span class=\"line\"><span style=\"color:#79B8FF\">Invoke-WebRequest</span><span style=\"color:#E1E4E8\"> https:</span><span style=\"color:#F97583\">//</span><span style=\"color:#E1E4E8\">get.volta.sh </span><span style=\"color:#F97583\">-</span><span style=\"color:#E1E4E8\">UseBasicParsing </span><span style=\"color:#F97583\">|</span><span style=\"color:#E1E4E8\"> pwsh</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">volta install node@lts</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color:#6A737D\"># 方案B：nvm-windows</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">winget install CoreyButler.NVMforWindows</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">nvm install lts</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">nvm use lts</span></span>\n<span class=\"line\"></span></code></pre>\n<h2 id=\"验证可粘贴\">验证（可粘贴）</h2>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"bash\"><code><span class=\"line\"><span style=\"color:#B392F0\">node</span><span style=\"color:#79B8FF\"> -v</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">npm</span><span style=\"color:#79B8FF\"> -v</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">npx</span><span style=\"color:#79B8FF\"> -v</span></span>\n<span class=\"line\"></span></code></pre>\n<h2 id=\"包管理与脚手架\">包管理与脚手架</h2>\n<ul>\n<li>初学用 npm 即可；需要更快可用 pnpm：</li>\n</ul>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"bash\"><code><span class=\"line\"><span style=\"color:#B392F0\">npm</span><span style=\"color:#9ECBFF\"> i</span><span style=\"color:#79B8FF\"> -g</span><span style=\"color:#9ECBFF\"> pnpm</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">pnpm</span><span style=\"color:#79B8FF\"> -v</span></span>\n<span class=\"line\"></span></code></pre>\n<ul>\n<li>常见脚手架：<code>npm create astro@latest</code>、<code>npm create vite@latest</code>。</li>\n</ul>\n<h2 id=\"小提示\">小提示</h2>\n<ul>\n<li>使用 <code>.env</code> 与 <code>dotenv</code> 读取环境变量；Windows 下可用 <code>cross-env</code> 兼容设置。</li>\n</ul>";

				const frontmatter = {"title":"Node.js","description":"前后端脚手架与大量 LLM SDK 的共同运行时"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/preparations/nodejs.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 官方地址\r\n\r\n- Node.js：`https://nodejs.org/`\r\n- Volta：`https://volta.sh/`（便捷的版本管理）\r\n- nvm-windows：`https://github.com/coreybutler/nvm-windows`\r\n\r\n## 安装（小白版）\r\n\r\n- 最简单：去 Node.js 官网下载 LTS 安装包，下一步到完成。\r\n- 想要多版本管理（推荐其一）：\r\n\r\n```powershell\r\n# 方案A：Volta（推荐、简单稳定）\r\nInvoke-WebRequest https://get.volta.sh -UseBasicParsing | pwsh\r\nvolta install node@lts\r\n\r\n# 方案B：nvm-windows\r\nwinget install CoreyButler.NVMforWindows\r\nnvm install lts\r\nnvm use lts\r\n```\r\n\r\n## 验证（可粘贴）\r\n\r\n```bash\r\nnode -v\r\nnpm -v\r\nnpx -v\r\n```\r\n\r\n## 包管理与脚手架\r\n\r\n- 初学用 npm 即可；需要更快可用 pnpm：\r\n\r\n```bash\r\nnpm i -g pnpm\r\npnpm -v\r\n```\r\n\r\n- 常见脚手架：`npm create astro@latest`、`npm create vite@latest`。\r\n\r\n## 小提示\r\n\r\n- 使用 `.env` 与 `dotenv` 读取环境变量；Windows 下可用 `cross-env` 兼容设置。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"官方地址","text":"官方地址"},{"depth":2,"slug":"安装小白版","text":"安装（小白版）"},{"depth":2,"slug":"验证可粘贴","text":"验证（可粘贴）"},{"depth":2,"slug":"包管理与脚手架","text":"包管理与脚手架"},{"depth":2,"slug":"小提示","text":"小提示"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
