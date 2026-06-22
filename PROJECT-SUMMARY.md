# 高源化工独立站 — 项目开发进度与总体说明

> 文档日期：2026-06-08  
> 适用仓库：`d:\huagongdulizhan`（GitHub：`yiyidd22-arch/huagongdulizhan`）

---

## 🤖 给其他 AI 模型的上下文（读这一段就够）

**我在做什么：** 为山东高密高源化工有限公司搭建并运维一套 **企业官网 + 后台管理系统 + Cloudflare 新闻同步** 的完整方案。

**三个系统，各管一事：**

| 系统 | 地址 | 职责 |
|------|------|------|
| 独立站（我在开发的主仓库） | https://huagongdulizhan.pages.dev | 对外官网：首页、产品、新闻、联系 |
| 化工管理系统 CMS | https://gaoyuan.zwstone.cn | 后台发新闻、收咨询表单、管业务 |
| Cloudflare 数据层 | R2 `gaoyuan-news` + Worker | 存新闻 JSON/图片，全球 CDN 加速 |

**当前状态（2026-06-08）：**

- ✅ 独立站 **已全部开发完成并推送到 GitHub**，Cloudflare Pages **已是最新线上版本**
- ✅ 新闻文字通过 Webhook 自动同步到 R2，独立站读 `/news-data/list.json`（不走实时 API）
- ✅ Worker `gaoyuan-news-sync`、Pages Function、R2 绑定均已部署
- ⏳ 新闻 **图片进 R2** 的代码已写好（独立站 + Worker 已上线），**CMS 后端还需重新部署一次**（`deploy-to-server.ps1`），部署后后台发带封面新闻即可验证

**两种更新方式（不要搞混）：**

| 操作 | 怎么做 | 要不要 git push |
|------|--------|----------------|
| 改官网页面/样式 | 改 `huagongdulizhan` → `git push` | 要，等 2–5 分钟 |
| 发/改/删新闻 | CMS 后台点发布 | 不要，5–30 秒自动同步 R2 |

**本地路径：**

- 独立站：`d:\huagongdulizhan`
- CMS 后端：`D:\化工订单网站\shoe-factory-template\shoe-factory-template\houduan`
- CMS 部署脚本：`D:\化工订单网站\shoe-factory-template\shoe-factory-template\scripts\deploy-to-server.ps1`

**关键文件（独立站）：** `src/lib/news-api.ts`、`functions/news-data/[[path]].ts`、`workers/news-sync/src/index.ts`  
**关键文件（CMS）：** `houduan/src/news/news-sync.service.ts`

**运维文档：** `自动部署更新网站/新闻与部署流程说明.md`

---

## 一、项目概述

本项目为 **山东高密高源化工有限公司（GAOYUAN CHEMICAL）** 的企业官网（独立站），面向国内外客户展示公司概况、产品、新闻动态与联系方式。

| 项目属性 | 说明 |
|----------|------|
| 品牌 | 银州牌（YINZHOU）亚氯酸钠 |
| 隶属 | 孚日集团（SUNVIM Group） |
| 独立站地址 | https://huagongdulizhan.pages.dev |
| 后台管理系统 | https://gaoyuan.zwstone.cn |
| 技术栈 | Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 |
| 托管平台 | Cloudflare Pages + R2 + Workers |
| 源码仓库 | https://github.com/yiyidd22-arch/huagongdulizhan |

**一句话理解本项目：**

> 独立站负责「展示」；化工管理系统负责「发新闻、收咨询」；Cloudflare R2 负责「存新闻数据并全球加速」。三者分工明确，互不干扰。

---

## 二、整体架构（三个系统）

