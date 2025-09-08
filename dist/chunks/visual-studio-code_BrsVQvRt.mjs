import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"官方地址\">官方地址</h2>\n<ul>\n<li>下载：<code>https://code.visualstudio.com/</code></li>\n<li>市场：<code>https://marketplace.visualstudio.com/vscode</code></li>\n</ul>\n<h2 id=\"安装小白版\">安装（小白版）</h2>\n<ol>\n<li>访问官网下载适配你系统的安装包并安装。</li>\n<li>首次启动后，登录账号以同步设置（可选）。</li>\n</ol>\n<h2 id=\"推荐扩展可粘贴到终端安装\">推荐扩展（可粘贴到终端安装）</h2>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"bash\"><code><span class=\"line\"><span style=\"color:#B392F0\">code</span><span style=\"color:#79B8FF\"> --install-extension</span><span style=\"color:#9ECBFF\"> ms-ceintl.vscode-language-pack-zh-hans</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">code</span><span style=\"color:#79B8FF\"> --install-extension</span><span style=\"color:#9ECBFF\"> esbenp.prettier-vscode</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">code</span><span style=\"color:#79B8FF\"> --install-extension</span><span style=\"color:#9ECBFF\"> dbaeumer.vscode-eslint</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">code</span><span style=\"color:#79B8FF\"> --install-extension</span><span style=\"color:#9ECBFF\"> yzhang.markdown-all-in-one</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">code</span><span style=\"color:#79B8FF\"> --install-extension</span><span style=\"color:#9ECBFF\"> eamodio.gitlens</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">code</span><span style=\"color:#79B8FF\"> --install-extension</span><span style=\"color:#9ECBFF\"> usernamehw.errorlens</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">code</span><span style=\"color:#79B8FF\"> --install-extension</span><span style=\"color:#9ECBFF\"> rangav.vscode-thunder-client</span></span>\n<span class=\"line\"></span></code></pre>\n<blockquote>\n<p>Windows 如提示 <code>code</code> 未识别：在 VS Code 中按 F1 → 输入“Shell Command: Install ‘code’ command in PATH”。</p>\n</blockquote>\n<h2 id=\"基本设置建议\">基本设置建议</h2>\n<ul>\n<li>统一格式化：开启“保存时格式化”、选择 Prettier 为默认格式化器。</li>\n<li>终端集成：<code>Ctrl+~</code> 打开内置终端，直接运行脚本与 git。</li>\n<li>同步设置：启用 Settings Sync，在多设备保持一致体验。</li>\n</ul>";

				const frontmatter = {"title":"Visual Studio Code","description":"轻量但强大的编辑器，是 AI 编程与文档撰写的工作台"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/preparations/visual-studio-code.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 官方地址\r\n\r\n- 下载：`https://code.visualstudio.com/`\r\n- 市场：`https://marketplace.visualstudio.com/vscode`\r\n\r\n## 安装（小白版）\r\n\r\n1. 访问官网下载适配你系统的安装包并安装。\r\n2. 首次启动后，登录账号以同步设置（可选）。\r\n\r\n## 推荐扩展（可粘贴到终端安装）\r\n\r\n```bash\r\ncode --install-extension ms-ceintl.vscode-language-pack-zh-hans\r\ncode --install-extension esbenp.prettier-vscode\r\ncode --install-extension dbaeumer.vscode-eslint\r\ncode --install-extension yzhang.markdown-all-in-one\r\ncode --install-extension eamodio.gitlens\r\ncode --install-extension usernamehw.errorlens\r\ncode --install-extension rangav.vscode-thunder-client\r\n```\r\n\r\n> Windows 如提示 `code` 未识别：在 VS Code 中按 F1 → 输入“Shell Command: Install 'code' command in PATH”。\r\n\r\n## 基本设置建议\r\n\r\n- 统一格式化：开启“保存时格式化”、选择 Prettier 为默认格式化器。\r\n- 终端集成：`Ctrl+~` 打开内置终端，直接运行脚本与 git。\r\n- 同步设置：启用 Settings Sync，在多设备保持一致体验。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"官方地址","text":"官方地址"},{"depth":2,"slug":"安装小白版","text":"安装（小白版）"},{"depth":2,"slug":"推荐扩展可粘贴到终端安装","text":"推荐扩展（可粘贴到终端安装）"},{"depth":2,"slug":"基本设置建议","text":"基本设置建议"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
