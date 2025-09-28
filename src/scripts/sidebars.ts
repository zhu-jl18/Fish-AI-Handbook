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
  if (path.startsWith('/setup')) {
    return SETUP_SIDEBAR
  }
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
  if (path.startsWith('/tech')) {
    return TECH_SIDEBAR
  }
  if (path.startsWith('/resources')) {
    return RESOURCES_SIDEBAR
  }
  return []
}

export const FISH_TALKS_SIDEBAR: SidebarSection = [
  { label: '鱼说必看', href: '/fish-talks' },
  {
    label: '大模型常识',
    href: '/fish-talks/llm',
    items: [
      { label: '模型概览', href: '/fish-talks/llm/brief' },
      { label: '知名模型', href: '/fish-talks/llm/models' },
      { label: '模型排行榜', href: '/fish-talks/llm/rankings' },
    ],
  },
  {
    label: '模型相关术语',
    href: '/fish-talks/model-terms',
    items: [
      { label: 'token', href: '/fish-talks/model-terms/token' },
      { label: '温度', href: '/fish-talks/model-terms/temperature' },
      { label: '流式输出', href: '/fish-talks/model-terms/streaming' },
      { label: '思维链', href: '/fish-talks/model-terms/thinking' },
      { label: '上下文长度', href: '/fish-talks/model-terms/context-steps' },
    ],
  },
  {
    label: '基础词汇表',
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
    label: '流行词汇',
    href: '/fish-talks/buzzwords',
    items: [
      { label: 'Agent', href: '/fish-talks/buzzwords/agent' },
      { label: 'Vibe Coding', href: '/fish-talks/buzzwords/vibe-coding' },
      { label: 'Workflow', href: '/fish-talks/buzzwords/workflow' },
    ],
  },
]

export const BASIC_USAGE_SIDEBAR: SidebarSection = [
  { label: '基础使用', href: '/basic-usage' },
  { label: '官方 WebChat', href: '/basic-usage/webchat' },
  { label: '接入常见应用', href: '/basic-usage/app-integration' },
  { label: 'CLI 使用', href: '/basic-usage/cli' },
  { label: 'AI 编辑器', href: '/basic-usage/editor-agent' },
  { label: '移动端应用', href: '/basic-usage/mobile-apps' },
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
      { label: '系统提示词', href: '/prompts/dialogue-levels/system-prompts' },
      { label: '助手消息', href: '/prompts/dialogue-levels/assistant-messages' },
      { label: '用户提示词', href: '/prompts/dialogue-levels/user-prompts' },
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

export const DEMO_SIDEBAR: SidebarSection = [
  { label: 'DEMO', href: '/demo' },
  { label: 'RAG 助手示例', href: '/demo/rag-chatbot' },
]

export const FUN_SIDEBAR: SidebarSection = [
  { label: '好玩的', href: '/fun' },
  { label: 'AI 绘画', href: '/fun/ai-drawing' },
  { label: '模型解锁', href: '/fun/llm-unlocking' },
  { label: '角色扮演', href: '/fun/silver-trivern' },
]

export const RESOURCES_SIDEBAR: SidebarSection = [
  { label: '资源合集', href: '/resources' },
  { label: 'API KEY', href: '/resources/api-key' },
  { label: '代理节点', href: '/resources/proxy-nodes' },
]

export const SETUP_SIDEBAR: SidebarSection = [
  { label: '配置指南', href: '/setup' },
  {
    label: '环境准备',
    href: '/setup/prerequisites',
    items: [
      { label: '终端', href: '/setup/prerequisites/terminal' },
      { label: 'Vs Code', href: '/setup/prerequisites/vs-code' },
      { label: 'Node.js', href: '/setup/prerequisites/nodejs' },
      { label: 'GitHub', href: '/setup/prerequisites/github' },
      { label: 'VPN', href: '/setup/prerequisites/vpn' },
    ],
  },
  {
    label: 'Cherry Studio',
    href: '/setup/cherrystudio',
    items: [
      { label: '模型服务', href: '/setup/cherrystudio/model-services' },
      { label: '定义助手', href: '/setup/cherrystudio/assistant-definitions' },
      { label: '显示美化', href: '/setup/cherrystudio/ui-enhancement' },
      { label: '数据设置', href: '/setup/cherrystudio/data-settings' },
      { label: '其他', href: '/setup/cherrystudio/others' },
    ],
  },
  { label: 'Claude Code', href: '/setup/claude-code' },
  { label: 'Codex', href: '/setup/codex' },
]

export const TECH_SIDEBAR: SidebarSection = [
  { label: '技术向', href: '/tech' },
  {
    label: '2API',
    href: '/tech/2api',
    items: [
      { label: 'retool2api', href: '/tech/2api/retool2api' },
      { label: 'qwen2api', href: '/tech/2api/qwen2api' },
      { label: 'pplx2api', href: '/tech/2api/pplx2api' },
      { label: 'deepinfra2api', href: '/tech/2api/deepinfra2api' },
      { label: 'zai2api', href: '/tech/2api/zai2api' },
      { label: 'LMArena2api', href: '/tech/2api/LMArena2api' },
      { label: 'highlight2api', href: '/tech/2api/highlight2api' },
      { label: 'warp2api', href: '/tech/2api/warp2api' },
      { label: 'cerebras2api', href: '/tech/2api/cerebras2api' },
    ],
  },
  { label: 'API 管理', href: '/tech/api-management' },
  {
    label: '部署平台',
    href: '/tech/deployment-platforms',
    items: [
      { label: 'Cloudflare', href: '/tech/deployment-platforms/cloudflare' },
      { label: 'Vercel', href: '/tech/deployment-platforms/vercel' },
      { label: 'Deno', href: '/tech/deployment-platforms/deno' },
      { label: 'Supabase', href: '/tech/deployment-platforms/supabase' },
      { label: 'Render', href: '/tech/deployment-platforms/render' },
      { label: 'Railway', href: '/tech/deployment-platforms/railway' },
      { label: 'Koyeb', href: '/tech/deployment-platforms/koyeb' },
    ],
  },
]
