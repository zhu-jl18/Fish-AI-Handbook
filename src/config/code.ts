/**
 * 代码块配置
 * 集中管理 Expressive Code 的样式与行为参数
 */

export type CodeConfig = {
  /** 代码块主题 */
  themes: string[]
  /** 默认属性 */
  defaultProps: {
    /** 是否自动换行 */
    wrap: boolean
    /** 是否保留缩进 */
    preserveIndent: boolean
    /** 默认框架类型: 'auto' | 'code' | 'terminal' | 'none' */
    frame?: string
  }
  /** 样式覆写 - 完整的 Expressive Code styleOverrides 配置 */
  styleOverrides: {
    // === 核心样式 ===
    /** 圆角半径 */
    borderRadius: string
    /** 边框宽度 */
    borderWidth: string
    /** 边框颜色 */
    borderColor: string
    /** 代码字号 */
    codeFontSize: string
    /** 代码行高 */
    codeLineHeight: string
    /** 代码块上下内边距 */
    codePaddingBlock: string
    /** 代码块左右内边距 */
    codePaddingInline: string
    /** 代码背景色 */
    codeBackground: string
    /** 代码前景色 */
    codeForeground: string
    /** 滚动条滑块颜色 */
    scrollbarThumbColor: string
    /** 滚动条滑块 hover 颜色 */
    scrollbarThumbHoverColor: string

    // === Frames 插件样式 ===
    frames: {
      /** 阴影颜色（设为 transparent 可移除） */
      shadowColor: string
      /** 行内按钮背景色 */
      inlineButtonBackground: string
      /** 行内按钮前景色 */
      inlineButtonForeground: string
      /** 行内按钮边框颜色 */
      inlineButtonBorder: string
      /** 行内按钮边框透明度 */
      inlineButtonBorderOpacity: string
      /** 行内按钮背景透明度（空闲状态） */
      inlineButtonBackgroundIdleOpacity: string
      /** 行内按钮背景透明度（hover/focus） */
      inlineButtonBackgroundHoverOrFocusOpacity: string
      /** 行内按钮背景透明度（active） */
      inlineButtonBackgroundActiveOpacity: string
      /** 成功提示背景色 */
      tooltipSuccessBackground: string
      /** 成功提示前景色 */
      tooltipSuccessForeground: string
    }
  }
  /** 功能配置 */
  frames: {
    /** 是否显示复制按钮 */
    showCopyToClipboardButton: boolean
    /** 是否从代码中提取文件名 */
    extractFileNameFromCode: boolean
  }
}

/**
 * 默认代码块配置
 * 修改此处即可全局调整代码块样式
 *
 * 说明：
 * - 使用 CSS 变量引用（var(--*)）复用 global.css 中的设计令牌
 * - 这样修改设计令牌时，代码块样式会自动更新
 * - frames 配置控制复制按钮等 UI 元素的样式
 */
const codeConfig: CodeConfig = {
  themes: ['github-dark'],
  defaultProps: {
    wrap: true,
    preserveIndent: true,
    // 禁用自动终端检测,所有代码块都使用代码编辑器框架样式
    frame: 'code',
  },
  styleOverrides: {
    // === 核心样式 ===
    // 使用项目设计令牌,保持与全局样式一致
    borderRadius: '6px',
    borderWidth: '1px',
    borderColor: 'var(--code-border)',       // #30363d - GitHub 风格边框
    codeFontSize: '0.92rem',
    codeLineHeight: '1.55',
    codePaddingBlock: '0.75rem',
    codePaddingInline: '1rem',
    codeBackground: 'var(--code-bg)',        // #0d1117
    codeForeground: 'var(--code-fg)',        // #c9d1d9

    // 滚动条样式 - 复用全局滚动条配置
    scrollbarThumbColor: 'var(--border-color)',
    scrollbarThumbHoverColor: 'var(--color-scrollbar-hover)',

    // === Frames 插件样式 ===
    // 自定义复制按钮和提示框的样式
    frames: {
      // 移除默认阴影，保持简洁
      shadowColor: 'transparent',

      // 复制按钮样式 - 与原手动维护的样式保持一致
      inlineButtonBackground: 'rgba(240, 246, 252, 0.08)',
      inlineButtonForeground: 'rgba(201, 209, 217, 0.8)',
      inlineButtonBorder: 'rgba(240, 246, 252, 0.16)',
      inlineButtonBorderOpacity: '0.4',

      // 复制按钮交互状态透明度
      inlineButtonBackgroundIdleOpacity: '0',
      inlineButtonBackgroundHoverOrFocusOpacity: '0.2',
      inlineButtonBackgroundActiveOpacity: '0.3',

      // 复制成功提示 - 绿色成功反馈
      tooltipSuccessBackground: 'rgba(34, 197, 94, 0.16)',
      tooltipSuccessForeground: 'rgba(56, 255, 135, 0.85)',
    },
  },
  frames: {
    showCopyToClipboardButton: true,
    // 不自动提取文件名,避免显示不必要的标题栏
    extractFileNameFromCode: false,
  },
}

export default codeConfig

