---
title: to-api
description: 2api github url and description
contributors:
  - codex
---

## Introduction

2API 指的是把 App、Web、CLI 等非公开接口通过逆向、转译与鉴权重放大成 OpenAI 兼容 API，让任意客户端像调官方模型一样调用这些灰色渠道。它的价值在于缩短「新模型发布 → 可编程接入」的时间，代价是需要持续维持指纹、令牌与限流策略。下文所有项目均基于 2025-11-13 的 GitHub README 校验结果。

## 原理

2API 的核心链路只有一条：劫持客户端发往上游的请求，把认证、格式、速率都调成标准 API，然后把响应再翻译回 OpenAI 结构。

```text
+---------+    +-----------------+    +--------------------+    +---------+
| Client  | -> | 2API Adapter    | -> | Target Service     | -> | Client  |
+---------+    +-----------------+    +--------------------+    +---------+
                | auth pool / token refresh
                | header & signature forge
                | prompt/message rewriter
                | stream & media normalizer
```

直接封装官方 API：像 `amq2api`、`droid2api`、`k2Think2Api` 通过官方 OAuth 或固定 API Key 调用真实 API，只做请求/响应格式转换，优点是稳定，可控的刷新流程，缺点是必须持有合法刷新凭证。

令牌池/Session 复用：`pplx2api`、`Jimeng API`、`LMArenaBridge` 等直接复用 Web 会话 cookie。它们需要在代理层维护 cookie 池、按地区添加前缀并监控失效时间，通常要做智能轮询、熔断与重试，避免单账号被打爆。

伪造请求头和签名：`cccc-gcli2api`、`grok2api`、`highlight2api` 通过固定 `x_statsig_id`、`cf_clearance`、UA、指纹等把自己伪装成官方客户端，必要时还要重放签名或二次加密。优点是无需合法 token，缺点是每次上游升级指纹时都得重新逆向。

所有类别最终都需要两个最小构件：安全的 Token/指纹素材，以及把素材转成 OpenAI 语义的协议转换器。大部分仓库会附带 Docker Compose、Zeabur、Deno Deploy 或 FastAPI/Express 启动脚本，生产部署仍需要你自建监控（健康检查、令牌池容量、429 命中率）和流量入口（反向代理/Rate Limit）。

## 2API List

