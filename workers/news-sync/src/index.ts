export interface Env {
  NEWS_BUCKET: R2Bucket;
  NEWS_SYNC_SECRET: string;
  NEWS_CMS_API?: string;
}

const PAGE_SIZE = 20;

type CmsArticle = Record<string, unknown> & {
  id: string;
  coverImage?: string | null;
  images?: string[];
};

type IngestImage = {
  filename: string;
  contentType: string;
  data: string;
};

type SyncPayload = {
  reason?: string;
  at?: string;
  images?: IngestImage[];
};

function contentTypeFromFilename(filename: string): string {
  if (/\.jpe?g$/i.test(filename)) return "image/jpeg";
  if (/\.png$/i.test(filename)) return "image/png";
  if (/\.webp$/i.test(filename)) return "image/webp";
  if (/\.gif$/i.test(filename)) return "image/gif";
  return "application/octet-stream";
}

function basenameFromPath(rawPath: string): string | null {
  try {
    const pathname = rawPath.startsWith("http")
      ? new URL(rawPath).pathname
      : rawPath;
    return pathname.split("/").filter(Boolean).pop() || null;
  } catch {
    return null;
  }
}

function resolveCmsImageUrl(
  rawPath: string | null | undefined,
  cmsOrigin: string,
): string | null {
  if (!rawPath) return null;
  if (rawPath.startsWith("http")) return rawPath;
  return `${cmsOrigin}/${rawPath.replace(/^\//, "")}`;
}

function toPublicImagePath(basename: string): string {
  return `/news-data/images/${basename}`;
}

function cacheImagePath(
  cache: Map<string, string>,
  rawPath: string,
  publicPath: string,
) {
  cache.set(rawPath, publicPath);
  const basename = basenameFromPath(rawPath);
  if (basename) {
    cache.set(basename, publicPath);
    cache.set(`uploads/news/${basename}`, publicPath);
  }
}

