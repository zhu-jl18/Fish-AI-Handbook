import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<h2 id=\"什么是提示词-prompt\">什么是提示词 (Prompt)？</h2>\n<p>简单来说，提示词就是您给 AI 模型的指令或问题。它是一个文本输入，可以是任何东西——一个问题、一段描述、一个要求，甚至是一段需要补全的代码。提示词的质量直接决定了模型输出结果的质量。</p>\n<h2 id=\"核心原则\">核心原则</h2>\n<p>构建一个好的提示词，可以遵循以下几个核心原则：</p>\n<h3 id=\"1-明确与具体-clarity-and-specificity\">1. <strong>明确与具体 (Clarity and Specificity)</strong></h3>\n<p>您的指令应该尽可能清晰、具体，不留歧义。避免使用模糊或过于宽泛的语言。</p>\n<ul>\n<li><strong>反例</strong>：<code>写一些关于狗的东西。</code></li>\n<li><strong>正例</strong>：<code>以一个十岁孩子的口吻，写一首关于一只名叫“旺财”的金毛寻回犬的五行诗，内容要体现出它的忠诚和活泼。</code></li>\n</ul>\n<h3 id=\"2-提供上下文-provide-context\">2. <strong>提供上下文 (Provide Context)</strong></h3>\n<p>如果您的任务需要特定背景知识，请在提示词中提供这些上下文。这能帮助模型更好地理解您的意图。</p>\n<ul>\n<li><strong>反例</strong>：<code>总结一下。</code></li>\n<li><strong>正例</strong>：<code>我正在写一篇关于“远程工作对团队协作影响”的文章，请帮我总结以下这段访谈记录的核心观点：[在此处粘贴访谈记录]</code></li>\n</ul>\n<h3 id=\"3-赋予角色-assign-a-role\">3. <strong>赋予角色 (Assign a Role)</strong></h3>\n<p>让模型扮演一个特定的角色，可以极大地提升输出结果的专业性和相关性。这被称为“角色扮演提示”。</p>\n<ul>\n<li><strong>反例</strong>：<code>检查这段代码有没有问题。</code></li>\n<li><strong>正例</strong>：<code>你是一位资深的 Python 软件工程师，擅长编写简洁、高效且符合 PEP 8 规范的代码。请审查以下 Python 代码，找出其中可能存在的错误、不合理的实现以及可以优化的地方。</code></li>\n</ul>\n<h3 id=\"4-使用分隔符-use-delimiters\">4. <strong>使用分隔符 (Use Delimiters)</strong></h3>\n<p>当您的提示词中包含不同部分的内容（如指令、上下文、示例、输入数据）时，使用清晰的分隔符（如三重引号 <code>\"\"\"</code>、三重反引号 `````、XML 标签 <code>&#x3C;tag></code>）可以帮助模型更好地区分它们。</p>\n<ul>\n<li><strong>示例</strong>：\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\" data-language=\"plaintext\"><code><span class=\"line\"><span>请根据以下文章，总结出三个核心要点。</span></span>\n<span class=\"line\"><span></span></span>\n<span class=\"line\"><span>文章：</span></span>\n<span class=\"line\"><span>\"\"\"</span></span>\n<span class=\"line\"><span>[在此处粘贴文章内容]</span></span>\n<span class=\"line\"><span>\"\"\"</span></span>\n<span class=\"line\"><span></span></span></code></pre>\n</li>\n</ul>\n<h3 id=\"5-明确输出格式-specify-output-format\">5. <strong>明确输出格式 (Specify Output Format)</strong></h3>\n<p>如果您对输出结果有特定的格式要求（如 JSON、Markdown、列表、表格），请在提示词中明确指出。</p>\n<ul>\n<li>\n<p><strong>示例</strong>：<code>请分析以下客户评论，并以 JSON 格式输出结果。JSON 对象应包含三个键：\"sentiment\" (值为 \"positive\", \"negative\", 或 \"neutral\")，\"summary\" (一句话总结)，以及 \"keywords\" (一个包含关键词的数组)。</code></p>\n<p><code>客户评论：\"\"\"我非常喜欢这款产品，它解决了我的大问题！\"\"\"</code></p>\n</li>\n</ul>\n<p>通过遵循这些基本原则，您可以显著提升与 AI 模型的沟通效率，获得更满意的结果。</p>";

				const frontmatter = {"title":"提示词基础","description":"掌握构建优秀提示词的核心原则和基本技巧。"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/03-prompts/basics.md";
				const url = undefined;
				function rawContent() {
					return "\r\n## 什么是提示词 (Prompt)？\r\n\r\n简单来说，提示词就是您给 AI 模型的指令或问题。它是一个文本输入，可以是任何东西——一个问题、一段描述、一个要求，甚至是一段需要补全的代码。提示词的质量直接决定了模型输出结果的质量。\r\n\r\n## 核心原则\r\n\r\n构建一个好的提示词，可以遵循以下几个核心原则：\r\n\r\n### 1. **明确与具体 (Clarity and Specificity)**\r\n\r\n您的指令应该尽可能清晰、具体，不留歧义。避免使用模糊或过于宽泛的语言。\r\n\r\n-   **反例**：`写一些关于狗的东西。`\r\n-   **正例**：`以一个十岁孩子的口吻，写一首关于一只名叫“旺财”的金毛寻回犬的五行诗，内容要体现出它的忠诚和活泼。`\r\n\r\n### 2. **提供上下文 (Provide Context)**\r\n\r\n如果您的任务需要特定背景知识，请在提示词中提供这些上下文。这能帮助模型更好地理解您的意图。\r\n\r\n-   **反例**：`总结一下。`\r\n-   **正例**：`我正在写一篇关于“远程工作对团队协作影响”的文章，请帮我总结以下这段访谈记录的核心观点：[在此处粘贴访谈记录]`\r\n\r\n### 3. **赋予角色 (Assign a Role)**\r\n\r\n让模型扮演一个特定的角色，可以极大地提升输出结果的专业性和相关性。这被称为“角色扮演提示”。\r\n\r\n-   **反例**：`检查这段代码有没有问题。`\r\n-   **正例**：`你是一位资深的 Python 软件工程师，擅长编写简洁、高效且符合 PEP 8 规范的代码。请审查以下 Python 代码，找出其中可能存在的错误、不合理的实现以及可以优化的地方。`\r\n\r\n### 4. **使用分隔符 (Use Delimiters)**\r\n\r\n当您的提示词中包含不同部分的内容（如指令、上下文、示例、输入数据）时，使用清晰的分隔符（如三重引号 `\"\"\"`、三重反引号 `````、XML 标签 `<tag>`）可以帮助模型更好地区分它们。\r\n\r\n-   **示例**：\r\n    ```\r\n    请根据以下文章，总结出三个核心要点。\r\n\r\n    文章：\r\n    \"\"\"\r\n    [在此处粘贴文章内容]\r\n    \"\"\"\r\n    ```\r\n\r\n### 5. **明确输出格式 (Specify Output Format)**\r\n\r\n如果您对输出结果有特定的格式要求（如 JSON、Markdown、列表、表格），请在提示词中明确指出。\r\n\r\n-   **示例**：`请分析以下客户评论，并以 JSON 格式输出结果。JSON 对象应包含三个键：\"sentiment\" (值为 \"positive\", \"negative\", 或 \"neutral\")，\"summary\" (一句话总结)，以及 \"keywords\" (一个包含关键词的数组)。`\r\n    \r\n    `客户评论：\"\"\"我非常喜欢这款产品，它解决了我的大问题！\"\"\"`\r\n\r\n通过遵循这些基本原则，您可以显著提升与 AI 模型的沟通效率，获得更满意的结果。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"什么是提示词-prompt","text":"什么是提示词 (Prompt)？"},{"depth":2,"slug":"核心原则","text":"核心原则"},{"depth":3,"slug":"1-明确与具体-clarity-and-specificity","text":"1. 明确与具体 (Clarity and Specificity)"},{"depth":3,"slug":"2-提供上下文-provide-context","text":"2. 提供上下文 (Provide Context)"},{"depth":3,"slug":"3-赋予角色-assign-a-role","text":"3. 赋予角色 (Assign a Role)"},{"depth":3,"slug":"4-使用分隔符-use-delimiters","text":"4. 使用分隔符 (Use Delimiters)"},{"depth":3,"slug":"5-明确输出格式-specify-output-format","text":"5. 明确输出格式 (Specify Output Format)"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
