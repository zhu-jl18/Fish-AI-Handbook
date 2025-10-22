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
  }
  /** 样式覆写 */
  styleOverrides: {
    /** 代码字号 */
    codeFontSize: string
    /** 代码行高 */
    codeLineHeight: string
    /** 代码块上下内边距 */
    codePaddingBlock: string
    /** 代码块左右内边距 */
    codePaddingInline: string
    /** 圆角半径 */
    borderRadius: string
    /** 边框宽度 */
    borderWidth: string
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
 */
const codeConfig: CodeConfig = {
  themes: ['github-dark'],
  defaultProps: {
    wrap: true,
    preserveIndent: true,
  },
  styleOverrides: {
    codeFontSize: '0.92rem',
    codeLineHeight: '1.55',
    codePaddingBlock: '0.75rem',
    codePaddingInline: '1rem',
    borderRadius: '6px',
    borderWidth: '1px',
  },
  frames: {
    showCopyToClipboardButton: true,
    extractFileNameFromCode: true,
  },
}

export default codeConfig

