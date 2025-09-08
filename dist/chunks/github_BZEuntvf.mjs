const id = "01-fish-talks/preparations/github.md";
						const collection = "docs";
						const slug = "01-fish-talks/preparations/github";
						const body = "\r\n## 官方地址\r\n\r\n- `https://github.com/`\r\n\r\n## 安装与配置（小白版）\r\n\r\n1. 安装 Git：`https://git-scm.com/downloads`\r\n2. 生成 SSH Key（PowerShell 可粘贴）：\r\n\r\n```powershell\r\nssh-keygen -t ed25519 -C \"you@example.com\"\r\ncat $env:USERPROFILE\\.ssh\\id_ed25519.pub\r\n```\r\n\r\n3. 复制公钥到 GitHub → Settings → SSH and GPG keys → New SSH key。\r\n4. 设置用户名与邮箱：\r\n\r\n```bash\r\ngit config --global user.name \"Your Name\"\r\ngit config --global user.email \"you@example.com\"\r\n```\r\n\r\n## 基本流程\r\n\r\n```bash\r\n# 克隆\r\ngit clone git@github.com:owner/repo.git\r\n# 创建分支\r\ngit checkout -b feature/your-topic\r\n# 提交并推送\r\ngit add . && git commit -m \"feat: your change\" && git push -u origin HEAD\r\n```\r\n\r\n> PR、Code Review 与 Actions 自动化是团队协作的关键。\r\n";
						const data = {title:"GitHub",description:"代码托管、协作与自动化的中心"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/preparations/github.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
