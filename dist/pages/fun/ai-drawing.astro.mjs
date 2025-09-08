import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../../chunks/ContentLayout_C5Ui34GO.mjs';
import { g as getEntry } from '../../chunks/_astro_content_DvFdDXxn.mjs';
export { renderers } from '../../renderers.mjs';

const $$AiDrawing = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "07-fun/ai-drawing");
  const { Content } = await entry.render();
  const sidebarContent = `
  <a href="/fun">\u597D\u73A9\u7684\uFF1A\u6982\u89C8</a>
  <div>
    <a href="/fun/llm-unlocking">\u5927\u6A21\u578B\u7834\u9650\u6559\u7A0B</a>
  </div>
  <div>
    <a href="/fun/silver-trivern">Silver Trivern \u9152\u9986\u4F7F\u7528</a>
  </div>
  <div>
    <a href="/fun/ai-drawing" class="active">AI \u7ED8\u56FE\u6559\u7A0B</a>
  </div>
`;
  const headings = [];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "AI \u7ED8\u56FE\u6559\u7A0B", "section": "\u597D\u73A9\u7684", "sidebarContent": sidebarContent, "headings": headings }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "X:/Projcet/AI BOOK/src/pages/fun/ai-drawing.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/fun/ai-drawing.astro";
const $$url = "/fun/ai-drawing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AiDrawing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
