# Cloudflare 与 GitHub 集成部署 — 操作过程记录

> **执行日期**：2026-06-06  
> **目标**：将高源化工独立站从旧 QQ 邮箱 Cloudflare 账号的「直传部署」，迁移到新谷歌账号的「Git 集成自动部署」。  
> **新账号**：`yiyi.dd22@gmail.com`（Cloudflare）/ GitHub `yiyidd22-arch`

---

## 一、背景与目标

| 项目 | 旧方案 | 新方案 |
|------|--------|--------|
| Cloudflare 账号 | `1712657052@qq.com` | `yiyi.dd22@gmail.com` |
| 部署方式 | Wrangler 直传 `out/` | **Git 集成**：`git push` 自动构建部署 |
| 项目名 | `gaoyuanhaugong` | `gaoyuanhaugong`（新账号下重建） |
| 新闻数据来源 | `https://gaoyuan.zwstone.cn/api` | 不变，浏览器实时拉取 |

### 新闻「即时接收」说明

新闻页**不需要**每次发新闻都重新部署网站。`src/lib/news-api.ts` 在浏览器端每次打开页面时，向 `https://gaoyuan.zwstone.cn/api` 发起请求（`cache: "no-store"`），因此：

- 在 `gaoyuan.zwstone.cn` 后台发布新闻 → 用户刷新独立站新闻页即可看到最新内容
- Git 集成部署解决的是**网站代码/样式**更新后自动上线，与新闻 API 是两条独立链路

---

## 二、本次已完成的代码与配置变更

### 2.1 新增文件

| 文件 | 作用 |
|------|------|
| `wrangler.jsonc` | Cloudflare Pages 构建输出目录 `out`，供 Git 集成识别 |
| `.node-version` / `.nvmrc` | 指定 Node.js 22，与 Cloudflare 构建环境一致 |
| `scripts/setup-cloudflare-github.ps1` | 授权完成后的一键配置脚本 |
| `CLOUDFLARE-GITHUB-SETUP.md` | 本文档（操作过程记录） |

### 2.2 修改文件

| 文件 | 变更 |
|------|------|
| `package.json` | 添加 `engines.node >= 20`；添加 `wrangler` 开发依赖 |
| `.github/workflows/deploy-pages.yml` | 改为仅 `workflow_dispatch` 触发的备用方案（主路径为 Cloudflare 原生 Git 集成） |
| 全站源码与文档 | 提交至 Git commit `750f7d3` |

### 2.3 构建验证

本地执行 `npm run build` 已成功，生成 11 个静态页面，输出目录 `out/`。

---

## 三、操作过程（按时间顺序）

### 步骤 1：阅读项目文档

- 阅读 `SITE-OVERVIEW.md`：确认站点为 Next.js 16 静态导出，新闻 API 指向 `gaoyuan.zwstone.cn`
- 阅读 `CLOUDFLARE-DEPLOY-GUIDE.md`：确认旧方案为 QQ 账号 Wrangler 直传

### 步骤 2：检查现有环境

```text
wrangler whoami  →  旧账号 1712657052@qq.com（Account ID: 2c43c7dcb62ade5f6f6212ee783cb371）
git remote -v    →  无远程仓库（仅本地 master 分支）
gh               →  未安装 → 已通过 winget 安装 GitHub CLI 2.93.0
```

### 步骤 3：准备 Git 集成配置

1. 创建 `wrangler.jsonc`，声明 `pages_build_output_dir: "./out"`
2. 添加 Node 版本文件（`.node-version`、`.nvmrc`）
3. 安装 `wrangler` 为项目开发依赖：`npm install -D wrangler@latest`
4. 将旧 GitHub Actions 工作流改为备用（避免与 Cloudflare 原生 Git 集成重复构建）

### 步骤 4：提交代码

```powershell
cd d:\huagongdulizhan
git add -A
git commit -m "Add site features, news API, and Cloudflare Pages Git integration config."
# 结果：commit 750f7d3，29 files changed
```

### 步骤 5：登出旧 Cloudflare 账号

```powershell
wrangler logout
# 成功登出 1712657052@qq.com
```

### 步骤 6：尝试新账号授权（需浏览器配合）

