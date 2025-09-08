import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"为什么重要\">为什么重要</h2>\n<ul>\n<li>从“单次回答”进化到“多步完成任务”，如查资料→调用工具→汇总报告。</li>\n<li>让 AI 按目标自主决策，减少人工盯着一步步操作。</li>\n</ul>\n<h2 id=\"核心组件\">核心组件</h2>\n<ul>\n<li><strong>感知</strong>：读取环境/文档/接口状态。</li>\n<li><strong>规划</strong>：把目标拆解为步骤（Planner）。</li>\n<li><strong>执行</strong>：调用工具/代码（Tool/Executor）。</li>\n<li><strong>反思</strong>：评估输出并自我修正（Reflector）。</li>\n</ul>\n<h2 id=\"何时使用\">何时使用</h2>\n<ul>\n<li>任务步骤明确但数量多；或环境状态经常变化。</li>\n<li>需要结合多个外部系统（搜索、数据库、第三方 API）。</li>\n</ul>\n<h2 id=\"风险与治理\">风险与治理</h2>\n<ul>\n<li>循环与耗费：设定最大步数、预算与超时。</li>\n<li>安全：限制工具权限与输出过滤。</li>\n<li>观测：记录每步思考、调用与结果，便于回放。</li>\n</ul>";

				const frontmatter = {"title":"Agent（智能体）","description":"可感知、可计划、可执行与可反思的自治式 AI 组件"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/advanced-concepts/agent.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 为什么重要\r\n\r\n- 从“单次回答”进化到“多步完成任务”，如查资料→调用工具→汇总报告。\r\n- 让 AI 按目标自主决策，减少人工盯着一步步操作。\r\n\r\n## 核心组件\r\n\r\n- **感知**：读取环境/文档/接口状态。\r\n- **规划**：把目标拆解为步骤（Planner）。\r\n- **执行**：调用工具/代码（Tool/Executor）。\r\n- **反思**：评估输出并自我修正（Reflector）。\r\n\r\n## 何时使用\r\n\r\n- 任务步骤明确但数量多；或环境状态经常变化。\r\n- 需要结合多个外部系统（搜索、数据库、第三方 API）。\r\n\r\n## 风险与治理\r\n\r\n- 循环与耗费：设定最大步数、预算与超时。\r\n- 安全：限制工具权限与输出过滤。\r\n- 观测：记录每步思考、调用与结果，便于回放。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"为什么重要","text":"为什么重要"},{"depth":2,"slug":"核心组件","text":"核心组件"},{"depth":2,"slug":"何时使用","text":"何时使用"},{"depth":2,"slug":"风险与治理","text":"风险与治理"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
