const id = "01-fish-talks/glossary/reverse-proxy.md";
						const collection = "docs";
						const slug = "01-fish-talks/glossary/reverse-proxy";
						const body = "\r\n# 为什么要懂反向代理\r\n\r\n- **隐藏后端细节**：多个服务与模型供应商在后面切换，外部用户只看到同一个域名。\r\n- **安全与配额**：在边缘层做鉴权、限流、WAF 与审计，降低泄露与滥用风险。\r\n- **性能**：做 CDN/缓存与连接复用，显著提升长流式响应的稳定性。\r\n\r\n## 常见能力\r\n\r\n- 路由与重试：按路径/权重/健康检查路由；失败自动重试与熔断。\r\n- 缓存：对热门提示/结果短期缓存，降低 token 成本。\r\n- 观测：日志、指标、追踪三件套，定位慢请求与错误热点。\r\n\r\n> 结论：有了反代，你可以在不改客户端的情况下“无感”切换模型与供应商。\r\n";
						const data = {title:"反代",description:"反向代理位于服务端前，对外统一域名，负责转发、鉴权、缓存与负载均衡"};
						const _internal = {
							type: 'content',
							filePath: "X:/Projcet/AI BOOK/src/content/docs/01-fish-talks/glossary/reverse-proxy.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };
