# 高源化工独立站 — Cloudflare Pages Git 集成一键配置脚本
# 账号：yiyi.dd22@gmail.com（Cloudflare）/ yiyidd22-arch（GitHub）
# 用法：在 PowerShell 中执行  .\scripts\setup-cloudflare-github.ps1

$ErrorActionPreference = "Stop"

$GITHUB_OWNER = "yiyidd22-arch"
$GITHUB_REPO = "huagongdulizhan"
$CF_PROJECT = "gaoyuanhaugong"
$PRODUCTION_BRANCH = "master"

Write-Host "=== 1/5 检查 GitHub CLI 登录 ===" -ForegroundColor Cyan
$ghPath = Get-Command gh -ErrorAction SilentlyContinue
if (-not $ghPath) {
    throw "未找到 gh 命令。请先安装 GitHub CLI：winget install GitHub.cli"
}
gh auth status
if ($LASTEXITCODE -ne 0) {
    Write-Host "请先完成 GitHub 登录（浏览器授权）：" -ForegroundColor Yellow
    gh auth login --hostname github.com --git-protocol https --web
}

Write-Host "`n=== 2/5 创建 GitHub 仓库并推送代码 ===" -ForegroundColor Cyan
$repoExists = $false
try {
    gh repo view "$GITHUB_OWNER/$GITHUB_REPO" --json name | Out-Null
    $repoExists = $true
    Write-Host "仓库已存在：$GITHUB_OWNER/$GITHUB_REPO"
} catch {
    Write-Host "创建新仓库..."
    gh repo create "$GITHUB_REPO" --public --source . --remote origin --push
    if ($LASTEXITCODE -ne 0) { throw "创建仓库失败" }
    $repoExists = $true
}

if (-not (git remote get-url origin 2>$null)) {
    git remote add origin "https://github.com/$GITHUB_OWNER/$GITHUB_REPO.git"
}
git push -u origin $PRODUCTION_BRANCH
if ($LASTEXITCODE -ne 0) { throw "推送代码失败" }
Write-Host "代码已推送到 https://github.com/$GITHUB_OWNER/$GITHUB_REPO"

Write-Host "`n=== 3/5 检查 Cloudflare Wrangler 登录 ===" -ForegroundColor Cyan
wrangler whoami
if ($LASTEXITCODE -ne 0) {
    Write-Host "请先完成 Cloudflare 登录（使用 yiyi.dd22@gmail.com 谷歌账号）：" -ForegroundColor Yellow
    wrangler login
    wrangler whoami
}

$whoamiJson = wrangler whoami --json 2>$null
$accountId = $null
if ($whoamiJson) {
    $parsed = $whoamiJson | ConvertFrom-Json
    $accountId = $parsed.accounts[0].id
}
if (-not $accountId) {
    $whoamiText = wrangler whoami 2>&1 | Out-String
    if ($whoamiText -match '([a-f0-9]{32})') { $accountId = $Matches[1] }
}
if (-not $accountId) { throw "无法获取 Cloudflare Account ID，请检查 wrangler whoami 输出" }
Write-Host "Cloudflare Account ID: $accountId"

Write-Host "`n=== 4/5 创建 Cloudflare Pages Git 集成项目 ===" -ForegroundColor Cyan
Write-Host @"
请先在 Cloudflare Dashboard 完成 GitHub App 授权（仅首次）：
  1. 打开 https://dash.cloudflare.com/
  2. 使用 yiyi.dd22@gmail.com 登录
  3. Workers & Pages → Create application → Pages → Connect to Git
  4. 授权 GitHub，选择仓库 $GITHUB_OWNER/$GITHUB_REPO
  5. 构建配置：
       Build command:     npm run build
       Build output dir:  out
       Production branch: $PRODUCTION_BRANCH
       Framework preset:  None（或 Next.js Static HTML Export）
  6. 项目名：$CF_PROJECT
"@ -ForegroundColor Yellow

$existing = wrangler pages project list 2>&1 | Out-String
if ($existing -match $CF_PROJECT) {
    Write-Host "项目 $CF_PROJECT 已存在，跳过创建。" -ForegroundColor Green
} else {
    Write-Host "尝试通过 API 创建 Git 集成项目..." -ForegroundColor Gray
    $oauthToken = $env:CLOUDFLARE_API_TOKEN
    if (-not $oauthToken) {
        $configDir = Join-Path $env:USERPROFILE ".wrangler"
        $configFile = Get-ChildItem -Path $configDir -Filter "config/default.toml" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
        Write-Host "未设置 CLOUDFLARE_API_TOKEN。建议在 Dashboard 手动创建项目（见上方步骤）。" -ForegroundColor Yellow
    } else {
        $body = @{
            name = $CF_PROJECT
            production_branch = $PRODUCTION_BRANCH
            build_config = @{
                build_command = "npm run build"
                destination_dir = "out"
            }
            source = @{
                type = "github"
                config = @{
                    owner = $GITHUB_OWNER
                    repo_name = $GITHUB_REPO
                    production_branch = $PRODUCTION_BRANCH
                    deployments_enabled = $true
                    production_deployments_enabled = $true
                }
            }
        } | ConvertTo-Json -Depth 6

        $headers = @{
            Authorization = "Bearer $oauthToken"
            "Content-Type" = "application/json"
        }
        $uri = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects"
        try {
            $resp = Invoke-RestMethod -Method Post -Uri $uri -Headers $headers -Body $body
            if ($resp.success) {
                Write-Host "API 创建成功：$CF_PROJECT" -ForegroundColor Green
            } else {
                Write-Host "API 创建失败，请在 Dashboard 手动创建。错误：$($resp.errors | ConvertTo-Json)" -ForegroundColor Red
            }
        } catch {
            Write-Host "API 创建失败：$($_.Exception.Message)。请在 Dashboard 手动创建。" -ForegroundColor Red
        }
    }
}

Write-Host "`n=== 5/5 验证 ===" -ForegroundColor Cyan
wrangler pages project list
Write-Host "`n部署完成后访问：https://$CF_PROJECT.pages.dev" -ForegroundColor Green
Write-Host "新闻 API 地址：https://gaoyuan.zwstone.cn/api（页面加载时实时拉取，无需重新部署）" -ForegroundColor Green
