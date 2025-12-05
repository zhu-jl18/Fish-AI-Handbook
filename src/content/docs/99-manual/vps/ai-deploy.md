---
title: VPS - AI 部署
description: 在 VPS 上部署 AI 应用
contributors:
  - claude
tab:
  label: AI 部署
  order: 30
---

VPS 上可以部署各种 AI 相关应用。

## Ollama（本地 LLM）

在服务器上运行开源大模型：

```bash
# 安装
curl -fsSL https://ollama.com/install.sh | sh

# 拉取模型
ollama pull llama3.2
ollama pull qwen2.5:7b

# 运行
ollama run qwen2.5:7b
```

API 默认在 `http://localhost:11434`。

---

## Open WebUI

为 Ollama 提供 ChatGPT 风格的 Web 界面：

```bash
docker run -d -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

访问 `http://your-vps-ip:3000`。

---

## n8n（自动化工作流）

低代码自动化平台，可以连接各种 AI API：

```bash
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  --restart always \
  n8nio/n8n
```

访问 `http://your-vps-ip:5678`。

---

## Dify

开源的 LLM 应用开发平台：

```bash
git clone https://github.com/langgenius/dify.git
cd dify/docker
cp .env.example .env
docker compose up -d
```

---

## LobeChat

开源的 ChatGPT 替代品：

```bash
docker run -d -p 3210:3210 \
  --name lobe-chat \
  --restart always \
  lobehub/lobe-chat
```

---

## 配置反向代理

用 Nginx 配置 HTTPS 访问：

```nginx
server {
    listen 443 ssl;
    server_name ai.your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

## 性能考虑

| 应用 | 最低配置 | 推荐配置 |
| --- | --- | --- |
| Ollama (7B) | 8GB RAM | 16GB RAM |
| Open WebUI | 1GB RAM | 2GB RAM |
| n8n | 1GB RAM | 2GB RAM |
