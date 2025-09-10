import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../../../chunks/ContentLayout_C5Ui34GO.mjs';
import { F as FISH_TALKS_SIDEBAR } from '../../../chunks/sidebars_22da2ctk.mjs';
import { g as getEntry } from '../../../chunks/_astro_content_MH6PcDEO.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Brief = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "01-fish-talks/llm/brief");
  const { Content } = await entry.render();
  const sidebarContent = `
  <a href="/fish-talks">\u9C7C\u8BF4\u5FC5\u770B</a>
  <a href="/fish-talks/overview">\u6982\u89C8</a>
  <div>
    <a href="/fish-talks/llm" class="active">\u5927\u6A21\u578B\u5E38\u8BC6</a>
    <div class="submenu">
      <a href="/fish-talks/llm/brief" class="active">\u6A21\u578B\u5206\u7C7B</a>
      <a href="/fish-talks/llm/models">\u5E38\u89C1\u6A21\u578B</a>
      <a href="/fish-talks/llm/rankings">\u5927\u6A21\u578B\u6392\u540D</a>
    </div>
  </div>
`;
  const headings = [
    { id: "\u4E3A\u4EC0\u4E48\u8981\u5148\u61C2\u5206\u7C7B", text: "\u4E3A\u4EC0\u4E48\u8981\u5148\u61C2\u5206\u7C7B", depth: 1 },
    { id: "\u6309\u80FD\u529B", text: "\u6309\u80FD\u529B", depth: 2 },
    { id: "\u6309\u6A21\u6001", text: "\u6309\u6A21\u6001", depth: 2 },
    { id: "\u6309\u90E8\u7F72", text: "\u6309\u90E8\u7F72", depth: 2 },
    { id: "\u6309\u4E0A\u4E0B\u6587\u7A97\u53E3", text: "\u6309\u4E0A\u4E0B\u6587\u7A97\u53E3", depth: 2 },
    { id: "\u9009\u62E9\u5EFA\u8BAE", text: "\u9009\u62E9\u5EFA\u8BAE", depth: 2 }
  ];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "Fish\u60F3\u8BF4 - \u6A21\u578B\u5206\u7C7B", "section": "Fish\u60F3\u8BF4", "sidebarContent": sidebarContent, "sidebarItems": FISH_TALKS_SIDEBAR, "headings": headings }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "X:/Projcet/AI BOOK/src/pages/fish-talks/llm/brief.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/fish-talks/llm/brief.astro";
const $$url = "/fish-talks/llm/brief";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Brief,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
