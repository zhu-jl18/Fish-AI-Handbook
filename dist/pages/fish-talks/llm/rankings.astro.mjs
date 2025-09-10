import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$ContentLayout } from '../../../chunks/ContentLayout_C5Ui34GO.mjs';
import { F as FISH_TALKS_SIDEBAR } from '../../../chunks/sidebars_22da2ctk.mjs';
import { g as getEntry } from '../../../chunks/_astro_content_MH6PcDEO.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Rankings = createComponent(async ($$result, $$props, $$slots) => {
  const entry = await getEntry("docs", "01-fish-talks/llm/rankings");
  const { Content } = await entry.render();
  const sidebarContent = `
  <a href="/fish-talks">\u9C7C\u8BF4\u5FC5\u770B</a>
  <a href="/fish-talks/overview">\u6982\u89C8</a>
  <div>
    <a href="/fish-talks/llm" class="active">\u5927\u6A21\u578B\u5E38\u8BC6</a>
    <div class="submenu">
      <a href="/fish-talks/llm/brief">\u6A21\u578B\u5206\u7C7B</a>
      <a href="/fish-talks/llm/models">\u5E38\u89C1\u6A21\u578B</a>
      <a href="/fish-talks/llm/rankings" class="active">\u5927\u6A21\u578B\u6392\u540D</a>
    </div>
  </div>
`;
  const headings = [
    { id: "\u63D0\u793A", text: "\u63D0\u793A", depth: 2 },
    { id: "lmarena", text: "LMArena", depth: 2 }
  ];
  return renderTemplate`${renderComponent($$result, "ContentLayout", $$ContentLayout, { "title": "Fish\u60F3\u8BF4 - \u5927\u6A21\u578B\u6392\u540D", "section": "Fish\u60F3\u8BF4", "sidebarContent": sidebarContent, "sidebarItems": FISH_TALKS_SIDEBAR, "headings": headings }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ${maybeRenderHead()}<h2 id="lmarena">LMArena</h2> <iframe src="https://lmarena.ai/" style="width: 100%; height: 70vh; border: 1px solid #333; border-radius: 6px;" loading="lazy"></iframe> <p>若内嵌不可用，请访问：<a href="https://lmarena.ai/" target="_blank" rel="noopener">LMArena 官网</a></p> ` })}`;
}, "X:/Projcet/AI BOOK/src/pages/fish-talks/llm/rankings.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/fish-talks/llm/rankings.astro";
const $$url = "/fish-talks/llm/rankings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Rankings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