function decodeBase64(data: string): Uint8Array {
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function ingestImagesFromCms(
  env: Env,
  images: IngestImage[],
  cache: Map<string, string>,
): Promise<number> {
  let count = 0;
  for (const img of images) {
    if (!img.filename || !img.data) continue;
    const r2Key = `images/${img.filename}`;
    const publicPath = toPublicImagePath(img.filename);
    const bytes = decodeBase64(img.data);
    const contentType =
      img.contentType || contentTypeFromFilename(img.filename);

    await env.NEWS_BUCKET.put(r2Key, bytes, {
      httpMetadata: {
        contentType,
        cacheControl: "public, max-age=31536000, immutable",
      },
    });

    cacheImagePath(cache, img.filename, publicPath);
    cacheImagePath(cache, `uploads/news/${img.filename}`, publicPath);
    count += 1;
  }
  return count;
}

async function syncImageToR2(
  env: Env,
  rawPath: string | null | undefined,
  cmsOrigin: string,
  cache: Map<string, string>,
): Promise<string | null> {
  if (!rawPath) return null;
  const cached = cache.get(rawPath);
  if (cached) return cached;

  const basename = basenameFromPath(rawPath);
  if (basename && cache.has(basename)) {
    return cache.get(basename)!;
  }
  if (basename && cache.has(`uploads/news/${basename}`)) {
    return cache.get(`uploads/news/${basename}`)!;
  }

  if (!basename) return resolveCmsImageUrl(rawPath, cmsOrigin);

  const fetchUrl = resolveCmsImageUrl(rawPath, cmsOrigin);
  if (!fetchUrl) return null;

  try {
    const res = await fetch(fetchUrl, {
      headers: { "User-Agent": "gaoyuan-news-sync/1.0 (Cloudflare Worker)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const contentType =
      res.headers.get("content-type") || contentTypeFromFilename(basename);
    const r2Key = `images/${basename}`;
    const publicPath = toPublicImagePath(basename);
    const bytes = await res.arrayBuffer();

    await env.NEWS_BUCKET.put(r2Key, bytes, {
      httpMetadata: {
        contentType,
        cacheControl: "public, max-age=31536000, immutable",
      },
    });

    cacheImagePath(cache, rawPath, publicPath);
    return publicPath;
  } catch {
    return resolveCmsImageUrl(rawPath, cmsOrigin);
  }
}

async function normalizeArticleWithImages(
  env: Env,
  article: CmsArticle,
  cmsOrigin: string,
  cache: Map<string, string>,
) {
  const coverImage = await syncImageToR2(
    env,
    article.coverImage as string | null,
    cmsOrigin,
    cache,
  );
  const images = (
    await Promise.all(
      (article.images || []).map((p) => syncImageToR2(env, p, cmsOrigin, cache)),
    )
  ).filter(Boolean) as string[];

  return { ...article, coverImage, images };
}

async function syncNewsToR2(env: Env, payload: SyncPayload = {}) {
  const cmsApi = (env.NEWS_CMS_API || "https://gaoyuan.zwstone.cn/api").replace(
    /\/$/,
    "",
  );
  const cmsOrigin = cmsApi.replace(/\/api\/?$/, "");

  const imageCache = new Map<string, string>();
  const imagesIngested = payload.images?.length
    ? await ingestImagesFromCms(env, payload.images, imageCache)
    : 0;

  const res = await fetch(`${cmsApi}/news/public?limit=500`);
  if (!res.ok) {
    throw new Error(`CMS HTTP ${res.status}`);
  }

  const json = (await res.json()) as {
    code: number;
    data?: CmsArticle[];
    msg?: string;
  };
  if (json.code !== 0 || !Array.isArray(json.data)) {
    throw new Error(json.msg || "CMS API invalid response");
  }

  const articles: CmsArticle[] = [];
  for (const item of json.data) {
    articles.push(await normalizeArticleWithImages(env, item, cmsOrigin, imageCache));
  }

  const imagesSynced = imagesIngested || [...imageCache.values()].filter((v) =>
    v.startsWith("/news-data/images/"),
  ).length;
  const updatedAt = new Date().toISOString();
  const pages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const jsonType = "application/json; charset=utf-8";

  const writes: Promise<R2Object | null>[] = [
    env.NEWS_BUCKET.put(
      "manifest.json",
      JSON.stringify({
        version: updatedAt,
        updatedAt,
        total: articles.length,
        pageSize: PAGE_SIZE,
        pages,
        imagesSynced,
      }),
      { httpMetadata: { contentType: jsonType } },
    ),
    env.NEWS_BUCKET.put(
      "list.json",
      JSON.stringify({ updatedAt, articles }),
      { httpMetadata: { contentType: jsonType } },
    ),
  ];

  for (let page = 1; page <= pages; page += 1) {
    const slice = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    writes.push(
      env.NEWS_BUCKET.put(
        `list/page-${page}.json`,
        JSON.stringify({
          updatedAt,
          page,
          pageSize: PAGE_SIZE,
          total: articles.length,
          articles: slice,
        }),
        { httpMetadata: { contentType: jsonType } },
      ),
    );
  }

  for (const article of articles) {
    writes.push(
      env.NEWS_BUCKET.put(`detail/${article.id}.json`, JSON.stringify(article), {
        httpMetadata: { contentType: jsonType },
      }),
    );
  }

  await Promise.all(writes);
  return { total: articles.length, imagesSynced, updatedAt };
}

function unauthorized() {
  return new Response(JSON.stringify({ error: "unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "Authorization, Content-Type, X-News-Sync-Secret",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "method_not_allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    const authHeader = request.headers.get("Authorization") || "";
    const bearer = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : request.headers.get("X-News-Sync-Secret") || "";

    if (!env.NEWS_SYNC_SECRET || bearer !== env.NEWS_SYNC_SECRET) {
      return unauthorized();
    }

    try {
      const payload = (await request.json().catch(() => ({}))) as SyncPayload;
      const result = await syncNewsToR2(env, payload);
      return new Response(JSON.stringify({ ok: true, ...result }), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: err instanceof Error ? err.message : String(err),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8" },
        },
      );
    }
  },
};
