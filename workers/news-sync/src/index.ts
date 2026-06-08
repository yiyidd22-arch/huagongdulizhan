export interface Env {
  NEWS_BUCKET: R2Bucket;
  NEWS_SYNC_SECRET: string;
  NEWS_CMS_API?: string;
}

const PAGE_SIZE = 20;

type CmsArticle = Record<string, unknown> & { id: string; images?: string[] };

function resolveImageUrl(
  value: string | null | undefined,
  cmsOrigin: string,
): string | null {
  if (!value) return null;
  if (value.startsWith("http")) return value;
  return `${cmsOrigin}/${value.replace(/^\//, "")}`;
}

function normalizeArticle(article: CmsArticle, cmsOrigin: string) {
  return {
    ...article,
    coverImage: resolveImageUrl(article.coverImage as string | null, cmsOrigin),
    images: (article.images || [])
      .map((path) => resolveImageUrl(path, cmsOrigin))
      .filter(Boolean),
  };
}

async function syncNewsToR2(env: Env) {
  const cmsApi = (env.NEWS_CMS_API || "https://gaoyuan.zwstone.cn/api").replace(
    /\/$/,
    "",
  );
  const cmsOrigin = cmsApi.replace(/\/api\/?$/, "");

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

  const articles = json.data.map((item) => normalizeArticle(item, cmsOrigin));
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
  return { total: articles.length, updatedAt };
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
          "Access-Control-Allow-Headers": "Authorization, Content-Type, X-News-Sync-Secret",
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
      const result = await syncNewsToR2(env);
      return new Response(JSON.stringify({ ok: true, ...result }), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ ok: false, error: err instanceof Error ? err.message : String(err) }),
        {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8" },
        },
      );
    }
  },
};