```
┌──────────────────────────────────────────────────────────────────────┐
│  ① 化工管理系统（CMS）                                                │
│  宝塔服务器 43.153.118.218 · Docker Compose                          │
│  https://gaoyuan.zwstone.cn                                          │
│                                                                      │
│  功能：新闻发布/管理、咨询表单接收、订单等业务后台                      │
│  本地源码：D:\化工订单网站\shoe-factory-template\shoe-factory-template │
└────────────────────────────┬─────────────────────────────────────────┘
                             │ 发布新闻时 Webhook（含图片 base64）
                             ↓
┌──────────────────────────────────────────────────────────────────────┐
│  ② Cloudflare 数据层                                                  │
│                                                                      │
│  Worker  gaoyuan-news-sync  →  同步新闻 JSON + 图片到 R2              │
│  R2 桶   gaoyuan-news       →  存储 list.json / detail/*.json / images/ │
│  Pages Function             →  把 R2 暴露为 /news-data/*              │
└────────────────────────────┬─────────────────────────────────────────┘
                             │ 浏览器读取本站 /news-data/
                             ↓
┌──────────────────────────────────────────────────────────────────────┐
│  ③ 独立站（官网）                                                     │
│  Cloudflare Pages · GitHub 自动构建                                   │
│  https://huagongdulizhan.pages.dev                                   │
│                                                                      │
│  功能：企业官网展示（首页、关于、产品、新闻、联系）                      │
│  本地源码：d:\huagongdulizhan                                         │
└──────────────────────────────────────────────────────────────────────┘
```

### 两类更新，两种操作方式

| 你要做的事 | 在哪里操作 | 是否需要 git push | 大约多久生效 |
|------------|-----------|-------------------|--------------|
| 发布 / 编辑 / 删除新闻 | CMS 后台 | **不需要** | **5–30 秒**（自动同步 R2） |
| 改页面、样式、文案 | 独立站本地代码 | **需要** | **2–5 分钟**（Cloudflare 构建） |
| 手动补救新闻同步 | 独立站 `npm run sync:news` | 不需要 | 约 30 秒–1 分钟 |

---

## 三、独立站构成与功能

### 3.1 页面结构

| 路由 | 功能说明 |
|------|----------|
| `/` | 首页：Hero、数据统计、公司简介、产品展示、设备、出口市场、荣誉资质 |
| `/about` | 关于我们：企业简介、发展历程（横向惯性滚动）、企业文化、生产设备、市场展望 |
| `/products` | 产品总览：亚氯酸钠、氯酸钠入口 |
| `/products/sodium-chlorite` | 亚氯酸钠详情（性质、用途、包装、储运、毒性防护、技术指标表） |
| `/products/sodium-chlorate` | 氯酸钠详情 |
| `/news` | 新闻列表（从本站 `/news-data/list.json` 读取） |
| `/news/detail?id=xxx` | 新闻详情（从 `/news-data/detail/{id}.json` 读取） |
| `/contact` | 联系我们：地址、电话、邮箱、留言表单（提交到 CMS API） |

### 3.2 核心功能模块

| 模块 | 说明 | 关键文件 |
|------|------|----------|
| **中英文双语** | English / 中文切换，偏好存 `localStorage` | `src/contexts/LanguageContext.tsx`、`src/lib/i18n/translations.ts` |
| **深色科技主题** | 深蓝黑底 + 青色荧光，全站统一视觉 | `src/app/globals.css` |
| **图片融合** | Banner/内容图柔和渐变融入背景 | `src/components/BlendedImage.tsx` |
| **导航栏** | 顶部透明 → 滚动后深色胶囊导航 | `src/components/Header.tsx` |
| **鼠标荧光** | 桌面端跟随鼠标的蓝色光晕 | `src/components/CursorGlow.tsx` |
| **浮动电话** | 右下角一键拨号按钮 | `src/components/FloatingPhoneButton.tsx` |
| **新闻中心** | 读 R2 静态 JSON，封面/配图走本站 CDN | `src/lib/news-api.ts` |
| **咨询表单** | POST 到 CMS `/consultations/public` | `src/lib/consultation-api.ts` |
| **公司静态数据** | 地址、电话、产品、历程、资质等 | `src/lib/data.ts` |

### 3.3 新闻数据流（现方案）

