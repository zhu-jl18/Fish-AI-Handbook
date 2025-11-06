---
title: 开发者
description: API 调用和代理配置，从零开始
---

## API 是什么

API 就是应用程序接口。说白了就是程序之间对话的协议，没什么神秘的。你想让你的程序跟 OpenAI 的 GPT-5 或者 Claude 聊天？得按人家定的规矩发请求、收响应。这规矩就是 API。不按规矩来？服务器直接给你返回 400 Bad Request，连门都不让你进。

大模型的 API 本质上就是个 HTTP 接口。你的程序发个 POST 请求到指定的 endpoint，请求体里塞上你的问题和参数，服务器处理完了把回答塞进 JSON 返回给你。HTTP 协议跑了几十年了，稳定可靠，没理由重新发明轮子。

调用 API 需要三样东西：API endpoint（告诉你往哪发请求）、认证凭据（通常是 API Key，证明你有权限用这服务）、请求数据（你的问题和参数）。缺一不可。很多新手第一次调 API 报错，就是因为把 Key 漏了或者 endpoint 地址抄错了，这种低级错误少犯。

## 三种格式

现在主流的大模型 API 格式就三种：OpenAI 格式、Claude 原生格式、还有各家自己搞的乱七八糟的格式。但实际上，**OpenAI 格式已经成了事实标准**。为什么？因为简单好用，而且大家都抄它。就像 Linux 的 POSIX 接口一样，好用的标准自然会被采纳。

**OpenAI 格式**用的 endpoint 是 `/v1/chat/completions`，认证用 `Authorization: Bearer YOUR_API_KEY`。请求体里最重要的是 `messages` 数组，每条消息有 `role`（system/user/assistant）和 `content`（消息内容）。这是最常见的格式，Google Gemini、国内的通义千问、Kimi 这些都支持 OpenAI 兼容格式。厂商们也不傻，知道开发者不想为每个模型学一套 API。

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-your-api-key" \
  -d '{
    "model": "gpt-5",
    "messages": [
      {"role": "user", "content": "解释一下量子计算"}
    ]
  }'
```

这会发个请求问 GPT-5 什么是量子计算，服务器返回一个 JSON，里面 `choices[0].message.content` 就是回答。报 401 错误？检查你的 API Key 对不对，有没有多余空格。报 429？说明你请求太频繁或者配额用完了，别一秒钟发一百个请求，人家服务器也要喘口气。

**Claude 原生格式**跟 OpenAI 不太一样。endpoint 是 `/v1/messages`，认证用 `x-api-key` 头而不是 `Authorization` 头。参数名也有差异，比如必须指定 `max_tokens`（OpenAI 里这个是可选的），而且返回的 JSON 结构也不同。不过 Anthropic 后来也支持了 OpenAI 兼容格式，所以很多时候你可以用 OpenAI 的方式调 Claude，只需要改 `base_url` 和 `api_key`。但如果你要用 Claude 的一些特殊功能（比如长文本处理、特定的提示词格式），还是得用原生格式。

```python
import anthropic

client = anthropic.Anthropic(api_key="sk-ant-your-key")
message = client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{"role": "user", "content": "解释量子计算"}]
)
print(message.content[0].text)
```

这是 Claude 的原生 Python SDK，跑 `pip install anthropic` 装上就能用。注意 `max_tokens` 是必填的，不给这个参数直接报错。SDK 会帮你处理很多细节，比如自动重试、错误处理这些，比你自己拼 HTTP 请求省事多了。

**自定义格式**是各家厂商自己的格式，比如早期的百度文心、讯飞星火这些，API 格式五花八门。有的用 `prompt` 字段，有的用 `query` 字段，有的要你传个 `chat_id` 维护会话状态。这些设计说实话都不太行，维护成本高，开发者体验差。所以现在这些厂商基本都支持 OpenAI 兼容格式了，因为他们也意识到开发者不想为每个模型学一套 API。除非你用的是很老的接口或者特殊功能，否则建议直接用 OpenAI 格式。

要记住的是：**格式只是包装，核心逻辑都一样**——你发个消息列表过去，模型给你生成回复。OpenAI 格式流行是因为它设计合理，`messages` 数组能清楚表达对话历史，system/user/assistant 三种 role 覆盖了绝大部分场景。system 设定角色和规则，user 是用户输入，assistant 是模型回复，简单清晰，没有多余的复杂度。

## 代理这回事

代理分两种：网络代理和 API 代理转发。前者解决网络访问问题，后者解决格式和账号管理问题。别搞混了。

**网络代理**是你电脑和目标服务器之间的中转站。你访问 OpenAI API，请求先发到代理服务器，代理再转发给 OpenAI，响应原路返回。为什么要这么折腾？因为有些地区直连不了 OpenAI 的服务器（你懂的），或者你想隐藏真实 IP，或者你公司网络有限制不让直接访问外网。网络代理就是干这个用的。

网络代理有 HTTP 代理、HTTPS 代理、SOCKS5 代理这几种。SOCKS5 最通用，支持 TCP 和 UDP，很多科学上网工具用的就是这个。HTTP/HTTPS 代理只支持对应协议的流量，但配置简单。大多数情况下你只需要设个环境变量就行，程序会自动走代理。

```bash
# 用 curl 通过 HTTP 代理访问
curl -x http://proxy-server:port https://api.openai.com/v1/models \
  -H "Authorization: Bearer sk-your-key"

