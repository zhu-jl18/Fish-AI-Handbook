import { b as createAstro, c as createComponent, a as renderTemplate, e as renderSlot, i as renderHead, m as maybeRenderHead, d as addAttribute } from './astro/server_DMTDEdEd.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://fish-ai-book.vercel.app");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="zh-CN"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', '</title><meta name="description" content="Fish\u5199\u7ED9\u670B\u53CB\u4EEC\u7684AI\u4F7F\u7528\u6307\u5357 - \u7B80\u6D01\u6E05\u6670\u7684AI\u6559\u7A0B"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">', "</head> <body> ", ` <script type="module">import '../scripts/copy-code.js';<\/script> </body> </html>`])), title ? `${title} - Fish\u5199\u7ED9\u670B\u53CB\u4EEC\u7684AI\u4F7F\u7528\u6307\u5357` : "Fish\u5199\u7ED9\u670B\u53CB\u4EEC\u7684AI\u4F7F\u7528\u6307\u5357", renderHead(), renderSlot($$result, $$slots["default"]));
}, "X:/Projcet/AI BOOK/src/layouts/BaseLayout.astro", void 0);

const $$Astro = createAstro("https://fish-ai-book.vercel.app");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const { currentPage } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-3ef6ksr2> <nav class="nav" data-astro-cid-3ef6ksr2> <div class="nav-container" data-astro-cid-3ef6ksr2> <a href="/" class="logo" data-astro-cid-3ef6ksr2>Fish-Book</a> <div class="nav-links" data-astro-cid-3ef6ksr2> <a href="/fish-talks"${addAttribute(currentPage === "fish-talks" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>鱼说必看</a> <a href="/basic"${addAttribute(currentPage === "basic" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>基础用法</a> <a href="/prompts"${addAttribute(currentPage === "prompts" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>提示词</a> <a href="/advanced"${addAttribute(currentPage === "advanced" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>进阶玩法</a> <a href="/demo"${addAttribute(currentPage === "demo" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>DEMO</a> <a href="/tech"${addAttribute(currentPage === "tech" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>技术向</a> <a href="/fun"${addAttribute(currentPage === "fun" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>好玩的</a> <a href="/resources"${addAttribute(currentPage === "resources" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>资源合集</a> </div> </div> </nav> </header> `;
}, "X:/Projcet/AI BOOK/src/components/Header.astro", void 0);

export { $$Header as $, $$BaseLayout as a };
