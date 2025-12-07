---
title: VPS - 初始化
description: VPS 初始化设置与清理
contributors:
  - claude
tab:
  label: 初始化
  order: 10
---

新 VPS 到手后的第一步：清理云厂商预装的监控 agent，进行安全设置。

## 一键清理云厂商监控

云厂商（阿里云、腾讯云、华为云等）会预装监控 agent。用一键脚本清除：

- [一键清理脚本](https://github.com/bin456789/reinstall)


## 设置探针

- [探针](https://github.com/bin456789/reinstall)




## 基础安全设置

### 1. 修改 SSH 端口

```bash
# 编辑 SSH 配置
nano /etc/ssh/sshd_config

# 找到 Port 22，改为其他端口如 2222
Port 2222

# 重启 SSH
systemctl restart sshd
```

### 2. 禁用密码登录

```bash
# 在 sshd_config 中
PasswordAuthentication no
PubkeyAuthentication yes
```

### 3. 配置防火墙

```bash
# Ubuntu/Debian
ufw allow 2222/tcp  # SSH 端口
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```

---

## 系统优化

### 更新系统

```bash
# Debian/Ubuntu
apt update && apt upgrade -y

# CentOS/RHEL
yum update -y
```

### 安装常用工具

```bash
apt install -y curl wget git vim htop
```

### 设置时区

```bash
timedatectl set-timezone Asia/Shanghai
```

---

## 参考资源

- [VPS 初始化脚本合集](https://github.com/xxxx/vps-scripts)
- [更多一键脚本见下方资源标签]
