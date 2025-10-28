/**
 * 站点基本信息配置
 * 集中管理站点的核心元数据，方便模板化与部署
 */

export type SiteConfig = {
  /** 站点完整 URL（用于 sitemap、RSS、OG 标签等） */
  url: string
  /** 站点标题（简称） */
  title: string
  /** 站点全称（用于页面标题后缀） */
  titleFull: string
  /** 站点描述（用于 meta description） */
  description: string
  /** Logo 标记文本（单字母） */
  logoMark: string
  /** Logo 图片 URL（可选，支持 GIF；为空则显示 logoMark 文本） */
  logoImage?: string
  /** Logo 主标题 */
  logoName: string
  /** Logo 副标题 */
  logoMeta: string
  /** 搜索按钮文案 */
  searchLabel: string
  /** 个人头像图片 URL（可选，支持 GIF；为空则显示 logoMark 文本） */
  avatarImage?: string
  /** 网站 favicon 图标 URL（可选） */
  favicon?: string
  /** 默认贡献者信息（用于未配置 contributors 的页面） */
  defaultContributor: {
    username: string
    name: string
    link: string
    avatar: string
  }
  /** SEO robots 策略 */
  robots: {
    /** 是否允许索引 */
    noindex: boolean
    /** 是否允许跟踪链接 */
    nofollow: boolean
    /** 是否允许存档 */
    noarchive: boolean
    /** 是否允许图片索引 */
    noimageindex: boolean
  }
}

/**
 * 默认站点配置
 * 修改此处即可全局更新站点信息
 */
const siteConfig: SiteConfig = {
  url: 'https://fish-ai-handbook.vercel.app',
  title: 'Fish Book',
  titleFull: 'Fish Book',
  description: '🐱',
  logoMark: 'F',
  logoImage: 'https://media.makomako.dpdns.org/images/2025/10/gemini-sticker',
  logoName: 'Fish AI Handbook',
  logoMeta: 'Docs & Patterns',
  searchLabel: '搜索或跳转',
  avatarImage:
    'https://media.makomako.dpdns.org/images/2025/10/thumb-devil-circle',
  favicon:
    'https://media.makomako.dpdns.org/images/2025/09/19/1758245465-codex',
  defaultContributor: {
    username: 'zhu-jl18',
    name: 'zhu-jl18',
    link: 'https://github.com/zhu-jl18',
    avatar: 'https://github.com/zhu-jl18.png',
  },
  robots: {
    noindex: false,
    nofollow: false,
    noarchive: false,
    noimageindex: false,
  },
}

export default siteConfig

/**
 * 辅助函数：生成 robots meta 标签内容
 */
export function getRobotsContent(config: SiteConfig['robots']): string {
  const tags: string[] = []
  if (config.noindex) tags.push('noindex')
  if (config.nofollow) tags.push('nofollow')
  if (config.noarchive) tags.push('noarchive')
  if (config.noimageindex) tags.push('noimageindex')
  return tags.join(', ')
}
