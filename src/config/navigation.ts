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
  /** SVG 图标路径 (d 属性) */
  icon: string
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
  {
    key: 'fish-talks',
    href: '/fish-talks',
    label: 'Concepts',
    icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  },
  {
    key: 'basic-usage',
    href: '/basic-usage',
    label: 'Basics',
    icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96 12 12.01l8.73-5.05 M12 22.08V12',
  },
  {
    key: 'prompts',
    href: '/prompts',
    label: 'Prompts',
    icon: 'M4 17l6-6-6-6 M12 19h8',
  },
  {
    key: 'advanced',
    href: '/advanced',
    label: 'Advanced',
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  },
  {
    key: 'fun',
    href: '/fun',
    label: 'Fun',
    icon: 'M12 2C7.58 2 4 5.58 4 10v10c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h4v1c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1h2c.55 0 1-.45 1-1V10c0-4.42-3.58-8-8-8zm-3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z',
  },
  {
    key: 'resources',
    href: '/resources',
    label: 'Resources',
    icon: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',
  },
  {
    key: 'theoretical',
    href: '/theoretical',
    label: 'Theoretical',
    icon: 'M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5',
  },
  {
    key: 'setup',
    href: '/setup',
    label: 'Configure',
    icon: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  },
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
