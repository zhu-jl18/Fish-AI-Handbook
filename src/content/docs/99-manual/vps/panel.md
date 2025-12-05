---
title: VPS - 管理面板
description: 1Panel 安装与使用
contributors:
  - claude
tab:
  label: 管理面板
  order: 20
---

用管理面板可以图形化管理服务器，不用记命令。

## 1Panel（推荐）

[1Panel](https://github.com/1panel-org/1panel) 是一个现代化的 Linux 服务器运维管理面板。

### 特点

- **应用商店**：一键安装 Nginx、MySQL、Redis、WordPress 等
- **Docker 可视化**：管理容器、镜像、网络
- **网站管理**：创建站点、配置反向代理
- **文件管理**：Web 文件管理器
- **定时任务**：可视化 cron
- **监控面板**：CPU、内存、磁盘监控

### 安装

```bash
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sudo bash quick_start.sh
```

安装后会显示访问地址和初始密码。

### 常用操作

**通过应用商店安装 Nginx**
1. 进入 应用商店 → 搜索 Nginx
2. 点击安装，选择版本
3. 等待 Docker 拉取镜像并启动

**配置反向代理**
1. 网站 → 创建网站 → 反向代理
2. 填入代理地址（如 `http://127.0.0.1:8080`）
3. 保存即生效

---

## 手动安装 Nginx

如果不用面板，手动安装：

```bash
# Debian/Ubuntu
apt install -y nginx

# 启动
systemctl start nginx
systemctl enable nginx

# 配置文件位置
/etc/nginx/nginx.conf
/etc/nginx/sites-available/
```

### 反向代理配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Docker 安装

大多数应用都通过 Docker 部署：

```bash
# 一键安装 Docker
curl -fsSL https://get.docker.com | sh

# 安装 Docker Compose
apt install -y docker-compose-plugin

# 验证
docker --version
docker compose version
```

## 其他面板

| 面板 | 特点 |
| --- | --- |
| [宝塔](https://www.bt.cn/) | 老牌，功能全，但闭源 |
| [1Panel](https://1panel.cn/) | 开源，现代，推荐 |
| [CasaOS](https://casaos.io/) | 家庭服务器专用，简洁 |