# Python 里设置代理
import openai
import os

os.environ['HTTP_PROXY'] = 'http://proxy-server:port'
os.environ['HTTPS_PROXY'] = 'http://proxy-server:port'

client = openai.OpenAI(api_key="sk-your-key")
response = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": "你好"}]
)
```

设完环境变量之后，所有 HTTP/HTTPS 请求都会走你指定的代理。连不上？检查代理地址对不对、代理服务器是不是在运行、防火墙有没有拦截。十有八九是代理端口写错了，或者代理需要认证但你没提供用户名密码。有些代理还要求你在 URL 里加上 `http://username:password@proxy-server:port` 这样的认证信息。

**API 代理转发**是另一回事。它是个中间服务，帮你转换 API 格式或者管理多个账号。比如你想用 OpenAI 的格式调 Claude，可以搭个转发服务，接收 OpenAI 格式的请求，转成 Claude 原生格式，再转发给 Claude API，最后把响应转回 OpenAI 格式返回给你。这样你的代码不用改，换模型只需要改个 `base_url` 和 `model` 参数。

```python
# 通过 API 转发服务使用不同模型
from openai import OpenAI

# 调用 Claude（通过转发服务）
client = OpenAI(
    api_key="your-claude-key",
    base_url="https://api-proxy.example.com/v1"  # 转发服务地址
)

response = client.chat.completions.create(
    model="claude-sonnet-4-5",  # 实际会转发给 Claude
    messages=[{"role": "user", "content": "你好"}]
)
```

这个模式的好处是统一接口。你可以搭一个转发服务支持十几个大模型，前端代码只需要改 `model` 参数就能切换模型，不用管每个模型的 API 细节。市面上有开源的方案，比如 LiteLLM、One API 这些，都能做格式转换和多模型管理。想自己搭也不难，核心逻辑就是个 HTTP 转发 + JSON 格式转换，几百行代码就能搞定。

还有一种常见场景是**代理池**。如果你有多个 API Key 或者需要负载均衡，可以搭个代理服务，自动轮换 Key 或者分发请求到不同账号。这样一个 Key 超额了，自动切到下一个，请求不中断。对于高并发场景特别有用。OpenAI 的 Rate Limit 是按 Key 算的，一个 Key 不够用？多搞几个，用代理池轮换，简单粗暴有效。

## 常见问题

**调 API 报 401 错误**，十有八九是 API Key 不对。检查 Key 是不是复制全了、有没有多余空格、Key 是不是过期了或者被吊销了。有些平台的 Key 有使用限制，比如只能从特定 IP 调用，或者只能调用特定的模型。还有，OpenAI 的 Key 格式是 `sk-` 开头，Claude 的是 `sk-ant-` 开头，别把两个搞混了。

**报 429 错误**是请求太频繁或者配额用完了。OpenAI 有 RPM（每分钟请求数）和 TPM（每分钟 Token 数）限制，超了就报 429。解决办法是降低请求频率、升级账号套餐、或者用多个 Key 轮换。如果你在写爬虫或者批处理脚本，加个 sleep 或者用队列控制并发，别一股脑全发出去。服务器也是要成本的，人家限流是正常的。

**网络超时**通常是网络问题。如果你在国内访问 OpenAI，没代理基本连不上，DNS 解析都过不去。配了代理还超时？检查代理是否正常、目标服务是不是在维护、或者你的请求是不是太大导致处理时间超过了超时设置。可以调大 `timeout` 参数试试，比如设成 60 秒或者 120 秒。但如果一个请求超过 60 秒还没返回，那多半是别的问题，不是简单的超时。

**返回格式不对或者解析失败**，可能是 API 格式变了或者你用错了 endpoint。大模型厂商有时会更新 API，老版本可能被废弃。OpenAI 就这么干过，直接把老的 Completion API 废弃了，强制大家迁移到 Chat Completion API。所以要时不时看看官方文档，确认当前的 endpoint 和参数格式。如果用的是第三方转发服务，确认转发服务支持的模型和版本，可能是转发服务的实现有问题。

**代理配置不生效**，环境变量可能没设对。有些库不读 `HTTP_PROXY` 环境变量，需要在代码里显式设置。比如 Python requests 库要传 `proxies` 参数，OpenAI SDK 的新版本要设置 `http_client`。遇到这种情况，去查库的文档看正确的代理配置方法。文档里肯定有，只是你没仔细看。还有，Windows 和 Linux 的环境变量设置方法不一样，别照抄命令。

最后说一句：**API 调用不复杂，别把它想得太高大上**。核心就是发 HTTP 请求、解析 JSON 响应，剩下的都是细节问题。遇到问题先看错误信息，搜一下大概率能找到答案。实在不行就写个最小可复现的代码，一步步调试，总能找到问题在哪。这比在群里问"为什么我的代码不工作"有用多了。
