import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { a as $$BaseLayout, $ as $$Header } from '../chunks/Header_xKk_i8Wa.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "\u9996\u9875", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "currentPage": "home", "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<main class="main-content" data-astro-cid-j7pv25f6> <div class="hero" data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>Fish写给朋友们的AI使用指南</h1> <p class="hero-subtitle" data-astro-cid-j7pv25f6>简洁清晰的AI教程，从基础使用到进阶玩法</p> <div class="hero-links" data-astro-cid-j7pv25f6> <a href="/fish-talks" class="hero-link" data-astro-cid-j7pv25f6>Fish想说</a> <a href="/basic" class="hero-link" data-astro-cid-j7pv25f6>基础使用</a> <a href="/prompts" class="hero-link" data-astro-cid-j7pv25f6>提示词</a> <a href="/advanced" class="hero-link" data-astro-cid-j7pv25f6>进阶玩法</a> <a href="/demo" class="hero-link" data-astro-cid-j7pv25f6>DEMO</a> <a href="/tech" class="hero-link" data-astro-cid-j7pv25f6>技术向</a> <a href="/fun" class="hero-link" data-astro-cid-j7pv25f6>好玩的</a> <a href="/resources" class="hero-link" data-astro-cid-j7pv25f6>资源合集</a> </div> </div> </main> ` })} `;
}, "X:/Projcet/AI BOOK/src/pages/index.astro", void 0);

const $$file = "X:/Projcet/AI BOOK/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
