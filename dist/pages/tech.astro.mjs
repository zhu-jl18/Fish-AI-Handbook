import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../chunks/ContentLayout_C5Ui34GO.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const section = "\u6280\u672F\u5411";
  const title = "\u6280\u672F\u5411 - \u5927\u6A21\u578B\u5E94\u7528\u5F00\u53D1\u7684\u57FA\u77F3";
  const sidebarContent = `
  <a href="/tech" class="active">\u6280\u672F\u5411\u6982\u8FF0</a>
`;
  const headings = [
    { id: "intro", text: "\u6B22\u8FCE", depth: 1 }
  ];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": title, "section": section, "sidebarContent": sidebarContent, "headings": headings }, { "default": ($$result2) => renderTemplate`
## 欢迎

这里是“技术向”模块的欢迎页。根据你的要求，仅保留欢迎页骨架，映射用法见文件顶部注释。你可直接在此处补充内容。
` })}`;
}, "X:/Projcet/AI BOOK/src/pages/tech/index.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/tech/index.astro";
const $$url = "/tech";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