| 项目名称                                                             | 类型          | 可用性     | 认证 / 伪装要点                                                                                                                                 | 典型用途                                                           |
| -------------------------------------------------------------------- | ------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [amq2api](https://github.com/mucsbr/amq2api)                         | 官方 API 转译 | ✅ Good     | 使用 `AMAZONQ_REFRESH_TOKEN` 与 `AMAZONQ_CLIENT_ID/SECRET` 组合出的 token 池，Auth 模块提前 5 分钟自动刷新并缓存至本地                          | 把 Claude SDK、OpenAI 客户端透明接到 Amazon Q / CodeWhisperer 模型 |
| [cccc-gcli2api](https://github.com/cyskysky/cccc-gcli2api)           | 指纹伪造      | ✅ Good     | 批量导入 Google OAuth 凭证，按 `quotaResetTimeStamp` 精准禁用与恢复，自动补齐 `x-goog-api-key`、UA、思维链头并支持面板上传凭证                  | Gemini CLI 与 OpenAI 双端点兼容，多模态写作与图像理解              |
| [grok2api](https://github.com/chenyme/grok2api)                      | 指纹伪造      | ✅ Good     | 固定 `x_statsig_id`、`cf_clearance`、代理和账号池，FastAPI 将 Web payload 转为 OpenAI 标准并缓存图片/视频，支持 `base_url` 反向输出             | Grok Fast/Expert 对话、图像/视频生成、联网搜索                     |
| [droid2api](https://github.com/1e0n/droid2api)                       | 官方 API 转译 | ✅ Good     | WorkOS OAuth 刷新或 `FACTORY_API_KEY` 固定密钥，`config.json` 自定义推理级别、代理与系统提示，自动适配 `/v1/messages`、`/v1/responses`          | Factory Droid、Claude Code CLI、一键代理 OpenAI 兼容接口           |
| [Jimeng API](https://github.com/iptag/jimeng-api)                    | 会话令牌池    | ✅ Good     | 浏览器抓取 `sessionid`，按站点在 Bearer 前拼 `us-/hk-/jp-` 等前缀，长轮询状态机监控生成进度，可配置 ratio/resolution                            | Jimeng/Dreamina 文生图、图生图、文生视频（2K/4K 输出）             |
| [pplx2api](https://github.com/yushangxiao/pplx2api)                  | 会话令牌池    | ⚠️ Not Good | 依赖 `__Secure-next-auth.session-token` 号池，虽带重试与每日自动刷新但常触发 Perplexity 风控导致模型降智                                        | Perplexity 搜索、Think、绘图试玩，用于观察真实模型变更             |
| [k2Think2Api](https://github.com/rinuldui-dotcom/k2Think2Api)        | 官方 API 转译 | ✅ Good     | `client_api_keys.json` 存储 `sk-talkai-*` API Key，`models.json` 将下游 HuggingFace 模型映射到 OpenAI ID，并把 reasoning_content 与 answer 分离 | K2-Think reasoning 调用、深度思考与答案双通道输出                  |
| [LMArenaBridge](https://github.com/CloudWaddie/LMArenaBridge)        | 会话令牌池    | ✅ Good     | 浏览器复制 `arena-auth-prod-v1` cookie，必要时补 `cf_clearance`，上下文 <4k tokens，内置 R2 图片上传及 OpenWebUI 接入                           | LMArena 模型试用、对齐实验、开源客户端后端                         |
| [highlight2api](https://github.com/lovingfish/highlight2api)         | 指纹伪造      | ⚠️ Not Good | 在 `/highlight_login` 页面生成 proxy key，手动提供 `HIGHLIGHT_USER_AGENT`、代理、并限制 `CHAT_SEMAPHORE`，否则极易被封                          | Highlight 工具调用、图像理解、企业知识问答                         |
| [thanks-to-cerebras](https://github.com/zhu-jl18/thanks-to-cerebras) | 官方 API 转译 | ✅ Good     | Deno Deploy 设置 `CEREBRAS_API_KEYS` 轮换，按 200ms 节流请求，可选 `AUTH_PASSWORD` 与 UI 面板                                                   | 沉浸式翻译代理 Cerebras 免费额度，自动模型映射                     |
| [retool2API](https://github.com/oDaiSuno/retool2API)                 | 指纹伪造      | ⚠️ Not Good | 需要完整 Retool cookie、签名与 worker 代理，token 有效期短且无面板管理                                                                          | Retool Models 临时对话、低频调试                                   |
| [Warp2Api](https://github.com/libaxuan/Warp2Api)                     | 指纹伪造      | ⚠️ Not Good | 依赖 Warp Web cookie + Cloudflare Worker，响应慢、速率限制频繁                                                                                  | Warp 官方模型体验、账号保活                                        |
| [kiro2api](https://github.com/caidaoli/kiro2api)                     | 指纹伪造      | ❌ Died     | 上游签名接口被封，手动 cookie 也无法完成校验，仓库仅供阅读旧实现                                                                                | 仅供参考实现，不建议部署                                           |

## 温馨提示

2API 常见问题：

| 问题类型   | 说明                                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| 授权老化   | 令牌池、`cf_clearance`、`sessionid` 都有寿命，必须做自动刷新、熔断与告警，避免全部账号一起过期        |
| 指纹漂移   | Web 客户端常更新 `x_statsig_id`、UA、签名算法，一旦没跟上就会 HTTP 403，需要预留备用版本或逆向能力    |
| 多模态介质 | Grok、Jimeng、Highlight 都需要额外的文件缓存与 CDN，可选 `base_url` 或对象存储，否则图片/视频直链 403 |
| 模型溯源   | 代理常对不同模型做映射或降级，务必检查响应里的 `model` 字段或仓库提供的监控接口，别误判效果           |

