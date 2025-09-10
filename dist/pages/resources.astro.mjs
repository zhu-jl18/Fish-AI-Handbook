import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../chunks/ContentLayout_C5Ui34GO.mjs';
import { g as getEntry } from '../chunks/_astro_content_MH6PcDEO.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "08-resources/index");
  const { Content } = await entry.render();
  const sidebarContent = `
  <a href="/resources" class="active">\u8D44\u6E90\u5408\u96C6</a>
`;
  const headings = [
    { id: "resources", text: "\u8D44\u6E90\u5408\u96C6", depth: 1 }
  ];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "\u8D44\u6E90\u5408\u96C6", "section": "\u8D44\u6E90\u5408\u96C6", "sidebarContent": sidebarContent, "headings": headings }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "X:/Projcet/AI BOOK/src/pages/resources/index.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/resources/index.astro";
const $$url = "/resources";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
