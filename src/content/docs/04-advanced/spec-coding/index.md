---
title: 'Spec Coding'
description: '规格驱动的 LLM 编程：从对话式试错到结构化协作'
contributors:
  - codex
  - claude
---

## Vibe Coding vs Spec Coding

```
Vibe Coding                    Spec Coding
┌─────────────┐                ┌─────────────┐
│   Prompt    │                │    Spec     │
└──────┬──────┘                └──────┬──────┘
       │                              │
       v                              v
┌─────────────┐                ┌─────────────┐
│  LLM Output │                │   Planner   │
└──────┬──────┘                └──────┬──────┘
       │                              │
       v                              ├──────> Agent 1
   满意? No ──┐                       ├──────> Agent 2
       │      │                       └──────> Agent N
      Yes     │                              │
       │      │                              v
    Done   <──┘                        ┌─────────────┐
   (maybe)                             │   Verify    │
                                       └──────┬──────┘
                                              │
                                           Pass/Fail
```

| 维度 | Vibe Coding | Spec Coding |
|------|-------------|-------------|
| 上下文载体 | 对话历史 | 文件系统中的规格文档 |
| 协作方式 | 单线程对话 | 多 agent 并行执行 |
| 可复现性 | 依赖对话重放 | 规格即版本控制 |
| 变更追踪 | 无结构 | Delta/Change Proposal |
| 验证机制 | 人工判断 | 自动化检查 |
| 适用场景 | 探索期、原型验证 | 交付期、团队协作 |

## OpenSpec: 规格即变更管理

OpenSpec 将规格视为 **状态** 和 **变更** 的分离：现有功能的规格存储在 `specs/`，待实现的变更以 proposal 形式存储在 `changes/`。

### 目录结构

```
openspec/
├── specs/                    # 当前系统规格（source of truth）
│   └── auth/
│       └── spec.md
├── changes/                  # 提议的变更（待审查/实现）
│   └── add-2fa/
│       ├── proposal.md       # 变更意图
│       ├── tasks.md          # 实现任务清单
│       ├── design.md         # 技术决策（可选）
│       └── specs/
│           └── auth/
│               └── spec.md   # Delta（与 specs/auth/spec.md 的差异）
└── archive/                  # 已完成的变更
    └── add-2fa/
```

### 工作流程

```
1. Draft Proposal          2. Review & Align         3. Implement
   ┌──────────┐               ┌──────────┐              ┌──────────┐
   │ /openspec│               │Edit specs│              │ /openspec│
   │:proposal │──────────────>│   tasks  │─────────────>│ :apply   │
   └──────────┘               └──────────┘              └──────────┘
        │                           ▲                         │
        │                           │                         │
        v                           │                         v
   Change folder              Feedback loop              Execute tasks
   scaffolded                 with AI/team               mark complete
        │                           │                         │
        └───────────────────────────┘                         │
                                                              │
4. Archive                                                    │
   ┌──────────┐                                              │
   │ /openspec│<─────────────────────────────────────────────┘
   │ :archive │
   └──────────┘
        │
        v
   Merge delta to specs/
   Move to archive/
```

### Delta 格式示例

```markdown
<!-- openspec/changes/add-2fa/specs/auth/spec.md -->
# Delta for Auth

## ADDED Requirements
### Requirement: Two-Factor Authentication
系统必须在登录时要求第二因素验证。

#### Scenario: OTP 验证流程
- WHEN 用户提交有效凭证
- THEN 系统发送 OTP 至注册邮箱
- AND 用户必须在 5 分钟内提交正确 OTP

## MODIFIED Requirements
### Requirement: Session Management
原文: JWT 有效期 24 小时
修改为: JWT 有效期 1 小时，支持 refresh token

## REMOVED Requirements
### Requirement: Remember Me Cookie
不再支持"记住我"功能，统一使用短期 token
```

### 命令参考

| 命令 | 作用 |
|------|------|
| `openspec list` | 列出所有活跃的 changes |
| `openspec show <change>` | 查看 proposal/tasks/spec delta |
| `openspec validate <change>` | 验证规格格式是否正确 |
| `openspec archive <change>` | 将 delta 合并到 specs/，移至 archive/ |

### 与 AI 工具集成

OpenSpec 通过两种方式与 AI 工具交互：

**方式 1: Slash Commands（原生支持的工具）**

```
Claude Code, Cursor, Windsurf 等:
/openspec:proposal <feature>    # 创建变更提案
/openspec:apply <change>        # 执行任务清单
/openspec:archive <change>      # 归档完成的变更
```

**方式 2: AGENTS.md（通用方式）**

```markdown
<!-- openspec/AGENTS.md -->
# OpenSpec Workflow Instructions

## Creating a Change Proposal
1. Ask user for feature description
2. Run: openspec init <change-name>
3. Create proposal.md, tasks.md, spec delta
4. Present to user for review

## Implementing Changes
1. Read openspec/changes/<change>/tasks.md
2. Execute tasks in order
3. Mark completed: [x]
4. Reference spec delta for requirements
```

任何支持读取项目文档的 AI 工具都能理解这些指令。

## BMAD-METHOD: Agent 编排平台

BMAD 的核心是 **BMad-CORE**（Collaboration Optimized Reflection Engine），通过专门的 agents 和 workflows 来驱动开发流程。

### 架构

```
BMad-CORE (框架层)
    │
    ├──> BMM (BMad Method) ─── 12 agents, 34 workflows
    ├──> BMB (BMad Builder) ─── 构建自定义 agent
    └──> CIS (Creative Intelligence) ─── 创意工作流
```

### 安装后的目录结构

