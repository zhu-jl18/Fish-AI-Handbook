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
  if (path.startsWith('/setup')) return SETUP_SIDEBAR
  if (path.startsWith('/fish-talks')) return FISH_TALKS_SIDEBAR
  if (path.startsWith('/basic-usage')) return BASIC_USAGE_SIDEBAR
  if (path.startsWith('/prompts')) return PROMPTS_SIDEBAR
  if (path.startsWith('/advanced')) return ADVANCED_TECHNIQUES_SIDEBAR
  if (path.startsWith('/demo')) return DEMO_SIDEBAR
  if (path.startsWith('/tech')) return TECH_SIDEBAR
  if (path.startsWith('/fun')) return FUN_SIDEBAR
  if (path.startsWith('/resources')) return RESOURCES_SIDEBAR
  return []
}

export const FISH_TALKS_SIDEBAR: SidebarSection = [
  { label: '鱼说必看', href: '/fish-talks' },
  { label: '概览', href: '/fish-talks/overview' },
  {
    label: '大模型认知',
    href: '/fish-talks/llm',
    items: [
      { label: '模型简介', href: '/fish-talks/llm/brief' },
      { label: '常见模型', href: '/fish-talks/llm/models' },
      { label: '模型排行', href: '/fish-talks/llm/rankings' },
    ],
  },
  {
    label: '模型基础概念',
    href: '/fish-talks/model-terms',
    items: [
      { label: 'token', href: '/fish-talks/model-terms/token' },
      { label: '温度', href: '/fish-talks/model-terms/temperature' },
      { label: '流式输出', href: '/fish-talks/model-terms/streaming' },
      { label: '思维', href: '/fish-talks/model-terms/thinking' },
      { label: '上下文步骤', href: '/fish-talks/model-terms/context-steps' },
    ],
  },
  {
    label: '术语表',
    href: '/fish-talks/glossary',
    items: [
      { label: 'API', href: '/fish-talks/glossary/api' },
      { label: '代理', href: '/fish-talks/glossary/proxy' },
      { label: '反向代理', href: '/fish-talks/glossary/reverse-proxy' },
      { label: '接口', href: '/fish-talks/glossary/interface' },
      { label: '环境变量', href: '/fish-talks/glossary/env' },
    ],
  },
  {
    label: '高级概念',
    href: '/fish-talks/advanced-concepts',
    items: [
      { label: 'Agent（智能体）', href: '/fish-talks/advanced-concepts/agent' },
      { label: 'Vibe Coding（氛围编码）', href: '/fish-talks/advanced-concepts/vibe-coding' },
      { label: 'Workflow（工作流）', href: '/fish-talks/advanced-concepts/workflow' },
    ],
  },
]

export const BASIC_USAGE_SIDEBAR: SidebarSection = [
  { label: '基础用法', href: '/basic-usage' },
  { label: '官方 WebChat', href: '/basic-usage/webchat' },
  { label: '应用接入与集成', href: '/basic-usage/app-integration' },
  { label: 'CLI 工具与命令', href: '/basic-usage/cli' },
  { label: 'AI 编辑器', href: '/basic-usage/editor-agent' },
  { label: '移动端 AI 应用', href: '/basic-usage/mobile-apps' },
]

export const PROMPTS_SIDEBAR: SidebarSection = [
  { label: '提示词', href: '/prompts' },
  {
    label: '基础知识',
    href: '/prompts/basics',
    items: [
      { label: '入门', href: '/prompts/basics/intro' },
      { label: '结构规范', href: '/prompts/basics/structure' },
      { label: '注意事项', href: '/prompts/basics/dos-and-donts' },
    ],
  },
  {
    label: '常见模式',
    href: '/prompts/patterns',
    items: [
      { label: 'Few-shot', href: '/prompts/patterns/few-shot' },
      { label: 'Role Prompting', href: '/prompts/patterns/role-prompting' },
      { label: 'Chain-of-Thought', href: '/prompts/patterns/chain-of-thought' },
    ],
  },
  { label: '进阶技巧', href: '/prompts/advanced' },
]

export const ADVANCED_TECHNIQUES_SIDEBAR: SidebarSection = [
  {
    label: '进阶玩法',
    href: '/advanced',
    items: [
      { label: '知识库', href: '/advanced/knowledge-bases' },
      { label: 'MCP', href: '/advanced/mcp' },
      { label: '多智能体', href: '/advanced/multi-agent' },
      { label: 'RAG', href: '/advanced/rag' },
      { label: '向量数据库', href: '/advanced/vector-databases' },
    ],
  },
]

export const DEMO_SIDEBAR: SidebarSection = [
  {
    label: 'Demos',
    href: '/demo',
  },
]

export const TECH_SIDEBAR: SidebarSection = [
  {
    label: '技术向',
    href: '/tech',
    items: [
      { label: '2API', href: '/tech/2api' },
      { label: 'API 管理', href: '/tech/api-management' },
      { label: 'UltraThink', href: '/tech/ultrathink' },
    ],
  },
]

export const FUN_SIDEBAR: SidebarSection = [
  { label: '好玩的', href: '/fun' },
  { label: 'AI 作画', href: '/fun/ai-drawing' },
  { label: '大模型解锁', href: '/fun/llm-unlocking' },
  { label: '银三叉', href: '/fun/silver-trivern' },
]

export const RESOURCES_SIDEBAR: SidebarSection = [
  { label: '资源合集', href: '/resources' },
]

export const SETUP_SIDEBAR: SidebarSection = [
  { label: '配置指南', href: '/setup' },
  {
    label: '环境准备',
    href: '/setup/preparations',
    items: [
      { label: 'Windows Terminal', href: '/setup/preparations/windows-terminal' },
      { label: 'Visual Studio Code', href: '/setup/preparations/visual-studio-code' },
      { label: 'Node.js', href: '/setup/preparations/nodejs' },
      { label: 'GitHub', href: '/setup/preparations/github' },
      { label: 'VPN', href: '/setup/preparations/vpn' },
    ],
  },
]

