const id = "01-fish-talks/advanced-concepts/workflow.md";
						const collection = "docs";
						const slug = "01-fish-talks/advanced-concepts/workflow";
						const body = "\r\n## 为什么重要\r\n\r\n- 单次对话不等于产品；需要流程化来保证可重复与可回溯。\r\n\r\n## 典型流程\r\n\r\n1. 解析需求 → 结构化任务\r\n2. 检索/载入相关知识（RAG）\r\n3. 调用模型生成初稿（可并行）\r\n4. 审核与修订（人/模型）\r\n5. 产出入库与通知\r\n\r\n## 实现方式\r\n\r\n- 代码编排：LangChain/LangGraph/自研状态机\r\n- 任务编排：Airflow/Temporal/Argo Workflows\r\n- 低代码：Zapier/Make + 自建代理\r\n\r\n## 治理\r\n\r\n- 观察每一步的耗时、token、失败率。\r\n- 提供重跑与断点续跑能力。\r\n- 版本化 Prompt 与流程图，保证可回溯。\r\n";
						const data = {title:"Workflow（工作流）",description:"把人、模型与工具编排成可复用的流程，保证稳定可维护"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/advanced-concepts/workflow.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