```
CMS 后台发布新闻
  → houduan NewsSyncService 读取 uploads/news/ 本地图片
  → POST 到 Worker（文字 API + 图片 base64）
  → Worker 写入 R2：
      list.json、detail/{id}.json、images/{文件名}
  → 独立站 /news 页面请求 /news-data/list.json
  → Pages Function 从 R2 返回数据
  → 用户看到最新新闻（文字 + 图片均来自本站）
```

**与旧方案的区别：** 旧方案是浏览器每次实时请求 `gaoyuan.zwstone.cn/api`，速度慢且易失败；现方案走 Cloudflare CDN，全球访问更快、更稳定。

### 3.4 目录结构

```
huagongdulizhan/
├── src/
│   ├── app/                    # 页面路由（Next.js App Router）
│   │   ├── page.tsx            # 首页
│   │   ├── about/              # 关于我们
│   │   ├── products/           # 产品页及详情
│   │   ├── news/               # 新闻列表与详情
│   │   ├── contact/            # 联系我们
│   │   ├── layout.tsx          # 根布局
│   │   └── globals.css         # 全局样式
│   ├── components/             # 可复用组件
│   ├── contexts/               # React Context（语言）
│   └── lib/                    # 数据、API、i18n
├── public/images/              # 静态图片资源
├── functions/
│   └── news-data/[[path]].ts   # Pages Function：R2 → /news-data/*
├── workers/
│   └── news-sync/              # Webhook Worker：CMS → R2 同步
├── scripts/
│   ├── sync-news-to-r2.mjs     # 手动同步脚本
│   ├── lib/news-sync-images.mjs
│   └── prune-news-static-out.mjs
├── wrangler.jsonc              # Pages + R2 绑定
├── next.config.ts              # 静态导出 + 本地 dev 代理
├── 自动部署更新网站/            # 运维流程文档
├── CLOUDFLARE-DEPLOY-GUIDE.md  # Cloudflare 部署指南
├── SITE-OVERVIEW.md            # 页面与组件详细说明
└── PROJECT-SUMMARY.md          # 本文档
```

---

## 四、开发进度总结

### 4.1 里程碑时间线

| 阶段 | 时间 | 完成内容 |
|------|------|----------|
| **项目初始化** | 2026-06 初 | Next.js 脚手架、基础目录 |
| **官网主体开发** | 2026-06 初 | 首页、关于、产品、新闻、联系等全部页面；深色科技主题；中英文双语 |
| **Cloudflare 部署** | 2026-06-06 | Pages 项目创建、GitHub 集成、`wrangler.jsonc` 配置 |
| **新闻 API 对接** | 2026-06-06 | 新闻页对接 CMS API；本地 dev 代理 `/backend-api` |
| **R2 新闻同步** | 2026-06-07 | R2 桶 `gaoyuan-news`、Pages Function、`sync-news-to-r2` 脚本 |
| **自动 Webhook 同步** | 2026-06-08 | Worker `gaoyuan-news-sync`；CMS `NewsSyncService` 发布即同步 |
| **新闻图片进 R2** | 2026-06-08 | CMS 推送本地图片 base64 → Worker 写 R2；独立站读 `/news-data/images/` |

### 4.2 已完成功能 ✅

| 类别 | 功能 |
|------|------|
| **官网展示** | 8 个页面全部完成；深色科技主题；中英文切换；响应式布局 |
| **交互体验** | 胶囊导航、鼠标荧光、横向惯性滚动、浮动电话按钮 |
| **产品展示** | 亚氯酸钠/氯酸钠详情页；包装实拍图；技术指标表 |
| **新闻系统** | R2 静态 JSON；Pages Function 提供 API；自动 Webhook 同步 |
| **咨询表单** | 联系页表单对接 CMS 后端 |
| **部署上线** | Cloudflare Pages 生产环境可访问；Git push 自动构建 |
| **文档** | 部署指南、新闻流程说明、站点功能说明 |

### 4.3 进行中 / 待操作 ⏳

