import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../../chunks/ContentLayout_C5Ui34GO.mjs';
import { F as FISH_TALKS_SIDEBAR } from '../../chunks/sidebars_22da2ctk.mjs';
export { renderers } from '../../renderers.mjs';

const $$Glossary = createComponent(($$result, $$props, $$slots) => {
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
    <a href="/fish-talks/glossary" class="active">Related Concepts</a>
    <div class="submenu">
      <a href="/fish-talks/glossary/api">API</a>
      <a href="/fish-talks/glossary/proxy">\u4EE3\u7406</a>
      <a href="/fish-talks/glossary/reverse-proxy">\u53CD\u4EE3</a>
      <a href="/fish-talks/glossary/interface">\u63A5\u53E3</a>
    </div>
  </div>
`;
  const headings = [
    { id: "glossary", text: "\u672F\u8BED\u9884\u8BBE\uFF08\u5360\u4F4D\uFF09", depth: 1 }
  ];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "Fish\u60F3\u8BF4 - Related Concepts", "section": "Fish\u60F3\u8BF4", "sidebarContent": sidebarContent, "sidebarItems": FISH_TALKS_SIDEBAR, "headings": headings }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 id="glossary">Related Concepts</h1> <p>选择左侧具体词条查看详情。</p> ` })}`;
}, "X:/Projcet/AI BOOK/src/pages/fish-talks/glossary.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/fish-talks/glossary.astro";
const $$url = "/fish-talks/glossary";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Glossary,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
