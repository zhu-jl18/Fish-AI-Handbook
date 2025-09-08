import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h1 id=\"为什么要了解-token\">为什么要了解 token</h1>\n<ul>\n<li>关系到费用、速度与是否超出上下文窗口。</li>\n<li>影响提示词设计与拆分策略，决定能否稳定跑长任务。</li>\n</ul>\n<h1 id=\"token-是什么\">token 是什么</h1>\n<p>token 可以理解为模型处理文本时使用的最小单位，类似”字节与字符”的关系。不同模型使用不同的分词器（tokenizer），会把文本切成一个个 token 再进行计算与推理。</p>\n<h2 id=\"如何计算-token\">如何计算 token</h2>\n<ul>\n<li><strong>英文</strong>：大致 <em>4 个字符 ≈ 1 token</em>。例如 <code>hello</code> 可能被分为 <code>hel</code> + <code>lo</code> 两个 token。</li>\n<li><strong>数字/符号</strong>：通常按块切分，如 <code>2025</code>、<code>http</code>、<code>://</code> 可能是不同 token。</li>\n<li><strong>模型差异</strong>：不同模型/版本的分词器不同，同一段文本的 token 数可能略有差异。</li>\n</ul>\n<p>精确计算需使用官方或社区分词器（如 OpenAI tiktoken、Anthropic tokenizer、SentencePiece 等）。</p>\n<h2 id=\"中文与-token-的差异\">中文与 token 的差异</h2>\n<ul>\n<li>中文多为按字或常见词组切分，<strong>1 个汉字通常≈1 个 token</strong>（但并非绝对）。</li>\n<li>中英文夹杂时，标点与空格也会占 token；<strong>Markdown/JSON 等结构字符</strong>同样计入。</li>\n</ul>\n<h2 id=\"上下文长度与费用\">上下文长度与费用</h2>\n<ul>\n<li><strong>上下文长度（context window）</strong>：模型一次可处理的输入+历史+输出 token 总上限。例如 128k/200k 等。</li>\n<li><strong>费用</strong>：大多数供应商按输入 token 与输出 token 分别计费；部分模型还区分”推理/思考”token。</li>\n<li><strong>速度</strong>：token 多意味着推理时间更长、流式返回更慢。</li>\n</ul>\n<h2 id=\"快速估算与示例\">快速估算与示例</h2>\n<p>经验估算：</p>\n<ul>\n<li>英文：<em>字符数 ÷ 4 ≈ token</em>；中文：<em>汉字数 ≈ token</em>。</li>\n<li>段落中若包含大量格式字符（换行、JSON、表格），可再加 10%~30% 余量。</li>\n</ul>\n<p>示例：约 1,000 字的中文文章，token ≈ 1,000～1,300；若加上系统提示与历史对话，很容易超过 2k。</p>\n<h2 id=\"使用建议\">使用建议</h2>\n<ul>\n<li><strong>控制提示词体积</strong>：把稳定不变的说明做成短标签或引用，而非每次粘贴长段文本。</li>\n<li><strong>结构化输入</strong>：JSON/YAML 会增加标点 token，但能减少歧义，整体效果通常更好。</li>\n<li><strong>分批/检索</strong>：长文处理考虑分片与检索增强（RAG），避免一次性把全文塞进上下文。</li>\n<li><strong>估算再调用</strong>：关键任务前先本地估一遍 token，避免超限或费用突增。</li>\n</ul>";

				const frontmatter = {"title":"token","description":"介绍 token 的定义、长度计算与常见用法"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/model-terms/token.md";
				const url = undefined;
				function rawContent() {
					return "\r\n# 为什么要了解 token\r\n\r\n- 关系到费用、速度与是否超出上下文窗口。\r\n- 影响提示词设计与拆分策略，决定能否稳定跑长任务。\r\n\r\n# token 是什么\r\n\r\ntoken 可以理解为模型处理文本时使用的最小单位，类似\"字节与字符\"的关系。不同模型使用不同的分词器（tokenizer），会把文本切成一个个 token 再进行计算与推理。\r\n\r\n## 如何计算 token\r\n\r\n- **英文**：大致 *4 个字符 ≈ 1 token*。例如 `hello` 可能被分为 `hel` + `lo` 两个 token。\r\n- **数字/符号**：通常按块切分，如 `2025`、`http`、`://` 可能是不同 token。\r\n- **模型差异**：不同模型/版本的分词器不同，同一段文本的 token 数可能略有差异。\r\n\r\n精确计算需使用官方或社区分词器（如 OpenAI tiktoken、Anthropic tokenizer、SentencePiece 等）。\r\n\r\n## 中文与 token 的差异\r\n\r\n- 中文多为按字或常见词组切分，**1 个汉字通常≈1 个 token**（但并非绝对）。\r\n- 中英文夹杂时，标点与空格也会占 token；**Markdown/JSON 等结构字符**同样计入。\r\n\r\n## 上下文长度与费用\r\n\r\n- **上下文长度（context window）**：模型一次可处理的输入+历史+输出 token 总上限。例如 128k/200k 等。\r\n- **费用**：大多数供应商按输入 token 与输出 token 分别计费；部分模型还区分\"推理/思考\"token。\r\n- **速度**：token 多意味着推理时间更长、流式返回更慢。\r\n\r\n## 快速估算与示例\r\n\r\n经验估算：\r\n\r\n- 英文：*字符数 ÷ 4 ≈ token*；中文：*汉字数 ≈ token*。\r\n- 段落中若包含大量格式字符（换行、JSON、表格），可再加 10%~30% 余量。\r\n\r\n示例：约 1,000 字的中文文章，token ≈ 1,000～1,300；若加上系统提示与历史对话，很容易超过 2k。\r\n\r\n## 使用建议\r\n\r\n- **控制提示词体积**：把稳定不变的说明做成短标签或引用，而非每次粘贴长段文本。\r\n- **结构化输入**：JSON/YAML 会增加标点 token，但能减少歧义，整体效果通常更好。\r\n- **分批/检索**：长文处理考虑分片与检索增强（RAG），避免一次性把全文塞进上下文。\r\n- **估算再调用**：关键任务前先本地估一遍 token，避免超限或费用突增。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"为什么要了解-token","text":"为什么要了解 token"},{"depth":1,"slug":"token-是什么","text":"token 是什么"},{"depth":2,"slug":"如何计算-token","text":"如何计算 token"},{"depth":2,"slug":"中文与-token-的差异","text":"中文与 token 的差异"},{"depth":2,"slug":"上下文长度与费用","text":"上下文长度与费用"},{"depth":2,"slug":"快速估算与示例","text":"快速估算与示例"},{"depth":2,"slug":"使用建议","text":"使用建议"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
