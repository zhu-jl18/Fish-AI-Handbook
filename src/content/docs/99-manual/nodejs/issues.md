---
title: Node.js - 常见问题
description: Node.js 常见问题与解决方案
contributors:
  - claude
tab:
  label: 常见问题
  order: 30
---

## 安装与环境

### command not found

**原因**：Node.js/npm 未添加到 PATH。

**解决**：
1. 重启终端
2. 如果还不行，手动添加到环境变量：
   - 默认路径：`C:\Program Files\nodejs\`
   - NVM 路径：`C:\Users\<用户名>\AppData\Roaming\nvm`

### EPERM: operation not permitted

**原因**：权限不足。

**解决**：以管理员身份运行终端。

---

## 网络问题

### npm ERR! network

**原因**：无法访问 `registry.npmjs.org`。

**解决方案**：

**方案 1**：VPN 开 TUN 模式 / 全局代理

**方案 2**：使用镜像源

```bash
# 临时使用
npm install axios --registry=https://registry.npmmirror.com

# 永久配置
npm config set registry https://registry.npmmirror.com

# 查看当前源
npm config get registry

# 恢复官方源
npm config set registry https://registry.npmjs.org
```

**方案 3**：使用 nrm 管理多个源

```bash
npm install -g nrm
nrm ls        # 查看可用源
nrm use taobao
nrm use npm   # 切回官方
```

---

## 依赖问题

### node_modules 太大

`node_modules` 动辄几百 MB 是正常的。

**优化**：用 pnpm 替代 npm，通过硬链接共享依赖：

```bash
npm install -g pnpm
pnpm install
```

### 版本冲突 / 安装失败

```bash
# 删除 node_modules 和 lock 文件重装
rm -rf node_modules package-lock.json
npm install

# 清除 npm 缓存
npm cache clean --force
```

### peerDependencies 警告

```
npm WARN peerDependencies ...
```

通常可以忽略。如果真的有问题，尝试：

```bash
npm install --legacy-peer-deps
```

---

## 实用技巧

### 查看包信息

```bash
npm info axios          # 包详情
npm view axios versions # 所有版本
npm outdated            # 检查过期依赖
```

### 快速升级包

```bash
# 升级单个包
npm update axios

# 升级所有（遵循 semver）
npm update

# 升级到最新（忽略 semver）
npx npm-check-updates -u
npm install
```

### 查看依赖树

```bash
npm list              # 当前项目
npm list --depth=0    # 只看一级
npm list -g --depth=0 # 全局包
```
