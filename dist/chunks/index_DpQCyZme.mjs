import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"为什么\">为什么</h2>\n<ul>\n<li>模型自带知识滞后/易幻觉，RAG 用“外部知识”校正与补充。</li>\n</ul>\n<h2 id=\"什么时候用\">什么时候用</h2>\n<ul>\n<li>领域知识需要频繁更新；</li>\n<li>结果可被文档引用与验证；</li>\n<li>不便/不经济做参数高成本微调时。</li>\n</ul>\n<h2 id=\"关键组件\">关键组件</h2>\n<ul>\n<li>切片与嵌入：分段、清洗、向量化；</li>\n<li>检索：相似度/混合检索；</li>\n<li>重写/归并：Query 改写、多段聚合；</li>\n<li>生成：带来源引用的回答。</li>\n</ul>\n<h2 id=\"常见坑\">常见坑</h2>\n<ul>\n<li>切得太细或太粗；</li>\n<li>嵌入维度/模型与任务不匹配；</li>\n<li>无引用/无可追溯。</li>\n</ul>\n<blockquote>\n<p>一句话：先把数据准备好，再谈模型。</p>\n</blockquote>";

				const frontmatter = {"title":"RAG（检索增强生成）","description":"让模型“带着知识说话”：何时选 RAG、如何搭建与常见陷阱"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/04-advanced-techniques/rag/index.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 为什么\r\n\r\n- 模型自带知识滞后/易幻觉，RAG 用“外部知识”校正与补充。\r\n\r\n## 什么时候用\r\n\r\n- 领域知识需要频繁更新；\r\n- 结果可被文档引用与验证；\r\n- 不便/不经济做参数高成本微调时。\r\n\r\n## 关键组件\r\n\r\n- 切片与嵌入：分段、清洗、向量化；\r\n- 检索：相似度/混合检索；\r\n- 重写/归并：Query 改写、多段聚合；\r\n- 生成：带来源引用的回答。\r\n\r\n## 常见坑\r\n\r\n- 切得太细或太粗；\r\n- 嵌入维度/模型与任务不匹配；\r\n- 无引用/无可追溯。\r\n\r\n> 一句话：先把数据准备好，再谈模型。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"为什么","text":"为什么"},{"depth":2,"slug":"什么时候用","text":"什么时候用"},{"depth":2,"slug":"关键组件","text":"关键组件"},{"depth":2,"slug":"常见坑","text":"常见坑"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
