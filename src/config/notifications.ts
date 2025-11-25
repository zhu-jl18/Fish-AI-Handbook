/**
 * 站点通知配置
 * 用于管理站点通知内容
 */

export interface Notification {
  /** 通知唯一标识 */
  id: string
  /** 通知标题 */
  title: string
  /** 通知内容(支持纯文本) */
  content: string
  /** 通知类型 */
  type: 'info' | 'warning' | 'success' | 'announcement'
  /** 通知日期(可选,用于显示发布时间) */
  date?: string
  /** 通知链接(可选,点击跳转) */
  link?: string
  /** 是否启用 */
  enabled: boolean
}

/**
 * 通知配置
 * 按优先级排序(数组顺序即显示顺序)
 */
export const notificationsConfig: Notification[] = [
  {
    id: 'search-feature',
    title: '搜索功能',
    content: '站点集成了搜索功能，请随时反馈bug',
    type: 'info',
    enabled: true,
  },
]

/**
 * 获取启用的通知列表
 */
export function getEnabledNotifications(): Notification[] {
  return notificationsConfig.filter((n) => n.enabled)
}
