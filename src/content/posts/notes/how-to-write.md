---
title: "如何写一篇新帖子？（快速说明）"
description: "在 src/content/posts 下添加一个 .md 文件即可，这里是字段说明。"
date: 2025-09-13
category: notes
tags: ["说明", "使用指南"]
draft: false
---

创建位置：`src/content/posts/<category>/<slug>.md`

可用字段：

```yaml
# path=null start=null
title: 标题（必填）
description: 简短描述（必填）
date: YYYY-MM-DD（必填）
category: 分类（如：tools/life/notes）（必填）
tags: [可选标签]
draft: false # 设为 true 可在列表中隐藏
cover: /images/... # 可选封面
```

路由说明：
- 详情页：`/posts/<category>/<slug>`
- 列表页：`/posts`
- 分类页：`/posts/category/<category>`

编辑提示：
- 只需修改 Markdown 正文即可，上面的 Frontmatter 字段建议保留
- 图片建议放在 `public/images/posts/` 目录下

