/**
 * 主题配置文件
 * 集中管理排版与布局参数，方便统一调整与模板化
 * 
 * 注意：修改此文件后，需要同步更新 src/styles/global.css 中的对应 CSS 变量
 * 或者在 ContentLayout.astro 中通过内联样式注入这些变量值
 */

export type Theme = {
  /** ========== 排版参数 ========== */
  /** 正文基础字号（桌面端，默认） */
  fontSizeBase: string
  /** 大屏字号（1280px 以上，可与 base 相同或不同） */
  fontSizeLg: string
  /** 正文行高 */
  lineHeightBase: string
  /** 段落间距 */
  paragraphSpacing: string
  /** 章节间距 */
  sectionSpacing: string

  /** ========== 布局参数 ========== */
  /** 整体布局最大宽度 */
  layoutMaxWidth: string
  /** 正文区域最大宽度 */
  contentMaxWidth: string
  /** 侧边栏宽度 */
  sidebarWidth: string
  /** 布局元素间距 */
  layoutGap: string

  /** ========== Header 参数 ========== */
  /** Header 高度 */
  headerHeight: string
  /** Header 粘性定位的 top 值 */
  headerTop: string

  /** ========== 响应式断点 ========== */
  breakpoints: {
    /** 移动端断点 */
    mobile: string
    /** 平板端断点 */
    tablet: string
    /** 笔记本断点 */
    laptop: string
    /** 桌面端断点 */
    desktop: string
  }
}

/**
 * 默认主题配置
 * 修改这里的值即可全局调整站点布局与排版
 */
const theme: Theme = {
  // 排版参数
  fontSizeBase: '14px',
  fontSizeLg: '14px',
  lineHeightBase: '1.7',
  paragraphSpacing: '1.4rem',
  sectionSpacing: '2.75rem',

  // 布局参数
  layoutMaxWidth: '1440px',
  contentMaxWidth: '820px',
  sidebarWidth: '240px',
  layoutGap: '24px',

  // Header 参数
  headerHeight: '64px',
  headerTop: '0',

  // 响应式断点
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    laptop: '1200px',
    desktop: '1440px',
  },
}

export default theme
