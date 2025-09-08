const id = "01-fish-talks/glossary/env.md";
						const collection = "docs";
						const slug = "01-fish-talks/glossary/env";
						const body = "\r\n# 为什么要用环境变量\r\n\r\n- **安全**：API Key 等敏感信息不应硬编码在仓库；放在系统环境或密钥管理器里更安全。\r\n- **多环境**：本地/测试/生产用不同变量即可切换，无需改代码。\r\n- **自动化**：CI/CD 中通过变量注入构建与部署配置。\r\n\r\n## 常见做法\r\n\r\n- `.env` 文件 + `.gitignore` 忽略；生产改用平台密钥管理（如 Vercel/Netlify/云厂商 KMS）。\r\n- 使用 `process.env.VAR_NAME`（Node）或平台提供的注入机制读取。\r\n- 结合 Schema 校验（如 `zod`）在启动时校验缺失或格式错误。\r\n\r\n## 最佳实践\r\n\r\n- 变量名语义化：`MODEL_API_KEY`、`VECTOR_DB_URL`。\r\n- 提供 `.env.example` 方便他人起步。\r\n- 避免在客户端暴露敏感变量，前端改走后端代理。\r\n";
						const data = {title:"环境变量",description:"环境变量是部署和本地开发时存放密钥与配置的标准方式"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/glossary/env.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
