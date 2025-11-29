---
title: API Key - Details
description: Detailed setup guides and configuration for API services
contributors:
  - claude
tab:
  label: Details
  order: 10
---

## 详细配置指南

本页面提供各 API 服务的详细配置步骤和使用说明。

### LiteLLM 详细配置

#### 安装与启动

```bash
# 使用 pip 安装
pip install litellm

# 或使用 Docker
docker run -p 8000:8000 ghcr.io/berriai/litellm:main-latest
```

#### 配置文件示例

```yaml
# config.yaml
model_list:
  - model_name: gpt-4
    litellm_params:
      model: openai/gpt-4
      api_key: os.environ/OPENAI_API_KEY
  
  - model_name: claude-3
    litellm_params:
      model: anthropic/claude-3-opus-20240229
      api_key: os.environ/ANTHROPIC_API_KEY

  - model_name: gemini-pro
    litellm_params:
      model: gemini/gemini-pro
      api_key: os.environ/GOOGLE_API_KEY

general_settings:
  master_key: sk-your-master-key
```

#### 启动服务

```bash
litellm --config config.yaml --port 8000
```

### One-API 详细配置

#### 数据库配置

One-API 支持 MySQL 和 SQLite：

```bash
# SQLite（开发/小规模使用）
SQL_DSN=./one-api.db

# MySQL（生产环境）
SQL_DSN=root:password@tcp(localhost:3306)/one_api
```

#### Docker Compose 部署

```yaml
version: '3.8'
services:
  one-api:
    image: justsong/one-api:latest
    ports:
      - "3000:3000"
    environment:
      - SQL_DSN=root:password@tcp(mysql:3306)/one_api
      - REDIS_CONN_STRING=redis://redis:6379
    depends_on:
      - mysql
      - redis
    
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: one_api
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:alpine

volumes:
  mysql_data:
```

### API 代理最佳实践

1. **密钥轮询**：配置多个上游 Key 实现负载均衡
2. **熔断机制**：单个上游失败时自动切换
3. **请求日志**：记录所有 API 调用用于审计
4. **限流配置**：保护上游服务免受滥用

---

> 💡 **提示**：更多配置选项请参考各项目的官方文档。