| 事项 | 状态 | 说明 |
|------|------|------|
| **独立站代码上线** | ✅ 已完成 | 已 `git push`，Cloudflare Pages 线上为最新版 |
| **CMS 图片推送逻辑部署** | 代码已写好，待服务器更新 | 需重新运行 `deploy-to-server.ps1` 部署 houduan |
| **图片同步端到端验证** | 待 CMS 部署后触发 | 后台编辑带封面新闻 → 检查 `coverImage` 是否为 `/news-data/images/xxx.jpg` |

### 4.4 可选后续扩展 📋

- 自定义域名绑定（如 `www.gaoyuanchemical.com`）
- SEO 结构化数据与多语言 meta 优化
- 新闻分页与搜索
- 图片 WebP 优化与懒加载
- 联系表单防垃圾（Turnstile 等）

---

## 五、从开发到部署的完整流程

### 5.1 本地开发（独立站）

```powershell
cd d:\huagongdulizhan
npm install
npm run dev
# 浏览器打开 http://localhost:4000
```

**本地看新闻：**

```powershell
# 同步新闻到 public/news-data/（可选上传 R2）
npm run sync:news

# 或只写本地、不上传：
# $env:SKIP_R2=1; npm run sync:news
```

**本地直连 CMS 实时 API（可选）：**

在 `.env.local` 中设置 `NEXT_PUBLIC_NEWS_USE_LIVE_API=true`，新闻将从 `gaoyuan.zwstone.cn/api` 实时拉取。

### 5.2 独立站上线（改代码后）

```powershell
cd d:\huagongdulizhan
git add .
git commit -m "更新说明"
git push origin master
```

推送后 Cloudflare Pages 自动：

1. 从 GitHub 拉取代码
2. 执行 `npm run build`（构建时删除 `out/news-data`，避免覆盖 R2 实时数据）
3. 部署到 https://huagongdulizhan.pages.dev

**手动部署（备用）：**

```powershell
npm run pages:deploy
```

### 5.3 发布新闻（不需要 git push）

```
1. 登录 https://gaoyuan.zwstone.cn/#/news/list
2. 新建 / 编辑新闻 → 上传封面图 → 点击「发布」
3. CMS 后端自动 Webhook → Worker 同步到 R2
4. 约 5–30 秒后，刷新独立站 /news 即可看到
```

**手动补救同步：**

```powershell
cd d:\huagongdulizhan
npm run sync:news
```

### 5.4 化工管理系统部署（改后台代码后）

```powershell
cd D:\化工订单网站\shoe-factory-template\shoe-factory-template
.\scripts\deploy-to-server.ps1
```

服务器路径：`/gaoyuan3/huagong-system/`，Docker Compose 运行。  
SSH 信息见：`远程连接服务器/SSH-CONFIG.md`

### 5.5 Worker 部署（一般不需要，已部署）

```powershell
cd d:\huagongdulizhan
npm run sync:worker:deploy
```

---

## 六、Cloudflare 资源一览

| 资源 | 名称 / 地址 |
|------|-------------|
| Cloudflare 账号 | `yiyi.dd22@gmail.com` |
| Pages 项目 | `huagongdulizhan` |
| 生产地址 | https://huagongdulizhan.pages.dev |
| GitHub 仓库 | `yiyidd22-arch/huagongdulizhan` |
| 生产分支 | `master` |
| R2 存储桶 | `gaoyuan-news` |
| 同步 Worker | https://gaoyuan-news-sync.yiyi-dd22.workers.dev |
| Pages Function | `/news-data/*` → R2 读取 |

### 服务器资源

| 资源 | 说明 |
|------|------|
| 服务器 IP | `43.153.118.218`（宝塔面板） |
| CMS 域名 | https://gaoyuan.zwstone.cn |
| 部署路径 | `/gaoyuan3/huagong-system/` |
| 新闻图片存储 | Docker 卷 `uploads_data` → `/app/uploads/news/` |

---

## 七、关键配置与文件索引

### 独立站

