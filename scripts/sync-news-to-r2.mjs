/**
 * 从化工管理系统 API 拉取已发布新闻，写入 public/news-data/（本地开发）
 * 并上传到 Cloudflare R2（生产环境 Pages Function 读取）。
 *
 * 用法: npm run sync:news
 * 环境变量:
 *   NEWS_CMS_API  — 默认 https://gaoyuan.zwstone.cn/api
 *   R2_BUCKET     — 默认 gaoyuan-news
 *   SKIP_R2=1     — 只写本地 public/news-data，不上传 R2
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const CMS_API = (process.env.NEWS_CMS_API || "https://gaoyuan.zwstone.cn/api").replace(
  /\/$/,
  "",
);
const BUCKET = process.env.R2_BUCKET || "gaoyuan-news";
const SKIP_R2 = process.env.SKIP_R2 === "1";
const PAGE_SIZE = 20;
const CMS_ORIGIN = CMS_API.replace(/\/api\/?$/, "");

const OUT_DIR = path.join(ROOT, ".news-sync");
const PUBLIC_DIR = path.join(ROOT, "public", "news-data");

function resolveImageUrl(value) {
  if (!value) return null;
  if (value.startsWith("http")) return value;
  return `${CMS_ORIGIN}/${value.replace(/^\//, "")}`;
}

function normalizeArticle(article) {
  return {
    ...article,
    coverImage: resolveImageUrl(article.coverImage),
    images: (article.images || []).map(resolveImageUrl).filter(Boolean),
  };
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function walkFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(full));
    else files.push(full);
  }
  return files;
}

function copyTree(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of walkFiles(srcDir)) {
    const rel = path.relative(srcDir, file);
    const target = path.join(destDir, rel);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(file, target);
  }
}

function uploadToR2(dir) {
  for (const file of walkFiles(dir)) {
    const key = path.relative(dir, file).replace(/\\/g, "/");
    const contentType = key.endsWith(".json")
      ? "application/json"
      : "application/octet-stream";
    const quoted = file.includes('"') ? file : `"${file}"`;
    execSync(
      `npx wrangler r2 object put ${BUCKET}/${key} --file=${quoted} --content-type=${contentType} --remote`,
      { cwd: ROOT, stdio: "inherit" },
    );
  }
}

async function fetchWithTimeout(url, timeoutMs = 60000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchPublishedNews() {
  const url = `${CMS_API}/news/public?limit=500`;
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const res = await fetchWithTimeout(url);
      if (!res.ok) {
        throw new Error(`CMS API HTTP ${res.status}`);
      }
      const json = await res.json();
      if (json.code !== 0 || !Array.isArray(json.data)) {
        throw new Error(`CMS API error: ${json.msg || "invalid response"}`);
      }
      return json.data.map(normalizeArticle);
    } catch (err) {
      lastError = err;
      console.warn(`Fetch attempt ${attempt}/3 failed:`, err.message || err);
      if (attempt < 3) await new Promise((r) => setTimeout(r, 2000));
    }
  }
  throw lastError;
}

async function main() {
  console.log(`Fetching published news from ${CMS_API} ...`);
  const articles = await fetchPublishedNews();
  const updatedAt = new Date().toISOString();
  const pages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const manifest = {
    version: updatedAt,
    updatedAt,
    total: articles.length,
    pageSize: PAGE_SIZE,
    pages,
  };

  writeJson(path.join(OUT_DIR, "manifest.json"), manifest);
  writeJson(path.join(OUT_DIR, "list.json"), { updatedAt, articles });

  for (let page = 1; page <= pages; page += 1) {
    const slice = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    writeJson(path.join(OUT_DIR, "list", `page-${page}.json`), {
      updatedAt,
      page,
      pageSize: PAGE_SIZE,
      total: articles.length,
      articles: slice,
    });
  }

  for (const article of articles) {
    writeJson(path.join(OUT_DIR, "detail", `${article.id}.json`), article);
  }

  fs.rmSync(PUBLIC_DIR, { recursive: true, force: true });
  copyTree(OUT_DIR, PUBLIC_DIR);

  console.log(`Prepared ${articles.length} articles in public/news-data/`);

  if (SKIP_R2) {
    console.log("SKIP_R2=1 — skipped R2 upload.");
    return;
  }

  console.log(`Uploading to R2 bucket "${BUCKET}" ...`);
  uploadToR2(OUT_DIR);
  console.log(`Done. News data is live in R2 (bucket: ${BUCKET}).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
