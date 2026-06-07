# 高源化工独立站 — 项目说明文档

## 一、项目概述

本项目为 **山东高密高源化工有限公司（GAOYUAN CHEMICAL）** 的企业官网，基于 Next.js 构建，支持中英文双语，静态导出部署。网站展示公司概况、产品、新闻动态及联系方式，面向国内外客户。

- **品牌**：银州牌（YINZHOU）亚氯酸钠
- **隶属**：孚日集团（SUNVIM Group）
- **技术栈**：Next.js 16 · React 19 · TypeScript · Tailwind CSS 4
- **本地开发**：`npm run dev`（端口 4000）
- **构建部署**：`npm run build`（静态导出 `output: export`）

---

## 二、页面结构

| 路由 | 说明 |
|------|------|
| `/` | 首页：全屏 Hero、数据统计、公司简介、产品展示、设备介绍、出口市场、荣誉资质、行动号召 |
| `/about` | 关于我们：企业简介、发展历程（横向拖动）、企业文化（小卡片横向拖动）、生产设备、市场展望、荣誉资质 |
| `/products` | 产品总览：正方形融合图片 + 深色玻璃卡片 |
| `/products/sodium-chlorite` | 亚氯酸钠详情 |
| `/products/sodium-chlorate` | 氯酸钠详情 |
| `/news` | 新闻列表（对接后台 API 动态加载） |
| `/news/detail?id=xxx` | 新闻详情 |
| `/contact` | 联系我们：地址、电话、邮箱、留言表单 |

---

## 三、核心功能

### 3.1 中英文双语

- 支持 **English / 中文** 切换
- 语言偏好保存在 `localStorage`（键名 `gaoyuan-locale`）
- 文案集中在 `src/lib/i18n/translations.ts` 管理

### 3.2 新闻中心 API

- 新闻数据从后台管理系统 API 拉取
- 生产环境：`https://gaoyuan.zwstone.cn/api`
- 本地开发：通过 Next.js 代理 `/backend-api` → 本地管理系统
- 相关文件：`src/lib/news-api.ts`

### 3.3 导航栏（Header）

- **顶部未滚动**：透明导航，白色文字，浮于 Hero / Banner 图片之上
- **向下滚动后**：变为居中浮动的 **深色圆角胶囊导航**（`#0c1526` 半透明 + 青色边框 + 毛玻璃），与全站深色主题一致
- 含 Logo、五个主导航、语言切换器
- 移动端：深色玻璃下拉菜单

### 3.4 全站视觉设计（深色科技主题）

全站统一采用 **深蓝黑底 + 青色荧光** 配色，避免白/蓝块状布局带来的视觉反差。

#### 配色体系

| 元素 | 色值 / 样式 |
|------|------------|
| 主背景 | `#070d18` |
| 区块背景 | `#0c1526` 渐变 |
| 主色 | `#0ea5e9`（天蓝） |
| 荧光点缀 | `#22d3ee`（青） |
| 正文 | `#cbd5e1` / `#94a3b8` |

#### 图片与背景融合

- 所有 Banner 及内容图片采用 **柔和渐变遮罩**（`.image-blend` / `BlendedImage` 组件）
- 图片透明度约 82%，底部与四周暗角渐变融入 `#070d18` 背景
- 去除白色边框与强阴影，改用 `border-cyan-500/10` 细线边框
- 内页 Banner 底部 32px 渐变过渡，与页面背景无缝衔接

#### 通用样式类

| 类名 | 用途 |
|------|------|
| `.tech-grid` | 科技网格纹理 |
| `.glass-panel` | 玻璃拟态面板 |
| `.tech-glow-line` | 区块标题发光分隔线 |
| `.text-gradient-tech` | 渐变数字/标题 |
| `.image-blend` | 图片柔和融合 |
| `.page-section` | 标准深色区块 |
| `.page-section-alt` | 交替深色渐变区块 |
| `.info-card` | 产品参数信息卡片 |

### 3.5 首页

- **Hero 区**：全屏工厂入口图，底部渐变融入深色背景
- **数据统计**：玻璃拟态卡片 + 渐变数字
- **产品展示**：正方形图片，玻璃卡片，悬停轻微放大（无圆形缩小效果）
- **设备 / 荣誉 / 市场**：深色背景 + 融合图片 + 青色标签

### 3.6 关于我们

- 全页深色主题，与首页风格统一
- **企业简介**：文字与右侧配图 **等高对齐**（上下顶齐，无留白）
- **发展历程**：横向惯性滑动
- **企业文化**：四个卡片一行四列
- **生产设备**：纯文字左对齐，与「前景展望」区块对齐，无配图
- 荣誉资质：玻璃卡片，无白色底框

### 3.7 产品展示

- 去除白色内容框，改用 `.glass-panel` 深色玻璃卡片
- 产品图为 **正方形**，带柔和暗角渐变
- 产品详情页参数块使用 `.info-card`，表格/CTA 均为深色风格
- **亚氯酸钠详情页**（`/products/sodium-chlorite`）：含产品性质、用途、包装标志、储运注意事项、毒性防护及三列技术指标表（固体Ⅰ型 / 固体Ⅱ型 / 液体）；展示国内包装与出口包装两张产品实拍图
- 亚氯酸钠列表/首页展示图：`sodium-chlorite-domestic.png`（粉状亚氯酸钠国内包装）

### 3.8 新闻中心 & 联系我们

