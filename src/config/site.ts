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
  url: 'https://ai.functorfish.me',
  title: 'Fish Book',
  titleFull: 'Fish Book',
  description: '🐱',
  logoMark: 'F',
  logoImage: 'https://media.makomako.dpdns.org/images/2025/11/wired-lineal--ai',
  logoName: 'Fish AI Handbook',
  logoMeta: 'Docs & Patterns',
  searchLabel: '搜索或跳转',
  avatarImage:
    'https://media.makomako.dpdns.org/images/2025/10/thumb-devil-circle',
  favicon: 'https://media.makomako.dpdns.org/images/2025/11/wired-lineal--ai',
  defaultContributor: {
    username: 'zhu-jl18',
    name: 'Fish',
    link: 'https://github.com/zhu-jl18',
    avatar: 'https://github.com/zhu-jl18.png',
  },
  robots: {
    noindex: true,
    nofollow: true,
    noarchive: true,
    noimageindex: true,
  },
}

export default siteConfig

/**
 * 贡献者信息类型
 */
export type ContributorInfo = {
  username: string
  name: string
  link: string
  avatar: string
}

/**
 * 预定义的 AI 模型贡献者映射表
 * 用于在 frontmatter 中通过简短别名引用完整的贡献者信息
 */
export const CONTRIBUTORS_MAP: Record<string, ContributorInfo> = {
  claude: {
    username: 'claude',
    name: 'Claude',
    link: 'https://github.com/anthropics',
    avatar: 'https://avatars.githubusercontent.com/u/81847?v=4',
  },
  codex: {
    username: 'codex',
    name: 'Codex',
    link: 'https://github.com/openai',
    avatar: 'https://avatars.githubusercontent.com/u/14957082?s=48&v=4',
  },
  gemini: {
    username: 'gemini',
    name: 'Gemini',
    link: 'https://github.com/google-gemini',
    avatar: 'https://avatars.githubusercontent.com/u/161781182?s=48&v=4',
  },
  glm: {
    username: 'glm',
    name: 'GLM',
    link: 'https://github.com/zai-org',
    avatar: 'https://media.makomako.dpdns.org/images/2025/11/zhipu',
  },
}

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