```
project/
└── .bmad/
    ├── core/               # 核心框架 + BMad Master agent
    ├── bmm/                # BMad Method 模块
    │   ├── agents/         # 12 个专门 agents (PM, Architect, Dev...)
    │   └── workflows/      # 34 个工作流
    ├── bmb/                # Builder 模块
    ├── cis/                # Creative Intelligence 模块
    └── _cfg/               # 用户自定义配置（更新时保留）
        └── agents/         # Agent 行为定制
```

### 三种规划轨道

| Track | 适用场景 | 生成文档 | 执行阶段 |
|-------|----------|----------|----------|
| **Quick Flow** | Bug 修复、小功能 | Tech Spec | Planning → Implementation |
| **BMad Method** | 产品功能、新模块 | PRD + Architecture + UX | Analysis → Planning → Solutioning → Implementation |
| **Enterprise** | 合规要求、企业系统 | BMad Method + Security/DevOps/Test | 全部 4 个阶段 + 扩展文档 |

### Agent 协作示例

```
用户请求: "添加用户认证功能"

Phase 1: Analysis (可选)
┌──────────┐
│ Analyst  │──> 生成 project-brief.md（需求调研）
└──────────┘

Phase 2: Planning (必需)
┌──────────┐
│    PM    │──> 生成 PRD.md（产品需求文档）
└──────────┘

Phase 3: Solutioning (依 Track)
┌──────────┐
│Architect │──> 生成 architecture.md（技术方案）
└──────────┘
┌──────────┐
│UX Designer│──> 生成 ux-design.md（交互设计）
└──────────┘

Phase 4: Implementation (迭代)
┌──────────┐
│  Scrum   │──> 从 PRD 生成 user-stories.md
│  Master  │
└──────────┘
┌──────────┐
│Developer │──> 逐条实现 stories，生成代码
└──────────┘
```

### 执行方式

**方式 1: Agent Menu**

```
加载 agent → 显示菜单 → 选择 workflow:
1. *workflow-init
2. *prd
3. *architecture
...
```

**方式 2: Slash Commands**

```
/bmad:bmm:workflows:workflow-init
/bmad:bmm:workflows:prd
/bmad:bmm:workflows:dev-story
```

**方式 3: Party Mode**

```
/bmad:core:workflows:party-mode
所有 agents 协作执行同一个 workflow
```

### 与 LLM 的集成

BMAD 不直接调用 LLM API，而是生成结构化的 agent 文件（markdown），由 IDE 中的 AI 助手（Claude Code、Cursor 等）加载这些 agent 并执行其中定义的 workflows。

```
┌────────────────┐
│ User in IDE    │
└───────┬────────┘
        │
        v
┌────────────────┐
│Load .bmad agent│ (e.g., developer.md)
└───────┬────────┘
        │
        v
┌────────────────┐
│ IDE's LLM      │ (Claude/GPT)
│ reads agent    │ 读取 agent 的 persona、workflows
│ & executes     │ 按 workflow 指令操作项目文件
└───────┬────────┘
        │
        v
┌────────────────┐
│Generate PRD/   │
│Architecture/   │
│Code            │
└────────────────┘
```

## OpenSpec vs BMAD-METHOD

| 维度 | OpenSpec | BMAD-METHOD |
|------|----------|-------------|
| **核心理念** | Spec-driven: 规格即变更单位 | Agent-driven: 专家角色协作 |
| **抽象层级** | 规格管理工具 | 开发流程编排平台 |
| **使用方式** | CLI + AI 工具集成 | Agent 文件 + IDE 加载 |
| **目录结构** | `openspec/specs` + `changes` | `.bmad/core` + modules |
| **变更管理** | Delta 格式（ADDED/MODIFIED/REMOVED） | Phase-based artifacts（PRD/Architecture/Stories） |
| **协作粒度** | 单个变更 proposal | 多 agent 并行执行 workflows |
| **学习曲线** | 平缓（理解 specs + changes 结构） | 陡峭（理解 agents + phases + tracks） |
| **灵活性** | 轻量，专注规格文档 | 重量级，涵盖全生命周期 |
| **Brownfield 友好** | 是（设计目标） | 是（有专门 guide） |
| **安装** | `npm install -g @fission-ai/openspec` | `npx bmad-method@alpha install` |

### 适用场景对比

```
小功能/Bug 修复
   Vibe Coding ────> 直接对话实现
   
中型功能（跨多个模块）
   OpenSpec ────> Proposal + Delta + Archive
   
大型产品开发
   BMAD Quick Flow ────> Tech Spec + Dev
   BMAD Method ────> PRD + Architecture + Stories
   
企业级系统
   BMAD Enterprise ────> 完整 4 阶段 + 合规文档
```

## 实施建议

**起步阶段**

探索新想法时使用 vibe coding，一旦方向确认：
- 单个明确功能 → 用 OpenSpec 创建 change proposal
- 需要多角色协作 → 用 BMAD Quick Flow 或 Method Track

**团队协作**

```
团队成员 A (探索)        团队成员 B (实现)
     │                        │
  Vibe Coding            ┌────┴────┐
     │                   │         │
     v                   v         v
 确认可行性          OpenSpec   BMAD
     │                Spec       PRD
     └─────>交接<─────┘         │
                                 v
                            Implementation
```

**工具组合**

- OpenSpec + Vibe: 轻量团队，专注功能交付
- BMAD + Vibe: 产品驱动，需要完整规划文档
- OpenSpec + BMAD: OpenSpec 管理规格，BMAD 生成实现（通过 BMAD agents 读取 OpenSpec specs）

核心原则：vibe coding 负责探索，spec coding 负责交付，两者通过规格文档交接。