以下操作需要您在浏览器中**手动完成 OAuth 授权**（约 2 分钟内点击确认）：

| 操作 | 命令 | 状态 |
|------|------|------|
| Cloudflare 登录 | `wrangler login` | ⏳ 等待浏览器授权（多次超时，需重试） |
| GitHub 登录 | `gh auth login --web` | ⏳ TLS 超时，需重试 |
| Cloudflare MCP | MCP `mcp_auth` | ⏳ 认证超时 |

**wrangler login 时请在浏览器中：**

1. 使用 **yiyi.dd22@gmail.com** 谷歌账号登录 Cloudflare
2. 点击 **Allow** 授权 Wrangler

### 步骤 7：推送代码到 GitHub（待授权后执行）

GitHub 仓库 `yiyidd22-arch/huagongdulizhan` 当前**不存在**（API 返回 404）。

授权完成后执行：

```powershell
# 方式 A：使用一键脚本（推荐）
.\scripts\setup-cloudflare-github.ps1

# 方式 B：手动执行
gh auth login --hostname github.com --git-protocol https --web
gh repo create huagongdulizhan --public --source . --remote origin --push
# 或若仓库已存在：
git remote add origin https://github.com/yiyidd22-arch/huagongdulizhan.git
git push -u origin master
```

### 步骤 8：在 Cloudflare 创建 Git 集成项目（待授权后执行）

**推荐：Dashboard 可视化操作（首次必须授权 GitHub App）**

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/)，用 **yiyi.dd22@gmail.com** 登录
2. 左侧 **Workers & Pages** → **Create application** → **Pages**
3. 选择 **Connect to Git**（不要选 Upload assets）
4. 点击 **Connect GitHub**，安装 Cloudflare Pages GitHub App
   - 授权组织/账号：`yiyidd22-arch`
   - 仓库访问：选择 `huagongdulizhan`（或 All repositories）
5. 选择仓库 `yiyidd22-arch/huagongdulizhan`
6. 构建配置：

| 配置项 | 值 |
|--------|-----|
| Project name | `gaoyuanhaugong` |
| Production branch | `master` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/`（默认） |

7. 点击 **Save and Deploy**，等待首次构建完成
8. 访问 **https://gaoyuanhaugong.pages.dev** 验证

**可选：API 创建（需先完成 Dashboard GitHub App 授权）**

```powershell
# 需先设置 API Token（Dashboard → My Profile → API Tokens → Create Token）
# 权限：Account - Cloudflare Pages - Edit
$env:CLOUDFLARE_API_TOKEN = "你的Token"

wrangler whoami   # 确认已是 yiyi.dd22@gmail.com 账号

# 然后运行脚本或 curl：
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/pages/projects" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "gaoyuanhaugong",
    "production_branch": "master",
    "build_config": {
      "build_command": "npm run build",
      "destination_dir": "out"
    },
    "source": {
      "type": "github",
      "config": {
        "owner": "yiyidd22-arch",
        "repo_name": "huagongdulizhan",
        "production_branch": "master",
        "deployments_enabled": true,
        "production_deployments_enabled": true
      }
    }
  }'
```

---

## 四、部署后的工作流

### 4.1 更新网站代码（样式、页面、文案等）

```text
本地修改代码 → git add & commit → git push origin master
    → Cloudflare 自动拉取 → npm run build → 部署到 gaoyuanhaugong.pages.dev
```

通常 2–5 分钟完成。可在 Dashboard → **Deployments** 查看构建日志。

### 4.2 发布新闻（后台管理系统）

```text
登录 https://gaoyuan.zwstone.cn/ 后台 → 发布新闻
    → 用户访问独立站 /news → 浏览器请求 gaoyuan.zwstone.cn/api/news/public
    → 立即显示最新新闻（无需 git push 或重新部署）
