/**
 * 导航配置
 * 集中管理顶部导航栏的链接与路由映射
 */

export type NavItem = {
  /** 导航项唯一标识（对应 URL 第一段） */
  key: string
  /** 导航链接路径 */
  href: string
  /** 导航项显示文本 */
  label: string
}

export type NavigationConfig = {
  /** 顶部导航项列表 */
  items: NavItem[]
  /** 所有有效的导航键集合（用于路由匹配） */
  validKeys: Set<string>
}

/**
 * 顶部导航配置
 * 修改此处即可调整导航栏顺序与内容
 */
const navItems: NavItem[] = [
  { key: 'fish-talks', href: '/fish-talks', label: '鱼说必看' },
  { key: 'basic-usage', href: '/basic-usage', label: '基础用法' },
  { key: 'prompts', href: '/prompts', label: '提示词' },
  { key: 'advanced', href: '/advanced', label: '进阶玩法' },
  { key: 'fun', href: '/fun', label: '好玩的' },
  { key: 'resources', href: '/resources', label: '资源合集' },
  { key: 'setup', href: '/setup', label: '配置指南' },
]

/**
 * 导航配置对象
 */
const navigationConfig: NavigationConfig = {
  items: navItems,
  validKeys: new Set(navItems.map((item) => item.key)),
}

export default navigationConfig

/**
 * 辅助函数：根据 URL 路径推导当前导航键
 * @param pathname - 当前页面路径（如 /fish-talks/models）
 * @returns 导航键（如 'fish-talks'），若不匹配则返回 'home'
 */
export function getCurrentNavKey(pathname: string): string {
  const firstSegment = pathname.split('/').filter(Boolean)[0] ?? 'home'
  return navigationConfig.validKeys.has(firstSegment) ? firstSegment : 'home'
}
