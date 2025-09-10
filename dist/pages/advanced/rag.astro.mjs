import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../../chunks/ContentLayout_C5Ui34GO.mjs';
import { g as getEntry } from '../../chunks/_astro_content_MH6PcDEO.mjs';
export { renderers } from '../../renderers.mjs';

const $$Rag = createComponent(async ($$result, $$props, $$slots) => {
  let entry = await getEntry("docs", "04-advanced-techniques/rag");
  if (!entry) {
    entry = await getEntry("docs", "04-advanced-techniques/rag/index");
  }
  const { Content } = await entry.render();
  const sidebarContent = `
  <a href="/advanced">\u5DE5\u7A0B\u5316\u8FDB\u9636\uFF1A\u6982\u89C8</a>
  <div>
    <a href="/advanced/rag" class="active">RAG\uFF08\u68C0\u7D22\u589E\u5F3A\u751F\u6210\uFF09</a>
  </div>
  <div>
    <a href="/advanced/vector-databases">\u5411\u91CF\u6570\u636E\u5E93</a>
  </div>
  <div>
    <a href="/advanced/mcp">MCP\uFF08Model Context Protocol\uFF09</a>
  </div>
  <div>
    <a href="/advanced/knowledge-bases">\u77E5\u8BC6\u5E93</a>
  </div>
  <div>
    <a href="/advanced/multi-agent">\u591A\u667A\u80FD\u4F53\u534F\u4F5C</a>
  </div>
`;
  const headings = [
    { id: "\u4E3A\u4EC0\u4E48", text: "\u4E3A\u4EC0\u4E48", depth: 1 },
    { id: "\u4EC0\u4E48\u65F6\u5019\u7528", text: "\u4EC0\u4E48\u65F6\u5019\u7528", depth: 2 },
    { id: "\u5173\u952E\u7EC4\u4EF6", text: "\u5173\u952E\u7EC4\u4EF6", depth: 2 },
    { id: "\u5E38\u89C1\u5751", text: "\u5E38\u89C1\u5751", depth: 2 }
  ];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "\u5DE5\u7A0B\u5316\u8FDB\u9636 / RAG\uFF08\u68C0\u7D22\u589E\u5F3A\u751F\u6210\uFF09", "section": "\u8FDB\u9636\u73A9\u6CD5", "sidebarContent": sidebarContent, "headings": headings }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "X:/Projcet/AI BOOK/src/pages/advanced/rag.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/advanced/rag.astro";
const $$url = "/advanced/rag";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Rag,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
