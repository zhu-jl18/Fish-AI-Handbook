import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"为什么重要\">为什么重要</h2>\n<ul>\n<li>单次对话不等于产品；需要流程化来保证可重复与可回溯。</li>\n</ul>\n<h2 id=\"典型流程\">典型流程</h2>\n<ol>\n<li>解析需求 → 结构化任务</li>\n<li>检索/载入相关知识（RAG）</li>\n<li>调用模型生成初稿（可并行）</li>\n<li>审核与修订（人/模型）</li>\n<li>产出入库与通知</li>\n</ol>\n<h2 id=\"实现方式\">实现方式</h2>\n<ul>\n<li>代码编排：LangChain/LangGraph/自研状态机</li>\n<li>任务编排：Airflow/Temporal/Argo Workflows</li>\n<li>低代码：Zapier/Make + 自建代理</li>\n</ul>\n<h2 id=\"治理\">治理</h2>\n<ul>\n<li>观察每一步的耗时、token、失败率。</li>\n<li>提供重跑与断点续跑能力。</li>\n<li>版本化 Prompt 与流程图，保证可回溯。</li>\n</ul>";

				const frontmatter = {"title":"Workflow（工作流）","description":"把人、模型与工具编排成可复用的流程，保证稳定可维护"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/advanced-concepts/workflow.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 为什么重要\r\n\r\n- 单次对话不等于产品；需要流程化来保证可重复与可回溯。\r\n\r\n## 典型流程\r\n\r\n1. 解析需求 → 结构化任务\r\n2. 检索/载入相关知识（RAG）\r\n3. 调用模型生成初稿（可并行）\r\n4. 审核与修订（人/模型）\r\n5. 产出入库与通知\r\n\r\n## 实现方式\r\n\r\n- 代码编排：LangChain/LangGraph/自研状态机\r\n- 任务编排：Airflow/Temporal/Argo Workflows\r\n- 低代码：Zapier/Make + 自建代理\r\n\r\n## 治理\r\n\r\n- 观察每一步的耗时、token、失败率。\r\n- 提供重跑与断点续跑能力。\r\n- 版本化 Prompt 与流程图，保证可回溯。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"为什么重要","text":"为什么重要"},{"depth":2,"slug":"典型流程","text":"典型流程"},{"depth":2,"slug":"实现方式","text":"实现方式"},{"depth":2,"slug":"治理","text":"治理"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
