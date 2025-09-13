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
  if (path.startsWith('/fish-talks')) {
    return FISH_TALKS_SIDEBAR
  }
  if (path.startsWith('/basic-usage')) {
    return BASIC_USAGE_SIDEBAR
  }
  if (path.startsWith('/prompts')) {
    return PROMPTS_SIDEBAR
  }
  if (path.startsWith('/advanced')) {
    return ADVANCED_TECHNIQUES_SIDEBAR
  }
  if (path.startsWith('/demo')) {
    return DEMO_SIDEBAR
  }
  if (path.startsWith('/fun')) {
    return FUN_SIDEBAR
  }
  if (path.startsWith('/posts')) {
    return POSTS_SIDEBAR
  }
  if (path.startsWith('/resources')) {
    return RESOURCES_SIDEBAR
  }
  return []
}

export const FISH_TALKS_SIDEBAR: SidebarSection = [
  { label: '鱼说必看', href: '/fish-talks' },
  { label: '概览', href: '/fish-talks/overview' },
  {
    label: '大模型常识',
    href: '/fish-talks/llm',
    items: [
      { label: '模型分类', href: '/fish-talks/llm/brief' },
      { label: '常见模型', href: '/fish-talks/llm/models' },
      { label: '大模型排名', href: '/fish-talks/llm/rankings' },
    ],
  },
  {
    label: '模型相关术语',
    href: '/fish-talks/model-terms',
    items: [
      { label: 'token', href: '/fish-talks/model-terms/token' },
      { label: '温度', href: '/fish-talks/model-terms/temperature' },
      { label: '流式传输', href: '/fish-talks/model-terms/streaming' },
      { label: '思考', href: '/fish-talks/model-terms/thinking' },
      { label: '上下文步数', href: '/fish-talks/model-terms/context-steps' },
    ],
  },
  {
    label: '其他常见术语',
    href: '/fish-talks/glossary',
    items: [
      { label: 'API', href: '/fish-talks/glossary/api' },
      { label: '代理', href: '/fish-talks/glossary/proxy' },
      { label: '反代', href: '/fish-talks/glossary/reverse-proxy' },
      { label: '接口', href: '/fish-talks/glossary/interface' },
      { label: '环境变量', href: '/fish-talks/glossary/env' },
    ],
  },
  {
    label: '环境准备',
    href: '/fish-talks/preparations',
    items: [
      {
        label: 'Windows Terminal',
        href: '/fish-talks/preparations/windows-terminal',
      },
      {
        label: 'Visual Studio Code',
        href: '/fish-talks/preparations/visual-studio-code',
      },
      { label: 'Node.js', href: '/fish-talks/preparations/nodejs' },
      { label: 'GitHub', href: '/fish-talks/preparations/github' },
      { label: 'VPN', href: '/fish-talks/preparations/vpn' },
    ],
  },
  {
    label: '进阶概念',
    href: '/fish-talks/advanced-concepts',
    items: [
      { label: 'Agent（智能体）', href: '/fish-talks/advanced-concepts/agent' },
      {
        label: 'Vibe Coding（氛围编程）',
        href: '/fish-talks/advanced-concepts/vibe-coding',
      },
      {
        label: 'Workflow（工作流）',
        href: '/fish-talks/advanced-concepts/workflow',
      },
    ],
  },
]

export const BASIC_USAGE_SIDEBAR: SidebarSection = [
  { label: '基础使用', href: '/basic-usage' },
  { label: '官方WebChat', href: '/basic-usage/webchat' },
  { label: '第三方集成聊天软件', href: '/basic-usage/app-integration' },
  { label: 'CLI命令行工具', href: '/basic-usage/cli' },
  { label: 'AI代码编辑器', href: '/basic-usage/editor-agent' },
  { label: '移动端AI应用', href: '/basic-usage/mobile-apps' },
]

export const PROMPTS_SIDEBAR: SidebarSection = [
  {
    label: '提示词',
    href: '/prompts',
    items: [
      { label: '基础知识', href: '/prompts/basics' },
      { label: '常用模式', href: '/prompts/patterns' },
      { label: '进阶技巧', href: '/prompts/advanced-techniques' },
    ],
  },
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
    items: [{ label: 'RAG 聊天机器人', href: '/demo/rag-chatbot' }],
  },
]

export const FUN_SIDEBAR: SidebarSection = [
  { label: '好玩的', href: '/fun' },
  { label: 'AI 绘画', href: '/fun/ai-drawing' },
  { label: '大模型越狱', href: '/fun/llm-unlocking' },
  { label: '银色酒馆', href: '/fun/silver-trivern' },
]

export const POSTS_SIDEBAR: SidebarSection = [
  { label: '折腾日常', href: '/posts' },
  {
    label: '分类',
    href: '/posts',
    items: [
      { label: '工具', href: '/posts/category/tools' },
      { label: '生活', href: '/posts/category/life' },
      { label: '随笔', href: '/posts/category/notes' },
    ],
  },
]

export const RESOURCES_SIDEBAR: SidebarSection = [
  { label: '资源合集', href: '/resources' },
]
