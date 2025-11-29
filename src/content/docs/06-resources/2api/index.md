---
title: 2api
description: 2api github url and description
contributors:
  - claude
  - codex
---


把没有公开 API 的服务（Web、App、CLI）逆向成通用 API 格式，让你的客户端能直接调用。

More Detailed: 对 Web、App、CLI 这些「只给前端、不给 API」的接口做抓包和协议分析，把它们包装成统一的 HTTP API。这样不管底层是 Cerebras Web、Gemini CLI 或者 Anti Gravity，前端都只看到一个「OpenAI /v1/* 风格的 」之类的接口

## 原理

<img src="https://p.sda1.dev/29/f744c7fd34318727888ca6a46249225d/图片编辑 _1_.png" alt="2api 原理示意图：三条路线（官方凭证转译、Cookie/Session 池、指纹伪造）" width="70%" >

三条路：

1. **① 官方凭证转译** — 有 API Key 或 OAuth 令牌，直接转格式，稳
2. **② Cookie/Session 池** — 抓 Web 会话，便宜但要轮换、熔断、祈祷别封
3. **③ 指纹伪造** — 模拟官方客户端，上游一改就得重新逆向

核心就两件事：搞到能用的凭证，架个代理转格式。

## 2API List

| 项目名称                                                             | 路线 | 大致原理                                       | 典型用途                                 |
| -------------------------------------------------------------------- | ---- | ---------------------------------------------- | ---------------------------------------- |
| [k2Think2Api](https://github.com/rinuldui-dotcom/k2Think2Api)        | ①    | [K2Think](https://k2think.com) 官方 Key，reasoning 模型 | 对速度敏感的场景，如沉浸式                    |
| [thanks-to-cerebras](https://github.com/zhu-jl18/thanks-to-cerebras) | ①    | [Cerebras](https://cerebras.ai) 官方 Key 轮换  | 沉浸式翻译最佳选择                 |
| [cccc-gcli2api](https://github.com/cyskysky/cccc-gcli2api)           | ①    | [Gemini CLI](https://github.com/google-gemini/gemini-cli)，Google OAuth 凭证池 | 满血 Gemini 3 Pro                   |
| [LMArenaBridge](https://github.com/CloudWaddie/LMArenaBridge)        | ②    | [LM Arena](https://lmarena.ai) Web，cookie 会话 | 各种最新的模型试用                   |

## 不推荐的

好用的在上面，下面是各种原因不推荐或者不能用了的呢，可以跑起来玩一下，或者研究下实现代码：

| 项目                                                        | 路线 | 大致原理                                       | 问题                                     |
| ----------------------------------------------------------- | ---- | ---------------------------------------------- | ---------------------------------------- |
| [amq2api](https://github.com/mucsbr/amq2api)                | ①    | [Amazon Q](https://aws.amazon.com/q)，OAuth 刷新令牌 | AWS 严打封号狠                           |
| [droid2api](https://github.com/1e0n/droid2api)              | ①    | [Factory Droid](https://www.factory.ai)，WorkOS OAuth | 官方砍了白嫖，工具本身够好用                      |
| [kiro2api](https://github.com/caidaoli/kiro2api)            | ①    | [Kiro](https://kiro.dev) (AWS)，SSO 凭证池     | 官方严打封号狠                           |
| [pplx2api](https://github.com/yushangxiao/pplx2api)         | ②    | [Perplexity](https://perplexity.ai) Web，session-token | CF 盾难过，模型降智                      |
| [Jimeng API](https://github.com/iptag/jimeng-api)           | ②    | [即梦](https://jimeng.jianying.com)/[Dreamina](https://dreamina.capcut.com)，sessionid | 需手动抓，失效快                         |
| [retool2API](https://github.com/oDaiSuno/retool2API)        | ②    | [Retool](https://retool.com) Models，Cookie + XSRF | 每周要手动续，不支持 system/tool         |
| [Warp2Api](https://github.com/libaxuan/Warp2Api)            | ②    | [Warp](https://warp.dev) Terminal，自动 JWT    | 太慢                                     |
| [grok2api](https://github.com/chenyme/grok2api)             | ③    | [Grok](https://grok.com) Web，指纹伪造 + Token 池 | CF 盾 + IP 检测严                        |
| [highlight2api](https://github.com/lovingfish/highlight2api)| ③    | [Highlight](https://highlightai.com) AI，登录 + UA 伪造 | 封号快，残血模型，无多轮                 |

