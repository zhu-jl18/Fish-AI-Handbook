const id = "01-fish-talks/preparations/windows-terminal.md";
						const collection = "docs";
						const slug = "01-fish-talks/preparations/windows-terminal";
						const body = "\r\n## 为什么需要它\r\n\r\n- 许多模型相关能力通过命令行提供（如 SDK、脚手架、部署/日志/调试工具）。\r\n- 统一的终端让你在同一个界面管理多标签/多任务，提高效率。\r\n\r\n## 官方地址\r\n\r\n- Microsoft Store：`https://aka.ms/terminal`\r\n- GitHub Releases：`https://github.com/microsoft/terminal`\r\n\r\n## 安装步骤（小白版）\r\n\r\n1. 打开 Microsoft Store，搜索“Windows Terminal”，点击安装。\r\n2. 同时安装 PowerShell 7（建议）：`https://aka.ms/PowerShell`\r\n3. 安装 Git（带 Git Bash 与凭证管理）：`https://git-scm.com/download/win`\r\n4. 安装 Nerd Font 字体（可选，美观对齐）：`https://www.nerdfonts.com/`\r\n\r\n## 基本配置\r\n\r\n- 打开设置 → 外观：选择已安装的 Nerd Font。\r\n- 启动方式改为“默认打开 PowerShell 7”。\r\n- 常用快捷键：\r\n\r\n```text\r\nCtrl+Shift+T  新建标签\r\nCtrl+Shift+W  关闭标签\r\nAlt+Shift+D   分屏\r\nCtrl+Shift+F  搜索\r\n```\r\n\r\n## 验证命令（可直接粘贴）\r\n\r\n```powershell\r\npwsh -v\r\n$PSVersionTable.PSVersion\r\nwinget --version\r\nwhere git\r\n```\r\n\r\n> 看到版本号即说明安装成功；若失败，优先用 Microsoft Store/winget 重新安装。\r\n";
						const data = {title:"Windows Terminal",description:"统一的命令行入口，方便使用各类 CLI 工具（如模型SDK、部署脚本）"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/preparations/windows-terminal.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
