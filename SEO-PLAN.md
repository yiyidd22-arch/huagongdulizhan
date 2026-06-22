# 高源化工独立站 — SEO 搜索引擎优化计划

> 文档日期：2026-06-08  
> 站点：https://huagongdulizhan.pages.dev（未来建议绑定 `www.gaoyuandh.com`）  
> 类型：B2B 化工出口企业官网（亚氯酸钠 / 氯酸钠）

---

## 一、现状评估

### 已有基础 ✅

| 项目 | 现状 |
|------|------|
| 根页面 meta | `layout.tsx` 有 title、description、keywords（英文） |
| 页面结构 | 8 个清晰路由，Header/Footer 内链完整 |
| 内容质量 | 产品技术指标、企业资质、发展历程等真实内容 |
| 图片 alt | 大部分图片有 alt 文字 |
| 移动端 | 响应式布局，手机可正常浏览 |
| 访问速度 | Cloudflare CDN，全球加载较快 |
| 新闻内容 | 可持续更新（CMS → R2 同步） |

### 主要缺口 ❌

| 项目 | 问题 | 对 SEO 的影响 |
|------|------|---------------|
| **无 sitemap.xml** | 搜索引擎不知道有哪些页面 | 收录慢、可能漏掉页面 |
| **无 robots.txt** | 未明确告知爬虫规则 | 无法控制抓取行为 |
| **各页无独立 meta** | 关于/产品/新闻/联系共用根 title | 搜索结果展示不精准，点击率低 |
| **无 Open Graph** | 微信/LinkedIn 分享无预览图和摘要 | 社交传播效果差 |
| **无结构化数据** | 搜索引擎不理解「这是公司/产品」 | 无法出现富摘要（评分、地址等） |
| **新闻详情 URL** | `/news/detail?id=xxx`（查询参数） | 搜索引擎偏好独立 URL，不利于单篇新闻排名 |
| **新闻页客户端渲染** | `"use client"` + `useEffect` 拉数据 | 爬虫可能看不到新闻正文 |
| **双语 SEO** | `lang` 靠 JS 切换，默认 `en` | 中文搜索可能匹配不准 |
| **临时域名** | 使用 `pages.dev` 子域 | 品牌信任度低，不利于长期排名 |
| **未接入站长工具** | 无 Google Search Console / 百度站长 | 无法监控收录和关键词表现 |

---

## 二、目标关键词（优先布局）

### 英文（主攻 Google，面向海外采购商）

| 优先级 | 关键词 | 目标页面 |
|--------|--------|----------|
| P0 | sodium chlorite manufacturer | 首页、亚氯酸钠详情 |
| P0 | sodium chlorite exporter China | 首页、关于我们 |
| P0 | sodium chlorite supplier | 亚氯酸钠详情、联系页 |
| P1 | sodium chlorate manufacturer | 氯酸钠详情 |
| P1 | Yinzhou sodium chlorite | 首页、产品页 |
| P1 | Gaoyuan Chemical | 全站品牌词 |
| P2 | HG3250-2010 sodium chlorite | 亚氯酸钠详情（技术标准词） |
| P2 | industrial chemical exporter Shandong | 关于我们 |

### 中文（主攻百度，面向国内客户）

| 优先级 | 关键词 | 目标页面 |
|--------|--------|----------|
| P0 | 亚氯酸钠生产厂家 | 首页、亚氯酸钠详情 |
| P0 | 亚氯酸钠出口 | 首页、关于我们 |
| P1 | 氯酸钠厂家 | 氯酸钠详情 |
| P1 | 高源化工 | 全站品牌词 |
| P1 | 高密化工 | 关于我们、联系页 |
| P2 | 银州牌亚氯酸钠 | 产品页 |

---

## 三、分阶段执行计划

### 第一阶段：技术基础（1–2 天，优先做）

**目标：** 让搜索引擎能发现、能读懂、能收录所有页面。

| 序号 | 任务 | 具体做法 | 涉及文件 |
|------|------|----------|----------|
| 1.1 | 生成 `sitemap.xml` | 列出所有静态页 + 新闻详情页 URL；构建时或同步新闻后更新 | `public/sitemap.xml` 或 `scripts/generate-sitemap.mjs` |
| 1.2 | 添加 `robots.txt` | 允许全站抓取，指向 sitemap | `public/robots.txt` |
| 1.3 | 各页独立 metadata | 为 about、products、contact、产品详情页分别设置 title / description | 各 `page.tsx` 导出 `metadata` |
| 1.4 | 添加 canonical URL | 每页声明规范链接，避免重复内容 | metadata 中加 `alternates.canonical` |
| 1.5 | Open Graph 标签 | 加 `og:title`、`og:description`、`og:image`（用工厂入口图） | `layout.tsx` + 各页 metadata |
| 1.6 | 绑定自定义域名 | `www.gaoyuandh.com` → Cloudflare Pages | Cloudflare 控制台 DNS |

