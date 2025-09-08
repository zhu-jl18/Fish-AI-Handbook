const id = "01-fish-talks/model-terms/thinking.md";
						const collection = "docs";
						const slug = "01-fish-talks/model-terms/thinking";
						const body = "\r\n# 思考（Thinking）是什么\r\n\r\n这里的\"思考\"通常指模型在给出最终答案前的中间推理过程。不同厂商可能提供\"显式\"或\"隐式\"思考：显式会把推理轨迹以文本返回，隐式只在内部进行。\r\n\r\n## 思维链（CoT）与可控思考\r\n\r\n- **CoT**：通过\"请逐步思考/请分步骤推理\"等提示，让模型写出中间步骤，通常能提升复杂推理能力。\r\n- **可控思考**：限定推理的格式与边界，如\"先列假设→再计算→最后结论\"，避免跑题。\r\n\r\n## 隐式思考与安全\r\n\r\n- 部分模型在服务端进行隐式推理，不把过程泄露给客户端，安全性更好。\r\n- 若需要可验证性，可要求输出\"思考摘要\"而非全部细节。\r\n\r\n## 提示词写法与建议\r\n\r\n- 为复杂题设定\"步骤模板\"和\"检查清单\"，并要求最终只输出结论部分。\r\n- 对代码/数学问题：要求列出关键变量、边界条件、再给出解法与复杂度。\r\n- 限制篇幅：如\"每步不超过 30 字\"，既控 token 又控离题率。\r\n";
						const data = {title:"思考",description:"介绍思维链、隐式推理与可控思考等概念"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/model-terms/thinking.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
