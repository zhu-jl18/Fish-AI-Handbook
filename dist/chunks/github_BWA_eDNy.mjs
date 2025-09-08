import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"官方地址\">官方地址</h2>\n<ul>\n<li><code>https://github.com/</code></li>\n</ul>\n<h2 id=\"安装与配置小白版\">安装与配置（小白版）</h2>\n<ol>\n<li>安装 Git：<code>https://git-scm.com/downloads</code></li>\n<li>生成 SSH Key（PowerShell 可粘贴）：</li>\n</ol>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"powershell\"><code><span class=\"line\"><span style=\"color:#E1E4E8\">ssh</span><span style=\"color:#F97583\">-</span><span style=\"color:#E1E4E8\">keygen </span><span style=\"color:#F97583\">-</span><span style=\"color:#E1E4E8\">t ed25519 </span><span style=\"color:#F97583\">-</span><span style=\"color:#E1E4E8\">C </span><span style=\"color:#9ECBFF\">\"you@example.com\"</span></span>\n<span class=\"line\"><span style=\"color:#E1E4E8\">cat $</span><span style=\"color:#79B8FF\">env:</span><span style=\"color:#E1E4E8\">USERPROFILE\\.ssh\\id_ed25519.pub</span></span>\n<span class=\"line\"></span></code></pre>\n<ol start=\"3\">\n<li>复制公钥到 GitHub → Settings → SSH and GPG keys → New SSH key。</li>\n<li>设置用户名与邮箱：</li>\n</ol>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"bash\"><code><span class=\"line\"><span style=\"color:#B392F0\">git</span><span style=\"color:#9ECBFF\"> config</span><span style=\"color:#79B8FF\"> --global</span><span style=\"color:#9ECBFF\"> user.name</span><span style=\"color:#9ECBFF\"> \"Your Name\"</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">git</span><span style=\"color:#9ECBFF\"> config</span><span style=\"color:#79B8FF\"> --global</span><span style=\"color:#9ECBFF\"> user.email</span><span style=\"color:#9ECBFF\"> \"you@example.com\"</span></span>\n<span class=\"line\"></span></code></pre>\n<h2 id=\"基本流程\">基本流程</h2>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"bash\"><code><span class=\"line\"><span style=\"color:#6A737D\"># 克隆</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">git</span><span style=\"color:#9ECBFF\"> clone</span><span style=\"color:#9ECBFF\"> git@github.com:owner/repo.git</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\"># 创建分支</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">git</span><span style=\"color:#9ECBFF\"> checkout</span><span style=\"color:#79B8FF\"> -b</span><span style=\"color:#9ECBFF\"> feature/your-topic</span></span>\n<span class=\"line\"><span style=\"color:#6A737D\"># 提交并推送</span></span>\n<span class=\"line\"><span style=\"color:#B392F0\">git</span><span style=\"color:#9ECBFF\"> add</span><span style=\"color:#9ECBFF\"> .</span><span style=\"color:#E1E4E8\"> &#x26;&#x26; </span><span style=\"color:#B392F0\">git</span><span style=\"color:#9ECBFF\"> commit</span><span style=\"color:#79B8FF\"> -m</span><span style=\"color:#9ECBFF\"> \"feat: your change\"</span><span style=\"color:#E1E4E8\"> &#x26;&#x26; </span><span style=\"color:#B392F0\">git</span><span style=\"color:#9ECBFF\"> push</span><span style=\"color:#79B8FF\"> -u</span><span style=\"color:#9ECBFF\"> origin</span><span style=\"color:#9ECBFF\"> HEAD</span></span>\n<span class=\"line\"></span></code></pre>\n<blockquote>\n<p>PR、Code Review 与 Actions 自动化是团队协作的关键。</p>\n</blockquote>";

				const frontmatter = {"title":"GitHub","description":"代码托管、协作与自动化的中心"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/preparations/github.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 官方地址\r\n\r\n- `https://github.com/`\r\n\r\n## 安装与配置（小白版）\r\n\r\n1. 安装 Git：`https://git-scm.com/downloads`\r\n2. 生成 SSH Key（PowerShell 可粘贴）：\r\n\r\n```powershell\r\nssh-keygen -t ed25519 -C \"you@example.com\"\r\ncat $env:USERPROFILE\\.ssh\\id_ed25519.pub\r\n```\r\n\r\n3. 复制公钥到 GitHub → Settings → SSH and GPG keys → New SSH key。\r\n4. 设置用户名与邮箱：\r\n\r\n```bash\r\ngit config --global user.name \"Your Name\"\r\ngit config --global user.email \"you@example.com\"\r\n```\r\n\r\n## 基本流程\r\n\r\n```bash\r\n# 克隆\r\ngit clone git@github.com:owner/repo.git\r\n# 创建分支\r\ngit checkout -b feature/your-topic\r\n# 提交并推送\r\ngit add . && git commit -m \"feat: your change\" && git push -u origin HEAD\r\n```\r\n\r\n> PR、Code Review 与 Actions 自动化是团队协作的关键。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"官方地址","text":"官方地址"},{"depth":2,"slug":"安装与配置小白版","text":"安装与配置（小白版）"},{"depth":2,"slug":"基本流程","text":"基本流程"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
