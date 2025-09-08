const id = "02-basic-usage/cli.md";
						const collection = "docs";
						const slug = "02-basic-usage/cli";
						const body = "\r\n## 为什么\r\n\r\n- 直接嵌入现有工作流与自动化脚本\r\n\r\n## 常见能力\r\n\r\n- 从文件/管道读取输入\r\n- 流式输出，便于边看边处理\r\n- 与系统命令组合：`cat | grep | jq`\r\n\r\n## 示例片段\r\n\r\n```bash\r\n# 假设有 ai 命令\r\nai -m gpt-4o-mini \"总结本目录代码结构\" | tee summary.md\r\n```\r\n";
						const data = {title:"CLI 工具",description:"把模型能力带到终端与脚本"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/02-basic-usage/cli.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
