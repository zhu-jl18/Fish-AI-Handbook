import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../../../chunks/ContentLayout_C5Ui34GO.mjs';
import { F as FISH_TALKS_SIDEBAR } from '../../../chunks/sidebars_22da2ctk.mjs';
import { g as getEntry } from '../../../chunks/_astro_content_MH6PcDEO.mjs';
export { renderers } from '../../../renderers.mjs';

const $$ReverseProxy = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "01-fish-talks/glossary/reverse-proxy");
  const { Content } = await entry.render();
  const sidebarContent = `
  <a href="/fish-talks">\u9C7C\u8BF4\u5FC5\u770B</a>
  <a href="/fish-talks/overview">\u6982\u89C8</a>
  <div>
    <a href="/fish-talks/llm">\u5927\u6A21\u578B\u5E38\u8BC6</a>
    <div class="submenu">
      <a href="/fish-talks/llm/brief">\u6A21\u578B\u5206\u7C7B</a>
      <a href="/fish-talks/llm/models">\u5E38\u89C1\u6A21\u578B</a>
      <a href="/fish-talks/llm/rankings">\u5927\u6A21\u578B\u6392\u540D</a>
    </div>
  </div>
  <div>
    <a href="/fish-talks/glossary" class="active">\u5176\u4ED6\u5E38\u89C1\u672F\u8BED</a>
    <div class="submenu">
      <a href="/fish-talks/glossary/api">API</a>
      <a href="/fish-talks/glossary/proxy">\u4EE3\u7406</a>
      <a href="/fish-talks/glossary/reverse-proxy" class="active">\u53CD\u4EE3</a>
      <a href="/fish-talks/glossary/interface">\u63A5\u53E3</a>
      <a href="/fish-talks/glossary/env">\u73AF\u5883\u53D8\u91CF</a>
    </div>
  </div>
`;
  const headings = [
    { id: "\u4E3A\u4EC0\u4E48\u8981\u61C2\u53CD\u5411\u4EE3\u7406", text: "\u4E3A\u4EC0\u4E48\u8981\u61C2\u53CD\u5411\u4EE3\u7406", depth: 1 }
  ];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": `Fish\u60F3\u8BF4 - \u5176\u4ED6\u5E38\u89C1\u672F\u8BED / ${entry.data.title}`, "section": "Fish\u60F3\u8BF4", "sidebarContent": sidebarContent, "sidebarItems": FISH_TALKS_SIDEBAR, "headings": headings }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "X:/Projcet/AI BOOK/src/pages/fish-talks/glossary/reverse-proxy.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/fish-talks/glossary/reverse-proxy.astro";
const $$url = "/fish-talks/glossary/reverse-proxy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ReverseProxy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
