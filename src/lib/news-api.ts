/** 管理系统 API（联系表单等仍走此地址） */
const PRODUCTION_API = "https://gaoyuan.zwstone.cn/api";

/** 新闻静态 JSON（R2 + Pages Function，生产环境） */
const PRODUCTION_NEWS_DATA = "/news-data";

const PRODUCTION_CMS_ORIGIN = "https://gaoyuan.zwstone.cn";

/** 本地开发：配置了 CMS API 且未指定 R2 数据源时，直连管理系统数据库（实时） */
function useLiveNewsApi(): boolean {
  const flag = process.env.NEXT_PUBLIC_NEWS_USE_LIVE_API?.trim().toLowerCase();
  if (flag === "1" || flag === "true") return true;
  if (flag === "0" || flag === "false") return false;

  const apiUrl = process.env.NEXT_PUBLIC_NEWS_API_URL?.trim();
  const dataUrl = process.env.NEXT_PUBLIC_NEWS_DATA_URL?.trim();
  return Boolean(apiUrl && !dataUrl);
}

export function getNewsApiBase(): string {
  const fromEnv = process.env.NEXT_PUBLIC_NEWS_API_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return PRODUCTION_API;
}

export function getNewsDataBase(): string {
  const fromEnv = process.env.NEXT_PUBLIC_NEWS_DATA_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return PRODUCTION_NEWS_DATA;
}

/** 新闻图片所在域名（封面、正文配图） */
export function getCmsOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_NEWS_CMS_ORIGIN?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (useLiveNewsApi()) {
    const apiBase = getNewsApiBase();
    if (apiBase.startsWith("http")) {
      return apiBase.replace(/\/api\/?$/, "");
    }
    // 本地 dev 走 Next 代理 /backend-api 时，图片仍从管理系统后端取
    return "http://localhost:3000";
  }
  return PRODUCTION_CMS_ORIGIN;
}

export interface NewsArticle {
  id: string;
  title: string;
  titleCn: string;
  excerpt: string;
  excerptCn: string;
  content: string;
  contentCn: string;
  coverImage: string | null;
  images: string[];
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ListPayload {
  updatedAt?: string;
  articles?: NewsArticle[];
}

interface CmsListResponse {
  code: number;
  data?: NewsArticle[];
  msg?: string;
}

interface CmsDetailResponse {
  code: number;
  data?: NewsArticle;
  msg?: string;
}

export function getNewsImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  // R2 同步后的图片：本站 /news-data/images/...
  if (path.startsWith("/news-data/")) return path;
  return `${getCmsOrigin()}/${path.replace(/^\//, "")}`;
}

export async function fetchPublishedNews(limit = 50): Promise<NewsArticle[]> {
  if (useLiveNewsApi()) {
    const apiBase = getNewsApiBase();
    try {
      const res = await fetch(`${apiBase}/news/public?limit=${limit}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        console.error("[news-api] live list failed:", res.status, apiBase);
        return [];
      }
      const json: CmsListResponse = await res.json();
      if (json.code !== 0 || !Array.isArray(json.data)) {
        console.error("[news-api] live list invalid:", json.msg);
        return [];
      }
      return json.data.slice(0, limit);
    } catch (err) {
      console.error("[news-api] live list error:", err, apiBase);
      return [];
    }
  }

  const dataBase = getNewsDataBase();
  try {
    const res = await fetch(`${dataBase}/list.json`, { cache: "no-store" });
    if (!res.ok) {
      console.error("[news-api] list fetch failed:", res.status, dataBase);
      return [];
    }
    const json: ListPayload = await res.json();
    const articles = Array.isArray(json.articles) ? json.articles : [];
    return articles.slice(0, limit);
  } catch (err) {
    console.error("[news-api] list fetch error:", err, dataBase);
    return [];
  }
}

export async function fetchPublishedNewsDetail(
  id: string,
): Promise<NewsArticle | null> {
  if (useLiveNewsApi()) {
    const apiBase = getNewsApiBase();
    try {
      const res = await fetch(
        `${apiBase}/news/public/${encodeURIComponent(id)}`,
        { cache: "no-store" },
      );
      if (!res.ok) return null;
      const json: CmsDetailResponse = await res.json();
      return json.code === 0 && json.data?.id ? json.data : null;
    } catch {
      return null;
    }
  }

  const dataBase = getNewsDataBase();
  try {
    const res = await fetch(`${dataBase}/detail/${encodeURIComponent(id)}.json`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json: NewsArticle = await res.json();
    return json?.id ? json : null;
  } catch {
    return null;
  }
}
