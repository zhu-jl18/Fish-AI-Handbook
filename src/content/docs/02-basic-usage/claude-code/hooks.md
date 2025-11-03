---
title: Hooks
description: Claude Code 中 Hooks 功能的实战配置与最佳实践
---

Hook 是 Claude Code 的生命周期拦截机制。别把它想得多高级，就是在执行前后插入自定义逻辑的钩子。如果你连这个都不会用,那你基本上是在手动做机器该做的事。

## 什么是 Hook

Hook 在 Claude Code 的执行流程中充当拦截器。执行前检查环境、执行后清理资源、出错时发通知——这些都是 Hook 的活。不用 Hook 也能干活，但你会发现自己在重复做同样的检查和清理工作，蠢得要命。

Hook 的核心价值是自动化那些你每次都要做但又容易忘的事。代码格式化、lint 检查、测试运行——这些事要么自动化，要么别做。手动执行这些检查就是在浪费时间。

## Hook 类型

Claude Code 支持三种 Hook，对应执行流程的不同阶段。

### Pre-execution Hook

执行前触发。用来检查环境、验证输入、准备资源。如果检查失败，整个任务直接终止，不会浪费时间去执行注定失败的操作。

典型场景：检查 Git 状态、验证依赖版本、确认环境变量。如果你的项目需要特定的 Node 版本或环境配置，pre-execution hook 能在第一时间拦住不符合条件的执行。

### Post-execution Hook

执行后触发。用来清理资源、生成报告、触发后续流程。不管任务成功还是失败，post-execution hook 都会执行，所以别在这里做关键逻辑。

典型场景：清理临时文件、提交代码、发送通知。如果你的任务会生成临时文件或修改状态，post-execution hook 负责收尾工作。

### Error Hook

出错时触发。用来记录错误、发送告警、回滚操作。如果你不配置 error hook，错误信息就只能在终端里看，出了问题你可能根本不知道。

典型场景：发送 Slack 通知、记录到日志系统、回滚数据库操作。生产环境必须配置 error hook，否则你会在半夜被叫起来查日志。

## Hook 配置

Hook 通过 `.claude/hooks/` 目录下的配置文件定义。每个 Hook 是一个 JSON 或 YAML 文件，指定触发时机和执行命令。

### 基本配置结构

```json
{
  "name": "format-code",
  "type": "pre-execution",
  "command": "npm run format",
  "failOnError": true,
  "timeout": 30000
}
```

`name` 是标识符，`type` 指定 Hook 类型，`command` 是要执行的命令。`failOnError` 决定命令失败时是否终止任务，`timeout` 是超时时间（毫秒）。

如果 `failOnError` 设为 `false`，命令失败也会继续执行。这适合非关键的检查，比如代码风格警告。但对于关键检查（比如测试），必须设为 `true`，否则你会把有问题的代码推到生产环境。

## 实用 Hook 配置示例

别光看理论，直接上配置。这些是实际项目中真正有用的 Hook，不是那些演示用的玩具例子。

### 1. 代码格式化（Pre-execution）

提交代码前自动格式化，避免代码风格不一致。

```json
{
  "name": "auto-format",
  "type": "pre-execution",
  "command": "prettier --write .",
  "failOnError": false,
  "description": "自动格式化代码"
}
```

`failOnError` 设为 `false`，因为格式化失败不应该阻止任务执行。如果 Prettier 配置有问题，你会看到警告，但任务继续跑。

### 2. Lint 检查（Pre-execution）

执行前检查代码质量，拦住明显的错误。

```json
{
  "name": "lint-check",
  "type": "pre-execution",
  "command": "eslint . --max-warnings 0",
  "failOnError": true,
  "description": "代码质量检查"
}
```

`--max-warnings 0` 意味着任何警告都会导致失败。有人觉得这太严格，但警告就是潜在的 bug，别自欺欺人。

### 3. 环境检查（Pre-execution）

确保运行环境符合要求，避免因环境问题导致的失败。

```json
{
  "name": "env-check",
  "type": "pre-execution",
  "command": "node scripts/check-env.js",
  "failOnError": true,
  "description": "检查环境配置"
}
```

`check-env.js` 脚本检查 Node 版本、环境变量、依赖版本等。如果环境不对，立即终止，别浪费时间。

```javascript
// scripts/check-env.js
const requiredNodeVersion = '20.0.0';
const currentVersion = process.version;

if (currentVersion < `v${requiredNodeVersion}`) {
  console.error(`需要 Node ${requiredNodeVersion}，当前版本 ${currentVersion}`);
  process.exit(1);
}

const requiredEnvVars = ['API_KEY', 'DATABASE_URL'];
const missing = requiredEnvVars.filter(v => !process.env[v]);

if (missing.length > 0) {
  console.error(`缺少环境变量: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('环境检查通过');
