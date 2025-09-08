const id = "04-advanced-techniques/rag/index.md";
						const collection = "docs";
						const slug = "04-advanced-techniques/rag";
						const body = "\r\n## 为什么\r\n\r\n- 模型自带知识滞后/易幻觉，RAG 用“外部知识”校正与补充。\r\n\r\n## 什么时候用\r\n\r\n- 领域知识需要频繁更新；\r\n- 结果可被文档引用与验证；\r\n- 不便/不经济做参数高成本微调时。\r\n\r\n## 关键组件\r\n\r\n- 切片与嵌入：分段、清洗、向量化；\r\n- 检索：相似度/混合检索；\r\n- 重写/归并：Query 改写、多段聚合；\r\n- 生成：带来源引用的回答。\r\n\r\n## 常见坑\r\n\r\n- 切得太细或太粗；\r\n- 嵌入维度/模型与任务不匹配；\r\n- 无引用/无可追溯。\r\n\r\n> 一句话：先把数据准备好，再谈模型。\r\n";
						const data = {title:"RAG（检索增强生成）",description:"让模型“带着知识说话”：何时选 RAG、如何搭建与常见陷阱"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/04-advanced-techniques/rag/index.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
