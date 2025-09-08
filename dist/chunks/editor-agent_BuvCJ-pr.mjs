import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"为什么\">为什么</h2>\n<ul>\n<li>把上下文、代码搜索、重构与测试整合在一个工作台</li>\n</ul>\n<h2 id=\"做法\">做法</h2>\n<ul>\n<li>安装 AI 扩展并配置密钥/代理</li>\n<li>约定“代码风格/注释/提交信息”模板</li>\n<li>用对话驱动改动：小步提交、随改随跑</li>\n</ul>\n<h2 id=\"建议\">建议</h2>\n<ul>\n<li>让 AI 先给方案与目录变更清单，再执行</li>\n<li>提交前自动跑 lint/test，回归失败就收窄改动范围</li>\n</ul>";

				const frontmatter = {"title":"智能代码编辑器（Agent 集成）","description":"在 IDE 中用 AI 作为长期上下文的结对伙伴"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/02-basic-usage/editor-agent.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 为什么\r\n\r\n- 把上下文、代码搜索、重构与测试整合在一个工作台\r\n\r\n## 做法\r\n\r\n- 安装 AI 扩展并配置密钥/代理\r\n- 约定“代码风格/注释/提交信息”模板\r\n- 用对话驱动改动：小步提交、随改随跑\r\n\r\n## 建议\r\n\r\n- 让 AI 先给方案与目录变更清单，再执行\r\n- 提交前自动跑 lint/test，回归失败就收窄改动范围\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"为什么","text":"为什么"},{"depth":2,"slug":"做法","text":"做法"},{"depth":2,"slug":"建议","text":"建议"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
