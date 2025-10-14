export type SidebarLink = {
  label: string
  href: string
  activeMatch?: RegExp | string
}

export type SidebarGroup = {
  label: string
  href?: string
  items?: Array<SidebarLink>
  openMatch?: RegExp | string
}

export type SidebarSection = Array<SidebarLink | SidebarGroup>

export function getSidebarForPath(path: string): SidebarSection {
  if (path.startsWith('/fish-talks')) return FISH_TALKS_SIDEBAR
  if (path.startsWith('/basic-usage')) return BASIC_USAGE_SIDEBAR
  if (path.startsWith('/prompts')) return PROMPTS_SIDEBAR
  if (path.startsWith('/advanced')) return ADVANCED_TECHNIQUES_SIDEBAR
  if (path.startsWith('/fun')) return FUN_SIDEBAR
  if (path.startsWith('/resources')) return RESOURCES_SIDEBAR
  if (path.startsWith('/setup')) return SETUP_SIDEBAR
  return []
}

export const FISH_TALKS_SIDEBAR: SidebarSection = [
  { label: '鱼说必看', href: '/fish-talks' },
  { label: '模型介绍', href: '/fish-talks/llm-info' },
  { label: '模型排行', href: '/fish-talks/llm-rankings' },
  { label: '模型参数', href: '/fish-talks/model-params' },
  { label: '相关词汇', href: '/fish-talks/related-terms' },
  { label: '流行词汇', href: '/fish-talks/buzz' },
]

export const BASIC_USAGE_SIDEBAR: SidebarSection = [
  { label: '基础用法', href: '/basic-usage' },
  { label: 'WebChat', href: '/basic-usage/webchat' },
  { label: 'AI IDE', href: '/basic-usage/editor-agent' },
  { label: 'Mobile', href: '/basic-usage/mobile-apps' },
  { label: 'Cherry Studio', href: '/basic-usage/cherrystudio' },
  { label: 'Claude Code', href: '/basic-usage/claude-code' },
  { label: 'Codex', href: '/basic-usage/codex' },
  { label: 'Others', href: '/basic-usage/others' },
]

export const PROMPTS_SIDEBAR: SidebarSection = [
  { label: '提示词', href: '/prompts' },
  {
    label: '交互基础',
    href: '/prompts/interaction-basics',
    items: [
      { label: '定义', href: '/prompts/interaction-basics/definition' },
      { label: '必要性', href: '/prompts/interaction-basics/necessity' },
      { label: '好与坏', href: '/prompts/interaction-basics/good-vs-bad' },
    ],
  },
  { label: '上下文学习', href: '/prompts/context-learning' },
  {
    label: '对话层级',
    href: '/prompts/dialogue-levels',
    items: [
      { label: '系统提示', href: '/prompts/dialogue-levels/system-prompts' },
      { label: '助手消息', href: '/prompts/dialogue-levels/assistant-messages' },
      { label: '用户提示', href: '/prompts/dialogue-levels/user-prompts' },
      { label: '一个例子', href: '/prompts/dialogue-levels/example' },
    ],
  },
  {
    label: '实用技巧',
    href: '/prompts/practical-tips',
    items: [
      { label: '优先级', href: '/prompts/practical-tips/priority' },
      { label: '指令遵循', href: '/prompts/practical-tips/instruction-following' },
      { label: '提示词增强', href: '/prompts/practical-tips/prompt-amplification' },
      { label: '自我迭代', href: '/prompts/practical-tips/self-iteration' },
    ],
  },
  { label: '高级框架', href: '/prompts/advanced-frameworks' },
  { label: '好用范例', href: '/prompts/handy-examples' },
]

export const ADVANCED_TECHNIQUES_SIDEBAR: SidebarSection = [
  { label: '进阶玩法', href: '/advanced' },
  { label: '知识库', href: '/advanced/knowledge-bases' },
  { label: 'MCP', href: '/advanced/mcp' },
  { label: '多智能体', href: '/advanced/multi-agent' },
  { label: 'RAG', href: '/advanced/rag' },
  { label: '向量数据库', href: '/advanced/vector-databases' },
]


export const FUN_SIDEBAR: SidebarSection = [
  { label: '好玩的', href: '/fun' },
  { label: 'AI 绘画', href: '/fun/ai-drawing' },
  { label: '模型解锁', href: '/fun/llm-unlocking' },
  { label: 'Silver Trivern', href: '/fun/silver-trivern' },
]

export const RESOURCES_SIDEBAR: SidebarSection = [
  { label: '资源合集', href: '/resources' },
  { label: 'API KEY', href: '/resources/api-key' },
  { label: '代理节点', href: '/resources/proxy-nodes' },
  { label: '2API', href: '/resources/2api' },
  { label: '云平台', href: '/resources/cloud-platforms' },
]

export const SETUP_SIDEBAR: SidebarSection = [
  { label: '配置指南', href: '/setup' },
  { label: 'Terminal', href: '/setup/terminal' },
  { label: 'Vs Code', href: '/setup/vs-code' },
  { label: 'Node.js', href: '/setup/nodejs' },
  { label: 'GitHub', href: '/setup/github' },
  { label: 'VPN', href: '/setup/vpn' },
  { label: 'Cherry Studio', href: '/setup/cherrystudio' },
  { label: 'Claude Code', href: '/setup/claude-code' },
  { label: 'Codex', href: '/setup/codex' },
]