**验收标准：**
- 访问 `https://域名/sitemap.xml` 和 `/robots.txt` 返回 200
- 用 [Google Rich Results Test](https://search.google.com/test/rich-results) 检查首页 meta

---

### 第二阶段：结构化数据（1 天）

**目标：** 在搜索结果中展示更丰富的信息（公司名称、地址、产品等）。

| 序号 | 任务 | JSON-LD 类型 | 放在哪 |
|------|------|-------------|--------|
| 2.1 | 组织信息 | `Organization` | 全站 layout |
| 2.2 | 本地企业 | `LocalBusiness` | 联系页、关于页 |
| 2.3 | 产品信息 | `Product` | 亚氯酸钠、氯酸钠详情页 |
| 2.4 | 新闻文章 | `NewsArticle` | 每条新闻详情页 |
| 2.5 | 面包屑导航 | `BreadcrumbList` | 产品详情、新闻详情 |

**示例（Organization，放 layout）：**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Shandong Gaomi Gaoyuan Chemical Industry Co., Ltd.",
  "alternateName": "山东高密高源化工有限公司",
  "url": "https://www.gaoyuandh.com",
  "logo": "https://www.gaoyuandh.com/images/factory-entrance.png",
  "email": "wsr@gaoyuandh.com",
  "telephone": "+86-536-2122551",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No. 2066 Xianghe Street (West)",
    "addressLocality": "Gaomi",
    "addressRegion": "Shandong",
    "addressCountry": "CN"
  }
}
```

**验收标准：** Google Rich Results Test 无报错，识别出 Organization / Product。

---

### 第三阶段：新闻 SEO 改造（2–3 天，重要）

**目标：** 让每条新闻都能被单独收录、单独排名。

**当前问题：**

```
/news/detail?id=3163d91f-0520-46eb-be95-58649491c475   ← 不利于 SEO
```

**改为：**

```
/news/3163d91f-0520-46eb-be95-58649491c475            ← 独立 URL
或
/news/iso9001-quality-recertification-completed         ← 带 slug 更好（可选）
```

| 序号 | 任务 | 说明 |
|------|------|------|
| 3.1 | 新闻详情改为静态路由 | `src/app/news/[id]/page.tsx`，构建时从 R2/CMS 生成 |
| 3.2 | 构建时预渲染新闻页 | `generateStaticParams` 读取已发布新闻 ID 列表 |
| 3.3 | 每篇新闻独立 meta | title = 新闻标题，description = 摘要，og:image = 封面 |
| 3.4 | 同步后触发重建（可选） | 发新闻 → Webhook → 触发 Pages 重建，或 ISR/按需生成 |
| 3.5 | sitemap 包含新闻 URL | 同步脚本生成新闻条目 |

**注意：** 项目使用 `output: "export"` 静态导出。新闻页需在 `npm run build` 时预生成，或改为 Cloudflare 按需渲染。短期方案：每次发新闻后 `git push` 触发重建（配合 sync 脚本写入新闻路由数据）。

**验收标准：** 查看网页源代码能看到新闻标题和正文（不依赖 JS）。

---

### 第四阶段：内容与页面优化（持续）

**目标：** 提升关键词相关性和用户停留时间。

| 序号 | 任务 | 具体建议 |
|------|------|----------|
| 4.1 | 首页 H1 优化 | 确保 H1 含核心词：「China's Largest Sodium Chlorite Manufacturer」 |
| 4.2 | 产品页长尾词 | 亚氯酸钠页加：用途、包装规格、出口国家、CAS 号等 |
| 4.3 | 图片 alt 补全 | 所有 `<img>` 加描述性 alt（含产品名，避免「图片1」） |
| 4.4 | 内链建设 | 首页 → 产品详情；产品页 → 联系询盘；新闻 → 相关产品 |
| 4.5 | 新闻内容策略 | 每月发 2–4 篇：行业动态、认证更新、出口案例（CMS 后台） |
| 4.6 | 联系页 NAP 一致 | Name / Address / Phone 与 `data.ts`、名片、工商信息完全一致 |
| 4.7 | 添加 FAQ 区块（可选） | 产品页加「常见问题」：MOQ、交货期、认证、包装方式 |

---

### 第五阶段：双语与国际化 SEO（1–2 天）

**目标：** 中英文搜索都能准确匹配。

| 序号 | 任务 | 做法 |
|------|------|------|
| 5.1 | hreflang 标签 | 声明英文版 `en`、中文版 `zh-CN`（可用同 URL + JS 切换，或分 `/en/` `/zh/` 路径） |
| 5.2 | 中文 meta | 根 layout 或各页增加 `description` 中文备选（可用 `metadata` 多语言） |
| 5.3 | html lang | 服务端根据路径或默认设置，不纯靠客户端 JS |

**进阶方案（效果更好）：** 拆分为 `/en/about` 和 `/zh/about` 两套路由，各配独立 meta——工作量大，但 SEO 效果最好。

---

### 第六阶段：站长工具与站外（上线后持续）

**目标：** 监控效果，持续获取流量。

| 序号 | 任务 | 操作 |
|------|------|------|
| 6.1 | Google Search Console | 添加 `www.gaoyuandh.com`，提交 sitemap，监控收录 |
| 6.2 | Bing Webmaster Tools | 同步提交（Bing 抓取成本低，外贸也有价值） |
| 6.3 | 百度站长平台 | 添加站点，提交 sitemap（国内客户） |
| 6.4 | Google Business Profile | 如有实体办公，创建企业档案 |
| 6.5 | 外链建设 | 孚日集团官网、行业协会、B2B 平台（阿里巴巴国际站等）加官网链接 |
| 6.6 | 社媒链接 | LinkedIn 公司页、企业微信等指向官网 |
| 6.7 | 定期复盘 | 每季度看 Search Console：哪些词有展示、哪些页收录了 |

---

## 四、优先级与时间表

```
第 1 周（必做）
├── robots.txt + sitemap.xml
├── 各页独立 metadata + Open Graph
├── 绑定自定义域名 www.gaoyuandh.com
└── 接入 Google Search Console + 提交 sitemap

