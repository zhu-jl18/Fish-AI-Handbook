export type SidebarLink = {
  label: string;
  href: string;
  activeMatch?: RegExp | string;
};

export type SidebarGroup = {
  label: string;
  href?: string;
  items?: Array<SidebarLink>;
  openMatch?: RegExp | string;
};

export type SidebarSection = Array<SidebarLink | SidebarGroup>;

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
      { label: 'Windows Terminal', href: '/fish-talks/preparations/windows-terminal' },
      { label: 'Visual Studio Code', href: '/fish-talks/preparations/visual-studio-code' },
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
      { label: 'Vibe Coding（氛围编程）', href: '/fish-talks/advanced-concepts/vibe-coding' },
      { label: 'Workflow（工作流）', href: '/fish-talks/advanced-concepts/workflow' },
    ],
  },
];


