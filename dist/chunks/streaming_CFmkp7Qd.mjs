const id = "01-fish-talks/model-terms/streaming.md";
						const collection = "docs";
						const slug = "01-fish-talks/model-terms/streaming";
						const body = "\r\n# 概念回顾\r\n\r\n流式是指模型把生成结果按片段（tokens/chunks）实时推送给客户端；非流式是一次性返回完整结果。\r\n\r\n## 什么时候用流式\r\n\r\n- 需要尽快“看到结果雏形”，降低等待焦虑（长回答、写作/代码生成）。\r\n- 需要支持用户中途打断或边看边改的交互。\r\n- 聊天产品、代码助手、长内容生成与演示类场景。\r\n\r\n## 什么时候用非流式\r\n\r\n- 结果必须完整校验后再展示（对账、票据、结构化 JSON）。\r\n- 返回体量小、快速且需要统一后处理（如严格模板）。\r\n- 批处理/离线任务，由服务端统一写库或发消息。\r\n\r\n## 流式的注意点\r\n\r\n- 前端需要处理 SSE/WebSocket 或 ReadableStream。\r\n- 断线重连与“停止生成”按钮；代码块高亮可延后，减少抖动。\r\n- 统计 token、进度与耗时，提供可观测性。\r\n\r\n## 非流式的注意点\r\n\r\n- 设定合理超时与重试；避免一次返回过大导致超时。\r\n- 大结果建议由后端落库，前端仅取摘要或分页读取。\r\n\r\n> 简单判断：重体验、长内容选“流式”；重正确性、结构化选“非流式”。\r\n";
						const data = {title:"流式传输",description:"何时选择流式/非流式，以及各自的典型应用场景"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/model-terms/streaming.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
