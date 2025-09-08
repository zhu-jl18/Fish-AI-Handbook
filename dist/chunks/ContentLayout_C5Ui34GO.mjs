import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate, e as renderSlot, r as renderComponent, F as Fragment, u as unescapeHTML } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import { $ as $$Header, a as $$BaseLayout } from './Header_xKk_i8Wa.mjs';
import 'clsx';
/* empty css                         */

const $$Astro$2 = createAstro("https://fish-ai-book.vercel.app");
const $$LeftSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LeftSidebar;
  const { section, items } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  const isExactActive = (href) => !!href && currentPath === href;
  const isGroupActive = (href) => !!href && (currentPath === href || currentPath.startsWith(href + "/"));
  return renderTemplate`${maybeRenderHead()}<div class="left-sidebar" data-astro-cid-ryjzjgvk> <div class="sidebar-content" data-astro-cid-ryjzjgvk> <div class="section-title" data-astro-cid-ryjzjgvk>${section}</div> <nav class="section-nav" data-astro-cid-ryjzjgvk> ${items ? items.map((entry) => (
    // @ts-ignore - runtime shape check
    entry.items ? renderTemplate`<div class="group" data-astro-cid-ryjzjgvk> <a${addAttribute(entry.href ?? "#", "href")}${addAttribute(isGroupActive(entry.href) ? "active" : void 0, "class")} data-astro-cid-ryjzjgvk>${entry.label}</a> <div class="submenu" data-astro-cid-ryjzjgvk> ${entry.items?.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(isExactActive(link.href) ? "active" : void 0, "class")} data-astro-cid-ryjzjgvk>${link.label}</a>`)} </div> </div>` : (
      // @ts-ignore - treat as link shape
      renderTemplate`<a${addAttribute(entry.href, "href")}${addAttribute(isExactActive(entry.href) ? "active" : void 0, "class")} data-astro-cid-ryjzjgvk>${entry.label}</a>`
    )
  )) : renderTemplate`${renderSlot($$result, $$slots["default"])}`} </nav> </div> </div> `;
}, "X:/Projcet/AI BOOK/src/components/LeftSidebar.astro", void 0);

const $$Astro$1 = createAstro("https://fish-ai-book.vercel.app");
const $$RightSidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RightSidebar;
  const { headings } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="right-sidebar" data-astro-cid-zujyv34g> <div class="toc-content" data-astro-cid-zujyv34g> <div class="toc-title" data-astro-cid-zujyv34g>目录</div> <nav class="toc-nav" data-astro-cid-zujyv34g> ${headings.map((heading) => renderTemplate`<a${addAttribute(`#${heading.id}`, "href")}${addAttribute(`toc-link toc-${heading.depth}`, "class")} data-astro-cid-zujyv34g> ${heading.text} </a>`)} </nav> </div> </div> `;
}, "X:/Projcet/AI BOOK/src/components/RightSidebar.astro", void 0);

const $$Astro = createAstro("https://fish-ai-book.vercel.app");
const $$ContentLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContentLayout;
  const {
    title,
    section,
    sidebarContent,
    sidebarItems,
    headings = []
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "data-astro-cid-scuu7fyy": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "currentPage": section === "DEMO" ? "demo" : section === "\u6280\u672F\u5411" ? "tech" : section === "Fish\u60F3\u8BF4" ? "fish-talks" : section === "\u57FA\u7840\u4F7F\u7528" ? "basic" : section === "\u63D0\u793A\u8BCD" ? "prompts" : section === "\u8FDB\u9636\u73A9\u6CD5" ? "advanced" : section === "\u597D\u73A9\u7684" ? "fun" : section === "\u8D44\u6E90\u5408\u96C6" ? "resources" : "home", "data-astro-cid-scuu7fyy": true })} ${maybeRenderHead()}<div class="content-wrapper" data-astro-cid-scuu7fyy> ${renderComponent($$result2, "LeftSidebar", $$LeftSidebar, { "section": section, "items": sidebarItems, "data-astro-cid-scuu7fyy": true }, { "default": ($$result3) => renderTemplate`${sidebarContent ? renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": ($$result4) => renderTemplate`${unescapeHTML(sidebarContent)}` })}` : null}` })} <main class="content" data-astro-cid-scuu7fyy> <div class="content-inner" data-astro-cid-scuu7fyy> ${renderSlot($$result2, $$slots["default"])} </div> </main> ${renderComponent($$result2, "RightSidebar", $$RightSidebar, { "headings": headings, "data-astro-cid-scuu7fyy": true })} </div> ` })} `;
}, "X:/Projcet/AI BOOK/src/layouts/ContentLayout.astro", void 0);

export { $$ContentLayout as $ };