| 文件 | 作用 |
|------|------|
| `src/lib/news-api.ts` | 新闻读取逻辑；识别 `/news-data/images/` 路径 |
| `src/lib/consultation-api.ts` | 咨询表单提交到 CMS |
| `functions/news-data/[[path]].ts` | Pages Function：R2 → HTTP |
| `workers/news-sync/src/index.ts` | Webhook：接收 CMS 图片 + 写 R2 JSON |
| `scripts/sync-news-to-r2.mjs` | 手动全量同步（备用） |
| `scripts/prune-news-static-out.mjs` | 构建时清理静态 news-data |
| `wrangler.jsonc` | Pages 项目 + R2 绑定 `NEWS_BUCKET` |
| `next.config.ts` | `output: "export"` 静态导出 |

### 化工管理系统（houduan）

| 文件 | 作用 |
|------|------|
| `src/news/news-sync.service.ts` | 发布时读本地图片、调 Worker Webhook |
| `src/news/news.service.ts` | 发布/撤销/删除时触发同步 |
| `docker-compose.prod.yml` | `NEWS_SYNC_WEBHOOK_URL`、`NEWS_SYNC_SECRET` 环境变量 |

### npm 脚本速查

| 命令 | 作用 |
|------|------|
| `npm run dev` | 本地开发（端口 4000） |
| `npm run build` | 构建静态站点到 `out/` |
| `npm run sync:news` | 手动同步新闻到 R2 |
| `npm run sync:worker:deploy` | 部署同步 Worker |
| `npm run pages:deploy` | 手动部署 Pages |

---

## 八、验证与故障排查

### 快速验证

```powershell
# 1. 独立站是否在线
Invoke-RestMethod "https://huagongdulizhan.pages.dev/news-data/list.json"

# 2. CMS 源数据
Invoke-RestMethod "https://gaoyuan.zwstone.cn/api/news/public?limit=5"

# 3. 图片是否进 R2（coverImage 应为 /news-data/images/xxx.jpg）
# 浏览器打开：https://huagongdulizhan.pages.dev/news-data/images/文件名.jpg
```

### 常见问题

| 现象 | 可能原因 | 处理 |
|------|----------|------|
| 后台发了新闻，独立站没更新 | Webhook 失败 | 查 CMS 后端日志；手动 `npm run sync:news` |
| 新闻页空白 | R2 无数据 | 访问 `/news-data/list.json` 检查 |
| 封面仍指向 CMS 域名 | CMS 未部署图片推送版 | 重新部署 houduan，编辑并保存新闻 |
| git push 后新闻消失 | 静态 JSON 覆盖 R2 | 已修复：`prune-news-static-out` |
| 本地 sync 失败 | 网络连不上 CMS | 在服务器触发，或等网络恢复 |

---

## 九、相关文档索引

| 文档 | 内容 |
|------|------|
| **本文档** `PROJECT-SUMMARY.md` | 项目总览、进度、架构、流程 |
| `SITE-OVERVIEW.md` | 页面结构、组件、视觉设计细节 |
| `自动部署更新网站/新闻与部署流程说明.md` | 新闻 R2 同步、Webhook、故障排查（运维必读） |
| `自动部署更新网站/网站集成部署.MD` | 快速命令速查 |
| `CLOUDFLARE-DEPLOY-GUIDE.md` | Cloudflare 部署完整指南 |
| `CLOUDFLARE-GITHUB-SETUP.md` | Cloudflare ↔ GitHub 集成记录 |

---

## 十、总结

本项目已完成 **企业官网主体开发** 和 **Cloudflare 生产部署**，并建立了 **CMS → Worker → R2 → 独立站** 的新闻自动同步链路。日常运营只需记住两句话：

> **改网站代码 → `git push`，等 2–5 分钟。**  
> **发新闻 → CMS 后台点发布，等 5–30 秒刷新独立站。**

独立站代码已推送上线，当前唯一待完成的操作是：**重新部署化工管理系统后端**（含图片推送逻辑），之后新闻文字和图片将全部从独立站 CDN 加载，不再依赖 CMS 域名。

---

*文档维护：有架构或流程变更时，请同步更新本文档与 `自动部署更新网站/新闻与部署流程说明.md`。*