- Banner 与内容区统一深色融合
- 新闻列表/详情：玻璃卡片，封面图带渐变遮罩
- 联系表单：深色玻璃面板，输入框半透明边框

### 3.9 鼠标荧光效果

- 桌面端显示 **跟随鼠标的蓝色荧光圆点**（三层光晕 + 平滑缓动）
- 组件：`src/components/CursorGlow.tsx`

### 3.10 页脚（Footer）

- 四栏布局：公司简介、快速链接、联系方式、邮箱与网站
- 含国际/国内电话、传真、地址等完整信息

---

## 四、主要文件结构

```
src/
├── app/
│   ├── page.tsx                    # 首页
│   ├── layout.tsx                  # 根布局
│   ├── globals.css                 # 全局样式与设计变量
│   ├── about/page.tsx              # 关于我们
│   ├── products/                   # 产品页及详情
│   ├── news/                       # 新闻列表与详情
│   └── contact/page.tsx            # 联系我们
├── components/
│   ├── Header.tsx                  # 顶部导航（胶囊滚动效果）
│   ├── Footer.tsx                  # 页脚
│   ├── PageBanner.tsx              # 内页 Banner（柔和渐变融合）
│   ├── ProductCard.tsx             # 首页产品卡片（正方形图片）
│   ├── BlendedImage.tsx            # 融合式图片组件
│   ├── SmoothHorizontalScroll.tsx  # 发展历程惯性横向滚动
│   ├── SectionTitle.tsx            # 区块标题
│   ├── CursorGlow.tsx              # 鼠标荧光效果
│   ├── LanguageSwitcher.tsx        # 语言切换
│   └── Providers.tsx               # 全局 Provider
├── contexts/
│   └── LanguageContext.tsx         # 语言上下文
└── lib/
    ├── data.ts                     # 公司静态数据
    ├── news-api.ts                 # 新闻 API
    └── i18n/translations.ts        # 多语言文案
```

---

## 五、公司静态数据

`src/lib/data.ts` 中包含：

- 公司名称、地址、邮箱、网站
- 国际 / 国内电话、传真
- 企业统计数据（1992 成立、60000㎡ 厂区、80000 吨液体年产量、40+ 出口国）
- Products：亚氯酸钠（NaClO₂）、氯酸钠（NaClO₃）
- 发展历程、企业文化、资质证书等

---

## 六、图片资源

位于 `public/images/`：

- `factory-entrance.png` — 首页 Hero / 内页 Banner
- `factory-building.png` — 厂区建筑
- `sodium-chlorite-domestic.png` — 亚氯酸钠（国内包装，首页/产品列表展示图）
- `sodium-chlorite-export.png` — 亚氯酸钠（出口包装，详情页展示）
- `warehouse-drums.png` — 仓库桶装（其他用途）
- `liquid-storage.png` — 氯酸钠 / 液体储罐
- `equipment-pumps.png`、`production-line.png` — 设备展示
- 各类证书扫描图

---

## 七、部署说明

- 项目配置为 **静态站点导出**（`next.config.ts` → `output: "export"`）
- 图片使用 `unoptimized: true`（适配静态托管）
- 开发端口：**4000**

### 7.1 部署架构（2026-06-06 更新）

| 组件 | 说明 |
|------|------|
| **托管平台** | Cloudflare Pages（账号：`yiyi.dd22@gmail.com`） |
| **部署方式** | **Git 集成**：代码推送到 GitHub 后 Cloudflare 自动构建部署 |
| **GitHub 仓库** | `yiyidd22-arch/huagongdulizhan` |
| **生产地址** | `https://gaoyuanhaugong.pages.dev` |
| **构建命令** | `npm run build` → 输出目录 `out/` |
| **生产分支** | `master` |

### 7.2 新闻与部署的关系

- **网站代码更新**（页面、样式、文案）：`git push` → Cloudflare 自动重新构建上线
- **新闻内容更新**（后台发布）：**无需重新部署**。新闻页在浏览器中实时请求 `https://gaoyuan.zwstone.cn/api`，发布后即可在独立站看到

### 7.3 相关文档与脚本

| 文件 | 说明 |
|------|------|
| `CLOUDFLARE-DEPLOY-GUIDE.md` | Cloudflare 部署完整指南 |
| `CLOUDFLARE-GITHUB-SETUP.md` | Cloudflare ↔ GitHub 集成过程记录 |
| `scripts/setup-cloudflare-github.ps1` | 授权后一键配置脚本 |
| `wrangler.jsonc` | Pages 构建输出目录配置 |

---

## 八、交互组件说明

### SmoothHorizontalScroll（惯性横向滚动）

- 仅用于关于页「发展历程」
- 支持鼠标拖动 + **松手惯性滑动**（类似页面上下滚动的顺滑感）
- 滚轮可横向滚动，无 snap 吸附跳转
- 无提示文字，无边缘拖动提示

### BlendedImage（融合图片）

- 自动添加透明度 + 底部/顶部暗角渐变
- 与 `#070d18` 背景自然过渡，消除图片与背景的硬反差

### ProductCard（产品卡片）

- 正方形图片区域（`aspect-square`）
- 悬停时图片轻微放大，无圆形变形
- 玻璃拟态卡片容器

---

## 九、后续可扩展方向

- 联系表单对接真实后端
- SEO 结构化数据与多语言 meta 优化
- 新闻分页与搜索
- 图片懒加载与 WebP 优化

---

*文档更新日期：2026-06-07*
