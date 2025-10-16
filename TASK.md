# TASK.md — 主题美化与阅读体验优化（17项）

说明：本清单对应已确认范围。优先级从高到低，大项完成后提交预览截图与短视频。默认：版心 780px、长代码折叠阈值 24 行、中文字体自托管（Noto Sans SC 400/600）。

- [ ] 1) 范围与偏好确认（已锁定）
  - 纯暗色主题；冷色系（蓝紫）为主色；搜索功能延后，仅放入口；全站不收录。

- [ ] 2) 基线检查与工作分支
  - 确认 shikiConfig: { theme: 'dark-plus', wrap: true }。
  - 保留 BaseLayout 的 noindex；public/robots.txt 为 Disallow: /。
  - 创建分支 feat/dark-theme-readability；起 dev 截图对照页（首页/长代码/多级侧栏）。

- [ ] 3) 重构暗色主题变量与冷色系备用映射（src/styles/global.css）
  - 统一变量：--bg-color、--bg-elevated、--text-color、--text-muted、--border-color、--accent-color、--link-color、--link-hover-color、--code-bg、--inline-code-bg、--shadow-color。
  - color-scheme: dark；提供 data-accent="cool" 的冷色映射（蓝紫）。

- [ ] 4) 内容版心与排版（ContentLayout + global.css）
  - .content-inner max-width: 780px；正文行高≈1.7；统一段落/列表/表格间距与样式。

- [ ] 5) 自托管中文字体与字体栈
  - public/fonts 放置 Noto Sans SC 400/600 woff2；@font-face + preload；font-display: swap。
  - 字体栈：中文优先 Noto Sans SC，英文 Inter/系统栈。

- [ ] 6) 统一图片与图注样式 + 轻量灯箱
  - 图片/figure 圆角与轻阴影；figcaption 使用 --text-muted。
  - 新增 public/scripts/lightbox.js，内容区图片点击放大，ESC 关闭；按需加载。

- [ ] 7) 移除 .hljs-* 冲突，切换到 Shiki 安全选择器
  - 清理 global.css 的 .hljs 样式；新增 pre.astro-code/** 的容器与行级样式；滚动条/边框统一。

- [ ] 8) 代码块视觉优化（不改 token 颜色）
  - --code-bg 与 --border-color 提升对比度；行高与字距微调；行内 code 背景/圆角统一。

- [ ] 9) 代码块交互：复制选中优先 + 长代码折叠
  - copy：若用户有选区则复制选区，否则复制整块；失败回退；按钮状态反馈。
  - collapse：默认阈值 24 行；支持 data-collapse-lines 覆盖；“展开/收起”按钮与渐隐遮罩。

- [ ] 10) 左侧栏分组折叠与状态记忆（仅含三级子项的分组）
  - 点击分组标题切换折叠；localStorage 记忆展开；当前页面分组强制展开；键盘可达。

- [ ] 11) 右侧 TOC 全展开 + 返回顶部按钮
  - 维持 H2–H4 全展开；底部新增“返回顶部”按钮，平滑滚动；窄屏隐藏或浮动处理。

- [ ] 12) 顶部导航新增“搜索入口”占位 + 占位页
  - Header 新增“搜索”链接至 /search；新建 src/pages/search.astro 占位文案；暂不接检索。

- [ ] 13) SEO 与收录策略统一（不收录）
  - 保持 BaseLayout 的 noindex 等；robots.txt Disallow: /；README 备注当前策略。

- [ ] 14) 可访问性与性能守则
  - 对比度达 WCAG AA；交互元素可键盘操作与可见焦点；脚本按需加载与事件委托；无 JS 退化良好。

- [ ] 15) 测试用例与验收清单
  - 视觉：版心/图片/代码块/链接对比度。
  - 功能：折叠/复制选中优先/侧栏折叠记忆/返回顶部/搜索入口可达。
  - SEO：noindex 与 robots 生效；兼容性：主流浏览器 + 移动端；不破坏路由与侧栏结构。

- [ ] 16) 提交与变更记录
  - 提交规范：
    - feat(theme): refactor dark tokens and add cool accent mapping
    - feat(code): shiki-safe selectors, copy select-first, long-code collapse
    - feat(ui): sidebar collapsible with persist, toc back-to-top
    - feat(assets): self-host Noto Sans SC; unify image styles and lightbox
    - chore(seo): enforce noindex and docs update
  - PR 附预览截图与短视频。

- [ ] 17) 后续路线（非本次范围）
  - 冷色映射 UI 开关；Pagefind/Algolia 搜索；代码块更多增强（行号/悬停复制等）。
