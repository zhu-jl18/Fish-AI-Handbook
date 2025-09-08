import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"为什么需要它\">为什么需要它</h2>\n<ul>\n<li>许多模型相关能力通过命令行提供（如 SDK、脚手架、部署/日志/调试工具）。</li>\n<li>统一的终端让你在同一个界面管理多标签/多任务，提高效率。</li>\n</ul>\n<h2 id=\"官方地址\">官方地址</h2>\n<ul>\n<li>Microsoft Store：<code>https://aka.ms/terminal</code></li>\n<li>GitHub Releases：<code>https://github.com/microsoft/terminal</code></li>\n</ul>\n<h2 id=\"安装步骤小白版\">安装步骤（小白版）</h2>\n<ol>\n<li>打开 Microsoft Store，搜索“Windows Terminal”，点击安装。</li>\n<li>同时安装 PowerShell 7（建议）：<code>https://aka.ms/PowerShell</code></li>\n<li>安装 Git（带 Git Bash 与凭证管理）：<code>https://git-scm.com/download/win</code></li>\n<li>安装 Nerd Font 字体（可选，美观对齐）：<code>https://www.nerdfonts.com/</code></li>\n</ol>\n<h2 id=\"基本配置\">基本配置</h2>\n<ul>\n<li>打开设置 → 外观：选择已安装的 Nerd Font。</li>\n<li>启动方式改为“默认打开 PowerShell 7”。</li>\n<li>常用快捷键：</li>\n</ul>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"text\"><code><span class=\"line\"><span>Ctrl+Shift+T  新建标签</span></span>\n<span class=\"line\"><span>Ctrl+Shift+W  关闭标签</span></span>\n<span class=\"line\"><span>Alt+Shift+D   分屏</span></span>\n<span class=\"line\"><span>Ctrl+Shift+F  搜索</span></span>\n<span class=\"line\"><span></span></span></code></pre>\n<h2 id=\"验证命令可直接粘贴\">验证命令（可直接粘贴）</h2>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"powershell\"><code><span class=\"line\"><span style=\"color:#E1E4E8\">pwsh </span><span style=\"color:#F97583\">-</span><span style=\"color:#E1E4E8\">v</span></span>\n<span class=\"line\"><span style=\"color:#79B8FF\">$PSVersionTable</span><span style=\"color:#E1E4E8\">.PSVersion</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">winget </span><span style=\"color:#F97583\">--</span><span style=\"color:#E1E4E8\">version</span></span>\n<span class=\"line\"><span style=\"color:#F97583\">where</span><span style=\"color:#E1E4E8\"> git</span></span>\n<span class=\"line\"></span></code></pre>\n<blockquote>\n<p>看到版本号即说明安装成功；若失败，优先用 Microsoft Store/winget 重新安装。</p>\n</blockquote>";

				const frontmatter = {"title":"Windows Terminal","description":"统一的命令行入口，方便使用各类 CLI 工具（如模型SDK、部署脚本）"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/preparations/windows-terminal.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 为什么需要它\r\n\r\n- 许多模型相关能力通过命令行提供（如 SDK、脚手架、部署/日志/调试工具）。\r\n- 统一的终端让你在同一个界面管理多标签/多任务，提高效率。\r\n\r\n## 官方地址\r\n\r\n- Microsoft Store：`https://aka.ms/terminal`\r\n- GitHub Releases：`https://github.com/microsoft/terminal`\r\n\r\n## 安装步骤（小白版）\r\n\r\n1. 打开 Microsoft Store，搜索“Windows Terminal”，点击安装。\r\n2. 同时安装 PowerShell 7（建议）：`https://aka.ms/PowerShell`\r\n3. 安装 Git（带 Git Bash 与凭证管理）：`https://git-scm.com/download/win`\r\n4. 安装 Nerd Font 字体（可选，美观对齐）：`https://www.nerdfonts.com/`\r\n\r\n## 基本配置\r\n\r\n- 打开设置 → 外观：选择已安装的 Nerd Font。\r\n- 启动方式改为“默认打开 PowerShell 7”。\r\n- 常用快捷键：\r\n\r\n```text\r\nCtrl+Shift+T  新建标签\r\nCtrl+Shift+W  关闭标签\r\nAlt+Shift+D   分屏\r\nCtrl+Shift+F  搜索\r\n```\r\n\r\n## 验证命令（可直接粘贴）\r\n\r\n```powershell\r\npwsh -v\r\n$PSVersionTable.PSVersion\r\nwinget --version\r\nwhere git\r\n```\r\n\r\n> 看到版本号即说明安装成功；若失败，优先用 Microsoft Store/winget 重新安装。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"为什么需要它","text":"为什么需要它"},{"depth":2,"slug":"官方地址","text":"官方地址"},{"depth":2,"slug":"安装步骤小白版","text":"安装步骤（小白版）"},{"depth":2,"slug":"基本配置","text":"基本配置"},{"depth":2,"slug":"验证命令可直接粘贴","text":"验证命令（可直接粘贴）"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
