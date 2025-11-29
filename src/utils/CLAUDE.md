# src/utils - 工具函数模块

> [根索引](../../CLAUDE.md) > utils

---

## 模块概览

通用工具函数集合，提供文档路径处理和 Git 操作支持。

## 文件清单

| 文件 | 导出符号 | 功能 |
|------|----------|------|
| `docsPath.ts` | `buildDocCandidates`, `normalizeEntryId` | 文档路径处理 |
| `git.ts` | `getGitLastModifiedIso` | Git 最后修改时间 |
| `tabContent.ts` | `organizeTabEntries`, `getTabLabel`, `getTabOrder` | 多标签内容检测 |

## docsPath.ts

文档路径处理工具，用于 Content Collections 的路径解析。

### 导出符号

```typescript
// 构建文档候选路径列表
function buildDocCandidates(alias: string, subpath?: string): string[]

// 规范化 entry ID
function normalizeEntryId(id: string): string
```

### 使用场景
- 路由页面中通过别名查找内容
- 处理多级路径的候选匹配

## git.ts

Git 操作工具，用于获取文件的版本控制信息。

### 导出符号

```typescript
// 获取文件的 Git 最后修改时间 (ISO 格式)
function getGitLastModifiedIso(filePath: string): Promise<string | null>

// 解析路径
function resolvePath(relativePath: string): string
```

### 使用场景
- `remark-frontmatter-last-modified.mjs` 插件调用
- 页面显示"最后更新"时间

### 缓存机制
内部维护 `cache` Map 避免重复 Git 查询。

## tabContent.ts

多标签内容检测与组织工具 (试点于 resources 章节)。

### 导出符号

```typescript
// 检测并组织同目录下的标签文件
function organizeTabEntries(entries: CollectionEntry[], basePath: string): TabInfo[]

// 获取标签显示名称
function getTabLabel(filename: string, tabConfig?: TabConfig): string

// 获取标签排序权重
function getTabOrder(filename: string, tabConfig?: TabConfig): number
```

### 默认排序
- `index.md` → order: 0, label: "Overview"
- `details.md` → order: 10, label: "Details"
- 其他 → order: 100+, label: 文件名首字母大写

### 使用场景
- `ResourcesContentLayout.astro` 布局调用
- 自动检测同目录下的标签文件

## 修改指南

### 新增工具函数
1. 根据功能类型决定放入现有文件或创建新文件
2. 导出函数并添加类型注解
3. 更新本文档

### 性能考虑
- Git 操作相对耗时，使用缓存
- 避免在热路径中调用