第 2 周（重要）
├── JSON-LD 结构化数据（Organization + Product）
├── 新闻 URL 改造（/news/[id]）
└── 图片 alt 全面检查

第 3–4 周（优化）
├── 新闻页服务端/构建时预渲染
├── 内容补充（产品 FAQ、新闻发稿）
└── 百度站长 + Bing 提交

持续进行
├── 每月发新闻（CMS 后台）
├── 监控 Search Console 关键词
└── 外链与行业目录收录
```

---

## 五、与本项目架构的配合

| 现有能力 | SEO 如何利用 |
|----------|-------------|
| CMS 发新闻 | 持续产出原创内容，是 SEO 最重要的燃料 |
| R2 新闻同步 | sitemap 生成脚本可读 `list.json` 获取全部新闻 URL |
| Cloudflare CDN | 页面速度快 → Core Web Vitals 得分高 → 排名加分 |
| 中英文双语 | 覆盖国内 + 海外两个搜索市场 |
| 静态导出 | 新闻 SEO 需额外处理：构建时预生成新闻页，或改用 SSR |

**新闻 SEO 与现有流程的关系：**

```
方案 A（简单，短期）
  发新闻 → R2 同步 → 手动/定时 git push 触发 rebuild → 静态新闻页更新

方案 B（理想，长期）
  发新闻 → R2 同步 → Webhook 触发 Pages 重建（仅新闻路由）
  或改为 /news/[id] 由 Pages Function + 模板动态渲染
```

---

## 六、效果预期（务实估计）

| 阶段 | 时间 | 预期效果 |
|------|------|----------|
| 做完第一阶段 | 1–2 周后 | 主要页面被 Google 收录 |
| 做完前三阶段 | 1–2 月后 | 品牌词「Gaoyuan Chemical」「高源化工」搜索能排前列 |
| 持续发新闻 + 外链 | 3–6 月后 | 产品词如「sodium chlorite manufacturer」进入前 3 页 |
| 竞争词前排 | 6–12 月+ | 需要持续内容 + 外链，B2B 化工词竞争中等 |

> SEO 不是一次性工程，是持续运营。新闻发布是你已有的优势——保持每月更新比任何技术优化都有效。

---

## 七、快速检查清单

上线 SEO 基础后，用以下清单自检：

- [ ] `https://www.gaoyuandh.com/robots.txt` 可访问
- [ ] `https://www.gaoyuandh.com/sitemap.xml` 包含所有页面和新闻
- [ ] 每个页面「查看源代码」能看到唯一 `<title>` 和 `<meta description>`
- [ ] 首页有 Organization JSON-LD
- [ ] 产品页有 Product JSON-LD
- [ ] 新闻详情是独立 URL（非 `?id=`）
- [ ] Google Search Console 显示「已编入索引」
- [ ] 搜索 `Gaoyuan Chemical` 或 `高源化工` 能找到官网

---

## 八、建议先从哪开始

如果只做三件事，按这个顺序：

1. **绑定 `www.gaoyuandh.com` 自定义域名** — 品牌信任是基础
2. **加 sitemap.xml + robots.txt + 各页 meta** — 半天可完成，立刻帮助收录
3. **接入 Google Search Console 并提交 sitemap** — 开始能看到数据

需要我按这个计划动手实现第一阶段（sitemap、robots、各页 meta）时，直接说一声即可。

---

*关联文档：`PROJECT-SUMMARY.md`（项目总览）、`SITE-OVERVIEW.md`（页面结构）*
