---
title: Plugins
description: Plugins configuration and usage for CCR
tab:
  label: Plugins
  order: 4
---

plugins ? 2api !


## qwen-cli.js

接入 qwencode 以免费使用 `qwen3-coder-plus`。

1. 导入插件: 在 CCR UI 中导入 [`qwen-cli.js`](https://gist.github.com/musistudio/f5a67841ced39912fd99e42200d5ca8b)。

   ```json
    "transformers": [
       {
         "name": "qwen-cli",
         "path": "C:\\Users\\Travis\\.claude-code-router\\plugins\\qwen-cli.js",
         "options": {}
       }
     ],
   ```

2. 认证: 确保已安装 qwen code 并运行 `qwen` 登录生成 `oauth_creds.json`。插件会自动读取。

3. 配置供应商: 添加供应商，Transformer 选 `qwen-cli`，填入模型和 URL。

   ```json
   {
     "name": "qwen-cli",
     "api_base_url": "https://portal.qwen.ai/v1/chat/completions",
     "api_key": "sk-xxx", // 任意非空值
     "models": ["qwen3-coder-plus"],
     "transformer": {
       "use": ["qwen-cli"]
     }
   }
   ```


## anti-gravity.js


A little bit different from qwen-cli.js. 