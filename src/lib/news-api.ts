/** 管理系统 API（联系表单等仍走此地址） */
const PRODUCTION_API = "https://gaoyuan.zwstone.cn/api";

/** 新闻静态 JSON（R2 + Pages Function，或本地 public/news-data） */
const PRODUCTION_NEWS_DATA = "/news-data";

const CMS_ORIGIN = "https://gaoyuan.zwstone.cn";

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

export function getNewsImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${CMS_ORIGIN}/${path.replace(/^\//, "")}`;
}

export async function fetchPublishedNews(limit = 50): Promise<NewsArticle[]> {
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
