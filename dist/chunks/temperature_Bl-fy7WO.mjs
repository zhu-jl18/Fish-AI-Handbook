const id = "01-fish-talks/model-terms/temperature.md";
						const collection = "docs";
						const slug = "01-fish-talks/model-terms/temperature";
						const body = "\r\n# 概念回顾\r\n\r\n温度（temperature）是采样解码中的参数，用来控制输出的随机性。数值越大越“发散”，越小越“保守”。\r\n\r\n## 何时用低温（0~0.3）\r\n\r\n- 有明确对错、可验证：问答、代码、对齐规范的摘要/翻译。\r\n- 希望多次调用结果稳定一致。\r\n\r\n## 何时用中温（0.4~0.7）\r\n\r\n- 需要一定变化但不能太跳：产品文案、一般创作、改写润色。\r\n\r\n## 何时用高温（0.8~1.2）\r\n\r\n- 强创意：标题脑暴、故事初稿、探索不同表述。\r\n\r\n## 与 top_p/top_k 的关系\r\n\r\n- 三者都影响采样分布。初学者可以固定 `top_p=1` 或 `top_k=0`，只调温度，避免相互影响带来的不确定性。\r\n\r\n## 小贴士\r\n\r\n- 温度不是越高越好：需要格式/结构时先降温，并提供模板或示例。\r\n- 不同模型对温度的敏感度不同，按任务逐步微调。\r\n";
						const data = {title:"温度",description:"温度控制输出的随机性：何时用低温、何时用中高温"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/model-terms/temperature.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
