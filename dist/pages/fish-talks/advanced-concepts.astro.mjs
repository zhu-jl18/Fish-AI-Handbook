import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../../chunks/ContentLayout_C5Ui34GO.mjs';
import { F as FISH_TALKS_SIDEBAR } from '../../chunks/sidebars_22da2ctk.mjs';
import { g as getEntry } from '../../chunks/_astro_content_DvFdDXxn.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "01-fish-talks/advanced-concepts/index");
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
    <a href="/fish-talks/advanced-concepts" class="active">\u8FDB\u9636\u6982\u5FF5</a>
    <div class="submenu">
      <a href="/fish-talks/advanced-concepts/agent">Agent\uFF08\u667A\u80FD\u4F53\uFF09</a>
      <a href="/fish-talks/advanced-concepts/vibe-coding">Vibe Coding\uFF08\u6C1B\u56F4\u7F16\u7A0B\uFF09</a>
      <a href="/fish-talks/advanced-concepts/workflow">Workflow\uFF08\u5DE5\u4F5C\u6D41\uFF09</a>
    </div>
  </div>
`;
  const headings = [
    { id: "\u4E3A\u4EC0\u4E48\u8FD9\u4E9B\u6982\u5FF5\u91CD\u8981", text: "\u4E3A\u4EC0\u4E48\u8FD9\u4E9B\u6982\u5FF5\u91CD\u8981", depth: 1 }
  ];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": `Fish\u60F3\u8BF4 - \u8FDB\u9636\u6982\u5FF5 / \u6982\u89C8`, "section": "Fish\u60F3\u8BF4", "sidebarContent": sidebarContent, "sidebarItems": FISH_TALKS_SIDEBAR, "headings": headings }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "X:/Projcet/AI BOOK/src/pages/fish-talks/advanced-concepts/index.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/fish-talks/advanced-concepts/index.astro";
const $$url = "/fish-talks/advanced-concepts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
