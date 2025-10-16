# Git Hooks for Fish-AI-Handbook

本目录包含项目推荐的 Git hooks，用于自动化常见的 Git 工作流程。

## 📋 可用的 Hooks

### prepare-commit-msg

自动在每次提交消息末尾添加 AI 工具协作者标识。

**功能**：
- 在所有提交（包括 `git commit -m`、`--amend`、合并提交）中自动追加 `Co-authored-by: Warp <dev@warp.dev>`
- 智能去重：如果提交消息中已包含该标识，则不会重复添加
- 不影响提交消息正文，仅在末尾追加

**效果示例**：
```
feat: add new feature

Co-authored-by: Warp <dev@warp.dev>
```

## 🚀 快速安装

### 方法一：PowerShell（Windows 推荐）

在项目根目录执行：

```powershell
Copy-Item .github/hooks/prepare-commit-msg .git/hooks/prepare-commit-msg -Force
```

### 方法二：命令行（跨平台）

```bash
cp .github/hooks/prepare-commit-msg .git/hooks/prepare-commit-msg
chmod +x .git/hooks/prepare-commit-msg  # Linux/Mac 需要
```

### 方法三：一键安装脚本（PowerShell）

```powershell
$hookContent = Get-Content .github/hooks/prepare-commit-msg -Raw
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText(".git/hooks/prepare-commit-msg", $hookContent.Replace("`r`n", "`n"), $utf8NoBom)
Write-Host "✓ Hook 已安装" -ForegroundColor Green
```

## ✅ 验证安装

安装后，测试是否生效：

```bash
# 创建测试提交
echo "test" > test.txt
git add test.txt
git commit -m "test: verify warp co-author hook"

# 查看提交消息（应该包含 Co-authored-by 行）
git log -1 --format=%B

# 清理测试
git reset --soft HEAD~1
git restore --staged test.txt
rm test.txt
```

## 📖 使用说明

### 正常使用

安装后无需改变任何工作习惯，像平时一样提交即可：

```bash
git commit -m "feat: your commit message"
```

### 临时跳过 Hook

如果某次提交不想添加协作者标识：

```bash
git commit --no-verify -m "your message"
```

### 卸载 Hook

```bash
# Windows PowerShell
Remove-Item .git/hooks/prepare-commit-msg

# Linux/Mac
rm .git/hooks/prepare-commit-msg
```

## 🔧 技术细节

- **运行环境**: Git for Windows 自带的 sh 环境
- **依赖命令**: `git interpret-trailers`（Git 2.24+ 内置）
- **作用域**: 仅本地仓库生效，不会影响其他项目
- **文件编码**: UTF-8 无 BOM，LF 换行（重要！）

## 🤝 协作者标识说明

### Warp

- **名称**: Warp
- **邮箱**: dev@warp.dev
- **说明**: 官方邮箱，用于标识使用 Warp AI 协助的提交

### 关于头像显示

- GitHub 贡献者页面的头像和可点击链接由邮箱绑定的 GitHub 账号决定
- 如果邮箱未绑定账号，会显示为纯文本，不影响功能
- `Co-authored-by` 中的名字可自定义，但最终展示以绑定账号为准

## 🔮 未来扩展

计划支持的协作者：
- **OpenAI Codex**: 等待官方邮箱确定后添加

## 📚 参考资料

- [GitHub: Creating a commit with multiple authors](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors)
- [Git Hooks Documentation](https://git-scm.com/docs/githooks)
- [git-interpret-trailers](https://git-scm.com/docs/git-interpret-trailers)

## 💡 贡献

如果你有改进建议或发现问题，欢迎提交 Issue 或 PR。
