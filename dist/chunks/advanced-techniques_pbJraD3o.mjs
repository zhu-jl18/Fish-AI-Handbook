import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, a as renderTemplate } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>在掌握了基础原则之后，我们可以探索一些更高级的技巧，来处理更复杂的任务。这些技巧能引导模型“思考”得更深入、更结构化，从而得到更高质量的答案。</p>\n<h2 id=\"1-少样本提示-few-shot-prompting\">1. 少样本提示 (Few-Shot Prompting)</h2>\n<p>“少样本提示”是指在您的指令中，给模型提供几个完整的示例（“shots”），来展示您期望它完成任务的方式和格式。这对于需要特定输出格式或遵循特定逻辑的任务非常有效。</p>\n<ul>\n<li><strong>零样本 (Zero-Shot)</strong>：不提供任何示例，直接发出指令。\n<ul>\n<li><code>将“天空是蓝色的”翻译成法语。</code></li>\n</ul>\n</li>\n<li><strong>少样本 (Few-Shot)</strong>：提供一或多个示例。\n<ul>\n<li><code>将“大海是广阔的”翻译成法语是“La mer est vaste”。</code></li>\n<li><code>将“太阳是温暖的”翻译成法语是“Le soleil est chaud”。</code></li>\n<li><code>现在，将“天空是蓝色的”翻译成法语。</code></li>\n</ul>\n</li>\n</ul>\n<p>通过示例，模型能更好地理解您的意图，并模仿您给出的格式和风格。</p>\n<h2 id=\"2-思维链-chain-of-thought-cot\">2. 思维链 (Chain-of-Thought, CoT)</h2>\n<p>“思维链”是一种强大的技术，它通过引导模型“一步一步地思考”来解决复杂问题，特别是数学和逻辑推理问题。您可以在示例中展示解决问题的思考过程，模型将会模仿这种分步推理的方式。</p>\n<ul>\n<li>\n<p><strong>标准提示</strong>：\r\n<code>操场上有23个苹果，如果他们用了20个来做午餐，又买了6个，他们现在有多少个苹果？</code>\r\n（模型可能会直接给出一个错误的答案，比如 29）</p>\n</li>\n<li>\n<p><strong>思维链提示</strong>：\r\n<code>Q: 操场上有23个苹果，如果他们用了20个来做午餐，又买了6个，他们现在有多少个苹果？</code>\r\n<code>A: 让我们一步一步地解决这个问题。首先，操场上原来有23个苹果。他们用了20个做午餐，所以他们剩下 23 - 20 = 3个苹果。然后他们又买了6个苹果，所以现在他们有 3 + 6 = 9个苹果。所以答案是9。</code></p>\n</li>\n</ul>\n<p>在您的提示中加入类似“让我们一步一步地思考”或“请解释你的推理过程”这样的引导语，也能有效地触发模型的思维链能力。</p>\n<h2 id=\"3-自洽性-self-consistency\">3. 自洽性 (Self-Consistency)</h2>\n<p>这是一种更高级的技巧，可以看作是“思维链”的威力加强版。它的核心思想是：针对同一个问题，进行多次独立的“思维链”推理，然后选择在多次结果中出现次数最多的那个答案（“多数投票”）。</p>\n<p>由于每次推理的路径可能略有不同，这种方法可以有效减少因某一步随机错误导致的最终错误，从而显著提高复杂推理问题的准确率。实现这种方法通常需要通过 API 多次调用模型，并设置较高的 <code>temperature</code> 参数来增加推理路径的多样性。</p>\n<h2 id=\"4-生成知识提示-generated-knowledge-prompting\">4. 生成知识提示 (Generated Knowledge Prompting)</h2>\n<p>当遇到需要特定领域知识但模型可能不具备的问题时，可以分两步走：</p>\n<ol>\n<li><strong>第一步</strong>：先让模型生成关于这个问题的一些相关知识或事实。</li>\n<li><strong>第二步</strong>：将生成的事实与原始问题结合，形成一个新的、信息更丰富的提示词，再让模型回答。</li>\n</ol>\n<p>这种方法能有效补充模型知识的不足，提高回答的准确性和深度。</p>\n<p>通过结合运用这些高级技巧，您可以解锁 AI 模型解决复杂问题的巨大潜力。</p>";

				const frontmatter = {"title":"提示词高级技巧","description":"学习如何运用高级提示技巧，引导模型进行复杂推理。"};
				const file = "X:/Projcet/AI BOOK/src/content/docs/03-prompts/advanced-techniques.md";
				const url = undefined;
				function rawContent() {
					return "\r\n在掌握了基础原则之后，我们可以探索一些更高级的技巧，来处理更复杂的任务。这些技巧能引导模型“思考”得更深入、更结构化，从而得到更高质量的答案。\r\n\r\n## 1. 少样本提示 (Few-Shot Prompting)\r\n\r\n“少样本提示”是指在您的指令中，给模型提供几个完整的示例（“shots”），来展示您期望它完成任务的方式和格式。这对于需要特定输出格式或遵循特定逻辑的任务非常有效。\r\n\r\n-   **零样本 (Zero-Shot)**：不提供任何示例，直接发出指令。\r\n    -   `将“天空是蓝色的”翻译成法语。`\r\n-   **少样本 (Few-Shot)**：提供一或多个示例。\r\n    -   `将“大海是广阔的”翻译成法语是“La mer est vaste”。`\r\n    -   `将“太阳是温暖的”翻译成法语是“Le soleil est chaud”。`\r\n    -   `现在，将“天空是蓝色的”翻译成法语。`\r\n\r\n通过示例，模型能更好地理解您的意图，并模仿您给出的格式和风格。\r\n\r\n## 2. 思维链 (Chain-of-Thought, CoT)\r\n\r\n“思维链”是一种强大的技术，它通过引导模型“一步一步地思考”来解决复杂问题，特别是数学和逻辑推理问题。您可以在示例中展示解决问题的思考过程，模型将会模仿这种分步推理的方式。\r\n\r\n-   **标准提示**：\r\n    `操场上有23个苹果，如果他们用了20个来做午餐，又买了6个，他们现在有多少个苹果？`\r\n    （模型可能会直接给出一个错误的答案，比如 29）\r\n\r\n-   **思维链提示**：\r\n    `Q: 操场上有23个苹果，如果他们用了20个来做午餐，又买了6个，他们现在有多少个苹果？`\r\n    `A: 让我们一步一步地解决这个问题。首先，操场上原来有23个苹果。他们用了20个做午餐，所以他们剩下 23 - 20 = 3个苹果。然后他们又买了6个苹果，所以现在他们有 3 + 6 = 9个苹果。所以答案是9。`\r\n\r\n在您的提示中加入类似“让我们一步一步地思考”或“请解释你的推理过程”这样的引导语，也能有效地触发模型的思维链能力。\r\n\r\n## 3. 自洽性 (Self-Consistency)\r\n\r\n这是一种更高级的技巧，可以看作是“思维链”的威力加强版。它的核心思想是：针对同一个问题，进行多次独立的“思维链”推理，然后选择在多次结果中出现次数最多的那个答案（“多数投票”）。\r\n\r\n由于每次推理的路径可能略有不同，这种方法可以有效减少因某一步随机错误导致的最终错误，从而显著提高复杂推理问题的准确率。实现这种方法通常需要通过 API 多次调用模型，并设置较高的 `temperature` 参数来增加推理路径的多样性。\r\n\r\n## 4. 生成知识提示 (Generated Knowledge Prompting)\r\n\r\n当遇到需要特定领域知识但模型可能不具备的问题时，可以分两步走：\r\n\r\n1.  **第一步**：先让模型生成关于这个问题的一些相关知识或事实。\r\n2.  **第二步**：将生成的事实与原始问题结合，形成一个新的、信息更丰富的提示词，再让模型回答。\r\n\r\n这种方法能有效补充模型知识的不足，提高回答的准确性和深度。\r\n\r\n通过结合运用这些高级技巧，您可以解锁 AI 模型解决复杂问题的巨大潜力。\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"1-少样本提示-few-shot-prompting","text":"1. 少样本提示 (Few-Shot Prompting)"},{"depth":2,"slug":"2-思维链-chain-of-thought-cot","text":"2. 思维链 (Chain-of-Thought, CoT)"},{"depth":2,"slug":"3-自洽性-self-consistency","text":"3. 自洽性 (Self-Consistency)"},{"depth":2,"slug":"4-生成知识提示-generated-knowledge-prompting","text":"4. 生成知识提示 (Generated Knowledge Prompting)"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
