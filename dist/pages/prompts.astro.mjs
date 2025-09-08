import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../chunks/ContentLayout_C5Ui34GO.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const sidebarContent = `
  <a href="/prompts" class="active">\u63D0\u793A\u8BCD\u5DE5\u7A0B\u6982\u8FF0</a>
`;
  const headings = [
    { id: "introduction", text: "\u63D0\u793A\u8BCD\u5DE5\u7A0B\uFF1A\u4E0EAI\u5BF9\u8BDD\u7684\u827A\u672F", depth: 1 },
    { id: "what-is-prompt", text: "\u4EC0\u4E48\u662F\u63D0\u793A\u8BCD", depth: 2 },
    { id: "importance", text: "\u4E3A\u4EC0\u4E48\u63D0\u793A\u8BCD\u5982\u6B64\u91CD\u8981", depth: 2 },
    { id: "basic-principles", text: "\u57FA\u672C\u539F\u5219", depth: 2 },
    { id: "common-types", text: "\u5E38\u89C1\u7C7B\u578B", depth: 2 },
    { id: "getting-started", text: "\u5165\u95E8\u6307\u5357", depth: 2 }
  ];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "\u63D0\u793A\u8BCD", "section": "\u63D0\u793A\u8BCD", "sidebarContent": sidebarContent, "headings": headings, "data-astro-cid-63qo5j5i": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 id="introduction" data-astro-cid-63qo5j5i>提示词工程：与AI对话的艺术</h1> <p data-astro-cid-63qo5j5i>提示词工程（Prompt Engineering）是与大语言模型有效沟通的关键技能。一个精心设计的提示词可以让AI输出精准、有用的结果，而模糊的提示词则可能得到令人困惑的回应。</p> <div class="highlight-box" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>🎯 核心理念</h4> <p data-astro-cid-63qo5j5i>提示词工程不是简单的"问答"，而是一门关于如何精确表达意图、引导AI思考方式的艺术和科学。</p> </div> <h2 id="what-is-prompt" data-astro-cid-63qo5j5i>什么是提示词</h2> <p data-astro-cid-63qo5j5i>提示词（Prompt）是你发送给AI模型的文本输入，它包含了你的指令、问题、上下文信息和期望的输出格式。提示词是人类与AI之间的接口，决定了AI的响应质量和相关性。</p> <div class="example-comparison" data-astro-cid-63qo5j5i> <div class="example bad" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>❌ 模糊的提示词</h4> <p data-astro-cid-63qo5j5i><code data-astro-cid-63qo5j5i>"写一篇文章"</code></p> <p class="result" data-astro-cid-63qo5j5i>结果：AI可能写出任何主题、任何长度、任何风格的文章</p> </div> <div class="example good" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>✅ 精确的提示词</h4> <p data-astro-cid-63qo5j5i><code data-astro-cid-63qo5j5i>"写一篇800字的技术博客文章，介绍React Hooks的使用方法，包含3个实际代码示例，目标读者是有1-2年经验的前端开发者"</code></p> <p class="result" data-astro-cid-63qo5j5i>结果：AI会生成符合具体要求的高质量内容</p> </div> </div> <h2 id="importance" data-astro-cid-63qo5j5i>为什么提示词如此重要</h2> <h3 data-astro-cid-63qo5j5i>1. 决定输出质量</h3> <p data-astro-cid-63qo5j5i>相同的模型，不同的提示词可能产生完全不同质量的输出：</p> <ul data-astro-cid-63qo5j5i> <li data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>专业性</strong> - 清晰的专业术语和上下文指导</li> <li data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>准确性</strong> - 明确的约束条件和验证要求</li> <li data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>完整性</strong> - 详细的格式和内容要求</li> <li data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>相关性</strong> - 精准的目标受众和使用场景</li> </ul> <h3 data-astro-cid-63qo5j5i>2. 控制成本效率</h3> <p data-astro-cid-63qo5j5i>好的提示词能够：</p> <ul data-astro-cid-63qo5j5i> <li data-astro-cid-63qo5j5i>减少重复调用和修正</li> <li data-astro-cid-63qo5j5i>提高一次性成功率</li> <li data-astro-cid-63qo5j5i>降低Token消耗</li> <li data-astro-cid-63qo5j5i>节省开发时间</li> </ul> <h3 data-astro-cid-63qo5j5i>3. 实现复杂功能</h3> <p data-astro-cid-63qo5j5i>通过精心设计的提示词，可以让AI执行：</p> <ul data-astro-cid-63qo5j5i> <li data-astro-cid-63qo5j5i>多步骤推理任务</li> <li data-astro-cid-63qo5j5i>特定格式的数据转换</li> <li data-astro-cid-63qo5j5i>角色扮演和风格模拟</li> <li data-astro-cid-63qo5j5i>复杂的分析和判断</li> </ul> <h2 id="basic-principles" data-astro-cid-63qo5j5i>基本原则</h2> <div class="principles-grid" data-astro-cid-63qo5j5i> <div class="principle-card" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>🎯 明确性原则</h4> <p data-astro-cid-63qo5j5i>清晰、具体地表达你的需求，避免歧义和模糊表述。</p> <div class="principle-example" data-astro-cid-63qo5j5i> <p data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>好：</strong> "总结这篇文章的主要观点，用3个要点列出"</p> <p data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>差：</strong> "这篇文章讲什么"</p> </div> </div> <div class="principle-card" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>📝 结构化原则</h4> <p data-astro-cid-63qo5j5i>使用清晰的结构组织你的提示词，包括角色、任务、要求、示例等。</p> <div class="principle-example" data-astro-cid-63qo5j5i> <p data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>结构：</strong> 角色设定 → 具体任务 → 输出格式 → 注意事项</p> </div> </div> <div class="principle-card" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>🔍 上下文原则</h4> <p data-astro-cid-63qo5j5i>提供足够的背景信息，帮助AI理解任务的具体情境。</p> <div class="principle-example" data-astro-cid-63qo5j5i> <p data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>包含：</strong> 目标受众、使用场景、专业领域、预期效果</p> </div> </div> <div class="principle-card" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>📊 示例原则</h4> <p data-astro-cid-63qo5j5i>提供具体的示例来展示期望的输出格式和质量标准。</p> <div class="principle-example" data-astro-cid-63qo5j5i> <p data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>格式：</strong> 输入示例 → 期望输出 → 格式说明</p> </div> </div> </div> <h2 id="common-types" data-astro-cid-63qo5j5i>常见类型</h2> <h3 data-astro-cid-63qo5j5i>1. 指令型提示词</h3> <p data-astro-cid-63qo5j5i>直接告诉AI要做什么：</p> <div class="code-example" data-astro-cid-63qo5j5i> <pre data-astro-cid-63qo5j5i><code data-astro-cid-63qo5j5i>请将以下文本翻译成英文：