```

### 4. 自动测试（Pre-execution）

执行前跑测试，确保改动没有破坏现有功能。

```json
{
  "name": "run-tests",
  "type": "pre-execution",
  "command": "npm test -- --coverage --passWithNoTests",
  "failOnError": true,
  "timeout": 120000,
  "description": "运行单元测试"
}
```

`timeout` 设为 120 秒，因为测试可能需要较长时间。`--passWithNoTests` 避免在没有测试的项目中失败。

### 5. Git 状态检查（Pre-execution）

确保工作区干净，避免在有未提交改动的情况下执行危险操作。

```json
{
  "name": "git-clean-check",
  "type": "pre-execution",
  "command": "git diff --quiet && git diff --cached --quiet",
  "failOnError": true,
  "description": "检查 Git 工作区状态"
}
```

如果有未提交的改动，`git diff` 会返回非零退出码，Hook 失败。这能防止你在有未保存改动时执行破坏性操作。

### 6. 清理临时文件（Post-execution）

执行后清理生成的临时文件，保持工作区整洁。

```json
{
  "name": "cleanup-temp",
  "type": "post-execution",
  "command": "rm -rf .tmp .cache dist/*.map",
  "failOnError": false,
  "description": "清理临时文件"
}
```

`failOnError` 设为 `false`，因为清理失败不应该影响任务结果。临时文件留着也不会导致功能问题，只是占空间。

### 7. 性能监控（Post-execution）

记录执行时间和资源使用情况，用于性能分析。

```json
{
  "name": "performance-log",
  "type": "post-execution",
  "command": "node scripts/log-performance.js",
  "failOnError": false,
  "description": "记录性能数据"
}
```

```javascript
// scripts/log-performance.js
const fs = require('fs');
const os = require('os');

const perfData = {
  timestamp: new Date().toISOString(),
  memory: process.memoryUsage(),
  cpu: os.loadavg(),
  uptime: process.uptime()
};

fs.appendFileSync('.claude/performance.log', JSON.stringify(perfData) + '\n');
console.log('性能数据已记录');
```

### 8. 错误通知（Error Hook）

任务失败时发送通知，确保你能及时知道问题。

```json
{
  "name": "error-notify",
  "type": "error",
  "command": "node scripts/notify-error.js",
  "failOnError": false,
  "description": "发送错误通知"
}
```

```javascript
// scripts/notify-error.js
const https = require('https');

const webhookUrl = process.env.SLACK_WEBHOOK_URL;
const errorMessage = process.env.CLAUDE_ERROR_MESSAGE || '任务执行失败';

if (!webhookUrl) {
  console.log('未配置 Slack webhook，跳过通知');
  process.exit(0);
}

const payload = JSON.stringify({
  text: `🚨 Claude Code 错误: ${errorMessage}`,
  username: 'Claude Code Bot'
});

const req = https.request(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, res => {
  console.log(`通知已发送，状态码: ${res.statusCode}`);
});

req.write(payload);
req.end();
```

### 9. 数据库备份（Pre-execution）

执行破坏性操作前备份数据库，避免数据丢失。

```json
{
  "name": "db-backup",
  "type": "pre-execution",
  "command": "pg_dump $DATABASE_URL > .claude/backups/db-$(date +%Y%m%d-%H%M%S).sql",
  "failOnError": true,
  "description": "备份数据库"
}
```

这个 Hook 只在需要修改数据库的任务中启用。如果备份失败，任务终止，避免在没有备份的情况下修改数据。

### 10. CI/CD 集成（Post-execution）

执行后触发 CI/CD 流程，自动部署或运行额外检查。

```json
{
  "name": "trigger-ci",
  "type": "post-execution",
  "command": "curl -X POST $CI_WEBHOOK_URL -H 'Content-Type: application/json' -d '{\"ref\":\"main\"}'",
  "failOnError": false,
  "description": "触发 CI 流程"
}
```

`failOnError` 设为 `false`，因为 CI 触发失败不应该影响本地任务的成功状态。你可以手动触发 CI，不需要因为 webhook 失败而重新执行整个任务。

## Hook 与 Skills/Subagent 的配合

Hook 是全局的，Skills 和 Subagent 是任务级的。Hook 在所有任务执行时都会触发，Skills 和 Subagent 只在特定任务中使用。

### Hook + Skills

Skills 定义任务逻辑，Hook 定义执行约束。比如你有一个代码审查 Skill，pre-execution hook 确保代码已格式化，post-execution hook 生成审查报告。

```json
// .claude/skills/code-review.json
{
  "name": "code-review",
  "prompt": "审查代码质量和潜在问题",
  "hooks": {
    "pre": ["auto-format", "lint-check"],
    "post": ["generate-report"]
  }
}
```

这个配置让 code-review skill 在执行前自动格式化和 lint 检查，执行后生成报告。Hook 是可复用的，多个 Skills 可以共享同一个 Hook。

### Hook + Subagent

Subagent 并行执行时，每个 Subagent 都会触发 Hook。如果你创建了 5 个 Subagent，pre-execution hook 会执行 5 次。

这可能导致性能问题。如果 pre-execution hook 需要 10 秒，5 个 Subagent 并行执行时，总耗时还是 10 秒（因为并行），但如果 Hook 有副作用（比如写文件），可能会冲突。

解决方法是在 Hook 中加锁或使用幂等操作。比如环境检查是幂等的，执行多次结果一样。但如果 Hook 会修改状态（比如备份数据库），需要加锁避免并发问题。

```javascript
// scripts/idempotent-backup.js
const fs = require('fs');
const lockFile = '.claude/backup.lock';

