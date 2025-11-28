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
  if (path.startsWith('/daily')) return DAILY_SIDEBAR
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
  { label: 'Top Models', href: '/concepts/top-models' },
  { label: 'Model Params', href: '/concepts/model-params' },
  { label: 'Benchmark', href: '/concepts/benchmark' },
  { label: '核心概念', href: '/concepts/core-concepts' },
  { label: '术语速查', href: '/concepts/glossary' },
  {
    label: 'Developer',
    href: '/concepts/developer',
    items: [
      { label: 'Interface', href: '/concepts/developer/interface' },
      { label: 'Gateway', href: '/concepts/developer/gateway' },
      { label: 'Automation', href: '/concepts/developer/automation' },
    ],
  },
]

export const DAILY_SIDEBAR: SidebarSection = [
  { label: '日常使用', href: '/daily' },
  { label: 'Gemini & Grok', href: '/daily/gemini-grok' },
  {
    label: 'Cherry Studio',
    href: '/daily/cherrystudio',
    items: [
      { label: '基础', href: '/daily/cherrystudio/basics' },
      { label: '进阶', href: '/daily/cherrystudio/advanced' },
    ],
  },
  {
    label: 'Claude Code',
    href: '/daily/claude-code',
    items: [
      { label: 'Basics', href: '/daily/claude-code/basics' },
      { label: 'Advance', href: '/daily/claude-code/advance' },
      { label: 'Practice', href: '/daily/claude-code/practice' },
    ],
  },
  { label: 'Anti Gravity', href: '/daily/anti-gravity' },
  { label: '豆包', href: '/daily/doubao' },
  { label: 'AI 应用', href: '/daily/ai-apps' },
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
  { label: 'Assistants', href: '/prompts/assistants' },
  { label: 'AGENTS.MD', href: '/prompts/agents-md' },
  { label: '深入拓展', href: '/prompts/deepen' },
]

export const ADVANCED_TECHNIQUES_SIDEBAR: SidebarSection = [
  { label: '进阶玩法', href: '/advanced' },
  { label: 'RAG', href: '/advanced/rag' },
  { label: 'SDD', href: '/advanced/sdd' },
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
  { label: '小模型', href: '/fun/small-models' },
  { label: 'Fast API', href: '/fun/fast-api' },
]

export const RESOURCES_SIDEBAR: SidebarSection = [
  { label: '资源合集', href: '/resources' },
  { label: '2API', href: '/resources/2api' },
  { label: 'Free Tier', href: '/resources/free-tier' },
  { label: 'Little Cost', href: '/resources/little-cost' },
  { label: 'API Key', href: '/resources/api' },
  { label: '云平台', href: '/resources/cloud-platforms' },
]

export const THEORETICAL_SIDEBAR: SidebarSection = [
  { label: '理论学习', href: '/theoretical' },
  { label: 'Transformer', href: '/theoretical/transformer' },
  { label: 'MOE', href: '/theoretical/moe' },
  { label: 'Scaling Laws', href: '/theoretical/scaling-laws' },
  { label: 'Alignment', href: '/theoretical/alignment' },
  { label: 'GRPO', href: '/theoretical/grpo' },
  { label: 'TR & TL', href: '/theoretical/tr-and-tl' },
  { label: 'Agents & Training', href: '/theoretical/agents' },
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