"人工智能正在改变我们的世界"

要求：
- 保持原意准确性
- 使用正式的书面语
- 检查语法和拼写</code></pre> </div> <h3 data-astro-cid-63qo5j5i>2. 角色扮演型提示词</h3> <p data-astro-cid-63qo5j5i>让AI扮演特定角色：</p> <div class="code-example" data-astro-cid-63qo5j5i> <pre data-astro-cid-63qo5j5i><code data-astro-cid-63qo5j5i>你是一位资深的React开发工程师，有10年的前端开发经验。
请为新手开发者解释React中的状态管理概念，使用简单易懂的语言，
并提供一个具体的代码示例。</code></pre> </div> <h3 data-astro-cid-63qo5j5i>3. 推理型提示词</h3> <p data-astro-cid-63qo5j5i>引导AI进行逐步推理：</p> <div class="code-example" data-astro-cid-63qo5j5i> <pre data-astro-cid-63qo5j5i><code data-astro-cid-63qo5j5i>请逐步分析这个业务问题：
问题：一家电商网站的转化率从2%降到了1.5%

分析步骤：
1. 列出可能的原因
2. 按影响程度排序
3. 提出验证方法
4. 建议解决方案

请一步步进行分析。</code></pre> </div> <h3 data-astro-cid-63qo5j5i>4. 模板填充型提示词</h3> <p data-astro-cid-63qo5j5i>提供结构化的输出模板：</p> <div class="code-example" data-astro-cid-63qo5j5i> <pre data-astro-cid-63qo5j5i><code data-astro-cid-63qo5j5i>请按照以下模板分析这个API设计：

## API分析报告

**接口名称**: [填写接口名称]
**请求方法**: [GET/POST/PUT/DELETE]
**功能描述**: [简述接口功能]

### 优点
- [列出设计优点]

### 待改进点
- [列出可改进的地方]

