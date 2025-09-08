import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../chunks/ContentLayout_C5Ui34GO.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const sidebarContent = `
  <a href="/demo" class="active">\u793A\u4F8B\u6982\u89C8</a>
`;
  const headings = [
    { id: "intro", text: "\u6F14\u793A\u4E0E\u6848\u4F8B", depth: 1 }
  ];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "DEMO", "section": "DEMO", "sidebarContent": sidebarContent, "headings": headings }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 id="intro">演示与案例</h1> <p>这里将收集实践示例与最佳实践工作流。你可以告诉我要添加哪些 Demo，我会按你的清单创建子页面。</p> <h2 id="demo-links">精选项目链接</h2> <div class="demo-groups"> <h3>Web 对话 / 应用</h3> <ul> <li><a href="https://github.com/lobehub/lobe-chat" target="_blank" rel="noopener">Lobe Chat</a> — 多模型聚合的聊天应用</li> <li><a href="https://github.com/Yidadaa/ChatGPT-Next-Web" target="_blank" rel="noopener">ChatGPT Next Web</a> — 轻量可部署的聊天前端</li> <li><a href="https://github.com/open-webui/open-webui" target="_blank" rel="noopener">Open WebUI</a> — 本地/自托管的 Web UI</li> </ul> <h3>Agent / 自动化</h3> <ul> <li><a href="https://github.com/Significant-Gravitas/AutoGPT" target="_blank" rel="noopener">AutoGPT</a> — 目标导向的自动代理</li> <li><a href="https://github.com/OpenDevin/OpenDevin" target="_blank" rel="noopener">OpenDevin</a> — AI 辅助软件开发</li> <li><a href="https://github.com/OpenInterpreter/open-interpreter" target="_blank" rel="noopener">Open Interpreter</a> — 以自然语言驱动本地命令/脚本</li> </ul> <h3>工作流 / RAG / 知识库</h3> <ul> <li><a href="https://github.com/FlowiseAI/Flowise" target="_blank" rel="noopener">Flowise</a> — 可视化工作流编排</li> <li><a href="https://github.com/Mintplex-Labs/anything-llm" target="_blank" rel="noopener">AnythingLLM</a> — 一体化 RAG/知识库</li> <li><a href="https://github.com/run-llama/llama_index" target="_blank" rel="noopener">LlamaIndex</a> — 数据连接与检索增强</li> <li><a href="https://github.com/langchain-ai/langchain" target="_blank" rel="noopener">LangChain</a> — 应用框架与模板生态</li> </ul> <h3>本地推理 / 多模态</h3> <ul> <li><a href="https://github.com/ollama/ollama" target="_blank" rel="noopener">Ollama</a> — 本地模型运行与管理</li> <li><a href="https://github.com/comfyanonymous/ComfyUI" target="_blank" rel="noopener">ComfyUI</a> — 图像工作流可视化</li> <li><a href="https://github.com/openai/whisper" target="_blank" rel="noopener">Whisper</a> — 语音转文本</li> </ul> </div> ` })}`;
}, "X:/Projcet/AI BOOK/src/pages/demo/index.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/demo/index.astro";
const $$url = "/demo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
