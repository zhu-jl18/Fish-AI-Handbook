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
  { label: 'Models', href: '/fish-talks/models' },
  { label: '模型排行', href: '/fish-talks/llm-rankings' },
  {
    label: '术语扫盲',
    href: '/fish-talks/glossary',
    items: [
      { label: '模型参数', href: '/fish-talks/glossary/model-params' },
      { label: 'AI概念', href: '/fish-talks/glossary/ai-concepts' },
    ],
  },
  {
    label: '流行词汇',
    href: '/fish-talks/buzz',
    items: [
      { label: 'Vibe Coding', href: '/fish-talks/buzz/vibe-coding' },
      { label: 'Agent', href: '/fish-talks/buzz/agent' },
      { label: 'Workflow', href: '/fish-talks/buzz/workflow' },
    ],
  },
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
      { label: 'Necessity', href: '/prompts/interaction-basics/basics' },
      { label: '好与坏', href: '/prompts/interaction-basics/good-vs-bad' },
    ],
  },
  {
    label: 'Context',
    href: '/prompts/context',
    items: [
      { label: '对话层级', href: '/prompts/context/dialogue-levels' },
      { label: '请求体', href: '/prompts/context/request-body' },
    ],
  },
  { label: '实用技巧', href: '/prompts/practical-tips' },
  { label: '高级框架', href: '/prompts/advanced-frameworks' },
  { label: 'Examples', href: '/prompts/examples' },
  { label: '扩展阅读', href: '/prompts/extended-reading' },
]

export const ADVANCED_TECHNIQUES_SIDEBAR: SidebarSection = [
  { label: '进阶玩法', href: '/advanced' },
  {
    label: '知识库',
    href: '/advanced/knowledge-bases',
    items: [
      { label: '原理概述', href: '/advanced/knowledge-bases/principles' },
      { label: '实践指南', href: '/advanced/knowledge-bases/implementation' },
    ],
  },
  { label: 'MCP', href: '/advanced/mcp' },
  {
    label: 'Agents',
    href: '/advanced/agents',
    items: [{ label: '构建指南', href: '/advanced/agents/agent-build' }],
  },
  { label: 'Workflow', href: '/advanced/workflow' },
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
  { label: 'Git', href: '/setup/git' },
  { label: 'VPN', href: '/setup/vpn' },
  { label: 'Cherry Studio', href: '/setup/cherrystudio' },
  {
    label: 'Claude Code',
    href: '/setup/claude-code',
    items: [{ label: 'CCR', href: '/setup/claude-code/ccr' }],
  },
  { label: 'Codex', href: '/setup/codex' },
  { label: 'MCP Router', href: '/setup/mcp-router' },
]
