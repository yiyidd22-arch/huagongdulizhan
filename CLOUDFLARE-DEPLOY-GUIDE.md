# Cloudflare Pages 独立站部署完整指南

> 本文档说明如何部署企业独立站「高源化工独立站」到 **Cloudflare Pages**。  
> **当前主方案（2026-06-06）**：新账号 `yiyi.dd22@gmail.com` + **GitHub Git 集成自动部署**。  
> 旧 QQ 邮箱账号的 Wrangler 直传方案保留在第六节作参考。

---

## 目录

1. [核心概念：什么是 Cloudflare 独立站项目](#一核心概念什么是-cloudflare-独立站项目)
2. [部署方式总览](#二部署方式总览)
3. [Git 集成部署（当前主方案）](#三git-集成部署当前主方案)
4. [直传部署完整流程（旧方案参考）](#四直传部署完整流程旧方案参考)
5. [每一步在干什么（详细讲解）](#五每一步在干什么详细讲解)
6. [直传部署 vs 连接 GitHub 的项目](#六直传部署-vs-连接-github-的项目)
7. [其他部署方式及优缺点](#七其他部署方式及优缺点)
8. [日常维护：改完代码怎么重新上线](#八日常维护改完代码怎么重新上线)
9. [新闻 API 与部署的关系](#九新闻-api-与部署的关系)
10. [常见问题](#十常见问题)

---

## 一、核心概念：什么是 Cloudflare 独立站项目

### 1.1 Cloudflare 是什么？

**Cloudflare** 是一家全球 CDN 与边缘计算平台。对你来说，它主要提供：

- **Pages**：托管静态网站（HTML、CSS、JS、图片等），自动分配 `项目名.pages.dev` 域名
- **Workers**：运行服务端代码（API、边缘函数）
- **R2 / D1 / KV**：对象存储、数据库、键值存储（独立站静态项目通常用不到）

本独立站使用的是 **Cloudflare Pages**，把构建好的静态文件放到 Cloudflare 全球节点，用户访问时从最近的节点加载，速度快、成本低。

### 1.2 什么是「独立站项目」？

在 Cloudflare 语境下，**一个 Pages 项目 = 一个独立站**。例如：

| 项目名 | 访问地址 | 说明 |
|--------|----------|------|
| `gaoyuanhaugong` | `https://gaoyuanhaugong.pages.dev` | 高源化工官网 |
| `my-new-site` | `https://my-new-site.pages.dev` | 新建的另一个站 |

每个项目彼此独立：有自己的部署记录、域名、环境（生产 / 预览），互不影响。

### 1.3 本项目的技术特点

本仓库（`huagongdulizhan`）是 **Next.js 静态导出** 站点：

- `next.config.ts` 中配置了 `output: "export"`
- 执行 `npm run build` 后，生成 **`out/`** 文件夹
- **`out/` 就是最终要上传到 Cloudflare 的整站文件**，不是源码

---

## 二、部署方式总览

Cloudflare Pages 主要有三种上线方式：

| 方式 | 俗称 | 一句话说明 |
|------|------|------------|
| **Wrangler CLI 直传** | 命令行直传 | 本地 build → 用 Wrangler 把 `out/` 上传到 Pages |
| **Dashboard 拖拽上传** | 网页直传 | 在 Cloudflare 控制台把构建产物拖进去 |
| **Git 集成** | 连 GitHub/GitLab | 代码推送到 Git 仓库，Cloudflare 自动拉取、构建、部署 |
| **CI/CD + Wrangler** | 半自动 | 代码在 GitHub，由 GitHub Actions 构建后用 Wrangler 部署（项目本身仍是直传类型） |

**本项目当前采用的是「Git 集成自动部署」**，代码在 GitHub，推送后由 Cloudflare 云端自动构建。

| 账号信息 | 值 |
|----------|-----|
| Cloudflare 邮箱 | `yiyi.dd22@gmail.com` |
| GitHub 账号 | `yiyidd22-arch` |
| 仓库 | `yiyidd22-arch/huagongdulizhan` |
| Pages 项目名 | `gaoyuanhaugong` |
| 生产地址 | `https://gaoyuanhaugong.pages.dev` |

> 详细连接过程见 **`CLOUDFLARE-GITHUB-SETUP.md`**。一键脚本：`scripts/setup-cloudflare-github.ps1`

---

## 三、Git 集成部署（当前主方案）

### 3.1 前置条件

1. GitHub 仓库 `yiyidd22-arch/huagongdulizhan` 已创建并包含本项目代码
2. Cloudflare 账号 `yiyi.dd22@gmail.com` 已授权 GitHub App
3. 本地已安装 Node.js 22、Git、Wrangler（可选，用于验证）

### 3.2 在 Cloudflare Dashboard 创建项目（首次）

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/)，用 **yiyi.dd22@gmail.com** 登录
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 授权 GitHub，选择仓库 `yiyidd22-arch/huagongdulizhan`
4. 构建配置：

| 配置项 | 值 |
|--------|-----|
| Project name | `gaoyuanhaugong` |
| Production branch | `master` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |

5. **Save and Deploy** → 等待构建完成 → 访问 `https://gaoyuanhaugong.pages.dev`

### 3.3 仓库中的构建配置

项目已包含以下文件，Cloudflare 构建时会自动识别：

| 文件 | 作用 |
|------|------|
| `wrangler.jsonc` | 声明 `pages_build_output_dir: "./out"` |
| `.node-version` / `.nvmrc` | Node.js 22 |
| `package.json` → `engines.node` | `>=20` |

### 3.4 日常更新网站

```powershell
# 修改代码后
git add .
git commit -m "更新说明"
git push origin master
# Cloudflare 自动构建部署，约 2–5 分钟
```

可在 Dashboard → **gaoyuanhaugong** → **Deployments** 查看构建日志与回滚。

### 3.5 一键配置脚本（首次授权后）

```powershell
cd d:\huagongdulizhan
wrangler login          # 浏览器用 yiyi.dd22@gmail.com 授权
gh auth login --web     # 浏览器用 yiyidd22-arch 授权
.\scripts\setup-cloudflare-github.ps1
```

---

## 四、直传部署完整流程（旧方案参考）

以下是从零到上线的完整步骤，按顺序执行即可。

### 阶段 0：一次性环境准备

```powershell
# 检查 Node.js（需要 v18 及以上）
node -v
npm -v

# 全局安装 Cloudflare 命令行工具 Wrangler
npm install -g wrangler

# 登录 Cloudflare 账号（会打开浏览器 OAuth 授权，无法用邮箱密码在终端登录）
wrangler login

# 确认已登录成功
wrangler whoami
```

### 阶段 1：本地开发与构建

```powershell
# 进入项目目录
cd d:\huagongdulizhan

# 安装依赖（首次或 package.json 变更后执行）
npm install

# 本地预览（可选，端口 4000）
npm run dev

# 构建生产版本 → 生成 out/ 目录
npm run build
```

### 阶段 2：在 Cloudflare 创建 Pages 项目（仅首次）

**方式 A — 命令行创建（推荐）**

```powershell
wrangler pages project create gaoyuanhaugong
```

按提示设置生产分支，建议填 **`master`**（与本仓库当前分支一致）。

**方式 B — 网页创建**

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 左侧 **Workers & Pages** → **Create application**
3. 选择 **Pages** → **Upload assets**（注意：选直传，不是 Connect to Git）
4. 输入项目名，例如 `gaoyuanhaugong`
5. 可先跳过上传，后续用 Wrangler 部署

### 阶段 3：上传并部署

```powershell
wrangler pages deploy out --project-name=gaoyuanhaugong --branch=master
```

部署成功后访问：

- 生产地址：**https://gaoyuanhaugong.pages.dev**
- 终端还会显示本次部署的预览 URL（带随机前缀）

### 阶段 4：验证

```powershell
# 查看项目列表
wrangler pages project list

# 查看部署历史
wrangler pages deployment list --project-name=gaoyuanhaugong
```

浏览器打开 `https://gaoyuanhaugong.pages.dev`，确认首页、关于、产品、新闻、联系等页面正常。

---

## 五、每一步在干什么（详细讲解）

### 步骤 1：`npm install`

**干什么：** 根据 `package.json` 下载项目依赖（Next.js、React、Tailwind 等）。

**为什么需要：** 没有依赖就无法本地开发或构建。只在首次克隆项目、或有人更新了依赖包之后需要执行。

---

### 步骤 2：`npm run dev`

**干什么：** 启动本地开发服务器（本项目端口 **4000**），改代码可热更新预览。

**为什么需要：** 上线前在本地检查页面效果，避免把错误代码部署上去。此步骤**不参与**正式部署，可跳过。

---

### 步骤 3：`npm run build`

**干什么：** Next.js 把源码编译、打包、预渲染，输出纯静态文件到 **`out/`** 目录。

**内部发生了什么：**

1. TypeScript 类型检查
2. React 组件编译
3. 各页面（`/`, `/about`, `/products` 等）生成对应的 `index.html`
4. CSS、JS、图片复制到 `out/`
5. 因为配置了 `output: "export"`，不会生成需要 Node 服务器运行的动态页面

**为什么需要：** Cloudflare Pages 直传模式只接收**已经构建好的静态文件**，不会在云端替你跑 `npm run build`（除非你用 Git 集成模式）。

---

### 步骤 4：`wrangler login`

**干什么：** 在本地电脑与 Cloudflare 账号之间建立 OAuth 授权，Wrangler 获得部署权限。

**为什么需要：** 没有登录，Wrangler 无法向你的账号上传文件。这是**一次性**操作（token 会缓存在本机），除非登出或换电脑。

---

### 步骤 5：`wrangler pages project create`

**干什么：** 在 Cloudflare 账号下**新建一个空的 Pages 项目容器**，分配 `项目名.pages.dev` 子域名。

**为什么需要：** 部署前必须有一个「放网站的地方」。相当于在云盘上新建一个文件夹，但还没往里放文件。

**只需执行一次。** 项目已存在则跳过，直接 deploy。

---

### 步骤 6：`wrangler pages deploy out`

**干什么：** 把本地 `out/` 目录里的所有文件上传到指定 Pages 项目，并创建一次**部署（Deployment）**。

**参数说明：**

| 参数 | 作用 |
|------|------|
| `out` | 要上传的本地目录（构建产物） |
| `--project-name=gaoyuanhaugong` | 目标 Cloudflare Pages 项目名 |
| `--branch=master` | 指定为**生产分支**的部署，绑定主域名 `gaoyuanhaugong.pages.dev` |

**为什么需要：** 这是实际上线的关键一步。每次 deploy 都会产生一个新版本，可在控制台回滚。

---

## 六、直传部署 vs 连接 GitHub 的项目

这是最容易混淆的一点，建议仔细看清。

### 5.1 对比表

| 对比项 | 直传部署（旧 QQ 账号） | Git 集成部署（当前） |
|--------|-------------------|--------------|
| **创建方式** | Upload assets / Wrangler deploy | Connect to Git（连 GitHub/GitLab） |
| **代码存放** | 本地电脑 + 你自己管理的 Git（可选） | 必须在 GitHub/GitLab 远程仓库 |
| **谁负责构建** | **你在本地**执行 `npm run build` | **Cloudflare 云端**自动 `npm run build` |
| **谁负责上传** | 你手动 `wrangler pages deploy out` | 推送 Git 后 Cloudflare 自动部署 |
| **部署触发** | 手动执行命令或拖拽 | `git push` 自动触发 |
| **能否事后切换** | 直传 → Git：**不能**（需删项目重建） | Git → 直传：可关闭自动部署，改用手动 Wrangler |
| **Dashboard 显示** | Git Provider 显示 **No** | 显示 **GitHub** 或 **GitLab** |
| **适合场景** | 个人站、手动控节奏、无 Git 仓库 | 团队协作、频繁更新、要自动 CI |

### 5.2 流程对比图

**直传部署（旧 QQ 账号方案）：**

```
本地改代码 → npm run build → 生成 out/ → wrangler deploy → 上线
     ↑                                              |
     └──────────── 每次更新都要重复整条链路 ──────────┘
```

**Git 集成部署（当前主方案）：**

```
本地改代码 → git push → GitHub 仓库 → Cloudflare 自动拉代码 → 云端 build → 上线
                                              ↑
                                    push 一次，其余自动
```

### 6.3 关键限制（官方说明）

> **直传项目创建后，无法在同一个项目上改为 Git 集成。**  
> 若要从直传改为 Git 自动部署，需要：删除原 Pages 项目 → 用 Git 集成方式重新创建同名项目。

旧 QQ 账号下的 `gaoyuanhaugong` 是直传类型；新 Gmail 账号下已用 **Connect to Git** 重建。

### 5.4 和「代码放在 GitHub 但用 Actions 部署」的区别

项目里虽有 `.github/workflows/deploy-pages.yml`，但若 Pages 项目本身是直传类型：

- GitHub 只负责**存代码**
- 推送后由 **GitHub Actions** 在云端 build + 调用 Wrangler 部署
- Cloudflare 侧仍显示直传，不是原生 Git 集成

这算第四种「半自动」方案，兼顾版本管理与自动部署，但要在 GitHub 配置 `CLOUDFLARE_API_TOKEN` 密钥。

---

## 七、其他部署方式及优缺点

### 7.1 Wrangler CLI 直传（旧方案）

**做法：** `npm run build` → `wrangler pages deploy out`

| 优点 | 缺点 |
|------|------|
| 流程清晰，完全可控 | 每次更新都要本地 build + deploy |
| 不依赖 GitHub，不暴露仓库 | 容易忘记部署，本地环境不一致可能 build 失败 |
| 不消耗 Cloudflare 构建分钟数 | 无法在同一项目上事后改连 Git |
| 适合静态导出站点 | 多人协作时缺少统一 CI 记录 |

**最适合：** 个人站、更新不频繁、希望简单直接的场景。

---

### 7.2 Dashboard 拖拽上传

**做法：** Cloudflare 控制台 → 项目 → Create deployment → 拖入 `out/` 文件夹

| 优点 | 缺点 |
|------|------|
| 零命令行，纯鼠标操作 | 单次最多约 1000 个文件（大站可能不够） |
| 适合偶尔更新 | 无法脚本化，不适合频繁发布 |
| 直观看到上传进度 | 仍需先在本地 build |

**最适合：** 不熟悉终端、偶尔改几个字的上传场景。

---

### 7.3 Git 集成（Connect to GitHub / GitLab）— 当前主方案

**做法：** 创建项目时选 Connect to Git → 授权 → 选仓库 → 配置 build 命令

本项目 Cloudflare 构建配置：

| 配置项 | 值 |
|--------|-----|
| Build command | `npm run build` |
| Build output directory | `out` |
| Production branch | `main` 或 `master` |

| 优点 | 缺点 |
|------|------|
| `git push` 即自动部署 | 必须先把代码放到 GitHub/GitLab |
| 团队多人协作友好 | 创建后不能改回纯直传 |
| 每次构建在云端，环境统一 | 构建失败要在 Cloudflare 日志里排查 |
| 支持 PR 预览部署 | 需安装并授权 Cloudflare GitHub App |

**最适合：** 团队开发、频繁迭代、需要 PR 预览的正式项目。

---

### 7.4 GitHub Actions + Wrangler（备用 CI/CD）

**做法：** 代码在 GitHub，推送触发 Actions → `npm run build` → `wrangler-action` 部署

| 优点 | 缺点 |
|------|------|
| 保留直传项目，无需删重建 | 需配置 `CLOUDFLARE_API_TOKEN` |
| 推送自动部署，有构建日志 | 多一层 GitHub Actions 配置 |
| 代码有版本历史 | Cloudflare 仍显示非 Git 集成 |

**最适合：** 已有直传项目、又想自动部署、暂时不想删项目重建。

---

### 7.5 其他平台（了解即可）

| 平台 | 特点 |
|------|------|
| **Vercel** | Next.js 官方推荐，对 Next 全特性支持最好，但绑定 Vercel 生态 |
| **Netlify** | 类似 Pages，Git 集成成熟，免费额度友好 |
| **自建服务器 + Nginx** | 完全掌控，但要自己管服务器、HTTPS、备份 |
| **Cloudflare Workers（非 Pages）** | 适合要 SSR/API 的 Next.js，配置比静态 Pages 复杂 |

本项目选 Cloudflare Pages + 静态导出，是因为站点以展示为主，无需 Node 服务器，成本低、全球 CDN 快。

---

## 八、日常维护：改完代码怎么重新上线

### Git 集成模式（当前）

```powershell
cd d:\huagongdulizhan
git add .
git commit -m "更新说明"
git push origin master
```

| 步骤 | 耗时 | 说明 |
|------|------|------|
| push | 数秒 | 推送到 GitHub |
| Cloudflare 构建 | 约 2–5 分钟 | 云端自动 `npm run build` 并部署 |

可在 Cloudflare Dashboard → **gaoyuanhaugong** → **Deployments** 查看构建日志，必要时回滚。

### 直传模式（旧方案，备用）

```powershell
cd d:\huagongdulizhan
npm run build
wrangler pages deploy out --project-name=gaoyuanhaugong --branch=master
```

---

## 九、新闻 API 与部署的关系

本独立站的新闻数据来自后台管理系统 `https://gaoyuan.zwstone.cn/api`，由 `src/lib/news-api.ts` 在**浏览器端实时拉取**（`cache: "no-store"`）。

| 操作 | 是否需要重新部署 |
|------|------------------|
| 在后台发布/编辑新闻 | **否** — 用户刷新新闻页即可看到 |
| 修改网站页面、样式、组件 | **是** — `git push` 触发 Cloudflare 重建 |
| 修改新闻 API 地址或逻辑 | **是** — 需改代码并推送 |

验证 API 是否正常：

```powershell
Invoke-RestMethod "https://gaoyuan.zwstone.cn/api/news/public?limit=3"
```

---

## 十、常见问题

### Q1：`gaoyuanhaugong.pages.dev` 打开是 404？

**原因：** 部署到了 Preview 环境，未绑定生产分支。

**解决：** 部署时加上 `--branch=master`，并在项目设置里把 production branch 设为 `master`。

---

### Q2：改了代码但线上没变？

**原因（Git 集成）：** 只改了本地代码，没有 `git push`；或 Cloudflare 构建失败。

**解决：** 确认已 `git push origin master`，并在 Dashboard → Deployments 查看构建状态。

**原因（直传模式）：** 只改了源码，没有重新 `build` + `deploy`。

---

### Q3：能否不装 Wrangler，只用网页？

可以。本地 `npm run build` 后，到 Cloudflare 控制台拖拽 `out/` 目录上传。但长期维护仍推荐 Wrangler，更快且可脚本化。

---

### Q4：新闻页需要后台 API，静态部署能用吗？

可以。浏览器里的 JavaScript 可在页面加载后请求外部 API（本项目新闻页即如此）。静态部署只表示**页面 HTML 是预生成的**，不影响前端调用接口。

---

### Q5：如何绑定自己的域名（如 `www.gaoyuanchem.com`）？

1. Cloudflare Dashboard → 项目 **gaoyuanhaugong** → **Custom domains**
2. 添加域名并按提示配置 DNS（通常 CNAME 到 `gaoyuanhaugong.pages.dev`）
3. Cloudflare 自动签发 HTTPS 证书

---

### Q6：后台发了新闻，独立站没显示？

**原因：** 新闻 API 请求失败，或文章状态为草稿。

**解决：**
1. 确认文章已在后台**发布**（非草稿）
2. 浏览器打开独立站 `/news`，F12 → Network 查看对 `gaoyuan.zwstone.cn/api` 的请求
3. 直接访问 `https://gaoyuan.zwstone.cn/api/news/public?limit=5` 确认有数据

### Q7：从旧 QQ 账号迁移到新 Gmail 账号？

见 **`CLOUDFLARE-GITHUB-SETUP.md`** 完整过程记录。新账号用 Git 集成重建 `gaoyuanhaugong` 项目即可。

---

## 附录：本项目的快速命令速查

```powershell
# 开发
npm run dev

# 本地构建验证
npm run build

# Git 集成部署（当前主方案）
git add . ; git commit -m "更新" ; git push origin master

# 一键配置（首次授权后）
.\scripts\setup-cloudflare-github.ps1

# 查看 Cloudflare 账号与项目
wrangler whoami
wrangler pages project list
wrangler pages deployment list --project-name=gaoyuanhaugong

# 直传部署（旧方案备用）
wrangler pages deploy out --project-name=gaoyuanhaugong --branch=master
```

---

## 附录：相关文件说明

| 文件 | 作用 |
|------|------|
| `next.config.ts` | `output: "export"` 开启静态导出；`images.unoptimized` 适配静态托管 |
| `package.json` | `npm run build` 触发 Next.js 生产构建 |
| `wrangler.jsonc` | Cloudflare Pages 构建输出目录 `out` |
| `out/` | 构建产物（Git 集成时由云端生成，已在 `.gitignore` 中忽略） |
| `.github/workflows/deploy-pages.yml` | 备用 GitHub Actions 部署（主路径为 Cloudflare 原生 Git 集成） |
| `scripts/setup-cloudflare-github.ps1` | 授权后一键配置脚本 |
| `CLOUDFLARE-GITHUB-SETUP.md` | Cloudflare ↔ GitHub 连接过程记录 |
| `SITE-OVERVIEW.md` | 本站功能与页面结构说明 |

---

*文档版本：2026-06-06 · 适用于高源化工独立站（huagongdulizhan）Cloudflare Pages Git 集成部署*
