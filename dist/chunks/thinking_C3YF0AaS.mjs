import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h1 id=\"思考thinking是什么\">思考（Thinking）是什么</h1>\n<p>这里的”思考”通常指模型在给出最终答案前的中间推理过程。不同厂商可能提供”显式”或”隐式”思考：显式会把推理轨迹以文本返回，隐式只在内部进行。</p>\n<h2 id=\"思维链cot与可控思考\">思维链（CoT）与可控思考</h2>\n<ul>\n<li><strong>CoT</strong>：通过”请逐步思考/请分步骤推理”等提示，让模型写出中间步骤，通常能提升复杂推理能力。</li>\n<li><strong>可控思考</strong>：限定推理的格式与边界，如”先列假设→再计算→最后结论”，避免跑题。</li>\n</ul>\n<h2 id=\"隐式思考与安全\">隐式思考与安全</h2>\n<ul>\n<li>部分模型在服务端进行隐式推理，不把过程泄露给客户端，安全性更好。</li>\n<li>若需要可验证性，可要求输出”思考摘要”而非全部细节。</li>\n</ul>\n<h2 id=\"提示词写法与建议\">提示词写法与建议</h2>\n<ul>\n<li>为复杂题设定”步骤模板”和”检查清单”，并要求最终只输出结论部分。</li>\n<li>对代码/数学问题：要求列出关键变量、边界条件、再给出解法与复杂度。</li>\n<li>限制篇幅：如”每步不超过 30 字”，既控 token 又控离题率。</li>\n</ul>";

				const frontmatter = {"title":"思考","description":"介绍思维链、隐式推理与可控思考等概念"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/model-terms/thinking.md";
				const url = undefined;
				function rawContent() {
					return "\r\n# 思考（Thinking）是什么\r\n\r\n这里的\"思考\"通常指模型在给出最终答案前的中间推理过程。不同厂商可能提供\"显式\"或\"隐式\"思考：显式会把推理轨迹以文本返回，隐式只在内部进行。\r\n\r\n## 思维链（CoT）与可控思考\r\n\r\n- **CoT**：通过\"请逐步思考/请分步骤推理\"等提示，让模型写出中间步骤，通常能提升复杂推理能力。\r\n- **可控思考**：限定推理的格式与边界，如\"先列假设→再计算→最后结论\"，避免跑题。\r\n\r\n## 隐式思考与安全\r\n\r\n- 部分模型在服务端进行隐式推理，不把过程泄露给客户端，安全性更好。\r\n- 若需要可验证性，可要求输出\"思考摘要\"而非全部细节。\r\n\r\n## 提示词写法与建议\r\n\r\n- 为复杂题设定\"步骤模板\"和\"检查清单\"，并要求最终只输出结论部分。\r\n- 对代码/数学问题：要求列出关键变量、边界条件、再给出解法与复杂度。\r\n- 限制篇幅：如\"每步不超过 30 字\"，既控 token 又控离题率。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"思考thinking是什么","text":"思考（Thinking）是什么"},{"depth":2,"slug":"思维链cot与可控思考","text":"思维链（CoT）与可控思考"},{"depth":2,"slug":"隐式思考与安全","text":"隐式思考与安全"},{"depth":2,"slug":"提示词写法与建议","text":"提示词写法与建议"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
