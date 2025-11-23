/**
 * 配置入口文件
 * 统一导出所有配置，方便集中引用
 */

export { default as siteConfig, getRobotsContent } from './site'
export type { SiteConfig } from './site'

export { default as navigationConfig, getCurrentNavKey } from './navigation'
export type { NavItem, NavigationConfig } from './navigation'

export { default as theme } from './theme'
export type { Theme } from './theme'

export { default as codeConfig } from './code'
export type { CodeConfig } from './code'

export { CHAPTER_LABELS } from './search'
