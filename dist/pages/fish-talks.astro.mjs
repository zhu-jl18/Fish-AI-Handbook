import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../chunks/ContentLayout_C5Ui34GO.mjs';
import { F as FISH_TALKS_SIDEBAR } from '../chunks/sidebars_22da2ctk.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const sidebarContent = `
  <a href="/fish-talks" class="active">Listen to me</a>
  <a href="/fish-talks/overview">Overview</a>
  <div>
    <a href="/fish-talks/llm">About LLM</a>
    <div class="submenu">
      <a href="/fish-talks/llm/brief">Model Classification</a>
      <a href="/fish-talks/llm/models">Famous Models</a>
      <a href="/fish-talks/llm/rankings">Rankings of LLM</a>
    </div>
  </div>
  <div>
    <a href="/fish-talks/model-terms">\u6A21\u578B\u76F8\u5173\u672F\u8BED</a>
    <div class="submenu">
      <a href="/fish-talks/model-terms/token">token</a>
      <a href="/fish-talks/model-terms/temperature">\u6E29\u5EA6</a>
      <a href="/fish-talks/model-terms/streaming">\u6D41\u5F0F\u4F20\u8F93</a>
      <a href="/fish-talks/model-terms/thinking">\u601D\u8003</a>
      <a href="/fish-talks/model-terms/context-steps">\u4E0A\u4E0B\u6587\u6B65\u6570</a>
    </div>
  </div>
  <div>
    <a href="/fish-talks/glossary">Related Concepts</a>
    <div class="submenu">
      <a href="/fish-talks/glossary/api">API</a>
      <a href="/fish-talks/glossary/proxy">\u4EE3\u7406</a>
      <a href="/fish-talks/glossary/reverse-proxy">\u53CD\u4EE3</a>
      <a href="/fish-talks/glossary/interface">\u63A5\u53E3</a>
      <a href="/fish-talks/glossary/env">\u73AF\u5883\u53D8\u91CF</a>
    </div>
  </div>
  <div>
    <a href="/fish-talks/preparations">Preparations</a>
    <div class="submenu">
      <a href="/fish-talks/preparations/windows-terminal">Windows Terminal</a>
      <a href="/fish-talks/preparations/visual-studio-code">Visual Studio Code</a>
      <a href="/fish-talks/preparations/nodejs">Node.js</a>
      <a href="/fish-talks/preparations/github">GitHub</a>
      <a href="/fish-talks/preparations/vpn">VPN</a>
    </div>
  </div>
`;
  const headings = [
    { id: "welcome", text: "\u6B22\u8FCE\u6765\u5230Fish AI Handbook", depth: 1 },
    { id: "about", text: "\u5173\u4E8E\u8FD9\u4E2A\u6307\u5357", depth: 2 },
    { id: "goal", text: "\u6211\u7684\u76EE\u6807", depth: 2 }
  ];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "Fish\u60F3\u8BF4", "section": "Fish\u60F3\u8BF4", "sidebarContent": sidebarContent, "sidebarItems": FISH_TALKS_SIDEBAR, "headings": headings }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 id="welcome">欢迎来到Fish的世界</h1> <p>嘿，朋友们！我是Fish，一个对AI充满热情的探索者。</p> <h2 id="about">关于这个指南</h2> <p>这不是一个 technically correct 的技术文档，而是我写给朋友们的一份AI使用心得。在这里，我会用最简单易懂的语言，分享我在AI使用过程中的各种发现和技巧。</p> <p>从最基础的聊天工具使用，到稍微复杂一些的API调用，再到一些有趣的进阶玩法，我都会一一记录下来。</p> <h2 id="goal">我的目标</h2> <p>我的目标很简单：<strong>让每个人都能轻松上手使用AI</strong>。</p> <p>AI不应该只是技术人员的专属玩具，它应该成为每个人日常生活中的好帮手。无论你是学生、程序员、设计师，还是任何对AI感兴趣的人，都希望这个指南能帮到你。</p> <blockquote> <p>技术是为了让生活更美好，而不是制造新的障碍。</p> </blockquote> <p>好，话不多说，让我们一起开始这段AI探索之旅吧！</p> ` })}`;
}, "X:/Projcet/AI BOOK/src/pages/fish-talks/index.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/fish-talks/index.astro";
const $$url = "/fish-talks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
