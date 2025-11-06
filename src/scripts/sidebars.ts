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
  if (path.startsWith('/theoretical')) return THEORETICAL_SIDEBAR
  if (path.startsWith('/setup')) return SETUP_SIDEBAR
  return []
}

export const FISH_TALKS_SIDEBAR: SidebarSection = [
  { label: '鱼说必看', href: '/fish-talks' },
  {
    label: 'Models',
    href: '/fish-talks/models',
    items: [
      { label: 'Big Three', href: '/fish-talks/models/big-three' },
      { label: 'CN Six', href: '/fish-talks/models/cn-6' },
      { label: 'Others', href: '/fish-talks/models/others' },
      { label: '模型排名', href: '/fish-talks/models/llm-rankings' },
    ],
  },
  {
    label: '术语扫盲',
    href: '/fish-talks/glossary',
    items: [
      { label: '模型参数', href: '/fish-talks/glossary/model-params' },
      { label: 'AI概念', href: '/fish-talks/glossary/ai-concepts' },
      { label: '衍生词', href: '/fish-talks/glossary/derived-terms' },
    ],
  },
]

export const BASIC_USAGE_SIDEBAR: SidebarSection = [
  { label: '基础用法', href: '/basic-usage' },
  { label: 'WebChat', href: '/basic-usage/webchat' },
  { label: 'AI IDE', href: '/basic-usage/ide-agent' },
  { label: 'Mobile', href: '/basic-usage/mobile-apps' },
  {
    label: 'Cherry Studio',
    href: '/basic-usage/cherrystudio',
    items: [
      { label: '基础', href: '/basic-usage/cherrystudio/basics' },
      { label: '进阶', href: '/basic-usage/cherrystudio/advanced' },
    ],
  },
  {
    label: 'Claude Code',
    href: '/basic-usage/claude-code',
    items: [
      { label: 'Subagent', href: '/basic-usage/claude-code/subagent' },
      { label: 'Hook', href: '/basic-usage/claude-code/hook' },
      { label: 'Skill', href: '/basic-usage/claude-code/skill' },
    ],
  },
  { label: 'Codex', href: '/basic-usage/codex' },
  { label: 'AI 应用', href: '/basic-usage/ai-apps' },
]

export const PROMPTS_SIDEBAR: SidebarSection = [
  { label: '提示词', href: '/prompts' },
  {
    label: '理论与框架',
    href: '/prompts/foundations',
    items: [
      { label: '核心原则', href: '/prompts/foundations/principles' },
      { label: '模板骨架', href: '/prompts/foundations/template-skeleton' },
      { label: '常用技巧', href: '/prompts/foundations/techniques' },
      { label: '反模式清单', href: '/prompts/foundations/anti-patterns' },
    ],
  },
  {
    label: 'Context',
    href: '/prompts/context',
    items: [
      { label: '对话层级', href: '/prompts/context/dialogue-levels' },
      { label: '请求体', href: '/prompts/context/request-body' },
      { label: '坑与反常规', href: '/prompts/context/pitfalls' },
    ],
  },
  { label: '高级框架', href: '/prompts/advanced-frameworks' },
  {
    label: '实例与模板',
    href: '/prompts/examples',
    items: [
      { label: '通用模板集', href: '/prompts/examples/templates' },
      { label: '协作范式', href: '/prompts/examples/collab-patterns' },
      { label: '结构化抽取', href: '/prompts/examples/data-extraction' },
      { label: '编码与评审', href: '/prompts/examples/coding' },
      { label: '研究与引用', href: '/prompts/examples/research' },
      { label: '图像理解', href: '/prompts/examples/image' },
    ],
  },
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
  { label: 'OptILLM', href: '/advanced/optillm' },
  { label: 'Workflow', href: '/advanced/workflow' },
]

export const FUN_SIDEBAR: SidebarSection = [
  { label: '好玩的', href: '/fun' },
  {
    label: 'AI 绘画',
    href: '/fun/ai-drawing',
    items: [
      { label: '🍌 banana', href: '/fun/ai-drawing/banana' },
      { label: 'ComfyUI', href: '/fun/ai-drawing/comfyui' },
    ],
  },
  { label: '模型解锁', href: '/fun/llm-unlocking' },
  { label: 'SillyTavern', href: '/fun/sillytavern' },
  { label: 'n8n', href: '/fun/n8n' },
  { label: 'Ollama', href: '/fun/ollama' },
  { label: 'Fast API', href: '/fun/fast-api' },
]

export const RESOURCES_SIDEBAR: SidebarSection = [
  { label: '资源合集', href: '/resources' },
  { label: 'FREE', href: '/resources/free-tier' },
  {
    label: 'API',
    href: '/resources/api',
    items: [
      { label: '代理转发', href: '/resources/api/forwarding' },
      { label: '聚合管理', href: '/resources/api/aggregation' },
      { label: '格式转换', href: '/resources/api/conversion' },
    ],
  },
  { label: '2API', href: '/resources/2api' },
  { label: '云平台', href: '/resources/cloud-platforms' },
  { label: 'PAID', href: '/resources/paid' },
]

export const THEORETICAL_SIDEBAR: SidebarSection = [
  { label: '理论学习', href: '/theoretical' },
  { label: 'Transformer', href: '/theoretical/transformer' },
  { label: 'MOE', href: '/theoretical/moe' },
  { label: 'GRPO', href: '/theoretical/grpo' },
]

export const SETUP_SIDEBAR: SidebarSection = [
  { label: '配置指南', href: '/setup' },
  { label: 'Terminal', href: '/setup/terminal' },
  { label: 'Vs Code', href: '/setup/vs-code' },
  { label: 'Node.js', href: '/setup/nodejs' },
  { label: 'Git', href: '/setup/git' },
  {
    label: 'VPN',
    href: '/setup/vpn',
    items: [{ label: '云服务器', href: '/setup/vpn/cloud-server' }],
  },
  { label: 'Cherry Studio', href: '/setup/cherrystudio' },
  {
    label: 'Claude Code',
    href: '/setup/claude-code',
    items: [{ label: 'CCR', href: '/setup/claude-code/ccr' }],
  },
  { label: 'Codex', href: '/setup/codex' },
  { label: 'MCP Router', href: '/setup/mcp-router' },
]
