const id = "01-fish-talks/preparations/nodejs.md";
						const collection = "docs";
						const slug = "01-fish-talks/preparations/nodejs";
						const body = "\r\n## 官方地址\r\n\r\n- Node.js：`https://nodejs.org/`\r\n- Volta：`https://volta.sh/`（便捷的版本管理）\r\n- nvm-windows：`https://github.com/coreybutler/nvm-windows`\r\n\r\n## 安装（小白版）\r\n\r\n- 最简单：去 Node.js 官网下载 LTS 安装包，下一步到完成。\r\n- 想要多版本管理（推荐其一）：\r\n\r\n```powershell\r\n# 方案A：Volta（推荐、简单稳定）\r\nInvoke-WebRequest https://get.volta.sh -UseBasicParsing | pwsh\r\nvolta install node@lts\r\n\r\n# 方案B：nvm-windows\r\nwinget install CoreyButler.NVMforWindows\r\nnvm install lts\r\nnvm use lts\r\n```\r\n\r\n## 验证（可粘贴）\r\n\r\n```bash\r\nnode -v\r\nnpm -v\r\nnpx -v\r\n```\r\n\r\n## 包管理与脚手架\r\n\r\n- 初学用 npm 即可；需要更快可用 pnpm：\r\n\r\n```bash\r\nnpm i -g pnpm\r\npnpm -v\r\n```\r\n\r\n- 常见脚手架：`npm create astro@latest`、`npm create vite@latest`。\r\n\r\n## 小提示\r\n\r\n- 使用 `.env` 与 `dotenv` 读取环境变量；Windows 下可用 `cross-env` 兼容设置。\r\n";
						const data = {title:"Node.js",description:"前后端脚手架与大量 LLM SDK 的共同运行时"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/preparations/nodejs.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
