---
title: n8n
description: 开源工作流自动化工具
contributors: [claude,codex]
---

## Brief Intro

n8n 是一个开源、可私有化部署的低代码自动化工作流平台。
既可以用现成节点“无代码”操作，也能插入 JavaScript/Python 代码实现自定义功能。且BYOK

## Practice

这部分只干一件事：让 n8n 定时敲一下 api proxy server，如果没回应就赶紧发邮件提醒。少废话，直接看流程。

```
Schedule Trigger ---> HTTP Request ---> IF(status!==200) ---> Send Email
                               |                        └--> 忽略（服务器正常）
                               └--> Continue On Fail 保证流程不中断
```

工作流的三个节点放进一张表里更清楚：

| 节点             | 关键参数                                                                        | 说明                                                              |
| ---------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Schedule Trigger | Interval = 5 minutes 或 Cron = `*/5 * * * *`                                    | 每五分钟戳一次就够了，别太频繁                                    |
| HTTP Request     | Method = GET；URL = `https://your-api-proxy-server.com/health`；Timeout = 10000 | 记得把 Continue On Fail 打开，必要时加 Basic Auth 或 Bearer Token |
| IF + Send Email  | 条件 `{{$json.statusCode}} !== 200`；邮件主题 `[ALERT] API Proxy Server Down`   | 状态不是 200 就发邮件，正文里写清时间、URL、报错信息              |

健康检查接口自己也要长点心。直接给一个 `/health` 或 `/healthz`，吐出最朴素的 JSON：

```json
{
  "status": "ok",
  "timestamp": "2024-11-09T02:51:00Z",
  "uptime": 86400
}
```

非 200 就是不健康，不要搞什么介于好坏之间的玄学状态。「行就是行，不行就修。」

Options 里还有几个容易被忽略的开关：`Retry On Fail` 设成 true，`Max Tries` 放到 3，`Wait Between Tries` 给 5000 毫秒。外网抖两下也能撑过去。如果是自签证书，调试阶段可以短暂开启 `Ignore SSL Issues`，上线前务必关掉，修证书才是正路。

想降噪有两条路。简单路：把失败计数放进 Static Data，连续三次才触发告警，成功一次就归零。严谨路：把计数丢进 Redis 或数据库，用 n8n 的相应节点读写。两种方式别混，保持脑子清爽。

别忘了偶尔给自己的流程找麻烦。改成不存在的域名，看邮件是不是乖乖到；把 Timeout 调成 1ms，观察流程能否继续；断下网线，确认重试是否奏效。测试完再上生产，免得半夜被疯狂轰炸。

如果某次真遇到延迟堆成山，把 Timeout 拉到 30000 毫秒，再结合 `Batch Interval` 控制批量请求节奏。监控的本质是心态稳，别因为自己的设置问题把监控做成攻击。

最后提一句自监控。n8n 实例也可能倒，只要在环境变量里加 `N8N_METRICS=true`，就能访问 `http://your-n8n-instance:5678/healthz`。找个外部的 cron 或另外一个 n8n 去盯它，套娃不可耻，掉线才丢人。

延伸阅读：
- [n8n Schedule Trigger 文档](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/)
- [n8n HTTP Request 文档](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/)
- [社区示例](https://n8n.io/workflows/3880-monitor-server-uptime-and-get-email-alerts-with-google-sheets/)

更多资料：
- [官方网站](https://n8n.io/)
- [文档中心](https://docs.n8n.io/)
- [GitHub 仓库](https://github.com/n8n-io/n8n)
- [工作流集合](https://n8n.io/workflows/)
