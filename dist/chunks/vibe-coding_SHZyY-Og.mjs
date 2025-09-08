import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"为什么重要\">为什么重要</h2>\n<ul>\n<li><strong>速度</strong>：让 AI 保持上下文与风格一致，快速迭代大段代码/文档。</li>\n<li><strong>质量</strong>：以讨论驱动设计（DDD-like），通过提问与约束让 AI 给出更稳的方案。</li>\n</ul>\n<h2 id=\"关键做法\">关键做法</h2>\n<ul>\n<li>明确“目标/约束/风格/验收标准”，一次性提供。</li>\n<li>用小步提交：让 AI 连续改同一文件块，频繁跑本地校验。</li>\n<li>建立“术语与约定”清单（components/README、glossary），减少反复解释。</li>\n</ul>\n<h2 id=\"适用场景\">适用场景</h2>\n<ul>\n<li>页面搭建、接口胶水、脚本/文档成稿。</li>\n<li>大改动前先让 AI 生成初稿，再人工审校与精修。</li>\n</ul>";

				const frontmatter = {"title":"Vibe Coding（氛围编程）","description":"把 AI 当成结对伙伴，通过连续上下文与高频反馈快速产出"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/advanced-concepts/vibe-coding.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 为什么重要\r\n\r\n- **速度**：让 AI 保持上下文与风格一致，快速迭代大段代码/文档。\r\n- **质量**：以讨论驱动设计（DDD-like），通过提问与约束让 AI 给出更稳的方案。\r\n\r\n## 关键做法\r\n\r\n- 明确“目标/约束/风格/验收标准”，一次性提供。\r\n- 用小步提交：让 AI 连续改同一文件块，频繁跑本地校验。\r\n- 建立“术语与约定”清单（components/README、glossary），减少反复解释。\r\n\r\n## 适用场景\r\n\r\n- 页面搭建、接口胶水、脚本/文档成稿。\r\n- 大改动前先让 AI 生成初稿，再人工审校与精修。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"为什么重要","text":"为什么重要"},{"depth":2,"slug":"关键做法","text":"关键做法"},{"depth":2,"slug":"适用场景","text":"适用场景"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
