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
    id: 'welcome-2025',
    title: '欢迎访问',
    content:
      '这是一个站点通知示例,您可以在 src/config/notifications.ts 中修改此内容。',
    type: 'announcement',
    date: '2025-01-01',
    enabled: true,
  },
  {
    id: 'feature-update',
    title: '功能更新',
    content: '站点新增通知系统,可通过点击铃铛图标查看最新公告。',
    type: 'info',
    date: '2025-01-15',
    enabled: true,
  },
]

/**
 * 获取启用的通知列表
 */
export function getEnabledNotifications(): Notification[] {
  return notificationsConfig.filter((n) => n.enabled)
}
