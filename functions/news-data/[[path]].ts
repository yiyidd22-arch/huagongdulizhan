interface Env {
  NEWS_BUCKET: R2Bucket;
}

function contentType(key: string): string {
  if (key.endsWith(".json")) return "application/json; charset=utf-8";
  if (/\.(jpe?g)$/i.test(key)) return "image/jpeg";
  if (key.endsWith(".png")) return "image/png";
  if (key.endsWith(".webp")) return "image/webp";
  if (key.endsWith(".gif")) return "image/gif";
  return "application/octet-stream";
}

function resolveKey(pathParam: string | string[] | undefined): string {
  if (!pathParam || (Array.isArray(pathParam) && pathParam.length === 0)) {
    return "manifest.json";
  }
  return Array.isArray(pathParam) ? pathParam.join("/") : pathParam;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const key = resolveKey(context.params.path as string | string[] | undefined);
  const object = await context.env.NEWS_BUCKET.get(key);

  if (!object) {
    return new Response(JSON.stringify({ error: "not_found", key }), {
      status: 404,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("Content-Type", contentType(key));
  headers.set("Cache-Control", "public, max-age=60, s-maxage=60");
  headers.set("Access-Control-Allow-Origin", "*");

  return new Response(object.body, { headers });
};
