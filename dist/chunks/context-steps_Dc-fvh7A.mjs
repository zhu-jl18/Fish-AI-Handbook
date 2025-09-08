import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h1 id=\"什么是上下文步数\">什么是上下文步数</h1>\n<p>上下文步数通常指在一个会话中，模型能”记住”的对话轮次或推理步骤数量。它受到模型的上下文窗口大小（context window）和计算资源限制。</p>\n<h2 id=\"上下文窗口与记忆\">上下文窗口与记忆</h2>\n<ul>\n<li><strong>上下文窗口</strong>：模型单次处理的最大 token 数量（如 4k、32k、200k）</li>\n<li><strong>多轮对话</strong>：每轮的用户输入+助手输出都会累积在上下文中</li>\n<li><strong>记忆衰减</strong>：当达到窗口上限时，最早的对话内容会被”遗忘”</li>\n</ul>\n<h2 id=\"步数限制的影响\">步数限制的影响</h2>\n<ul>\n<li><strong>短窗口模型</strong>：只能进行几轮深度对话，适合单次问答</li>\n<li><strong>长窗口模型</strong>：可以维持几十轮对话，支持复杂的多步推理</li>\n<li><strong>无限对话</strong>：需要应用层实现摘要、检索或分片策略</li>\n</ul>\n<h2 id=\"管理策略\">管理策略</h2>\n<ul>\n<li><strong>关键信息置顶</strong>：把重要的背景信息放在对话开始</li>\n<li><strong>定期摘要</strong>：每隔几轮对话，让模型总结重要信息</li>\n<li><strong>分段处理</strong>：把复杂任务拆分成多个独立的短对话</li>\n<li><strong>检索增强</strong>：结合向量数据库，动态加载相关历史信息</li>\n</ul>\n<h2 id=\"实用建议\">实用建议</h2>\n<ul>\n<li>监控当前上下文使用情况，避免突然”失忆”</li>\n<li>对于长期项目，建立外部的知识库和记忆系统</li>\n<li>利用模型的”总结能力”来压缩历史对话</li>\n</ul>";

				const frontmatter = {"title":"上下文步数","description":"介绍多轮上下文、窗口大小与步数限制的意义"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/model-terms/context-steps.md";
				const url = undefined;
				function rawContent() {
					return "\r\n# 什么是上下文步数\r\n\r\n上下文步数通常指在一个会话中，模型能\"记住\"的对话轮次或推理步骤数量。它受到模型的上下文窗口大小（context window）和计算资源限制。\r\n\r\n## 上下文窗口与记忆\r\n\r\n- **上下文窗口**：模型单次处理的最大 token 数量（如 4k、32k、200k）\r\n- **多轮对话**：每轮的用户输入+助手输出都会累积在上下文中\r\n- **记忆衰减**：当达到窗口上限时，最早的对话内容会被\"遗忘\"\r\n\r\n## 步数限制的影响\r\n\r\n- **短窗口模型**：只能进行几轮深度对话，适合单次问答\r\n- **长窗口模型**：可以维持几十轮对话，支持复杂的多步推理\r\n- **无限对话**：需要应用层实现摘要、检索或分片策略\r\n\r\n## 管理策略\r\n\r\n- **关键信息置顶**：把重要的背景信息放在对话开始\r\n- **定期摘要**：每隔几轮对话，让模型总结重要信息\r\n- **分段处理**：把复杂任务拆分成多个独立的短对话\r\n- **检索增强**：结合向量数据库，动态加载相关历史信息\r\n\r\n## 实用建议\r\n\r\n- 监控当前上下文使用情况，避免突然\"失忆\"\r\n- 对于长期项目，建立外部的知识库和记忆系统\r\n- 利用模型的\"总结能力\"来压缩历史对话\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"什么是上下文步数","text":"什么是上下文步数"},{"depth":2,"slug":"上下文窗口与记忆","text":"上下文窗口与记忆"},{"depth":2,"slug":"步数限制的影响","text":"步数限制的影响"},{"depth":2,"slug":"管理策略","text":"管理策略"},{"depth":2,"slug":"实用建议","text":"实用建议"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
