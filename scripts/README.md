# Scripts 目录说明

本目录包含项目的自动化脚本与工具。

## 字体子集化工具

### 文件说明

- **build_used_charset.py**: 字符提取脚本，从文档中提取实际使用的字符
- **used-chars.txt**: 生成的字符集文件（自动生成，已提交到仓库）
- **common-zh-1000.txt**: 可选的常用汉字缓冲列表（需手动创建）

### 使用场景

当项目文档更新后，如果出现字体缺字（显示为口口/豆腐字），需要重新生成字体子集。

### 工作流程

#### 1. 提取字符集

```bash
python scripts/build_used_charset.py
```

脚本会：
- 扫描 `src/content/docs/**/*.{md,mdx}` 的所有文档
- 过滤掉代码块、行内代码和 HTML 标签
- 收集实际使用的字符
- 合并 ASCII、常用标点和可选的常用汉字
- 输出到 `scripts/used-chars.txt`

#### 2. 生成字体子集

确保已安装依赖：
```bash
pip install fonttools brotli
```

生成 WOFF2 子集（需要原始 TTF 文件）：
```bash
pyftsubset public/fonts/NotoSansSC-Regular.ttf \
  --text-file=scripts/used-chars.txt \
  --output-file=public/fonts/NotoSansSC-Regular.woff2 \
  --flavor=woff2 \
  --layout-features='*'

pyftsubset public/fonts/NotoSansSC-SemiBold.ttf \
  --text-file=scripts/used-chars.txt \
  --output-file=public/fonts/NotoSansSC-SemiBold.woff2 \
  --flavor=woff2 \
  --layout-features='*'
```

### 可选：添加常用字缓冲

创建 `scripts/common-zh-1000.txt`，添加常用汉字作为安全缓冲：

```bash
# 示例来源
# https://gist.github.com/wzpan/6be01f8e3b0f508a4034a0a8071d9439
# https://github.com/mafeifan/chinese-char-usage-frequency
```

脚本会自动合并这些字符到最终的字符集。

### 验证与测试

```bash
# 开发预览
npm run dev

# 构建验证
npm run build

# 检查字体文件大小
ls -lh public/fonts/
```

### 注意事项

1. **编码要求**: 所有文本文件必须使用 UTF-8 编码（无 BOM）
2. **保留原文件**: 建议保留原始 TTF 文件的备份以便回滚
3. **增量更新**: 文档新增内容后重新运行脚本即可
4. **字符覆盖**: 当前提取了 1237 个字符，覆盖了站点所有内容
5. **性能提升**: WOFF2 子集相比原始 TTF 减少了 98.2% 的体积

### 故障排查

**问题**: 页面出现缺字（口口/豆腐字）

**解决**:
1. 检查新增内容是否包含特殊字符
2. 重新运行 `python scripts/build_used_charset.py`
3. 重新生成 WOFF2 子集
4. 本地预览验证

**问题**: pyftsubset 命令未识别

**解决**:
```bash
# 使用 Python 模块方式调用
python -m fonttools subset [参数...]
```

## 其他脚本

（待补充）
