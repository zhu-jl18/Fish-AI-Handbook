---
title: Skill
description: Claude Code 中 Skill 功能的使用教程
---

Skills 是 Claude Code 的核心能力之一，它允许你通过预定义的技能模板快速完成常见任务。这不是什么花哨的功能，就是把一些常用的提示词和工作流打包起来，让你不用每次都重复输入相同的指令。

## 什么是 Skills

Skills 本质上是一组预配置的指令集合，包含了特定任务的上下文、约束条件和执行步骤。当你调用一个 Skill 时，Claude Code 会自动加载对应的配置，按照预设的流程执行任务。

这个设计的好处很明显：你不需要记住复杂的命令参数，不需要每次都解释背景信息，直接告诉它用哪个 Skill 就行。对于重复性高的工作，这能省下不少时间。

## 内置 Skills

Claude Code 自带了一些常用的 Skills，覆盖了代码审查、重构、测试生成等场景。

### Code Review

代码审查 Skill 会检查代码质量、潜在问题和改进建议。它会关注代码风格、性能、安全性等多个维度。

启动方式很简单，在 Claude Code 中输入：

```bash
claude
> 使用 code review skill 审查当前文件
```

它会自动分析代码结构，指出可能的问题。比如未处理的异常、低效的循环、不安全的输入处理等。输出结果通常包含问题描述、严重程度和修复建议。

### Refactor

重构 Skill 专注于改进代码结构，而不改变功能行为。它会识别重复代码、过长函数、复杂的条件判断等代码异味。

```bash
> 使用 refactor skill 优化这个函数
```

它可能会建议提取公共逻辑、简化嵌套、使用更清晰的命名等。重构建议通常会给出前后对比，让你清楚看到改动的影响。

### Test Generation

测试生成 Skill 会根据代码逻辑自动生成单元测试。它会分析函数的输入输出、边界条件、异常情况，然后生成对应的测试用例。

```bash
> 使用 test generation skill 为这个模块生成测试
```

生成的测试通常包含正常情况、边界值、异常处理等场景。虽然自动生成的测试不一定完美，但可以作为起点，省去大量重复劳动。

### Documentation

文档生成 Skill 会为代码添加注释和文档字符串。它会分析函数签名、参数类型、返回值，生成符合规范的文档。

```bash
> 使用 documentation skill 为这个类生成文档
```

生成的文档会包含函数说明、参数描述、返回值说明、使用示例等。对于公共 API 或复杂逻辑，这个功能特别有用。

## 自定义 Skills

内置 Skills 覆盖了常见场景，但你可能有特定的工作流需要定制。Claude Code 支持自定义 Skills，让你根据项目需求创建专属的技能模板。

### 创建自定义 Skill

自定义 Skill 通过配置文件定义。在项目根目录创建 `.claude/skills/` 目录，然后添加 JSON 或 YAML 格式的配置文件。

一个简单的自定义 Skill 配置示例：

```json
{
  "name": "api-design-review",
  "description": "审查 API 设计的一致性和最佳实践",
  "prompt": "请审查这个 API 设计，重点关注：\n1. RESTful 规范遵循情况\n2. 错误处理机制\n3. 版本控制策略\n4. 安全性考虑\n5. 文档完整性",
  "context": {
    "include": ["*.api.ts", "*.controller.ts"],
    "exclude": ["*.test.ts"]
  }
}
```

这个配置定义了一个 API 设计审查的 Skill。`name` 是调用时使用的标识符，`description` 是功能说明，`prompt` 是具体的指令内容，`context` 指定了要分析的文件范围。

### 使用自定义 Skill

创建配置文件后，重启 Claude Code 即可使用自定义 Skill：

```bash
> 使用 api-design-review skill 审查当前 API
```

Claude Code 会加载配置，按照你定义的指令执行任务。

### 高级配置选项

自定义 Skill 支持更多配置选项，让你精确控制执行行为。

**参数化 Skill**：通过占位符支持动态参数。

```json
{
  "name": "migrate-version",
  "prompt": "将代码从 {{from_version}} 迁移到 {{to_version}}，重点关注破坏性变更",
  "parameters": {
    "from_version": { "type": "string", "required": true },
    "to_version": { "type": "string", "required": true }
  }
}
```

调用时传入参数：

```bash
> 使用 migrate-version skill from_version=v1 to_version=v2
```

**多步骤 Skill**：定义复杂的工作流。

```json
{
  "name": "full-feature-review",
  "steps": [
    { "action": "analyze", "target": "code" },
    { "action": "generate", "target": "tests" },
    { "action": "review", "target": "tests" },
    { "action": "document", "target": "all" }
  ]
}
```

这个 Skill 会依次执行代码分析、测试生成、测试审查、文档生成四个步骤。

**条件执行**：根据代码特征决定是否执行某些步骤。

```json
{
  "name": "smart-review",
  "conditions": {
    "if_has_tests": { "action": "review_tests" },
    "if_no_tests": { "action": "generate_tests" }
  }
}
```

## Skills 的最佳实践

使用 Skills 时有一些经验值得注意。

### 明确任务边界

Skills 适合处理明确定义的任务。如果任务范围模糊或需要大量人工判断，直接对话可能更高效。不要为了用 Skill 而用 Skill，选择合适的工具才是关键。

### 迭代优化配置

自定义 Skill 的配置不是一次性的。根据实际使用效果调整 prompt、context、parameters 等配置，逐步优化到最佳状态。记录每次调整的原因和效果，方便后续改进。

### 版本控制

将 `.claude/skills/` 目录纳入版本控制，让团队成员共享相同的 Skills 配置。这样可以保证团队工作流的一致性，也方便跟踪配置变更。

### 组合使用

复杂任务可以通过组合多个 Skills 完成。先用 code review skill 找问题，再用 refactor skill 优化，最后用 test generation skill 补充测试。这种流水线式的使用方式效率很高。

### 文档化自定义 Skills

为自定义 Skills 编写说明文档，解释它的用途、参数、使用场景。特别是团队共享的 Skills，清晰的文档能减少沟通成本。

## 常见问题

### Skill 执行失败

如果 Skill 执行失败，先检查配置文件格式是否正确。JSON 格式要求严格，多一个逗号或少一个引号都会导致解析失败。使用 JSON 校验工具可以快速定位问题。

其次检查 context 配置的文件路径是否正确。如果指定的文件不存在或路径错误，Skill 无法加载上下文。

### Skill 输出不符合预期

这通常是 prompt 配置不够明确导致的。Claude Code 会按照 prompt 的字面意思执行，如果指令模糊，输出自然不理想。

改进方法是在 prompt 中增加具体的约束条件、输出格式要求、示例等。越具体的指令，输出越可控。

### 如何调试自定义 Skill

Claude Code 支持 verbose 模式，可以查看 Skill 执行的详细过程：

```bash
claude --verbose
> 使用 my-custom-skill
```

这会输出加载的配置、解析的参数、执行的步骤等信息，方便定位问题。

### Skills 和直接对话的选择

简单任务用 Skills 效率高，复杂任务用对话更灵活。如果任务需要多轮交互、动态调整方向，直接对话更合适。如果任务流程固定、重复性高，Skills 是更好的选择。

## 参考资源

- [Claude Code Official Documentation](https://docs.anthropic.com/claude/docs/claude-code)
- [Claude Code Skills Guide](https://github.com/anthropics/claude-code/blob/main/docs/skills.md)
- [Building Custom Skills for Claude Code](https://www.anthropic.com/blog/claude-code-custom-skills)
- [Claude Code Best Practices](https://docs.anthropic.com/claude/docs/best-practices)

