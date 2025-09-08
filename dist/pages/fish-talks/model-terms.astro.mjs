import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../../chunks/ContentLayout_C5Ui34GO.mjs';
import { F as FISH_TALKS_SIDEBAR } from '../../chunks/sidebars_22da2ctk.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const sidebarContent = `
  <a href="/fish-talks">Listen to me</a>
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
    <a href="/fish-talks/model-terms" class="active">\u6A21\u578B\u76F8\u5173\u672F\u8BED</a>
    <div class="submenu">
      <a href="/fish-talks/model-terms/token">token</a>
      <a href="/fish-talks/model-terms/temperature">\u6E29\u5EA6</a>
      <a href="/fish-talks/model-terms/streaming">\u6D41\u5F0F\u4F20\u8F93</a>
      <a href="/fish-talks/model-terms/thinking">\u601D\u8003</a>
      <a href="/fish-talks/model-terms/context-steps">\u4E0A\u4E0B\u6587\u6B65\u6570</a>
    </div>
  </div>
  <div>
    <a href="/fish-talks/glossary">\u5176\u4ED6\u5E38\u89C1\u672F\u8BED</a>
    <div class="submenu">
      <a href="/fish-talks/glossary/api">API</a>
      <a href="/fish-talks/glossary/proxy">\u4EE3\u7406</a>
      <a href="/fish-talks/glossary/reverse-proxy">\u53CD\u4EE3</a>
      <a href="/fish-talks/glossary/interface">\u63A5\u53E3</a>
      <a href="/fish-talks/glossary/env">\u73AF\u5883\u53D8\u91CF</a>
    </div>
  </div>
`;
  const headings = [
    { id: "terms", text: "\u6A21\u578B\u76F8\u5173\u672F\u8BED \xB7 \u6982\u89C8", depth: 1 }
  ];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "Fish\u60F3\u8BF4 - \u6A21\u578B\u76F8\u5173\u672F\u8BED", "section": "Fish\u60F3\u8BF4", "sidebarContent": sidebarContent, "sidebarItems": FISH_TALKS_SIDEBAR, "headings": headings }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 id="terms">模型相关术语 · 概览</h1> <p>选择左侧具体词条查看详情。</p> ` })}`;
}, "X:/Projcet/AI BOOK/src/pages/fish-talks/model-terms/index.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/fish-talks/model-terms/index.astro";
const $$url = "/fish-talks/model-terms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