### 建议
[给出具体改进建议]</code></pre> </div> <h2 id="getting-started" data-astro-cid-63qo5j5i>入门指南</h2> <h3 data-astro-cid-63qo5j5i>第一步：学会提出好问题</h3> <div class="step-guide" data-astro-cid-63qo5j5i> <div class="step" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>1. 从简单开始</h4> <p data-astro-cid-63qo5j5i>选择一个具体、明确的任务开始练习</p> <div class="step-example" data-astro-cid-63qo5j5i> <p data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>任务：</strong> 写一个产品介绍</p> <p data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>提示词：</strong> "为iPhone 15写一个200字的产品介绍，突出其主要特性，目标用户是年轻的科技爱好者"</p> </div> </div> <div class="step" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>2. 逐步增加复杂度</h4> <p data-astro-cid-63qo5j5i>在基础版本上添加更多要求和约束</p> <div class="step-example" data-astro-cid-63qo5j5i> <p data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>升级版：</strong> "...同时包含技术规格对比，使用营销友好的语调，最后加上购买建议"</p> </div> </div> <div class="step" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>3. 迭代优化</h4> <p data-astro-cid-63qo5j5i>根据输出结果调整和优化提示词</p> <div class="step-example" data-astro-cid-63qo5j5i> <p data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>优化：</strong> 如果输出太技术化，加上"避免过于专业的术语"</p> </div> </div> </div> <h3 data-astro-cid-63qo5j5i>第二步：建立提示词模板库</h3> <div class="template-categories" data-astro-cid-63qo5j5i> <div class="category" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>📝 内容创作</h4> <ul data-astro-cid-63qo5j5i> <li data-astro-cid-63qo5j5i>文章写作模板</li> <li data-astro-cid-63qo5j5i>社交媒体内容</li> <li data-astro-cid-63qo5j5i>邮件撰写</li> <li data-astro-cid-63qo5j5i>产品描述</li> </ul> </div> <div class="category" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>💻 代码相关</h4> <ul data-astro-cid-63qo5j5i> <li data-astro-cid-63qo5j5i>代码审查</li> <li data-astro-cid-63qo5j5i>Bug修复</li> <li data-astro-cid-63qo5j5i>文档生成</li> <li data-astro-cid-63qo5j5i>性能优化</li> </ul> </div> <div class="category" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>📊 数据分析</h4> <ul data-astro-cid-63qo5j5i> <li data-astro-cid-63qo5j5i>数据清洗</li> <li data-astro-cid-63qo5j5i>报告生成</li> <li data-astro-cid-63qo5j5i>趋势分析</li> <li data-astro-cid-63qo5j5i>可视化建议</li> </ul> </div> <div class="category" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>🎯 业务应用</h4> <ul data-astro-cid-63qo5j5i> <li data-astro-cid-63qo5j5i>市场分析</li> <li data-astro-cid-63qo5j5i>竞品研究</li> <li data-astro-cid-63qo5j5i>策略规划</li> <li data-astro-cid-63qo5j5i>用户调研</li> </ul> </div> </div> <h3 data-astro-cid-63qo5j5i>第三步：持续学习和改进</h3> <div class="learning-path" data-astro-cid-63qo5j5i> <ol data-astro-cid-63qo5j5i> <li data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>观察和收集</strong> - 收集效果好的提示词示例</li> <li data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>实验和测试</strong> - 尝试不同的表达方式</li> <li data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>记录和总结</strong> - 建立自己的最佳实践</li> <li data-astro-cid-63qo5j5i><strong data-astro-cid-63qo5j5i>分享和交流</strong> - 与社区分享经验</li> </ol> </div> <div class="next-steps-box" data-astro-cid-63qo5j5i> <h4 data-astro-cid-63qo5j5i>🚀 下一步学习路径</h4> <p data-astro-cid-63qo5j5i>现在你已经了解了提示词工程的基础知识，建议按以下顺序深入学习：</p> <ol data-astro-cid-63qo5j5i> <li data-astro-cid-63qo5j5i><a href="/prompts/basics" data-astro-cid-63qo5j5i>基础技巧</a> - 掌握核心写作技法</li> <li data-astro-cid-63qo5j5i><a href="/prompts/advanced" data-astro-cid-63qo5j5i>高级策略</a> - 学习复杂场景的处理</li> <li data-astro-cid-63qo5j5i><a href="/prompts/templates" data-astro-cid-63qo5j5i>实用模板</a> - 获取现成的模板库</li> <li data-astro-cid-63qo5j5i><a href="/prompts/optimization" data-astro-cid-63qo5j5i>优化与调试</a> - 提升效果的专业技巧</li> </ol> </div> ` })} `;
}, "X:/Projcet/AI BOOK/src/pages/prompts/index.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/prompts/index.astro";
const $$url = "/prompts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
