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
  if (path.startsWith('/concepts')) return CONCEPTS_SIDEBAR
  if (path.startsWith('/basic-usage')) return BASIC_USAGE_SIDEBAR
  if (path.startsWith('/prompts')) return PROMPTS_SIDEBAR
  if (path.startsWith('/advanced')) return ADVANCED_TECHNIQUES_SIDEBAR
  if (path.startsWith('/fun')) return FUN_SIDEBAR
  if (path.startsWith('/resources')) return RESOURCES_SIDEBAR
  if (path.startsWith('/theoretical')) return THEORETICAL_SIDEBAR
  if (path.startsWith('/manual')) return MANUAL_SIDEBAR
  return []
}

export const CONCEPTS_SIDEBAR: SidebarSection = [
  { label: '概念认知', href: '/concepts' },
  {
    label: 'Models',
    href: '/concepts/models',
    items: [
      { label: 'Top Models', href: '/concepts/models/top-models' },

      { label: 'Rankings', href: '/concepts/models/llm-rankings' },
    ],
  },
  {
    label: 'Definitions',
    href: '/concepts/glossary',
    items: [
      { label: 'Model Params', href: '/concepts/glossary/model-params' },
      { label: 'AI Concepts', href: '/concepts/glossary/ai-concepts' },
      { label: 'Derived Terms', href: '/concepts/glossary/derived-terms' },
    ],
  },
  { label: 'Developer', href: '/concepts/developer' },
]

export const BASIC_USAGE_SIDEBAR: SidebarSection = [
  { label: '基础用法', href: '/basic-usage' },
  { label: 'Chat', href: '/basic-usage/chat' },
  { label: 'Cursor', href: '/basic-usage/cursor' },
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
      { label: 'Basics', href: '/basic-usage/claude-code/basics' },
      { label: 'Advance', href: '/basic-usage/claude-code/advance' },
      { label: 'Practice', href: '/basic-usage/claude-code/practice' },
    ],
  },
  { label: 'AI 应用', href: '/basic-usage/ai-apps' },
]

export const PROMPTS_SIDEBAR: SidebarSection = [
  { label: '提示词', href: '/prompts' },
  {
    label: 'Foundations',
    href: '/prompts/foundations',
    items: [
      { label: 'Principles', href: '/prompts/foundations/principles' },
      { label: 'Anti-Patterns', href: '/prompts/foundations/anti-patterns' },
    ],
  },
  { label: 'Context', href: '/prompts/context' },
  {
    label: '实例与模板',
    href: '/prompts/examples',
    items: [
      { label: '通用模板集', href: '/prompts/examples/templates' },
      { label: '场景模板', href: '/prompts/examples/verticals' },
    ],
  },
  { label: '深入拓展', href: '/prompts/deepen' },
]

export const ADVANCED_TECHNIQUES_SIDEBAR: SidebarSection = [
  { label: '进阶玩法', href: '/advanced' },
  { label: 'RAG', href: '/advanced/rag' },
  { label: 'Spec Coding', href: '/advanced/spec-coding' },
  { label: 'MCP', href: '/advanced/mcp' },
  {
    label: 'Agents',
    href: '/advanced/agents',
    items: [],
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
  {
    label: '模型解锁',
    href: '/fun/llm-unlocking',
    items: [
      { label: '越狱 Prompt', href: '/fun/llm-unlocking/jailbreak' },
      { label: '高级技巧', href: '/fun/llm-unlocking/advanced' },
    ],
  },
  { label: 'SillyTavern', href: '/fun/sillytavern' },
  { label: 'n8n', href: '/fun/n8n' },
  { label: 'Ollama', href: '/fun/ollama' },
  { label: 'Fast API', href: '/fun/fast-api' },
]

export const RESOURCES_SIDEBAR: SidebarSection = [
  { label: '资源合集', href: '/resources' },
  { label: 'Free Tier', href: '/resources/free-tier' },
  { label: 'Little Cost', href: '/resources/little-cost' },
  {
    label: 'API Key',
    href: '/resources/api',
    items: [
      { label: '代理转发', href: '/resources/api/forwarding' },
      { label: '聚合管理', href: '/resources/api/aggregation' },
      { label: '格式转换', href: '/resources/api/conversion' },
    ],
  },
  { label: '2API', href: '/resources/2api' },
  { label: '云平台', href: '/resources/cloud-platforms' },
]

export const THEORETICAL_SIDEBAR: SidebarSection = [
  { label: '理论学习', href: '/theoretical' },
  { label: 'Transformer', href: '/theoretical/transformer' },
  { label: 'MOE', href: '/theoretical/moe' },
  { label: 'GRPO', href: '/theoretical/grpo' },
  { label: 'TR & TL', href: '/theoretical/tr-and-tl' },
]

export const MANUAL_SIDEBAR: SidebarSection = [
  { label: '配置指南', href: '/manual' },
  { label: 'Terminal', href: '/manual/terminal' },
  { label: 'Vs Code', href: '/manual/vs-code' },
  { label: 'Node.js', href: '/manual/nodejs' },
  { label: 'Git', href: '/manual/git' },
  {
    label: 'VPN',
    href: '/manual/vpn',
  },
  { label: 'Cherry Studio', href: '/manual/cherrystudio' },
  {
    label: 'Claude Code',
    href: '/manual/claude-code',
    items: [{ label: 'CCR', href: '/manual/claude-code/ccr' }],
  },
  { label: 'Codex', href: '/manual/codex' },
  { label: 'MCP Router', href: '/manual/mcp-router' },
]
