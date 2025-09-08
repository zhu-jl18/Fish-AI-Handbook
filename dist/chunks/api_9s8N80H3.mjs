const id = "01-fish-talks/glossary/api.md";
						const collection = "docs";
						const slug = "01-fish-talks/glossary/api";
						const body = "\r\n# 为什么要懂 API\r\n\r\n- **把模型接入真实应用**：不掌握 API，就只能在网页聊天；会用 API 才能做自动化、批处理、私有化与生产化。\r\n- **控制成本与体验**：API 级别能精细控制参数、超时、重试、流式、并发与缓存，直接影响费用和用户体验。\r\n- **拼装能力**：API 让你把模型与数据库、向量检索、队列、存储、监控拼在一起，做真正的 AI 系统。\r\n\r\n## 常见形态\r\n\r\n- REST/JSON（最主流）：`POST /v1/chat/completions`，简单、通用。\r\n- SSE 流式：在响应头 `text/event-stream` 下逐片推送，适合长文本与实时性。\r\n- WebSocket：需要双向通信时使用，如协同编辑、语音/多模态流。\r\n\r\n## 关键参数（以对话接口为例）\r\n\r\n- `model`：选择具体模型与上下文长度。\r\n- `messages`：系统/用户/助手 角色组成的对话历史。\r\n- `temperature`、`top_p`：控制随机性与多样性。\r\n- `stream`：是否启用流式返回。\r\n- `tools`/`function_call`：工具调用（函数/检索/执行器）。\r\n\r\n## 健壮性与成本\r\n\r\n- **超时与重试**：为长文本设置更大的超时；对可重入请求做指数退避重试。\r\n- **幂等与缓存**：请求指纹+结果缓存可降本提速（注意脱敏）。\r\n- **日志与审计**：记录提示、响应、耗时、token 用量，便于回放与优化。\r\n\r\n## 最小示例（伪代码）\r\n\r\n```ts\r\nconst res = await fetch(\"/v1/chat/completions\", {\r\n  method: \"POST\",\r\n  headers: { \"Authorization\": `Bearer ${API_KEY}`, \"Content-Type\": \"application/json\" },\r\n  body: JSON.stringify({\r\n    model: \"gpt-4o-mini\",\r\n    messages: [\r\n      { role: \"system\", content: \"你是助理\" },\r\n      { role: \"user\", content: \"帮我总结这段文本\" }\r\n    ],\r\n    temperature: 0.2,\r\n    stream: true\r\n  })\r\n});\r\n```\r\n\r\n> 结论：会 API，你才能把“会用模型”升级为“会做 AI 应用”。\r\n";
						const data = {title:"API",description:"API 是服务之间的调用契约，是把大模型接入到产品中的第一步"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/glossary/api.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
