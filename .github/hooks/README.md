# prepare-commit-msg 快速指南（Windows）

目的：在本地提交时，自动在提交信息尾部追加一行：

Co-authored-by: Warp <dev@warp.dev>

仅本地生效；GitHub 预览分支或合并不会触发 hook。每位协作者需在各自电脑安装一次。

安装（在仓库根执行 PowerShell）

```powershell
Copy-Item .github/hooks/prepare-commit-msg .git/hooks/prepare-commit-msg -Force
```

验证（应在提交消息底部看到 Co-authored-by 行）

```powershell
'check' | Out-File -Encoding utf8 -NoNewline hook-check.txt
git add hook-check.txt
git commit -m "test: warp co-author hook"
git --no-pager log -1 --format=%B
```

卸载

```powershell
Remove-Item .git/hooks/prepare-commit-msg
```