if (fs.existsSync(lockFile)) {
  console.log('备份已在进行中，跳过');
  process.exit(0);
}

fs.writeFileSync(lockFile, Date.now().toString());

try {
  // 执行备份
  execSync('pg_dump ...');
} finally {
  fs.unlinkSync(lockFile);
}
```

## 最佳实践

### 1. Hook 要快

Hook 会在每次执行时触发，如果 Hook 很慢，整个流程都会变慢。pre-execution hook 应该在几秒内完成，超过 10 秒就该考虑优化了。

如果检查很慢（比如跑完整测试套件），别放在 pre-execution hook 里。要么优化测试速度，要么只在特定任务中启用这个 Hook。

### 2. 失败要明确

Hook 失败时，错误信息要清晰。别只返回退出码，输出具体的错误原因。用户看到 "Hook failed" 没有任何帮助，看到 "ESLint found 3 errors in src/index.js" 才知道怎么修。

### 3. 幂等性

Hook 应该是幂等的，执行多次结果一样。如果 Hook 会修改状态，确保重复执行不会导致问题。

比如清理临时文件的 Hook，执行多次也只是删除同样的文件。但如果 Hook 会追加日志，执行多次会写入重复内容，需要加去重逻辑。

### 4. 条件执行

不是所有任务都需要所有 Hook。用条件判断决定 Hook 是否执行。

```json
{
  "name": "db-backup",
  "type": "pre-execution",
  "command": "[ \"$CLAUDE_TASK_TYPE\" = \"migration\" ] && pg_dump ... || true",
  "failOnError": false
}
```

这个 Hook 只在任务类型是 `migration` 时执行备份，其他任务跳过。`|| true` 确保条件不满足时返回成功。

### 5. 版本控制

把 `.claude/hooks/` 纳入版本控制，让团队共享相同的 Hook 配置。但别提交包含敏感信息的 Hook（比如 API 密钥），用环境变量代替。

## 常见陷阱

### Hook 执行顺序不确定

如果配置了多个同类型的 Hook，执行顺序是不确定的。别依赖特定的执行顺序，如果有依赖关系，合并成一个 Hook。

### Hook 失败被忽略

如果 `failOnError` 设为 `false`，Hook 失败不会终止任务。这在某些情况下是对的（比如清理临时文件），但对于关键检查（比如测试），必须设为 `true`。

### Hook 超时

默认超时是 30 秒，如果 Hook 需要更长时间，显式设置 `timeout`。但如果 Hook 经常超时，说明它太慢了，该优化。

### Hook 环境变量

Hook 在独立的进程中执行，不会继承 Claude Code 的所有环境变量。如果 Hook 需要特定的环境变量，在配置中显式传递。

```json
{
  "name": "deploy",
  "type": "post-execution",
  "command": "deploy.sh",
  "env": {
    "DEPLOY_ENV": "production",
    "API_KEY": "$API_KEY"
  }
}
```

## 调试 Hook

Hook 失败时，错误信息会输出到终端。如果错误信息不够详细，用 verbose 模式查看完整输出。

```bash
claude --verbose
```

这会输出 Hook 的执行命令、环境变量、退出码等详细信息。

如果 Hook 在本地能跑通但在 CI 环境失败，检查环境差异。CI 环境可能缺少某些工具或环境变量。

## 参考资源

- [Claude Code Official Documentation](https://docs.anthropic.com/claude/docs/claude-code)
- [Git Hooks Documentation](https://git-scm.com/docs/githooks)
- [Husky - Git Hooks Made Easy](https://typicode.github.io/husky/)
- [Pre-commit Framework](https://pre-commit.com/)

