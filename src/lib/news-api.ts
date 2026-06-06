/** 每次请求时解析 API 地址，确保浏览器端本地开发走正确路径 */
export function getNewsApiBase(): string {
  const fromEnv = process.env.NEXT_PUBLIC_NEWS_API_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      // 本地 dev 走 Next 代理 → 管理系统 localhost:3000
      return "/backend-api";
    }
  }

  return "https://gaoyuan.zwstone.cn/api";
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

interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export function getNewsImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const apiBase = getNewsApiBase();
  // 代理路径时图片仍从管理系统根地址加载
  const assetBase =
    apiBase === "/backend-api"
      ? "http://localhost:3000"
      : apiBase.replace(/\/api\/?$/, "");

  return `${assetBase}/${path.replace(/^\//, "")}`;
}

export async function fetchPublishedNews(limit = 50): Promise<NewsArticle[]> {
  const apiBase = getNewsApiBase();
  try {
    const res = await fetch(`${apiBase}/news/public?limit=${limit}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[news-api] fetch failed:", res.status, apiBase);
      return [];
    }
    const json: ApiResponse<NewsArticle[]> = await res.json();
    return json.code === 0 && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.error("[news-api] fetch error:", err, apiBase);
    return [];
  }
}

export async function fetchPublishedNewsDetail(id: string): Promise<NewsArticle | null> {
  const apiBase = getNewsApiBase();
  try {
    const res = await fetch(`${apiBase}/news/public/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json: ApiResponse<NewsArticle> = await res.json();
    return json.code === 0 ? json.data : null;
  } catch {
    return null;
  }
}
