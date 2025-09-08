const id = "04-advanced-techniques/knowledge-bases/index.md";
						const collection = "docs";
						const slug = "04-advanced-techniques/knowledge-bases";
						const body = "\r\n## 什么是知识库？\r\n\r\n在 AI 应用的上下文中，**知识库 (Knowledge Base)** 是指一个结构化或非结构化的、可供机器读取和检索的信息集合。它扮演着 AI 系统的“外部大脑”或“长期记忆”的角色，为其提供特定领域、私有或实时更新的知识，从而弥补预训练大语言模型（LLM）自身知识的不足。\r\n\r\n我们之前在 RAG (检索增强生成) 中提到的“外部知识源”，就是一个典型的知识库应用。\r\n\r\n## 为什么知识库如此重要？\r\n\r\n1.  **克服知识时效性问题**：LLM 的知识是静态的，停留在其训练截止日期。知识库可以随时更新，为 AI 提供最新的信息。\r\n2.  **实现领域专业化**：您可以构建一个包含特定行业（如法律、医疗、金融）或企业内部（如产品文档、规章制度）知识的知识库，让 AI 成为该领域的专家。\r\n3.  **提高事实准确性，减少幻觉**：通过 RAG 等技术，AI 的回答被“锚定”在知识库提供的具体内容上，而不是凭空捏造，这大大提高了回答的可靠性。\r\n4.  **保障数据隐私**：敏感的私有数据可以存储在本地或私有云的知识库中，无需用其对 LLM 本身进行微调，从而降低了数据泄露的风险。\r\n\r\n## 知识库的类型\r\n\r\n知识库可以有多种形式，常见的包括：\r\n\r\n-   **文档集合 (Document Collections)**：\r\n    这是最常见的形式，由一系列文档（如 PDF, Word, HTML, Markdown 文件）组成。通常需要与向量数据库结合使用，以实现高效的语义检索。\r\n-   **结构化数据库 (Structured Databases)**：\r\n    传统的 SQL 或 NoSQL 数据库也可以作为知识库。AI Agent 可以通过生成查询语句（如 SQL 查询）来从中获取精确信息。\r\n-   **知识图谱 (Knowledge Graphs)**：\r\n    一种更高级的形式，它以“实体-关系-实体”的图结构来存储信息。知识图谱能让 AI 更好地理解实体间的复杂关系，进行更深度的推理。\r\n\r\n## 如何构建一个知识库？\r\n\r\n构建一个基于文档的知识库，通常遵循我们在 [RAG 工作原理解析](./../how-rag-works) 中详细描述的**数据索引流程**：\r\n\r\n1.  **加载 (Load)**：从不同数据源加载原始文档。\r\n2.  **分割 (Split)**：将文档分割成合适的文本块。\r\n3.  **嵌入 (Embed)**：将文本块转换为向量表示。\r\n4.  **存储 (Store)**：将向量存入向量数据库。\r\n\r\n选择合适的知识库类型和构建方法，取决于您的具体应用场景和数据特点。一个设计良好的知识库，是打造强大、可靠 AI 应用的关键一步。\r\n";
						const data = {title:"知识库 (Knowledge Bases)",description:"理解什么是知识库，以及如何构建和利用它们来增强 AI 应用。"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/04-advanced-techniques/knowledge-bases/index.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