```

### 4.3 验证新闻 API

浏览器或命令行测试：

```powershell
Invoke-RestMethod "https://gaoyuan.zwstone.cn/api/news/public?limit=5"
```

独立站新闻页打开后，开发者工具 Network 中应看到对 `gaoyuan.zwstone.cn/api` 的请求。

---

## 五、新旧账号对照

| 项目 | 旧账号（QQ） | 新账号（Gmail） |
|------|-------------|----------------|
| 邮箱 | 1712657052@qq.com | yiyi.dd22@gmail.com |
| Account ID | 2c43c7dcb62ade5f6f6212ee783cb371 | 授权后 `wrangler whoami` 查看 |
| 部署类型 | Direct Upload（直传） | Git Integration（Git 集成） |
| 域名 | gaoyuanhaugong.pages.dev（旧账号） | gaoyuanhaugong.pages.dev（新账号，需重新创建） |
| 是否保留旧站 | 可保留作备份，或停用 | 作为主站 |

> 两个 Cloudflare 账号下的 `gaoyuanhaugong.pages.dev` 互不影响。确认新站正常后，可停用旧账号项目。

---

## 六、执行进度（2026-06-06 全部完成）

| 步骤 | 状态 | 说明 |
|------|------|------|
| Cloudflare 登录 | ✅ 完成 | `yiyi.dd22@gmail.com`，Account ID: `e0e23fd4fbf15a772917cdf9489e6c83` |
| GitHub 代码推送 | ✅ 完成 | 仓库 https://github.com/yiyidd22-arch/huagongdulizhan ，分支 `master` |
| GitHub App 授权 | ✅ 完成 | Cloudflare 已连接 GitHub |
| Git 集成项目创建 | ✅ 完成 | 项目名 `huagongdulizhan`，Git Provider = Yes |
| 删除旧直传项目 | ✅ 完成 | 已删除 `gaoyuanhaugong`（原 `gaoyuanhaugong-332.pages.dev`） |
| 首次 Git 构建部署 | ✅ 完成 | 生产分支 `master`，commit `c0408c8` |

### 当前生产地址

- **主站（Git 自动部署）**：https://huagongdulizhan.pages.dev
- **GitHub 仓库**：https://github.com/yiyidd22-arch/huagongdulizhan

以后更新网站：本地改代码 → `git push origin master` → Cloudflare 自动构建部署（约 2–5 分钟）。

---

## 七、如何删除直传项目（参考，已完成）

若以后需要删除某个 Pages 项目，有两种方式：

**方式 A — 命令行（推荐）**

```powershell
wrangler pages project delete 项目名 --yes
```

**方式 B — Cloudflare 控制台**

1. 打开 https://dash.cloudflare.com/ → **Workers & Pages**
2. 点击要删除的项目（如 `gaoyuanhaugong`）
3. 顶部或左侧进入 **Settings**（设置）
4. 滚动到页面最底部 **Delete Project**（删除项目）
5. 输入项目名确认 → 点击 **Delete**

> 直传项目（Git Provider = No）无法用 Git 集成，只能删除后重建。

---

## 七、故障排查

| 问题 | 原因 | 解决 |
|------|------|------|
| `wrangler login` 超时 | 浏览器未在 2 分钟内点 Allow | 重新执行，立即完成浏览器授权 |
| `git push` 卡住 | GitHub 未登录 | 先 `gh auth login --web` |
| 构建失败 `npm ci` | 无 lock 文件或 Node 版本不对 | 确认有 `package-lock.json`，Node 22 |
| 构建成功但 404 | output 目录错误 | 确认为 `out`，不是 `.next` |
| 新闻页空白 | API 跨域或后台未发布 | 检查 `gaoyuan.zwstone.cn/api/news/public` 是否返回数据 |
| Dashboard 无 Git 选项 | 项目原是直传类型 | 删除项目，用 Connect to Git 重建 |

---

## 八、相关文件索引

| 文件 | 说明 |
|------|------|
| `SITE-OVERVIEW.md` | 站点功能与结构说明（已更新部署章节） |
| `CLOUDFLARE-DEPLOY-GUIDE.md` | Cloudflare 部署完整指南（已更新 Git 集成为主方案） |
| `CLOUDFLARE-GITHUB-SETUP.md` | 本文档：GitHub ↔ Cloudflare 连接过程记录 |
| `scripts/setup-cloudflare-github.ps1` | 授权后一键配置脚本 |
| `wrangler.jsonc` | Pages 构建输出配置 |
| `src/lib/news-api.ts` | 新闻 API 客户端（运行时拉取） |

---

*文档版本：2026-06-06 · 操作人：Cursor Agent · 待浏览器 OAuth 完成后执行步骤 7–8*
