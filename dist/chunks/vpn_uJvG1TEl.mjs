const id = "01-fish-talks/preparations/vpn.md";
						const collection = "docs";
						const slug = "01-fish-talks/preparations/vpn";
						const body = "\r\n## 为什么需要\r\n\r\n- 访问模型供应商控制台、API 端点与依赖下载需要稳定国际出口。\r\n- 没有连通，任何提示词与架构都无法落地。\r\n\r\n## 提示\r\n\r\n- 选择合规可信的服务商。客户端示例：Clash/Clash Verge/Surge/Shadowrocket（按平台自选）。\r\n- 为系统与命令行配置代理（HTTP/HTTPS/SOCKS）。\r\n\r\n## 常用检查命令（可粘贴）\r\n\r\n```bash\r\n# 查看出口IP\r\ncurl ifconfig.me\r\n# DNS/延迟定位\r\ntestdns.google\r\nping api.openai.com\r\ntracert api.anthropic.com\r\n```\r\n\r\n> Windows 用户也可在“Internet 选项”中设置系统代理；包管理器（npm、git、curl）可单独配置代理。\r\n";
						const data = {title:"VPN/代理",description:"稳定连通国外模型与生态依赖的前提"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/preparations/vpn.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
