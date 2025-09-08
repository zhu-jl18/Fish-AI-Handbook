const id = "01-fish-talks/advanced-concepts/agent.md";
						const collection = "docs";
						const slug = "01-fish-talks/advanced-concepts/agent";
						const body = "\r\n## 为什么重要\r\n\r\n- 从“单次回答”进化到“多步完成任务”，如查资料→调用工具→汇总报告。\r\n- 让 AI 按目标自主决策，减少人工盯着一步步操作。\r\n\r\n## 核心组件\r\n\r\n- **感知**：读取环境/文档/接口状态。\r\n- **规划**：把目标拆解为步骤（Planner）。\r\n- **执行**：调用工具/代码（Tool/Executor）。\r\n- **反思**：评估输出并自我修正（Reflector）。\r\n\r\n## 何时使用\r\n\r\n- 任务步骤明确但数量多；或环境状态经常变化。\r\n- 需要结合多个外部系统（搜索、数据库、第三方 API）。\r\n\r\n## 风险与治理\r\n\r\n- 循环与耗费：设定最大步数、预算与超时。\r\n- 安全：限制工具权限与输出过滤。\r\n- 观测：记录每步思考、调用与结果，便于回放。\r\n";
						const data = {title:"Agent（智能体）",description:"可感知、可计划、可执行与可反思的自治式 AI 组件"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/advanced-concepts/agent.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
